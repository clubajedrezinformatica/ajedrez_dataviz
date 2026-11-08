import React from 'react';
import { Crown, Swords, Shield, CalendarDays } from 'lucide-react';

// --- NUEVA SECCIÓN: AVISO GRAN FINAL ---
const GrandFinalNotice = () => {
  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        
        {/* Badge superior */}
        <div className="inline-flex items-center justify-center bg-blue-800 border border-blue-700 rounded-full px-4 py-1 mb-6">
          <Crown className="w-4 h-4 text-yellow-400 mr-2" />
          <span className="text-xs sm:text-sm font-semibold text-blue-200 uppercase tracking-widest">
            Etapa Definitiva
          </span>
        </div>

        {/* Título Principal */}
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          Gran Final por Matches
        </h2>

        {/* Fecha */}
        <div className="flex items-center justify-center gap-2 text-blue-300 mb-10">
          <CalendarDays className="w-5 h-5" />
          <p className="text-lg sm:text-xl font-medium">Este 14 de Noviembre</p>
        </div>

        {/* Contenedor de las Llaves */}
        <div className="bg-blue-800/40 border border-blue-700 rounded-xl p-6 sm:p-8 backdrop-blur-sm">
          <p className="text-gray-200 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            El campeón del <span className="font-bold text-white">Prix Online UNLP</span> se consagrará mediante un sistema de doble eliminación.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Llave de Ganadores */}
            <div className="bg-blue-900/60 border border-blue-700/50 rounded-lg p-5 flex flex-col items-center text-center shadow-lg">
              <div className="bg-blue-700 p-3 rounded-full mb-4">
                <Swords className="w-7 h-7 text-yellow-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Llave de Ganadores</h4>
              <p className="text-sm text-blue-300">
                Los cruces directos al título. Quien pierde acá desciende a la llave de perdedores.
              </p>
            </div>

            {/* Llave de Perdedores */}
            <div className="bg-blue-900/60 border border-blue-700/50 rounded-lg p-5 flex flex-col items-center text-center shadow-lg">
              <div className="bg-blue-700 p-3 rounded-full mb-4">
                <Shield className="w-7 h-7 text-blue-200" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Llave de Perdedores</h4>
              <p className="text-sm text-blue-300">
                La segunda oportunidad. El ganador de esta llave se reencuentra con el finalista invicto.
              </p>
            </div>
          </div>
        </div>

        {/* Texto de cierre de sección */}
        <p className="mt-10 text-lg sm:text-xl font-semibold text-yellow-400 uppercase tracking-wide">
          La consagración del Campeón Online Universitario
        </p>
      </div>
    </section>
  );
};

export default GrandFinalNotice;