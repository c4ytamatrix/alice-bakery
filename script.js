let daftarBahanFormulasi = JSON.parse(localStorage.getItem("aliceFormulasiBahan")) || [
    { nama: "Tepung", satuan: "Sak (25 kg)", qtyPakai: 1 },
    { nama: "Mauripan", satuan: "gram", qtyPakai: 220 },
    { nama: "Amanda", satuan: "gram", qtyPakai: 1500 },
    { nama: "Baker", satuan: "gram", qtyPakai: 100 },
    { nama: "Gula", satuan: "gram", qtyPakai: 3500 },
    { nama: "Bensin", satuan: "liter", qtyPakai: 1 },
    { nama: "Garam", satuan: "gram", qtyPakai: 250 },
    { nama: "Gas", satuan: "kg", qtyPakai: 1.5 },
    { nama: "Plastik", satuan: "lembar", qtyPakai: 160 }, 
    { nama: "Telur", satuan: "butir", qtyPakai: 10 }
];

let empirisHasilRT = parseFloat(localStorage.getItem("aliceEmpirisHasilRT")) || 160;

let barangList = JSON.parse(localStorage.getItem("aliceBarang")) || [
    { kode: "rt", nama: "Roti Bakar Bandung", jenis: "Roti", detail: "38000", gramasi: "250" },
    { kode: "rtt", nama: "Roti Tawar Besar", jenis: "Roti", detail: "12000", gramasi: "550" },
    { kode: "bg9", nama: "Burger 9", jenis: "Roti", detail: "9500", gramasi: "90" }
];

const barangTokoAwal = [
    { kode: "bb", nama: "Blueberry", detail: "24000", satuanBarang: "pcs", beratBarang: "1000" },
    { kode: "bbb", nama: "Blueberry 0,5kg", detail: "12000", satuanBarang: "pcs", beratBarang: "500" },
    { kode: "dr", nama: "Durian", detail: "27000", satuanBarang: "pcs", beratBarang: "1000" },
    { kode: "drr", nama: "Durian 0,5kg", detail: "13500", satuanBarang: "pcs", beratBarang: "500" },
    { kode: "vn", nama: "Vanila", detail: "27000", satuanBarang: "pcs", beratBarang: "1000" },
    { kode: "vnn", nama: "Vanila 0,5kg", detail: "13500", satuanBarang: "pcs", beratBarang: "500" },
    { kode: "st", nama: "Strawberry", detail: "24000", satuanBarang: "pcs", beratBarang: "1000" },
    { kode: "stt", nama: "Strawberry 0,5kg", detail: "12000", satuanBarang: "pcs", beratBarang: "500" },
    { kode: "nn", nama: "Nanas", detail: "24000", satuanBarang: "pcs", beratBarang: "1000" },
    { kode: "nnn", nama: "Nanas 0,5kg", detail: "12000", satuanBarang: "pcs", beratBarang: "500" },
    { kode: "kc", nama: "Kacang", detail: "48000", satuanBarang: "pcs", beratBarang: "1000" },
    { kode: "kcc", nama: "Kacang 0,5kg", detail: "24000", satuanBarang: "pcs", beratBarang: "500" },
    { kode: "mt", nama: "Mentega", detail: "22500", satuanBarang: "pcs", beratBarang: "1000" },
    { kode: "wnc", nama: "wincheez", detail: "12500", satuanBarang: "pcs", beratBarang: "500" }
].map(barang => ({ ...barang, jenis: "Barang Toko" }));

const kunciMigrasiBarangTokoAwal = "aliceBarangTokoAwalV1";
if (!localStorage.getItem(kunciMigrasiBarangTokoAwal)) {
    let kodeBarangTersimpan = new Set(barangList.map(barang => String(barang.kode).trim().toLowerCase()));
    let barangBaru = barangTokoAwal.filter(barang => !kodeBarangTersimpan.has(barang.kode));
    if (barangBaru.length > 0) {
        barangList.push(...barangBaru);
        localStorage.setItem("aliceBarang", JSON.stringify(barangList));
    }
    localStorage.setItem(kunciMigrasiBarangTokoAwal, "selesai");
}

const barangSupplierAwal = [
    { kode: "bb", nama: "Blueberry", satuanSupplier: "Karton (Kg)", detailKonversiSup: "10" },
    { kode: "dr", nama: "Durian", satuanSupplier: "Karton (Kg)", detailKonversiSup: "10" },
    { kode: "vn", nama: "Vanila", satuanSupplier: "Karton (Kg)", detailKonversiSup: "10" },
    { kode: "st", nama: "Strawberry", satuanSupplier: "Karton (Kg)", detailKonversiSup: "10" },
    { kode: "nn", nama: "Nanas", satuanSupplier: "Karton (Kg)", detailKonversiSup: "10" },
    { kode: "kc", nama: "Kacang", satuanSupplier: "Karton (Kg)", detailKonversiSup: "1" },
    { kode: "mt", nama: "Mentega", satuanSupplier: "Karton (Kg)", detailKonversiSup: "15" },
    { kode: "wnc", nama: "wincheez", satuanSupplier: "Karton (Pcs)", detailKonversiSup: "32" }
].map(barang => ({
    ...barang,
    jenis: "Barang Supplier",
    detail: barang.detailKonversiSup
}));

const kunciMigrasiBarangSupplierAwal = "aliceBarangSupplierAwalV1";
if (!localStorage.getItem(kunciMigrasiBarangSupplierAwal)) {
    let barangSupplierTersimpan = new Set(
        barangList
            .filter(barang => barang.jenis === "Barang Supplier")
            .map(barang => String(barang.kode).trim().toLowerCase())
    );
    let barangSupplierBaru = barangSupplierAwal.filter(
        barang => !barangSupplierTersimpan.has(barang.kode)
    );
    if (barangSupplierBaru.length > 0) {
        barangList.push(...barangSupplierBaru);
        localStorage.setItem("aliceBarang", JSON.stringify(barangList));
    }
    localStorage.setItem(kunciMigrasiBarangSupplierAwal, "selesai");
}

const bahanProduksiAwal = [
    { kode: "tp", nama: "tepung", satuanSupplier: "Sak (Kg)", detailKonversiSup: "25" },
    { kode: "mp", nama: "mauripan", satuanSupplier: "Karton (Kg)", detailKonversiSup: "10" },
    { kode: "amd", nama: "amanda", satuanSupplier: "Karton (Kg)", detailKonversiSup: "10" },
    { kode: "bk", nama: "baker", satuanSupplier: "Pcs Lepas", detailKonversiSup: "10" },
    { kode: "gl", nama: "gula", satuanSupplier: "Sak (Kg)", detailKonversiSup: "50" },
    { kode: "bs", nama: "bensin", satuanSupplier: "Liter", detailKonversiSup: "1" },
    { kode: "gr", nama: "garam", satuanSupplier: "Box (Kg)", detailKonversiSup: "8" },
    { kode: "gs", nama: "gas", satuanSupplier: "Kg", detailKonversiSup: "12" }
].map(barang => ({
    ...barang,
    jenis: "Bahan Produksi",
    detail: barang.detailKonversiSup
}));

const kunciMigrasiBahanProduksiAwal = "aliceBahanProduksiAwalV1";
if (!localStorage.getItem(kunciMigrasiBahanProduksiAwal)) {
    let bahanTersimpan = new Set(
        barangList
            .filter(barang => barang.jenis === "Bahan Produksi")
            .map(barang => String(barang.kode).trim().toLowerCase())
    );
    let bahanBaru = bahanProduksiAwal.filter(
        barang => !bahanTersimpan.has(barang.kode)
    );
    if (bahanBaru.length > 0) {
        barangList.push(...bahanBaru);
        localStorage.setItem("aliceBarang", JSON.stringify(barangList));
    }
    localStorage.setItem(kunciMigrasiBahanProduksiAwal, "selesai");
}

let pelangganList = JSON.parse(localStorage.getItem("alicePelanggan")) || [
    { nama: "indra", hp: "081299887766", jenis: "Pedagang" },
    { nama: "andik", hp: "085611223344", jenis: "Pedagang" },
    { nama: "ate", hp: "085611223345", jenis: "Pedagang" }
];
let akunDatabase = JSON.parse(localStorage.getItem("aliceAkunDatabase")) || [];
const akunOperasionalAwal = [
    { nama: "Beras", kode: "br" },
    { nama: "Makan", kode: "mk" },
    { nama: "Minyak Sunco", kode: "mys" },
    { nama: "Rokok", kode: "rk" },
    { nama: "Air", kode: "ar" },
    { nama: "Alat Tulis Kantor", kode: "atk" },
    { nama: "Bonus Karyawan", kode: "bky" },
    { nama: "Kresek" },
    { nama: "Kunjungan", kode: "kj" },
    { nama: "Administrasi Bank", kode: "adm" },
    { nama: "Lakban", kode: "lb" },
    { nama: "Peralatan Listrik", kode: "plm" },
    { nama: "Perawatan" },
    { nama: "Pulsa" },
    { nama: "Selisih", kode: "sl" },
    { nama: "Suguhan Tamu", kode: "stm" },
    { nama: "Tol", kode: "tol" },
    { nama: "Upah Operasional", kode: "opb" },
    { nama: "Alat Kebersihan", kode: "kbn" },
    { nama: "Mobil Roti" }
];
const kunciMigrasiAkunOperasional = "aliceAkunOperasionalAwalV1";
if (!localStorage.getItem(kunciMigrasiAkunOperasional)) {
    let kodeAkunTerpakai = new Set(akunDatabase.map(akun => String(akun.kode).trim().toLowerCase()));
    let namaAkunTersimpan = new Set(akunDatabase.map(akun => String(akun.nama).trim().toLowerCase()));
    let kodeBerikutnya = 601;

    akunOperasionalAwal.forEach(({ nama, kode: kodeUsulan }) => {
        if (namaAkunTersimpan.has(nama.toLowerCase())) return;
        let kode = kodeUsulan;
        if (!kode || kodeAkunTerpakai.has(kode.toLowerCase())) {
            while (kodeAkunTerpakai.has(String(kodeBerikutnya))) kodeBerikutnya++;
            kode = String(kodeBerikutnya++);
        }
        akunDatabase.push({ kode, nama, jenis: "Operasional" });
        kodeAkunTerpakai.add(kode.toLowerCase());
        namaAkunTersimpan.add(nama.toLowerCase());
    });

    localStorage.setItem("aliceAkunDatabase", JSON.stringify(akunDatabase));
    localStorage.setItem(kunciMigrasiAkunOperasional, "selesai");
}
const kunciMigrasiKodeAkunOperasional = "aliceKodeAkunOperasionalV1";
if (!localStorage.getItem(kunciMigrasiKodeAkunOperasional)) {
    let akunOperasionalDenganKode = akunOperasionalAwal.filter(akun => akun.kode).map(akun => ({
        ...akun,
        tersimpan: akunDatabase.find(item =>
            item.jenis === "Operasional" &&
            String(item.nama).trim().toLowerCase() === akun.nama.toLowerCase()
        )
    })).filter(akun => akun.tersimpan);
    let akunTarget = new Set(akunOperasionalDenganKode.map(akun => akun.tersimpan));
    let konflikKode = akunOperasionalDenganKode.find(akun =>
        akunDatabase.some(item =>
            item !== akun.tersimpan &&
            !akunTarget.has(item) &&
            String(item.kode).trim().toLowerCase() === akun.kode.toLowerCase()
        )
    );

    if (konflikKode) {
        console.error(`Kode "${konflikKode.kode}" untuk akun "${konflikKode.nama}" sudah digunakan akun lain.`);
    } else {
        akunOperasionalDenganKode.forEach(akun => {
            akun.tersimpan.kode = akun.kode;
        });
        if (akunOperasionalDenganKode.length > 0) {
            localStorage.setItem("aliceAkunDatabase", JSON.stringify(akunDatabase));
        }
        localStorage.setItem(kunciMigrasiKodeAkunOperasional, "selesai");
    }
}

let dataTransaksiJual = JSON.parse(localStorage.getItem("aliceJual")) || [];
let keranjangPenjualan = [];
let stokBarangPenjualan = JSON.parse(localStorage.getItem("aliceStokBarangPenjualan")) || {};
let riwayatPenjualan = JSON.parse(localStorage.getItem("aliceRiwayatPenjualan")) || [];
let penjualanSedangDiedit = "";
let pelangganSedangDiedit = "";
let kembaliKeDaftarPenjualan = false;
let detailNotaTerlihat = "";
let mutasiKasPenjualan = JSON.parse(localStorage.getItem("aliceMutasiKasPenjualan")) || [];
let mutasiKasManual = JSON.parse(localStorage.getItem("aliceMutasiKasManual")) || [];
let akunBankQRISPerluDisimpan = false;
mutasiKasPenjualan.forEach(mutasi => {
    if (mutasi.metodeBayar === "QRIS" && mutasi.akun === "kas_non_tunai") {
        mutasi.akun = "rekening_bank";
        akunBankQRISPerluDisimpan = true;
    }
});
if (akunBankQRISPerluDisimpan) {
    localStorage.setItem("aliceMutasiKasPenjualan", JSON.stringify(mutasiKasPenjualan));
}
let saldoKasPenjualan = JSON.parse(localStorage.getItem("aliceSaldoKasPenjualan")) || { tunai: 0, nonTunai: 0 };
let hargaKhususPelanggan = JSON.parse(localStorage.getItem("aliceHargaKhususPelanggan")) || {};
let barangMenungguStokProduksi = null;
let pembayaranKurangMenungguKonfirmasi = null;
let pembayaranPenjualanMenungguPelanggan = null;
let transaksiNotaTerakhir = null;
let saldoTabunganPelanggan = JSON.parse(localStorage.getItem("aliceSaldoTabunganPelanggan")) || {};
let mutasiTabunganPelanggan = JSON.parse(localStorage.getItem("aliceMutasiTabunganPelanggan")) || [];
let databaseStokRealHarian = JSON.parse(localStorage.getItem("aliceStokRealHarian")) || { "2026-10-25": 72 };
// Mengambil tanggal realtime hari ini secara otomatis dari sistem
let todayObj = new Date();
let tahunIni = todayObj.getFullYear();
let bulanIni = String(todayObj.getMonth() + 1).padStart(2, '0');
let hariIni = String(todayObj.getDate()).padStart(2, '0');
let tanggalAktif = `${tahunIni}-${bulanIni}-${hariIni}`;
let tanggalMulaiKasAktif = (() => {
    let tanggal = new Date(`${tanggalAktif}T00:00:00`);
    tanggal.setDate(tanggal.getDate() - ((tanggal.getDay() + 6) % 7));
    return formatTanggalISO(tanggal);
})();
let bulanProduksiAktif = localStorage.getItem("aliceBulanProduksi") || `${tahunIni}-${bulanIni}`;
if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(bulanProduksiAktif)) bulanProduksiAktif = `${tahunIni}-${bulanIni}`;
let tanggalTargetStok = tanggalAktif;
let modePopupStokAwal = "input";
let tanggalPengingatStok = `${tahunIni}-${bulanIni}-${hariIni}`;
let pengingatStokHarian = JSON.parse(localStorage.getItem("alicePengingatStokAwalHarian")) || {};
let permintaanTutupFormOrderDariKeranjang = false;
let tutupOtomatisFormOrder = false;
let timerTutupFormOrder = null;
let tanggalRiwayatPenjualan = tanggalAktif;
let posisiAwalGeserRiwayatPenjualan = null;
let kembaliKeKasirDariRiwayat = false;

let dataOrderHarian = JSON.parse(localStorage.getItem("aliceOrderHarian")) || [
    { id: 1, tgl: "2026-10-25", nama: "indra", roti: "Roti Bakar Bandung", order: 10 },
    { id: 2, tgl: "2026-10-25", nama: "andik", roti: "Roti Tawar Besar", order: 40 },
    { id: 3, tgl: "2026-10-25", nama: "ate", roti: "Burger 9", order: 12 }
];

function formatTanggalIndo(dateStr) {
    let d = new Date(dateStr);
    let hariList = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    let bulanList = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    return {
        hari: hariList[d.getDay()],
        formatLengkap: `${d.getDate()} ${bulanList[d.getMonth()]} ${d.getFullYear()}`
    };
}

function bukaModalSetting() {
    document.getElementById("modalSetting").style.display = "flex";
    renderBarang();
    renderPelanggan();
    renderAkunDatabase();
}
function bukaModalFormulasi() { 
    document.getElementById("modalFormulasi").style.display = "flex"; 
    document.getElementById("inputEmpirisHasilRT").value = empirisHasilRT;
    renderFormulasi(); 
    hitungSimulasiKapasitasAdonan();
}
function batalkanTutupOtomatisFormOrder() {
    if (timerTutupFormOrder !== null) {
        clearTimeout(timerTutupFormOrder);
        timerTutupFormOrder = null;
        tutupOtomatisFormOrder = false;
    }
}

function tanggalAktifAdalahArsip() {
    return tanggalAktif < formatTanggalISO(new Date());
}

function tutupModal(idModal) {
    document.getElementById(idModal).style.display = "none";
    if (idModal === "modalFormTambahOrder") {
        batalkanTutupOtomatisFormOrder();
        permintaanTutupFormOrderDariKeranjang = false;
    }
}

function gantiTabSetting(tab) {
    let targetId = `subTab${tab.charAt(0).toUpperCase()}${tab.slice(1)}`;
    let targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    document.querySelectorAll('.sub-section').forEach(section => section.classList.remove("active"));
    targetSection.classList.add("active");

    document.querySelectorAll('.btn-subtab').forEach(button => button.classList.remove("active"));
    let activeButton = document.querySelector(`.btn-subtab[data-tab="${tab}"]`);
    if (activeButton) activeButton.classList.add("active");
    if (tab === "akun") renderAkunDatabase();
}

function aturOpsiJenis() {
    let jenis = document.getElementById("jenisBarang").value;
    let boxSupProd = document.getElementById("boxSupplierProduksi");
    let boxToko = document.getElementById("boxBarangToko");
    let boxGramasi = document.getElementById("boxGramasiRoti");
    boxSupProd.style.display = boxToko.style.display = boxGramasi.style.display = "none";
    if (jenis === "Barang Supplier" || jenis === "Bahan Produksi") boxSupProd.style.display = "block";
    else if (jenis === "Barang Toko") boxToko.style.display = "block";
    else if (jenis === "Roti") { boxToko.style.display = "block"; boxGramasi.style.display = "block"; }
}

