import requests
import os

# CONFIGURACIÓN
TOURNAMENT_ID = "JL4yzCGi"
PLAYERS = ["mago_pol", "LuchiniFrank", "Ajedrezfacu"]
DATA_DIR = "data"

def fetch_tournament_games():
    # Creamos la carpeta data si no existe
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        print(f"Directorio '{DATA_DIR}' creado.")

    for player_id in PLAYERS:
        print(f"Descargando partidas de {player_id}...")
        url = f"https://lichess.org/api/tournament/{TOURNAMENT_ID}/games?player={player_id}"
        headers = {"Accept": "application/x-chess-pgn"}
        
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status() # Lanza error si la descarga falla
            
            file_path = os.path.join(DATA_DIR, f"{player_id}.pgn")
            with open(file_path, "w") as f:
                f.write(response.text)
            
            print(f"✅ Guardado: {file_path}")
        except Exception as e:
            print(f"❌ Error con {player_id}: {e}")

if __name__ == "__main__":
    fetch_tournament_games()