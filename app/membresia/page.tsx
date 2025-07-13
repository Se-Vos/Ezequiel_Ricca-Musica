'use client';

export default function Membresia() {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-br from-[#101010] via-[#1b1b1b] to-[#242424] px-4">
      <div className="w-full max-w-5xl">
        {/* Encabezado */}
        <header className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            ¡Únete y desbloquea el contenido exclusivo!
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Acceso ilimitado a toda mi música, videoteca, directos en vivo y más.
          </p>
        </header>

        {/* Planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* --- PLAN MENSUAL --- */}
          <article className="relative overflow-hidden rounded-2xl bg-[#181818] text-gray-300 shadow-lg hover:shadow-xl transition">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-white/5 to-white/10" />
            <div className="relative p-8 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-white">Mensual</h3>
              <p className="text-sm text-gray-400 mb-6">Acceso por 30 días</p>
              <p className="text-4xl font-extrabold text-white mb-6">$5</p>
              <button className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 font-medium text-white transition">
                Comprar
              </button>
            </div>
          </article>

          {/* --- PLAN SEMESTRAL --- */}
          <article className="relative overflow-hidden rounded-2xl bg-[#181818] text-gray-300 shadow-lg hover:shadow-xl transition">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-white/5 to-white/10" />
            <div className="relative p-8 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-white">Semestral</h3>
              <p className="text-sm text-gray-400 mb-6">Acceso por 6 meses</p>
              <p className="text-4xl font-extrabold text-white mb-6">$25</p>
              <button className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 font-medium text-white transition">
                Comprar
              </button>
            </div>
          </article>

          {/* --- PLAN ANUAL --- */}
          <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 via-yellow-600/10 to-yellow-700/20 text-gray-300 shadow-lg hover:shadow-xl transition ring ring-yellow-500/40">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-white/5 to-white/10" />
            <div className="relative p-8 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-yellow-300 flex items-center gap-2">
                ⭐ Anual
              </h3>
              <p className="text-sm text-gray-400 mb-6">Acceso por 12 meses</p>
              <p className="text-4xl font-extrabold text-yellow-200 mb-6">$45</p>
              <button className="w-full py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 font-medium text-black transition">
                Comprar
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