function renderFormulasi() {
    let container = document.getElementById("containerFormulasiBahan");
    container.innerHTML = "";
    daftarBahanFormulasi.forEach((b, idx) => {
        container.innerHTML += `
            <div style="background: #faf4ed; padding: 8px; border-radius: 8px; margin-bottom: 8px; border: 1px solid #e8dec8;">
                <div style="font-weight: bold; font-size: 12px; color: #5c3a21; margin-bottom: 4px;"><span>${b.nama}</span> <span style="font-size:10px; color:#d97724;">(${b.satuan})</span></div>
                <input type="number" id="qty_${idx}" value="${b.qtyPakai}" oninput="daftarBahanFormulasi[${idx}].qtyPakai = parseFloat(this.value)||0" style="padding: 4px; font-size: 11px;">
            </div>`;
    });
}

function hitungSimulasiKapasitasAdonan() {
    let empVal = parseFloat(document.getElementById("inputEmpirisHasilRT").value) || 0;
    let rtMaster = barangList.find(b => b.jenis === "Roti" && (b.kode.toLowerCase() === "rt" || b.nama.toLowerCase().includes("bakar")));
    let gramasiRT = rtMaster && rtMaster.gramasi ? parseFloat(rtMaster.gramasi) : 250;
    document.getElementById("lblSimulasiKapasitasAdonan").innerText = (empVal * gramasiRT).toLocaleString("id-ID") + " gram";
}

function simpanFormulasiBaru() {
    empirisHasilRT = parseFloat(document.getElementById("inputEmpirisHasilRT").value) || 160;
    localStorage.setItem("aliceEmpirisHasilRT", empirisHasilRT);
    localStorage.setItem("aliceFormulasiBahan", JSON.stringify(daftarBahanFormulasi));
    alert("✅ Formulasi Resep berhasil disimpan!");
    tutupModal('modalFormulasi');
    renderTabelOrder();
}

function bukaModalOrder() { 
    document.getElementById("modalOrder").style.display = "flex"; 
    renderTabelOrder(); 
}

function pilihNavigasi(menu, tambahOrderLangsung = false) {
    document.querySelectorAll(".bottom-nav-button").forEach(button => {
        let isActive = button.dataset.bottomTab === menu;
        button.classList.toggle("active", isActive);
        if (isActive) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
    });

    document.querySelectorAll(".modal").forEach(modal => tutupModal(modal.id));

    let tampilkanAkun = menu === "akun";
    document.getElementById("homePage").style.display = tampilkanAkun ? "none" : "flex";
    document.getElementById("ownerAccountPage").classList.toggle("active", tampilkanAkun);

    if (menu === "beranda") {
        permintaanTutupFormOrderDariKeranjang = false;
        batalkanTutupOtomatisFormOrder();
    } else if (menu === "order") {
        if (tambahOrderLangsung) {
            permintaanTutupFormOrderDariKeranjang = true;
            if (tanggalAktif < formatTanggalISO(new Date())) {
                permintaanTutupFormOrderDariKeranjang = false;
                bukaModalOrder();
            } else {
                cekSebelumTambahOrder();
            }
        } else {
            permintaanTutupFormOrderDariKeranjang = false;
            batalkanTutupOtomatisFormOrder();
            bukaModalOrder();
        }
    } else if (menu === "jual") {
        bukaFormPenjualan();
    } else if (menu === "kas") {
        bukaJurnalKas();
    } else if (menu === "transaksi") {
        document.getElementById("modalTransaksi").style.display = "flex";
    }
}

function bukaOrderDariMenuTransaksi() {
    tutupModal("modalTransaksi");
    pilihNavigasi("order");
}

function bukaKasDariMenuTransaksi() {
    tutupModal("modalTransaksi");
    pilihNavigasi("kas");
}

function bukaJurnalKas() {
    tutupFormJurnalKas();
    renderJurnalKas();
    document.getElementById("modalJurnalKas").style.display = "flex";
}

function bukaFormJurnalKas() {
    aturUlangFormJurnalKas();
    document.getElementById("daftarJurnalKas").hidden = true;
    document.getElementById("formMutasiKas").hidden = false;
    document.getElementById("cariAkunJurnal").focus();
}

function tutupFormJurnalKas() {
    document.getElementById("formMutasiKas").hidden = true;
    document.getElementById("daftarJurnalKas").hidden = false;
}

function tutupJurnalKas() {
    tutupModal("modalJurnalKas");
    document.getElementById("modalTransaksi").style.display = "flex";
}

function geserMingguKas(jumlahMinggu) {
    let tanggalBaru = new Date(`${tanggalMulaiKasAktif}T00:00:00`);
    tanggalBaru.setDate(tanggalBaru.getDate() + (jumlahMinggu * 7));
    let tanggalHariIni = formatTanggalISO(new Date());
    if (formatTanggalISO(tanggalBaru) > tanggalHariIni) return;
    tanggalMulaiKasAktif = formatTanggalISO(tanggalBaru);
    renderJurnalKas();
}

function bukaPemilihTanggalKas() {
    let inputTanggal = document.getElementById("inputTanggalKas");
    inputTanggal.value = tanggalMulaiKasAktif;
    if (typeof inputTanggal.showPicker === "function") inputTanggal.showPicker();
    else inputTanggal.click();
}

function pilihTanggalMingguKas(tanggal) {
    if (!tanggal || tanggal > formatTanggalISO(new Date())) return;
    let tanggalDipilih = new Date(`${tanggal}T00:00:00`);
    tanggalDipilih.setDate(tanggalDipilih.getDate() - ((tanggalDipilih.getDay() + 6) % 7));
    tanggalMulaiKasAktif = formatTanggalISO(tanggalDipilih);
    renderJurnalKas();
}

function formatTanggalKas(dateStr) {
    return new Date(`${dateStr}T00:00:00`).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short"
    });
}

function namaAkunKas(kodeAkun) {
    let akun = akunDatabase.find(item =>
        item.kode.toLowerCase() === kodeAkun.toLowerCase() ||
        item.nama.toLowerCase() === kodeAkun.toLowerCase()
    );
    if (akun) return `${akun.kode} · ${akun.nama}`;
    let namaBawaan = {
        kas_tunai: "Kas Tunai",
        kas_non_tunai: "Kas Non-Tunai",
        rekening_bank: "Rekening Bank",
        piutang: "Piutang",
        tabungan_pelanggan: "Tabungan Pelanggan"
    };
    return namaBawaan[kodeAkun] || kodeAkun;
}

function renderJurnalKas() {
    let tanggalMulai = new Date(`${tanggalMulaiKasAktif}T00:00:00`);
    let tanggalAkhir = new Date(`${tanggalMulaiKasAktif}T00:00:00`);
    tanggalAkhir.setDate(tanggalAkhir.getDate() + 6);
    let tanggalAkhirISO = formatTanggalISO(tanggalAkhir);
    let inputTanggalKas = document.getElementById("inputTanggalKas");
    inputTanggalKas.value = tanggalMulaiKasAktif;
    inputTanggalKas.max = formatTanggalISO(new Date());
    let rentangTanggal = tanggalMulai.getFullYear() === tanggalAkhir.getFullYear()
        ? `${formatTanggalKas(tanggalMulaiKasAktif)} – ${formatTanggalKas(tanggalAkhirISO)} ${tanggalAkhir.getFullYear()}`
        : `${formatTanggalKas(tanggalMulaiKasAktif)} ${tanggalMulai.getFullYear()} – ${formatTanggalKas(tanggalAkhirISO)} ${tanggalAkhir.getFullYear()}`;
    document.getElementById("rentangTanggalKas").innerText = rentangTanggal;

    let akunAktif = document.getElementById("filterAkunKas").value;
    let penjualanPerTransaksi = new Map();
    mutasiKasPenjualan
        .filter(mutasi => mutasi.akun === akunAktif &&
            (mutasi.metodeBayar === "CASH" || mutasi.metodeBayar === "KEMBALIAN" || mutasi.metodeBayar === "QRIS"))
        .forEach(mutasi => {
            let idTransaksi = mutasi.transaksiId || mutasi.id;
            let key = `${mutasi.akun}:${idTransaksi}`;
            let penjualan = penjualanPerTransaksi.get(key);
            if (!penjualan) {
                penjualan = {
                    id: key,
                    tgl: mutasi.tgl,
                    waktu: mutasi.waktu || "",
                    arah: "masuk",
                    nama: mutasi.pelanggan || "Pelanggan Umum",
                    keterangan: mutasi.metodeBayar === "QRIS" ? "Penjualan QRIS" : "Penjualan tunai",
                    jumlah: 0
                };
                penjualanPerTransaksi.set(key, penjualan);
            }
            penjualan.jumlah += Number(mutasi.jumlah) || 0;
        });

    let semuaMutasi = [
        ...[...penjualanPerTransaksi.values()].filter(mutasi => mutasi.jumlah > 0),
        ...mutasiKasManual.filter(mutasi => mutasi.akun === akunAktif)
    ].filter(mutasi => /^\d{4}-\d{2}-\d{2}$/.test(mutasi.tgl))
        .sort((a, b) => a.tgl.localeCompare(b.tgl) ||
            String(a.waktu || "").localeCompare(String(b.waktu || "")) ||
            String(a.id).localeCompare(String(b.id)));
    let body = document.getElementById("tabelJurnalKasBody");
    body.closest(".cash-journal-table-wrap").setAttribute(
        "aria-label",
        `Jurnal ${akunAktif === "kas_tunai" ? "kas tunai" : "rekening bank"}`
    );
    body.replaceChildren();
    let saldoAkunBerjalan = 0;
    let jumlahBarisMingguIni = 0;
    semuaMutasi.forEach(mutasi => {
        let jumlah = Number(mutasi.jumlah) || 0;
        saldoAkunBerjalan += mutasi.arah === "keluar" ? -jumlah : jumlah;
        if (mutasi.tgl < tanggalMulaiKasAktif || mutasi.tgl > tanggalAkhirISO) return;
        jumlahBarisMingguIni++;
        let row = document.createElement("tr");
        let tanggalCell = document.createElement("td");
        tanggalCell.className = "cash-date-cell";
        tanggalCell.textContent = formatTanggalKas(mutasi.tgl);

        let namaCell = document.createElement("td");
        namaCell.className = "cash-party-cell";
        namaCell.textContent = mutasi.nama || "Transaksi";

        let masukCell = document.createElement("td");
        masukCell.className = "cash-flow-cell is-incoming";
        masukCell.textContent = mutasi.arah === "keluar" ? "—" : jumlah.toLocaleString("id-ID");

        let keluarCell = document.createElement("td");
        keluarCell.className = "cash-flow-cell is-outgoing";
        keluarCell.textContent = mutasi.arah === "keluar" ? jumlah.toLocaleString("id-ID") : "—";

        let saldoCell = document.createElement("td");
        saldoCell.className = "cash-balance-cell";
        saldoCell.textContent = saldoAkunBerjalan.toLocaleString("id-ID");
        let statusCell = document.createElement("td");
        statusCell.className = "cash-status-cell";
        statusCell.textContent = mutasi.keterangan || "";

        row.append(tanggalCell, namaCell, masukCell, keluarCell, saldoCell, statusCell);
        body.appendChild(row);
    });

    let pesanKosong = document.getElementById("pesanJurnalKasKosong");
    pesanKosong.hidden = jumlahBarisMingguIni > 0;
}

const bentukFormJurnal = {
    Operasional: { nada: "keluar", lencana: "Biaya keluar", judul: "Operasional", isi: "Nilai ini mengurangi kas, rekening, atau gabungan keduanya.", labelNilai: "Nilai biaya", labelCara: "Bayar lewat", arah: "keluar" },
    Beban: { nada: "keluar", lencana: "Biaya keluar", judul: "Beban", isi: "Nilai ini mengurangi kas, rekening, atau gabungan keduanya.", labelNilai: "Nilai biaya", labelCara: "Bayar lewat", arah: "keluar" },
    Pendapatan: { nada: "masuk", lencana: "Uang masuk", judul: "Pendapatan", isi: "Nilai ini menambah kas, rekening, atau gabungan keduanya.", labelNilai: "Nilai masuk", labelCara: "Masuk lewat", arah: "masuk" },
    Kewajiban: { nada: "hutang", lencana: "Bayar hutang", judul: "Kewajiban", isi: "Pelunasan mengurangi kas atau rekening.", labelNilai: "Nilai bayar", labelCara: "Bayar lewat", arah: "keluar" },
    Aset: { nada: "keluar", lencana: "Aset", judul: "Aset", isi: "Pilih transfer masuk atau keluar, lalu lewat kas, rekening, atau gabungan.", labelNilai: "Nilai", labelCara: "Lewat", arahPilihan: true, labelMasuk: "Transfer masuk", labelKeluar: "Transfer keluar" },
    Modal: { nada: "masuk", lencana: "Modal", judul: "Modal", isi: "Setoran menambah uang. Penarikan mengurangi uang.", labelNilai: "Nilai", labelCara: "Lewat", arahPilihan: true, labelMasuk: "Setoran", labelKeluar: "Penarikan" }
};

function akunJurnalDariKode(kode) {
    return akunDatabase.find(akun => akun.kode === kode);
}

function aturUlangFormJurnalKas() {
    let tanggalHariIni = formatTanggalISO(new Date());
    let inputTanggal = document.getElementById("tanggalMutasiKas");
    let cariAkun = document.getElementById("cariAkunJurnal");
    inputTanggal.max = tanggalHariIni;
    inputTanggal.value = tanggalHariIni;
    cariAkun.value = "";
    delete cariAkun.dataset.kode;
    document.getElementById("nilaiJurnal").value = "";
    document.getElementById("nilaiKasJurnal").value = "";
    document.getElementById("nilaiRekeningJurnal").value = "";
    document.getElementById("statusMutasiKas").textContent = "";
    document.getElementById("statusMutasiKas").dataset.state = "";
    pilihCaraBayarJurnal("kas_tunai");
    pilihArahJurnal("masuk");
    sembunyikanSaranAkunJurnal();
    sembunyikanPanelJenisJurnal();
}

function sembunyikanPanelJenisJurnal() {
    document.getElementById("panelJenisJurnal").hidden = true;
}

function tampilkanSaranAkunJurnal(kata) {
    let daftar = document.getElementById("saranAkunJurnal");
    let cari = document.getElementById("cariAkunJurnal");
    let kataCari = kata.trim().toLowerCase();
    let hasil = akunDatabase.filter(akun =>
        !kataCari ||
        String(akun.kode).toLowerCase().includes(kataCari) ||
        String(akun.nama).toLowerCase().includes(kataCari)
    );
    daftar.replaceChildren();
    if (hasil.length === 0) {
        let kosong = document.createElement("div");
        kosong.className = "journal-suggestion-empty";
        kosong.textContent = akunDatabase.length === 0
            ? "Belum ada akun. Tambah dulu di Daftar Akun."
            : "Akun tidak ditemukan.";
        daftar.appendChild(kosong);
    } else {
        hasil.forEach((akun, index) => {
            let tombol = document.createElement("button");
            tombol.type = "button";
            tombol.className = index === 0 ? "journal-suggestion is-active" : "journal-suggestion";
            tombol.dataset.kodeAkun = akun.kode;
            tombol.setAttribute("role", "option");
            let kode = document.createElement("span");
            kode.className = "journal-suggestion-code";
            kode.textContent = akun.kode;
            let nama = document.createElement("span");
            nama.className = "journal-suggestion-name";
            nama.textContent = akun.nama;
            let jenis = document.createElement("span");
            jenis.className = "journal-suggestion-kind";
            jenis.textContent = akun.jenis || "Akun";
            tombol.append(kode, nama, jenis);
            daftar.appendChild(tombol);
        });
    }
    daftar.hidden = false;
    cari.setAttribute("aria-expanded", "true");
}

function sembunyikanSaranAkunJurnal() {
    let daftar = document.getElementById("saranAkunJurnal");
    if (!daftar) return;
    daftar.hidden = true;
    daftar.replaceChildren();
    document.getElementById("cariAkunJurnal").setAttribute("aria-expanded", "false");
}

function pilihAkunJurnal(kode) {
    let akun = akunJurnalDariKode(kode);
    if (!akun) return;
    let input = document.getElementById("cariAkunJurnal");
    input.value = `${akun.kode} · ${akun.nama}`;
    input.dataset.kode = akun.kode;
    sembunyikanSaranAkunJurnal();
    tampilkanFormJenisJurnal(akun);
}

function tampilkanFormJenisJurnal(akun) {
    let bentuk = bentukFormJurnal[akun.jenis] || {
        nada: "keluar",
        lencana: akun.jenis || "Akun",
        judul: akun.nama,
        isi: "Isi nilai, lalu pilih kas, rekening, atau gabungan.",
        labelNilai: "Nilai",
        labelCara: "Lewat",
        arahPilihan: true,
        labelMasuk: "Masuk",
        labelKeluar: "Keluar"
    };
    let panel = document.getElementById("panelJenisJurnal");
    panel.hidden = false;
    panel.dataset.nada = bentuk.nada;
    document.getElementById("lencanaJenisJurnal").textContent = bentuk.lencana;
    document.getElementById("judulJenisJurnal").textContent = `${akun.kode} · ${akun.nama}`;
    document.getElementById("isiJenisJurnal").textContent = bentuk.isi;
    document.getElementById("labelNilaiJurnal").textContent = bentuk.labelNilai;
    document.getElementById("labelCaraBayarJurnal").textContent = bentuk.labelCara;
    let arah = document.getElementById("arahJurnal");
    arah.hidden = !bentuk.arahPilihan;
    if (bentuk.arahPilihan) {
        document.getElementById("arahMasukJurnal").textContent = bentuk.labelMasuk;
        document.getElementById("arahKeluarJurnal").textContent = bentuk.labelKeluar;
        pilihArahJurnal(akun.jenis === "Modal" ? "masuk" : "keluar");
    }
    pilihCaraBayarJurnal("kas_tunai");
}

