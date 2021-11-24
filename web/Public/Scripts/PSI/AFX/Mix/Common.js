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
});
