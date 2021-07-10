// 修正 toFixed

// 算法来自
// https://blog.csdn.net/qq_37811638/article/details/78529401

Number.prototype.toFixed = function (length) {
  var carry = 0; //存放进位标志
  var num, multiple; //num为原浮点数放大multiple倍后的数，multiple为10的length次方
  var str = this + ''; //将调用该方法的数字转为字符串
  var dot = str.indexOf("."); //找到小数点的位置
  if (str.substr(dot + length + 1, 1) >= 5) carry = 1; //找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1
  multiple = Math.pow(10, length); //设置浮点数要扩大的倍数
  num = Math.floor(this * multiple) + carry; //去掉舍入位后的所有数，然后加上我们的手动进位数
  var result = num / multiple + ''; //将进位后的整数再缩小为原浮点数
  /*
  * 处理进位后无小数
  */
  dot = result.indexOf(".");
  if (dot < 0) {
    result += '.';
    dot = result.indexOf(".");
  }
  /*
  * 处理多次进位
  */
  var len = result.length - (dot + 1);
  if (len < length) {
    for (var i = 0; i < length - len; i++) {
      result += 0;
    }
  }

  // 原来的算法有bug： (2.1).toFixed(0)结果是 '2.' 后面多了一个小数点
  if (length == 0) {
    var pos = result.indexOf(".");
    if (pos == result.length - 1) {
      result = result.substring(0, pos);
    }
  }

  return result;
}
//该方法的大致思路是首先找到舍入位，判断该位置是否大于等于5，条件成立手动进一位，然后通过参数大小将原浮点数放大10的参数指数倍，然后再将包括舍入位后的位数利用floor全部去掉，根据我们之前的手动进位来确定是否进位。
//————————————————
// 版权声明：本文为CSDN博主「我是一只探索的程序猿」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/qq_37811638/article/details/78529401
