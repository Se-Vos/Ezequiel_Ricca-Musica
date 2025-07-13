'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Perfil() {
  const router = useRouter();

  const tieneMembresia = true; // Cambiá a false para probar redirección

  useEffect(() => {
    if (!tieneMembresia) {
      router.push('/membresia');
    }
  }, [tieneMembresia, router]);

  if (!tieneMembresia) return null;

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-3xl font-bold">Mi Perfil</h2>

      <div className="flex justify-center gap-4">
        <a
          href="/musica"
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
        >
          Música
        </a>
        <a
          href="/videos"
          className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
        >
          Videoteca
        </a>
      </div>

      <p className="text-gray-600 max-w-md mx-auto">
        Aquí podrás personalizar tu perfil, cambiar tu foto, colores y guardar tus contenidos favoritos.
      </p>
    </div>
  );
}

