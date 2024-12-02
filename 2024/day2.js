function isSafe(report) {
    const diffs = [];
    for (let i = 0; i < report.length - 1; i++)
        diffs.push(report[i] - report[i + 1])
    if (!diffs.map(e => Math.abs(e)).every(e => e > 0 && e <= 3))
        return false;
    return new Set(diffs.map(d => d > 0)).size === 1
}

function isSafe2(report) {
    for (let c = 0; c < report.length; c++) {
        const cr = [...report];
        cr.splice(c, 1);
        const diffs = [];
        for (let i = 0; i < cr.length - 1; i++)
            diffs.push(cr[i] - cr[i + 1])
        if (!diffs.map(e => Math.abs(e)).every(e => e > 0 && e <= 3))
            continue;
        if (new Set(diffs.map(d => d > 0)).size !== 1)
            continue;
        return true;
    }
    return false;
}

console.log(1, $0.textContent.split('\n').filter(v => !!v).map(r => r.split(' ').map(v => parseInt(v, 10))).filter(isSafe).length)
console.log(2, $0.textContent.split('\n').filter(v => !!v).map(r => r.split(' ').map(v => parseInt(v, 10))).filter(isSafe2).length)
