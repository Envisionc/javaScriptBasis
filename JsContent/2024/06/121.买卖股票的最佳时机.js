function maxProfit(prices) {
  if (!prices || prices.length === 0) {
    return 0;
  }

  let minPrice = prices[0]; // 初始化最低价格为数组的第一个元素
  let maxProfit = 0; // 初始化最大利润为0

  for (let i = 1; i < prices.length; i++) {
    // 在遍历过程中不断更新最低价格
    minPrice = Math.min(minPrice, prices[i]);

    // 计算当前天卖出的潜在利润，并更新最大利润
    const potentialProfit = prices[i] - minPrice;
    maxProfit = Math.max(maxProfit, potentialProfit);
  }

  return maxProfit;
}

// 示例测试
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 应输出 5