function pilihCaraBayarJurnal(cara) {
    ["kas_tunai", "rekening_bank", "gabungan"].forEach(nilai => {
        let tombol = document.querySelector(`[data-cara-bayar="${nilai}"]`);
        if (tombol) tombol.classList.toggle("is-selected", nilai === cara);
    });
    let pecahan = document.getElementById("pecahanBayarJurnal");
    pecahan.hidden = cara !== "gabungan";
    if (cara !== "gabungan") {
        document.getElementById("nilaiKasJurnal").value = "";
        document.getElementById("nilaiRekeningJurnal").value = "";
    }
    perbaruiPecahanJurnal();
}

function caraBayarJurnal() {
    let terpilih = document.querySelector("[data-cara-bayar].is-selected");
    return terpilih ? terpilih.dataset.caraBayar : "kas_tunai";
}

function pilihArahJurnal(arah) {
    document.querySelectorAll("[data-arah-jurnal]").forEach(tombol => {
        tombol.classList.toggle("is-selected", tombol.dataset.arahJurnal === arah);
    });
    let panel = document.getElementById("panelJenisJurnal");
    if (!document.getElementById("arahJurnal").hidden) panel.dataset.nada = arah === "masuk" ? "masuk" : "keluar";
}

function arahJurnalTerpilih() {
    let akun = akunJurnalDariKode(document.getElementById("cariAkunJurnal").dataset.kode || "");
    let bentuk = akun && bentukFormJurnal[akun.jenis];
    if (bentuk && !bentuk.arahPilihan) return bentuk.arah;
    let terpilih = document.querySelector("[data-arah-jurnal].is-selected");
    return terpilih ? terpilih.dataset.arahJurnal : "keluar";
}

function perbaruiPecahanJurnal() {
    let pesan = document.getElementById("sisaPecahanJurnal");
    if (!pesan || document.getElementById("pecahanBayarJurnal").hidden) return;
    let nilai = Number(document.getElementById("nilaiJurnal").value);
    let kas = Number(document.getElementById("nilaiKasJurnal").value);
    let rekening = Number(document.getElementById("nilaiRekeningJurnal").value);
    if (!Number.isSafeInteger(nilai) || nilai <= 0 || !Number.isSafeInteger(kas) || kas <= 0 || !Number.isSafeInteger(rekening) || rekening <= 0) {
        pesan.textContent = "Isi bagian kas dan rekening. Jumlah keduanya sama dengan nilai di atas.";
        delete pesan.dataset.state;
        return;
    }
    let selisih = nilai - (kas + rekening);
    if (selisih === 0) {
        pesan.textContent = "Kas dan rekening sudah sama dengan nilai.";
        pesan.dataset.state = "cocok";
    } else {
        pesan.textContent = selisih > 0
            ? `Masih kurang Rp ${selisih.toLocaleString("id-ID")}.`
            : `Kelebihan Rp ${Math.abs(selisih).toLocaleString("id-ID")}.`;
        pesan.dataset.state = "selisih";
    }
}

function navigasiSaranAkunJurnal(event) {
    let daftar = [...document.querySelectorAll("#saranAkunJurnal [data-kode-akun]")];
    let saranTerbuka = !document.getElementById("saranAkunJurnal").hidden && daftar.length > 0;
    if (event.key === "ArrowDown" && !saranTerbuka) {
        tampilkanSaranAkunJurnal(event.target.value);
        return;
    }
    if (!saranTerbuka) return;
    let aktif = daftar.findIndex(item => item.classList.contains("is-active"));
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        aktif = event.key === "ArrowDown"
            ? (aktif + 1) % daftar.length
            : (aktif - 1 + daftar.length) % daftar.length;
        daftar.forEach((item, index) => item.classList.toggle("is-active", index === aktif));
        daftar[aktif].scrollIntoView({ block: "nearest" });
    } else if (event.key === "Enter" && aktif >= 0) {
        event.preventDefault();
        pilihAkunJurnal(daftar[aktif].dataset.kodeAkun);
    } else if (event.key === "Escape") {
        sembunyikanSaranAkunJurnal();
    }
}

function siapkanFormJurnalKas() {
    let form = document.getElementById("formMutasiKas");
    let cari = document.getElementById("cariAkunJurnal");
    if (!form || !cari || cari.dataset.siap === "ya") return;
    cari.dataset.siap = "ya";
    cari.addEventListener("input", () => {
        let akun = akunJurnalDariKode(cari.dataset.kode || "");
        if (akun && cari.value !== `${akun.kode} · ${akun.nama}`) {
            delete cari.dataset.kode;
            sembunyikanPanelJenisJurnal();
        }
        tampilkanSaranAkunJurnal(cari.value);
    });
    cari.addEventListener("focus", () => tampilkanSaranAkunJurnal(cari.value));
    cari.addEventListener("keydown", navigasiSaranAkunJurnal);
    form.addEventListener("click", event => {
        let saran = event.target.closest("[data-kode-akun]");
        if (saran) {
            pilihAkunJurnal(saran.dataset.kodeAkun);
            return;
        }
        let cara = event.target.closest("[data-cara-bayar]");
        if (cara) pilihCaraBayarJurnal(cara.dataset.caraBayar);
        let arah = event.target.closest("[data-arah-jurnal]");
        if (arah) pilihArahJurnal(arah.dataset.arahJurnal);
    });
    ["nilaiJurnal", "nilaiKasJurnal", "nilaiRekeningJurnal"].forEach(id => {
        document.getElementById(id).addEventListener("input", perbaruiPecahanJurnal);
    });
    document.addEventListener("click", event => {
        if (!event.target.closest(".journal-account-card")) sembunyikanSaranAkunJurnal();
    });
}

function gagalSimpanJurnal(pesan) {
    let status = document.getElementById("statusMutasiKas");
    status.textContent = pesan;
    status.dataset.state = "error";
}

