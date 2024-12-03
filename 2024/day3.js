console.log(1, Array.from($0.textContent.matchAll(/mul\(\d+,\d+\)/g)).map(match => match[0]).map(exp => Array.from(exp.matchAll(/(\d+)\,(\d+)/g))).map(match => match[0]).map(m => parseInt(m[1],10) * parseInt(m[2], 10)).reduce((a, b) => a + b, 0))

let enabled = true;
let acc = 0;
for (const [ins] of Array.from($0.textContent.matchAll(/(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g))) {
    if (ins === 'do()') {
        enabled = true;
        continue;
    }
    if (ins === 'don\'t()') {
        enabled = false;
        continue;
    }
    if (!enabled) continue;
    const [, a, b] = Array.from(ins.matchAll(/(\d+)\,(\d+)/g))[0]
    acc += (parseInt(a, 10) * parseInt(b, 10))
}
console.log(2, acc);
