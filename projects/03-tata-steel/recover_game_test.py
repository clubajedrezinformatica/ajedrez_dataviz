import requests
import chess.pgn
import io

def descargar_ronda_faustino(round_id):
    # LA CLAVE: Agregamos "/round/" a la URL para que Lichess encuentre el ID correcto
    url = f"https://lichess.org/api/broadcast/round/{round_id}.pgn"
    
    headers = {'User-Agent': 'Python/ChessAnalysis-MauroKein'}
    
    print(f"--- Buscando a Faustino en la Ronda ID: {round_id} ---")
    
    try:
        # Intentamos la descarga (con verify=False por si las dudas con el SSL de antes)
        response = requests.get(url, headers=headers, timeout=15, verify=False)
        response.raise_for_status()
        
        pgn_data = io.StringIO(response.text)
        partidas_encontradas = []

        while True:
            game = chess.pgn.read_game(pgn_data)
            if game is None:
                break
            
            white = game.headers.get("White", "")
            black = game.headers.get("Black", "")
            
            if "Oro" in white or "Oro" in black:
                partidas_encontradas.append(game)
                print(f"✅ ¡Encontrada!: {white} vs {black}")

        return partidas_encontradas

    except Exception as e:
        print(f"❌ Error: {e}")
        return None

# --- EJECUCIÓN ---
ID_RONDA_11 = "k0z4rceo" 
partidas = descargar_ronda_faustino(ID_RONDA_11)

if partidas:
    with open("faustino_r11.pgn", "w") as f:
        for game in partidas:
            f.write(str(game) + "\n\n")
    print("\n🚀 Archivo 'faustino_r11.pgn' guardado con éxito.")
else:
    print("\nNo se pudo obtener la partida. Chequeá el ID o la conexión.")