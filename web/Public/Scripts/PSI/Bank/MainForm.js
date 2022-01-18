/**
 * 银行账户 - 主界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.Bank.MainForm", {
  extend: "PSI.AFX.Form.MainForm",

  /**
   * 初始化组件
   * 
   * @override
   */
  initComponent() {
    const me = this;

    Ext.apply(me, {
      tbar: me.getToolbarCmp(),
      items: [{
        region: "north",
        border: 0,
        height: 2,
      }, {
        region: "west",
        width: 300,
        layout: "fit",
        border: 0,
        split: true,
        items: [me.getCompanyGrid()]
      }, {
        region: "center",
        layout: "fit",
        border: 0,
        items: [me.getMainGrid()]
      }]
    });

    me.callParent(arguments);

    me.refreshCompanyGrid();
  },

  /**
   * 工具栏
   * 
   * @private
   */
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

  /**
   * 刷新组织机构Grid
   * 
   * @private
   */
  refreshCompanyGrid() {
    const me = this;
    const el = Ext.getBody();
    const store = me.getCompanyGrid().getStore();
    el.mask(PSI.Const.LOADING);
    const r = {
      url: me.URL("Home/Bank/companyList"),
      callback(options, success, response) {
        store.removeAll();

        if (success) {
          const data = me.decodeJSON(response.responseText);
          store.add(data);
          if (store.getCount() > 0) {
            me.getCompanyGrid().getSelectionModel().select(0);
          }
        }

        el.unmask();
      }
    };
    me.ajax(r);
  },

  /**
   * 刷新银行账户Grid
   * 
   * @private
   */
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

  /**
   * 组织机构Grid
   * 
   * @private
   */
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
        title: me.formatGridHeaderTitle("组织机构")
      },
      forceFit: true,
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false,
        },
        items: [{
          header: "编码",
          dataIndex: "code",
          width: 70
        }, {
          header: "组织机构名称",
          dataIndex: "name",
          flex: 1,
        }, {
          header: "组织机构性质",
          dataIndex: "orgType",
          width: 100,
        }]
      },
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

  /**
   * 银行账户Grid
   * 
   * @private
   */
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
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false,
        },
        items: [{
          header: "银行",
          dataIndex: "bankName",
          width: 300
        }, {
          header: "账号",
          dataIndex: "bankNumber",
          width: 300,
        }, {
          header: "备注",
          dataIndex: "memo",
          width: 400,
        }]
      },
      store: Ext.create("Ext.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      }),
      listeners: {
        itemdblclick: {
          fn: me.onEditBank,
          scope: me
        }
      }
    });
    return me.__mainGrid;
  },

  /**
   * 组织机构Grid中某条记录被选中后的事件处理函数
   * 
   * @private
   */
  onCompanyGridSelect() {
    const me = this;

    me.refreshMainGrid();
  },

  /**
   * 新建银行账户
   * 
   * @private
   */
  onAddBank() {
    const me = this;

    const item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择组织机构");
      return;
    }

    const company = item[0];

    const form = Ext.create("PSI.Bank.EditForm", {
      parentForm: me,
      company: company
    });
    form.show();
  },

  /**
   * 编辑银行账户
   * 
   * @private
   */
  onEditBank() {
    const me = this;
    let item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择组织机构");
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

  /**
   * 删除银行账户
   * 
   * @private
   */
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
