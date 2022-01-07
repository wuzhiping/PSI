/**
 * 解决方案 - 主界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */

Ext.define("PSI.Solution.MainForm", {

  extend: "PSI.AFX.Form.MainForm",

  /**
   * 初始化组件
   */
  initComponent() {
    const me = this;

    Ext.apply(me, {
      tbar: [{
        text: "新建解决方案",
        handler: me._onAdd,
        scope: me
      }, {
        text: "编辑解决方案",
        handler: me._onEdit,
        scope: me
      }, {
        text: "删除解决方案",
        handler: me._onDelete,
        scope: me
      }, "-", {
        text: "指南",
        handler() {
          me.showInfo("TODO");
        }
      }, "-", {
        text: "关闭",
        handler() {
          me.closeWindow();
        }
      }],
      items: {
        region: "center",
        xtype: "panel",
        layout: "fit",
        border: 0,
        items: [me.getMainGrid()]
      }
    });

    me.callParent(arguments);
  },

  getMainGrid() {
    const me = this;

    if (me.__mainGrid) {
      return me.__mainGrid;
    }

    const modelName = "PSISolution";

    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "code", "name"]
    });

    me.__mainGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      border: 0,
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
          header: "编码",
          dataIndex: "code",
          width: 140,
        }, {
          header: "解决方案名称",
          dataIndex: "name",
          width: 400,
        }]
      },
      store: Ext.create("Ext.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      }),
    });

    return me.__mainGrid;
  },

  /**
   * 新增解决方案
   */
  _onAdd() {
    const me = this;

    me.showInfo("TODO")
  },

  /**
   * 编辑解决方案
   */
  _onEdit() {
    const me = this;

    me.showInfo("TODO")
  },

  /**
   * 删除解决方案
   */
  _onDelete() {
    const me = this;
    me.showInfo("TODO")
  },

  refreshMainGrid(id) {
    const me = this;

    const grid = me.getMainGrid();
    const el = grid.getEl() || Ext.getBody();
    el.mask(PSI.Const.LOADING);
    const r = {
      url: me.URL("Home/Solution/solutionList"),
      callback(options, success, response) {
        const store = grid.getStore();

        store.removeAll();

        if (success) {
          const data = me.decodeJSON(response.responseText);
          store.add(data);

          if (store.getCount() > 0) {
            if (id) {
              const r = store.findExact("id", id);
              if (r != -1) {
                grid.getSelectionModel().select(r);
              }
            } else {
              grid.getSelectionModel().select(0);
            }
          }
        }

        el.unmask();
      }
    };

    me.ajax(r);
  },
});
