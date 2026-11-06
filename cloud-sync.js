(() => {
    const configKey = "aliceCloudSyncConfig";
    const sessionKey = "aliceCloudSyncSession";
    const metadataKey = "aliceCloudSyncMetadata";
    const autoUploadKey = "aliceCloudAutoUpload";
    const storagePrefix = "alice";
    const originalSetItem = Storage.prototype.setItem;
    const originalRemoveItem = Storage.prototype.removeItem;
    let session = readJson(localStorage.getItem(sessionKey));
    let config = readJson(localStorage.getItem(configKey));
    let uploadTimer;
    let pollingTimer;
    let uploadInProgress = false;
    let uploadQueued = false;
    let applyingCloudData = false;
    let autoUploadEnabled = localStorage.getItem(autoUploadKey) !== "false";

    function readJson(value) {
        if (!value) return null;
        try {
            return JSON.parse(value);
        } catch (error) {
            console.error("Data sinkronisasi lokal tidak dapat dibaca.", error);
            return null;
        }
    }

    function isAppDataKey(key) {
        return key.startsWith(storagePrefix) &&
            key !== configKey &&
            key !== sessionKey &&
            key !== metadataKey &&
            key !== autoUploadKey;
    }

    function setStatus(message, state = "") {
        const status = document.getElementById("statusSinkronisasi");
        const shortStatus = document.getElementById("statusSinkronisasiSingkat");
        if (status) {
            status.textContent = message;
            status.dataset.state = state;
        }
        if (shortStatus) shortStatus.textContent = session ? "Terhubung ke cloud" : "Hubungkan data laptop dan HP";
        updateStorageSettings();
    }

    function collectAppData() {
        const data = {};
        for (let index = 0; index < localStorage.length; index++) {
            const key = localStorage.key(index);
            if (key && isAppDataKey(key)) data[key] = localStorage.getItem(key);
        }
        return data;
    }

    function restoreAppData(data) {
        applyingCloudData = true;
        try {
            for (let index = localStorage.length - 1; index >= 0; index--) {
                const key = localStorage.key(index);
                if (key && isAppDataKey(key) && !(key in data)) originalRemoveItem.call(localStorage, key);
            }
            Object.entries(data).forEach(([key, value]) => {
                if (isAppDataKey(key) && typeof value === "string") {
                    originalSetItem.call(localStorage, key, value);
                }
            });
        } finally {
            applyingCloudData = false;
        }
    }

    function projectUrl() {
        return config.url.replace(/\/+$/, "");
    }

    async function request(path, options = {}) {
        const response = await fetch(`${projectUrl()}${path}`, {
            ...options,
            headers: {
                apikey: config.key,
                ...(options.headers || {})
            }
        });
        const body = await response.text();
        let result;
        try {
            result = body ? JSON.parse(body) : null;
        } catch {
            result = body;
        }
        if (!response.ok) {
            const message = result && (result.msg || result.message || result.error_description || result.error);
            throw new Error(message || `Permintaan cloud gagal (${response.status}).`);
        }
        return result;
    }

    async function refreshSession() {
        if (!session || session.expires_at * 1000 > Date.now() + 60000) return;
        const refreshed = await request("/auth/v1/token?grant_type=refresh_token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: session.refresh_token })
        });
        saveSession(refreshed);
    }

    function saveSession(value) {
        session = {
            ...value,
            expires_at: value.expires_at || Math.floor(Date.now() / 1000) + (value.expires_in || 3600)
        };
        localStorage.setItem(sessionKey, JSON.stringify(session));
    }

    async function authenticatedRequest(path, options = {}) {
        await refreshSession();
        return request(path, {
            ...options,
            headers: { ...(options.headers || {}), Authorization: `Bearer ${session.access_token}` }
        });
    }

    async function readCloudData() {
        const rows = await authenticatedRequest(
            `/rest/v1/alice_backups?select=payload,updated_at&user_id=eq.${encodeURIComponent(session.user.id)}`
        );
        return rows && rows.length ? rows[0] : null;
    }

    async function uploadCloudData() {
        if (!session || !autoUploadEnabled) return;
        if (uploadInProgress) {
            uploadQueued = true;
            return;
        }
        uploadInProgress = true;
        uploadQueued = false;
        try {
            const updatedAt = new Date().toISOString();
            await authenticatedRequest("/rest/v1/alice_backups?on_conflict=user_id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Prefer: "resolution=merge-duplicates,return=minimal"
                },
                body: JSON.stringify({
                    user_id: session.user.id,
                    payload: collectAppData(),
                    updated_at: updatedAt
                })
            });
            originalSetItem.call(localStorage, metadataKey, JSON.stringify({ updatedAt }));
            setStatus(`Sinkronisasi aktif. Terakhir tersimpan ${new Date(updatedAt).toLocaleTimeString("id-ID")}.`, "success");
        } catch (error) {
            setStatus(`Gagal menyimpan ke cloud: ${error.message}`, "error");
        } finally {
            uploadInProgress = false;
            if (uploadQueued) scheduleUpload();
        }
    }

    function scheduleUpload() {
        if (!session || !autoUploadEnabled || applyingCloudData) return;
        uploadQueued = true;
        clearTimeout(uploadTimer);
        uploadTimer = setTimeout(uploadCloudData, 700);
    }

    async function synchronizeAfterLogin() {
        const cloudRow = await readCloudData();
        if (!cloudRow) {
            if (autoUploadEnabled) {
                await uploadCloudData();
            } else {
                setStatus("Berhasil masuk. Upload otomatis nonaktif; data tetap tersimpan lokal.", "");
            }
            startPolling();
            return;
        }

        const localData = collectAppData();
        if (!Object.keys(localData).length) {
            restoreAppData(cloudRow.payload || {});
            originalSetItem.call(localStorage, metadataKey, JSON.stringify({ updatedAt: cloudRow.updated_at }));
            location.reload();
            return;
        }

        const shouldUseCloud = confirm("Data cloud sudah tersedia. Tekan OK untuk memuat data cloud ke perangkat ini, atau Batal untuk mengunggah data perangkat ini ke cloud.");
        if (shouldUseCloud) {
            restoreAppData(cloudRow.payload || {});
            originalSetItem.call(localStorage, metadataKey, JSON.stringify({ updatedAt: cloudRow.updated_at }));
            location.reload();
            return;
        }

        if (autoUploadEnabled) {
            await uploadCloudData();
        } else {
            setStatus("Berhasil masuk. Upload otomatis nonaktif; data lokal tidak dikirim ke cloud.", "");
        }
        startPolling();
    }

    async function authenticate(endpoint) {
        const url = document.getElementById("urlSupabase").value.trim().replace(/\/+$/, "");
        const key = document.getElementById("kunciPublikSupabase").value.trim();
        const email = document.getElementById("emailSinkronisasi").value.trim();
        const password = document.getElementById("kataSandiSinkronisasi").value;
        if (!url || !key || !email || !password) {
            setStatus("Lengkapi URL project, publishable/anon key, email, dan kata sandi.", "error");
            return;
        }
        try {
            new URL(url);
            config = { url, key };
            localStorage.setItem(configKey, JSON.stringify(config));
            setStatus("Menghubungkan ke Supabase...");
            const result = await request(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            if (!result.access_token) {
                setStatus("Akun dibuat. Jika verifikasi email aktif, verifikasi email lalu masuk.", "success");
                return;
            }
            saveSession(result);
            document.getElementById("tombolKeluarSinkronisasi").hidden = false;
            updateStorageSettings();
            await synchronizeAfterLogin();
        } catch (error) {
            setStatus(`Tidak dapat menghubungkan: ${error.message}`, "error");
        }
    }

    function startPolling() {
        clearInterval(pollingTimer);
        pollingTimer = setInterval(async () => {
            if (!session || uploadQueued || uploadInProgress) return;
            try {
                const cloudRow = await readCloudData();
                if (!cloudRow) return;
                const metadata = readJson(localStorage.getItem(metadataKey)) || {};
                if (metadata.updatedAt && cloudRow.updated_at > metadata.updatedAt) {
                    const shouldRefresh = confirm("Ada perubahan data dari perangkat lain. Muat ulang data terbaru? Perubahan lokal yang belum tersinkron akan diganti.");
                    if (shouldRefresh) {
                        restoreAppData(cloudRow.payload || {});
                        originalSetItem.call(localStorage, metadataKey, JSON.stringify({ updatedAt: cloudRow.updated_at }));
                        location.reload();
                    } else {
                        await uploadCloudData();
                    }
                }
            } catch (error) {
                setStatus(`Gangguan sinkronisasi: ${error.message}`, "error");
            }
        }, 15000);
    }

    function updateStorageSettings() {
        const toggle = document.getElementById("toggleUploadOtomatis");
        const status = document.getElementById("statusUploadOtomatis");
        if (toggle) toggle.setAttribute("aria-checked", String(autoUploadEnabled));
        if (!status) return;
        if (!autoUploadEnabled) {
            status.textContent = "Nonaktif. Data tetap tersimpan lokal.";
        } else if (session) {
            status.textContent = "Aktif. Perubahan akan diunggah setelah tersambung.";
        } else {
            status.textContent = "Aktif, menunggu koneksi akun cloud.";
        }
    }

    window.bukaModalSinkronisasi = () => {
        const modal = document.getElementById("modalSinkronisasi");
        if (config) {
            document.getElementById("urlSupabase").value = config.url || "";
            document.getElementById("kunciPublikSupabase").value = config.key || "";
        }
        document.getElementById("tombolKeluarSinkronisasi").hidden = !session;
        updateStorageSettings();
        if (session) setStatus("Perangkat ini masuk ke akun sinkronisasi.", "success");
        modal.style.display = "flex";
    };

    window.toggleUploadOtomatis = () => {
        autoUploadEnabled = !autoUploadEnabled;
        localStorage.setItem(autoUploadKey, String(autoUploadEnabled));
        if (autoUploadEnabled && session) scheduleUpload();
        if (!autoUploadEnabled) {
            clearTimeout(uploadTimer);
            uploadQueued = false;
        }
        updateStorageSettings();
        setStatus(
            autoUploadEnabled
                ? (session ? "Upload otomatis aktif. Perubahan akan segera disinkronkan." : "Upload otomatis aktif; hubungkan akun cloud untuk mengunggah.")
                : "Upload otomatis dimatikan. Data tetap tersimpan di perangkat ini.",
            autoUploadEnabled && session ? "success" : ""
        );
    };

    window.masukSinkronisasi = () => authenticate("/auth/v1/token?grant_type=password");
    window.daftarAkunSinkronisasi = () => authenticate("/auth/v1/signup");
    window.keluarSinkronisasi = () => {
        clearInterval(pollingTimer);
        session = null;
        localStorage.removeItem(sessionKey);
        document.getElementById("tombolKeluarSinkronisasi").hidden = true;
        setStatus("Perangkat ini sudah diputuskan. Data lokal tetap tersimpan.", "");
    };

    Storage.prototype.setItem = function (key, value) {
        originalSetItem.call(this, key, value);
        if (this === localStorage && isAppDataKey(String(key))) scheduleUpload();
    };
    Storage.prototype.removeItem = function (key) {
        originalRemoveItem.call(this, key);
        if (this === localStorage && isAppDataKey(String(key))) scheduleUpload();
    };

    if (session && config) {
        document.getElementById("tombolKeluarSinkronisasi").hidden = false;
        readCloudData().then(cloudRow => {
            const metadata = readJson(localStorage.getItem(metadataKey)) || {};
            if (cloudRow && cloudRow.updated_at > (metadata.updatedAt || "")) {
                restoreAppData(cloudRow.payload || {});
                originalSetItem.call(localStorage, metadataKey, JSON.stringify({ updatedAt: cloudRow.updated_at }));
                location.reload();
            } else {
                startPolling();
                setStatus("Sinkronisasi perangkat aktif.", "success");
            }
        }).catch(error => {
            setStatus(`Gagal memuat data cloud: ${error.message}`, "error");
        });
    }
    updateStorageSettings();
})();
