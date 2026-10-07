/**
 * Outlines, drawn on a 100 x 100 grid, that the morphing blob settles into. One per
 * capability card, in the same order as the cards on the home page.
 */
export const MORPH_SHAPES = [
  // 0 idea to digital solution: a light bulb
  ["M50 12 a22 22 0 0 1 12 40 v8 h-24 v-8 a22 22 0 0 1 12 -40z", "M40 70 h20", "M42 80 h16"],
  // 1 custom software and SaaS: code brackets
  ["M30 30 L10 50 L30 70", "M70 30 L90 50 L70 70", "M56 22 L44 78"],
  // 2 mobile apps: a phone
  [
    "M34 12 h32 a6 6 0 0 1 6 6 v64 a6 6 0 0 1 -6 6 h-32 a6 6 0 0 1 -6 -6 v-64 a6 6 0 0 1 6 -6z",
    "M44 80 h12",
  ],
  // 3 backend systems: a server stack
  ["M16 20 h68 v18 h-68z", "M16 44 h68 v18 h-68z", "M16 68 h68 v18 h-68z", "M26 29 h6", "M26 53 h6", "M26 77 h6"],
  // 4 search: a magnifier
  ["M64 40 a24 24 0 1 1 -48 0 a24 24 0 1 1 48 0", "M57 57 L86 86"],
  // 5 advertising: a megaphone
  ["M16 40 L60 20 V80 L16 60 Z", "M66 38 q14 12 0 24", "M26 66 L30 86"],
  // 6 content: a pen
  ["M20 80 L26 58 L68 16 L84 32 L42 74 Z", "M60 24 L76 40", "M20 80 H34"],
  // 7 integrations and automation: a plug
  ["M36 14 v20", "M64 14 v20", "M26 34 h48 v14 a24 24 0 0 1 -48 0 z", "M50 72 v14"],
];

/** Evenly spaced points along all of a shape's paths. Needs a browser (SVG path measuring). */
export function sampleShape(paths, count) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none";
  document.body.appendChild(svg);
  try {
    const elements = paths.map((d) => {
      const path = document.createElementNS(ns, "path");
      path.setAttribute("d", d);
      svg.appendChild(path);
      return path;
    });
    const lengths = elements.map((path) => path.getTotalLength());
    const total = lengths.reduce((sum, length) => sum + length, 0);
    const points = [];
    for (let k = 0; k < count; k += 1) {
      let distance = ((k + 0.5) / count) * total;
      let index = 0;
      while (index < elements.length - 1 && distance > lengths[index]) {
        distance -= lengths[index];
        index += 1;
      }
      const point = elements[index].getPointAtLength(Math.min(distance, lengths[index]));
      points.push([point.x, point.y]);
    }
    return points;
  } finally {
    document.body.removeChild(svg);
  }
}
