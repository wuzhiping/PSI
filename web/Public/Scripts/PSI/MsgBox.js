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
     * 显示提示信息，提示信息会在3.5秒后自动关闭
     * 如果显示了关闭按钮，用户可以随时单击关闭按钮关闭掉提示信息窗口
     * 
     * @param {string} info 提示信息
     * @param {boolean} showCloseButton 是否显示关闭按钮
     */
    tip(info, showCloseButton) {
      const buttons = [];
      if (showCloseButton) {
        buttons.push({
          text: "关闭",
          handler() {
            wnd.close();
          }
        });
      }
      const wnd = Ext.create("Ext.window.Window", {
        modal: false,
        onEsc: Ext.emptyFn,
        width: 400,
        height: 100,
        header: false,
        laytout: "fit",
        border: 0,
        bodyCls: "PSI-Msgbx-tip",
        items: [
          {
            xtype: "container",
            html: `
              <h1 style='color:#843fa1;margin-top:25px;margin-left:10px'>
                ${info}
              </h1>`
          }
        ],
        buttons
      });

      wnd.showAt(document.body.clientWidth - 420, 20);

      Ext.Function.defer(() => {
        wnd.hide();
        wnd.close();
      }, 3500);
    }
  }
});
