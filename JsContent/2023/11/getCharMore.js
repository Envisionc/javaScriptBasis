const getCharMode = (code, symbolList = []) => {
  if (code >= 48 && code <= 57) {
    return "1";
  } else if (code >= 97 && code <= 122) {
    return "3";
  } else if (code >= 65 && code <= 90) {
    return "4";
  } else if (symbolList.includes(code)) {
    return "2";
  } else {
    return "0";
  }
};
const getInputTypeList = (str) => {
  const strArr = [...str];
  // "!@#$%^&*,."
  const symbolList = [33, 64, 35, 36, 37, 94, 38, 42, 44, 46];
  const tmp = strArr.map((c, i) => {
    const target = getCharMode(str.charCodeAt(i), symbolList);
    return target;
  });
  const result = new Set(tmp);
  return !result.has("0") && result.size >= 3;
};

console.log(getInputTypeList("114455qwqQWW..汉字"));
