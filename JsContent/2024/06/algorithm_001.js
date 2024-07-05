// {"a": {"n1": 1, "n2": 3 },  "b": {"n1": 2, "n2": 4},  "c": { "n1": 3,"n2": 5}}
// 转换成{"n1": {"a": 1, "b": 2, "c": 3 }, "n2": { "a": 3, "b": 4, "c": 5}}
const tempObject = {
  a: { n1: 1, n2: 3 },
  b: { n1: 2, n2: 4 },
  c: { n1: 3, n2: 5 },
};
function transFn(data) {
  const result = {};
  for (const key in data) {
    console.log("data[key]: ", data[key]);
    for (const k in data[key]) {
      if (!result[k]) {
        result[k] = {};
      }
      console.log("data[key][k]: ", data[key][k]);
      result[k][key] = data[key][k];
    }
  }
  return result;
}
console.log("------ ", transFn(tempObject));
