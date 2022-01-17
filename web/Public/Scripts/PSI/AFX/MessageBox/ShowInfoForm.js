/**
 * showInfo窗体
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.AFX.MessageBox.ShowInfoForm", {
  extend: 'Ext.window.Window',
  config: {
    fn: null,
    msg: "",
  },

  modal: true,
  closable: false,
  width: 600,
  layout: "fit",

  /**
   * @override
   */
  initComponent() {
    const me = this;

    Ext.apply(me, {
      header: {
        title: `<span style='font-size:160%'>提示 - ${PSI.Const.PROD_NAME}</span>`,
        iconCls: "PSI-fid-9994",
        height: 40
      },
      height: 160,
      items: [{
        border: 0,
        xtype: "container",
        margin: "0 0 0 5",
        html: `
              <h2 style='color:#843fa1'>${me.getMsg()}</h2>
              `
      }],
      buttons: [{
        id: "PSI_AFX_MessageBox_ShowInfoForm_buttonOK",
        text: "确定",
        handler: me._onOK,
        scope: me,
        iconCls: "PSI-button-ok"
      }],
      listeners: {
        show: {
          fn: me._onWndShow,
          scope: me
        }
      }
    });

    me.callParent(arguments);
  },

  /**
   * @private
   */
  _onWndShow() {
    Ext.getCmp("PSI_AFX_MessageBox_ShowInfoForm_buttonOK").focus();
  },

  /**
   * @private
   */
  _onOK() {
    const me = this;

    me.close();

    const fn = me.getFn();
    if (fn) {
      fn();
    }
  }
});
