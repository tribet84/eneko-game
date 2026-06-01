#!/usr/bin/env python3
"""Genera los iconos PWA (public/icon-180.png y icon-512.png).

OPERACION GEMA: un vaso de cafe humeante (el arma del plan) sobre un
campo granate dithered, el color de la sudadera de Eneko. Reedita la
forma y re-ejecuta:  python scripts/makeicon.py
"""
import math, os
from PIL import Image, ImageDraw

N = 64  # render pequeño para pixeles nitidos, luego upscale con NEAREST
img = Image.new("RGB", (N, N), (60, 24, 28))
d = ImageDraw.Draw(img)

# fondo granate radial con dither 2x2
cx = cy = N / 2
for y in range(N):
    for x in range(N):
        r = math.hypot(x - cx, y - cy) / (N / 2)
        t = max(0.0, min(1.0, r))
        col = (int(120 - 70 * t), int(40 - 22 * t), int(46 - 26 * t))
        if ((x ^ y) & 1) and r < 0.92:
            col = (col[0] + 10, col[1] + 6, col[2] + 8)
        img.putpixel((x, y), col)

# vaso de cafe (trapecio) centrado
top, bot = 22, 50
half_top, half_bot = 15, 11
d.polygon(
    [(cx - half_top, top), (cx + half_top, top),
     (cx + half_bot, bot), (cx - half_bot, bot)],
    fill=(236, 230, 220), outline=(30, 22, 20),
)
# cafe en la superficie
d.rectangle([cx - half_top + 3, top + 2, cx + half_top - 3, top + 7], fill=(70, 42, 26))
# brillo
d.rectangle([cx - half_top + 4, top + 9, cx - half_top + 6, bot - 4], fill=(252, 248, 240))

# vapor
for i, vx in enumerate((cx - 6, cx, cx + 6)):
    for k in range(3):
        yy = top - 4 - k * 4
        d.rectangle([vx - 1, yy, vx, yy + 2], fill=(232, 224, 214))
        vx += 2 if (k + i) % 2 else -2

out = os.path.join(os.path.dirname(__file__), "..", "public")
for size in (180, 512):
    img.resize((size, size), Image.NEAREST).save(os.path.join(out, f"icon-{size}.png"))
print("wrote public/icon-180.png and public/icon-512.png")
