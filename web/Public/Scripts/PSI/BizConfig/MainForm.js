/**
 * 业务设置 - 主窗体
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
PCL.define("PSI.BizConfig.MainForm", {
  extend: "PSI.AFX.BaseOneGridMainForm",

  /**
   * 重载父类方法
   */
  afxInitComponent: function () {
    var me = this;

    me.comboCompany = PCL.getCmp("comboCompany");

    me.queryCompany();
  },

  /**
   * 重载父类方法
   */
  afxGetToolbarCmp: function () {
    var me = this;
    var modelName = "PSI_BizConfig_MainForm_PSICompany";
    PCL.define(modelName, {
      extend: "PCL.data.Model",
      fields: ["id", "name"]
    });
    return [{
      cls: "PSI-toolbox",
      xtype: "combobox",
      id: "comboCompany",
      queryMode: "local",
      editable: false,
      valueField: "id",
      displayField: "name",
      store: PCL.create("PCL.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      }),
      width: 500,
      listeners: {
        select: {
          fn: me.onComboCompanySelect,
          scope: me
        }
      }
    }, {
      text: "设置",
      handler: me.onEdit,
      scope: me
    }, "-", {
      text: "指南",
      handler: function () {
        me.focus();
        window.open(me.URL("/Home/Help/index?t=bizconfig"));
      }
    }, "-", {
      text: "关闭",
      handler: function () {
        me.closeWindow();
      }
    }];
  },

  /**
   * 重载父类方法
   */
  afxGetMainGrid: function () {
    var me = this;
    if (me.__mainGrid) {
      return me.__mainGrid;
    }

    var modelName = "PSI_BizConfig_MainForm_PSIBizConfig";
    PCL.define(modelName, {
      extend: "PCL.data.Model",
      fields: ["id", "name", "value", "displayValue",
        "note"],
      idProperty: "id"
    });
    var store = PCL.create("PCL.data.Store", {
      model: modelName,
      data: [],
      autoLoad: false
    });

    me.__mainGrid = PCL.create("PCL.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      loadMask: true,
      border: 0,
      columnLines: true,
      columns: [PCL.create("PCL.grid.RowNumberer", {
        text: "#",
        width: 40
      }), {
        text: "设置项",
        dataIndex: "name",
        width: 250,
        menuDisabled: true
      }, {
        text: "值",
        dataIndex: "displayValue",
        width: 500,
        menuDisabled: true
      }, {
        text: "备注",
        dataIndex: "note",
        width: 500,
        menuDisabled: true
      }],
      store: store,
      listeners: {
        itemdblclick: {
          fn: me.onEdit,
          scope: me
        }
      }
    });

    return me.__mainGrid;
  },

  afxGetRefreshGridURL: function () {
    return "Home/BizConfig/allConfigs";

  },

  afxGetRefreshGridParams: function () {
    var me = this;
    return {
      companyId: me.comboCompany.getValue()
    };
  },

  /**
   * 设置按钮被单击
   */
  onEdit: function () {
    var me = this;

    var companyId = me.comboCompany.getValue();
    if (!companyId) {
      PSI.MsgBox.showInfo("没有选择要设置的公司");
      return;
    }

    var form = PCL.create("PSI.BizConfig.EditForm", {
      parentForm: me,
      companyId: companyId
    });
    form.show();
  },

  /**
   * 查询公司信息
   */
  queryCompany: function () {
    var me = this;
    var el = PCL.getBody();
    var comboCompany = me.comboCompany;
    var store = comboCompany.getStore();
    el.mask(PSI.Const.LOADING);
    var r = {
      url: me.URL("Home/BizConfig/getCompany"),
      method: "POST",
      callback: function (options, success, response) {
        store.removeAll();

        if (success) {
          var data = me.decodeJSON(response.responseText);
          store.add(data);
          if (data.length > 0) {
            comboCompany.setValue(data[0]["id"]);
            me.refreshGrid();
          }
        }

        el.unmask();
      }
    };
    PCL.Ajax.request(r);
  },

  onComboCompanySelect: function () {
    var me = this;

    me.refreshGrid();
  }
});
