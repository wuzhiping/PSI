/**
 * 关于窗体
 */
Ext.define("PSI.About.MainForm", {
  extend: 'Ext.window.Window',
  config: {
    productionName: "PSI",
    phpVersion: "",
    mySQLVersion: "",
    PSIDBVersion: "",
    PSIDBUpdateDT: ""
  },

  modal: true,
  closable: false,
  width: 500,
  layout: "fit",

  initComponent: function () {
    var me = this;

    var year = new Date().getFullYear();
    var c = "Copyright &copy; 2015-"
      + year
      + " 艾格林门信息服务（大连）有限公司, All Rights Reserved";

    Ext.apply(me, {
      header: {
        title: "<span style='font-size:160%'>关于 - "
          + me.getProductionName() + "</span>",
        iconCls: "PSI-fid-9994",
        height: 40
      },
      height: 350,
      bodyCls: "PSI-About-body",
      items: [{
        border: 0,
        xtype: "container",
        margin: "0 0 0 10",
        cls: "PSI-about",
        html: "<h1>欢迎使用"
          + me.getProductionName()
          + "</h1><h2>当前版本："
          + PSI.Const.VERSION
          + "</h2>"
          + "<h2>官网  <a style='text-decoration:none;' href='https://gitee.com/crm8000/PSI' target='_blank'>https://gitee.com/crm8000/PSI</a></h2>"
          + "<p>PHP版本号: "
          + me.getPhpVersion() + " , MySQL版本号: "
          + me.getMySQLVersion() + "</p><p>数据库表结构版本号: "
          + me.getPSIDBVersion() + "</p><p>数据库表结构更新时间: "
          + me.getPSIDBUpdateDT() + "</p>"
          + "<p>" + c + "</p>"
      }],
      buttons: [{
        id: "buttonAboutFormOK",
        text: "关闭",
        handler: me.onOK,
        scope: me,
        iconCls: "PSI-button-ok"
      }],
      listeners: {
        show: {
          fn: me.onWndShow,
          scope: me
        }
      }
    });

    me.callParent(arguments);
  },

  onWndShow: function () {
    Ext.getCmp("buttonAboutFormOK").focus();
  },

  onOK: function () {
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
