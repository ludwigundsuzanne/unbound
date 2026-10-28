"""Génère la géométrie de l'identité UNBOUND (emblème, mot, concepts).

Source de vérité du logo : modifier les constantes ici, puis relancer.
Dépendances (hors projet) : pip install shapely fonttools
Usage : python3 scripts/brand/generate.py chemin/vers/Sora-SemiBold.ttf
Écrit src/brand/paths.ts et les SVG de public/brand/.
"""
import json
import math
import sys
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from shapely import affinity
from shapely.geometry import LineString, Point, Polygon, box
from shapely.ops import unary_union

ROOT = Path(__file__).resolve().parents[2]


def fmt(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


def to_path(geom):
    polys = [geom] if geom.geom_type == "Polygon" else list(geom.geoms)
    out = ""
    for p in polys:
        for ring in [p.exterior, *p.interiors]:
            pts = list(ring.coords)[:-1]
            out += "M" + "L".join(f"{fmt(x)} {fmt(y)}" for x, y in pts) + "Z"
    return out


def quarter_ring(cx, cy, r_out, r_in, a0, a1, steps=32):
    outer = [(cx + r_out * math.cos(a0 + (a1 - a0) * i / steps), cy + r_out * math.sin(a0 + (a1 - a0) * i / steps)) for i in range(steps + 1)]
    inner = [(cx + r_in * math.cos(a1 - (a1 - a0) * i / steps), cy + r_in * math.sin(a1 - (a1 - a0) * i / steps)) for i in range(steps + 1)]
    return Polygon(outer + inner)


def half_u(x0, top, cy, radius, width):
    """Fût vertical + quart de cercle : la moitié gauche d'un U."""
    return unary_union([box(x0, top, x0 + width, cy), quarter_ring(x0 + radius, cy, radius, radius - width, math.pi / 2, math.pi)])


def centered(geom):
    minx, miny, maxx, maxy = geom.bounds
    return affinity.translate(geom, 128 - (minx + maxx) / 2, 128 - (miny + maxy) / 2)


# --- Emblème : deux demi-formes décalées (le passage), chacune en deux bandes (courbes de niveau)
STROKE, RADIUS, TOP, CY = 46, 80, 40, 150
BAND_OUT, BAND_GAP = 22, 6
RAISE, SEPARATION = 30, 6


def emblem(detailed=True):
    if detailed:
        inner_w = STROKE - BAND_OUT - BAND_GAP
        left = unary_union([
            half_u(40, TOP, CY, RADIUS, BAND_OUT),
            half_u(40 + BAND_OUT + BAND_GAP, TOP, CY, RADIUS - BAND_OUT - BAND_GAP, inner_w),
        ])
    else:
        left = half_u(40, TOP, CY, RADIUS, STROKE)
    right = affinity.translate(affinity.scale(left, -1, 1, origin=(128, 0)), SEPARATION, -RAISE)
    left = affinity.translate(left, -SEPARATION, 0)
    return centered(unary_union([left, right]))


# --- Concepts écartés (pour la vitrine)
def u_line(cx, top, bottom, half, steps=48):
    pts = [(cx - half, top), (cx - half, bottom - half)]
    for i in range(1, steps):
        a = math.pi - math.pi * i / steps
        pts.append((cx + half * math.cos(a), bottom - half + half * math.sin(a)))
    pts += [(cx + half, bottom - half), (cx + half, top)]
    return LineString(pts)


def concept_topo():
    lines = [u_line(128, 0, 232, 100), u_line(133, 0, 198, 66), u_line(138, 0, 164, 32)]
    g = unary_union([ln.buffer(10, cap_style=2, join_style=1) for ln in lines])
    return centered(g.intersection(Polygon([(0, 256), (0, 130), (256, 56), (256, 256)])))


def concept_heading():
    def bar(x, y, length):
        return LineString([(x, y), (x + length * 0.7071, y - length * 0.7071)]).buffer(17, cap_style=1)
    return centered(unary_union([bar(46, 214, 150), bar(104, 212, 96), Point(196, 64).buffer(18)]))


# --- Mot : Sora SemiBold, capitales, approche 0,16 em, vectorisé
def wordmark(font_path, text="UNBOUND", tracking=0.16, cap=100):
    font = TTFont(font_path)
    glyphs, cmap, upm = font.getGlyphSet(), font.getBestCmap(), font["head"].unitsPerEm
    scale = cap / font["OS/2"].sCapHeight
    pen = SVGPathPen(glyphs)
    x = 0
    for i, ch in enumerate(text):
        g = glyphs[cmap[ord(ch)]]
        if i == 0:
            bp = BoundsPen(glyphs)
            g.draw(bp)
            x = -bp.bounds[0] * scale
        g.draw(TransformPen(pen, (scale, 0, 0, -scale, x, cap)))
        x += g.width * scale + (tracking * upm * scale if i < len(text) - 1 else 0)
    last = glyphs[cmap[ord(text[-1])]]
    bp = BoundsPen(glyphs)
    last.draw(bp)
    x -= (last.width - bp.bounds[2]) * scale
    return pen.getCommands(), x


def main(font_path):
    detailed, solid = emblem(True), emblem(False)
    minx, miny, maxx, maxy = detailed.bounds
    word, word_w = wordmark(font_path)

    # Lockup horizontal : emblème = 1,6 × hauteur de capitale, centré sur les capitales
    k = 160 / (maxy - miny)
    gap = 56
    emblem_w = (maxx - minx) * k
    lock = {
        "emblemTransform": f"translate({fmt(-minx * k)} {fmt(-30 - miny * k)}) scale({k:.4f})",
        "wordX": fmt(emblem_w + gap),
        "viewBox": f"0 -30 {fmt(emblem_w + gap + word_w)} 160",
    }
    data = {
        "emblem": to_path(detailed),
        "emblemSolid": to_path(solid),
        "emblemViewBox": f"{fmt(minx)} {fmt(miny)} {fmt(maxx - minx)} {fmt(maxy - miny)}",
        "wordmark": word,
        "wordmarkViewBox": f"0 0 {fmt(word_w)} 100",
        "lockup": lock,
        "conceptTopo": to_path(concept_topo()),
        "conceptHeading": to_path(concept_heading()),
    }
    ts = "// Fichier généré par scripts/brand/generate.py : ne pas modifier à la main.\n\n"
    ts += "export const brandPaths = " + json.dumps(data, indent=2, ensure_ascii=False) + " as const\n"
    (ROOT / "src/brand/paths.ts").write_text(ts)

    out = ROOT / "public/brand"
    out.mkdir(parents=True, exist_ok=True)
    charcoal, ivory = "#1E1E1E", "#F3EFE9"

    def svg(view_box, body):
        return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}" role="img" aria-label="UNBOUND"><title>UNBOUND</title>{body}</svg>\n'

    def lockup(color):
        return (f'<path fill="{color}" transform="{lock["emblemTransform"]}" d="{data["emblem"]}"/>'
                f'<path fill="{color}" transform="translate({lock["wordX"]} 0)" d="{word}"/>')

    files = {
        "unbound-emblem.svg": svg(data["emblemViewBox"], f'<path fill="{charcoal}" d="{data["emblem"]}"/>'),
        "unbound-emblem-ivory.svg": svg(data["emblemViewBox"], f'<path fill="{ivory}" d="{data["emblem"]}"/>'),
        "unbound-emblem-black.svg": svg(data["emblemViewBox"], f'<path fill="#000" d="{data["emblem"]}"/>'),
        "unbound-emblem-white.svg": svg(data["emblemViewBox"], f'<path fill="#fff" d="{data["emblem"]}"/>'),
        "unbound-emblem-small.svg": svg(data["emblemViewBox"], f'<path fill="{charcoal}" d="{data["emblemSolid"]}"/>'),
        "unbound-wordmark.svg": svg(data["wordmarkViewBox"], f'<path fill="{charcoal}" d="{word}"/>'),
        "unbound-logo.svg": svg(lock["viewBox"], lockup(charcoal)),
        "unbound-logo-ivory.svg": svg(lock["viewBox"], lockup(ivory)),
        "unbound-logo-black.svg": svg(lock["viewBox"], lockup("#000")),
        "unbound-logo-white.svg": svg(lock["viewBox"], lockup("#fff")),
        # Icône d'app : emblème à 56 % de hauteur, centré optiquement
        "unbound-app-icon.svg": svg("0 0 1024 1024",
            f'<rect width="1024" height="1024" fill="{charcoal}"/>'
            f'<g transform="translate(512 512) scale({1024 * 0.56 / (maxy - miny):.4f}) translate({fmt(-(minx + maxx) / 2)} {fmt(-(miny + maxy) / 2)})">'
            f'<path fill="{ivory}" d="{data["emblem"]}"/></g>'),
    }
    for name, content in files.items():
        (out / name).write_text(content)

    # Favicon : emblème plein, s'adapte au thème du navigateur
    fav_scale = 0.78 * 256 / (maxy - miny)
    favicon = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">'
        '<style>path{fill:#1E1E1E}@media (prefers-color-scheme:dark){path{fill:#F3EFE9}}</style>'
        f'<g transform="translate(128 128) scale({fav_scale:.4f}) translate({fmt(-(minx + maxx) / 2)} {fmt(-(miny + maxy) / 2)})">'
        f'<path d="{data["emblemSolid"]}"/></g></svg>\n'
    )
    (ROOT / "public/favicon.svg").write_text(favicon)
    print("ok", lock["viewBox"])


if __name__ == "__main__":
    main(sys.argv[1])
