const data = $0.textContent.trim().split('').map(c => parseInt(c, 10));

function generate(inp) {
    return inp.flatMap((v, i) => v === 0 ? [] : new Array(v).fill((i % 2) === 0 ? i / 2 : '.'));
}

function defrag(disk) {
    let start = 0;
    let end = disk.length - 1;
    while (start < end) {
        if (disk[start] === '.' && disk[end] !== '.') {
            [ disk[start], disk[end] ] = [ disk[end], disk[start] ];
            start++;
            end--;
        } else {
            if (disk[start] !== '.') start++;
            if (disk[end] === '.') end--;
        }
    }
    return disk;
}

function csum(disk) {
    return disk.map((v, i) => v === '.' ? 0 : v * i).reduce((a, b) => a + b, 0);
}

console.log(1, csum(defrag(generate(data))));

function defrag2(disk) {
    for (let i = disk.length - 1; i >= 0; i--) {
        if (disk[i] === '.') continue;
        const fs = fst(i, disk);
        const size = i - fs + 1;
        const bs = nfb(size, disk);
        if (bs !== null && bs < fs)
            mv(fs, bs, size, disk);
        i = fs;
    }
    return disk;
}

function fst(end, disk) {
    const id = disk[end];
    for (let i = end; i > 0; i--)
        if (disk[i-1] !== id) return i;
    return 0;
}

function nfb(size, disk) {
    let cbs = 0;
    for (let i = 0; i < disk.length; i++) {
        if (disk[i] !== '.') cbs = 0;
        else cbs++;

        if (cbs === size) return i - cbs + 1;
    }
    return null;
}

function mv(fs, bs, size, disk) {
    for (let i = 0; i < size; i++) {
        disk[bs + i] = disk[fs + i];
        disk[fs+i] = ".";
    }
}


console.log(2, csum(defrag2(generate(data))));
