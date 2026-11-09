import React from 'react';
import { Swords, Crown, Users, Info } from 'lucide-react';

// --- DATOS DE LOS FINALISTAS ---
const finalists = [
  { seed: 1, nick: 'Ajedrezfacu', picks: true },
  { seed: 2, nick: 'MiyuKoto', picks: true },
  { seed: 3, nick: 'FernandoPoratto', picks: true },
  { seed: 4, nick: 'Tomimartinez95', picks: true },
  { seed: 5, nick: 'Nicorita14', picks: false },
  { seed: 6, nick: 'Pabameky', picks: false },
  { seed: 7, nick: 'Valeny', picks: false },
  { seed: 8, nick: 'ikeandas', picks: false },
];

const TBD = { nick: 'Por definir', seed: null };

// LLAVE DE GANADORES: Cuartos (A-D) → Semis → Final
const winnersBracket = [
  {
    round: 'Cuartos',
    matches: [
      { label: 'A', p1: TBD, p2: TBD },
      { label: 'B', p1: TBD, p2: TBD },
      { label: 'C', p1: TBD, p2: TBD },
      { label: 'D', p1: TBD, p2: TBD },
    ]
  },
  {
    round: 'Semifinales',
    matches: [
      { label: null, p1: TBD, p2: TBD },
      { label: null, p1: TBD, p2: TBD },
    ]
  },
  {
    round: 'Final Ganadores',
    matches: [
      { label: null, p1: TBD, p2: TBD },
    ]
  }
];

// LLAVE DE PERDEDORES: 4 rondas
const losersBracket = [
  {
    round: 'Ronda 1',
    matches: [
      { label: null, p1: TBD, p2: TBD },
      { label: null, p1: TBD, p2: TBD },
    ]
  },
  {
    round: 'Ronda 2',
    matches: [
      { label: null, p1: TBD, p2: TBD },
      { label: null, p1: TBD, p2: TBD },
    ]
  },
  {
    round: 'Semifinal',
    matches: [
      { label: null, p1: TBD, p2: TBD },
    ]
  },
  {
    round: 'Final Perdedores',
    matches: [
      { label: null, p1: TBD, p2: TBD },
    ]
  }
];

// --- SUBCOMPONENTES ---
const SeedBadge = ({ seed }) => {
  if (!seed) return (
    <span className="w-5 h-5 rounded-full bg-gray-700 text-gray-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
      ?
    </span>
  );
  return (
    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
      {seed}
    </span>
  );
};

const MatchCard = ({ match, accentColor = 'blue' }) => {
  const borderClass = 
    accentColor === 'gold' ? 'border-yellow-500/50 bg-yellow-500/5' 
    : accentColor === 'red' ? 'border-red-800/40'
    : 'border-blue-800/50';

  return (
    <div className={`bg-white/5 backdrop-blur-sm border ${borderClass} rounded-lg p-2 shadow-md w-[175px] sm:w-[190px] transition-all hover:bg-white/10`}>
      {match.label && (
        <div className="text-[10px] font-bold text-blue-300 mb-1 text-center uppercase tracking-wider">
          Partido {match.label}
        </div>
      )}
      <div className="flex items-center gap-2 p-1 rounded">
        <SeedBadge seed={match.p1.seed} />
        <span className="text-xs font-medium truncate flex-1 text-white">{match.p1.nick}</span>
      </div>
      <div className="w-full h-px bg-blue-800/30 my-0.5"></div>
      <div className="flex items-center gap-2 p-1 rounded">
        <SeedBadge seed={match.p2.seed} />
        <span className="text-xs font-medium truncate flex-1 text-white">{match.p2.nick}</span>
      </div>
    </div>
  );
};

