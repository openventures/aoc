const data = $0.textContent.trim().split('\n').map(r => r.split('').map(v => parseInt(v, 10)));

function eq([r1, c1], [r2, c2]) {
    return r1 === r2 && c1 === c2;
}

function findZeros(grid) {
    const res = [];
    for (let i = 0; i < grid.length; i++)
        for (let j = 0; j < grid[i].length; j++)
            if (grid[i][j] === 0) res.push([i, j])
    return res;
}

function walk(grid, [r, c]) {
    const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ]
    return dirs.map(([dr, dc]) => [r + dr, c + dc]).filter(([rc, cc]) => grid[rc]?.[cc] === grid[r][c] + 1);
}

function countTrailheads(grid, rating = false) {
    let th = 0;
    for (const rc of findZeros(grid)) {
        const queue = [rc];
        while (queue.length > 0) {
            const n = [];
            for (const [r, c] of queue) {
                if (grid[r][c] === 9) th++;
                else n.push(...walk(grid, [r, c]));
            }
            if (!rating)
                for (let i = 0; i < n.length; i++)
                    for (let j = i + 1; j < n.length; j++)
                        if (eq(n[j], n[i])) n[j] = [];
            queue.splice(0, queue.length, ...n.filter(v => v.length > 0));
        }
    }
    return th;
}

console.log(1, countTrailheads(data))
console.log(2, countTrailheads(data, true))
