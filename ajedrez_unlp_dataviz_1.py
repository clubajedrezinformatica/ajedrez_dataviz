import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# 1. DATOS (La narrativa del Salto de Calidad)
data = {
    "metric": ["Jugadores totales", "Equipos", "Jugadores rankeados"],
    "2024 (1er Torneo Interfacultades)": [33, 10, 4],
    "2025 (4to Torneo Interfacultades)": [52, 16, 17],
}

df = pd.DataFrame(data)

# Definir la métrica clave para el resalte (+325%)
key_metric = "Jugadores rankeados"

# --- 2. CONFIGURACIÓN VISUAL Y COLORES ---
# Colores: Usamos colores institucionales (ej. azul UNLP) y un color de alerta.
color_2024 = "#5A6A80"  # Gris/Azul tenue (el 'antes')
color_2025 = "#003366"  # Azul oscuro (el 'después', la fuerza)
color_highlight = "#FF6347"  # Rojo/Naranja brillante (para el crecimiento)

# Calcular las tasas de crecimiento (Para la anotación)
crecimiento_jugadores = ((52 - 33) / 33) * 100
crecimiento_equipos = ((16 - 10) / 10) * 100
crecimiento_fide = ((17 - 4) / 4) * 100

tasas_crecimiento = [crecimiento_jugadores, crecimiento_equipos, crecimiento_fide]

# Definir el ancho de las barras y la posición
bar_anchor = 0.35
x = np.arange(len(df["metric"]))  # Posición de las etiquetas

# --- 3. CREACIÓN DEL GRÁFICO BASE ---
fig, ax = plt.subplots(figsize=(10, 6))

# Barras 2024
bar_2024 = ax.bar(
    x - bar_anchor / 2,
    df["2024 (1er Torneo Interfacultades)"],
    bar_anchor,
    label="2024 (1er Torneo Interfacultades)",
    color=color_2024,
)


# --- 3. CREACIÓN DEL GRÁFICO BASE (CORREGIDO) ---
fig, ax = plt.subplots(figsize=(10, 6))

# Barras 2024 (Se mantiene igual)
barra_2024 = ax.bar(
    x - bar_anchor / 2,
    df["2024 (1er Torneo Interfacultades)"],
    bar_anchor,
    label="2024 (1er Torneo Interfacultades)",
    color=color_2024,
)

# Barras 2025 (USAMOS SOLO EL COLOR PRINCIPAL - NO HAY RESALTE EN LAS BARRAS)
barra_2025 = ax.bar(
    x + bar_anchor / 2,
    df["2025 (4to Torneo Interfacultades)"],
    bar_anchor,
    label="2025 (4to Torneo Interfacultades)",
    color=color_2025,
)


# --- 4. DETALLES Y ANOTACIONES DE DATOS --
# --- 4. DETALLES Y ANOTACIONES DE DATOS ---


# Función para añadir las etiquetas de valor sobre las barras
def autolabel(rects, df_col):
    for rect, valor in zip(rects, df_col):
        height = rect.get_height()
        ax.annotate(
            f"{valor}",
            xy=(rect.get_x() + rect.get_width() / 2, height),
            xytext=(0, 3),
            textcoords="offset points",
            ha="center",
            va="bottom",
            fontsize=10,
            weight="bold",
        )


autolabel(barra_2024, df["2024 (1er Torneo Interfacultades)"])
autolabel(barra_2025, df["2025 (4to Torneo Interfacultades)"])

# Título y Etiquetas (Se mantienen igual)
ax.set_title(
    "AJEDREZ INTERFACULTADES | UNLP 2024-2025",
    fontsize=14,
    weight="bold",
    pad=20,
)
ax.set_ylabel("Cantidad", fontsize=12)
ax.set_xticks(x)
# Corrección de Etiquetas: Asegúrate de que las etiquetas del eje X sean legibles para el público.
ax.set_xticklabels(["Jugadores Totales", "Equipos", "Jugadores Rankeados"], fontsize=12)


# --- 5. ANOTACIÓN DEL CRECIMIENTO (+XX%) ---
# Creamos un loop para anotar el crecimiento sobre TODAS las barras de 2025

for i, tasa in enumerate(tasas_crecimiento):
    # Obtener la posición x y la altura de la barra 2025 (índice i)
    rect = barra_2025[i]
    posicion_x = rect.get_x() + rect.get_width() / 2
    altura = rect.get_height()

    ax.annotate(
        f"+{tasa:.0f}%",
        xy=(posicion_x, altura),
        xytext=(0, 5),  # Mover ligeramente hacia arriba
        textcoords="offset points",
        ha="center",
        va="bottom",
        fontsize=14,
        color=color_highlight,
        weight="heavy",
    )


# Mostrar Leyenda y Ajustes Finales
ax.legend()
plt.grid(axis="y", linestyle="--", alpha=0.7)
plt.tight_layout()

plt.savefig("grafico_ajedrez_unlp_crecimiento.png", dpi=300)
# Puedes comentar o eliminar plt.show() para evitar el UserWarning
# plt.show()
