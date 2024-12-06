function parse(inp) {
    return inp.trim().split('\n').map(r => r.split(''))
}

function render(grid) {
    return grid.map(r => r.join('')).join('\n');
}

const DIRS = '^>v<'.split('');

function rotate(dir) {
    return DIRS[(DIRS.indexOf(dir) + 1) % DIRS.length];
}

function move(row, col, dir) {
    switch (dir) {
        case '^':
            return [row - 1, col]
        case '<':
            return [row, col - 1];
        case '>':
            return [row, col + 1];
        case 'v':
            return [row + 1, col];
    }
    throw new Error(`invalid dir "${dir}"`);
}

function step(grid, markGrid) {
    // find guard
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (!(DIRS.includes(grid[row][col])))
                continue;

            const [tr, tc] = move(row, col, grid[row][col]);
            if (tr < 0 || tr >= grid.length)
                return false;
            if (tc < 0 || tc >= grid[tr].length)
                return false;
            if (grid[tr][tc] !== '#') {
                grid[tr][tc] = grid[row][col];
                grid[row][col] = '.';
                markGrid[row][col] = 'X';
                markGrid[tr][tc] = 'X';
                return true;
            }
            grid[row][col] = rotate(grid[row][col]);
            return true;
        }
    }
    return false;
}

const grid = parse($0.textContent);
const markGrid = parse($0.textContent);

while(step(grid, markGrid)) {
    ;
}
console.log(1, render(markGrid).split('').filter(c => c === 'X').length);

function hasLoop(grid) {
    const visited = new Array(grid.length * grid[0].length).fill(0);
    let [dir, r, c] = (() => {
        for (let row = 0; row < grid.length; row++)
            for (let col = 0; col < grid[row].length; col++)
                if (DIRS.includes(grid[row][col]))
                    return [grid[row][col], row, col]
        throw new Error('start not found');
    })()

    while (true) {
        let b = 1 << DIRS.indexOf(dir);
        const idx = r * grid.length + c;
        if ((visited[idx] & b) !== 0) {
            return true;
        }
        visited[idx] |= b;
        const [tr, tc] = move(r, c, dir);
        if (tr < 0 || tr >= grid.length)
            return false;
        if (tc < 0 || tc >= grid[tr].length)
            return false;
        if (grid[tr][tc] === '#') {
            dir = rotate(dir);
        } else {
            r = tr;
            c = tc;
        }
    }
}

function testLoopPositions(grid) {
    let h = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '.') {
                grid[row][col] = '#';
                if (hasLoop(grid))
                    h++
                grid[row][col] = '.'
            }
        }
    }
    return h;
}

console.log(2, testLoopPositions(parse($0.textContent)));
