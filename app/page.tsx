"use client";
import {useState,useRef} from "react";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbya-fWMkLFK2SRnPedPJEolqfbMG0IOL70DrTdfCxycMrMF3s9hQN6DTCsgyIgjAyQLhQ/exec";
export default function Page(){
const [nip,setNip]=useState("169606");const [nama]=useState("Setiadi");
const [unit]=useState("Ciater Satu");const [st,setSt]=useState("NAIK TRANSUM");
const [foto,setFoto]=useState("");const [cam,setCam]=useState(false);
const [loading,setLoading]=useState(false);
const videoRef=useRef<HTMLVideoElement>(null);const streamRef=useRef<MediaStream|null>(null);
const bukaKamera=async()=>{
  setCam(true);
  setTimeout(async()=>{
    try{
      const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user"}});
      streamRef.current=s;
      if(videoRef.current){videoRef.current.srcObject=s; await videoRef.current.play();}
    }catch(e){alert("Kamera gak bisa: "+e); setCam(false);}
  },100);
};
const jepret=()=>{
  const v=videoRef.current; if(!v) return;
  const c=document.createElement("canvas"); c.width=v.videoWidth; c.height=v.videoHeight;
  c.getContext("2d")?.drawImage(v,0,0);
  setFoto(c.toDataURL("image/jpeg",0.6));
  streamRef.current?.getTracks().forEach(t=>t.stop()); setCam(false);
};
const bisaSimpan=nip && foto;
const simpan=async()=>{
  if(!bisaSimpan) return;
  setLoading(true);
  try{
    await fetch(APPS_SCRIPT_URL,{method:"POST",mode:"no-cors",body:JSON.stringify({nip,nama,unit,st,foto})});
    alert("✅ BERHASIL! Cek Sheet!");
    window.open("https://docs.google.com/spreadsheets/d/1Yv6KRcf6jmskG5AxOuPiIHoSpM3J8qd9ISTwHIPvap4","_blank");
    setFoto(""); 
  }catch(e){alert("Gagal: "+e);}
  setLoading(false);
};
return(
<div style={{maxWidth:400,margin:"0 auto",padding:16,fontFamily:"sans-serif"}}>
<h2 style={{fontWeight:"bold"}}>Transport 515 - Anti Kibul ✅</h2>
<div style={{background:"#dcfce7",padding:8,borderRadius:8,marginBottom:12,border:"1px solid #16a34a"}}>Langsung masuk Google Sheet</div>
<label>NIP</label><input value={nip} onChange={e=>setNip(e.target.value)} style={{width:"100%",padding:8,marginBottom:8,border:"1px solid #ccc",borderRadius:8}}/>
<div style={{display:"flex",gap:8,marginBottom:12}}>
<button onClick={()=>setSt("NAIK TRANSUM")} style={{flex:1,padding:10,borderRadius:8,background:st=="NAIK TRANSUM"?"#16a34a":"#e5e7eb",color:st=="NAIK TRANSUM"?"white":"black"}}>NAIK</button>
<button onClick={()=>setSt("TURUN TRANSUM")} style={{flex:1,padding:10,borderRadius:8,background:st=="TURUN TRANSUM"?"#dc2626":"#e5e7eb",color:st=="TURUN TRANSUM"?"white":"black"}}>TURUN</button>
</div>
{!cam && !foto && <button onClick={bukaKamera} style={{width:"100%",padding:14,background:"#2563eb",color:"white",borderRadius:10,fontWeight:"bold"}}>📸 BUKA KAMERA DEPAN</button>}
{cam && <div><video ref={videoRef} autoPlay playsInline muted style={{width:"100%",borderRadius:10,background:"black"}}/><button onClick={jepret} style={{width:"100%",marginTop:8,padding:12,background:"#16a34a",color:"white",borderRadius:8,fontWeight:"bold"}}>📸 JEPRET</button></div>}
{foto && <div><img src={foto} style={{width:"100%",borderRadius:10}}/><button onClick={()=>setFoto("")} style={{width:"100%",marginTop:6}}>🔄 Ulang</button></div>}
<button disabled={!bisaSimpan || loading} onClick={simpan} style={{width:"100%",marginTop:12,padding:12,borderRadius:8,fontWeight:"bold",background:bisaSimpan?"#16a34a":"#94a3b8",color:"white"}}>{loading?"⏳ MENYIMPAN...":bisaSimpan?"✅ SIMPAN KE GOOGLE SHEET":"⚠️ FOTO DULU"}</button>
</div>
)}
