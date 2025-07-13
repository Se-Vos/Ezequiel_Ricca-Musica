"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PerfilUsuario() {
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [nombreUsuario, setNombreUsuario] = useState<string>("Nombre del Usuario");
  const [colorFondo, setColorFondo] = useState("#ffffff");
  const [colorTexto, setColorTexto] = useState("#000000");
  const [colorAcento, setColorAcento] = useState("#ff0000");
  const [singles, setSingles] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [mostrarEditorEstetica, setMostrarEditorEstetica] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("perfilEstetica");
    if (saved) {
      const parsed = JSON.parse(saved);
      setColorFondo(parsed.colorFondo);
      setColorTexto(parsed.colorTexto);
      setColorAcento(parsed.colorAcento);
    }

    const request = indexedDB.open("musicDB", 1);
    request.onsuccess = () => {
      const db = request.result;
      db.transaction("singles","readonly").objectStore("singles").getAll().onsuccess = (e:any)=>setSingles(e.target.result);
      db.transaction("albums","readonly").objectStore("albums").getAll().onsuccess = (e:any)=>setAlbums(e.target.result);
    };
  }, []);

  const handleSaveEstetica = () => {
    localStorage.setItem("perfilEstetica", JSON.stringify({ colorFondo, colorTexto, colorAcento }));
    setMostrarEditorEstetica(false);
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: colorFondo, color: colorTexto }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {fotoPerfil ? (
            <img src={fotoPerfil} className="w-20 h-20 rounded-full object-cover" alt="Foto de perfil" />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded-full" />
          )}
          <h1 className="text-2xl font-bold">{nombreUsuario}</h1>
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setMostrarEditorEstetica(!mostrarEditorEstetica)}>
            {mostrarEditorEstetica ? "Cerrar Estética" : "Editar Estética"}
          </button>
          <Link href="/videoteca"><button className="bg-blue-600 text-white px-4 py-2 rounded">Acceder a Videoteca</button></Link>
        </div>
      </div>

      {/* Editor Estetica */}
      {mostrarEditorEstetica && (
        <div className="mb-6 border rounded p-4 bg-white text-black max-w-md">
          <h2 className="text-lg font-semibold mb-3">Estética del Perfil</h2>
          <div className="space-y-2">
            <div><label className="block font-medium">Color de Fondo:</label><input type="color" value={colorFondo} onChange={e=>setColorFondo(e.target.value)} /></div>
            <div><label className="block font-medium">Color de Texto:</label><input type="color" value={colorTexto} onChange={e=>setColorTexto(e.target.value)} /></div>
            <div><label className="block font-medium">Color de Acento:</label><input type="color" value={colorAcento} onChange={e=>setColorAcento(e.target.value)} /></div>
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-2" onClick={handleSaveEstetica}>Guardar Estética</button>
          </div>
        </div>
      )}

      {/* Música */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Mi Música</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {singles.map((single,i)=>(
            <div key={`single-${i}`} className="border rounded-xl p-3">
              <img src={single.cover} alt="portada" className="rounded mb-2" />
              <h4 className="font-bold">{single.title}</h4>
              <audio controls controlsList="nodownload" src={single.audio} className="w-full mt-2" />
            </div>
          ))}
          {albums.map((album,i)=>(
            <div key={`album-${i}`} className="border rounded-xl p-3">
              <h4 className="font-bold mb-2">Álbum: {album.title}</h4>
              {album.tracks.map((track,j)=>(
                <div key={j} className="mb-4 border-t pt-2">
                  <img src={track.cover} className="rounded mb-2" alt="portada" />
                  <h5 className="font-semibold">{track.title}</h5>
                  <audio controls controlsList="nodownload" src={track.audio} className="w-full mt-1" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Listas */}
      <div className="mb-10"><h2 className="text-xl font-semibold mb-2">Mis Listas de Reproducción</h2><div className="bg-white p-4 rounded shadow text-black">(Gestor de listas aquí)</div></div>
    </div>
  );
}
