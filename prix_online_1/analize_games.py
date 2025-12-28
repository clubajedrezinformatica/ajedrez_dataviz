import chess
import chess.engine
import chess.pgn
import os

# CONFIGURACIÓN
PATH_TO_STOCKFISH = "/usr/games/stockfish"
DATA_DIR = "data"
PLAYERS = ["mago_pol", "LuchiniFrank", "Ajedrezfacu"]
DEPTH_LIMIT = 15  # Eficiencia técnica para Blitz

RIVALES_FUERTES = [
    "mago_pol",
    "LuchiniFrank",
    "Ajedrezfacu",
    "Polyamor",
    "M3TR3STRO",
    "MTJRFAN2",
    "ikeandas",
    "naty_la_25",
    "Tuviejateama",
    "MiyuKoto",
    "seacabolamentira2",
    "grauclub",
    "Mecamdane",
]


def analyze_player(player_name):
    pgn_path = os.path.join(DATA_DIR, f"{player_name}.pgn")
    if not os.path.exists(pgn_path):
        return None

    engine = chess.engine.SimpleEngine.popen_uci(PATH_TO_STOCKFISH)
    stats = {
        "games": 0,
        "blunders": 0,
        "brilliants": 0,
        "top_move_fen": "N/A",
        "top_move_san": "N/A",
        "best_impact": -9999,
        "top_piece_val": 0,
        "brilliant_details": [],  # Para rastrear rival y jugada
    }

    with open(pgn_path) as pgn:
        while True:
            game = chess.pgn.read_game(pgn)
            if game is None:
                break

            stats["games"] += 1
            print(
                f" -> Procesando partida {stats['games']} de {player_name}...",
                flush=True,
            )

            board = game.board()
            white, black = game.headers.get("White"), game.headers.get("Black")
            is_white = white == player_name
            opponent = black if is_white else white
            es_partida_relevante = opponent in RIVALES_FUERTES

            for move in game.mainline_moves():
                is_player_turn = (board.turn == chess.WHITE and is_white) or (
                    board.turn == chess.BLACK and not is_white
                )

                if is_player_turn:
                    # 1. EVALUACIÓN ANTES
                    info = engine.analyse(
                        board, chess.engine.Limit(depth=DEPTH_LIMIT), multipv=2
                    )
                    eval_before = info[0]["score"].relative.score(mate_score=10000)

                    # 1. EVALUACIÓN ANTES
                    # Usamos un try-except o validación de llaves para evitar el KeyError
                    info = engine.analyse(
                        board, chess.engine.Limit(depth=DEPTH_LIMIT), multipv=2
                    )

                    eval_before = 0
                    gap = 0

                    if len(info) > 0:
                        eval_before = info[0]["score"].relative.score(mate_score=10000)

                        # Solo calculamos el gap si hay al menos dos jugadas analizadas
                        if len(info) > 1:
                            eval_second = info[1]["score"].relative.score(
                                mate_score=10000
                            )
                            gap = eval_before - eval_second

                    fen_antes = board.fen()
                    move_san = board.san(move)

                    # ¿Es un sacrificio real? (Moverse a casilla atacada por algo de menor valor)
                    is_sac = not board.is_capture(move) and board.is_attacked_by(
                        not board.turn, move.to_square
                    )

                    board.push(move)

                    # 2. EVALUACIÓN DESPUÉS
                    info_after = engine.analyse(
                        board, chess.engine.Limit(depth=DEPTH_LIMIT)
                    )
                    eval_after = -info_after["score"].relative.score(mate_score=10000)
                    loss = eval_before - eval_after

                    # BLUNDERS (Rigurosos)
                    if (eval_before > 150 and eval_after < -100) or loss > 400:
                        stats["blunders"] += 1

                    # --- NUEVA LÓGICA DE SACRIFICIO ÉPICO ---
                    if es_partida_relevante and 10 <= board.fullmove_number <= 35:
                        # 1. Filtro de Tensión: La posición debe estar igualada o ser tensa
                        posicion_tensa = -150 < eval_before < 250

                        # 2. Filtro de Eficiencia: La jugada debe ser la mejor o casi la mejor
                        jugada_precisa = loss < 15 and gap > 50

                        if posicion_tensa and jugada_precisa and is_sac:
                            # 3. CÁLCULO DE IMPACTO VISUAL (Prioridad de piezas)
                            # Obtenemos el tipo de pieza que se movió a la casilla de sacrificio
                            # chess.QUEEN = 5, ROOK = 4, BISHOP = 3, KNIGHT = 2
                            pieza_tipo = board.piece_at(move.to_square).piece_type

                            # Puntuación de "Épica": Combinamos el valor de la pieza con el impacto en la evaluación
                            score_epico = (pieza_tipo * 100) + (
                                eval_after - eval_before
                            )

                            stats["brilliants"] += 1
                            stats["brilliant_details"].append(
                                f"{move_san} vs {opponent} (Mov {board.fullmove_number})"
                            )

                            # Solo actualizamos el TOP MOVE si esta jugada es más "épica" que la anterior
                            # Esto asegura que una Dama sacrificada siempre le gane a un Peón o Rey moviéndose
                            if score_epico > stats.get("current_epic_score", -9999):
                                stats["current_epic_score"] = score_epico
                                stats["best_impact"] = eval_after - eval_before
                                stats["top_move_fen"] = fen_antes
                                stats["top_move_san"] = move_san
                else:
                    board.push(move)

    engine.quit()
    return stats


if __name__ == "__main__":
    for p in PLAYERS:
        res = analyze_player(p)
        if res:
            print(f"\n{'='*55}\nREPORTE FINAL: {p.upper()}\n{'='*55}")
            print(f"Partidas: {res['games']} | Blunders Reales: {res['blunders']}")
            print(f"Brillantes Detectadas: {res['brilliants']}")
            if res["brilliant_details"]:
                print(f"Lista de Brillantes: {', '.join(res['brilliant_details'])}")

            print(f"\n⭐ LA JUGADA DEL TORNEO:")
            print(f"Movimiento: {res['top_move_san']}")
            print(f"FEN: {res['top_move_fen']}")
            print(f"{'='*55}\n")
