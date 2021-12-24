/**
 * 自定义字段 - 组织机构字段,用数据域过滤
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.User.OrgWithDataOrgField", {
  extend: "Ext.form.field.Trigger",
  alias: "widget.psi_orgwithdataorgfield",

  initComponent() {
    var me = this;

    me.__idValue = null;

    me.enableKeyEvents = true;

    me.callParent(arguments);

    me.on("keydown", (field, e) => {
      if (e.getKey() == e.BACKSPACE) {
        field.setValue(null);
        me.setIdValue(null);
        e.preventDefault();
        return false;
      }

      if (e.getKey() !== e.ENTER) {
        this.onTriggerClick(e);
      }
    });
    me.on({
      render(p) {
        p.getEl().on("dblclick", () => {
          me.onTriggerClick();
        });
      },
      single: true
    });
  },

  onTriggerClick(e) {
    var me = this;

    if (me.readOnly) {
      return;
    }

    var modelName = "PSIOrgModel_OrgWithDataOrgField";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "fullName"]
    });

    var orgStore = Ext.create("Ext.data.Store", {
      model: modelName,
      autoLoad: false,
      data: []
    });

    var orgTree = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      store: orgStore,
      columns: [{
        header: "组织机构",
        dataIndex: "fullName",
        flex: 1,
        menuDisabled: true,
        sortable: false
      }]
    });
    orgTree.on("itemdblclick", this.onOK, this);
    this.tree = orgTree;

    var wnd = Ext.create("Ext.window.Window", {
      title: "选择组织机构",
      border: 0,
      header: false,
      width: 500,
      height: 400,
      layout: "fit",
      items: [orgTree],
      buttons: [{
        text: "确定",
        handler: this.onOK,
        scope: this
      }, {
        text: "取消",
        handler() {
          wnd.close();
        }
      }]
    });
    this.wnd = wnd;

    wnd.on("deactivate", () => {
      wnd.close();
    });

    wnd.showBy(this);

    me.refreshGrid();
  },

  refreshGrid() {
    var me = this;
    var grid = me.tree;

    var el = grid.getEl() || Ext.getBody();
    el.mask(PSI.Const.LOADING);
    Ext.Ajax.request({
      url: PSI.Const.BASE_URL + "Home/User/orgWithDataOrg",
      method: "POST",
      callback(options, success, response) {
        var store = grid.getStore();

        store.removeAll();

        if (success) {
          var data = Ext.JSON.decode(response.responseText);
          store.add(data);
        }

        el.unmask();
      }
    });
  },

  onOK() {
    var me = this;

    var tree = me.tree;
    var item = tree.getSelectionModel().getSelection();

    if (item === null || item.length !== 1) {
      PSI.MsgBox.showInfo("没有选择组织机构");

      return;
    }

    var data = item[0];

    me.setIdValue(data.get("id"));
    me.setValue(data.get("fullName"));
    me.wnd.close();
    me.focus();
  },

  setIdValue(id) {
    this.__idValue = id;
  },

  getIdValue() {
    return this.__idValue;
  }
});