function simpanMutasiKasManual(event) {
    event.preventDefault();
    let tgl = document.getElementById("tanggalMutasiKas").value;
    let akun = akunJurnalDariKode(document.getElementById("cariAkunJurnal").dataset.kode || "");
    let nilai = Number(document.getElementById("nilaiJurnal").value);
    let cara = caraBayarJurnal();
    let arah = arahJurnalTerpilih();
    let hariIni = formatTanggalISO(new Date());

    if (!tgl || tgl > hariIni) {
        gagalSimpanJurnal("Tanggal belum diisi, atau masih tanggal yang akan datang.");
        return;
    }
    if (!akun) {
        gagalSimpanJurnal("Pilih akun dari daftar. Ketik nama atau kodenya, lalu ketuk pilihan yang muncul.");
        return;
    }
    if (!Number.isSafeInteger(nilai) || nilai <= 0 || !["masuk", "keluar"].includes(arah)) {
        gagalSimpanJurnal("Isi nilai dengan angka utuh yang lebih dari nol.");
        return;
    }

    let bagian = [];
    if (cara === "gabungan") {
        let kas = Number(document.getElementById("nilaiKasJurnal").value);
        let rekening = Number(document.getElementById("nilaiRekeningJurnal").value);
        if (!Number.isSafeInteger(kas) || !Number.isSafeInteger(rekening) || kas <= 0 || rekening <= 0 || kas + rekening !== nilai) {
            gagalSimpanJurnal("Gabungan kas dan rekening harus terisi, dan jumlahnya sama dengan nilai.");
            return;
        }
        bagian = [
            { akun: "kas_tunai", jumlah: kas },
            { akun: "rekening_bank", jumlah: rekening }
        ];
    } else if (cara === "kas_tunai" || cara === "rekening_bank") {
        bagian = [{ akun: cara, jumlah: nilai }];
    } else {
        gagalSimpanJurnal("Pilih kas tunai, rekening, atau gabungan.");
        return;
    }

    let waktu = new Date().toISOString();
    let kelompok = `KAS-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    let mutasiBaru = bagian.map((potongan, index) => ({
        id: `${kelompok}-${index + 1}`,
        kelompok,
        tgl,
        waktu,
        akun: potongan.akun,
        arah,
        nama: akun.nama,
        jumlah: potongan.jumlah,
        keterangan: `${akun.jenis} · ${akun.kode}`,
        kodeAkun: akun.kode,
        jenisAkun: akun.jenis,
        caraBayar: cara
    }));

    try {
        localStorage.setItem("aliceMutasiKasManual", JSON.stringify([...mutasiKasManual, ...mutasiBaru]));
    } catch (error) {
        gagalSimpanJurnal(`Transaksi belum tersimpan: ${error.message}`);
        return;
    }
    mutasiKasManual.push(...mutasiBaru);
    document.getElementById("filterAkunKas").value = bagian[0].akun;
    tutupFormJurnalKas();
    pilihTanggalMingguKas(tgl);
}

siapkanFormJurnalKas();

function bukaJualDariMenuTransaksi() {
    tutupModal("modalTransaksi");
    kembaliKeKasirDariRiwayat = false;
    tanggalRiwayatPenjualan = tanggalAktif;
    renderRiwayatPenjualanLengkap();
    document.getElementById("modalRiwayatPenjualan").style.display = "flex";
}

function bukaRiwayatPenjualanDariKasir() {
    kembaliKeKasirDariRiwayat = true;
    tanggalRiwayatPenjualan = tanggalAktif;
    renderRiwayatPenjualanLengkap();
    tutupModal("modalPenjualan");
    document.getElementById("modalRiwayatPenjualan").style.display = "flex";
}

function tutupRiwayatPenjualan() {
    tutupModal("modalRiwayatPenjualan");
    if (kembaliKeKasirDariRiwayat) {
        kembaliKeKasirDariRiwayat = false;
        document.getElementById("modalPenjualan").style.display = "flex";
        return;
    }
    document.getElementById("modalTransaksi").style.display = "flex";
}

function bukaKasirDariRiwayat() {
    tutupModal("modalRiwayatPenjualan");
    if (kembaliKeKasirDariRiwayat) {
        kembaliKeKasirDariRiwayat = false;
        document.getElementById("modalPenjualan").style.display = "flex";
        return;
    }
    pilihNavigasi("jual");
}

function geserHariRiwayatPenjualan(jumlahHari) {
    let tanggalBerikutnya = tanggalRiwayatPenjualan;
    if (jumlahHari < 0) {
        tanggalBerikutnya = getTanggalKemarin(tanggalRiwayatPenjualan);
    } else if (jumlahHari > 0) {
        let tanggalMaju = new Date(`${tanggalRiwayatPenjualan}T00:00:00`);
        tanggalMaju.setDate(tanggalMaju.getDate() + 1);
        tanggalBerikutnya = formatTanggalISO(tanggalMaju);
    }

    if (tanggalBerikutnya > formatTanggalISO(new Date())) return;
    tanggalRiwayatPenjualan = tanggalBerikutnya;
    renderRiwayatPenjualanLengkap();
}

function bukaRiwayatPenjualanHariIni() {
    tanggalRiwayatPenjualan = formatTanggalISO(new Date());
    renderRiwayatPenjualanLengkap();
}

function mulaiGeserRiwayatPenjualan(event) {
    posisiAwalGeserRiwayatPenjualan = event.changedTouches[0].clientX;
}

function akhiriGeserRiwayatPenjualan(event) {
    if (posisiAwalGeserRiwayatPenjualan === null) return;
    let jarakGeser = event.changedTouches[0].clientX - posisiAwalGeserRiwayatPenjualan;
    posisiAwalGeserRiwayatPenjualan = null;
    if (Math.abs(jarakGeser) < 55) return;
    geserHariRiwayatPenjualan(jarakGeser > 0 ? -1 : 1);
}

function barangLayakDijual() {
    return barangList.filter(barang => barang.jenis === "Barang Toko" || barang.jenis === "Roti");
}

function namaPelangganPenjualan() {
    return "";
}

function hargaJualUntukPelanggan(barang, namaPelanggan = namaPelangganPenjualan()) {
    let hargaKhusus = namaPelanggan && hargaKhususPelanggan[namaPelanggan]
        ? Number(hargaKhususPelanggan[namaPelanggan][barang.kode])
        : NaN;
    return Number.isFinite(hargaKhusus) ? hargaKhusus : Number(barang.detail) || 0;
}

function bukaFormPenjualan(opsi = {}) {
    if (!opsi.lanjutEdit) {
        penjualanSedangDiedit = "";
        pelangganSedangDiedit = "";
    }
    if (tanggalAktifAdalahArsip() && !penjualanSedangDiedit) {
        alert("Tanggal lampau hanya dapat dilihat sebagai arsip. Penjualan tidak dapat ditambahkan.");
        return;
    }

    pembayaranKurangMenungguKonfirmasi = null;
    document.getElementById("salesDateLabel").innerText = formatTanggalIndo(tanggalAktif).formatLengkap;
    document.getElementById("jualBarang").value = "";
    perbaruiSaranBarangJual("");
    document.getElementById("jumlahBayarPenjualan").value = "";
    document.getElementById("modalPenjualan").style.display = "flex";
    renderKeranjangPenjualan();
    perbaruiPembayaranPenjualan();
}

function pilihBarangPenjualan() {
    let nilai = document.getElementById("jualBarang").value.trim().toLowerCase();
    perbaruiSaranBarangJual(nilai);
}

function tanganiTombolCariBarang(event) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    let nilai = document.getElementById("jualBarang").value.trim().toLowerCase();
    let barang = barangLayakDijual().find(item =>
        String(item.kode).trim().toLowerCase() === nilai ||
        String(item.nama).trim().toLowerCase() === nilai
    );
    if (barang) pilihSaranBarangJual(barang.kode);
}

function pilihSaranBarangJual(kode) {
    let barang = barangLayakDijual().find(item => item.kode === kode);
    if (!barang) return;

    document.getElementById("jualBarang").value = "";
    perbaruiSaranBarangJual("");
    tambahBarangKeKeranjang(barang);
}

function perbaruiSaranBarangJual(teksCari) {
    let kataKunci = String(teksCari || "").trim().toLowerCase();
    let daftarSaran = document.getElementById("daftarBarangJual");
    daftarSaran.innerHTML = "";
    daftarSaran.hidden = !kataKunci;
    if (!kataKunci) return;

    let hasil = barangLayakDijual()
        .filter(barang => !kataKunci ||
            String(barang.nama).toLowerCase().includes(kataKunci) ||
            String(barang.kode).toLowerCase().includes(kataKunci));
    if (hasil.length === 0) {
        let kosong = document.createElement("div");
        kosong.className = "sales-suggestion-empty";
        kosong.textContent = "Barang tidak ditemukan";
        daftarSaran.appendChild(kosong);
        return;
    }

    hasil.slice(0, 12).forEach(barang => {
        let saran = document.createElement("button");
        saran.type = "button";
        saran.className = "sales-suggestion";
        saran.setAttribute("role", "option");
        let nama = document.createElement("span");
        nama.textContent = barang.nama;
        let kode = document.createElement("small");
        kode.textContent = barang.kode;
        saran.append(nama, kode);
        saran.addEventListener("mousedown", event => event.preventDefault());
        saran.addEventListener("click", () => pilihSaranBarangJual(barang.kode));
        daftarSaran.appendChild(saran);
    });
}

function tambahBarangKeKeranjang(barang) {
    if (tanggalAktifAdalahArsip() && !penjualanSedangDiedit) {
        alert("Tanggal lampau hanya dapat dilihat sebagai arsip. Penjualan tidak dapat ditambahkan.");
        return;
    }

    if (barang.jenis === "Roti" &&
        (String(barang.kode).toLowerCase() === "rt" || String(barang.nama).toLowerCase().includes("bakar"))) {
        renderStokSiapJualRT();
    }

    if (barang.jenis === "Roti" && !Object.prototype.hasOwnProperty.call(stokBarangPenjualan, barang.kode)) {
        barangMenungguStokProduksi = barang;
        document.getElementById("namaBarangStokProduksi").innerText = barang.nama;
        document.getElementById("qtyStokAwalProduksi").value = "0";
        document.getElementById("modalStokAwalProduksi").style.display = "flex";
        return;
    }

    let hargaSatuan = hargaJualUntukPelanggan(barang);
    let itemSama = keranjangPenjualan.find(item => item.kode === barang.kode && item.hargaSatuan === hargaSatuan);
    if (itemSama) itemSama.jumlah += 1;
    else {
        keranjangPenjualan.push({
            kode: barang.kode,
            nama: barang.nama,
            jenisBarang: barang.jenis,
            unitBarang: barang.jenis === "Roti" ? "pcs" : barang.satuanBarang || "pcs",
            hargaSatuan,
            hargaNormal: Number(barang.detail) || 0,
            jumlah: 1
        });
    }

    document.getElementById("jualBarang").value = "";
    document.getElementById("jualBarang").focus();
    renderKeranjangPenjualan();
}

function simpanStokAwalProduksi() {
    let jumlahAwal = Number(document.getElementById("qtyStokAwalProduksi").value);
    if (!barangMenungguStokProduksi || !Number.isInteger(jumlahAwal) || jumlahAwal < 0) {
        alert("Masukkan jumlah stok awal berupa bilangan bulat nol atau lebih.");
        return;
    }
    stokBarangPenjualan[barangMenungguStokProduksi.kode] = jumlahAwal;
    localStorage.setItem("aliceStokBarangPenjualan", JSON.stringify(stokBarangPenjualan));
    let barang = barangMenungguStokProduksi;
    let mutasiStok = JSON.parse(localStorage.getItem("aliceMutasiStokBarang")) || [];
    mutasiStok.push({
        id: `STOK-AWAL-${Date.now()}`,
        tgl: formatTanggalISO(new Date()),
        kode: barang.kode,
        nama: barang.nama,
        tipe: "stok_awal",
        jumlah: jumlahAwal,
        satuan: "pcs"
    });
    localStorage.setItem("aliceMutasiStokBarang", JSON.stringify(mutasiStok));
    barangMenungguStokProduksi = null;
    tutupModal("modalStokAwalProduksi");
    tambahBarangKeKeranjang(barang);
}

function batalInputStokAwalProduksi() {
    barangMenungguStokProduksi = null;
    tutupModal("modalStokAwalProduksi");
    document.getElementById("jualBarang").value = "";
}

function pelangganPenjualanBerubah() {
    let pelanggan = namaPelangganPenjualan();
    keranjangPenjualan.forEach(item => {
        let barang = barangLayakDijual().find(master => master.kode === item.kode);
        if (!barang) return;
        if (pelanggan && hargaKhususPelanggan[pelanggan] &&
            Object.prototype.hasOwnProperty.call(hargaKhususPelanggan[pelanggan], item.kode)) {
            item.hargaSatuan = hargaJualUntukPelanggan(barang, pelanggan);
        } else {
            item.hargaSatuan = item.hargaNormal;
        }
    });
    renderKeranjangPenjualan();
}

function hapusItemKeranjangPenjualan(index) {
    keranjangPenjualan.splice(index, 1);
    renderKeranjangPenjualan();
}

function ubahItemKeranjangPenjualan(index, kolom, nilai) {
    if (!keranjangPenjualan[index]) return;
    keranjangPenjualan[index][kolom] = nilai === "" ? "" : Number(nilai);
    let item = keranjangPenjualan[index];
    let subtotal = (Number(item.hargaSatuan) || 0) * (Number(item.jumlah) || 0);
    let subtotalElement = document.getElementById(`subtotalPenjualan${index}`);
    if (subtotalElement) subtotalElement.innerText = `Rp ${subtotal.toLocaleString("id-ID")}`;
    perbaruiPembayaranPenjualan();
}

function simpanHargaKhususPelanggan(index) {
    let namaPelanggan = namaPelangganPenjualan();
    let item = keranjangPenjualan[index];
    let harga = Number(item && item.hargaSatuan);
    if (!namaPelanggan) {
        alert("Pilih pelanggan terlebih dahulu untuk menyimpan harga khusus.");
        return;
    }
    if (!item || !Number.isFinite(harga) || harga < 0) {
        alert("Masukkan harga yang valid sebelum menyimpannya.");
        return;
    }

    if (!hargaKhususPelanggan[namaPelanggan]) hargaKhususPelanggan[namaPelanggan] = {};
    hargaKhususPelanggan[namaPelanggan][item.kode] = harga;
    localStorage.setItem("aliceHargaKhususPelanggan", JSON.stringify(hargaKhususPelanggan));
    alert(`Harga khusus ${item.nama} untuk ${namaPelanggan} berhasil disimpan.`);
}

function renderKeranjangPenjualan() {
    let container = document.getElementById("daftarBelanjaJual");
    container.innerHTML = "";
    document.getElementById("daftarBelanjaKosong").style.display = keranjangPenjualan.length ? "none" : "block";
    keranjangPenjualan.forEach((item, index) => {
        let subtotal = (Number(item.hargaSatuan) || 0) * (Number(item.jumlah) || 0);
        container.innerHTML += `<div class="sales-cart-item">
            <div class="sales-cart-product"><strong>${item.nama}</strong><small>${item.kode}</small></div>
            <button type="button" aria-label="Hapus ${item.nama} dari daftar belanja" onclick="hapusItemKeranjangPenjualan(${index})">×</button>
            <div class="sales-cart-edit">
                <label>Qty (${item.unitBarang})<input aria-label="Jumlah ${item.nama}" type="number" min="1" step="1" value="${item.jumlah}" oninput="ubahItemKeranjangPenjualan(${index}, 'jumlah', this.value)"></label>
                <label>Harga<input aria-label="Harga satuan ${item.nama}" type="number" min="0" step="1" value="${item.hargaSatuan}" oninput="ubahItemKeranjangPenjualan(${index}, 'hargaSatuan', this.value)"></label>
                <strong id="subtotalPenjualan${index}">Rp ${subtotal.toLocaleString("id-ID")}</strong>
            </div>
            ${namaPelangganPenjualan() ? `<button class="sales-save-special" type="button" onclick="simpanHargaKhususPelanggan(${index})">Simpan harga khusus</button>` : ""}
        </div>`;
    });
    perbaruiPembayaranPenjualan();
}

function perbaruiPembayaranPenjualan() {
    let total = keranjangPenjualan.reduce((sum, item) =>
        sum + (Number(item.hargaSatuan) || 0) * (Number(item.jumlah) || 0), 0);
    let inputBayar = document.getElementById("jumlahBayarPenjualan");
    document.getElementById("totalBelanjaJual").innerText = `Rp ${total.toLocaleString("id-ID")}`;
    let jumlahBayar = Number(inputBayar.value.replace(/\D/g, "")) || 0;
    let selisih = jumlahBayar - total;
    document.getElementById("labelSelisihBayar").innerText = selisih < 0 ? "Kurang" : "Kembalian";
    document.getElementById("kembalianPenjualan").innerText =
        `Rp ${Math.abs(selisih).toLocaleString("id-ID")}`;
}

function batalkanPenjualanKasir() {
    if (keranjangPenjualan.length > 0 && !window.confirm("Batalkan penjualan dan kosongkan daftar barang?")) return;
    keranjangPenjualan = [];
    pembayaranPenjualanMenungguPelanggan = null;
    pembayaranKurangMenungguKonfirmasi = null;
    penjualanSedangDiedit = "";
    pelangganSedangDiedit = "";
    tutupKasirPenjualan();
}

function tutupKasirPenjualan() {
    if (penjualanSedangDiedit) {
        penjualanSedangDiedit = "";
        pelangganSedangDiedit = "";
        keranjangPenjualan = [];
    }
    tutupModal("modalPenjualan");
    if (kembaliKeDaftarPenjualan) {
        kembaliKeDaftarPenjualan = false;
        renderRiwayatPenjualanLengkap();
        document.getElementById("modalRiwayatPenjualan").style.display = "flex";
    }
}

function renderRiwayatPenjualanLengkap() {
    let hariIni = formatTanggalISO(new Date());
    let transaksiHari = riwayatPenjualan
        .filter(transaksi => transaksi.tgl === tanggalRiwayatPenjualan)
        .slice()
        .sort((a, b) => new Date(b.waktu || `${b.tgl}T00:00:00`) - new Date(a.waktu || `${a.tgl}T00:00:00`));
    let pencarian = document.getElementById("salesHistorySearch").value.trim().toLowerCase();
    let kategoriCari = document.getElementById("salesHistorySearchCategory").value;
    let filterStatus = document.getElementById("salesHistoryStatusFilter").value;
    transaksiHari = transaksiHari.filter(transaksi => {
        let sisa = sisaPembayaranPenjualan(transaksi);
        let status = sisa > 0 ? "kurang bayar" : "lunas";
        let nilaiTotal = Number(transaksi.total) || 0;
        let nilaiBayar = jumlahDibayarPenjualan(transaksi);
        let barang = (Array.isArray(transaksi.items) ? transaksi.items : [])
            .map(item => item.nama || "")
            .join(" ");
        let tanggal = formatTanggalIndo(transaksi.tgl).formatLengkap;
        let fields = {
            nama: transaksi.pelanggan || "Pelanggan Umum",
            barang,
            total: `${nilaiTotal} ${nilaiTotal.toLocaleString("id-ID")}`,
            bayar: `${nilaiBayar} ${nilaiBayar.toLocaleString("id-ID")}`,
            status,
            metode: transaksi.metodeBayar || "CASH",
            transaksi: transaksi.id || "",
            semua: [
                transaksi.pelanggan || "Pelanggan Umum",
                barang,
                nilaiTotal,
                nilaiTotal.toLocaleString("id-ID"),
                nilaiBayar,
                nilaiBayar.toLocaleString("id-ID"),
                status,
                transaksi.metodeBayar || "CASH",
                transaksi.id || "",
                tanggal
            ].join(" ")
        };
        let teksCari = String(fields[kategoriCari] ?? fields.semua).toLowerCase();
        return teksCari.includes(pencarian) &&
            (filterStatus === "semua" || filterStatus === (sisa > 0 ? "kurang" : "lunas"));
    });
    let totalHari = transaksiHari.reduce((total, transaksi) => total + (Number(transaksi.total) || 0), 0);

    let tanggalRingkas = new Date(`${tanggalRiwayatPenjualan}T00:00:00`).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        ...(tanggalRiwayatPenjualan === hariIni ? {} : { year: "numeric" })
    });
    document.getElementById("salesHistoryDayLabel").innerText =
        tanggalRiwayatPenjualan === hariIni ? `Hari ini · ${tanggalRingkas}` : tanggalRingkas;
    document.getElementById("salesHistoryNextDay").disabled = tanggalRiwayatPenjualan >= hariIni;
    document.getElementById("salesHistoryDayCount").innerText = `${transaksiHari.length} transaksi`;
    document.getElementById("salesHistoryDayTotal").innerText = `Rp ${totalHari.toLocaleString("id-ID")}`;
    let entries = document.getElementById("salesHistoryDayEntries");
    if (transaksiHari.length === 0) {
        let kosong = document.createElement("p");
        kosong.className = "sales-history-empty";
        kosong.innerText = pencarian || filterStatus !== "semua"
            ? "Tidak ada penjualan yang sesuai dengan pencarian atau filter."
            : "Belum ada catatan penjualan pada tanggal ini. Geser ke kanan untuk melihat hari sebelumnya.";
        entries.replaceChildren(kosong);
        return;
    }
    entries.replaceChildren(buatTabelRiwayatPenjualan(transaksiHari));
}

function bukaDetailNotaPenjualan(transaksi) {
    detailNotaTerlihat = transaksi.id || "";
    let waktu = transaksi.waktu ? new Date(transaksi.waktu) : null;
    let waktuLabel = waktu && !Number.isNaN(waktu.getTime())
        ? waktu.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        : "";
    document.getElementById("detailNotaTanggal").innerText =
        `${formatTanggalIndo(transaksi.tgl).formatLengkap}${waktuLabel ? ` · ${waktuLabel}` : ""}`;

    let content = document.getElementById("detailNotaContent");
    let fragment = document.createDocumentFragment();
    let info = document.createElement("div");
    info.className = "sales-receipt-info";
    [
        ["No. Nota", transaksi.noNota || transaksi.id || "—"],
        ["Pelanggan", transaksi.pelanggan || "Pelanggan Umum"]
    ].forEach(([label, value]) => {
        let row = document.createElement("div");
        row.className = "sales-receipt-info-row";
        let labelElement = document.createElement("span");
        labelElement.innerText = label;
        let valueElement = document.createElement("strong");
        valueElement.innerText = value;
        row.append(labelElement, valueElement);
        info.appendChild(row);
    });
    fragment.appendChild(info);

    let items = Array.isArray(transaksi.items) ? transaksi.items : [];
    let itemList = document.createElement("div");
    itemList.className = "sales-receipt-items";
    items.forEach(item => {
        let row = document.createElement("article");
        row.className = "sales-receipt-item";
        let details = document.createElement("div");
        details.className = "sales-receipt-item-details";
        let name = document.createElement("strong");
        name.innerText = item.nama || "Barang";
        let formula = document.createElement("span");
        let quantity = Number(item.jumlah) || 0;
        let unitPrice = Number(item.hargaSatuan) || 0;
        formula.innerText =
            `${quantity} ${item.satuan || "pcs"} × Rp ${unitPrice.toLocaleString("id-ID")}`;
        details.append(name, formula);
        let amount = document.createElement("strong");
        amount.innerText =
            `Rp ${(Number(item.subtotal) || quantity * unitPrice).toLocaleString("id-ID")}`;
        row.append(details, amount);
        itemList.appendChild(row);
    });
    fragment.appendChild(itemList);

    let total = Number(transaksi.total) || 0;
    let pembayaran = transaksi.pembayaran || {};
    let sisa = sisaPembayaranPenjualan(transaksi);
    let metode = String(transaksi.metodeBayar || "CASH");
    let paymentRows = [
        ["Total", total],
        ["Tunai diterima", Number.isFinite(Number(pembayaran.tunaiDiterima))
            ? Number(pembayaran.tunaiDiterima)
            : Math.max(jumlahDibayarPenjualan(transaksi) - (Number(pembayaran.qris) || 0), 0)]
    ];
    let qris = Number(pembayaran.qris) || 0;
    let kembalian = Number(pembayaran.kembalian) || 0;
    let tabungan = Number(pembayaran.tabungan) || 0;
    if (qris > 0) paymentRows.push(["Pembayaran QRIS", qris]);
    if (kembalian > 0) paymentRows.push(["Kembalian", -kembalian]);
    if (tabungan > 0) paymentRows.push(["Masuk tabungan", tabungan]);
    if (sisa > 0) paymentRows.push(["Sisa kurang bayar", -sisa]);

    let totals = document.createElement("div");
    totals.className = "sales-receipt-totals";
    paymentRows.forEach(([label, amount]) => {
        let row = document.createElement("div");
        row.className = "sales-receipt-total-row";
        if (label === "Total") row.classList.add("is-grand-total");
        let labelElement = document.createElement("span");
        labelElement.innerText = label;
        let valueElement = document.createElement("strong");
        let numericAmount = Number(amount) || 0;
        valueElement.innerText = `${numericAmount < 0 ? "−" : ""}Rp ${Math.abs(numericAmount).toLocaleString("id-ID")}`;
        row.append(labelElement, valueElement);
        totals.appendChild(row);
    });
    fragment.appendChild(totals);

    let footer = document.createElement("p");
    footer.className = `sales-receipt-payment-status${sisa > 0 ? " is-unpaid" : ""}`;
    footer.innerText = `${metode} · ${sisa > 0 ? `BELUM LUNAS (kurang Rp ${sisa.toLocaleString("id-ID")})` : "LUNAS"}`;
    fragment.appendChild(footer);
    content.replaceChildren(fragment);
    document.getElementById("modalDetailNotaPenjualan").style.display = "flex";
}

function tutupDetailNotaPenjualan() {
    detailNotaTerlihat = "";
    tutupModal("modalDetailNotaPenjualan");
}

function editPenjualanDariRincian() {
    let id = detailNotaTerlihat;
    tutupDetailNotaPenjualan();
    editPenjualanDariDaftar(id);
}

function hapusPenjualanDariRincian() {
    let id = detailNotaTerlihat;
    hapusPenjualanDariDaftar(id);
    if (!riwayatPenjualan.some(item => item.id === id)) tutupDetailNotaPenjualan();
}

function sisaPembayaranPenjualan(transaksi) {
    let total = Number(transaksi.total) || 0;
    let pembayaran = transaksi.pembayaran || {};
    let hutang = Number(pembayaran.hutang);
    if (Number.isFinite(hutang) && hutang > 0) return hutang;
    if (String(transaksi.statusBayar || "").toUpperCase() !== "BON") return 0;

    let tunai = Number(pembayaran.tunai);
    let qris = Number(pembayaran.qris);
    if (Number.isFinite(tunai) || Number.isFinite(qris)) {
        return Math.max(total - (Number.isFinite(tunai) ? tunai : 0) - (Number.isFinite(qris) ? qris : 0), 0);
    }
    return total;
}

function jumlahDibayarPenjualan(transaksi) {
    let pembayaran = transaksi.pembayaran || {};
    let uangDiterima = Number(pembayaran.tunaiDiterima);
    let qris = Number(pembayaran.qris) || 0;
    if (Number.isFinite(uangDiterima)) return uangDiterima + qris;
    let tunai = Number(pembayaran.tunai);
    if (Number.isFinite(tunai)) return tunai + qris;
    return sisaPembayaranPenjualan(transaksi) > 0
        ? Math.max((Number(transaksi.total) || 0) - sisaPembayaranPenjualan(transaksi), 0)
        : Number(transaksi.total) || 0;
}

function buatNomorNotaPenjualan(tanggal) {
    let tanggalNomor = String(tanggal).replace(/-/g, "");
    let nomorUrut = riwayatPenjualan.reduce((maksimum, transaksi) => {
        if (transaksi.tgl !== tanggal) return maksimum;
        let nomorTersimpan = String(transaksi.noNota || "").match(/^NOT-\d{8}-(\d+)$/);
        return Math.max(maksimum, nomorTersimpan ? Number(nomorTersimpan[1]) : 0);
    }, riwayatPenjualan.filter(transaksi => transaksi.tgl === tanggal).length);
    return `NOT-${tanggalNomor}-${String(nomorUrut + 1).padStart(3, "0")}`;
}

function formatNotaPenjualanWhatsApp(transaksi) {
    let tanggal = String(transaksi.tgl || "");
    let tanggalLabel = /^\d{4}-\d{2}-\d{2}$/.test(tanggal)
        ? `${tanggal.slice(8, 10)}/${tanggal.slice(5, 7)}/${tanggal.slice(0, 4)}`
        : tanggal;
    let pelanggan = transaksi.pelanggan || "Pelanggan Umum";
    let dataPelanggan = pelangganList.find(item => item.nama === pelanggan);
    if (dataPelanggan) pelanggan += ` (${dataPelanggan.jenis})`;

    let barisRincian = (Array.isArray(transaksi.items) ? transaksi.items : []).map(item => {
        let jumlah = Number(item.jumlah) || 0;
        let harga = Number(item.hargaSatuan) || 0;
        let subtotal = Number.isFinite(Number(item.subtotal)) ? Number(item.subtotal) : jumlah * harga;
        let satuan = item.satuan && item.satuan !== "pcs" ? ` ${item.satuan}` : "";
        return `• ${item.nama || "Barang"} (${jumlah}${satuan} x Rp ${harga.toLocaleString("id-ID")}) = Rp ${subtotal.toLocaleString("id-ID")}`;
    });

    let total = Number(transaksi.total) || 0;
    let pembayaran = transaksi.pembayaran || {};
    let sisa = sisaPembayaranPenjualan(transaksi);
    let dibayar = jumlahDibayarPenjualan(transaksi);
    let kembalian = Number(pembayaran.kembalian) || 0;
    let status = sisa > 0
        ? `🟠 BELUM LUNAS (sisa Rp ${sisa.toLocaleString("id-ID")})`
        : "🟢 LUNAS";
    let teksNota = [
        "*NOTA PENJUALAN - ALICE BAKERY*",
        "----------------------------------------",
        `*No. Nota:* ${transaksi.noNota || transaksi.id || "—"}`,
        `*Tanggal:* ${tanggalLabel}`,
        `*Pelanggan:* ${pelanggan}`,
        "",
        "*Rincian Belanja:*",
        ...barisRincian,
        "----------------------------------------",
        `*TOTAL:* Rp ${total.toLocaleString("id-ID")}`,
        `*BAYAR:* Rp ${dibayar.toLocaleString("id-ID")}`,
        `*KEMBALI:* Rp ${kembalian.toLocaleString("id-ID")}`,
        ...(Number(pembayaran.tabungan) > 0
            ? [`*TABUNGAN:* Rp ${Number(pembayaran.tabungan).toLocaleString("id-ID")}`]
            : []),
        `*STATUS:* ${status}`,
        "",
        "_Terima kasih telah berbelanja di Alice Bakery!_"
    ];
    return teksNota.join("\n");
}

function kirimNotaPenjualanWhatsApp() {
    if (!transaksiNotaTerakhir) {
        alert("Nota penjualan belum tersedia. Selesaikan transaksi terlebih dahulu.");
        return;
    }
    let urlWhatsApp = `https://wa.me/?text=${encodeURIComponent(formatNotaPenjualanWhatsApp(transaksiNotaTerakhir))}`;
    let jendelaWhatsApp = window.open(urlWhatsApp, "_blank");
    if (!jendelaWhatsApp) {
        alert("WhatsApp tidak dapat dibuka. Izinkan pop-up browser, lalu coba kirim nota kembali.");
        return;
    }
    jendelaWhatsApp.opener = null;
}

