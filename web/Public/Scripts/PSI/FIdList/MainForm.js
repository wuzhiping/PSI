/**
 * 系统数据字典 - 主界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
PCL.define("PSI.FIdList.MainForm", {
  extend: "PSI.AFX.Form.MainForm",

  /**
   * @override
   */
  initComponent() {
    const me = this;

    PCL.apply(me, {
      tbar: me.getToolbarCmp(),
      items: [{
        region: "north",
        border: 0,
        height: 2
      }, {
        region: "center",
        layout: "fit",
        border: 0,
        items: me.getMainGrid()
      }]
    });

    me.callParent(arguments);

  },

  /**
   * @private
   */
  getToolbarCmp() {
    const me = this;

    return [{
      text: "指南",
      handler() {
        me.showInfo("TODO")
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
  getMainGrid() {
    const me = this;

    if (me._mainGrid) {
      return me._mainGrid;
    }

    const modelName = "PSIModel.PSI.FIdList.MainForm.FIdModel";

    PCL.define(modelName, {
      extend: "PCL.data.Model",
      fields: ["id", "fid", "name",]
    });

    me._mainGrid = PCL.create("PCL.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false
        },
        items: [{
          header: "fid",
          dataIndex: "fid",
          width: 140,
        }, {
          header: "名称",
          dataIndex: "name",
          width: 200,
        }]
      },
      store: PCL.create("PCL.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      }),
    });

    return me._mainGrid;
  },
});
