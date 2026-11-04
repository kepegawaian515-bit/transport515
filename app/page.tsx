"use client";
import { useState, useRef } from "react";

export default function Page() {
  const [nip, setNip] = useState("169606");
  const [nama, setNama] = useState("Setiadi");
  const [bagian, setBagian] = useState("Subbagian Tata Usaha");
  const [status, setStatus] = useState("LIBUR");
  const [foto, setFoto] = useState<string | null>(null);
  const [showCam, setShowCam] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const openCamera = async () => {
    setShowCam(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (e) {
      alert("Gagal buka kamera, pastikan ijin kamera diaktifkan!");
      setShowCam(false);
    }
  };

  const closeCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    setShowCam(false);
  };

  const takePhoto = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    setFoto(canvas.toDataURL("image/jpeg", 0.8));
    closeCamera();
  };

  const handleSubmit = () => {
    if (status === "NAIK" && !foto) {
      alert("Wajib FOTO bukti naik! Gak bisa kibul!");
      return;
    }
    if (status === "LIBUR") {
      alert("SUKSES! NAIK tanpa foto = TIDAK VALID di rekap");
    } else {
      alert(`SUKSES! ${nama} VALID NAIK dengan bukti foto! Anti Kibul!`);
    }
    // Reset foto after submit
    // setFoto(null);
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-5 space-y-3">
        <h1 className="font-bold text-center">TRANSPORT 515 - ANTI KIBUL</h1>
        
        <input className="w-full border rounded-lg p-3" value={nip} onChange={e=>setNip(e.target.value)} placeholder="NIP" />
        <input className="w-full border rounded-lg p-3" value={nama} onChange={e=>setNama(e.target.value)} placeholder="Nama" />
        <input className="w-full border rounded-lg p-3" value={bagian} onChange={e=>setBagian(e.target.value)} placeholder="Subbagian" />
        
        <select className="w-full border rounded-lg p-3" value={status} onChange={e=>{setStatus(e.target.value); if(e.target.value==="LIBUR") setFoto(null)}}>
          <option>LIBUR</option>
          <option>NAIK</option>
        </select>

        {status === "NAIK" && (
          <div className="space-y-2">
            {!foto ? (
              <button onClick={openCamera} className="w-full bg-blue-600 text-white rounded-lg p-3 font-bold">
                📸 BUKA KAMERA (Wajib Foto Langsung)
              </button>
            ) : (
              <div className="space-y-2">
                <img src={foto} className="w-full rounded-lg border" />
                <button onClick={()=>setFoto(null)} className="w-full bg-zinc-200 rounded-lg p-2 text-sm">Foto Ulang</button>
              </div>
            )}
            <p className="text-[11px] text-red-600 font-bold text-center">* Tidak bisa ambil dari galeri, harus foto langsung!</p>
          </div>
        )}

        {showCam && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
            <video ref={videoRef} autoPlay playsInline className="flex-1 object-cover" />
            <div className="p-4 flex gap-3 bg-black">
              <button onClick={closeCamera} className="flex-1 bg-zinc-700 text-white rounded-lg p-4">Batal</button>
              <button onClick={takePhoto} className="flex-1 bg-white text-black rounded-lg p-4 font-bold">📸 JEPRET</button>
            </div>
          </div>
        )}

        <button onClick={handleSubmit} className="w-full bg-black text-white rounded-lg p-4 font-bold">
          ✅ SUBMIT VALID
        </button>
      </div>
    </div>
  );
}