const BracketRow = ({ rounds, accentColor }) => (
  <div className="overflow-x-auto pb-2 -mx-2 px-2">
    <div className="flex gap-3 sm:gap-4 min-w-max">
      {rounds.map((round, rIdx) => (
        <div key={rIdx} className="flex flex-col">
          <div className={`text-[10px] text-center mb-2 whitespace-nowrap font-semibold uppercase tracking-wide ${
            accentColor === 'gold' ? 'text-yellow-400' 
            : accentColor === 'red' ? 'text-red-400'
            : 'text-blue-400'
          }`}>
            {round.round}
          </div>
          <div className="flex flex-col gap-3 flex-1 justify-around">
            {round.matches.map((match, mIdx) => (
              <MatchCard key={mIdx} match={match} accentColor={accentColor} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---
const BracketSection = () => {
  return (
    <section id="llave" className="py-16 bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-2 justify-center">
          <Swords className="w-8 h-8 text-yellow-400" />
          <h3 className="text-2xl sm:text-3xl font-bold text-center">Llave de la Final</h3>
        </div>
        <p className="text-center text-blue-300 mb-8 text-sm sm:text-base">
          Doble Eliminación · Llave de Ganadores y Llave de Perdedores
        </p>

        {/* Tabla de Clasificados */}
        <div className="max-w-3xl mx-auto bg-blue-800/30 border border-blue-700/50 rounded-xl p-4 sm:p-5 mb-10">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Users className="w-5 h-5 text-blue-300" />
            <h5 className="text-sm font-bold text-blue-200 uppercase tracking-wide">Clasificados a la Final</h5>
          </div>

          {/* Seeds 1-4 (eligen) */}
          <div className="mb-3">
            <p className="text-[11px] text-blue-400 font-semibold uppercase tracking-wide mb-2 text-center">
              Eligen oponente (Seeds 1-4)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {finalists.filter(p => p.picks).map((p) => (
                <div key={p.seed} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-700/40 border border-blue-500/30">
                  <SeedBadge seed={p.seed} />
                  <span className="text-xs font-medium text-white truncate">{p.nick}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seeds 5-8 (disponibles) */}
          <div>
            <p className="text-[11px] text-blue-400 font-semibold uppercase tracking-wide mb-2 text-center">
              Disponibles para ser elegidos (Seeds 5-8)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {finalists.filter(p => !p.picks).map((p) => (
                <div key={p.seed} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/40 border border-gray-700/30">
                  <SeedBadge seed={p.seed} />
                  <span className="text-xs font-medium text-white truncate">{p.nick}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nota sobre elección */}
          <div className="mt-4 flex items-start gap-2 justify-center">
            <Info className="w-3.5 h-3.5 text-blue-300 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-300 text-center max-w-xl">
              Los cruces de Cuartos (Partidos A-D) se definen por <strong className="text-white">orden de elección</strong>:
              los seeds 1-4 eligen a su oponente de entre los seeds 5-8. El orden de elección se anunciará antes del inicio de la final.
            </p>
          </div>
        </div>

        {/* LLAVE DE GANADORES */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5 text-yellow-400" />
            <h4 className="text-base sm:text-lg font-bold text-yellow-400 uppercase tracking-wide">
              Llave de Ganadores
            </h4>
            <span className="text-xs text-blue-400 hidden sm:inline">(quien pierde desciende a Perdedores)</span>
          </div>
          <BracketRow rounds={winnersBracket} accentColor="blue" />
        </div>

        {/* LLAVE DE PERDEDORES */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Swords className="w-5 h-5 text-red-400" />
            <h4 className="text-base sm:text-lg font-bold text-red-400 uppercase tracking-wide">
              Llave de Perdedores
            </h4>
            <span className="text-xs text-blue-400 hidden sm:inline">(segunda oportunidad - quien pierde queda eliminado)</span>
          </div>
          <BracketRow rounds={losersBracket} accentColor="red" />
        </div>

        {/* GRAN FINAL */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Crown className="w-6 h-6 text-yellow-400" />
            <h4 className="text-lg sm:text-xl font-bold text-yellow-400 uppercase tracking-wide">Gran Final</h4>
          </div>
          <div className="flex justify-center">
            <div className="bg-yellow-500/5 border border-yellow-500/50 rounded-lg p-3 shadow-lg w-full max-w-[220px]">
              <div className="flex items-center gap-2 p-1.5 rounded">
                <SeedBadge seed={null} />
                <span className="text-xs font-medium truncate flex-1 text-white">Ganador Llave Ganadores</span>
              </div>
              <div className="w-full h-px bg-yellow-500/30 my-1"></div>
              <div className="flex items-center gap-2 p-1.5 rounded">
                <SeedBadge seed={null} />
                <span className="text-xs font-medium truncate flex-1 text-white">Ganador Llave Perdedores</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cómo funciona */}
        <div className="max-w-2xl mx-auto bg-blue-800/20 border border-blue-700/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3 justify-center">
            <Info className="w-4 h-4 text-blue-300" />
            <h6 className="text-sm font-bold text-blue-200 uppercase tracking-wide">Cómo Funciona</h6>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-blue-300">
            <div className="bg-blue-900/30 rounded-lg p-3">
              <p className="font-bold text-white mb-1">Llave de Ganadores</p>
              <p>El que pierde baja a la Llave de Perdedores. El campeón va directo a la Gran Final.</p>
            </div>
            <div className="bg-blue-900/30 rounded-lg p-3">
              <p className="font-bold text-white mb-1">Llave de Perdedores</p>
              <p>Segunda oportunidad. El que pierde acá queda eliminado del torneo.</p>
            </div>
            <div className="bg-blue-900/30 rounded-lg p-3">
              <p className="font-bold text-white mb-1">Gran Final</p>
              <p>El invicto de Ganadores vs el sobreviviente de Perdedores. ¡Consagración del campeón!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BracketSection;