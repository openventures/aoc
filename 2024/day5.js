const [pageOrders, updates] = (() => {
    const [por, updates] = $0.textContent.split('\n\n');

    const p = por.split('\n').map(l => l.split('|').map(v => parseInt(v, 10)));

    const m = {};
    for (const [a, b] of p) {
        if (!m[a]) m[a] = [];
        m[a].push(b);
    }

    return [m, updates.split('\n').map(l => l.split(',').filter(v => !!v).map(v => parseInt(v, 10))).filter(v => v.length > 0)]
})();

function isValid(u) {
    for (let i = 0; i < u.length; i++) {
        for (let j = 0; j < u.length; j++) {
            const t = pageOrders[u[i]]?.indexOf(u[j]);
            if (j < i && t >= 0)
                return false;
            if (j > i && t < 0)
                return false;
        }
    }
    return true;
}

function mid(us) {
    return us.map(u => u[Math.floor(u.length / 2)]).reduce((a, b) => a + b, 0);
}

function correct(u) {
    const c = [...u];
    let changed;
    do {
        changed = false;
        for (let i = 0; i < c.length - 1; i++) {
            const vc = c[i];
            if (!pageOrders[vc] || pageOrders[vc].indexOf(c[i + 1]) < 0) {
                [c[i], c[i + 1]] = [c[i + 1], c[i]];
                changed = true;
            }
        }
    } while (changed);
    return c;
}

const valid = updates.filter(isValid);
console.log(1, mid(valid));

const corrected = updates.filter(u => !isValid(u)).map(correct);
console.log(2, mid(corrected));
