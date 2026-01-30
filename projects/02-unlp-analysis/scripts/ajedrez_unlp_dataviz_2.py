import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# 1. DATOS DEL RADAR (Convertidos a Porcentajes / Base 100)
categorias = [
    "Tasa de Matches Ganados (JUC)",
    "Eficiencia Individual (JUC)",
    "Amplitud Estructural (JUBU)",
    "Consistencia en Desafíos (UNAJ)",
    "Índice de Consolidación",
]

# Valores de Performance del Equipo UNLP (Basados en la tabla superior)
# Las 5 variables deben cerrar el ciclo (de A a B, B a C... y C de vuelta a A).
valores_unlp = [100, 92.5, 100, 80, 75]

# Para cerrar el círculo en el gráfico de radar, se repite el primer valor al final
valores_unlp = valores_unlp + valores_unlp[:1]
categorias = categorias + categorias[:1]

# Número de variables (ejes)
n_variables = len(categorias)
# Ángulos para cada eje (radianes)
angulos = np.linspace(0, 2 * np.pi, n_variables, endpoint=False)


# --- 2. CREACIÓN DEL GRÁFICO ---
fig, ax = plt.subplots(figsize=(8, 8), subplot_kw=dict(polar=True))
# Configuración del Título
ax.set_title("DOMINIO COMPETITIVO AJEDREZ UNLP 2025", fontsize=14, weight="bold", y=1.1)

# Dibujar la línea de performance del equipo UNLP
ax.plot(
    angulos,
    valores_unlp,
    linewidth=2,
    linestyle="solid",
    label="Performance UNLP",
    color="#003366",
)
# Rellenar el área bajo la línea (el 'polígono' de dominio)
ax.fill(angulos, valores_unlp, color="#003366", alpha=0.25)


# --- 3. CONFIGURACIÓN DEL EJE RADIAL (Etiquetas y Límites) ---
# Establecer las etiquetas en los ejes
ax.set_xticks(angulos[:-1])
ax.set_xticklabels(categorias[:-1], fontsize=11)

# Establecer los límites del eje y (de 0% a 100%)
ax.set_ylim(0, 100)
ax.set_yticks([25, 50, 75, 100])
ax.set_yticklabels(["25%", "50%", "75%", "100%"], color="gray", size=10)

# Añadir el punto '0' en el centro del gráfico
ax.set_rlabel_position(0)
ax.tick_params(pad=15)  # Ajustar el padding de las etiquetas

# Mostrar la leyenda y guardar
ax.legend(loc="upper right", bbox_to_anchor=(0.1, 0.1))
plt.tight_layout()
plt.savefig("grafico_ajedrez_unlp_radar.png", dpi=300)
# plt.show()
