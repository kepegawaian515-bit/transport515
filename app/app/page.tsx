"use client";
import { useState } from "react";
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw.../exec";
export default function Page() {
  const [status, setStatus] = useState("");
  const [link, setLink] = useState("");
  const [ket, setKet] = useState("");
  const [loading, setLoading] = useState(false);
  const canSubmit = () => {
    if (!status) return false;
    if (status === "NAIK TRANSUM" && !link.trim()) return false;
    if (status === "TIDAK NAIK TRANSUM" && ket.trim().length < 10) return false;
    return true;
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const payload = { TANGGAL: new Date().toLocaleDateString("id-ID"), NRK: e.target.nrk.value, NAMA: e.target.nama.value, UNIT: e.target.unit.value, STATUS: status, LINK: link, KETERANGAN: ket };
    await fetch(SCRIPT_URL, { method: "POST", body: JSON.stringify(payload), mode: "no-cors" });
    alert("SUKSES! NAIK tanpa foto = TIDAK VALID di rekap");
    setLoading(false);
  };
  return (
    <div style={{maxWidth:440,margin:"0 auto",padding:16}}>
      <h2>🚍 Transport 515 - Anti Kibul</h2>
      <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:14,border:"1px solid #ddd",padding:16,borderRadius:12}}>
        <input name="nrk" placeholder="NRK" required style={{padding:12,borderRadius:8,border:"1px solid #ccc"}} />
        <input name="nama" placeholder="Nama" required style={{padding:12,borderRadius:8,border:"1px solid #ccc"}} />
        <input name="unit" placeholder="Unit" required style={{padding:12,borderRadius:8,border:"1px solid #ccc"}} />
        <select value={status} onChange={e=>setStatus(e.target.value)} required style={{padding:12,borderRadius:8,border:"1px solid #ccc"}}>
          <option value="">-- Pilih Status --</option>
          <option>NAIK TRANSUM</option>
          <option>TIDAK NAIK TRANSUM</option>
          <option>LIBUR</option><option>CUTI</option><option>SAKIT</option>
        </select>
        {status === "NAIK TRANSUM" && <div style={{background:"#e8f5e9",padding:12,borderRadius:8}}><b>⚠️ WAJIB FOTO!</b> Kalau naik tanpa foto = Terhitung TIDAK VALID/TIDAK NAIK di rekap<br/><input value={link} onChange={e=>setLink(e.target.value)} placeholder="Link Foto" required style={{width:"100%",padding:10,marginTop:8}} /></div>}
        {status === "TIDAK NAIK TRANSUM" && <div style={{background:"#ffebee",padding:12,borderRadius:8}}><b>⚠️ WAJIB ALASAN!</b><br/><textarea value={ket} onChange={e=>setKet(e.target.value)} placeholder="Alasan min 10 huruf" required style={{width:"100%",padding:10,marginTop:8}} /></div>}
        <button disabled={!canSubmit()||loading} style={{padding:14,background:canSubmit()?"black":"gray",color:"white",borderRadius:8}}>{canSubmit()?"✅ SUBMIT VALID":"⚠️ LENGKAPI DULU"}</button>
      </form>
    </div>
  );
}
