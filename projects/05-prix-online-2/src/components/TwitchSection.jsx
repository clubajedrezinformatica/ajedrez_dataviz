import React from 'react';
import { Radio, ExternalLink, Video } from 'lucide-react';

const TwitchSection = () => {
  // ⚠️ CONFIGURACIÓN: Cambiá 'clubajedrezinfo' por el nombre real del canal de Twitch
  const TWITCH_CHANNEL = 'clubajedrezinformatica';

  // Detecta automáticamente el dominio actual (requerido por Twitch para el embed)
  const parentDomain = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const twitchEmbedUrl = `https://player.twitch.tv/?channel=${TWITCH_CHANNEL}&parent=${parentDomain}&muted=true&autoplay=false`;

  return (
    <section id="en-vivo" className="py-16 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-2 justify-center">
          <Radio className="w-8 h-8 text-purple-400" />
          <h3 className="text-2xl sm:text-3xl font-bold text-center">Transmisión en Vivo</h3>
        </div>
        <p className="text-center text-gray-400 mb-8 text-sm sm:text-base">
          Seguí la final del Prix Online UNLP en directo por el canal de Twitch del Club de Ajedrez de Informática
        </p>

        {/* Reproductor de Twitch embebido (16:9 responsivo) */}
        <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-700">
          <div className="w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={twitchEmbedUrl}
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
              title="Transmisión en vivo - Twitch"
            ></iframe>
          </div>
        </div>

        {/* Botón para abrir Twitch directamente */}
        <div className="mt-6 flex justify-center">
          <a
            href={`https://www.twitch.tv/${TWITCH_CHANNEL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            <Video className="w-5 h-5" />
            Abrir canal en Twitch
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Nota cuando está offline */}
        <div className="mt-6 max-w-xl mx-auto bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">
            ¿No ves la transmisión? El stream puede estar offline fuera de los horarios de la final.
            Seguínos en Twitch para recibir la notificación cuando estemos en vivo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TwitchSection;