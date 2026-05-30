const getMultiplicationTable = (m, n) => {
  let result = "";
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      result += `${i} * ${j} = ${i * j}\n`;
    }
    result += "\n";
  }
  return result;
};
console.log(getMultiplicationTable(9, 9));
