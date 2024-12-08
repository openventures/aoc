const grid = $0.textContent.trim().split('\n').map(r => r.split(''));

function freqMap(grid) {
    const m = {};

    for (let r = 0; r < grid.length; r++)
        for (let c = 0; c < grid[r].length; c++)
            if (grid[r][c] !== '.')
                if (m[grid[r][c]]) m[grid[r][c]].push([r, c])
                else m[grid[r][c]] = [[r, c]]
    return m;
}

function xzip(positions) {
    const a = [];
    for (let i = 0; i < positions.length; i++)
        for (let j = i + 1; j < positions.length; j++)
            a.push([positions[i], positions[j]])
    return a;
}

function validAnti(grid) {
    return ([r, c]) => r >= 0 && r < grid.length && c >= 0 && c < grid[r].length;
}

const xzipped = Object.values(freqMap(grid)).flatMap(xzip);

console.log(1, new Set(xzipped.flatMap(([[r1, c1], [r2, c2]]) => [
    [2*r2 - r1, 2*c2 - c1],
    [2*r1 - r2, 2*c1 - c2],
]).filter(validAnti(grid)).map(([r, c]) => `${r}/${c}`)).size);

console.log(2, new Set(xzipped.flatMap(([[r1, c1], [r2, c2]]) => {
    const dirs = [
        [r2 - r1, c2 - c1, r1, c1],
        [r1 - r2, c1 - c2, r2, c2],
    ];
    const pos = [];
    dirs.forEach(([dr, dc, r, c]) =>  {
        while(validAnti(grid)([r, c])) {
            pos.push([r, c]);
            r += dr;
            c += dc;
        }
    });
    return pos;
}).map(([r, c]) => `${r}/${c}`)).size);
