"use client";
import { useState, useRef } from "react";

export default function Page(){
  const [nip,setNip]=useState("169606");
  const [nama,setNama]=useState("Setiadi");
  const [unit,setUnit]=useState("Subbagian Tata Usaha");
  const [st,setSt]=useState("NAIK TRANSUM");
  const [foto,setFoto]=useState("");
  const [showCam,setShowCam]=useState(false);
  const videoRef=useRef<HTMLVideoElement>(null);
  const streamRef=useRef<MediaStream|null>(null);

  const bukaKamera=async()=>{
    setShowCam(true);
    const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user"}});
    streamRef.current=s;
    if(videoRef.current) videoRef.current.srcObject=s;
  }
  const tutup=()=>{streamRef.current?.getTracks().forEach(t=>t.stop()); setShowCam(false);}
  const jepret=()=>{
    const v=videoRef.current!; const c=document.createElement("canvas");
    c.width=v.videoWidth; c.height=v.videoHeight;
    c.getContext("2d")?.drawImage(v,0,0);
    setFoto(c.toDataURL("image/jpeg")); tutup();
  }

  const isNaik=st.includes("NAIK");
  const bisaSimpan = isNaik ? foto!=="" : true;

  return(
    <div style={{minHeight:'100vh', background:'#f8fafc', padding:16, fontFamily:'sans-serif'}}>
      <div style={{maxWidth:400, margin:'0 auto', background:'white', padding:16, borderRadius:12, border:'1px solid #e2e8f0'}}>
        <h1 style={{fontWeight:'bold', display:'flex', alignItems:'center', gap:8}}>🚌 Transport 515 - Anti Kibul</h1>
        <input value={nip} onChange={e=>setNip(e.target.value)} placeholder="NIP" style={{width:'100%', marginTop:12, padding:10, border:'1px solid #cbd5e1', borderRadius:8}}/>
        <input value={nama} onChange={e=>setNama(e.target.value)} placeholder="Nama" style={{width:'100%', marginTop:8, padding:10, border:'1px solid #cbd5e1', borderRadius:8}}/>
        <input value={unit} onChange={e=>setUnit(e.target.value)} placeholder="Unit" style={{width:'100%', marginTop:8, padding:10, border:'1px solid #cbd5e1', borderRadius:8}}/>
        <select value={st} onChange={e=>setSt(e.target.value)} style={{width:'100%', marginTop:8, padding:10, border:'1px solid #cbd5e1', borderRadius:8}}>
          <option>NAIK TRANSUM</option><option>TURUN TRANSUM</option>
        </select>

        {isNaik && (
          <div style={{marginTop:12, background:'#f0fdf4', border:'1px solid #bbf7d0', padding:10, borderRadius:8}}>
            <div style={{fontWeight:'bold', fontSize:14}}>⚠️ WAJIB FOTO! Kalau naik tanpa foto = TIDAK VALID</div>
            {!foto ? <button onClick={bukaKamera} style={{width:'100%', marginTop:8, padding:12, background:'#2563eb', color:'white', borderRadius:8, fontWeight:'bold'}}>📸 BUKA KAMERA LANGSUNG</button> :
            <><img src={foto} style={{width:'100%', marginTop:8, borderRadius:8}}/><button onClick={()=>setFoto("")} style={{width:'100%', marginTop:6, padding:8, background:'#ef4444', color:'white', borderRadius:8}}>Foto Ulang</button></>}
          </div>
        )}

        <button disabled={!bisaSimpan} style={{width:'100%', marginTop:12, padding:12, borderRadius:8, fontWeight:'bold', background: bisaSimpan?'#16a34a':'#94a3b8', color:'white'}}>
          {bisaSimpan?'✅ SIMPAN ABSEN':'⚠️ LENGKAPI DULU'}
        </button>
      </div>
      {showCam && <div style={{position:'fixed', inset:0, background:'black', zIndex:999, display:'flex', flexDirection:'column'}}><video ref={videoRef} autoPlay playsInline style={{flex:1, objectFit:'cover'}}/><div style={{padding:16, display:'flex', gap:8}}><button onClick={tutup} style={{flex:1, padding:12, background:'#334155', color:'white', borderRadius:8}}>Tutup</button><button onClick={jepret} style={{flex:2, padding:12, background:'white', color:'black', borderRadius:8, fontWeight:'bold'}}>JEPRET</button></div></div>}
    </div>
  )
}
