const grid = $0.textContent.trim().split('\n').map((l) => l.split(''));

const DIRS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

function find(grid, v) {
    for (let r = 0; r < grid.length; r++)
        for (let c = 0; c < grid[r].length; c++)
            if (grid[r][c] === v) return [r, c];
}

function eq([a, b], [c, d]) {
    return a === c && b === d;
}

function add([a, b], [c, d]) {
    return [a + c, b + d];
}

function dist([a, b], [c, d]) {
    return Math.abs(a - c) + Math.abs(b - d);
}

const start = find(grid, "S");
const end = find(grid, "E");

const path = [];

function walk(from) {
    for (const dir of DIRS) {
        const [r, c] = add(from, dir);
        if (r < 0 || r > grid.length || c < 0 || c > grid[r].length) continue;
        if (grid[r][c] === '#') continue;
        if (path.some(p => eq(p, [r, c]))) continue;
        return [r, c];
    }
    throw new Error("No path found");
}

for (let v = start; !eq(v, end); v = walk(v)) {
    path.push(v);
}
path.push(end);

function list(path, cost) {
    let s = 0;
    for (let i = 0; i < path.length; i++) {
        for (let j = i + 100; j < path.length; j++) {
            const cs = path[i];
            const ce = path[j];
            const d = dist(cs, ce);
            if (d <= cost && j - i - d >= 100)
                s++;
        }
    }
    return s;
}
console.log(1, list(path, 2));
console.log(2, list(path, 20));
