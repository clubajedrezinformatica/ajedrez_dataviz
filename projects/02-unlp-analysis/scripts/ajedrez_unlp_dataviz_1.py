import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# 1. DATOS (La narrativa del Salto de Calidad)
data = {
    "Métrica": [
        "Jugadores totales",
        "Equipos",
        "Jugadores rankeados",
    ],  # Nombres en español para las etiquetas del Eje X
    "2024 (1er Torneo Interfacultades)": [33, 10, 4],
    "2025 (4to Torneo Interfacultades)": [52, 16, 17],
}

df = pd.DataFrame(data)

# --- 2. CONFIGURACIÓN VISUAL Y COLORES ---
color_2024 = "#5A6A80"  # Gris/Azul tenue ('antes')
color_2025 = "#003366"  # Azul oscuro ('después', fuerza)
color_highlight = "#FF6347"  # Rojo/Naranja brillante (crecimiento/impacto)

# Calcular las tasas de crecimiento (Para la anotación)
tasas_crecimiento = [
    ((52 - 33) / 33) * 100,  # Jugadores
    ((16 - 10) / 10) * 100,  # Equipos
    ((17 - 4) / 4) * 100,  # Rankeados
]

# Definir el ancho de las barras y la posición
bar_width = 0.35
x = np.arange(len(df["Métrica"]))  # Posición de las etiquetas


# ----------------------------------------------------
# --- 3. CREACIÓN DEL GRÁFICO BASE (CORRECCIÓN CRÍTICA) ---
# ----------------------------------------------------

# CRÍTICO: Se llama a plt.subplots SÓLO UNA VEZ.
fig, ax = plt.subplots(figsize=(10, 6))

# Barras 2024 (Se usa 'bar_2024' para consistencia con el código anterior)
bar_2024 = ax.bar(
    x - bar_width / 2,
    df["2024 (1er Torneo Interfacultades)"],
    bar_width,
    label="2024 (1er Torneo Interfacultades)",
    color=color_2024,
)

# Barras 2025
bar_2025 = ax.bar(
    x + bar_width / 2,
    df["2025 (4to Torneo Interfacultades)"],
    bar_width,
    label="2025 (4to Torneo Interfacultades)",
    color=color_2025,
)


# --- 4. DETALLES Y ANOTACIONES DE DATOS ---
# Función para añadir las etiquetas de valor sobre las barras (autolabel)
def autolabel(rects, df_col):
    for rect, valor in zip(rects, df_col):
        height = rect.get_height()
        ax.annotate(
            f"{valor}",
            xy=(rect.get_x() + rect.get_width() / 2, height),
            xytext=(0, 3),  # Offset vertical de 3 puntos arriba de la barra
            textcoords="offset points",
            ha="center",
            va="bottom",
            fontsize=10,
            weight="bold",
        )


# Aplicar etiquetas de valor
autolabel(bar_2024, df["2024 (1er Torneo Interfacultades)"])
autolabel(bar_2025, df["2025 (4to Torneo Interfacultades)"])

# Título y Etiquetas (Ajuste final)
ax.set_title(
    "AJEDREZ INTERFACULTADES | UNLP 2024-2025",
    fontsize=14,
    weight="bold",
    pad=20,  # Reducimos el padding, ya no hay flechas que choquen
)
ax.set_ylabel("Cantidad", fontsize=12)
ax.set_xticks(x)
ax.set_xticklabels(["Jugadores Totales", "Equipos", "Jugadores Rankeados"], fontsize=12)


# ----------------------------------------------------
# --- 5. ANOTACIÓN DEL CRECIMIENTO (+XX%) DENTRO DE LA BARRA ---
# ----------------------------------------------------

# Recorremos cada una de las 3 barras de 2025
for i, tasa in enumerate(tasas_crecimiento):

    rect = bar_2025[i]  # CRÍTICO: Usamos la variable correcta 'bar_2025'
    x_pos = rect.get_x() + rect.get_width() / 2  # Centro de la barra en X
    altura_barra = rect.get_height()  # Altura total de la barra (ej: 52, 16, 17)

    # Posicionamos el texto: 10 puntos HACIA ABAJO (dentro de la barra)
    ax.annotate(
        f"+{tasa:.0f}%",
        xy=(x_pos, altura_barra),
        xytext=(0, -10),  # Desplazamiento DENTRO de la barra
        textcoords="offset points",
        ha="center",
        va="top",
        fontsize=14,
        color=color_highlight,
        weight="heavy",
    )

# Mostrar Leyenda y Ajustes Finales
ax.legend()
plt.grid(axis="y", linestyle="--", alpha=0.7)
plt.tight_layout()

plt.savefig("grafico_ajedrez_unlp_crecimiento.png", dpi=300)
# plt.show()
