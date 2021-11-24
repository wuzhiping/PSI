/**
 * 常用的公共Mix
 * 
 * @author 李静波
 */
Ext.define("PSI.AFX.Mix.Common", {
  // 显示提示信息
  tip(info) {
    PSI.MsgBox.tip(info);
  },

  // 显示需要用户确认的信息
  confirm(confirmInfo, funcOnYes) {
    PSI.MsgBox.confirm(confirmInfo, funcOnYes);
  },

  // 构建最终的URL
  URL(url) {
    return PSI.Const.BASE_URL + url;
  },

  // Ajax调用
  ajax(r) {
    if (!r.method) {
      r.method = "POST";
    }
    Ext.Ajax.request(r);
  },

  // 把字符串解析为JSON
  decodeJSON(str) {
    return Ext.JSON.decode(str);
  },

  // 关闭当前模块
  closeWindow: function () {
    if (PSI.Const.MOT == "0") {
      window.location.replace(PSI.Const.BASE_URL);
    } else {
      window.close();

      if (!window.closed) {
        window.location.replace(PSI.Const.BASE_URL);
      }
    }
  }
});
