console.log([] == ![]);
console.log(null == !null);
console.log(null === NaN);
const ary = [
  { id: "1", name: "John", age: "22" },
  { id: "2", name: "stw", age: "18" },
  { id: "3", name: "Jason", age: "28" },
  { id: "4", name: "Tom", age: "16" },
];
// 假设我们要删除id为3的对象
const itemIdToRemove = "3";
// 使用findIndex方法找到要删除的对象的索引
const indexToRemove = ary.findIndex((item) => item.id === itemIdToRemove);

// 如果找到了要删除的对象，使用splice方法删除它
if (indexToRemove !== -1) {
  ary.splice(indexToRemove, 1);
}

const list = ary;
console.log(list);
