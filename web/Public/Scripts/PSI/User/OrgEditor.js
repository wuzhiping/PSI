/**
 * 自定义字段 - 组织机构字段
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.User.OrgEditor", {
  extend: "Ext.form.field.Trigger",
  alias: "widget.PSI_org_editor",

  initComponent() {
    const me = this;

    me.enableKeyEvents = true;

    me.callParent(arguments);

    me.on("keydown", (field, e) => {
      if (e.getKey() === e.BACKSPACE) {
        e.preventDefault();
        return false;
      }

      if (e.getKey() !== e.ENTER) {
        me.onTriggerClick(e);
      }
    });

    me.on("render", (p) => {
      p.getEl().on("dblclick", () => {
        me.onTriggerClick();
      });
    });
  },

  onTriggerClick(e) {
    const me = this;

    Ext.define("PSIOrgModel_PSI_org_editor", {
      extend: "Ext.data.Model",
      fields: ["id", "text", "fullName", "orgCode",
        "leaf", "children"]
    });

    const orgStore = Ext.create("Ext.data.TreeStore", {
      model: "PSIOrgModel_PSI_org_editor",
      proxy: {
        type: "ajax",
        actionMethods: {
          read: "POST"
        },
        extraParams: {
          enabled: -1
        },
        url: PSI.Const.BASE_URL + "Home/User/allOrgs"
      }
    });

    const orgTree = Ext.create("Ext.tree.Panel", {
      cls: "PSI",
      store: orgStore,
      rootVisible: false,
      useArrows: true,
      viewConfig: {
        loadMask: true
      },
      columns: {
        defaults: {
          flex: 1,
          sortable: false,
          menuDisabled: true,
          draggable: false
        },
        items: [{
          xtype: "treecolumn",
          text: "名称",
          dataIndex: "text",
          flex: 2
        }, {
          text: "编码",
          dataIndex: "orgCode"
        }]
      }
    });
    orgTree.on("itemdblclick", me.onOK, me);
    me.tree = orgTree;

    const wnd = Ext.create("Ext.window.Window", {
      title: "选择组织机构",
      modal: true,
      width: 500,
      height: 300,
      layout: "fit",
      items: [orgTree],
      buttons: [{
        text: "确定",
        handler: me.onOK,
        scope: me
      }, {
        text: "取消",
        handler() {
          wnd.close();
        }
      }]
    });
    me.wnd = wnd;
    wnd.show();
  },

  onOK() {
    const me = this;

    const tree = me.tree;
    const item = tree.getSelectionModel().getSelection();

    if (item === null || item.length !== 1) {
      PSI.MsgBox.showInfo("没有选择组织机构");

      return;
    }

    const data = item[0].data;
    const parentItem = this.initialConfig.parentItem;
    if (parentItem && parentItem.setOrg) {
      parentItem.setOrg(data);
    }
    me.wnd.close();
    me.focus();
  }
});
