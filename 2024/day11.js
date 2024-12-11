let stones = $0.textContent.trim().split(' ').map(v => parseInt(v, 10));
function change(stone) {
    if (stone === 0) return [1];
    const s = `${stone}`;
    if (s.length % 2 === 0) {
        return [
            s.slice(0, s.length / 2),
            s.slice(s.length / 2),
        ].map(v => parseInt(v, 10));
    }
    return stone * 2024;
}

for (let i = 0; i < 25; i++) {
    stones = stones.flatMap(change)
}
console.log(1, stones.length)


const cache = new Map();
function changeRec(stone, depth) {
    if (depth === 0) return 1;
    const k = `${stone}_${depth}`;
    if (cache.has(k)) return cache.get(k);

    if (stone === 0) {
        const v = changeRec(1, depth - 1);
        cache.set(k, v);
        return v;
    }
    
    const s = `${stone}`;
    if (s.length % 2 === 0) {
        const v = changeRec(parseInt(s.slice(0, s.length / 2), 10), depth - 1)
            + changeRec(parseInt(s.slice(s.length / 2), 10), depth - 1);
        cache.set(k, v);
        return v;
    }

    const v = changeRec(stone * 2024, depth - 1);
    cache.set(k, v);
    return v;
}

console.log(2, $0.textContent.trim().split(' ').map(v => parseInt(v, 10)).map(s => changeRec(s, 75)).reduce((a, b) => a + b, 0))
