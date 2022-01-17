/**
 * 信息提示框
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.MsgBox", {
  statics: {
    /**
     * 显示提示信息
     * @param {string} info 提示信息
     * @param {Function} func 单击确定按钮后的回调函数
     */
    showInfo(info, func) {

      const form = Ext.create("PSI.AFX.MessageBox.ShowInfoForm", {
        msg: info,
        fn: func
      });
      form.show();
    },

    /**
     * 显示确认信息
     * 
     * @param {string} confirmInfo 显示给用户的确认信息
     * @param {Function} funcOnYes 选择YES按钮后的回调函数 
     */
    confirm(confirmInfo, funcOnYes) {
      const form = Ext.create("PSI.AFX.MessageBox.ConfirmForm", {
        msg: confirmInfo,
        fn: funcOnYes
      });
      form.show();
    },

    /**
     * 显示提示信息，提示信息会在两秒后自动关闭
     * 
     * @param {string} info 提示信息
     */
    tip(info) {
      const wnd = Ext.create("Ext.window.Window", {
        modal: false,
        onEsc: Ext.emptyFn,
        width: 300,
        height: 100,
        header: false,
        laytout: "fit",
        border: 0,
        bodyCls: "PSI-Msgbx-tip",
        items: [
          {
            xtype: "container",
            html: `
              <h1 style='color:#1890ff;margin-top:25px;margin-left:10px'>
                ${info}
              </h1>`
          }
        ]
      });

      wnd.showAt(document.body.clientWidth - 320, 20);

      Ext.Function.defer(() => {
        wnd.hide();
        wnd.close();
      }, 2000);
    }
  }
});
