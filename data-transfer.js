(() => {
    const backupFormat = "alice-bakery-local-backup";
    const backupVersion = 1;
    const cloudKeys = new Set([
        "aliceCloudSyncConfig",
        "aliceCloudSyncSession",
        "aliceCloudSyncMetadata"
    ]);
    const maxBackupSize = 20 * 1024 * 1024;

    function setBackupStatus(message, state = "") {
        const status = document.getElementById("statusCadanganLokal");
        if (!status) return;
        status.textContent = message;
        status.dataset.state = state;
    }

    function collectAppData() {
        const payload = {};
        for (let index = 0; index < localStorage.length; index++) {
            const key = localStorage.key(index);
            if (key && key.startsWith("alice") && !cloudKeys.has(key)) {
                payload[key] = localStorage.getItem(key);
            }
        }
        return payload;
    }

    function downloadBackup(payload = collectAppData()) {
        const backup = {
            format: backupFormat,
            version: backupVersion,
            exportedAt: new Date().toISOString(),
            payload
        };
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const date = new Date().toISOString().slice(0, 10);
        link.href = objectUrl;
        link.download = `alice-bakery-backup-${date}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
        return backup;
    }

    function validateBackup(backup) {
        if (!backup || backup.format !== backupFormat || backup.version !== backupVersion) {
            throw new Error("Format atau versi file cadangan tidak didukung.");
        }
        if (!backup.payload || typeof backup.payload !== "object" || Array.isArray(backup.payload)) {
            throw new Error("Isi file cadangan tidak valid.");
        }
        const entries = Object.entries(backup.payload);
        if (entries.length === 0) throw new Error("File cadangan tidak berisi data.");
        for (const [key, value] of entries) {
            if (!key.startsWith("alice") || cloudKeys.has(key) || typeof value !== "string") {
                throw new Error("File berisi data atau pengaturan yang tidak diizinkan.");
            }
        }
    }

    function restoreBackup(payload) {
        const previousData = collectAppData();
        try {
            for (const key of Object.keys(previousData)) localStorage.removeItem(key);
            for (const [key, value] of Object.entries(payload)) localStorage.setItem(key, value);
        } catch (error) {
            for (const key of Object.keys(collectAppData())) localStorage.removeItem(key);
            for (const [key, value] of Object.entries(previousData)) localStorage.setItem(key, value);
            throw new Error(`Pemulihan gagal; data sebelumnya sudah dikembalikan. ${error.message}`);
        }
    }

    window.unduhCadanganLokal = () => {
        try {
            const backup = downloadBackup();
            const count = Object.keys(backup.payload).length;
            setBackupStatus(`Cadangan berhasil dibuat (${count} kelompok data). Simpan file unduhan ini, lalu pindahkan ke HP.`, "success");
        } catch (error) {
            setBackupStatus(`Gagal membuat cadangan: ${error.message}`, "error");
        }
    };

    window.pulihkanCadanganLokal = async input => {
        const file = input.files && input.files[0];
        input.value = "";
        if (!file) return;
        if (file.size > maxBackupSize) {
            setBackupStatus("Ukuran file cadangan terlalu besar (maksimal 20 MB).", "error");
            return;
        }
        try {
            const backup = JSON.parse(await file.text());
            validateBackup(backup);
            const count = Object.keys(backup.payload).length;
            if (!confirm(`Pulihkan ${count} kelompok data dari cadangan tanggal ${new Date(backup.exportedAt).toLocaleString("id-ID") || "tidak diketahui"}? Data aplikasi di perangkat ini akan diganti.`)) {
                setBackupStatus("Pemulihan dibatalkan. Data perangkat tidak berubah.");
                return;
            }
            downloadBackup();
            restoreBackup(backup.payload);
            setBackupStatus("Data berhasil dipulihkan. Aplikasi akan dimuat ulang.", "success");
            setTimeout(() => location.reload(), 700);
        } catch (error) {
            setBackupStatus(`Tidak dapat memulihkan cadangan: ${error.message}`, "error");
        }
    };
})();
