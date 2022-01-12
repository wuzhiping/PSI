/**
 * 主菜单维护 - 主界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.MainMenu.MainForm", {
  extend: "PSI.AFX.Form.MainForm",

  /**
   * 初始化组件
   */
  initComponent() {
    const me = this;

    Ext.apply(me, {
      tbar: me.getToolbarCmp(),
      layout: "border",
      items: [{
        region: "north", height: 2,
        border: 0,
      }, {
        region: "center",
        layout: "fit",
        border: 0,
        items: [me.getMainGrid()]
      }]
    });

    me.callParent(arguments);
  },

  getToolbarCmp() {
    const me = this;

    return [{
      text: "新增菜单",
      handler: me.onAddMenu,
      scope: me
    }, {
      text: "编辑菜单",
      id: "buttonEdit",
      handler: me.onEditMenu,
      scope: me
    }, {
      text: "删除菜单",
      id: "buttonDelete",
      handler: me.onDeleteMenu,
      scope: me
    }, "-", {
      text: "帮助",
      handler() {
        me.focus();
        const url = me.URL("Home/Help/index?t=mainMenuMaintain")
        window.open(url);
      }
    }, "-", {
      text: "关闭",
      handler() {
        me.closeWindow();
      }
    }];
  },

  getMainGrid() {
    const me = this;
    if (me.__mainGrid) {
      return me.__mainGrid;
    }

    const modelName = "PSIMainMenu";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "caption", "fid", "showOrder",
        "sysItem", "leaf", "children"]
    });

    const store = Ext.create("Ext.data.TreeStore", {
      model: modelName,
      proxy: {
        type: "ajax",
        actionMethods: {
          read: "POST"
        },
        url: me.URL("Home/MainMenu/allMenuItemsForMaintain")
      },
      listeners: {
      }
    });

    me.__mainGrid = Ext.create("Ext.tree.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("主菜单")
      },
      store: store,
      rootVisible: false,
      useArrows: true,
      columnLines: true,
      viewConfig: {
        loadMask: true
      },
      columns: {
        defaults: {
          sortable: false,
          menuDisabled: true,
          draggable: false
        },
        items: [{
          xtype: "treecolumn",
          text: "标题",
          dataIndex: "caption",
          width: 220
        }, {
          text: "fid",
          dataIndex: "fid",
          width: 220
        }, {
          text: "显示排序",
          dataIndex: "showOrder",
          width: 80
        }, {
          text: "性质",
          dataIndex: "sysItem",
          width: 120,
          renderer(value) {
            if (parseInt(value) == 1) {
              return "系统模块";
            } else {
              return "<span style='color:blue;'>自定义模块</span>";
            }
          }
        }]
      },
      listeners: {
        select: {
          fn: me.onMainGridSelect,
          scope: me
        }
      }
    });

    return me.__mainGrid;
  },

  onMainGridSelect(rowModel, record) {
    const sysItem = parseInt(record.get("sysItem")) == 1;
    Ext.getCmp("buttonEdit").setDisabled(sysItem);
    Ext.getCmp("buttonDelete").setDisabled(sysItem);
  },

  onAddMenu() {
    const me = this;

    const form = Ext.create("PSI.MainMenu.MenuItemEditForm", {
      parentForm: me
    });
    form.show();
  },

  onEditMenu() {
    const me = this;
    const item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要编辑的菜单项");
      return;
    }

    const menuItem = item[0];

    if (parseInt(menuItem.get("sysItem")) == 1) {
      me.showInfo("不能编辑系统菜单项");
      return;
    }

    const form = Ext.create("PSI.MainMenu.MenuItemEditForm", {
      entity: menuItem,
      parentForm: me
    });
    form.show();
  },

  onDeleteMenu() {
    const me = this;
    const item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要删除的菜单项");
      return;
    }

    const menuItem = item[0];

    if (parseInt(menuItem.get("sysItem")) == 1) {
      me.showInfo("不能删除系统菜单项");
      return;
    }

    const info = `请确认是否删除菜单项: <span style='color:red'>${menuItem.get("caption")}</span> ?`;

    const confirmFunc = () => {
      const el = Ext.getBody();
      el.mask("正在删除中...");

      const r = {
        url: me.URL("Home/MainMenu/deleteMenuItem"),
        params: {
          id: menuItem.get("id")
        },
        callback(options, success, response) {
          el.unmask();

          if (success) {
            const data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成删除操作");
              me.refreshMainGrid();
            } else {
              me.showInfo(data.msg);
            }
          }
        }
      };
      me.ajax(r);
    };

    me.confirm(info, confirmFunc);
  },

  refreshMainGrid() {
    const me = this;
    me.getMainGrid().getStore().load();
  }
});
