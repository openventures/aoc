const grid = Object.fromEntries($0.textContent.trim().split('\n').flatMap((l, r) => l.split('').map((v, c) => [`${r}/${c}`, v])))

const sets = {};
Object.keys(grid).forEach(p => {
    sets[p] = new Set([p]);
});

const neighbors = [[0, 1], [0, -1], [1, 0], [-1, 0]];

Object.keys(grid).forEach((p) => {
    const [r, c] = p.split('/').map(v => parseInt(v, 10))
    neighbors.forEach(([dr, dc]) => {
        const n = `${r + dr}/${c + dc}`;
        if (n in grid && grid[p] === grid[n]) {
            sets[p] = new Set([...sets[p], ...sets[n]]);
            sets[p].forEach(x => {
                sets[x] = sets[p];
            });
        }
    });
});

let us = new Set(Object.values(sets).map(s => JSON.stringify([...s].sort())));
us = [...us].map(s => JSON.parse(s));

function circ(ps) {
    return ps.reduce((sum, p) => {
        const [r, c] = p.split('/').map(v => parseInt(v, 10))
        return sum + neighbors.filter(([dr, dc]) => !ps.includes(`${r + dr}/${c + dc}`)).length;
    }, 0);
};

console.log(1, us.reduce((sum, s) => sum + s.length * circ(s), 0));

function sides(ps) {
    const P = new Set();
    ps.forEach(p => {
        const [r, c] = p.split('/').map(v => parseInt(v, 10))
        neighbors.forEach(([dr, dc]) => {
            const np = `${r+dr}/${c+dc}`;
            if (!ps.includes(np)) {
                P.add(JSON.stringify([p, [dr, dc]]));
            }
        });
    });
    const P2 = new Set([...P]);
    P.forEach(item => {
        const [p, [dr, dc]] = JSON.parse(item);
        const [r, c] = p.split('/').map(v => parseInt(v, 10))
        P2.delete(JSON.stringify([`${r+dc}/${c-dr}`, [dr, dc]]));
    });
    return P2.size;
}

console.log(2, us.reduce((sum, s) => sum + s.length * sides(s), 0))
