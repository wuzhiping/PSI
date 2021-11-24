// 信息提示框
Ext.define("PSI.MsgBox", {
  statics: {
    // 显示提示信息
    showInfo(info, func) {
      Ext.Msg.show({
        title: "提示",
        msg: info,
        icon: Ext.Msg.INFO,
        buttons: Ext.Msg.OK,
        modal: true,
        closable: false,
        fn() {
          if (func) {
            func();
          }
        }
      });
    },

    // 显示确认信息
    confirm(confirmInfo, funcOnYes) {
      Ext.Msg.show({
        title: "提示",
        msg: confirmInfo,
        icon: Ext.Msg.QUESTION,
        buttons: Ext.Msg.YESNO,
        modal: true,
        defaultFocus: "no",
        closable: false,
        fn(id) {
          if (id === "yes" && funcOnYes) {
            funcOnYes();
          }
        }
      });
    },

    // 显示提示信息，提示信息会自动关闭
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
