import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# 1. DATOS DEL RADAR POR COMPETENCIA (Base 100)
ejes_radar_base = [
    "% de victorias del equipo",
    "% de victorias individuales",
    "Posición Final",
]
n_ejes = len(ejes_radar_base)

colores = {
    "JUC 2025 (Oro)": "#FFD700",
    "Match UNAJ": "#1E90FF",
    "JUBU 2025 (Campeón Provincial)": "#228B22",
}

# Datos (sin cambios)
datos_juc = [100, 92.5, 100]
datos_unaj = [100, 80, 100]
datos_jubu = [95, 90, 100]

# Lista de datos y títulos para el loop
data_sets = [
    {
        "datos": datos_juc,
        "titulo": "JUC 2025 (Oro Nacional)",
        "color": colores["JUC 2025 (Oro)"],
    },
    {
        "datos": datos_unaj,
        "titulo": "Match UNAJ",
        "color": colores["Match UNAJ"],
    },  # Título corregido
    {
        "datos": datos_jubu,
        "titulo": "JUBU 2025 (Campeón Provincial)",
        "color": colores["JUBU 2025 (Campeón Provincial)"],
    },
]

angulos = np.linspace(0, 2 * np.pi, n_ejes, endpoint=False).tolist()
angulos += angulos[:1]


# ----------------------------------------------------
# --- 3. CREACIÓN DE SUBPLOTS EN PROYECCIÓN POLAR ---
# ----------------------------------------------------

# CRÍTICO: Aumentamos el tamaño de la figura para dar más espacio a las etiquetas
fig, axes = plt.subplots(1, 3, figsize=(20, 7), subplot_kw=dict(polar=True))
fig.suptitle(
    "DOMINIO UNIVERSITARIO UNLP 2025: ANÁLISIS POR COMPETENCIA",
    fontsize=18,
    weight="bold",
    y=1.05,
)


for i, ax in enumerate(axes.flat):
    ds = data_sets[i]

    valores = ds["datos"] + ds["datos"][:1]

    # Dibujar la línea de performance y rellenar el área
    ax.plot(angulos, valores, linewidth=2, linestyle="solid", color=ds["color"])
    ax.fill(angulos, valores, color=ds["color"], alpha=0.4)

    # 3. Configuración del Eje Radial y Etiquetas
    ax.set_xticks(angulos[:-1])

    # CRÍTICO: Configuración para asegurar visibilidad de las etiquetas
    ax.set_xticklabels(
        ejes_radar_base,
        fontsize=11,
        rotation=10,  # Rotación sutil
        ha="center",
        va="bottom",  # Alineación vertical para dar espacio
        y=1.2,
    )  # Mover las etiquetas un poco hacia afuera del centro (de 1.1 a 1.2)

    # Límites y Ticks (De 0% a 100%)
    ax.set_ylim(0, 100)
    ax.set_yticks([50, 100])
    ax.set_yticklabels(["50%", "100%"], color="gray", size=8)

    # Título específico para el subgráfico
    ax.set_title(ds["titulo"], size=13, weight="bold", pad=20, color=ds["color"])

    # Ajustes de limpieza
    ax.set_rlabel_position(22.5)
    ax.tick_params(pad=10)
    ax.tick_params(
        axis="x", which="major", pad=30
    )  # Aumentar el padding para alejar el texto del centro


plt.tight_layout(rect=[0, 0, 1, 0.95])
plt.savefig("grafico_ajedrez_unlp_3_radares_final.png", dpi=300)
plt.show()