function buatTabelRiwayatPenjualan(transaksiHari) {
    let wrapper = document.createElement("div");
    wrapper.className = "sales-history-table-wrap";
    let table = document.createElement("table");
    table.className = "sales-history-table";
    let columns = [
        { label: "Nama", key: "nama" },
        { label: "Barang", key: "barang" },
        { label: "Total", key: "total" },
        { label: "Bayar", key: "bayar" },
        { label: "Status", key: "status" }
    ];
    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    columns.forEach(column => {
        let header = document.createElement("th");
        header.scope = "col";
        header.dataset.column = column.key;
        if (column.detail) header.className = "sales-history-detail-column";
        header.innerText = column.label;
        headerRow.appendChild(header);
    });
    thead.appendChild(headerRow);

    let tbody = document.createElement("tbody");
    transaksiHari.forEach(transaksi => {
        let row = document.createElement("tr");
        let items = Array.isArray(transaksi.items) ? transaksi.items : [];
        let values = {
            nama: transaksi.pelanggan || "Pelanggan Umum",
            barang: items
        };
        let total = Number(transaksi.total) || 0;
        let sisa = sisaPembayaranPenjualan(transaksi);
        let bayar = jumlahDibayarPenjualan(transaksi);
        let statusCell = document.createElement("span");
        statusCell.className = `sales-history-table-status${sisa > 0 ? " is-unpaid" : ""}`;
        statusCell.innerText = sisa > 0
            ? `Kurang −Rp ${sisa.toLocaleString("id-ID")}`
            : "Lunas";
        values.total = [`Rp ${total.toLocaleString("id-ID")}`];
        values.bayar = [`Rp ${bayar.toLocaleString("id-ID")}`];

        columns.forEach(column => {
            let cell = document.createElement("td");
            cell.dataset.column = column.key;
            if (column.detail) cell.className = "sales-history-detail-column";
            if (column.key === "status") {
                cell.appendChild(statusCell);
                let detailButton = document.createElement("button");
                detailButton.className = "sales-history-receipt-button";
                detailButton.type = "button";
                detailButton.setAttribute("aria-label", `Lihat nota ${transaksi.pelanggan || "Pelanggan Umum"}`);
                detailButton.innerText = "Rincian";
                detailButton.addEventListener("click", () => bukaDetailNotaPenjualan(transaksi));
                cell.appendChild(detailButton);
            } else if (column.key === "barang") {
                items.forEach(item => {
                    let line = document.createElement("span");
                    line.className = "sales-history-table-value";
                    line.innerText = item.nama || "Barang";

                    let barangMaster = barangList.find(barang =>
                        (item.kode && String(barang.kode) === String(item.kode)) ||
                        (!item.kode && barang.nama === item.nama)
                    );
                    let hargaTransaksi = Number(item.hargaSatuan);
                    let hargaDatabase = barangMaster ? Number(barangMaster.detail) : NaN;
                    if (Number.isFinite(hargaTransaksi) && Number.isFinite(hargaDatabase) && hargaTransaksi !== hargaDatabase) {
                        let penanda = document.createElement("span");
                        penanda.className = "sales-history-price-mismatch";
                        penanda.textContent = "≠";
                        penanda.title = `Harga transaksi Rp ${hargaTransaksi.toLocaleString("id-ID")}, harga database Rp ${hargaDatabase.toLocaleString("id-ID")}`;
                        penanda.setAttribute("aria-label", penanda.title);
                        line.appendChild(penanda);
                    }
                    cell.appendChild(line);
                });
            } else {
                let cellValues = Array.isArray(values[column.key]) ? values[column.key] : [values[column.key]];
                cellValues.forEach(value => {
                    let line = document.createElement("span");
                    line.className = "sales-history-table-value";
                    line.innerText = value || "—";
                    cell.appendChild(line);
                });
            }
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.append(thead, tbody);
    wrapper.appendChild(table);
    return wrapper;
}

function konfirmasiSimpanPenjualan() {
    if (tanggalAktifAdalahArsip() && !penjualanSedangDiedit) {
        alert("Tanggal lampau hanya dapat dilihat sebagai arsip. Penjualan tidak dapat ditambahkan.");
        return;
    }
    if (keranjangPenjualan.length === 0) {
        alert("Tambahkan setidaknya satu barang sebelum menyimpan penjualan.");
        return;
    }

    let pelanggan = "Pelanggan Umum";
    let metodeBayar = "CASH";
    let total = 0;
    for (let item of keranjangPenjualan) {
        if (!Number.isInteger(Number(item.jumlah)) || Number(item.jumlah) <= 0 ||
            String(item.hargaSatuan).trim() === "" ||
            !Number.isFinite(Number(item.hargaSatuan)) || Number(item.hargaSatuan) < 0) {
            alert("Pastikan harga dan jumlah setiap barang valid.");
            return;
        }
        total += Number(item.jumlah) * Number(item.hargaSatuan);
    }
    let jumlahBayar = Number(document.getElementById("jumlahBayarPenjualan").value.replace(/\D/g, "")) || 0;
    let jumlahProduksiDijual = new Map();
    keranjangPenjualan.filter(item => item.jenisBarang === "Roti").forEach(item => {
        jumlahProduksiDijual.set(
            item.kode,
            (jumlahProduksiDijual.get(item.kode) || 0) + Number(item.jumlah)
        );
    });
    let transaksiDiedit = penjualanSedangDiedit
        ? riwayatPenjualan.find(item => item.id === penjualanSedangDiedit)
        : null;
    for (let [kode, jumlah] of jumlahProduksiDijual) {
        let stokTersedia = Number(stokBarangPenjualan[kode]) || 0;
        if (transaksiDiedit) {
            (transaksiDiedit.items || []).forEach(item => {
                if (item.kode === kode) stokTersedia += Number(item.jumlah) || 0;
            });
        }
        if (jumlah > stokTersedia) {
            let barang = barangList.find(item => item.kode === kode);
            alert(`Stok ${barang ? barang.nama : kode} tidak cukup. Stok tersedia: ${stokTersedia}.`);
            return;
        }
    }

    pembayaranPenjualanMenungguPelanggan = {
        total,
        tunaiDiterima: jumlahBayar,
        selisih: jumlahBayar - total
    };
    bukaPilihanPelangganTransaksi();
}

function bukaPilihanPelangganTransaksi() {
    let select = document.getElementById("pelangganTransaksi");
    select.innerHTML = "";
    let pelangganPedagang = pelangganList.filter(pelanggan => pelanggan.jenis === "Pedagang");
    select.add(new Option(pelangganPedagang.length ? "Pilih pelanggan Pedagang" : "Belum ada pelanggan Pedagang", ""));
    pelangganPedagang.forEach(pelanggan => select.add(new Option(pelanggan.nama, pelanggan.nama)));
    if (pelangganSedangDiedit && [...select.options].some(opsi => opsi.value === pelangganSedangDiedit)) {
        select.value = pelangganSedangDiedit;
    }
    document.getElementById("pelangganBaruNamaKasir").value = "";
    document.getElementById("pelangganBaruHpKasir").value = "";
    document.getElementById("modalPelangganTransaksi").style.display = "flex";
}

function simpanPelangganBaruDariKasir() {
    let nama = document.getElementById("pelangganBaruNamaKasir").value.trim();
    let hp = document.getElementById("pelangganBaruHpKasir").value.trim() || "-";
    if (!nama) {
        alert("Nama pelanggan wajib diisi.");
        document.getElementById("pelangganBaruNamaKasir").focus();
        return;
    }

    let sudahAda = pelangganList.find(pelanggan =>
        pelanggan.jenis === "Pedagang" && pelanggan.nama.trim().toLowerCase() === nama.toLowerCase()
    );
    if (sudahAda) {
        document.getElementById("pelangganTransaksi").value = sudahAda.nama;
        alert("Pelanggan Pedagang tersebut sudah terdaftar dan sudah dipilih.");
        return;
    }

    pelangganList.push({ nama, hp, jenis: "Pedagang" });
    localStorage.setItem("alicePelanggan", JSON.stringify(pelangganList));
    let select = document.getElementById("pelangganTransaksi");
    select.add(new Option(nama, nama));
    select.value = nama;
    document.getElementById("pelangganBaruNamaKasir").value = "";
    document.getElementById("pelangganBaruHpKasir").value = "";
}

function lanjutkanPenjualanDenganPelanggan() {
    if (!pembayaranPenjualanMenungguPelanggan) return;
    let namaPelanggan = document.getElementById("pelangganTransaksi").value;
    let pelanggan = pelangganList.find(item => item.nama === namaPelanggan && item.jenis === "Pedagang");
    if (!pelanggan) {
        alert("Pilih atau tambahkan pelanggan dengan jenis Pedagang terlebih dahulu.");
        return;
    }

    let pembayaran = pembayaranPenjualanMenungguPelanggan;
    pembayaran.pelanggan = pelanggan.nama;

    if (pembayaran.selisih < 0) {
        tutupModal("modalPelangganTransaksi");
        pembayaranKurangMenungguKonfirmasi = {
            ...pembayaran,
            kurang: Math.abs(pembayaran.selisih)
        };
        document.getElementById("jumlahKekuranganPenjualan").innerText =
            `Rp ${pembayaranKurangMenungguKonfirmasi.kurang.toLocaleString("id-ID")}`;
        document.getElementById("pelangganPembayaranKurang").innerText = pelanggan.nama;
        document.getElementById("modalPembayaranKurang").style.display = "flex";
        return;
    }
    if (pembayaran.selisih > 0) {
        tutupModal("modalPelangganTransaksi");
        document.getElementById("jumlahKembalianLebih").innerText =
            `Rp ${pembayaran.selisih.toLocaleString("id-ID")}`;
        document.getElementById("pelangganPembayaranLebih").innerText = `Pelanggan: ${pelanggan.nama}`;
        document.getElementById("modalKembalianLebih").style.display = "flex";
        return;
    }

    if (!window.confirm(`Simpan penjualan Rp ${pembayaran.total.toLocaleString("id-ID")} untuk ${pelanggan.nama}?`)) return;
    tutupModal("modalPelangganTransaksi");
    selesaikanPenjualanKasir(pembayaran.pelanggan, "CASH", pembayaran.total, {
        tunaiDiterima: pembayaran.total,
        tunai: pembayaran.total,
        qris: 0,
        hutang: 0,
        kembalian: 0,
        tabungan: 0
    });
    pembayaranPenjualanMenungguPelanggan = null;
}

function catatKekuranganSebagaiHutang() {
    if (!pembayaranKurangMenungguKonfirmasi) return;
    let pembayaran = pembayaranKurangMenungguKonfirmasi;
    if (!window.confirm(`Catat kekurangan Rp ${pembayaran.kurang.toLocaleString("id-ID")} sebagai hutang ${pembayaran.pelanggan}?`)) return;
    tutupModal("modalPembayaranKurang");
    selesaikanPenjualanKasir(pembayaran.pelanggan, "CASH + BON", pembayaran.total, {
        tunaiDiterima: pembayaran.tunaiDiterima,
        tunai: pembayaran.tunaiDiterima,
        qris: 0,
        hutang: pembayaran.kurang,
        kembalian: 0,
        tabungan: 0
    });
}

function catatKekuranganSebagaiQris() {
    if (!pembayaranKurangMenungguKonfirmasi) return;
    let pembayaran = pembayaranKurangMenungguKonfirmasi;
    if (!window.confirm(`Catat pembayaran tunai Rp ${pembayaran.tunaiDiterima.toLocaleString("id-ID")} dan QRIS Rp ${pembayaran.kurang.toLocaleString("id-ID")} untuk ${pembayaran.pelanggan}?`)) return;
    tutupModal("modalPembayaranKurang");
    selesaikanPenjualanKasir(pembayaran.pelanggan, "CASH + QRIS", pembayaran.total, {
        tunaiDiterima: pembayaran.tunaiDiterima,
        tunai: pembayaran.tunaiDiterima,
        qris: pembayaran.kurang,
        hutang: 0,
        kembalian: 0,
        tabungan: 0
    });
}

function kembaliKePembayaranTunai() {
    tutupModal("modalPembayaranKurang");
    pembayaranKurangMenungguKonfirmasi = null;
    pembayaranPenjualanMenungguPelanggan = null;
    document.getElementById("jumlahBayarPenjualan").focus();
}

function prosesKembalianPenjualan() {
    if (!pembayaranPenjualanMenungguPelanggan) return;
    let pembayaran = pembayaranPenjualanMenungguPelanggan;
    if (!window.confirm(`Berikan kembalian Rp ${pembayaran.selisih.toLocaleString("id-ID")} kepada ${pembayaran.pelanggan}?`)) return;
    tutupModal("modalKembalianLebih");
    selesaikanPenjualanKasir(pembayaran.pelanggan, "CASH", pembayaran.total, {
        tunaiDiterima: pembayaran.tunaiDiterima,
        tunai: pembayaran.total,
        qris: 0,
        hutang: 0,
        kembalian: pembayaran.selisih,
        tabungan: 0
    });
    pembayaranPenjualanMenungguPelanggan = null;
}

function simpanLebihKeTabunganPelanggan() {
    if (!pembayaranPenjualanMenungguPelanggan) return;
    let pembayaran = pembayaranPenjualanMenungguPelanggan;
    if (!window.confirm(`Masukkan Rp ${pembayaran.selisih.toLocaleString("id-ID")} ke tabungan ${pembayaran.pelanggan}?`)) return;
    tutupModal("modalKembalianLebih");
    selesaikanPenjualanKasir(pembayaran.pelanggan, "CASH + TABUNGAN", pembayaran.total, {
        tunaiDiterima: pembayaran.tunaiDiterima,
        tunai: pembayaran.tunaiDiterima,
        qris: 0,
        hutang: 0,
        kembalian: 0,
        tabungan: pembayaran.selisih
    });
    pembayaranPenjualanMenungguPelanggan = null;
}

function selesaikanPenjualanKasir(pelanggan, metodeBayar, total, pembayaran) {
    pembayaranKurangMenungguKonfirmasi = null;
    pembayaranPenjualanMenungguPelanggan = null;
    simpanPenjualanKasir(pelanggan, metodeBayar, total, pembayaran);
}

function simpanPenjualanKasir(pelanggan, metodeBayar, total, pembayaran) {
    let waktu = new Date();
    let tanggalCatat = tanggalAktif;
    if (penjualanSedangDiedit) {
        let transaksiLama = riwayatPenjualan.find(item => item.id === penjualanSedangDiedit);
        if (transaksiLama) tanggalCatat = transaksiLama.tgl;
        let idLama = penjualanSedangDiedit;
        penjualanSedangDiedit = "";
        pelangganSedangDiedit = "";
        cabutCatatanPenjualan(idLama);
    }
    let transaksiId = `JUAL-${waktu.getTime()}-${Math.random().toString(36).slice(2, 8)}`;
    let items = keranjangPenjualan.map(item => ({
        kode: item.kode,
        nama: item.nama,
        jenisBarang: item.jenisBarang,
        jumlah: Number(item.jumlah),
        hargaSatuan: Number(item.hargaSatuan),
        subtotal: Number(item.jumlah) * Number(item.hargaSatuan),
        satuan: item.unitBarang || "pcs"
    }));
    let transaksi = {
        id: transaksiId,
        noNota: buatNomorNotaPenjualan(tanggalCatat),
        tgl: tanggalCatat,
        waktu: waktu.toISOString(),
        pelanggan: pelanggan || "Pelanggan Umum",
        items,
        total,
        metodeBayar,
        pembayaran,
        statusBayar: pembayaran.hutang > 0 ? "BON" : "LUNAS"
    };
    let mutasiStok = JSON.parse(localStorage.getItem("aliceMutasiStokBarang")) || [];

    items.forEach((item, index) => {
        let barang = barangLayakDijual().find(master => master.kode === item.kode);
        stokBarangPenjualan[item.kode] = (Number(stokBarangPenjualan[item.kode]) || 0) - item.jumlah;
        mutasiStok.push({
            id: `${transaksiId}-${item.kode}-${index}`,
            tgl: tanggalCatat,
            kode: item.kode,
            nama: item.nama,
            tipe: "keluar",
            jumlah: item.jumlah,
            satuan: item.satuan,
            referensi: transaksiId
        });
        dataTransaksiJual.push({
            id: `${transaksiId}-${item.kode}-${index}`,
            transaksiId,
            tgl: tanggalCatat,
            nama: pelanggan || "Pelanggan Umum",
            roti: item.nama,
            kode: item.kode,
            jenisBarang: item.jenisBarang || (barang && barang.jenis),
            qty: item.jumlah,
            satuan: item.satuan,
            hargaSatuan: item.hargaSatuan,
            total: item.subtotal,
            metodeBayar,
            statusBayar: transaksi.statusBayar
        });
    });
    riwayatPenjualan.push(transaksi);
    transaksiNotaTerakhir = transaksi;

    saldoKasPenjualan.tunai = (Number(saldoKasPenjualan.tunai) || 0) + pembayaran.tunai;
    saldoKasPenjualan.nonTunai = (Number(saldoKasPenjualan.nonTunai) || 0) + pembayaran.qris;
    [
        { metodeBayar: "CASH", akun: "kas_tunai", jumlah: pembayaran.tunai, kode: "P" },
        { metodeBayar: "QRIS", akun: "rekening_bank", jumlah: pembayaran.qris },
        { metodeBayar: "BON", akun: "piutang", jumlah: pembayaran.hutang },
        { metodeBayar: "TABUNGAN", akun: "tabungan_pelanggan", jumlah: pembayaran.tabungan }
    ].filter(mutasi => mutasi.jumlah !== 0).forEach(mutasi => {
        mutasiKasPenjualan.push({
            id: `${transaksiId}-${mutasi.metodeBayar}`,
            transaksiId,
            tgl: tanggalCatat,
            waktu: transaksi.waktu,
            pelanggan: transaksi.pelanggan,
            metodeBayar: mutasi.metodeBayar,
            akun: mutasi.akun,
            jumlah: mutasi.jumlah,
            kode: mutasi.kode || "",
            status: mutasi.metodeBayar === "BON" ? "BON" :
                mutasi.metodeBayar === "TABUNGAN" ? "TABUNGAN" : "LUNAS"
        });
    });
    if (pembayaran.tabungan > 0) {
        saldoTabunganPelanggan[pelanggan] = (Number(saldoTabunganPelanggan[pelanggan]) || 0) + pembayaran.tabungan;
        mutasiTabunganPelanggan.push({
            id: `${transaksiId}-TABUNGAN`,
            transaksiId,
            tgl: tanggalCatat,
            waktu: transaksi.waktu,
            pelanggan,
            akun: "tabungan_pelanggan",
            jumlah: pembayaran.tabungan,
            tipe: "setoran"
        });
    }

    localStorage.setItem("aliceStokBarangPenjualan", JSON.stringify(stokBarangPenjualan));
    localStorage.setItem("aliceMutasiStokBarang", JSON.stringify(mutasiStok));
    localStorage.setItem("aliceRiwayatPenjualan", JSON.stringify(riwayatPenjualan));
    localStorage.setItem("aliceMutasiKasPenjualan", JSON.stringify(mutasiKasPenjualan));
    localStorage.setItem("aliceSaldoKasPenjualan", JSON.stringify(saldoKasPenjualan));
    localStorage.setItem("aliceSaldoTabunganPelanggan", JSON.stringify(saldoTabunganPelanggan));
    localStorage.setItem("aliceMutasiTabunganPelanggan", JSON.stringify(mutasiTabunganPelanggan));
    localStorage.setItem("aliceJual", JSON.stringify(dataTransaksiJual));
    keranjangPenjualan = [];
    renderTabelOrder();
    renderBarang();
    tutupModal("modalPenjualan");
    document.getElementById("ringkasanNotaPenjualan").innerText =
        `Nota ${transaksi.noNota} siap dibagikan ke WhatsApp · Total Rp ${total.toLocaleString("id-ID")}.`;
    document.getElementById("modalNotaPenjualan").style.display = "flex";
}

function tutupModalNotaPenjualan() {
    tutupModal("modalNotaPenjualan");
    if (kembaliKeDaftarPenjualan) {
        kembaliKeDaftarPenjualan = false;
        renderRiwayatPenjualanLengkap();
        document.getElementById("modalRiwayatPenjualan").style.display = "flex";
        return;
    }
    bukaFormPenjualan();
}

function cabutCatatanPenjualan(id) {
    let index = riwayatPenjualan.findIndex(item => item.id === id);
    if (index < 0) return;
    let transaksi = riwayatPenjualan[index];
    (Array.isArray(transaksi.items) ? transaksi.items : []).forEach(item => {
        if (!item.kode) return;
        stokBarangPenjualan[item.kode] = (Number(stokBarangPenjualan[item.kode]) || 0) + (Number(item.jumlah) || 0);
    });
    let pembayaran = transaksi.pembayaran || {};
    saldoKasPenjualan.tunai = (Number(saldoKasPenjualan.tunai) || 0) - (Number(pembayaran.tunai) || 0);
    saldoKasPenjualan.nonTunai = (Number(saldoKasPenjualan.nonTunai) || 0) - (Number(pembayaran.qris) || 0);
    if (Number(pembayaran.tabungan) > 0 && transaksi.pelanggan) {
        saldoTabunganPelanggan[transaksi.pelanggan] = (Number(saldoTabunganPelanggan[transaksi.pelanggan]) || 0) - Number(pembayaran.tabungan);
    }
    riwayatPenjualan.splice(index, 1);
    dataTransaksiJual = dataTransaksiJual.filter(item => item.transaksiId !== id);
    mutasiKasPenjualan = mutasiKasPenjualan.filter(item => item.transaksiId !== id);
    mutasiTabunganPelanggan = mutasiTabunganPelanggan.filter(item => item.transaksiId !== id);
    let mutasiStok = (JSON.parse(localStorage.getItem("aliceMutasiStokBarang")) || [])
        .filter(item => item.referensi !== id && item.transaksiId !== id);
    localStorage.setItem("aliceStokBarangPenjualan", JSON.stringify(stokBarangPenjualan));
    localStorage.setItem("aliceMutasiStokBarang", JSON.stringify(mutasiStok));
    localStorage.setItem("aliceRiwayatPenjualan", JSON.stringify(riwayatPenjualan));
    localStorage.setItem("aliceJual", JSON.stringify(dataTransaksiJual));
    localStorage.setItem("aliceMutasiKasPenjualan", JSON.stringify(mutasiKasPenjualan));
    localStorage.setItem("aliceSaldoKasPenjualan", JSON.stringify(saldoKasPenjualan));
    localStorage.setItem("aliceSaldoTabunganPelanggan", JSON.stringify(saldoTabunganPelanggan));
    localStorage.setItem("aliceMutasiTabunganPelanggan", JSON.stringify(mutasiTabunganPelanggan));
}

function editPenjualanDariDaftar(id) {
    let transaksi = riwayatPenjualan.find(item => item.id === id);
    if (!transaksi) return;
    penjualanSedangDiedit = id;
    pelangganSedangDiedit = transaksi.pelanggan && transaksi.pelanggan !== "Pelanggan Umum" ? transaksi.pelanggan : "";
    kembaliKeDaftarPenjualan = true;
    keranjangPenjualan = (Array.isArray(transaksi.items) ? transaksi.items : []).map(item => ({
        kode: item.kode,
        nama: item.nama,
        jenisBarang: item.jenisBarang,
        unitBarang: item.satuan || "pcs",
        hargaSatuan: Number(item.hargaSatuan) || 0,
        hargaNormal: Number(item.hargaSatuan) || 0,
        jumlah: Number(item.jumlah) || 1
    }));
    tutupModal("modalRiwayatPenjualan");
    bukaFormPenjualan({ lanjutEdit: true });
    document.getElementById("jumlahBayarPenjualan").value = String(jumlahDibayarPenjualan(transaksi) || "");
    perbaruiPembayaranPenjualan();
}

function hapusPenjualanDariDaftar(id) {
    let transaksi = riwayatPenjualan.find(item => item.id === id);
    if (!transaksi) return;
    let nama = transaksi.pelanggan || "Pelanggan Umum";
    let nota = transaksi.noNota ? ` ${transaksi.noNota}` : "";
    if (!window.confirm(`Hapus penjualan${nota} milik ${nama}? Stok dan catatan kas penjualan ini dikembalikan.`)) return;
    cabutCatatanPenjualan(id);
    renderRiwayatPenjualanLengkap();
    renderTabelOrder();
    renderBarang();
    if (document.getElementById("modalJurnalKas").style.display === "flex") renderJurnalKas();
}

function tundaPengingatStokMasuk() {
    tutupModal("modalPengingatStokMasuk");
}

function bukaFormStokMasuk() {
    let select = document.getElementById("barangStokMasuk");
    let barangToko = barangList.filter(barang => barang.jenis === "Barang Toko");
    select.innerHTML = "";
    if (barangToko.length === 0) {
        tutupModal("modalPengingatStokMasuk");
        alert("Belum ada Barang Toko di Kelola Barang untuk dicatat stok masuknya.");
        return;
    }
    barangToko.forEach(barang => select.add(new Option(`${barang.kode} — ${barang.nama}`, barang.kode)));
    tampilkanSatuanStokMasuk();
    document.getElementById("qtyStokMasuk").value = "";
    tutupModal("modalPengingatStokMasuk");
    document.getElementById("modalStokMasuk").style.display = "flex";
}

function simpanStokMasuk() {
    let kode = document.getElementById("barangStokMasuk").value;
    let jumlah = Number(document.getElementById("qtyStokMasuk").value);
    let barang = barangList.find(item => item.kode === kode && item.jenis === "Barang Toko");
    if (!barang || !Number.isInteger(jumlah) || jumlah <= 0) {
        alert("Pilih Barang Toko dan masukkan jumlah stok masuk berupa bilangan bulat lebih dari nol.");
        return;
    }

    stokBarangPenjualan[kode] = (Number(stokBarangPenjualan[kode]) || 0) + jumlah;
    let mutasiStok = JSON.parse(localStorage.getItem("aliceMutasiStokBarang")) || [];
    mutasiStok.push({
        id: `STOK-${Date.now()}`,
        tgl: formatTanggalISO(new Date()),
        kode,
        nama: barang.nama,
        tipe: "masuk",
        jumlah,
        satuan: barang.satuanBarang || "pcs"
    });
    localStorage.setItem("aliceStokBarangPenjualan", JSON.stringify(stokBarangPenjualan));
    localStorage.setItem("aliceMutasiStokBarang", JSON.stringify(mutasiStok));
    tutupModal("modalStokMasuk");
    alert(`Stok masuk ${barang.nama} sebanyak ${jumlah} ${barang.satuanBarang || "pcs"} berhasil dicatat.`);
    renderBarang();
}

function tampilkanSatuanStokMasuk() {
    let barang = barangList.find(item =>
        item.kode === document.getElementById("barangStokMasuk").value &&
        item.jenis === "Barang Toko"
    );
    document.getElementById("labelQtyStokMasuk").innerText =
        `Jumlah masuk (${barang && barang.satuanBarang ? barang.satuanBarang : "pcs"})`;
}

function tampilkanPengingatStokMasuk() {
    document.getElementById("modalPengingatStokMasuk").style.display = "flex";
}

function toggleDashboardSetting(toggle) {
    let isEnabled = toggle.getAttribute("aria-checked") === "true";
    toggle.setAttribute("aria-checked", String(!isEnabled));
}

function bukaMenuPengaturan(tab) {
    gantiTabSetting(tab);
    bukaModalSetting();
}

function formatTanggalISO(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function bukaPemilihBulanProduksi() {
    let inputBulan = document.getElementById("inputBulanProduksi");
    if (typeof inputBulan.showPicker === "function") inputBulan.showPicker();
    else inputBulan.click();
}

function pilihBulanProduksi(bulan) {
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(bulan)) return;
    bulanProduksiAktif = bulan;
    localStorage.setItem("aliceBulanProduksi", bulan);
    renderProduksiBulanan();
}

function renderProduksiBulanan() {
    let inputBulan = document.getElementById("inputBulanProduksi");
    let [tahun, bulan] = bulanProduksiAktif.split("-").map(Number);
    inputBulan.value = bulanProduksiAktif;
    document.getElementById("labelBulanProduksi").innerText = new Date(tahun, bulan - 1, 1)
        .toLocaleDateString("id-ID", { month: "long", year: "numeric" });

    let totalRoti = 0;
    let totalGramasi = 0;
    let orderPerMinggu = [0, 0, 0, 0, 0];
    let rtMaster = barangList.find(item =>
        item.jenis === "Roti" && (item.kode.toLowerCase() === "rt" || item.nama.toLowerCase().includes("bakar"))
    );
    let gramasiRT = rtMaster && Number(rtMaster.gramasi) > 0 ? Number(rtMaster.gramasi) : 250;

    dataOrderHarian.forEach(item => {
        if (item.tgl.substring(0, 7) !== bulanProduksiAktif) return;
        let qty = Number(item.order);
        if (!Number.isFinite(qty) || qty <= 0) return;

        let roti = barangList.find(barang => barang.nama === item.roti);
        let gramasi = roti && Number(roti.gramasi) > 0 ? Number(roti.gramasi) : 250;
        totalRoti += qty;
        totalGramasi += qty * gramasi;
        let tanggalOrder = Number(item.tgl.substring(8, 10));
        if (Number.isInteger(tanggalOrder) && tanggalOrder >= 1 && tanggalOrder <= 31) {
            orderPerMinggu[Math.floor((tanggalOrder - 1) / 7)] += qty;
        }
    });

    let totalSak = empirisHasilRT > 0
        ? totalGramasi / (empirisHasilRT * gramasiRT)
        : 0;
    document.getElementById("totalProduksiBulanan").innerText = totalRoti.toLocaleString("id-ID");
    document.getElementById("totalSakBulanan").innerText = totalSak.toLocaleString("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    let nilaiMaksimumMingguan = Math.max(...orderPerMinggu);
    let titikGrafik = orderPerMinggu.map((jumlah, index) => ({
        x: index * 85,
        y: nilaiMaksimumMingguan > 0 ? 88 - (jumlah / nilaiMaksimumMingguan) * 72 : 88
    }));
    let garisGrafik = `M ${titikGrafik[0].x} ${titikGrafik[0].y}`;
    for (let index = 1; index < titikGrafik.length; index++) {
        let sebelumnya = titikGrafik[index - 1];
        let sekarang = titikGrafik[index];
        let jarakKontrol = (sekarang.x - sebelumnya.x) / 3;
        garisGrafik += ` C ${sebelumnya.x + jarakKontrol} ${sebelumnya.y}, ${sekarang.x - jarakKontrol} ${sekarang.y}, ${sekarang.x} ${sekarang.y}`;
    }

    document.getElementById("productionLinePath").setAttribute("d", garisGrafik);
    document.getElementById("productionAreaPath").setAttribute(
        "d",
        `${garisGrafik} L ${titikGrafik[titikGrafik.length - 1].x} 112 L ${titikGrafik[0].x} 112 Z`
    );
    document.getElementById("productionChartPoint").setAttribute("cx", titikGrafik[titikGrafik.length - 1].x);
    document.getElementById("productionChartPoint").setAttribute("cy", titikGrafik[titikGrafik.length - 1].y);
    document.getElementById("productionChart").setAttribute(
        "aria-label",
        `Grafik kuantitas order mingguan: ${orderPerMinggu.map((jumlah, index) => `minggu ${index + 1} ${jumlah} roti`).join(", ")}`
    );
}

function getTanggalKemarin(tglStr) {
    let [tahun, bulan, hari] = tglStr.split("-").map(Number);
    let tanggal = new Date(tahun, bulan - 1, hari);
    tanggal.setDate(tanggal.getDate() - 1);
    return formatTanggalISO(tanggal);
}

function getRentangTanggalOrder() {
    let tanggalSekarang = new Date(tahunIni, Number(bulanIni) - 1, Number(hariIni));
    let tanggalMin = new Date(tanggalSekarang);
    let tanggalMaks = new Date(tanggalSekarang);
    tanggalMin.setDate(tanggalMin.getDate() - 7);
    tanggalMaks.setDate(tanggalMaks.getDate() + 7);
    return { min: formatTanggalISO(tanggalMin), max: formatTanggalISO(tanggalMaks) };
}

function bukaPemilihTanggal() {
    let inputTanggal = document.getElementById("inputTanggalOrder");
    if (typeof inputTanggal.showPicker === "function") {
        inputTanggal.showPicker();
    } else {
        inputTanggal.click();
    }
}

function pilihTanggalOrder(tanggal) {
    if (!tanggal) return;
    let rentang = getRentangTanggalOrder();
    if (tanggal < rentang.min || tanggal > rentang.max) {
        renderTabelOrder();
        return;
    }
    tanggalAktif = tanggal;
    document.getElementById("inputStokRealManual").value = "";
    renderTabelOrder();
}

function tampilkanPopupStokAwal(mode) {
    let tanggalKemarin = getTanggalKemarin(tanggalAktif);
    let stokKemarin = databaseStokRealHarian[tanggalKemarin];
    modePopupStokAwal = mode;
    tanggalTargetStok = tanggalKemarin;
    tanggalPengingatStok = tanggalAktif;

    document.getElementById("formInputStokAwal").style.display = mode === "input" || mode === "edit" ? "block" : "none";
    document.getElementById("inputStokRealAwal").value = stokKemarin !== undefined ? stokKemarin : "";

    if (mode === "input") {
        document.getElementById("judulModalStokAwal").innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Stok Kemarin Belum Diinput';
        document.getElementById("pesanModalStokAwal").innerHTML =
            `Stok akhir real RT tanggal <b style="color:#d97724;">${tanggalKemarin}</b> belum diinput operator. Masukkan stok kemarin; nilai ini akan menjadi stok awal RT hari ini.`;
        document.getElementById("btnKonfirmasiStokAwal").innerText = "Simpan & Buka Form Order";
    } else if (mode === "reminder") {
        document.getElementById("judulModalStokAwal").innerHTML = '<i class="fa-solid fa-circle-info"></i> Pengingat Stok Awal RT';
        document.getElementById("pesanModalStokAwal").innerHTML =
            `Pengingat: stok awal RT hari ini adalah <b>${stokKemarin} Pcs</b>, bersumber dari stok akhir real tanggal <b>${tanggalKemarin}</b>.`;
        document.getElementById("btnKonfirmasiStokAwal").innerText = "Lanjutkan ke Form Order";
    } else {
        document.getElementById("judulModalStokAwal").innerHTML = '<i class="fa-solid fa-pen"></i> Ubah Stok Real Kemarin';
        document.getElementById("pesanModalStokAwal").innerHTML =
            `Ubah stok akhir real tanggal <b>${tanggalKemarin}</b>. Nilai ini menjadi stok awal RT hari ini.`;
        document.getElementById("btnKonfirmasiStokAwal").innerText = "Simpan Stok";
    }

    document.getElementById("modalInputStokAwal").style.display = "flex";
}

function cekSebelumTambahOrder() {
    if (tanggalAktifAdalahArsip()) {
        alert("Tanggal lampau hanya dapat dilihat sebagai arsip.");
        return;
    }
    let stokKemarin = databaseStokRealHarian[getTanggalKemarin(tanggalAktif)];
    if (stokKemarin === undefined) {
        tampilkanPopupStokAwal("input");
    } else if (pengingatStokHarian[tanggalAktif]) {
        bukaFormOrderTambah();
    } else {
        tampilkanPopupStokAwal("reminder");
    }
}

function bukaModalStokUlang() {
    if (tanggalAktifAdalahArsip()) {
        alert("Tanggal lampau hanya dapat dilihat sebagai arsip.");
        return;
    }
    tampilkanPopupStokAwal("edit");
}

function prosesPopupStokAwal() {
    if (tanggalAktifAdalahArsip()) {
        tutupModal("modalInputStokAwal");
        alert("Tanggal lampau hanya dapat dilihat sebagai arsip.");
        return;
    }
    if (modePopupStokAwal === "reminder") {
        tandaiPengingatStokSelesai();
        tutupModal("modalInputStokAwal");
        bukaFormOrderTambah();
        return;
    }

    let val = parseFloat(document.getElementById("inputStokRealAwal").value);
    if (isNaN(val) || val < 0) { alert("Masukkan jumlah stok real RT kemarin dengan benar!"); return; }

    databaseStokRealHarian[tanggalTargetStok] = val;
    localStorage.setItem("aliceStokRealHarian", JSON.stringify(databaseStokRealHarian));
    let lanjutKeFormOrder = modePopupStokAwal === "input";
    if (lanjutKeFormOrder) tandaiPengingatStokSelesai();
    tutupModal("modalInputStokAwal");
    renderTabelOrder();
    if (lanjutKeFormOrder) bukaFormOrderTambah();
}

function tandaiPengingatStokSelesai() {
    pengingatStokHarian[tanggalPengingatStok] = true;
    localStorage.setItem("alicePengingatStokAwalHarian", JSON.stringify(pengingatStokHarian));
}

function simpanStokAkhirRealHariIni() {
    if (tanggalAktifAdalahArsip()) return;
    let inputStokReal = document.getElementById("inputStokRealManual");
    let nilai = inputStokReal.value;
    if (nilai !== "") {
        let stokReal = Number(nilai);
        if (!Number.isFinite(stokReal) || stokReal < 0) {
            hitungSelisihRealManual();
            return;
        }
        databaseStokRealHarian[tanggalAktif] = stokReal;
        localStorage.setItem("aliceStokRealHarian", JSON.stringify(databaseStokRealHarian));
    } else {
        delete databaseStokRealHarian[tanggalAktif];
        localStorage.setItem("aliceStokRealHarian", JSON.stringify(databaseStokRealHarian));
    }
    hitungSelisihRealManual();
    renderStokSiapJualRT();
}

function hitungPcsProduksiManual() {
    let sak = parseFloat(document.getElementById("inputProduksiSak").value) || 0;
    let totalPcs = Math.round(sak * empirisHasilRT);
    document.getElementById("txtProduksiPcs").innerText = totalPcs + " Pcs";
    document.getElementById("txtTepungKgKonversi").innerText = (sak * 25).toFixed(2).replace('.',',') + " kg Tepung";
    document.getElementById("txtDetailRacikanTepung").innerText = `${Math.floor(sak)} Sak ${(((sak - Math.floor(sak))*25)).toFixed(2).replace('.',',')} Kg`;
    let stokAwalRT = Number(document.getElementById("txtStokAwal").innerText) || 0;
    let totalJualRT = Number(document.getElementById("txtTotalSales").dataset.totalJualRT) || 0;
    document.getElementById("txtStokTeoritis").dataset.teoritis = stokAwalRT + totalPcs - totalJualRT;
    hitungSelisihRealManual();
    renderStokSiapJualRT();
}

function bukaFormOrderTambah() {
    if (tanggalAktifAdalahArsip()) {
        alert("Tanggal lampau hanya dapat dilihat sebagai arsip.");
        return;
    }
    batalkanTutupOtomatisFormOrder();
    tutupOtomatisFormOrder = permintaanTutupFormOrderDariKeranjang;
    permintaanTutupFormOrderDariKeranjang = false;
    document.getElementById("formOrderTitle").innerText = "➕ Tambah Orderan";
    document.getElementById("editIndexOrder").value = "-1";
    document.getElementById("orderQty").value = "";
    let infoTgl = formatTanggalIndo(tanggalAktif);
    document.getElementById("lblFormTanggal").innerText = infoTgl.formatLengkap;
    
    let selectNama = document.getElementById("orderNamaSelect");
    selectNama.innerHTML = `<option value="">-- Pilih pelanggan --</option>`;
    pelangganList.forEach(p => selectNama.innerHTML += `<option value="${p.nama}">${p.nama} (${p.jenis})</option>`);

    let selectRoti = document.getElementById("orderRotiSelect");
    selectRoti.innerHTML = `<option value="">-- Pilih jenis roti --</option>`;
    barangList.filter(b => b.jenis === "Roti").forEach(r => selectRoti.innerHTML += `<option value="${r.nama}">${r.nama}</option>`);
    
    document.getElementById("modalFormTambahOrder").style.display = "flex";
}

function renderTabelOrder() {
    renderProduksiBulanan();
    let infoTgl = formatTanggalIndo(tanggalAktif);
    document.getElementById("txtHariAktif").innerText = infoTgl.hari;
    document.getElementById("txtTanggalAktif").innerText = infoTgl.formatLengkap;
    let tanggalHariIni = formatTanggalISO(new Date(tahunIni, Number(bulanIni) - 1, Number(hariIni)));
    let tanggalHariIniAktif = tanggalAktif === tanggalHariIni;
    let tanggalArsip = tanggalAktif < formatTanggalISO(new Date());
    document.getElementById("btnTambahOrder").style.display = tanggalArsip ? "none" : "";
    document.getElementById("archiveNotice").style.display = tanggalArsip ? "flex" : "none";
    document.getElementById("thAksiOrder").style.display = tanggalArsip ? "none" : "";
    document.getElementById("btnUbahStokAwal").style.display = tanggalArsip ? "none" : "";
    document.getElementById("inputProduksiSak").disabled = tanggalArsip;
    document.getElementById("inputStokRealManual").disabled = tanggalArsip;
    document.getElementById("dateNavigation").classList.toggle("is-today", tanggalHariIniAktif);
    document.getElementById("lblTanggalKonteks").innerText = tanggalHariIniAktif ? "HARI INI" : "TANGGAL DIPILIH";
    let rentangTanggal = getRentangTanggalOrder();
    let inputTanggal = document.getElementById("inputTanggalOrder");
    inputTanggal.min = rentangTanggal.min;
    inputTanggal.max = rentangTanggal.max;
    inputTanggal.value = tanggalAktif;
    document.getElementById("btnTanggalSebelumnya").disabled = tanggalAktif <= rentangTanggal.min;
    document.getElementById("btnTanggalBerikutnya").disabled = tanggalAktif >= rentangTanggal.max;

    let tbody = document.getElementById("tabelOrderBody"); 
    tbody.innerHTML = ""; 
    
    let totalOrderRT = 0;
    let totalJualSemua = 0;
    let totalJualRT = 0;
    let totalRotiNonReguler = {}; 
    let totalGramasiRotiNonRT = 0;

    let softColors = ["#f0f4c3", "#e1f5fe", "#f3e5f5", "#ffe0b2", "#e8f5e9"];
    let colorMap = {};
    let colorIdx = 0;

    dataOrderHarian.forEach((item, index) => {
        if (item.tgl === tanggalAktif) {
            let namaLower = item.roti.toLowerCase();
            let matchMaster = barangList.find(b => b.nama === item.roti);
            let kodeSingkat = matchMaster ? matchMaster.kode.toLowerCase() : item.roti.substring(0,3).toLowerCase();
            let gramasiPcs = matchMaster && matchMaster.gramasi ? parseFloat(matchMaster.gramasi) : 250;

            let adalahRT = namaLower.includes("bakar") || namaLower.includes("bandung") || kodeSingkat === "rt";
            
            let faktaJual = dataTransaksiJual
                .filter(j => j.nama === item.nama && j.roti === item.roti && j.tgl === item.tgl)
                .reduce((total, transaksi) => total + (Number(transaksi.qty) || 0), 0);

            if (adalahRT) {
                totalOrderRT += item.order;
            } else {
                totalGramasiRotiNonRT += (item.order * gramasiPcs);
                if (!totalRotiNonReguler[item.roti]) totalRotiNonReguler[item.roti] = 0;
                totalRotiNonReguler[item.roti] += item.order;
            }

            let indexAsli = dataOrderHarian.findIndex(x => x.id === item.id);
            let bgRow = "#ffffff"; 
            let aksiOrder = tanggalArsip || item.tgl < formatTanggalISO(new Date())
                ? ""
                : `<button class="btn-edit" onclick="editOrder(${indexAsli})" aria-label="Edit order ${item.nama}"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-delete" onclick="hapusOrder(${indexAsli})" aria-label="Hapus order ${item.nama}"><i class="fa-solid fa-trash"></i></button>`;
            if (!adalahRT) {
                if (!colorMap[item.roti]) {
                    colorMap[item.roti] = softColors[colorIdx % softColors.length];
                    colorIdx++;
                }
                bgRow = colorMap[item.roti];
            }

            tbody.innerHTML += `<tr style="background:${bgRow};">
                <td style="text-align:center;">${index + 1}</td>
                <td><b>${item.nama}</b></td>
                <td style="text-align:center; font-weight:bold; color:#d97724;">${item.order}</td>
                <td>${item.roti}</td>
                <td style="text-align:center; color:#2e7d32; font-weight:bold;">${faktaJual}</td>
                <td style="text-align:center;${tanggalArsip ? "display:none;" : ""}">${aksiOrder}</td>
            </tr>`;
        }
    });

    let penjualanHariIni = dataTransaksiJual.filter(transaksi => transaksi.tgl === tanggalAktif);
    totalJualSemua = penjualanHariIni.reduce((total, transaksi) =>
        total + (Number(transaksi.qty) || 0), 0);
    totalJualRT = penjualanHariIni.reduce((total, transaksi) => {
        let masterBarang = barangList.find(barang =>
            barang.kode === transaksi.kode || barang.nama === transaksi.roti
        );
        let namaRoti = String(transaksi.roti || "").toLowerCase();
        let kodeRoti = String(masterBarang ? masterBarang.kode : transaksi.kode || "").toLowerCase();
        let adalahRotiBakar = namaRoti.includes("bakar") || namaRoti.includes("bandung") || kodeRoti === "rt";
        return total + (adalahRotiBakar ? Number(transaksi.qty) || 0 : 0);
    }, 0);
    document.getElementById("txtTotalOrder").innerText = totalOrderRT;

    let boxNonReg = document.getElementById("boxRotiNonReguler");
    let listNonReg = document.getElementById("listRotiNonRegulerDetail");
    let keysNonReg = Object.keys(totalRotiNonReguler);

    if (keysNonReg.length > 0) {
        boxNonReg.style.display = "block";
        listNonReg.innerHTML = "";
        keysNonReg.forEach(namaRoti => {
            listNonReg.innerHTML += `<div class="item-non-reguler" style="display:flex; justify-content:space-between; font-size:9px; margin-top:2px;"><span>${namaRoti}:</span><b>${totalRotiNonReguler[namaRoti]} Pcs</b></div>`;
        });
    } else {
        boxNonReg.style.display = "none";
        listNonReg.innerHTML = "";
    }

    let infoStokBox = document.getElementById("infoPengingatStok");
    let valStokAwalRT = databaseStokRealHarian[getTanggalKemarin(tanggalAktif)];
    if (valStokAwalRT !== undefined) {
        infoStokBox.style.display = "flex";
        document.getElementById("lblValStokAwalInfo").innerText = valStokAwalRT;
    } else {
        infoStokBox.style.display = "none";
        valStokAwalRT = 0;
    }
    document.getElementById("txtStokAwal").innerText = valStokAwalRT;

    let kebutuhanRT = Math.max(0, totalOrderRT - valStokAwalRT);
    document.getElementById("txtKebutuhan").innerText = kebutuhanRT;
    
    let rtMaster = barangList.find(b => b.jenis === "Roti" && (b.kode.toLowerCase() === "rt" || b.nama.toLowerCase().includes("bakar")));
    let gramasiRT = rtMaster && rtMaster.gramasi ? parseFloat(rtMaster.gramasi) : 250;
    
    let totalGramasiSemuaRoti = (kebutuhanRT * gramasiRT) + totalGramasiRotiNonRT;
    let kapasitasAdonan1Sak = empirisHasilRT * gramasiRT;

    let sakProduksiPresisi = totalGramasiSemuaRoti / kapasitasAdonan1Sak;
    document.getElementById("inputProduksiSak").value = sakProduksiPresisi > 0 ? sakProduksiPresisi.toFixed(2) : "0.00";
    document.getElementById("txtTotalSales").innerText = totalJualSemua;
    document.getElementById("txtTotalSales").dataset.totalJualRT = totalJualRT;
    let inputRealVal = document.getElementById("inputStokRealManual");
    inputRealVal.value = databaseStokRealHarian[tanggalAktif] !== undefined
        ? databaseStokRealHarian[tanggalAktif]
        : "";
    hitungPcsProduksiManual();

    let totalProduksiPcs = Math.round((Number(document.getElementById("inputProduksiSak").value) || 0) * empirisHasilRT);
    
    hitungSelisihRealManual();

    let stokEtalaseTeoriRT = (totalOrderRT + valStokAwalRT) - totalJualRT;
    document.getElementById("txtStokEtalaseVal").innerText = stokEtalaseTeoriRT;

    let orderBelumAmbilRT = Math.max(0, totalOrderRT - totalJualRT); 
    let potensiSelisihRT = (totalProduksiPcs + valStokAwalRT) - (orderBelumAmbilRT + totalJualRT);
    document.getElementById("txtPotensiSelisihVal").innerText = (potensiSelisihRT >= 0 ? "+" : "") + potensiSelisihRT;

    if (tanggalAktif === tanggalHariIni) {
        document.getElementById("homeOrderCount").innerText = dataOrderHarian
            .filter(item => item.tgl === tanggalHariIni).length
            .toLocaleString("id-ID");
        renderStokSiapJualRT();

        let selisihBeranda = document.getElementById("homePotentialDifference");
        let statusBeranda = document.getElementById("homeSafetyStatus");
        selisihBeranda.innerText = potensiSelisihRT.toLocaleString("id-ID");
        let stokAman = potensiSelisihRT === 0;
        statusBeranda.innerText = stokAman ? "• Semua klop! / Aman" : "• Perlu dicek";
        statusBeranda.closest(".summary-row").classList.toggle("is-safe", stokAman);
        statusBeranda.closest(".summary-row").classList.toggle("is-attention", !stokAman);
    }
}

function hitungSelisihRealManual() {
    let inputReal = document.getElementById("inputStokRealManual").value;
    if (inputReal === "") {
        document.getElementById("txtSelisih").innerText = "";
        return;
    }
    let realFisik = parseFloat(inputReal) || 0;
    let stokAkhir = document.getElementById("txtStokTeoritis");
    let teori = Number(stokAkhir.dataset.teoritis) || 0;
    let selisih = teori - realFisik;
    document.getElementById("txtSelisih").innerText = (selisih >= 0 ? "+" : "") + selisih;
}

function renderStokSiapJualRT() {
    let rtMaster = barangList.find(barang =>
        barang.jenis === "Roti" &&
        (String(barang.kode).toLowerCase() === "rt" || String(barang.nama).toLowerCase().includes("bakar"))
    );
    let stokTeoritis = Number(document.getElementById("txtStokTeoritis").dataset.teoritis) || 0;
    let stokRealHarian = databaseStokRealHarian[tanggalAktif];
    let stokSiapJual = stokRealHarian === undefined ? stokTeoritis : Number(stokRealHarian);
    document.getElementById("txtStokTeoritis").innerText = stokSiapJual;
    if (tanggalAktif === formatTanggalISO(new Date()) && rtMaster) {
        stokBarangPenjualan[rtMaster.kode] = stokSiapJual;
        localStorage.setItem("aliceStokBarangPenjualan", JSON.stringify(stokBarangPenjualan));
    }
    if (tanggalAktif === formatTanggalISO(new Date())) {
        document.getElementById("homeDisplayStock").innerText = stokSiapJual.toLocaleString("id-ID");
    }
}

function editOrder(index) {
    if (tanggalAktifAdalahArsip()) {
        alert("Tanggal lampau hanya dapat dilihat sebagai arsip.");
        return;
    }
    let o = dataOrderHarian[index];
    bukaFormOrderTambah();
    document.getElementById("formOrderTitle").innerText = "✏️ Edit Orderan";
    document.getElementById("editIndexOrder").value = index;
    let infoTgl = formatTanggalIndo(o.tgl);
    document.getElementById("lblFormTanggal").innerText = infoTgl.formatLengkap;
    document.getElementById("orderNamaSelect").value = o.nama;
    document.getElementById("orderRotiSelect").value = o.roti; 
    document.getElementById("orderQty").value = o.order;
}

function simpanOrderBaru() {
    if (tanggalAktifAdalahArsip()) {
        alert("Tanggal lampau hanya dapat dilihat sebagai arsip.");
        return;
    }
    let editIndex = document.getElementById("editIndexOrder").value;
    let nama = document.getElementById("orderNamaSelect").value;
    let roti = document.getElementById("orderRotiSelect").value;
    let qty = parseInt(document.getElementById("orderQty").value) || 0;
    if (!nama || !roti || qty <= 0) { alert("Pilih pelanggan dan jenis roti, lalu isi jumlah order dengan benar!"); return; }

    let orderBaru = editIndex === "-1";
    if (orderBaru) {
        let newId = dataOrderHarian.length > 0 ? dataOrderHarian[dataOrderHarian.length - 1].id + 1 : 1;
        dataOrderHarian.push({ id: newId, tgl: tanggalAktif, nama, roti, order: qty });
    } else {
        dataOrderHarian[editIndex].nama = nama;
        dataOrderHarian[editIndex].roti = roti;
        dataOrderHarian[editIndex].order = qty;
    }
    localStorage.setItem("aliceOrderHarian", JSON.stringify(dataOrderHarian));
    renderTabelOrder();
    if (orderBaru) {
        document.getElementById("orderNamaSelect").value = "";
        document.getElementById("orderRotiSelect").value = "";
        document.getElementById("orderQty").value = "";
        if (tutupOtomatisFormOrder) {
            tutupOtomatisFormOrder = false;
            timerTutupFormOrder = setTimeout(() => {
                timerTutupFormOrder = null;
                tutupModal("modalFormTambahOrder");
            }, 1500);
        } else {
            document.getElementById("orderNamaSelect").focus();
        }
    } else {
        tutupModal('modalFormTambahOrder');
    }
}

function hapusOrder(index) {
    if (tanggalAktifAdalahArsip()) {
        alert("Tanggal lampau hanya dapat dilihat sebagai arsip.");
        return;
    }
    dataOrderHarian.splice(index, 1);
    localStorage.setItem("aliceOrderHarian", JSON.stringify(dataOrderHarian));
    renderTabelOrder();
}

function simpanBarang() {
    let kode = document.getElementById("kodeBarang").value.trim();
    let nama = document.getElementById("namaBarang").value.trim();
    let jenis = document.getElementById("jenisBarang").value;
    if(!kode || !nama || !jenis) { alert("⚠️ Isi data barang dengan lengkap!"); return; }

    let editIndex = Number(document.getElementById("editIndexBarang").value);
    let barangSebelumnya = editIndex >= 0 ? barangList[editIndex] : {};
    let barang = {
        ...barangSebelumnya,
        kode,
        nama,
        jenis,
        detail: jenis === "Barang Supplier" || jenis === "Bahan Produksi"
            ? document.getElementById("detailKonversiSup").value || "0"
            : document.getElementById("hargaJualToko").value || "0",
        gramasi: jenis === "Roti"
            ? document.getElementById("inputGramasiRoti").value || "250"
            : barangSebelumnya.gramasi || "250"
    };

    if (jenis === "Barang Supplier" || jenis === "Bahan Produksi") {
        barang.satuanSupplier = document.getElementById("satuanSupplier").value;
        barang.detailKonversiSup = document.getElementById("detailKonversiSup").value || "0";
    } else {
        delete barang.satuanSupplier;
        delete barang.detailKonversiSup;
    }

    if (jenis === "Barang Toko") {
        barang.satuanBarang = document.getElementById("satuanBarangToko").value.trim();
        barang.beratBarang = document.getElementById("beratBarangToko").value || "";
    } else {
        delete barang.satuanBarang;
        delete barang.beratBarang;
    }

    if (editIndex >= 0) {
        barangList[editIndex] = barang;
    } else {
        barangList.push(barang);
    }
    localStorage.setItem("aliceBarang", JSON.stringify(barangList));
    batalEditBarang();
    renderBarang();
    alert(editIndex >= 0 ? "✅ Perubahan barang berhasil disimpan!" : "✅ Barang tersimpan!");
}

function editBarang(index) {
    let barang = barangList[index];
    if (!barang) return;

    batalEditBarang();
    document.getElementById("editIndexBarang").value = index;
    document.getElementById("formBarangTitle").innerText = "Edit Data Barang";
    document.getElementById("btnSimpanBarang").innerText = "Simpan Perubahan";
    document.getElementById("btnBatalEditBarang").style.display = "block";
    document.getElementById("kodeBarang").value = barang.kode;
    document.getElementById("namaBarang").value = barang.nama;
    document.getElementById("jenisBarang").value = barang.jenis;
    aturOpsiJenis();

    if (barang.jenis === "Barang Supplier" || barang.jenis === "Bahan Produksi") {
        document.getElementById("satuanSupplier").value = barang.satuanSupplier || "Karton (Kg)";
        document.getElementById("detailKonversiSup").value = barang.detailKonversiSup || barang.detail || "";
    } else {
        document.getElementById("hargaJualToko").value = barang.detail || "";
        document.getElementById("satuanBarangToko").value = barang.satuanBarang || "";
        document.getElementById("beratBarangToko").value = barang.beratBarang || "";
    }
    document.getElementById("inputGramasiRoti").value = barang.gramasi || "";
    document.getElementById("subTabBarang").scrollIntoView({ behavior: "smooth", block: "start" });
}

function batalEditBarang() {
    document.getElementById("editIndexBarang").value = "-1";
    document.getElementById("formBarangTitle").innerText = "Tambah Barang Baru";
    document.getElementById("btnSimpanBarang").innerText = "+ Simpan Barang";
    document.getElementById("btnBatalEditBarang").style.display = "none";
    document.getElementById("kodeBarang").value = "";
    document.getElementById("namaBarang").value = "";
    document.getElementById("jenisBarang").value = "";
    document.getElementById("satuanSupplier").selectedIndex = 0;
    document.getElementById("detailKonversiSup").value = "";
    document.getElementById("hargaJualToko").value = "";
    document.getElementById("satuanBarangToko").value = "";
    document.getElementById("beratBarangToko").value = "";
    document.getElementById("inputGramasiRoti").value = "";
    aturOpsiJenis();
}

function renderBarang() {
    let container = document.getElementById("containerListBarang"); container.innerHTML = "";
    let kataCari = document.getElementById("inputCariBarang").value.trim().toLowerCase();
    let jenisFilter = document.getElementById("filterJenisBarang").value;
    barangList.forEach((b, idx) => {
        if (jenisFilter && b.jenis !== jenisFilter) return;
        if (!`${b.kode} ${b.nama}`.toLowerCase().includes(kataCari)) return;
        let detailToko = b.jenis === "Barang Toko"
            ?             ` · Harga: Rp ${Number(b.detail || 0).toLocaleString("id-ID")} · Satuan: ${b.satuanBarang || "-"} · Berat: ${b.beratBarang ? `${b.beratBarang} g` : "-"} · Stok: ${Number(stokBarangPenjualan[b.kode]) || 0} ${b.satuanBarang || "pcs"}`
            : "";
        let detailStokRoti = b.jenis === "Roti"
            ? ` · Stok: ${Number(stokBarangPenjualan[b.kode]) || 0} pcs`
            : "";
        let detailSupplier = b.jenis === "Barang Supplier"
            ? ` · Isi: ${b.detailKonversiSup || b.detail || "-"} ${b.satuanSupplier === "Karton (Pcs)" ? "pcs per karton" : b.satuanSupplier === "Karton (Kg)" ? "kg per karton" : b.satuanSupplier || ""}`
            : "";
        let detailBahanProduksi = b.jenis === "Bahan Produksi"
            ? ` · Isi: ${b.detailKonversiSup || b.detail || "-"} ${b.satuanSupplier || ""}`
            : "";
        container.innerHTML += `<div class="list-card"><div class="list-info"><h4>[${b.kode}] ${b.nama}</h4><p>Jenis: ${b.jenis}${detailSupplier}${detailBahanProduksi}${detailToko}${detailStokRoti}</p></div><div style="display:flex; gap:6px;"><button class="btn-edit" onclick="editBarang(${idx})" aria-label="Edit ${b.nama}"><i class="fa-solid fa-pen"></i></button><button class="btn-delete" onclick="hapusBarang(${idx})" aria-label="Hapus ${b.nama}"><i class="fa-solid fa-trash"></i></button></div></div>`;
    });
}

function hapusBarang(index) {
    barangList.splice(index, 1);
    localStorage.setItem("aliceBarang", JSON.stringify(barangList));
    if (Number(document.getElementById("editIndexBarang").value) === index) {
        batalEditBarang();
    } else if (Number(document.getElementById("editIndexBarang").value) > index) {
        document.getElementById("editIndexBarang").value = Number(document.getElementById("editIndexBarang").value) - 1;
    }
    renderBarang();
}

function simpanAkun() {
    let kode = document.getElementById("kodeAkun").value.trim();
    let nama = document.getElementById("namaAkun").value.trim();
    let jenis = document.getElementById("jenisAkun").value;
    if (!kode || !nama || !jenis) {
        alert("⚠️ Lengkapi kode, nama, dan jenis akun terlebih dahulu.");
        return;
    }

    let editIndex = Number(document.getElementById("editIndexAkun").value);
    let kodeSudahDipakai = akunDatabase.some((akun, index) =>
        index !== editIndex && akun.kode.toLowerCase() === kode.toLowerCase()
    );
    if (kodeSudahDipakai) {
        alert("⚠️ Kode akun sudah digunakan. Gunakan kode yang berbeda.");
        return;
    }

    let akun = { kode, nama, jenis };
    if (editIndex >= 0) akunDatabase[editIndex] = akun;
    else akunDatabase.push(akun);

    localStorage.setItem("aliceAkunDatabase", JSON.stringify(akunDatabase));
    batalEditAkun();
    renderAkunDatabase();
    alert(editIndex >= 0 ? "✅ Perubahan akun berhasil disimpan!" : "✅ Akun berhasil disimpan!");
}

function editAkun(index) {
    let akun = akunDatabase[index];
    if (!akun) return;

    document.getElementById("editIndexAkun").value = index;
    document.getElementById("formAkunTitle").innerText = "Edit Data Akun";
    document.getElementById("btnSimpanAkun").innerHTML = '<i class="fa-solid fa-floppy-disk" aria-hidden="true"></i> Simpan Perubahan';
    document.getElementById("btnBatalEditAkun").style.display = "inline-flex";
    document.getElementById("kodeAkun").value = akun.kode;
    document.getElementById("namaAkun").value = akun.nama;
    document.getElementById("jenisAkun").value = akun.jenis;
    document.getElementById("subTabAkun").scrollIntoView({ behavior: "smooth", block: "start" });
}

function batalEditAkun() {
    document.getElementById("editIndexAkun").value = "-1";
    document.getElementById("formAkunTitle").innerText = "Tambah Akun Baru";
    document.getElementById("btnSimpanAkun").innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i> Simpan Akun';
    document.getElementById("btnBatalEditAkun").style.display = "none";
    document.getElementById("kodeAkun").value = "";
    document.getElementById("namaAkun").value = "";
    document.getElementById("jenisAkun").value = "";
}

function renderAkunDatabase() {
    let container = document.getElementById("containerListAkun");
    let kataCari = document.getElementById("cariAkun").value.trim().toLowerCase();
    let akunTerfilter = akunDatabase
        .map((akun, index) => ({ ...akun, index }))
        .filter(akun => `${akun.kode} ${akun.nama} ${akun.jenis}`.toLowerCase().includes(kataCari));

    document.getElementById("jumlahAkunDatabase").innerText = akunDatabase.length;
    container.replaceChildren();

    if (akunTerfilter.length === 0) {
        let emptyState = document.createElement("div");
        emptyState.className = "account-empty-state";
        let icon = document.createElement("i");
        icon.className = "fa-regular fa-folder-open";
        icon.setAttribute("aria-hidden", "true");
        let message = document.createElement("p");
        message.textContent = kataCari ? "Akun yang dicari tidak ditemukan." : "Belum ada akun. Tambahkan akun pertama di atas.";
        emptyState.append(icon, message);
        container.appendChild(emptyState);
        return;
    }

    let tableWrap = document.createElement("div");
    tableWrap.className = "account-table-wrap";
    let table = document.createElement("table");
    table.className = "account-table";
    let header = document.createElement("thead");
    let headerRow = document.createElement("tr");
    ["Kode", "Nama Akun", "Jenis", "Aksi"].forEach(label => {
        let cell = document.createElement("th");
        cell.textContent = label;
        headerRow.appendChild(cell);
    });
    header.appendChild(headerRow);
    let body = document.createElement("tbody");

    akunTerfilter.forEach(akun => {
        let row = document.createElement("tr");
        let codeCell = document.createElement("td");
        let code = document.createElement("span");
        code.className = "account-code";
        code.textContent = akun.kode;
        codeCell.appendChild(code);

        let nameCell = document.createElement("td");
        nameCell.className = "account-name";
        nameCell.textContent = akun.nama;

        let typeCell = document.createElement("td");
        let type = document.createElement("span");
        type.className = `account-type account-type-${akun.jenis.toLowerCase()}`;
        type.textContent = akun.jenis;
        typeCell.appendChild(type);

        let actionCell = document.createElement("td");
        actionCell.className = "account-actions";
        let editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "account-action-button account-edit-button";
        editButton.setAttribute("aria-label", `Edit akun ${akun.nama}`);
        editButton.innerHTML = '<i class="fa-solid fa-pen" aria-hidden="true"></i>';
        editButton.addEventListener("click", () => editAkun(akun.index));
        let deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "account-action-button account-delete-button";
        deleteButton.setAttribute("aria-label", `Hapus akun ${akun.nama}`);
        deleteButton.innerHTML = '<i class="fa-solid fa-trash" aria-hidden="true"></i>';
        deleteButton.addEventListener("click", () => hapusAkun(akun.index));
        actionCell.append(editButton, deleteButton);
        row.append(codeCell, nameCell, typeCell, actionCell);
        body.appendChild(row);
    });

    table.append(header, body);
    tableWrap.appendChild(table);
    container.appendChild(tableWrap);
}

function hapusAkun(index) {
    let akun = akunDatabase[index];
    if (!akun || !confirm(`Hapus akun "${akun.nama}"?`)) return;

    akunDatabase.splice(index, 1);
    localStorage.setItem("aliceAkunDatabase", JSON.stringify(akunDatabase));
    let editIndex = Number(document.getElementById("editIndexAkun").value);
    if (editIndex === index) batalEditAkun();
    else if (editIndex > index) document.getElementById("editIndexAkun").value = editIndex - 1;
    renderAkunDatabase();
}

function simpanPelanggan() {
    let nama = document.getElementById("namaPelanggan").value.trim();
    let hp = document.getElementById("hpPelanggan").value || "-";
    let jenis = document.getElementById("jenisPelanggan").value;
    if(!nama) { alert("Nama wajib diisi!"); return; }

    let editIndex = Number(document.getElementById("editIndexPelanggan").value);
    if (editIndex >= 0) {
        pelangganList[editIndex] = { nama, hp, jenis };
    } else {
        pelangganList.push({ nama, hp, jenis });
    }
    localStorage.setItem("alicePelanggan", JSON.stringify(pelangganList));
    batalEditPelanggan();
    renderPelanggan();
    tutupModal('modalSetting');
    alert(editIndex >= 0 ? "✅ Perubahan pelanggan berhasil disimpan!" : "✅ Pelanggan tersimpan!");
}

function editPelanggan(index) {
    let pelanggan = pelangganList[index];
    if (!pelanggan) return;

    batalEditPelanggan();
    document.getElementById("editIndexPelanggan").value = index;
    document.getElementById("formPelangganTitle").innerText = "Edit Data Pelanggan";
    document.getElementById("btnSimpanPelanggan").innerText = "Simpan Perubahan";
    document.getElementById("btnBatalEditPelanggan").style.display = "block";
    document.getElementById("namaPelanggan").value = pelanggan.nama;
    document.getElementById("hpPelanggan").value = pelanggan.hp === "-" ? "" : pelanggan.hp;
    document.getElementById("jenisPelanggan").value = pelanggan.jenis;
    document.getElementById("subTabPelanggan").scrollIntoView({ behavior: "smooth", block: "start" });
}

function batalEditPelanggan() {
    document.getElementById("editIndexPelanggan").value = "-1";
    document.getElementById("formPelangganTitle").innerText = "Tambah Pelanggan Baru";
    document.getElementById("btnSimpanPelanggan").innerText = "+ Tambah Pelanggan";
    document.getElementById("btnBatalEditPelanggan").style.display = "none";
    document.getElementById("namaPelanggan").value = "";
    document.getElementById("hpPelanggan").value = "";
    document.getElementById("jenisPelanggan").value = "Pedagang";
}

function renderPelanggan() {
    let container = document.getElementById("containerListPelanggan");
    container.innerHTML = "";
    let kataCari = document.getElementById("inputCariPelanggan").value.trim().toLowerCase();
    let jenisFilter = document.getElementById("filterJenisPelanggan").value;
    pelangganList.forEach((p, idx) => {
        if (jenisFilter && p.jenis !== jenisFilter) return;
        if (!p.nama.toLowerCase().includes(kataCari)) return;
        let card = document.createElement("div");
        card.className = "list-card";
        let info = document.createElement("div");
        info.className = "list-info";
        let title = document.createElement("h4");
        title.textContent = `${p.nama} (${p.jenis})`;
        let phone = document.createElement("p");
        phone.textContent = `HP: ${p.hp}`;
        info.append(title, phone);
        if (p.jenis === "Pedagang") {
            let savings = document.createElement("p");
            savings.textContent =
                `Tabungan: Rp ${(Number(saldoTabunganPelanggan[p.nama]) || 0).toLocaleString("id-ID")}`;
            info.appendChild(savings);
        }

        let actions = document.createElement("div");
        actions.style.display = "flex";
        actions.style.gap = "6px";
        let editButton = document.createElement("button");
        editButton.className = "btn-edit";
        editButton.setAttribute("aria-label", `Edit ${p.nama}`);
        editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
        editButton.addEventListener("click", () => editPelanggan(idx));
        let deleteButton = document.createElement("button");
        deleteButton.className = "btn-delete";
        deleteButton.setAttribute("aria-label", `Hapus ${p.nama}`);
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.addEventListener("click", () => hapusPelanggan(idx));
        actions.append(editButton, deleteButton);
        card.append(info, actions);
        container.appendChild(card);
    });
}

function hapusPelanggan(index) {
    pelangganList.splice(index, 1);
    localStorage.setItem("alicePelanggan", JSON.stringify(pelangganList));
    let editIndex = Number(document.getElementById("editIndexPelanggan").value);
    if (editIndex === index) {
        batalEditPelanggan();
    } else if (editIndex > index) {
        document.getElementById("editIndexPelanggan").value = editIndex - 1;
    }
    renderPelanggan();
}

function geserTanggal(arah) {
    let d = new Date(tanggalAktif);
    d.setDate(d.getDate() + arah);
    let tanggalBaru = formatTanggalISO(d);
    let rentang = getRentangTanggalOrder();
    if (tanggalBaru < rentang.min || tanggalBaru > rentang.max) return;
    tanggalAktif = tanggalBaru;
    document.getElementById("inputStokRealManual").value = "";
    renderTabelOrder();
}

let formOrderTambahElement = document.getElementById("modalFormTambahOrder");
formOrderTambahElement.addEventListener("input", batalkanTutupOtomatisFormOrder);
formOrderTambahElement.addEventListener("change", batalkanTutupOtomatisFormOrder);
renderTabelOrder();