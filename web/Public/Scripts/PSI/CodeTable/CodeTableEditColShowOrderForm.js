/**
 * 码表设置 - 调整编辑界面字段显示次序
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.CodeTable.CodeTableEditColShowOrderForm", {
  extend: "PSI.AFX.Form.EditForm",

  config: {
    codeTable: null
  },

  initComponent() {
    const me = this;
    const entity = me.getEntity();
    this.adding = entity == null;

    const buttons = [];

    buttons.push({
      text: "保存",
      formBind: true,
      iconCls: "PSI-button-ok",
      handler() {
        me.onOK(false);
      },
      scope: me
    }, {
      text: "取消",
      handler() {
        me.close();
      },
      scope: me
    });

    Ext.apply(me, {
      resizable: true,
      header: {
        title: me.formatTitle("调整编辑界面字段显示次序"),
        height: 40
      },
      width: 900,
      height: 200,
      layout: "border",
      items: [{
        region: "north",
        border: 0,
        html: "<h1>拖动列来调整显示次序</h1>"
      }, {
        region: "center",
        layout: "fit",
        border: 0,
        id: "CodeTableEditColShowOrderForm_panelMain",
        items: []
      }],
      buttons: buttons,
      listeners: {
        show: {
          fn: me.onWndShow,
          scope: me
        },
        close: {
          fn: me.onWndClose,
          scope: me
        }
      }
    });

    me.callParent(arguments);

    me.__mainPanel = Ext.getCmp("CodeTableEditColShowOrderForm_panelMain");
  },

  onWndShow() {
    const me = this;

    Ext.get(window).on('beforeunload', me.onWindowBeforeUnload);

    const el = me.getEl();
    el && el.mask(PSI.Const.LOADING);
    me.ajax({
      url: me.URL("Home/CodeTable/queryCodeTableEditColShowOrder"),
      params: {
        tableId: me.getCodeTable().get("id")
      },
      callback(options, success, response) {
        if (success) {
          el && el.unmask();

          const data = me.decodeJSON(response.responseText);
          me.__mainPanel.add(me.createMainGrid(data));
        }
      }
    });

  },

  onOK() {
    const me = this;

    const grid = me.getMainGrid();
    const cols = grid.columnManager.columns;
    const layout = [];
    for (let i = 0; i < cols.length; i++) {
      const c = cols[i];
      layout.push({ dataIndex: c.dataIndex });
    }
    const json = me.encodeJSON(layout);

    const info = "请确认是否保存编辑字段显示次序?";

    const funcConfirm = () => {
      const el = Ext.getBody();
      el && el.mask(PSI.Const.LOADING);
      const r = {
        url: me.URL("Home/CodeTable/saveColEditShowOrder"),
        params: {
          id: me.getCodeTable().get("id"),
          json: json
        },
        callback(options, success, response) {
          el && el.unmask();
          if (success) {
            var data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成操作");
              me.getParentForm().refreshColsGrid();
              me.close();
            } else {
              me.showInfo(data.msg);
            }
          } else {
            me.showInfo("网络错误");
          }
        }
      };

      me.ajax(r);
    }

    me.confirm(info, funcConfirm);
  },

  onWindowBeforeUnload(e) {
    return (window.event.returnValue = e.returnValue = '确认离开当前页面？');
  },

  onWndClose() {
    const me = this;

    Ext.get(window).un('beforeunload', me.onWindowBeforeUnload);
  },

  getMainGrid() {
    const me = this;
    return me.__mainGrid;
  },

  createMainGrid(cols) {
    const me = this;

    const fields = [];
    const columns = [];
    if (!cols) {
      columns.push({});
    } else {
      for (let i = 0; i < cols.length; i++) {
        const col = cols[i];
        columns.push({
          header: col.caption,
          dataIndex: col.dataIndex
        });
        fields.push(col.dataIndex);
      }
    }

    const modelName = "PSICodeTableEditColShowOrder";

    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: fields
    });

    me.__mainGrid = Ext.create("Ext.grid.Panel", {
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false

        }, items: columns
      }
    });

    return me.__mainGrid;
  }
});
