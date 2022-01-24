/**
 * 权限管理 - 主界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.Permission.MainForm", {
  extend: "PSI.AFX.Form.MainForm",

  config: {
    pAdd: "",
    pEdit: "",
    pDelete: ""
  },

  /**
   * 初始化组件
   * 
   * @override
   */
  initComponent() {
    const me = this;

    Ext.apply(me, {
      items: [{
        tbar: me.getToolbarCmp(),
        id: "panelQueryCmp",
        region: "north",
        border: 0,
        height: 65,
        header: false,
        collapsible: true,
        collapseMode: "mini",
        layout: {
          type: "table",
          columns: 4
        },
        items: me.getQueryCmp()
      }, {
        region: "center",
        layout: "fit",
        border: 0,
        items: [{
          layout: "border",
          border: 0,
          items: [{
            region: "north",
            height: "50%",
            border: 0,
            split: true,
            layout: "border",
            items: [{
              region: "center",
              layout: "fit",
              border: 0,
              items: [me.getPermissionGrid()]
            }, {
              region: "east",
              layout: "fit",
              width: "20%",
              border: 0,
              split: true,
              items: [me.getDataOrgGrid()]
            }]
          }, {
            xtype: "panel",
            region: "center",
            border: 0,
            layout: "fit",
            items: [me.getUserGrid()]
          }]
        }]
      }, {
        region: "west",
        layout: "fit",
        width: 250,
        split: true,
        border: 0,
        items: [me.getRoleGrid()]
      }]
    });

    me.callParent(arguments);

    me.roleGrid = me.getRoleGrid();
    me.permissionGrid = me.getPermissionGrid();
    me.userGrid = me.getUserGrid();

    me.refreshRoleGrid();

    // 查询控件input List
    me.__editorList = [Ext.getCmp("editQueryLoginName"), Ext.getCmp("editQueryName")];
  },

  /**
   * @private
   */
  getQueryCmp() {
    const me = this;
    return [{
      id: "editQueryLoginName",
      labelWidth: 60,
      labelAlign: "right",
      labelSeparator: "",
      fieldLabel: "登录名",
      margin: "5, 0, 0, 0",
      xtype: "textfield",
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      }
    }, {
      id: "editQueryName",
      labelWidth: 60,
      labelAlign: "right",
      labelSeparator: "",
      fieldLabel: "用户姓名",
      margin: "5, 0, 0, 0",
      xtype: "textfield",
      listeners: {
        specialkey: {
          fn: me.__onLastEditSpecialKey,
          scope: me
        }
      }
    }, {
      xtype: "container",
      items: [{
        xtype: "button",
        text: "查询",
        width: 100,
        height: 26,
        margin: "5, 0, 0, 20",
        handler: me._onQuery,
        scope: me
      }, {
        xtype: "button",
        text: "清空查询条件",
        width: 100,
        height: 26,
        margin: "5, 0, 0, 5",
        handler: me._onClearQuery,
        scope: me
      }, {
        xtype: "button",
        text: "隐藏工具栏",
        width: 130,
        height: 26,
        iconCls: "PSI-button-hide",
        margin: "5 0 0 10",
        handler() {
          Ext.getCmp("panelQueryCmp").collapse();
        },
        scope: me
      }]
    }];
  },

  /**
   * @private
   */
  getToolbarCmp() {
    const me = this;
    return [{
      text: "新建角色",
      handler: me._onAddRole,
      scope: me,
      disabled: me.getPAdd() == "0"
    }, {
      text: "编辑角色",
      handler: me._onEditRole,
      scope: me,
      disabled: me.getPEdit() == "0"
    }, {
      text: "删除角色",
      handler: me._onDeleteRole,
      scope: me,
      disabled: me.getPDelete() == "0"
    }, "-", {
      disabled: me.getPAdd() == "0",
      text: "工具",
      menu: [{
        text: "以复制当前角色的方式新建角色",
        handler: me._onCopyRole,
        scope: me,
        disabled: me.getPAdd() == "0"
      }]
    }, "-", {
      text: "指南",
      handler() {
        me.focus();
        window.open(me.URL("Home/Help/index?t=permission"));
      }
    }, "-", {
      text: "关闭",
      handler() {
        me.closeWindow();
      }
    }];
  },

  /**
   * @private
   */
  getRoleGrid() {
    const me = this;
    if (me.__roleGrid) {
      return me.__roleGrid;
    }

    const modelName = "PSIRole";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "name", "code"]
    });

    const roleStore = Ext.create("Ext.data.Store", {
      model: modelName,
      autoLoad: false,
      data: []
    });

    const roleGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("角色")
      },
      viewConfig: {
        enableTextSelection: true
      },
      store: roleStore,
      columns: {
        defaults: {
          sortable: false,
          menuDisabled: true,
        },
        items: [{
          header: "编码",
          dataIndex: "code",
          width: 100,
        }, {
          header: "角色名称",
          dataIndex: "name",
          flex: 1,
        }]
      },
      listeners: {
        itemdblclick: {
          fn: me._onEditRole,
          scope: me
        }
      },
    });

    roleGrid.on("itemclick", me._onRoleGridItemClick, me);

    me.__roleGrid = roleGrid;
    return me.__roleGrid;
  },

  /**
   * @private
   */
  getPermissionGrid() {
    const me = this;
    if (me._permissionGrid) {
      return me._permissionGrid;
    }

    const modelName = "PSIPermission";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "name", "dataOrg", "note"]
    });

    const permissionStore = Ext.create("Ext.data.Store", {
      model: modelName,
      autoLoad: false,
      data: []
    });

    me._permissionGrid = Ext.create("Ext.grid.Panel", {
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("权限")
      },
      cls: "PSI",
      store: permissionStore,
      columnLines: true,
      viewConfig: {
        enableTextSelection: true
      },
      columns: {
        defaults: {
          sortable: false,
          menuDisabled: true,
        },
        items: [Ext.create("Ext.grid.RowNumberer", {
          text: "#",
          align: "center",
          width: 60
        }), {
          header: "权限名称",
          dataIndex: "name",
          width: 200,
        }, {
          header: "说明",
          dataIndex: "note",
          flex: 1,
        }, {
          header: "数据域",
          dataIndex: "dataOrg",
          width: 100,
        }]
      },
      listeners: {
        itemclick: {
          fn: me._onPermissionGridItemClick,
          scope: me
        }
      }
    });

    return me._permissionGrid;
  },

  /**
   * @private
   */
  getUserGrid() {
    const me = this;
    if (me.__userGrid) {
      return me.__userGrid;
    }

    const modelName = "PSIUser";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "loginName", "name", "orgFullName",
        "enabled"]
    });

    const userStore = Ext.create("Ext.data.Store", {
      model: modelName,
      autoLoad: false,
      data: []
    });

    me.__userGrid = Ext.create("Ext.grid.Panel", {
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("用户")
      },
      viewConfig: {
        enableTextSelection: true
      },
      cls: "PSI",
      store: userStore,
      columns: {
        defaults: {
          sortable: false,
          menuDisabled: true,
        },
        items: [Ext.create("Ext.grid.RowNumberer", {
          text: "#",
          align: "center",
          width: 60
        }), {
          header: "用户姓名",
          dataIndex: "name",
          flex: 1
        }, {
          header: "登录名",
          dataIndex: "loginName",
          flex: 1
        }, {
          header: "所属组织",
          dataIndex: "orgFullName",
          flex: 1
        }]
      }
    });
    return me.__userGrid;
  },

  /**
   * 刷新角色Grid
   * 
   * @private
   */
  refreshRoleGrid(id) {
    const me = this;

    const grid = me.getRoleGrid();
    const store = grid.getStore();

    Ext.getBody().mask("数据加载中...");
    me.ajax({
      url: me.URL("Home/Permission/roleList"),
      params: {
        queryLoginName: Ext.getCmp("editQueryLoginName").getValue(),
        queryName: Ext.getCmp("editQueryName").getValue()
      },
      callback(options, success, response) {
        store.removeAll();

        if (success) {
          const data = me.decodeJSON(response.responseText);
          store.add(data);

          if (data.length > 0) {
            if (id) {
              const r = store.findExact("id", id);
              if (r != -1) {
                grid.getSelectionModel().select(r);
              }
            } else {
              grid.getSelectionModel().select(0);
            }
            me._onRoleGridItemClick();
          }
        }

        Ext.getBody().unmask();
      }
    });
  },

  /**
   * @private
   */
  _onRoleGridItemClick() {
    const me = this;
    me.getDataOrgGrid().getStore().removeAll();
    me.getDataOrgGrid().setTitle(me.formatGridHeaderTitle("数据域"));

    const grid = me.getPermissionGrid();

    const item = me.getRoleGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return;
    }

    const role = item[0].data;
    const store = grid.getStore();
    grid.setTitle(me.formatGridHeaderTitle(`<span class='PSI-title-keyword'>${role.name}</span> - 权限列表`));

    const el = grid.getEl() || Ext.getBody();

    el.mask("数据加载中...");
    me.ajax({
      url: me.URL("Home/Permission/permissionList"),
      params: {
        roleId: role.id
      },
      callback(options, success, response) {
        store.removeAll();

        if (success) {
          const data = me.decodeJSON(response.responseText);
          store.add(data);
        }

        el.unmask();
      }
    });

    const userGrid = me.getUserGrid();
    const userStore = userGrid.getStore();
    const userEl = userGrid.getEl() || Ext.getBody();
    userGrid.setTitle(me.formatGridHeaderTitle(`<span class='PSI-title-keyword'>${role.name}</span> - 人员列表`));
    userEl.mask("数据加载中...");
    me.ajax({
      url: me.URL("Home/Permission/userList"),
      params: {
        roleId: role.id
      },
      callback(options, success, response) {
        userStore.removeAll();

        if (success) {
          const data = me.decodeJSON(response.responseText);
          userStore.add(data);
        }

        userEl.unmask();
      }
    });
  },

  /**
   * 新增角色
   * 
   * @private
   */
  _onAddRole() {
    const me = this;
    const form = Ext.create("PSI.Permission.EditForm", {
      parentForm: me
    });

    form.show();
  },

  /**
   * 以复制方式新建角色
   * 
   * @private
   */
  _onCopyRole() {
    const me = this;
    const grid = me.getRoleGrid();
    const items = grid.getSelectionModel().getSelection();

    if (items == null || items.length != 1) {
      me.showInfo("请选择要编辑的角色");
      return;
    }

    const roleCopy = items[0];

    const form = Ext.create("PSI.Permission.EditForm", {
      parentForm: me,
      roleCopy
    });

    form.show();
  },

  /**
   * 编辑角色
   * 
   * @private
   */
  _onEditRole() {
    const me = this;

    const grid = me.getRoleGrid();
    const items = grid.getSelectionModel().getSelection();

    if (items == null || items.length != 1) {
      me.showInfo("请选择要编辑的角色");
      return;
    }

    const role = items[0].data;

    const form = Ext.create("PSI.Permission.EditForm", {
      entity: role,
      parentForm: me
    });

    form.show();
  },

  /**
   * 删除角色
   * 
   * @private
   */
  _onDeleteRole() {
    const me = this;
    const grid = me.getRoleGrid();
    const items = grid.getSelectionModel().getSelection();

    if (items == null || items.length != 1) {
      me.showInfo("请选择要删除的角色");
      return;
    }

    const role = items[0].data;

    const info = `请确认是否删除角色 <span style='color:red'>${role.name}</span> ?`;
    const funcConfirm = () => {
      Ext.getBody().mask("正在删除中...");
      const r = {
        url: me.URL("Home/Permission/deleteRole"),
        params: {
          id: role.id
        },
        callback(options, success, response) {
          Ext.getBody().unmask();

          if (success) {
            const data = Ext.JSON.decode(response.responseText);
            if (data.success) {
              me.refreshRoleGrid();
              me.tip("成功完成删除操作", true);
            } else {
              me.showInfo(data.msg);
            }
          }
        }
      };

      me.ajax(r);
    };

    me.confirm(info, funcConfirm);
  },

  /**
   * @private
   */
  getDataOrgGrid() {
    const me = this;
    if (me.__dataOrgGrid) {
      return me.__dataOrgGrid;
    }

    const modelName = "PSIPermissionDataOrg_MainForm";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["dataOrg", "fullName"]
    });

    const store = Ext.create("Ext.data.Store", {
      model: modelName,
      autoLoad: false,
      data: []
    });

    me.__dataOrgGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("数据域")
      },
      viewConfig: {
        enableTextSelection: true
      },
      store: store,
      columns: {
        defaults: {
          sortable: false,
          menuDisabled: true,
        },
        items: [{
          header: "数据域",
          dataIndex: "dataOrg",
          width: 120,
        }, {
          header: "组织机构/人",
          dataIndex: "fullName",
          flex: 1,
        }]
      }
    });

    return me.__dataOrgGrid;
  },

  /**
   * @private
   */
  _onPermissionGridItemClick() {
    const me = this;
    const roleGrid = me.getRoleGrid();
    let items = roleGrid.getSelectionModel().getSelection();

    if (items == null || items.length != 1) {
      return;
    }

    const role = items[0];

    const permissionGrid = me.getPermissionGrid();
    items = permissionGrid.getSelectionModel().getSelection();

    if (items == null || items.length != 1) {
      return;
    }
    const permission = items[0];

    const grid = me.getDataOrgGrid();
    const info = `<span class='PSI-title-keyword'>${role.get("name")}</span> -  <span class='PSI-title-keyword'>${permission.get("name")}</span>  - 数据域`
    grid.setTitle(me.formatGridHeaderTitle(info));

    const el = grid.getEl() || Ext.getBody();
    const store = grid.getStore();

    el.mask("数据加载中...");
    me.ajax({
      url: me.URL("Home/Permission/dataOrgList"),
      params: {
        roleId: role.get("id"),
        permissionId: permission.get("id")
      },
      callback(options, success, response) {
        store.removeAll();

        if (success) {
          const data = me.decodeJSON(response.responseText);
          store.add(data);
        }

        el.unmask();
      }
    });
  },

  /**
   * @private
   */
  _onClearQuery() {
    const me = this;

    Ext.getCmp("editQueryLoginName").setValue(null);
    Ext.getCmp("editQueryName").setValue(null);

    me._onQuery();
  },

  /**
   * @private
   */
  _onQuery() {
    const me = this;

    me.getPermissionGrid().getStore().removeAll();
    me.getPermissionGrid().setTitle("权限列表");
    me.getUserGrid().getStore().removeAll();
    me.getUserGrid().setTitle("用户列表");
    me.getDataOrgGrid().getStore().removeAll();
    me.getDataOrgGrid().setTitle("数据域");

    me.refreshRoleGrid();
  }
});
