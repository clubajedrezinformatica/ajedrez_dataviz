import chess
import chess.engine

# La ruta típica en Ubuntu es /usr/games/stockfish
engine_path = "/usr/games/stockfish"

def test_stockfish():
    try:
        # Abrimos el motor
        with chess.engine.SimpleEngine.popen_uci(engine_path) as engine:
            board = chess.Board()
            # Le pedimos que analice la posición inicial por 0.1 segundos
            info = engine.analyse(board, chess.engine.Limit(time=0.1))
            print(f"✅ Stockfish activo. Evaluación posición inicial: {info['score']}")
    except Exception as e:
        print(f"❌ Error al conectar con el motor: {e}")

test_stockfish()