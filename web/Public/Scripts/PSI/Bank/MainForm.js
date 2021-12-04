/**
 * 银行账户 - 主界面
 * 
 * @author 李静波
 */
Ext.define("PSI.Bank.MainForm", {
  extend: "PSI.AFX.Form.MainForm",

  /**
   * 初始化组件
   */
  initComponent() {
    const me = this;

    Ext.apply(me, {
      layout: "border",
      tbar: me.getToolbarCmp(),
      items: [{
        region: "west",
        width: 300,
        layout: "fit",
        border: 0,
        split: true,
        items: [me.getCompanyGrid()]
      }, {
        region: "center",
        xtype: "panel",
        layout: "fit",
        border: 0,
        items: [me.getMainGrid()]
      }]
    });

    me.callParent(arguments);

    me.refreshCompanyGrid();
  },

  getToolbarCmp() {
    const me = this;
    return [{
      text: "新建银行账户",
      handler: me.onAddBank,
      scope: me
    }, "-", {
      text: "编辑银行账户",
      handler: me.onEditBank,
      scope: me
    }, "-", {
      text: "删除银行账户",
      handler: me.onDeleteBank,
      scope: me
    }, "-", {
      text: "关闭",
      handler() {
        me.closeWindow();
      }
    }];
  },

  refreshCompanyGrid() {
    const me = this;
    const el = Ext.getBody();
    const store = me.getCompanyGrid().getStore();
    el.mask(PSI.Const.LOADING);
    const r = {
      url: me.URL("Home/Bank/companyList"),
      callback: function (options, success, response) {
        store.removeAll();

        if (success) {
          const data = me.decodeJSON(response.responseText);
          store.add(data);
          if (store.getCount() > 0) {
            me.getCompanyGrid().getSelectionModel()
              .select(0);
          }
        }

        el.unmask();
      }
    };
    me.ajax(r);
  },

  refreshMainGrid() {
    const me = this;

    me.getMainGrid().setTitle(me.formatGridHeaderTitle("银行账户"));
    const item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return;
    }

    const company = item[0];
    const title = `${company.get("name")} - 银行账户`;
    me.getMainGrid().setTitle(me.formatGridHeaderTitle(title));

    const el = me.getMainGrid().getEl();
    const store = me.getMainGrid().getStore();
    el && el.mask(PSI.Const.LOADING);
    const r = {
      params: {
        companyId: company.get("id")
      },
      url: me.URL("Home/Bank/bankList"),
      callback(options, success, response) {
        store.removeAll();

        if (success) {
          const data = me.decodeJSON(response.responseText);
          store.add(data);
          if (store.getCount() > 0) {
            me.getMainGrid().getSelectionModel().select(0);
          }
        }

        el && el.unmask();
      }
    };
    me.ajax(r);
  },

  getCompanyGrid() {
    const me = this;
    if (me.__companyGrid) {
      return me.__companyGrid;
    }

    const modelName = "PSI_Bank_CompanyModel";

    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "code", "name", "orgType"]
    });

    me.__companyGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("核算组织机构")
      },
      forceFit: true,
      columnLines: true,
      columns: [{
        header: "编码",
        dataIndex: "code",
        menuDisabled: true,
        sortable: false,
        width: 70
      }, {
        header: "组织机构名称",
        dataIndex: "name",
        flex: 1,
        menuDisabled: true,
        sortable: false
      }, {
        header: "组织机构性质",
        dataIndex: "orgType",
        width: 100,
        menuDisabled: true,
        sortable: false
      }],
      store: Ext.create("Ext.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      }),
      listeners: {
        select: {
          fn: me.onCompanyGridSelect,
          scope: me
        }
      }
    });
    return me.__companyGrid;
  },

  getMainGrid() {
    const me = this;
    if (me.__mainGrid) {
      return me.__mainGrid;
    }

    const modelName = "PSI_Bank_BankAccountModel";

    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "bankName", "bankNumber", "memo"]
    });

    me.__mainGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("银行账户")
      },
      columnLines: true,
      columns: [{
        header: "银行",
        dataIndex: "bankName",
        menuDisabled: true,
        sortable: false,
        width: 300
      }, {
        header: "账号",
        dataIndex: "bankNumber",
        width: 300,
        menuDisabled: true,
        sortable: false
      }, {
        header: "备注",
        dataIndex: "memo",
        width: 200,
        menuDisabled: true,
        sortable: false
      }],
      store: Ext.create("Ext.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      })
    });
    return me.__mainGrid;
  },

  onCompanyGridSelect() {
    const me = this;

    me.refreshMainGrid();
  },

  onAddBank() {
    const me = this;

    const item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择公司");
      return;
    }

    const company = item[0];

    const form = Ext.create("PSI.Bank.EditForm", {
      parentForm: me,
      company: company
    });
    form.show();
  },

  onEditBank() {
    const me = this;
    let item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择公司");
      return;
    }

    const company = item[0];

    item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择要编辑的银行账户");
      return;
    }

    const bank = item[0];
    const form = Ext.create("PSI.Bank.EditForm", {
      parentForm: me,
      company: company,
      entity: bank
    });
    form.show();
  },

  onDeleteBank() {
    const me = this;
    const item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择要删除的银行账户");
      return;
    }

    const bank = item[0];

    const bankName = bank.get("bankName");
    const bankNumber = bank.get("bankNumber");
    const info = `请确认是否删除银行账户 <span style='color:red'>${bankName}-${bankNumber}</span> ?`;

    const funcConfirm = () => {
      const el = Ext.getBody();
      el.mask(PSI.Const.LOADING);
      const r = {
        url: me.URL("Home/Bank/deleteBank"),
        params: {
          id: bank.get("id")
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
          } else {
            me.showInfo("网络错误");
          }
        }
      };

      me.ajax(r);
    };

    me.confirm(info, funcConfirm);
  }
});
