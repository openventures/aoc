const data = $0.textContent.trim().split('\n').map(l => l.split(': ')).map(([tv, vs]) => ([parseInt(tv, 10), vs.split(' ').map(v => parseInt(v, 10))]));

function calcPermutations(vs, ops) {
    if (vs.length === 0) return [];
    if (vs.length === 1) return [vs];
    const [head, ...tail] = vs;
    const perms = calcPermutations(tail, ops);
    return perms.flatMap(p => ops.map(op => [head, op, ...p]));
}

function ev(vs) {
    if (vs.length < 3) return -1;
    
    let acc = vs[0];
    for (let i = 1; i < vs.length; i += 2) {
        if (vs[i] === '+') acc += vs[i + 1];
        if (vs[i] === '*') acc *= vs[i + 1];
        if (vs[i] === '||') acc = parseInt(`${acc}${vs[i + 1]}`, 10);
    }
    return acc;
}

function checkData(ops) {
    return ([tv, vs]) => calcPermutations(vs, ops).map(ev).includes(tv);
}

console.log(1, data.filter(checkData(['+', '*'])).map(([tv]) => tv).reduce((a, b) => a + b, 0))
console.log(2, data.filter(checkData(['+', '*', '||'])).map(([tv]) => tv).reduce((a, b) => a + b, 0))
