import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Calendar as CalendarIcon,
  Crown,
  Info,
  Mail,
  Lock,
  CircleCheck,
  Swords,
  Camera,
  MessageSquare, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

import logoDeportes from './assets/logo_deportes.jpg';
import logoAjedrez from './assets/logo_ajedrezunlp.jpeg';
import logoAjedrezInfo from './assets/logo_cadi.jpeg';
import logoUNLP from './assets/logo_unlp.png';
import logoInformatica from './assets/logo_fi.jpg';
import fondoAjedrez from './assets/ajedrez-fondo-2.jpg'

// --- MOCK DATA ---
const initialPlayers = [
  { id: 1, nick: 'MiyuKoto', points: 29, tournaments: 1 },
  { id: 2, nick: 'Ezetive3890', points: 24, tournaments: 1 },
  { id: 3, nick: 'grauclub', points: 22, tournaments: 1 },
  { id: 4, nick: 'Tomimartinez95', points: 21, tournaments: 1 },
  { id: 5, nick: 'naty_la_25', points: 20, tournaments: 1 },
  { id: 6, nick: 'Belsebusky', points: 20, tournaments: 1 },
  { id: 7, nick: 'agustinbunes', points: 19, tournaments: 1 },
  { id: 8, nick: 'lukita121212', points: 18, tournaments: 1 },
  { id: 9, nick: 'LORDSLYTHERIN', points: 17, tournaments: 1 },
  { id: 10, nick: 'Ajedrezfacu', points: 14, tournaments: 1 },
  { id: 11, nick: 'alex2018inf', points: 14, tournaments: 1 },
  { id: 12, nick: 'nicootinaa', points: 13, tournaments: 1 },
  { id: 13, nick: 'FernandoPoratto', points: 12, tournaments: 1 },
  { id: 14, nick: 'Valeny', points: 11, tournaments: 1 },
  { id: 15, nick: 'VivaCFK', points: 10, tournaments: 1 },
  { id: 16, nick: 'ikeandas', points: 4, tournaments: 1 },
  { id: 17, nick: 'Volvedor', points: 4, tournaments: 1 },
  { id: 18, nick: 'C5h6n2o2', points: 2, tournaments: 1 },
  { id: 19, nick: 'manucho18', points: 2, tournaments: 1 },
  { id: 20, nick: 'poder-ozo', points: 2, tournaments: 1 },
  { id: 21, nick: 'MTJRFAN2', points: 2, tournaments: 1 },
  { id: 22, nick: 'evaristom', points: 0, tournaments: 1 },
  { id: 23, nick: 'FuerzasArmadas', points: 0, tournaments: 1 },
  { id: 24, nick: 'Lucio1993', points: 0, tournaments: 1 },
  { id: 25, nick: 'chimillanes', points: 0, tournaments: 1 },
];

const tournamentDates = [
  { date: 1, day: '09 de Agosto', status: 'past', link: 'https://lichess.org/tournament/mhvD5tb9' },
  { date: 2, day: '17 de Agosto', status: 'upcoming', dayOfWeek: 'Lunes', time: '20:30', link: 'https://lichess.org/tournament/MxBsPRVH' },
  { date: 3, day: '23 de Agosto', status: 'upcoming', link: 'https://lichess.org/tournament/IfsCbYsv' },
  { date: 4, day: '30 de Agosto', status: 'upcoming', link: 'https://lichess.org/tournament/C4Jue0rf' },
  { date: 5, day: '06 de Septiembre', status: 'upcoming', link: 'https://lichess.org/tournament/83kg4qfx' },
  { date: 6, day: '13 de Septiembre', status: 'upcoming', link: 'https://lichess.org/tournament/M06fBQuL' },
  { date: 7, day: '19 de Septiembre', status: 'upcoming', dayOfWeek: 'Sábado', time: '20:30', link: 'https://lichess.org/tournament/qaIVXjoY' },
  { date: 8, day: '27 de Septiembre', status: 'upcoming', link: 'https://lichess.org/tournament/EPN0fCN8' },
];

