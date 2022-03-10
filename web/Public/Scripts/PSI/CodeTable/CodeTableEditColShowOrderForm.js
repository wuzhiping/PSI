/**
 * 码表设置 - 调整编辑界面字段显示次序
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
PCL.define("PSI.CodeTable.CodeTableEditColShowOrderForm", {
  extend: "PSI.AFX.Form.EditForm",

  config: {
    codeTable: null
  },

  /**
   * @override
   */
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
        me._onOK();
      },
      scope: me
    }, {
      text: "取消",
      handler() {
        me.close();
      },
      scope: me
    });

    PCL.apply(me, {
      resizable: true,
      header: {
        title: me.formatTitle(PSI.Const.PROD_NAME),
        height: 40
      },
      width: 900,
      height: 250,
      layout: "border",
      items: [{
        region: "north",
        border: 0,
        html: "<h1 style='margin-top:0px;color:#0050b3'>拖动列来调整编辑界面字段显示次序</h1>"
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
          fn: me._onWndShow,
          scope: me
        },
        close: {
          fn: me._onWndClose,
          scope: me
        }
      }
    });

    me.callParent(arguments);

    me.__mainPanel = PCL.getCmp("CodeTableEditColShowOrderForm_panelMain");
  },

  /**
   * @private
   */
  _onWndShow() {
    const me = this;

    PCL.get(window).on('beforeunload', me.__onWindowBeforeUnload);

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

  /**
   * @private
   */
  _onOK() {
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
      const el = PCL.getBody();
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
              me.tip("成功完成操作", true);
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

  /**
   * @private
   */
  _onWndClose() {
    const me = this;

    PCL.get(window).un('beforeunload', me.__onWindowBeforeUnload);
  },

  /**
   * @private
   */
  getMainGrid() {
    const me = this;
    return me._mainGrid;
  },

  /**
   * @private
   */
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

    const modelName = "PSIModel.PSI.CodeTable.CodeTableEditColShowOrderForm.ColShowOrder";

    PCL.define(modelName, {
      extend: "PCL.data.Model",
      fields: fields
    });

    me._mainGrid = PCL.create("PCL.grid.Panel", {
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false

        }, items: columns
      }
    });

    return me._mainGrid;
  }
});
