/**
 * 权限 - 角色新增或编辑界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.Permission.EditForm", {
  extend: "PSI.AFX.Form.EditForm",

  config: {
    roleCopy: null
  },

  /**
   * @override
   */
  initComponent() {
    const me = this;
    const entity = me.getEntity();

    Ext.define("PSIPermission", {
      extend: "Ext.data.Model",
      fields: ["id", "name", "dataOrg", "dataOrgFullName"]
    });

    const permissionStore = Ext.create("Ext.data.Store", {
      model: "PSIPermission",
      autoLoad: false,
      data: []
    });

    const permissionGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("角色的权限")
      },
      padding: 5,
      selModel: {
        mode: "MULTI"
      },
      selType: "checkboxmodel",
      store: permissionStore,
      columns: [{
        header: "权限名称",
        dataIndex: "name",
        flex: 2,
        menuDisabled: true
      }, {
        header: "数据域",
        dataIndex: "dataOrg",
        flex: 1,
        menuDisabled: true
      }, {
        header: "操作",
        align: "center",
        menuDisabled: true,
        width: 50,
        xtype: "actioncolumn",
        items: [{
          icon: me.URL("Public/Images/icons/delete.png"),
          handler(grid, row) {
            var store = grid.getStore();
            store.remove(store.getAt(row));
          },
          scope: this
        }]
      }],
      tbar: [{
        text: "添加权限",
        handler: me.onAddPermission,
        scope: me,
        iconCls: "PSI-button-add"
      }, "-", {
        text: "移除权限",
        handler: me.onRemovePermission,
        scope: me,
        iconCls: "PSI-button-delete"
      }, "-", {
        text: "编辑数据域",
        handler: me.onEditDataOrg,
        scope: me,
        iconCls: "PSI-button-edit"
      }]
    });

    me.permissionGrid = permissionGrid;

    Ext.define("PSIUser", {
      extend: "Ext.data.Model",
      fields: ["id", "loginName", "name", "orgFullName",
        "enabled"]
    });

    const userStore = Ext.create("Ext.data.Store", {
      model: "PSIUser",
      autoLoad: false,
      data: []
    });

    const userGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("属于当前角色的用户")
      },
      padding: 5,
      selModel: {
        mode: "MULTI"
      },
      selType: "checkboxmodel",
      store: userStore,
      columns: [{
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
      }, {
        header: "操作",
        align: "center",
        menuDisabled: true,
        width: 50,
        xtype: "actioncolumn",
        items: [{
          icon: me.URL("Public/Images/icons/delete.png"),
          handler(grid, row) {
            var store = grid.getStore();
            store.remove(store.getAt(row));
          },
          scope: me
        }]
      }],
      tbar: [{
        text: "添加用户",
        iconCls: "PSI-button-add",
        handler: me.onAddUser,
        scope: me
      }, "-", {
        text: "移除用户",
        iconCls: "PSI-button-delete",
        handler: me.onRemoveUser,
        scope: me
      }]
    });

    me.userGrid = userGrid;

    const t = entity == null ? "新建角色" : "编辑角色";
    const title = me.formatTitle(t);

    Ext.apply(me, {
      header: {
        title,
        height: 40,
      },
      maximized: true,
      width: 700,
      height: 600,
      layout: "border",
      items: [{
        xtype: "panel",
        region: "north",
        layout: "fit",
        height: 40,
        border: 0,
        items: [{
          id: "editForm",
          xtype: "form",
          layout: {
            type: "table",
            columns: 2
          },
          border: 0,
          bodyPadding: 5,
          defaultType: 'textfield',
          fieldDefaults: {
            labelWidth: 60,
            labelAlign: "right",
            labelSeparator: "",
            msgTarget: 'side',
            width: 670,
            margin: "5"
          },
          items: [{
            xtype: "hidden",
            name: "id",
            value: entity == null
              ? null
              : entity.id
          }, {
            id: "editName",
            fieldLabel: "角色名称",
            allowBlank: false,
            blankText: "没有输入角色名称",
            beforeLabelTextTpl: PSI.Const.REQUIRED,
            name: "name",
            value: entity == null
              ? null
              : entity.name
          }, {
            id: "editCode",
            fieldLabel: "角色编码",
            blankText: "没有输入角色编码",
            allowBlank: false,
            beforeLabelTextTpl: PSI.Const.REQUIRED,
            name: "code",
            value: entity == null
              ? null
              : entity.code,
            width: 200
          }, {
            id: "editPermissionIdList",
            xtype: "hidden",
            name: "permissionIdList"
          }, {
            id: "editDataOrgList",
            xtype: "hidden",
            name: "dataOrgList"
          }, {
            id: "editUserIdList",
            xtype: "hidden",
            name: "userIdList"
          }]
        }]
      }, {
        xtype: "panel",
        region: "center",
        flex: 1,
        border: 0,
        layout: "border",
        items: [{
          region: "center",
          layout: "fit",
          border: 0,
          items: [permissionGrid]
        }]
      }, {
        xtype: "panel",
        region: "south",
        flex: 1,
        border: 0,
        layout: "fit",
        items: [userGrid]
      }],
      tbar: [{
        text: "确定",
        formBind: true,
        iconCls: "PSI-button-ok",
        handler() {
          var me = this;
          me.confirm("请确认是否保存数据?", () => {
            me.onOK();
          });
        },
        scope: me
      }, "-", {
        text: "取消",
        handler() {
          var me = this;
          me.confirm("请确认是否取消操作?", () => {
            me.close();
          });
        },
        scope: me
      }],
      listeners: {
        show: {
          fn: me.onWndShow,
          scope: me
        },
        close: {
          fn: me.onWndClose,
          scope: me
        }
      }
    });

    me.callParent(arguments);

    me.editName = Ext.getCmp("editName");
    me.editCode = Ext.getCmp("editCode");
  },

  onWndClose() {
    const me = this;

    Ext.get(window).un('beforeunload', me.__onWindowBeforeUnload);
  },

  loadDataForCopy() {
    const me = this;
    const roleCopy = me.getRoleCopy();

    const roleName = roleCopy.get("name");
    me.editName.setValue(roleName + " - (复制，请修改)");
    me.editCode.setValue(roleCopy.get("code") + " - (复制，请修改)");

    // 获得数据
    const store = me.permissionGrid.getStore();
    const el = me.getEl() || Ext.getBody();
    const roleId = roleCopy.get("id");
    el.mask("数据加载中...");
    me.ajax({
      url: me.URL("Home/Permission/permissionList"),
      params: {
        roleId
      },
      callback(options, success, response) {
        store.removeAll();

        if (success) {
          const data = Ext.JSON.decode(response.responseText);
          store.add(data);
        }

        el.unmask();
      }
    });

    const userGrid = me.userGrid;
    const userStore = userGrid.getStore();
    const userEl = userGrid.getEl() || Ext.getBody();
    userGrid.setTitle("属于角色 [" + roleName + "] 的人员列表");
    userEl.mask("数据加载中...");
    me.ajax({
      url: me.URL("Home/Permission/userList"),
      params: {
        roleId
      },
      callback(options, success, response) {
        userStore.removeAll();

        if (success) {
          var data = Ext.JSON.decode(response.responseText);
          userStore.add(data);
        }

        userEl.unmask();
      }
    });

  },

  onWndShow() {
    const me = this;

    me.editName.focus();

    Ext.get(window).on('beforeunload', me.__onWindowBeforeUnload);

    const entity = me.getEntity();
    if (!entity) {
      const roleCopy = me.getRoleCopy();
      if (roleCopy) {
        // 以复制方式新建角色
        me.loadDataForCopy();
      }

      return;
    }

    me.editName.setValue(me.editName.getValue());

    const store = me.permissionGrid.getStore();
    const el = me.getEl() || Ext.getBody();

    el.mask("数据加载中...");
    me.ajax({
      url: me.URL("Home/Permission/permissionList"),
      params: {
        roleId: entity.id
      },
      callback(options, success, response) {
        store.removeAll();

        if (success) {
          const data = Ext.JSON.decode(response.responseText);
          store.add(data);
        }

        el.unmask();
      }
    });

    const userGrid = me.userGrid;
    const userStore = userGrid.getStore();
    const userEl = userGrid.getEl() || Ext.getBody();
    userGrid.setTitle("属于角色 [" + entity.name + "] 的人员列表");
    userEl.mask("数据加载中...");
    me.ajax({
      url: me.URL("Home/Permission/userList"),
      params: {
        roleId: entity.id
      },
      callback(options, success, response) {
        userStore.removeAll();

        if (success) {
          var data = Ext.JSON.decode(response.responseText);
          userStore.add(data);
        }

        userEl.unmask();
      }
    });

  },

  setSelectedPermission(data, dataOrgList, fullNameList) {
    const me = this;

    const store = me.permissionGrid.getStore();

    const cnt = data.length;

    const d = [];

    for (let i = 0; i < cnt; i++) {
      const item = data[i];
      d.push({
        id: item.id,
        name: item.name,
        dataOrg: dataOrgList,
        dataOrgFullName: fullNameList
      });
    }

    store.add(d);
  },

  setSelectedUsers(data) {
    const me = this;

    const store = me.userGrid.getStore();

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      store.add({
        id: item.get("id"),
        name: item.get("name"),
        loginName: item.get("loginName"),
        orgFullName: item.get("orgFullName")
      });
    }
  },

  onOK() {
    const me = this;
    const editName = Ext.getCmp("editName");

    const name = editName.getValue();
    if (name == null || name == "") {
      me.showInfo("没有输入角色名称", () => {
        editName.focus();
      });
      return;
    }
    const editCode = Ext.getCmp("editCode");
    const code = editCode.getValue();
    if (code == null || code == "") {
      me.showInfo("没有输入角色编码", () => {
        editCode.focus();
      });
      return;
    }

    let store = me.permissionGrid.getStore();
    let data = store.data;
    let idList = [];
    const dataOrgList = [];
    for (let i = 0; i < data.getCount(); i++) {
      const item = data.items[i].data;
      idList.push(item.id);
      dataOrgList.push(item.dataOrg);
    }

    const editPermissionIdList = Ext.getCmp("editPermissionIdList");
    editPermissionIdList.setValue(idList.join());

    Ext.getCmp("editDataOrgList").setValue(dataOrgList.join(","));

    store = me.userGrid.getStore();
    data = store.data;
    idList = [];
    for (let i = 0; i < data.getCount(); i++) {
      const item = data.items[i].data;
      idList.push(item.id);
    }

    const editUserIdList = Ext.getCmp("editUserIdList");
    editUserIdList.setValue(idList.join());

    const editForm = Ext.getCmp("editForm");
    const el = this.getEl() || Ext.getBody();
    el.mask("数据保存中...");

    editForm.submit({
      url: me.URL("Home/Permission/editRole"),
      method: "POST",
      success(form, action) {
        el.unmask();
        me.close();
        me.getParentForm().refreshRoleGrid(action.result.id);
        me.tip("数据保存成功");
      },
      failure(form, action) {
        el.unmask();
        me.showInfo(action.result.msg, () => {
          editName.focus();
        });
      }
    });
  },

  onAddPermission() {
    const me = this;

    const store = me.permissionGrid.getStore();
    const data = store.data;
    const idList = [];
    for (let i = 0; i < data.getCount(); i++) {
      const item = data.items[i].data;
      idList.push(item.id);
    }

    const form = Ext.create("PSI.Permission.SelectPermissionForm", {
      idList: idList,
      parentForm: me
    });
    form.show();
  },

  onRemovePermission() {
    const me = this;

    const grid = me.permissionGrid;

    const items = grid.getSelectionModel().getSelection();
    if (items == null || items.length == 0) {
      me.showInfo("请选择要移除的权限");
      return;
    }

    grid.getStore().remove(items);
  },

  onAddUser() {
    const me = this;

    const store = me.userGrid.getStore();
    const data = store.data;
    const idList = [];
    for (let i = 0; i < data.getCount(); i++) {
      const item = data.items[i].data;
      idList.push(item.id);
    }

    const form = Ext.create("PSI.Permission.SelectUserForm", {
      idList: idList,
      parentForm: me
    });

    form.show();
  },

  onRemoveUser() {
    const me = this;

    const grid = me.userGrid;

    const items = grid.getSelectionModel().getSelection();
    if (items == null || items.length == 0) {
      me.showInfo("请选择要移除的人员");
      return;
    }

    grid.getStore().remove(items);
  },

  getDataOrgGrid() {
    const me = this;
    if (me.__dataOrgGrid) {
      return me.__dataOrgGrid;
    }
    const modelName = "PSIPermissionDataOrg_EditForm";
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
      title: "数据域",
      store: store,
      padding: 5,
      tbar: [{
        text: "设置数据域"
      }],
      columns: [{
        header: "数据域",
        dataIndex: "dataOrg",
        flex: 1,
        menuDisabled: true
      }, {
        header: "组织机构/人",
        dataIndex: "fullName",
        flex: 2,
        menuDisabled: true
      }]
    });

    return me.__dataOrgGrid;
  },

  onEditDataOrg() {
    const me = this;

    const grid = me.permissionGrid;

    const items = grid.getSelectionModel().getSelection();
    if (items == null || items.length == 0) {
      me.showInfo("请选择要编辑数据域的权限");
      return;
    }

    const form = Ext.create("PSI.Permission.SelectDataOrgForm", {
      editForm: me
    });
    form.show();
  },

  /**
   * PSI.Permission.SelectDataOrgForm中回调本方法
   */
  onEditDataOrgCallback(dataOrg) {
    const me = this;

    const grid = me.permissionGrid;

    const items = grid.getSelectionModel().getSelection();
    if (items == null || items.length == 0) {
      return;
    }

    for (let i = 0; i < items.length; i++) {
      items[i].set("dataOrg", dataOrg);
    }
  }
});
