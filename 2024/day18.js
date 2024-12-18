const [W, H] = [70, 70];

const bytes = $0.textContent.trim().split('\n').map(l => l.split(',').map(Number));

function eq([a, b], [c, d]) {
    return a === c && b === d;
}

const DIRS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

function search(bytes, start, end) {
    const grid = new Array(H + 1).fill(0).map(() => new Array(W + 1).fill('.'));
    bytes.forEach(([x, y]) => {
        grid[y][x] = '#';
    });
    const q = [[start, 0]];
    const v = new Set([start.join('/')]);

    while (q.length > 0) {
        const [[x, y], cost] = q.shift();
        if (eq([x, y], end)) return cost;

        for (const [dx, dy] of DIRS) {
            const [nx, ny] = [x + dx, y + dy];
            if (nx < 0 || nx > H || ny < 0 || ny > W) continue;
            if (grid[y][x] === '#') continue;
            const k = [nx, ny].join('/');
            if (v.has(k)) continue;
            v.add(k);
            q.push([[nx, ny], cost + 1]);
        }
    }
    return -1;
}
console.log(1, search(bytes.slice(0, 1024), [0, 0], [W, H]));

let l = 0;
for (; l < bytes.length; l++) {
    const c = search(bytes.slice(0, l), [0, 0], [W, H]);
    if (c === -1) break;
}
console.log(2, bytes[l-1].join(','));
