/**
 * PSI的应用容器：承载主菜单、业务模块的UI
 */
Ext.define("PSI.App", {
  config: {
    userName: "",
    productionName: "PSI",
    showCopyright: false,
    showRecent: false
  },

  constructor(config) {
    const me = this;

    me.initConfig(config);

    me.createMainUI();

    if (config.appHeaderInfo) {
      me.setAppHeader(config.appHeaderInfo);
    }
  },

  // 创建UI：主菜单、常用功能、状态栏、模块主容器
  createMainUI() {
    const me = this;

    // mainPanel中放置各个具体模块的UI
    me.mainPanel = Ext.create("Ext.panel.Panel", {
      border: 0,
      layout: "fit"
    });

    Ext.define("PSIFId", {
      extend: "Ext.data.Model",
      fields: ["fid", "name"]
    });

    const storeRecentFid = Ext.create("Ext.data.Store", {
      autoLoad: false,
      model: "PSIFId",
      data: []
    });

    me.gridRecentFid = Ext.create("Ext.grid.Panel", {
      header: {
        title: "常用功能 - 根据使用频率自动生成",
        height: 28
      },
      border: 0,
      titleAlign: "center",
      cls: "PSI-recent-fid",
      forceFit: true,
      hideHeaders: true,
      tools: [{
        type: "close",
        handler() {
          Ext.getCmp("PSI_Main_RecentPanel").collapse();
        },
        scope: me
      }],
      columns: [{
        dataIndex: "name",
        menuDisabled: true,
        menuDisabled: true,
        sortable: false,
        width: 16,
        renderer(value, metaData, record) {
          const fid = record.get("fid");
          const fileName = PSI.Const.BASE_URL + "Public/Images/fid/fid" + fid + ".png";

          return "<a href='#' style='text-decoration:none'><img src='"
            + fileName
            + "' style='vertical-align: middle;margin:0px 5px 0px 5px'></img></a>";
        }
      }, {
        dataIndex: "name",
        menuDisabled: true,
        menuDisabled: true,
        sortable: false,
        renderer(value, metaData, record) {
          return "<a href='#' style='text-decoration:none'><span style='vertical-align: middle'>"
            + value + "</span></a>";
        }
      }, {
        dataIndex: "name",
        menuDisabled: true,
        menuDisabled: true,
        sortable: false,
        width: 30,
        hidden: PSI.Const.MOT != "0",
        renderer(v, m, r) {
          var fileName = PSI.Const.BASE_URL + "Public/Images/icons/open_in_new_window.png";
          var name = r.get("name");
          return "<a href='#'><img src='" + fileName + "' style='vertical-align: middle' title='新窗口打开【" + name + "】'></img></a>";
        }
      }],
      store: storeRecentFid
    });

    me.gridRecentFid.on("cellclick", function (me, td, cellIndex, r, tr, rowIndex, e, eOpts) {
      const fid = r.get("fid");

      const url = PSI.Const.BASE_URL + "Home/MainMenu/navigateTo/fid/" + fid + "/t/1";

      if (fid === "-9999") {
        PSI.MsgBox.confirm("请确认是否重新登录", function () {
          location.replace(url);
        });
      } else {
        if (PSI.Const.MOT == "0") {
          if (cellIndex == 2) {
            window.open(url);
          }
          else {
            location.replace(url);
          }
        } else {
          window.open(url);
        }
      }
    }, me);

    const year = new Date().getFullYear();

    me.vp = Ext.create("Ext.container.Viewport", {
      layout: "fit",
      items: [{
        id: "__PSITopPanel",
        xtype: "panel",
        border: 0,
        layout: "border",
        header: {
          cls: "PSI-App",
          height: 38,
          tools: []
        },
        items: [{
          region: "center",
          border: 0,
          layout: "fit",
          xtype: "panel",
          items: [me.mainPanel]
        }, {
          id: "PSI_Main_RecentPanel",
          xtype: "panel",
          region: "east",
          width: 250,
          maxWidth: 250,
          split: true,
          collapsible: true,
          collapseMode: "mini",
          collapsed: !me.getShowRecent(),
          header: false,
          border: 1,
          layout: "border",
          items: [{
            region: "center",
            layout: "fit",
            border: 0,
            items: me.gridRecentFid
          }, {
            region: "south",
            height: 30,
            border: 0,
            layout: "form",
            items: [{
              fieldLabel: "快捷访问",
              labelSeparator: "",
              margin: 5,
              labelAlign: "right",
              labelWidth: 60,
              emptyText: "双击此处弹出选择框",
              xtype: "psi_mainmenushortcutfield"
            }]
          }],
          listeners: {
            collapse: {
              fn: me.onRecentFidPanelCollapse,
              scope: me
            },
            expand: {
              fn: me.onRecentFidPanelExpand,
              scope: me
            }
          }
        }, {
          xtype: "panel",
          region: "south",
          hidden: !me.getShowCopyright(),
          height: 25,
          border: 0,
          header: {
            cls: "PSI-Copyright",
            titleAlign: "center",
            title: `Copyright &copy; 2015-${year} 艾格林门信息服务（大连）有限公司, All Rights Reserved`
          }
        }]
      }]
    });

    const el = Ext.getBody();
    el.mask("系统正在加载中...");

    Ext.Ajax.request({
      url: PSI.Const.BASE_URL + "Home/MainMenu/mainMenuItems",
      method: "POST",
      callback(opt, success, response) {
        if (success) {
          const data = Ext.JSON.decode(response.responseText);
          me.createMainMenu(data);
          me.refreshRectFidGrid();
        }

        el.unmask();
      },
      scope: me
    });
  },

  // 刷新常用功能Grid中的数据
  refreshRectFidGrid: function () {
    var me = this;

    var el = me.gridRecentFid.getEl() || Ext.getBody();
    el.mask("系统正在加载中...");
    var store = me.gridRecentFid.getStore();
    store.removeAll();

    Ext.Ajax.request({
      url: PSI.Const.BASE_URL + "Home/MainMenu/recentFid",
      method: "POST",
      callback: function (opt, success, response) {
        if (success) {
          var data = Ext.JSON.decode(response.responseText);
          store.add(data);
        }
        el.unmask();
      },
      scope: me
    });
  },

  // 创建主菜单
  createMainMenu: function (root) {
    var me = this;

    var menuItemClick = function () {
      var fid = this.fid;

      if (fid == "-9995") {
        me.vp.focus();
        window.open(PSI.Const.BASE_URL + "Home/Help/index");
      } else if (fid === "-9999") {
        // 重新登录
        PSI.MsgBox.confirm("请确认是否重新登录", function () {
          location.replace(PSI.Const.BASE_URL + "Home/MainMenu/navigateTo/fid/-9999");
        });
      } else {
        me.vp.focus();

        var url = PSI.Const.BASE_URL + "Home/MainMenu/navigateTo/fid/" + fid;
        if (PSI.Const.MOT == "0") {
          location.replace(url);
        } else {
          window.open(url);
        }
      }
    };

    var mainMenu = [];
    for (var i = 0; i < root.length; i++) {
      var m1 = root[i];

      var menuItem = Ext.create("Ext.menu.Menu", { plain: true, bodyCls: "PSI-App-MainMenu" });
      for (var j = 0; j < m1.children.length; j++) {
        var m2 = m1.children[j];

        if (m2.children.length === 0) {
          // 只有二级菜单
          if (m2.fid) {
            menuItem.add({
              text: m2.caption,
              fid: m2.fid,
              handler: menuItemClick,
              iconCls: "PSI-fid" + m2.fid
            });
          }
        } else {
          var menuItem2 = Ext.create("Ext.menu.Menu", { plain: true, bodyCls: "PSI-App-MainMenu" });

          menuItem.add({
            text: m2.caption,
            menu: menuItem2
          });

          // 三级菜单
          for (var k = 0; k < m2.children.length; k++) {
            var m3 = m2.children[k];
            menuItem2.add({
              text: m3.caption,
              fid: m3.fid,
              handler: menuItemClick,
              iconCls: "PSI-fid" + m3.fid
            });
          }
        }
      }

      if (m1.children.length > 0) {
        mainMenu.push({
          text: m1.caption,
          menu: menuItem
        });
      }
    }

    var mainToolbar = Ext.create("Ext.toolbar.Toolbar", {
      cls: "PSI-App-MainMenu",
      border: 0,
      dock: "top"
    });
    mainToolbar.add(mainMenu);

    var theCmp = me.vp.getComponent(0);
    theCmp.addTool(mainToolbar);
    var spacers = [];
    for (var i = 0; i < 10; i++) {
      spacers.push({
        xtype: "tbspacer"
      });
    }
    theCmp.addTool(spacers);

    // 右上角显示当前登录用户名
    var uname = me.getUserName();
    var index = uname.lastIndexOf("\\");
    var shortName = uname.substring(index + 1);
    theCmp.addTool({
      xtype: "tbtext",
      text: "<span style='color:#8c8c8c;font-weight:bold;font-size:13px' title=" + uname + ">"
        + shortName + "</span>"
    });
  },

  // 设置模块的标题
  // 这个方法最初是给View中公开调用的
  // 现在已经在构造函数里面自动调用了，所以可以视为是私有方法了
  // 不再推荐在View中调用
  setAppHeader: function (header) {
    if (!header) {
      return;
    }
    var panel = Ext.getCmp("__PSITopPanel");
    var title = "<span style='font-size:140%;color:#c7c6c6;font-weight:bold;'>"
      + header.title + " - " + this.getProductionName() + "</span>";
    panel.setTitle(title);
  },

  add: function (comp) {
    this.mainPanel.add(comp);
  }
});
