// 使用 canvas 将图片URL转换为PNG格式的图像数据并保存为文件
async function urlToFile(url, filename) {
  const img = new Image();
  img.crossOrigin = "anonymous"; // 如果需要跨域访问图片，需要设置图片的crossOrigin属性
  img.src = url;
  await new Promise((resolve) => {
    img.onload = resolve;
  }); // 等待图片加载完成
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], filename, { type: "image/png" });
      resolve(file);
    });
  });
}
