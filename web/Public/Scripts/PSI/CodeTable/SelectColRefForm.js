/**
 * 值来源的引用列
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
PCL.define("PSI.CodeTable.SelectColRefForm", {
  extend: "PCL.window.Window",

  mixins: ["PSI.AFX.Mix.Common"],

  config: {
    codeTable: null,
    valueFrom: 2,
  },

  /**
   * @override
   */
  initComponent() {
    const me = this;

    PCL.apply(me, {
      header: {
        title: me.formatTitle(PSI.Const.PROD_NAME),
        height: 40
      },
      modal: true,
      closable: false,
      resizable: false,
      onEsc: PCL.emptyFn,
      width: 800,
      height: 600,
      layout: "border",
      items: [
        {
          region: "west",
          width: "50%",
          layout: "fit",
          border: 0,
          items: me.getTableGrid(),
        },
        {
          region: "center",
          layout: "border",
          border: 0,
          items: [
            {
              region: "north",
              border: 0,
              height: "50%"
            },
            {
              region: "center",
              border: 0,
            }
          ]
        }
      ],
      buttons: [{
        text: "取消",
        handler() {
          me.close();
        },
        scope: me
      }],
      listeners: {
        show: {
          fn: me._onWndShow,
          scope: me
        }
      }
    });

    me.callParent(arguments);
  },

  /**
   * @private
   */
  _onWndShow() {
    const me = this;
  },

  /**
   * 显示表的Grid
   * @private
   */
  getTableGrid() {
    const me = this;

    if (me._tableGrid) {
      return me._tableGrid;
    }

    const modelName = "PSIModel.PSI.CodeTable.SelectColRefForm.TableModel";

    PCL.define(modelName, {
      extend: "PCL.data.Model",
      fields: ["name"]
    });

    me._tableGrid = PCL.create("PCL.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("表")
      },
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false,
        },
        items: [{
          header: "表名",
          dataIndex: "name",
          flex: 1,
        }]
      },
      store: PCL.create("PCL.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      }),
      listeners: {
        select: {
          fn: me._onTableGridSelect,
          scope: me
        },
      }
    });

    return me._tableGrid;
  },

  /**
   * 显示关联字段的Grid
   * 
   * @private
   */
  getColForKeyGrid() {

  },

  /**
   * 显示展示字段的Grid
   * 
   * @private
   */
  getColForDisplayGrid() { },

  /**
   * @private
   */
  _onTableGridSelect() { },
});
