// 修正 toFixed

// 算法来自
// https://www.cnblogs.com/guolc/p/9561087.html

Number.prototype.toFixed = function (n) {
  var times = Math.pow(10, n);
  var result = this * times + 0.5;

  result = parseInt(result, 10) / times;

  return result + "";
};
