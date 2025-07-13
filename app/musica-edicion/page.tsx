"use client";

import { useEffect, useState } from "react";

export default function MusicaEdicion() {
  const [modoAlbum, setModoAlbum] = useState(false);
  const [tituloAlbum, setTituloAlbum] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);
  const [singles, setSingles] = useState<any[]>([]);

  useEffect(() => {
    const request = indexedDB.open("musicDB", 1);
    request.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("singles")) db.createObjectStore("singles", { keyPath: "id", autoIncrement: true });
      if (!db.objectStoreNames.contains("albums")) db.createObjectStore("albums", { keyPath: "id", autoIncrement: true });
    };
    request.onsuccess = () => {
      const db = request.result;
      db.transaction("singles", "readonly").objectStore("singles").getAll().onsuccess = (e: any) =>
        setSingles(e.target.result);
    };
  }, []);

  const handleSingleUpload = (e: any) => {
    e.preventDefault();
    const cover = e.target.cover.files[0];
    const audio = e.target.audio.files[0];
    const title = e.target.title.value;

    const readerCover = new FileReader();
    const readerAudio = new FileReader();

    readerCover.onloadend = () => {
      const coverData = readerCover.result;
      readerAudio.onloadend = () => {
        const audioData = readerAudio.result;
        const single = { title, cover: coverData, audio: audioData };
        const request = indexedDB.open("musicDB", 1);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction("singles", "readwrite");
          tx.objectStore("singles").add(single);
          tx.oncomplete = () => window.location.reload();
        };
      };
      readerAudio.readAsDataURL(audio);
    };
    readerCover.readAsDataURL(cover);
  };

  const handleAddTrackToAlbum = (e: any) => {
    e.preventDefault();
    const cover = e.target.cover.files[0];
    const audio = e.target.audio.files[0];
    const title = e.target.title.value;

    const readerCover = new FileReader();
    const readerAudio = new FileReader();

    readerCover.onloadend = () => {
      const coverData = readerCover.result;
      readerAudio.onloadend = () => {
        const audioData = readerAudio.result;
        setTracks((prev) => [...prev, { title, cover: coverData, audio: audioData }]);
      };
      readerAudio.readAsDataURL(audio);
    };
    readerCover.readAsDataURL(cover);
  };

  const handleSaveAlbum = () => {
    if (!tituloAlbum || tracks.length === 0) return;
    const album = { title: tituloAlbum, tracks };
    const request = indexedDB.open("musicDB", 1);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("albums", "readwrite");
      tx.objectStore("albums").add(album);
      tx.oncomplete = () => {
        setTituloAlbum("");
        setTracks([]);
        setModoAlbum(false);
        window.location.reload();
      };
    };
  };

  const handleDeleteSingle = (id: number) => {
    const request = indexedDB.open("musicDB", 1);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("singles", "readwrite");
      tx.objectStore("singles").delete(id);
      tx.oncomplete = () => window.location.reload();
    };
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Subir Música</h1>

      <div className="mb-6">
        <button
          onClick={() => setModoAlbum(false)}
          className={`px-4 py-2 mr-2 rounded ${!modoAlbum ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Subir Single
        </button>
        <button
          onClick={() => setModoAlbum(true)}
          className={`px-4 py-2 rounded ${modoAlbum ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Crear Álbum
        </button>
      </div>

      {!modoAlbum ? (
        <form onSubmit={handleSingleUpload} className="space-y-4 bg-white p-4 rounded shadow text-black max-w-md">
          <div>
            <label className="block font-medium">Título:</label>
            <input type="text" name="title" className="border w-full p-1 rounded" required />
          </div>
          <div>
            <label className="block font-medium">Portada:</label>
            <input type="file" name="cover" accept="image/*" required />
          </div>
          <div>
            <label className="block font-medium">Audio:</label>
            <input type="file" name="audio" accept="audio/*" required />
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Subir Single</button>
        </form>
      ) : (
        <div className="bg-white p-4 rounded shadow text-black max-w-xl space-y-4">
          <div>
            <label className="block font-medium">Título del Álbum:</label>
            <input type="text" value={tituloAlbum} onChange={(e) => setTituloAlbum(e.target.value)} className="border w-full p-1 rounded" required />
          </div>

          <form onSubmit={handleAddTrackToAlbum} className="space-y-3">
            <h3 className="text-lg font-semibold">Agregar Track</h3>
            <div>
              <label className="block font-medium">Título del Track:</label>
              <input type="text" name="title" className="border w-full p-1 rounded" required />
            </div>
            <div>
              <label className="block font-medium">Portada:</label>
              <input type="file" name="cover" accept="image/*" required />
            </div>
            <div>
              <label className="block font-medium">Audio:</label>
              <input type="file" name="audio" accept="audio/*" required />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Agregar Track</button>
          </form>

          {tracks.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold">Tracks añadidos:</h4>
              <ul className="list-disc list-inside">
                {tracks.map((t, i) => (
                  <li key={i}>{t.title}</li>
                ))}
              </ul>
              <button onClick={handleSaveAlbum} className="bg-green-600 text-white px-4 py-2 mt-2 rounded">Guardar Álbum</button>
            </div>
          )}
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Singles Subidos</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {singles.map((s) => (
            <div key={s.id} className="border rounded p-3">
              <img src={s.cover} alt="portada" className="rounded mb-2" />
              <h4 className="font-bold">{s.title}</h4>
              <audio controls controlsList="nodownload" src={s.audio} className="w-full mt-2" />
              <button onClick={() => handleDeleteSingle(s.id)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
