const arrs = $0.textContent.split('\n').map(l => l.split(/\s/).filter(v => !!v).map(v => parseInt(v, 10))).filter(l => l.length > 0).reduce((acc, l) => {
    l.forEach((v, i) => acc[i].push(v))
    return acc;
},[[], []]);

arrs.forEach(v => v.sort());

console.log(1, arrs[0].map((v, i) => Math.abs(arrs[1][i] - v)).reduce((a, b) => a + b, 0))
console.log(2, arrs[0].map(v => arrs[1].filter(c => c === v).length * v).reduce((a, b) => a + b, 0))