// --- COMPONENTES ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logos = [
    { src: logoDeportes, alt: 'Deportes UNLP' },
    { src: logoInformatica, alt: 'Facultad de Informática' },
    { src: logoUNLP, alt: 'UNLP' },
    { src: logoAjedrezInfo, alt: 'Ajedrez Info' },
    { src: logoAjedrez, alt: 'Ajedrez UNLP' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-6">
            {logos.map((logo, i) => (
              <img 
                key={i} 
                src={logo.src} 
                alt={logo.alt} 
                className="h-10 sm:h-14 w-auto object-contain" 
              />
            ))}
          </div>
        </div>
        
        {/* Contenedor del título con transición */}
        <div 
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            isScrolled 
              ? 'max-h-0 opacity-0 mt-0 pt-0 border-transparent' 
              : 'max-h-20 opacity-100 mt-4 pt-4 border-t border-gray-100'
          }`}
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-tight">
            Prix Online UNLP <span className="text-blue-600">2026</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

const HeroSection = ({ dates }) => {
  // Busca el próximo torneo activo
  const nextTournament = dates?.find(t => t.status === 'upcoming');

  return (
    <section 
      className="relative text-white bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.85), rgba(15, 23, 42, 0.95)), url(${fondoAjedrez})` 
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 shadow-sm">
          Prix Online UNLP 2026
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 font-medium mb-8 drop-shadow-md">
          8 Fechas | Formato Arena 3+2 | Domingos de Agosto y Septiembre
        </p>
        
        <div className="max-w-2xl mx-auto bg-blue-900/60 backdrop-blur-sm border border-blue-700/50 rounded-lg p-6 flex items-center justify-center gap-4 shadow-xl mb-10">
          <Crown className="w-8 h-8 text-yellow-400 flex-shrink-0 drop-shadow" />
          <p className="text-base sm:text-lg text-gray-100">
            Los <span className="font-bold text-white">8 mejores jugadores</span> de la tabla general clasifican a la gran final presencial/online por matches.
          </p>
        </div>

        {/* Tarjeta Destacada del Próximo Torneo */}
        {nextTournament && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-blue-400 transform transition-transform hover:scale-105">
            <div className="bg-blue-600 px-4 py-2 flex items-center justify-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-white font-bold text-sm uppercase tracking-wider">Próxima Fecha</span>
            </div>
            <div className="p-6 text-gray-900 text-center">
              <h3 className="text-2xl font-black mb-1">Fecha {nextTournament.date}</h3>
              <p className="text-lg font-medium text-gray-600 mb-6">
                {nextTournament.dayOfWeek || 'Domingo'} {nextTournament.day} - {nextTournament.time || '20:15'}hs
              </p>
              <a 
                href={nextTournament.link || '#'} 
                target={nextTournament.link ? "_blank" : "_self"}
                rel={nextTournament.link ? "noopener noreferrer" : ""}
                className="w-full flex justify-center items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                <Swords className="w-5 h-5" />
                Unirse a la Arena
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const StandingsTable = ({ players }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(players.length / playersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section id="tabla" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-8 h-8 text-blue-800" />
          <h3 className="text-2xl sm:text-3xl font-bold text-blue-900">Tabla Acumulada</h3>
        </div>
        
        <div className="shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Jugador</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Puntos</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell">Fechas</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentPlayers.map((player, index) => {
                  const realIndex = indexOfFirstPlayer + index;
                  const isQualified = realIndex < 8;
                  return (
                    <tr key={player.id} className={`${isQualified ? 'bg-green-150' : 'bg-white'} hover:bg-gray-50 transition-colors`}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {realIndex + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {player.nick}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {player.points}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 hidden sm:table-cell">
                        {player.tournaments}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                        {isQualified ? (
                          <span className="px-2 inline-flex items-center gap-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            <CircleCheck className="w-3 h-3" /> Zona de Clasificación
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-gray-100 text-gray-500">
                            Eliminado
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Controles de Paginación */}
          <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{indexOfFirstPlayer + 1}</span> a <span className="font-medium">{Math.min(indexOfLastPlayer, players.length)}</span> de <span className="font-medium">{players.length}</span> jugadores
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Anterior</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === number
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Siguiente</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GameOfTheWeek = () => (
  <section className="py-16 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <Swords className="w-8 h-8 text-blue-800" />
        <h3 className="text-2xl sm:text-3xl font-bold text-blue-900 text-center">Partida Destacada de la Fecha</h3>
      </div>
      
      <div className="bg-gray-100 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
        
        {/* Iframe interactivo de Lichess */}
        <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-md bg-white">
          <iframe 
            src="https://lichess.org/embed/bxBff24J?theme=auto&bg=auto"
            width="100%" 
            height="600" 
            frameBorder="0"
            title="Partida destacada Lichess"
          ></iframe>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-gray-800">agustinbunes vs. MiyuKoto</p>
          <p className="text-gray-500 text-sm">Defensa Caro-Kann - Variante del avance</p>
        </div>
      </div>
    </div>
  </section>
);

const Calendar = ({ dates }) => (
  <section id="fechas" className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8">
        <CalendarIcon className="w-8 h-8 text-blue-800" />
        <h3 className="text-2xl sm:text-3xl font-bold text-blue-900">Calendario y Enlaces</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dates.map((d) => {
          const isPast = d.status === 'past';
          return (
            <div
              key={d.date}
              className={`rounded-xl shadow-sm border-t-4 p-6 flex flex-col justify-between transition-transform hover:scale-105 ${
                isPast ? 'bg-gray-200 border-gray-400 opacity-75' : 'bg-white border-blue-800'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold uppercase ${isPast ? 'text-gray-500' : 'text-blue-600'}`}>
                    Fecha {d.date}
                  </span>
                  {isPast && <Lock className="w-4 h-4 text-gray-400" />}
                </div>
                <h4 className={`text-lg font-bold ${isPast ? 'text-gray-600' : 'text-gray-800'}`}>
                  {d.day}
                </h4>
                <p className="text-sm text-gray-400 mt-1">{d.time || '20:15'}hs (Arena 80')</p>
              </div>
             
              <a
                href={d.link || '#'}
                target={d.link ? "_blank" : "_self"}
                rel={d.link ? "noopener noreferrer" : ""}
                className={`mt-6 block w-full text-center py-2 rounded-md text-sm font-semibold transition-colors ${
                  isPast
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                    : 'bg-blue-800 text-white hover:bg-blue-900'
                }`}
              >
                {isPast ? 'Torneo Finalizado' : 'Unirse al Torneo'}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-blue-950 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="flex space-x-6">
          <a 
            href="https://instagram.com/ajedrezinformaticaunlp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Camera className="w-6 h-6" />
          </a>
          
          <a 
            href="https://x.com/mago_de_riga" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <MessageSquare className="w-6 h-6" />
          </a>
          
          <a 
            href="mailto:ajedrez@info.unlp.edu.ar" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400">
          <Info className="w-4 h-4" />
          <p className="text-sm">Contacto: clubajedrezinformatica@gmail.com</p>
        </div>

        <div className="pt-8 border-t border-blue-900 w-full">
          <p className="text-xs text-gray-500">
            © 2026 Prix Online UNLP. Organizado por el Club de Ajedrez de la Facultad de Informática (UNLP).
          </p>
        </div>
      </div>
    </div>
  </footer>
);

// --- APP MAIN ---

export default function App() {
  const [players] = useState(initialPlayers);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
      <Header />
      <main>
        <HeroSection dates={tournamentDates} />
        <StandingsTable players={players} />
        <GameOfTheWeek />
        <Calendar dates={tournamentDates} />
      </main>
      <Footer />
    </div>
  );
}