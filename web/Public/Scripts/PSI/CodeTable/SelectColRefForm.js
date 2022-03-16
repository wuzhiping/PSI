/**
 * 值来源的引用列
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
PCL.define("PSI.CodeTable.SelectColRefForm", {
  extend: "PCL.window.Window",

  mixins: ["PSI.AFX.Mix.Common"],

  config: {
    codeTable: null
  },

  initComponent() {
    const me = this;

    PCL.apply(me, {
      header: {
        title: me.formatTitle(PSI.Const.PROD_NAME),
        height: 40
      },
      width: 800,
      height: 600,
      layout: "border",
      buttons: [{
        text: "关闭",
        handler() {
          me.close();
        },
        scope: me
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

  _onWndShow() {
    const me = this;
  }
});
