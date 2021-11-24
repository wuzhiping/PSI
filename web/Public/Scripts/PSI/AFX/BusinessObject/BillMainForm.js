/**
 * 业务单据主界面基类
 */
Ext.define("PSI.AFX.BusinessObject.BillMainForm", {
  extend: "Ext.panel.Panel",

  mixins: ["PSI.AFX.Mix.Common"],

  border: 0,

  layout: "border",

  initComponent() {
    var me = this;

    Ext.apply(me, {
      tbar: me.afxGetToolbarCmp()
    });

    me.callParent(arguments);

    me.afxInitComponent();
  },

  afxGetToolbarCmp() {
    return [];
  },

  afxInitComponent() {
  }
});
