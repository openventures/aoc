const data = $0.innerText.split('\n');


function count(d) {
    return d.map(l => (l.split('XMAS').length - 1) + (l.split('SAMX').length - 1)).reduce((a, b) => a + b, 0);
}

function rot(g) {
    return g[0].map((_, i) => g.map(r => r[i]));
} 

const h = count(data);
const v = count(rot(data.map(l => l.split(''))).map(l => l.join('')));

const d = [];
for(let i = 0; i < data.length; i++) {
  let str = '';
  for (let j = 0; j < data.length - i; j++)
    str += data[i+j][j];
  d.push(str);
}
for(let i = 1; i < data.length; i++) {
  let str = '';
  for (let j = 0; j < data.length - i; j++)
    str += data[j][i+j];
  d.push(str);
}
for(let i = data.length - 1; i >= 0; i--) {
  let str = '';
  for (let j = 0; j <= i; j++)
    str += data[i-j][j]
  d.push(str);
}
for(let i = 1; i < data.length; i++) {
  let str = '';
  for (let j = 0; j < data.length - i; j++)
    str += data[i+j][data.length-1-j]
  d.push(str);
}
const dd = count(d);
console.log(1, h+v+dd);

let c = 0;
for (let i = 1; i < data.length - 1; i++) {
    for (let j = 1; j < data.length - 1; j++) {
        if (data[i][j] !== 'A') continue;
        const cs = data[i-1][j-1] + data[i-1][j+1] + data[i+1][j-1] + data[i+1][j+1];
        if (['SMSM','MMSS','MSMS','SSMM'].includes(cs)) c++;
    }
}
console.log(2, c);
