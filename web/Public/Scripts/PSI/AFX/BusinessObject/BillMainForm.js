/**
 * 业务单据主界面基类
 */
Ext.define("PSI.AFX.BusinessObject.BillMainForm", {
  extend: "Ext.panel.Panel",

  border: 0,

  layout: "border",

  initComponent: function () {
    var me = this;

    Ext.apply(me, {
      tbar: me.afxGetToolbarCmp()
    });

    me.callParent(arguments);

    me.afxInitComponent();
  },

  afxGetToolbarCmp: function () {
    return [];
  },

  afxInitComponent: function () {
  }
});
