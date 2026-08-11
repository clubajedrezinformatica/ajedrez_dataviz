import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# 1. DATOS Y ESTRUCTURA (Timeline Refactorizada)
periodos = [
    "2023 (2do Semestre)",
    "2024 (1er Semestre)",
    "2024 (2do Semestre)",
    "2025 (1er Semestre)",
    "2025 (2do Semestre)",
]
n_periodos = len(periodos)

# Hitos para anotación (Texto clave)
hitos_estructura = [
    "Club Exactas",
    "Club Observatorio",
    "Club Humanidades",
    "Club Informática",
    "Club Psicología",
]
hitos_competitivos = [
    "Establecimiento de Base",
    "Fase de Consolidación",
    "1er y 2do Interfacultades",
    "3er Interfacultades, Armado del Equipo de Ajedrez UNLP",
    "Match vs. UNAJ (4-1), 1er Congreso de Ajedrez UNLP, 4to Interfacultades",  # <--- HITOS SIMPLIFICADOS
]

valores_barras = [1] * n_periodos
y_pos = np.arange(n_periodos)

# --- 2. CONFIGURACIÓN VISUAL Y COLORES ---
color_base = "#003366"
color_hito_competitivo = "#FF6347"
color_estructura = "#4682B4"
color_fondo_tenue = "#F0F8FF"  # Fondo del lienzo (Figura)

# ----------------------------------------------------
# --- 3. CREACIÓN DEL GRÁFICO (Barra de Tiempo) ---
# ----------------------------------------------------

fig, ax = plt.subplots(
    figsize=(12, 7), subplot_kw=dict(facecolor="white"), facecolor=color_fondo_tenue
)

ax.barh(y_pos, valores_barras, color=color_base, height=0.6, alpha=0.3)
# ax.axvline(0.5, color=color_base, linestyle="--", linewidth=0.8)


# --- 4. CONFIGURACIÓN DE EJES (Sin cambios) ---
ax.set_yticks(y_pos)
ax.set_yticklabels(periodos, fontsize=11, weight="bold")
ax.tick_params(axis="y", length=0)
ax.set_xticks([])
ax.spines["right"].set_visible(False)
ax.spines["left"].set_visible(False)
ax.spines["top"].set_visible(False)
ax.spines["bottom"].set_visible(False)


# --- 5. ANOTACIONES DE HITOS (Con Correcciones) ---

for i, pos in enumerate(y_pos):
    # A. Hitos Estructurales (Izquierda)
    ax.annotate(
        hitos_estructura[i],
        xy=(0.0, pos),
        xytext=(5, 0),
        textcoords="offset points",
        ha="left",
        va="center",
        fontsize=10,
        weight="bold",
        color=color_estructura,
    )

    # B. Hitos Competitivos (Derecha)
    ax.annotate(
        hitos_competitivos[i],
        xy=(1.0, pos),
        xytext=(-5, 0),
        textcoords="offset points",
        ha="right",
        va="center",
        fontsize=10,
        weight="heavy",
        color=color_hito_competitivo,
        bbox=dict(boxstyle="round,pad=0.2", fc="white", alpha=0.8, ec="none"),
    )

# Título (Centrado en el área del plot)
ax.set_title(
    "CONSOLIDACIÓN ESTRUCTURAL: AJEDREZ UNLP (2023-2025)",
    fontsize=16,
    weight="bold",
    pad=20,
    loc="left",
)

ax.invert_yaxis()

plt.tight_layout(rect=[0.05, 0, 1, 1])

plt.savefig("grafico_ajedrez_unlp_timeline.png", dpi=300)
# plt.show()
