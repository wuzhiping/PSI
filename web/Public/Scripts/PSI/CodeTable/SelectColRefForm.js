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
      width: 1200,
      height: 600,
      layout: "border",
      items: [
        {
          region: "west",
          width: "50%",
          layout: "fit",
          border: 0,
          split: true,
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
              height: "50%",
              layout: "fit",
              split: true,
              items: me.getColForKeyGrid(),
            },
            {
              region: "center",
              border: 0,
              layout: "fit",
              items: me.getColForDisplayGrid(),
            }
          ]
        }
      ],
      buttons: [{
        text: "确定",
        handler: me._onOK,
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

    const edit = PCL.getCmp("editTableName");
    if (edit) {
      edit.focus();
    }
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
      fields: ["name", "caption"]
    });

    me._tableGrid = PCL.create("PCL.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      header: false,
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false,
        },
        items: [{
          header: "数据库表名",
          dataIndex: "name",
          flex: 1,
        }, {
          header: "名称",
          dataIndex: "caption",
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
      },
      bbar: [{
        xtype: "displayfield",
        value: "输入表名可以过滤上面的数据",
      }, {
        id: "editTableName",
        xtype: "textfield",
        width: 200,
      }]
    });

    return me._tableGrid;
  },

  /**
   * 显示关联字段的Grid
   * 
   * @private
   */
  getColForKeyGrid() {
    const me = this;

    if (me._colForKeyGrid) {
      return me._colForKeyGrid;
    }

    const modelName = "PSIModel.PSI.CodeTable.SelectColRefForm.ColForKeyModel";

    PCL.define(modelName, {
      extend: "PCL.data.Model",
      fields: ["caption", "dbFieldName"]
    });

    me._colForKeyGrid = PCL.create("PCL.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("列 - 关联用")
      },
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false,
        },
        items: [{
          header: "列标题",
          dataIndex: "caption",
          flex: 1,
        }, {
          header: "列数据库名",
          dataIndex: "dbFieldName",
          flex: 1,
        }]
      },
      store: PCL.create("PCL.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      }),
    });

    return me._colForKeyGrid;
  },

  /**
   * 显示展示字段的Grid
   * 
   * @private
   */
  getColForDisplayGrid() {
    const me = this;

    if (me._colForDisplayGrid) {
      return me._colForDisplayGrid;
    }

    const modelName = "PSIModel.PSI.CodeTable.SelectColRefForm.ColForDisplayModel";

    PCL.define(modelName, {
      extend: "PCL.data.Model",
      fields: ["caption", "dbFieldName"]
    });

    me._colForDisplayGrid = PCL.create("PCL.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("列 - 显示用")
      },
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false,
        },
        items: [{
          header: "列标题",
          dataIndex: "caption",
          flex: 1,
        }, {
          header: "列数据库名",
          dataIndex: "dbFieldName",
          flex: 1,
        }]
      },
      store: PCL.create("PCL.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      }),
    });

    return me._colForDisplayGrid;

  },

  /**
   * @private
   */
  _onTableGridSelect() { },

  /**
   * @private
   */
  refreshTableGrid() {
    const me = this;
    const valueFrom = me.getValueFrom();
  },

  /**
   * @private
   */
  _onOK() {
    const me = this;
    me.showInfo("TODO")
  }
});
