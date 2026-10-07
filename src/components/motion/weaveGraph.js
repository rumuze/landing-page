/**
 * Geometry for the hero weave: an eight-pointed-star tiling, the kind found in Islamic
 * ornament, expressed as a graph so light pulses can travel along its lines like signals
 * on a circuit. Neighbouring cells share their tips and corners, so the tiling is one
 * connected network.
 */
export function buildWeaveGraph(width, height, size) {
  const cols = Math.ceil(width / size) + 1;
  const rows = Math.ceil(height / size) + 1;
  const originX = (width - (cols - 1) * size) / 2;
  const originY = (height - (rows - 1) * size) / 2;
  const half = size / 2;
  const inner = size * 0.35355;

  const vertices = [];
  const edges = [];
  const vertexByKey = new Map();
  const edgeKeys = new Set();

  const vertexId = (x, y) => {
    const key = `${Math.round(x)},${Math.round(y)}`;
    let id = vertexByKey.get(key);
    if (id === undefined) {
      id = vertices.length;
      vertexByKey.set(key, id);
      vertices.push({ x, y, edges: [] });
    }
    return id;
  };

  const addEdge = (x1, y1, x2, y2) => {
    const a = vertexId(x1, y1);
    const b = vertexId(x2, y2);
    if (a === b) return;
    const key = a < b ? `${a}_${b}` : `${b}_${a}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    const index = edges.length;
    edges.push({
      a,
      b,
      heat: 0,
      midX: (x1 + x2) / 2,
      midY: (y1 + y2) / 2,
    });
    vertices[a].edges.push(index);
    vertices[b].edges.push(index);
  };

  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      const cx = originX + i * size;
      const cy = originY + j * size;
      // Inner square.
      addEdge(cx - inner, cy - inner, cx + inner, cy - inner);
      addEdge(cx + inner, cy - inner, cx + inner, cy + inner);
      addEdge(cx + inner, cy + inner, cx - inner, cy + inner);
      addEdge(cx - inner, cy + inner, cx - inner, cy - inner);
      // Diamond whose tips touch the neighbouring cells.
      addEdge(cx + half, cy, cx, cy - half);
      addEdge(cx, cy - half, cx - half, cy);
      addEdge(cx - half, cy, cx, cy + half);
      addEdge(cx, cy + half, cx + half, cy);
      // Bridges from the square's corners to the cell corners.
      addEdge(cx + inner, cy + inner, cx + half, cy + half);
      addEdge(cx - inner, cy + inner, cx - half, cy + half);
      addEdge(cx + inner, cy - inner, cx + half, cy - half);
      addEdge(cx - inner, cy - inner, cx - half, cy - half);
    }
  }

  return { vertices, edges };
}

/** Index of the vertex nearest to (x, y) within `maxDistance`, or -1. */
export function nearestVertex(vertices, x, y, maxDistance) {
  let best = -1;
  let bestSq = maxDistance * maxDistance;
  for (let i = 0; i < vertices.length; i += 1) {
    const dx = vertices[i].x - x;
    const dy = vertices[i].y - y;
    const sq = dx * dx + dy * dy;
    if (sq < bestSq) {
      bestSq = sq;
      best = i;
    }
  }
  return best;
}
