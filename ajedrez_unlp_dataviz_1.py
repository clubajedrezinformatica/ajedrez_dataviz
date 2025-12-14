import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# 1. DATOS (La narrativa del Salto de Calidad)
data = {
    "metric": ["total_players", "teams", "elo_players"],
    "2024 (T1)": [33, 10, 4],
    "2025 (T4)": [52, 16, 17],
}

df = pd.DataFrame(data)

# Definir la métrica clave para el resalte (+325%)
key_metric = "elo_players"

# --- 2. CONFIGURACIÓN VISUAL Y COLORES ---
# Colores: Usamos colores institucionales (ej. azul UNLP) y un color de alerta.
color_2024 = "#5A6A80"  # Gris/Azul tenue (el 'antes')
color_2025 = "#003366"  # Azul oscuro (el 'después', la fuerza)
color_highlight = "#FF6347"  # Rojo/Naranja brillante (para el +325%)

# Definir el ancho de las barras y la posición
bar_anchor = 0.35
x = np.arange(len(df["metric"]))  # Posición de las etiquetas

# --- 3. CREACIÓN DEL GRÁFICO BASE ---
fig, ax = plt.subplots(figsize=(10, 6))

# Barras 2024
bar_2024 = ax.bar(
    x - bar_anchor / 2,
    df["2024 (T1)"],
    bar_anchor,
    label="2024 (Torneo 1)",
    color=color_2024,
)

# Barras 2025
# --- 3. CREACIÓN DEL GRÁFICO BASE (CORREGIDO) ---
fig, ax = plt.subplots(figsize=(10, 6))

# Barras 2024 (Se mantiene igual)
bar_2024 = ax.bar(
    x - bar_anchor / 2,
    df["2024 (T1)"],
    bar_anchor,
    label="2024 (Torneo 1)",
    color=color_2024,
)

# Definir la lista de colores base para 2025
colors_2025 = [color_2025] * len(df)

# Encontrar el índice (posición 0, 1, o 2) de la métrica clave
# df['metric'] == key_metric devuelve [False, False, True]
# idxmax() nos da el índice del primer True (que es 2, la posición de 'elo_players')
index_highlight = df[df["metric"] == key_metric].index[0]

# Aplicar el color de resalte en esa posición numérica
colors_2025[index_highlight] = color_highlight

# Barras 2025
bar_2025 = ax.bar(
    x + bar_anchor / 2,
    df["2025 (T4)"],
    bar_anchor,
    label="2025 (Torneo 4)",
    color=colors_2025,
)
# --- 4. DETALLES Y ANOTACIONES DE DATOS ---


# Función para añadir las etiquetas de valor sobre las barras
def autolabel(rects, df_col):
    for rect, valor in zip(rects, df_col):
        height = rect.get_height()
        ax.annotate(
            f"{valor}",
            xy=(rect.get_x() + rect.get_width() / 2, height),
            xytext=(0, 3),  # 3 puntos de offset vertical
            textcoords="offset points",
            ha="center",
            va="bottom",
            fontsize=10,
            weight="bold",
        )


autolabel(bar_2024, df["2024 (T1)"])
autolabel(bar_2025, df["2025 (T4)"])

# Título y Etiquetas
ax.set_title(
    "CRECIMIENTO EXPONENCIAL: AJEDREZ INTERFACULTADES UNLP",
    fontsize=14,
    weight="bold",
    pad=20,
)
ax.set_ylabel("Cantidad", fontsize=12)
ax.set_xticks(x)
ax.set_xticklabels(df["metric"], fontsize=12)

# --- 5. ANOTACIÓN DEL +325% (El Gancho) ---
# Calcular el crecimiento
crecimiento_fide = ((17 - 4) / 4) * 100
# Coordenadas: sobre la barra de ELO FIDE 2025
posicion_x_resalte = x[df["metric"] == key_metric][0] + bar_anchor / 2
altura_resalte = df[df["metric"] == key_metric]["2025 (T4)"].values[0]

ax.annotate(
    f"+{crecimiento_fide:.0f}%",
    xy=(posicion_x_resalte, altura_resalte),
    xytext=(posicion_x_resalte + 0.5, altura_resalte - 10),  # Posicionamiento
    textcoords="data",
    fontsize=18,
    color=color_highlight,
    weight="heavy",
    arrowprops=dict(arrowstyle="->", color=color_highlight, lw=1.5),
)


# Mostrar Leyenda y Ajustes Finales
ax.legend()
plt.grid(axis="y", linestyle="--", alpha=0.7)
plt.tight_layout()

# Guardar y Mostrar el gráfico
plt.savefig("grafico_ajedrez_unlp_crecimiento.png", dpi=300)
plt.show()
