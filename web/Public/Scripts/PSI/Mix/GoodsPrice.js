//
// 计算商品价格的Mix
// 用于单据编辑页面
//
Ext.define("PSI.Mix.GoodsPrice", {
  // 因价税合计变化，重新计算
  calcTax: function (goods) {
    if (!goods) {
      return;
    }
    var taxRate = goods.get("taxRate") / 100;
    var tax = goods.get("moneyWithTax") * taxRate / (1 + taxRate);
    goods.set("tax", tax);
    goods.set("goodsMoney", goods.get("moneyWithTax") - tax);

    // 计算单价
    if (goods.get("goodsCount") == 0) {
      goods.set("goodsPrice", null);
      goods.set("goodsPriceWithTax", null);
    } else {
      goods.set("goodsPrice", goods.get("goodsMoney")
        / goods.get("goodsCount"));
      goods.set("goodsPriceWithTax", goods.get("moneyWithTax")
        / goods.get("goodsCount"));
    }
  },

  // 因为税金变化，重新计算
  calcMoneyWithTax: function (goods) {
    if (!goods) {
      return;
    }

    goods.set("goodsMoney", goods.get("tax") * 100
      / goods.get("taxRate"));
    goods.set("moneyWithTax", goods.get("goodsMoney")
      + goods.get("tax"));
    if (goods.get("goodsCount") != 0) {
      goods.set("goodsPrice", goods.get("goodsMoney")
        / goods.get("goodsCount"));
      goods.set("goodsPriceWithTax", goods.get("moneyWithTax")
        / goods.get("goodsCount"));
    }
  },

  // 因为不含税价格变化，重新计算金额
  calcMoney: function (goods) {
    if (!goods) {
      return;
    }

    var cnt = parseFloat(goods.get("goodsCount"));
    var price = parseFloat(goods.get("goodsPrice"));
    if (isNaN(cnt) || isNaN(price)) {
      goods.set("goodsMoney", null);
      goods.set("tax", null);
      goods.set("moneyWithTax", null);
      goods.set("goodsPriceWithTax", null);
      return;
    }

    var money = cnt * price;
    goods.set("goodsMoney", money);
    var taxRate = parseInt(goods.get("taxRate"));
    if (isNaN(taxRate)) {
      taxRate = 0;
    }
    var tax = money * (taxRate / 100);
    goods.set("tax", tax);
    var moneyWithTax = money + tax;
    goods.set("moneyWithTax", moneyWithTax);
    if (cnt != 0) {
      goods.set("goodsPriceWithTax", moneyWithTax / cnt);
    }
  },

  // 因为含税价变化，重新计算金额
  calcMoney2: function (goods) {
    if (!goods) {
      return;
    }

    goods.set("moneyWithTax", goods.get("goodsPriceWithTax")
      * goods.get("goodsCount"));
    goods.set("goodsMoney", goods.get("moneyWithTax")
      / (1 + goods.get("taxRate") / 100));
    goods.set("tax", goods.get("moneyWithTax")
      - goods.get("goodsMoney"));
    if (goods.get("goodsCount") != 0) {
      goods.set("goodsPrice", goods.get("goodsMoney")
        / goods.get("goodsCount"));
    }
  },

  // 因金额变化，重新计算单价
  calcPrice: function (goods) {
    if (!goods) {
      return;
    }

    var goodsCount = goods.get("goodsCount");
    if (goodsCount && goodsCount != 0) {
      goods.set("goodsPrice", goods.get("goodsMoney")
        / goods.get("goodsCount"));
      goods.set("goodsPriceWithTax", goods.get("moneyWithTax")
        / goods.get("goodsCount"));
    }
  }
});
