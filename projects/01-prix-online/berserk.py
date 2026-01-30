import matplotlib.pyplot as plt
import pandas as pd

# Datos auditados manualmente
data = {
    "Fecha": ["Fecha 1", "Fecha 2", "Fecha 3", "Fecha 4"],
    "Luchini (Berserk %)": ["100% (8)", "94% (18)", "50% (14)", "50% (12)"],
    "Tomi (Berserk %)": ["0% (3)", "47% (17)", "56% (16)", "58% (19)"],
}

df = pd.DataFrame(data)

# Configuración estética basada en tu portada
fig, ax = plt.subplots(figsize=(8, 4))
ax.axis("off")
ax.axis("tight")

# Colores extraídos de tu diseño
header_color = "#4a3728"  # Marrón de tu tipografía
row_colors = ["#f0f4f8", "#ffffff"]  # Alternancia sutil de azul/blanco

table = ax.table(
    cellText=df.values, colLabels=df.columns, cellLoc="center", loc="center"
)

# Estilo de la tabla
table.auto_set_font_size(False)
table.set_fontsize(12)
table.scale(1.2, 2)

# Aplicar colores a las celdas
for (row, col), cell in table.get_celld().items():
    if row == 0:
        cell.set_text_props(color="white", fontweight="bold")
        cell.set_facecolor(header_color)
    else:
        cell.set_facecolor(row_colors[row % len(row_colors)])
        cell.set_edgecolor("#d1d1d1")

plt.savefig(
    "outputs/tabla_berserk_final.png", transparent=True, dpi=300, bbox_inches="tight"
)
print("Tabla generada con éxito para importar a Canva.")
