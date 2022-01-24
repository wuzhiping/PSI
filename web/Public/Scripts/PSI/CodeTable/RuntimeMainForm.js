/**
 * 码表运行- 主界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.CodeTable.RuntimeMainForm", {
  extend: "PSI.AFX.Form.MainForm",

  config: {
    fid: null,
    pDesignTool: null
  },

  /**
   * @override
   */
  initComponent() {
    const me = this;

    Ext.apply(me, {
      tbar: {
        id: "PSI_CodeTable_RuntimeMainForm_toolBar",
        xtype: "toolbar"
      },
      layout: "border",
      items: [{
        region: "center",
        id: "PSI_CodeTable_RuntimeMainForm_panelMain",
        layout: "fit",
        border: 0,
        items: []
      }]
    });

    me.callParent(arguments);

    me._toolBar = Ext.getCmp("PSI_CodeTable_RuntimeMainForm_toolBar");
    me._panelMain = Ext.getCmp("PSI_CodeTable_RuntimeMainForm_panelMain");

    me.fetchMeatData();
  },

  getMetaData() {
    return this._md;
  },

  fetchMeatData() {
    const me = this;
    const el = me.getEl();
    el && el.mask(PSI.Const.LOADING);
    me.ajax({
      url: me.URL("Home/CodeTable/getMetaDataForRuntime"),
      params: {
        fid: me.getFid()
      },
      callback(options, success, response) {
        if (success) {
          const data = me.decodeJSON(response.responseText);

          me._md = data;

          me.initUI();
        }

        el && el.unmask();
      }
    });
  },

  initUI() {
    const me = this;

    const md = me.getMetaData();
    if (!md) {
      return;
    }

    const name = md.name;
    if (!name) {
      return;
    }

    // MainGrid
    me._mainGrid = md.treeView ? me.createMainTreeGrid(md) : me.createMainGrid(md);
    me._panelMain.add(me._mainGrid);

    // 按钮
    const toolBar = me._toolBar;
    const buttons = md.buttons;
    // TODO 可以用forEach
    for (let i = 0; i < buttons.length; i++) {
      const btn = buttons[i];
      if (btn.caption == "-") {
        toolBar.add("-");
      } else {
        toolBar.add({
          text: btn.caption,
          handler: me[btn.onClick],
          scope: me
        });
      }
    }

    if (md.viewPaging == "1") {
      const store = me.getMainGrid().getStore();

      toolBar.add(["-", {
        cls: "PSI-toolbox",
        id: "pagingToobar",
        xtype: "pagingtoolbar",
        border: 0,
        store: store
      }, "-", {
          xtype: "displayfield",
          value: "每页显示"
        }, {
          cls: "PSI-toolbox",
          id: "comboCountPerPage",
          xtype: "combobox",
          editable: false,
          width: 60,
          store: Ext.create("Ext.data.ArrayStore", {
            fields: ["text"],
            data: [["20"], ["50"], ["100"], ["300"],
            ["1000"]]
          }),
          value: 20,
          listeners: {
            change: {
              fn() {
                store.pageSize = Ext.getCmp("comboCountPerPage").getValue();
                store.currentPage = 1;
                Ext.getCmp("pagingToobar").doRefresh();
              },
              scope: me
            }
          }
        }, {
          xtype: "displayfield",
          value: "条记录"
        }]);
    }

    // 开发者工具
    if (me.getPDesignTool() == "1") {
      toolBar.add(["-", {
        text: "开发者工具",
        menu: [{
          text: "保存列视图布局",
          scope: me,
          handler: me._onSaveViewLayout
        }
        ]
      }]);
    }

    toolBar.add(["-", {
      text: "关闭",
      handler() {
        me.closeWindow();
      }
    }]);

    me.refreshMainGrid();
  },

  /**
   * 创建非层级码表的Grid
   * 
   * @private
   */
  createMainGrid(md) {
    const me = this;
    const modelName = "PSICodeTableRuntime_" + md.tableName;

    const fields = ["id", "record_status_code_int"];
    const cols = [Ext.create("Ext.grid.RowNumberer", {
      text: "#",
      align: "center",
      width: 60
    })];
    md.colsForView.forEach(mdCol => {
      fields.push(mdCol.fieldName);
      const col = {
        header: mdCol.caption,
        dataIndex: mdCol.fieldName,
        width: parseInt(mdCol.widthInView),
        menuDisabled: true,
        sortable: false
      };
      if (mdCol.fieldName == "code") {
        Ext.apply(col, {
          renderer(value, metaData, record) {
            if (parseInt(record.get("record_status_code_int")) == 1000) {
              return value;
            } else {
              return `<span style='color:gray;text-decoration:line-through;'>${value}</span>`;
            }
          }
        });
      }
      if (mdCol.fieldName == "record_status") {
        Ext.apply(col, {
          renderer(value, metaData, record) {
            if (parseInt(record.get("record_status_code_int")) == 1000) {
              return value;
            } else {
              return `<span style='color:red'>${value}</span>`;
            }
          }
        });
      }

      cols.push(col);
    });// end of forEach

    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: fields
    });

    const store = Ext.create("Ext.data.Store", {
      autoLoad: false,
      model: modelName,
      data: [],
      pageSize: 20,
      proxy: {
        type: "ajax",
        actionMethods: {
          read: "POST"
        },
        url: me.URL("Home/CodeTable/codeTableRecordList"),
        reader: {
          root: 'dataList',
          totalProperty: 'totalCount'
        }
      }
    });
    store.on("beforeload", () => {
      store.proxy.extraParams = me.getQueryParam();
    });
    store.on("load", (e, records, successful) => {
      if (successful) {
        me.gotoMainGridRecord(me._lastId);
      }
    });

    return Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      columnLines: true,
      border: 0,
      columns: cols,
      store: store,
      listeners: {
        itemdblclick: {
          fn: me._onEditCodeTableRecord,
          scope: me
        }
      }
    });
  },

  getQueryParam() {
    const me = this;

    const result = {
      fid: me.getMetaData().fid
    };

    return result;
  },

  gotoMainGridRecord(id) {
    const me = this;
    const grid = me.getMainGrid();
    grid.getSelectionModel().deselectAll();
    const store = grid.getStore();
    if (id) {
      const r = store.findExact("id", id);
      if (r != -1) {
        grid.getSelectionModel().select(r);
      } else {
        grid.getSelectionModel().select(0);
      }
    } else {
      grid.getSelectionModel().select(0);
    }
  },


  createMainTreeGrid(md) {
    const me = this;
    const modelName = "PSICodeTableRuntime_" + md.tableName;

    const fields = ["id", "leaf", "children"];
    const cols = [];
    const colsLength = md.colsForView.length;
    // TODO 改为forEach
    for (let i = 0; i < colsLength; i++) {
      const mdCol = md.colsForView[i];

      fields.push(mdCol.fieldName);

      if (i == 0) {
        cols.push({
          xtype: "treecolumn",
          header: mdCol.caption,
          dataIndex: mdCol.fieldName,
          width: parseInt(mdCol.widthInView),
          menuDisabled: true,
          sortable: false
        });
      } else {
        cols.push({
          header: mdCol.caption,
          dataIndex: mdCol.fieldName,
          width: parseInt(mdCol.widthInView),
          menuDisabled: true,
          sortable: false
        });
      }
    }

    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: fields
    });

    const store = new Ext.data.TreeStore({
      model: modelName,
      autoLoad: false,
      root: {
        expanded: false
      },
      proxy: {
        type: "ajax",
        actionMethods: {
          read: "POST"
        },
        url: me.URL("Home/CodeTable/codeTableRecordListForTreeView"),
        extraParams: {
          fid: me.getFid()
        }
      },
      listeners: {
        load: {
          fn: me._onTreeStoreLoad,
          scope: me
        }
      }
    });

    return Ext.create("Ext.tree.Panel", {
      cls: "PSI",
      rootVisible: false,
      useArrows: true,
      viewConfig: {
        loadMask: true
      },
      columnLines: true,
      border: 0,
      columns: cols,
      store: store,
      listeners: {
        itemdblclick: {
          fn: me._onEditCodeTableRecord,
          scope: me
        }
      }
    });
  },

  _onTreeStoreLoad() {
    const me = this;
    const md = me.getMetaData();
    if (!md.treeView) {
      return;
    }

    const id = me.__lastRecordId;
    const grid = me.getMainGrid();
    if (id) {
      // 编辑后刷新记录，然后定位到该记录
      const node = grid.getStore().getNodeById(id);
      if (node) {
        grid.getSelectionModel().select(node);
      }
    } else {
      // 首次进入模块
      const root = grid.getRootNode();
      if (root) {
        const node = root.firstChild;
        if (node) {
          grid.getSelectionModel().select(node);
        }
      }
    }
  },

  /**
   * 新增码表记录
   * _onAddCodeTableRecord这个是固定的名称
   * 和表t_code_table_buttons的on_click_frontend对应
   * 
   * @private
   */
  _onAddCodeTableRecord() {
    const me = this;

    const form = Ext.create("PSI.CodeTable.RuntimeEditForm", {
      parentForm: me,
      metaData: me.getMetaData()
    });

    form.show();
  },

  /**
   * 编辑码表记录
   * _onEditCodeTableRecord这个是固定的名称
   * 和表t_code_table_buttons的on_click_frontend对应
   * 
   * @private
   */
  _onEditCodeTableRecord() {
    const me = this;
    const item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要编辑的码表记录");
      return;
    }

    const entity = item[0];
    const form = Ext.create("PSI.CodeTable.RuntimeEditForm", {
      parentForm: me,
      entity,
      metaData: me.getMetaData()
    });

    form.show();
  },

  // 根据当前id查找之前的id，用于删除后定位
  getPreIndexById(id) {
    const me = this;
    const md = me.getMetaData();
    if (md.treeView) {
      const store = me.getMainGrid().getStore();
      const currentNode = store.getNodeById(id);
      if (currentNode) {
        const preNode = currentNode.previousSibling;
        if (preNode) {
          return preNode.data.id;
        } else {
          // 没有同级node，就找上级
          const parentNode = currentNode.parentNode;
          if (parentNode) {
            return parentNode.data.id;
          } else {
            // 什么也没有找到
            return null;
          }
        }
      }
    } else {
      const store = me.getMainGrid().getStore();
      const index = store.findExact("id", id) - 1;

      let result = null;
      const preEntity = store.getAt(index);
      if (preEntity) {
        result = preEntity.get("id");
      }

      return result;
    }

    // 没有找到，或者是bug
    return null;
  },

  /**
   * 删除码表记录
   * _onDeleteCodeTableRecord这个是固定的名称
   * 和表t_code_table_buttons的on_click_frontend对应
   * 
   * @private
   */
  _onDeleteCodeTableRecord() {
    const me = this;
    const md = me.getMetaData();
    const name = md.name;
    const item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要删除的" + name);
      return;
    }

    const entity = item[0];
    const info = `请确认是否删除${name} <span style='color:red'>${entity.get("name")}</span> ?`;

    const preIndex = me.getPreIndexById(entity.get("id"));

    const funcConfirm = () => {
      const el = Ext.getBody();
      el && el.mask(PSI.Const.LOADING);
      const r = {
        url: me.URL("Home/CodeTable/deleteCodeTableRecord"),
        params: {
          id: entity.get("id"),
          fid: md.fid
        },
        callback(options, success, response) {
          el && el.unmask();
          if (success) {
            const data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成删除操作", true);
              me.refreshMainGrid(preIndex);
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
  },

  /**
   * 刷新记录
   * _onRefreshCodeTableRecord这个是固定的名称
   * 和表t_code_table_buttons的on_click_frontend对应
   * 
   * @private
   */
  _onRefreshCodeTableRecord() {
    const me = this;
    const item = me.getMainGrid().getSelectionModel().getSelection();
    let id = null;
    if (item == null || item.length != 1) {
      id = me.__lastRecrodId;
    } else {
      const entity = item[0];
      id = entity.get("id");
    }

    me.refreshMainGrid(id);
  },

  getMainGrid() {
    return this._mainGrid;
  },

  refreshMainGrid(id) {
    const me = this;
    me._lastId = id;

    const md = me.getMetaData();
    if (md.treeView) {
      const store = me.getMainGrid().getStore();
      store.reload();
      store.setRootNode({
        expanded: true
      });
    } else {
      const store = me.getMainGrid().getStore();
      store.reload();
    }
  },

  /**保存列视图布局
   * 
   * @private
   */
  _onSaveViewLayout() {
    const me = this;
    const md = me.getMetaData();

    const grid = me.getMainGrid();
    const cols = grid.columnManager.columns;
    const layout = [];
    // TODO 改为forEach
    for (let i = 0; i < cols.length; i++) {
      const c = cols[i];
      layout.push({ dataIndex: c.dataIndex, width: c.width });
    }
    const json = me.encodeJSON(layout);

    const info = "请确认是否保存视图布局?";

    const funcConfirm = () => {
      const el = Ext.getBody();
      el && el.mask(PSI.Const.LOADING);
      const r = {
        url: me.URL("Home/CodeTable/saveColViewLayout"),
        params: {
          fid: md.fid,
          json: json
        },
        callback(options, success, response) {
          el && el.unmask();
          if (success) {
            const data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功保存列视图布局", true);
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
  }
});
