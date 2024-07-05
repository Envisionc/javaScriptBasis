/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
/**
 * 示例 1：
 * 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
 * 输出：[1,2,2,3,5,6]
 * 解释：需要合并 [1,2,3] 和 [2,5,6] 。
 * 合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
 */
/**
示例 2：
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
解释：需要合并 [1] 和 [] 。
合并结果是 [1] 。
*/
/**
示例 3：
输入：nums1 = [0], m = 0, nums2 = [1], n = 1
输出：[1]
解释：需要合并的数组是 [] 和 [1] 。
合并结果是 [1] 。
注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
*/
function merge(nums1, m, nums2, n) {
  // 初始化指针，分别指向nums1、nums2的末尾以及合并后数组（在nums1中）的末尾
  let p1 = m - 1,
    p2 = n - 1,
    pMerge = m + n - 1;

  // 从后向前合并，避免覆盖元素
  while (p1 >= 0 && p2 >= 0) {
    // 将较大的元素放在nums1的末尾
    if (nums1[p1] > nums2[p2]) {
      nums1[pMerge] = nums1[p1];
      p1--;
    } else {
      nums1[pMerge] = nums2[p2];
      p2--;
    }
    pMerge--;
  }

  // 如果nums2还有剩余元素，直接拷贝到nums1中
  while (p2 >= 0) {
    nums1[pMerge] = nums2[p2];
    p2--;
    pMerge--;
  }
}

// console.log(merge([1, 1, 1, 1, 0, 0, 6, 5, 8], 7, [1, 2, 8, 0, 0, 0], 3));
