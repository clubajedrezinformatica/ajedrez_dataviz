import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# 1. DATOS DEL RADAR SUPERPUESTO (Sin cambios)
ejes_radar = ["Posición final", "Resultado individual", "Diferencia sobre 2° puesto"]
n_ejes = len(ejes_radar)

color_juc = "#FFD700"
color_jubu = "#228B22"

datos_juc = [100, 92.5, 95]
datos_jubu = [100, 82, 78]

datos_juc_cerrado = datos_juc + datos_juc[:1]
datos_jubu_cerrado = datos_jubu + datos_jubu[:1]

angulos = np.linspace(0, 2 * np.pi, n_ejes, endpoint=False).tolist()
angulos += angulos[:1]

# ----------------------------------------------------
# --- 2. CREACIÓN DEL GRÁFICO (Un solo Radar) ---
# ----------------------------------------------------

# Usamos 'facecolor' para establecer un fondo azul tenue)
color_fondo_tenue = "#A0C9EC"
# Definimos el color del fondo del eje (círculo)
color_eje_tenue = "#CDF9F9"  # Un cian muy claro)

fig, ax = plt.subplots(
    figsize=(9, 9), subplot_kw=dict(polar=True), facecolor=color_fondo_tenue
)

ax.set_facecolor(color_eje_tenue)
ax.set_title(
    "LOGROS AJEDREZ UNLP | JUC's y JUBU's 2025",
    fontsize=16,
    weight="bold",
    pad=20,
)

# Dibujar las performances (sin cambios)
ax.plot(
    angulos,
    datos_jubu_cerrado,
    linewidth=2,
    linestyle="solid",
    label="JUBU 2025 (Campeón Provincial)",
    color=color_jubu,
)
ax.fill(angulos, datos_jubu_cerrado, color=color_jubu, alpha=0.4)

ax.plot(
    angulos,
    datos_juc_cerrado,
    linewidth=2,
    linestyle="solid",
    label="JUC 2025 (Oro Nacional)",
    color=color_juc,
)
ax.fill(angulos, datos_juc_cerrado, color=color_juc, alpha=0.6)


# ----------------------------------------------------
# --- 3. CONFIGURACIÓN DEL EJE RADIAL (Etiquetas FORZADAS MANUALMENTE) ---
# ----------------------------------------------------

# Paso 1: Establecer los límites y ticks de la Y (Radio)
ax.set_ylim(0, 100)
ax.set_yticks([25, 50, 75, 100])
ax.set_yticklabels(["25%", "50%", "75%", "100%"], color="gray", size=10)

# Paso 2: Ocultar los ticks y etiquetas automáticas del eje X
ax.set_xticks(angulos[:-1])
ax.set_xticklabels([])  # Dejamos la lista vacía para que no dibuje nada automático
ax.tick_params(axis="x", pad=0)  # Resetear padding

# Paso 3: DIBUJAR MANUALMENTE las etiquetas en la posición externa (usando ax.text)
# Usaremos una distancia radial (r) de 105 para que queden fuera del círculo de 100
r_pos = 105
for angle, label in zip(angulos[:-1], ejes_radar):

    current_angle = angle

    # La rotación se ajusta ligeramente para que el texto siga el ángulo radial
    if angle == 0:
        # Desplazamos el ángulo ligeramente hacia arriba (+0.05 radianes)
        current_angle = angle + 0.09
        rotation = 0  # La rotación sigue siendo horizontal
    elif angle < np.pi:
        rotation = angle * (180 / np.pi) - 90  # Ajustar rotación para la parte superior
    else:
        rotation = (
            angle * (180 / np.pi) - 270
        )  # Ajustar rotación para la parte inferior

    # Dibujamos el texto
    ax.text(
        current_angle,  # Ángulo (coordenada angular)
        r_pos,  # Distancia radial (fuerza la posición fuera del eje)
        label,  # El texto de la etiqueta
        fontsize=12,
        ha="center",
        va="center",
        rotation=rotation,  # Aplicamos la rotación calculada
        bbox=dict(
            boxstyle="round,pad=0.3", fc="white", alpha=0.7, ec="none"
        ),  # Fondo blanco para visibilidad
    )

# Ajustes finales (sin cambios)
ax.set_rlabel_position(0)
plt.tight_layout()
# 1. Obtenemos los 'handles' (líneas/colores) y 'labels' (texto)
handles, labels = ax.get_legend_handles_labels()

# 2. Invertimos el orden (JUC aparecerá antes que JUBU)
handles_invertidos = handles[::-1]
labels_invertidos = labels[::-1]

# 3. Creamos la leyenda con los elementos invertidos y ajustamos la posición
# Reducimos 0.8 a 0.55 o 0.6 para mover la leyenda al centro superior.
ax.legend(
    handles_invertidos,
    labels_invertidos,
    loc="lower left",
    bbox_to_anchor=(0.74, 0.95),  # Ajustado de 0.8 a 0.6
    fontsize=10,
)
plt.savefig("grafico_ajedrez_unlp_radar_superpuesto.png", dpi=300)
# plt.show()
