import chess
import chess.pgn
import chess.engine
import os

# Configuración del entorno
ENGINE_PATH = "/usr/games/stockfish"
PGN_FILE = "faustino_r11.pgn"

def analizar_partida():
    if not os.path.exists(PGN_FILE):
        print(f"❌ No encuentro el archivo {PGN_FILE}")
        return

    # Abrimos el PGN y el motor
    with open(PGN_FILE) as f:
        partida = chess.pgn.read_game(f)
    
    engine = chess.engine.SimpleEngine.popen_uci(ENGINE_PATH)
    
    board = partida.board()
    print(f"🧐 Analizando partida: {partida.headers.get('White')} vs {partida.headers.get('Black')}")
    print("Objetivo: Detectar punto de quiebre a profundidad 40...\n")

    evaluaciones = []
    quiebre_detectado = False

    for i, move in enumerate(partida.mainline_moves()):
        board.push(move)
        
        # Análisis profundo
        info = engine.analyse(board, chess.engine.Limit(depth=40))
        score = info["score"].relative.score(mate_score=10000) / 100.0
        
        # Guardamos para futuro gráfico
        evaluaciones.append(score)
        
        # Lógica de punto de quiebre (ej: ventaja mayor a 1.5 peones)
        # Adaptamos según si Faustino es blancas o negras
        es_turno_faustino = ("Oro" in partida.headers.get("White") and i % 2 == 0) or \
                            ("Oro" in partida.headers.get("Black") and i % 2 != 0)

        print(f"Jugada {i//2 + 1}: {move} | Eval: {score:+.2f}")

        if not quiebre_detectado and abs(score) > 1.5:
            print(f"\n🚀 ¡PUNTO DE QUIEBRE DETECTADO! Jugada {i//2 + 1}")
            print(f"La ventaja es de {score:+.2f} y Faustino empieza a dominar.")
            quiebre_detectado = True

    engine.quit()
    return evaluaciones

# Ejecutamos
evals = analizar_partida()