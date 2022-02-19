/**
 * 关于窗体
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
PCL.define("PSI.About.MainForm", {
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
  width: 700,
  layout: "fit",

  initComponent() {
    const me = this;

    const year = new Date().getFullYear();
    const c = `Copyright &copy; 2015-${year} 艾格林门信息服务（大连）有限公司, All Rights Reserved`;

    Ext.apply(me, {
      header: {
        title: `<span style='font-size:160%'>关于 - ${me.getProductionName()}</span>`,
        iconCls: "PSI-fid-9994",
        height: 40
      },
      height: 400,
      bodyCls: "PSI-About-body",
      items: [{
        border: 0,
        xtype: "container",
        margin: "0 0 0 10",
        cls: "PSI-about",
        html: `
              <h1 style='color:#0050b3'>${me.getProductionName()}基于开源技术，提供人、财、物、产、供、销、存一体化的企业管理全面解决方案</h1>
              <h3>当前版本：${PSI.Const.VERSION}</h3>
              <h3>官网&nbsp;<a style='text-decoration:none;' href='https://gitee.com/crm8000/PSI' target='_blank'>https://gitee.com/crm8000/PSI</a></h3>
              <p>PHP版本号: ${me.getPhpVersion()} , MySQL版本号: ${me.getMySQLVersion()}</p>
              <p>数据库表结构版本号: ${me.getPSIDBVersion()}</p>
              <p>数据库表结构更新时间: ${me.getPSIDBUpdateDT()}</p>
              <p>UI组件PCL版本号：${PCL.VERSION}</p>
              <p>${c}</p>
              `
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

  onWndShow() {
    Ext.getCmp("buttonAboutFormOK").focus();
  },

  onOK() {
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
