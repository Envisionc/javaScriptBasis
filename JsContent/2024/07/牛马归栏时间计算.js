function goHome(h = 18, m = 0) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const endOfWork = new Date();
  endOfWork.setHours(h, m, 0);
  if (now > endOfWork) {
    endOfWork.setDate(endOfWork.getDate() + 1);
  }
  const timeDiff = endOfWork - now;
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  console.log(hours + " 小时 " + minutes + " 分钟");
}
goHome();
