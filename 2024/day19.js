const [patterns, designs] = (() => {
    const [p, d] = $0.textContent.trim().split('\n\n');
    return [
        p.split(', '),
        d.split('\n'),
    ];
})();

const cache = new Map();

function possible(design) {
    if (design.length === 0) return 1;
    if (cache.has(design)) return cache.get(design);
    let n = 0;
    for (p of patterns) {
        if (design.startsWith(p))
            n += possible(design.slice(p.length))
    }
    cache.set(design, n);
    return n;
}

console.log(1, designs.filter(d => possible(d) > 0).length);
console.log(2, designs.map(d => possible(d)).reduce((a, b) => a + b, 0));
