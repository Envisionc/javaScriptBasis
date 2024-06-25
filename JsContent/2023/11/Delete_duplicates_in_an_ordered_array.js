const removeDuplicates = function (nums) {
  for (let i = 0; i <= nums.length; i++) {
    if (nums[i] == nums[i + 1]) {
      nums.splice(i, 1);
    }
  }
  console.log(nums);
  return nums.length;
};

console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 4]));

/* 双层 for 循环 */
function nestedForLoop(n) {
  let res = "";
  // 循环 i = 1, 2, ..., n-1, n
  for (let i = 1; i <= n; i++) {
    // 循环 j = 1, 2, ..., n-1, n
    for (let j = 1; j <= n; j++) {
      res += `(${i}, ${j}), `;
    }
  }
  return res;
}

// console.log(nestedForLoop(5))

/* 初始化数组 */
var arr = new Array(5).fill(0);
console.log(arr);
var nums = [1, 3, 2, 5, 4];

/* 随机访问元素 */
function randomAccess(nums) {
  // 在区间 [0, nums.length) 中随机抽取一个数字
  const random_index = Math.floor(Math.random() * nums.length);
  // 获取并返回随机元素
  const random_num = nums[random_index];
  return random_num;
}

// console.log(randomAccess([1, 3, 2, 5, 4]));

/* 在数组的索引 index 处插入元素 num */
function insert(nums, num, index) {
  // 把索引 index 以及之后的所有元素向后移动一位
  for (let i = nums.length - 1; i > index; i--) {
    nums[i] = nums[i - 1];
  }
  // 将 num 赋给 index 处元素
  nums[index] = num;
  return nums;
}

console.log(insert([1, 3, 2, 5, 4], 6, 1));
