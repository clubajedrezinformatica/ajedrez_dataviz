import React, { useState } from 'react';
import { 
  Trophy, BarChart3, TrendingUp, Target, Award
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

// --- DATOS ACTUALIZADOS DE LOS 8 FINALISTAS ---
const finalistsStats = [
  {
    id: 1, nick: 'Ajedrezfacu', seed: 1, totalPoints: 163, tournamentsPlayed: 8,
    avgPerTournament: 20.4, bestRound: { points: 42, date: 'Fecha 4' },
    pointsPerRound: [25, 14, 24, 42, 26, 12, 13, 7],
    results: { wins: 51, draws: 6, losses: 13 }
  },
  {
    id: 2, nick: 'MiyuKoto', seed: 2, totalPoints: 108, tournamentsPlayed: 6,
    avgPerTournament: 18.0, bestRound: { points: 29, date: 'Fecha 2' },
    pointsPerRound: [16, 29, 0, 10, 0, 16, 28, 9],
    results: { wins: 35, draws: 3, losses: 17 }
  },
  {
    id: 3, nick: 'FernandoPoratto', seed: 3, totalPoints: 102, tournamentsPlayed: 7,
    avgPerTournament: 14.6, bestRound: { points: 30, date: 'Fecha 5' },
    pointsPerRound: [4, 12, 0, 10, 30, 18, 12, 16],
    results: { wins: 40, draws: 0, losses: 26 }
  },
  {
    id: 4, nick: 'Tomimartinez95', seed: 4, totalPoints: 79, tournamentsPlayed: 6,
    avgPerTournament: 13.2, bestRound: { points: 26, date: 'Fecha 4' },
    pointsPerRound: [0, 21, 19, 26, 8, 0, 0, 5],
    results: { wins: 25, draws: 6, losses: 35 }
  },
  {
    id: 5, nick: 'Nicorita14', seed: 5, totalPoints: 77, tournamentsPlayed: 5,
    avgPerTournament: 15.4, bestRound: { points: 27, date: 'Fecha 8' },
    pointsPerRound: [0, 0, 0, 27, 4, 7, 12, 27],
    results: { wins: 25, draws: 4, losses: 16 }
  },
  {
    id: 6, nick: 'Pabameky', seed: 6, totalPoints: 65, tournamentsPlayed: 5,
    avgPerTournament: 13.0, bestRound: { points: 20, date: 'Fecha 5' },
    pointsPerRound: [0, 0, 11, 12, 20, 12, 0, 10],
    results: { wins: 22, draws: 4, losses: 19 }
  },
  {
    id: 7, nick: 'Valeny', seed: 7, totalPoints: 64, tournamentsPlayed: 7,
    avgPerTournament: 9.1, bestRound: { points: 15, date: 'Fecha 1' },
    pointsPerRound: [15, 11, 8, 6, 6, 12, 0, 6],
    results: { wins: 26, draws: 3, losses: 34 }
  },
  {
    id: 8, nick: 'ikeandas', seed: 8, totalPoints: 61, tournamentsPlayed: 6,
    avgPerTournament: 10.2, bestRound: { points: 16, date: 'Fecha 4' },
    pointsPerRound: [5, 4, 0, 16, 9, 13, 0, 14],
    results: { wins: 25, draws: 2, losses: 25 }
  },
];

const roundLabels = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'];

// Funciones helper para procesar datos
const getAccumulatedData = (pointsPerRound) => {
  let acc = 0;
  return pointsPerRound.map((pts, i) => {
    acc += pts;
    return { name: roundLabels[i], puntos: acc };
  });
};

const getRoundData = (pointsPerRound) => 
  pointsPerRound.map((pts, i) => ({ name: roundLabels[i], puntos: pts }));

const getResultsData = (results) => [
  { name: 'Victorias', value: results.wins, color: '#16a34a' },
  { name: 'Empates', value: results.draws, color: '#9ca3af' },
  { name: 'Derrotas', value: results.losses, color: '#dc2626' },
];

// Componente KPI reutilizable
const KPICard = ({ icon: Icon, label, value, accent }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 shadow-sm">
    <div className={`${accent} p-2 rounded-lg`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-lg sm:text-xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---
const PerformanceStatsSection = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(finalistsStats[0].id);
  const player = finalistsStats.find(p => p.id === selectedPlayer);
  
  const accumulatedData = getAccumulatedData(player.pointsPerRound);
  const roundData = getRoundData(player.pointsPerRound);
  const resultsData = getResultsData(player.results);
  const totalGames = player.results.wins + player.results.draws + player.results.losses;

  return (
    <section id="estadisticas" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de la sección */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <BarChart3 className="w-8 h-8 text-blue-800" />
          <h3 className="text-2xl sm:text-3xl font-bold text-blue-900 text-center">
            Estadísticas de Desempeño
          </h3>
        </div>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          Analizá el desempeño de los 8 finalistas durante la fase regular del Prix Online UNLP 2026.
        </p>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          
          {/* Selector de jugadores */}
          <div className="flex gap-2 p-4 bg-gray-50 border-b border-gray-200 overflow-x-auto">
            {finalistsStats.map((p) => (
              <button 
                key={p.id} 
                onClick={() => setSelectedPlayer(p.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[80px] ${
                  selectedPlayer === p.id 
                    ? 'bg-blue-100 ring-2 ring-blue-500' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  selectedPlayer === p.id ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {p.seed}
                </div>
                <span className="text-xs font-medium text-gray-700 truncate w-full text-center">
                  {p.nick}
                </span>
              </button>
            ))}
          </div>

          {/* Contenido del Dashboard */}
          <div className="p-5 sm:p-8">
            
            {/* Header del jugador seleccionado */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-full bg-blue-800 text-white flex items-center justify-center text-2xl font-extrabold shadow-md">
                {player.seed}
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-2xl sm:text-3xl font-bold text-gray-900">{player.nick}</h4>
                <div className="flex gap-3 mt-1 justify-center sm:justify-start text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-yellow-500" /> Seed #{player.seed}
                  </span>
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <KPICard icon={Trophy} label="Puntos Totales" value={player.totalPoints} accent="bg-blue-800" />
              <KPICard icon={Target} label="Fechas Jugadas" value={`${player.tournamentsPlayed}/8`} accent="bg-blue-600" />
              <KPICard icon={TrendingUp} label="Promedio/Fecha" value={player.avgPerTournament.toFixed(1)} accent="bg-green-600" />
              <KPICard icon={Award} label="Mejor Fecha" value={`${player.bestRound.points} pts`} accent="bg-yellow-600" />
            </div>

            {/* Grilla de Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Gráfico 1: Evolución Acumulada de Puntos */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h5 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-800" /> 
                  Evolución Acumulada de Puntos
                </h5>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={accumulatedData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e3a8a', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                      labelStyle={{ color: '#bfdbfe' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="puntos" 
                      stroke="#1e3a8a" 
                      strokeWidth={3}
                      dot={{ fill: '#1e3a8a', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Gráfico 2: Puntos por Fecha */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h5 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-800" /> 
                  Puntos por Fecha
                </h5>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={roundData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e3a8a', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                      cursor={{ fill: '#f1f5f9' }}
                    />
                    <Bar dataKey="puntos" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Gráfico 3: Distribución de Resultados */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm lg:col-span-2">
                <h5 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-800" /> 
                  Distribución de Resultados ({totalGames} partidas)
                </h5>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <ResponsiveContainer width="100%" height={220} className="sm:max-w-[300px]">
                    <PieChart>
                      <Pie 
                        data={resultsData} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80}
                        label={(entry) => `${entry.value}`}
                      >
                        {resultsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e3a8a', 
                          border: 'none', 
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Leyenda con porcentajes */}
                  <div className="flex flex-col gap-3 w-full sm:w-auto">
                    {resultsData.map((item, i) => {
                      const percentage = ((item.value / totalGames) * 100).toFixed(1);
                      return (
                        <div key={i} className="flex items-center justify-between gap-4 bg-gray-50 rounded-lg px-4 py-2 min-w-[200px]">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-gray-900">{item.value}</span>
                            <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceStatsSection;