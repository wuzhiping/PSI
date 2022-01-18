/**
 * 会计期间 - 主界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.GLPeriod.MainForm", {
  extend: "PSI.AFX.Form.MainForm",

  /**
   * @override
   */
  initComponent() {
    const me = this;

    Ext.apply(me, {
      tbar: me.getToolbarCmp(),
      items: [{
        region: "north",
        border: 0,
        height: 2
      }, {
        region: "west",
        width: 300,
        layout: "fit",
        border: 0,
        split: true,
        items: [me.getCompanyGrid()]
      }, {
        region: "center",
        xtype: "panel",
        layout: "border",
        border: 0,
        items: [{
          region: "center",
          layout: "fit",
          split: true,
          border: 0,
          items: me.getMainGrid()
        }]
      }]
    });

    me.callParent(arguments);

    me.refreshCompanyGrid();
  },

  /**
   * @private
   */
  getToolbarCmp() {
    const me = this;
    return [{
      text: "初始化本年度会计期间",
      handler: me.onInitPeriod,
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
      url: me.URL("Home/GLPeriod/companyList"),
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

  getCompanyGrid() {
    const me = this;
    if (me.__companyGrid) {
      return me.__companyGrid;
    }

    const modelName = "PSI_GLPeriod_Company";

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

  onCompanyGridSelect() {
    const me = this;

    me.getMainGrid().setTitle(me.formatGridHeaderTitle("会计期间"));
    const item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return;
    }

    const company = item[0];

    const title = `${company.get("name")} - 会计期间`;
    me.getMainGrid().setTitle(me.formatGridHeaderTitle(title));

    const grid = me.getMainGrid();
    const el = grid.getEl();
    el && el.mask(PSI.Const.LOADING);

    const r = {
      url: me.URL("Home/GLPeriod/periodList"),
      params: {
        companyId: company.get("id")
      },
      callback(options, success, response) {
        const store = grid.getStore();

        store.removeAll();

        if (success) {
          const data = me.decodeJSON(response.responseText);
          store.add(data);
        }

        el && el.unmask();
      }
    };
    me.ajax(r);
  },

  getMainGrid() {
    const me = this;
    if (me.__mainGrid) {
      return me.__mainGrid;
    }

    const modelName = "PSIFMTProp";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "year", "month", "glKept", "glClosed",
        "detailKept", "detailClosed", "periodClosed", "yearForward"]
    });

    me.__mainGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("会计期间")
      },
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false,
          draggable: false
        },
        items: [{
          header: "年",
          dataIndex: "year",
          width: 60,
          align: "center"
        }, {
          header: "月",
          dataIndex: "month",
          width: 60,
          align: "center"
        }, {
          header: "总账",
          columns: [{
            header: "已记账",
            dataIndex: "glKept",
            width: 90,
            align: "center",
            menuDisabled: true,
            sortable: false,
            draggable: false
          }, {
            header: "已结账",
            dataIndex: "glClosed",
            width: 90,
            align: "center",
            menuDisabled: true,
            sortable: false,
            draggable: false
          }]
        }, {
          header: "明细账",
          columns: [{
            header: "已记账",
            dataIndex: "detailKept",
            width: 100,
            align: "center",
            menuDisabled: true,
            sortable: false,
            draggable: false
          }, {
            header: "已结账",
            dataIndex: "detailClosed",
            width: 100,
            align: "center",
            menuDisabled: true,
            sortable: false,
            draggable: false
          }]
        }, {
          header: "本期间已结账",
          dataIndex: "periodClosed",
          width: 100,
          align: "center"
        }, {
          header: "已年终结转",
          dataIndex: "yearForward",
          width: 90,
          align: "center"
        }]
      },
      store: Ext.create("Ext.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      })
    });

    return me.__mainGrid;
  },

  onInitPeriod() {
    const me = this;
    const item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return;
    }

    const company = item[0];

    const info = `请确认是否初始化[${company.get("name")}]的本年度会计期间?`;
    const funcConfirm = () => {
      const el = Ext.getBody();
      el.mask("正在操作中...");
      const r = {
        url: me.URL("Home/GLPeriod/initPeriod"),
        params: {
          companyId: company.get("id")
        },
        callback(options, success, response) {
          el.unmask();

          if (success) {
            const data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成初始化操作", true);
              me.onCompanyGridSelect();
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
