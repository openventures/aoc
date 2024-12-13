const machines = $0.textContent.trim().split('\n\n')
    .map(m => m.split('\n')
        .map(l => l.startsWith('Prize')
            ? l.match(/.*X=(\d+),\sY=(\d+)/).slice(1, 3).map(v => parseInt(v, 10))
            : l.match(/(A|B): X\+(\d+), Y\+(\d+)/).slice(2, 4).map(v => parseInt(v, 10))
        )
    );

function mtp([[ax, ay], [bx, by], [x, y]]) {
    const d = ax * by - ay * bx;
    if (d === 0) return[0, 0];
    const na = by * x - bx * y;
    const nb = ay * x - ax * y;
    
    if (na % d !== 0 || (nb % (-d)) !== 0) {
        return [0, 0];
    }
    return [Math.floor(na / d), Math.floor(nb / (-d))];
}

function adjustPrize([a, b, [x, y]]) {
    return [a, b, [10000000000000+x,10000000000000+y]];
}

console.log(1, machines.map(mtp).map(([a, b]) => a*3+b).reduce((a, b) => a + b, 0));
console.log(1, machines.map(adjustPrize).map(mtp).map(([a, b]) => a*3+b).reduce((a, b) => a + b, 0));
