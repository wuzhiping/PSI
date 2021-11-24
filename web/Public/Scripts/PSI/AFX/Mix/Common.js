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
  URL: function (url) {
    return PSI.Const.BASE_URL + url;
  },

  // Ajax调用
  ajax: function (r) {
    if (!r.method) {
      r.method = "POST";
    }
    Ext.Ajax.request(r);
  }
});
