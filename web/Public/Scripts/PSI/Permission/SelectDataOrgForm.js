/**
 * 选择数据域
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.Permission.SelectDataOrgForm", {
  extend: "PSI.AFX.Form.EditForm",

  config: {
    // 出现parentForm和editForm
    // 是因为本窗体用在了PSI.Permission.EditForm和PSI.Permission.SelectPermissionForm中
    // 这两处，各自都需要回调，所以用了两个config
    // 这是很糟糕的设计
    parentForm: null,
    /**
     * editForm: PSI.Permission.EditForm
     */
    editForm: null
  },

  width: 600,
  height: 500,
  modal: true,
  layout: "fit",

  initComponent() {
    const me = this;

    Ext.apply(me, {
      header: {
        height: 40,
        title: me.formatTitle("选择数据域")
      },
      items: [me.getMainGrid()],
      buttons: [{
        text: "把数据域设置为[本人数据]",
        handler: me.onSetSelf,
        scope: me
      }, {
        text: "确定",
        formBind: true,
        iconCls: "PSI-button-ok",
        handler: me.onOK,
        scope: me
      }, {
        text: "取消",
        handler() {
          me.close();
        },
        scope: me
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
    const me = this;
    const store = me.getMainGrid().getStore();

    const el = me.getEl() || Ext.getBody();
    el.mask("数据加载中...");
    Ext.Ajax.request({
      url: PSI.Const.BASE_URL
        + "Home/Permission/selectDataOrg",
      params: {},
      method: "POST",
      callback(options, success, response) {
        if (success) {
          const data = Ext.JSON.decode(response.responseText);
          store.add(data);
        }

        el.unmask();
      }
    });
  },

  onOK() {
    const me = this;
    const grid = me.getMainGrid();

    const items = grid.getSelectionModel().getSelection();
    if (items == null || items.length == 0) {
      PSI.MsgBox.showInfo("没有选择数据域");

      return;
    }

    const fullNameList = [];
    const dataOrgList = [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      fullNameList.push(it.get("fullName"));
      dataOrgList.push(it.get("dataOrg"));
    }

    if (me.getParentForm()) {
      me.getParentForm().setDataOrgList(fullNameList.join(";"),
        dataOrgList.join(";"));
    }

    const editForm = me.getEditForm();
    if (editForm) {
      editForm.getEl().mask("数据域更改中...");
      Ext.Function.defer(() => {
        editForm.onEditDataOrgCallback.apply(editForm, [dataOrgList.join(";")]);
        editForm.getEl().unmask();
      }, 100);
    }

    me.close();
  },

  getMainGrid() {
    const me = this;
    if (me.__mainGrid) {
      return me.__mainGrid;
    }

    const modelName = "PSIModel.PSI.Permission.SelectDataOrgForm.DataOrgModel";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "fullName", "dataOrg"]
    });

    const store = Ext.create("Ext.data.Store", {
      model: modelName,
      autoLoad: false,
      data: []
    });

    me.__mainGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      padding: 5,
      selModel: {
        mode: "MULTI"
      },
      selType: "checkboxmodel",
      store: store,
      columnLines: true,
      columns: [{
        header: "组织机构",
        dataIndex: "fullName",
        flex: 2,
        menuDisabled: true
      }, {
        header: "数据域",
        dataIndex: "dataOrg",
        flex: 1,
        menuDisabled: true
      }]
    });

    return me.__mainGrid;
  },

  onSetSelf() {
    const me = this;
    if (me.getParentForm()) {
      me.getParentForm().setDataOrgList("[本人数据]", "#");
    }

    if (me.getEditForm()) {
      me.getEditForm().onEditDataOrgCallback("#");
    }

    me.close();
  }
});
