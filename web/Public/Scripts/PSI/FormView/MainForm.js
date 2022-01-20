/**
 * 视图开发助手 - 主页面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.FormView.MainForm", {
  extend: "PSI.AFX.BaseMainExForm",

  /**
   * @override
   */
  initComponent() {
    const me = this;

    Ext.apply(me, {
      tbar: me.getToolbarCmp(),
      items: [{
        region: "north",
        height: 2,
        border: 0,
      }, {
        id: "panelCategory",
        border: 0,
        split: true,
        region: "west",
        width: 370,
        layout: "fit",
        items: me.getCategoryGrid()
      }, {
        border: 0,
        region: "center",
        layout: "border",
        items: [{
          region: "center",
          border: 0,
          layout: "fit",
          items: [me.getMainGrid()]
        }, {
          region: "south",
          border: 0,
          height: "60%",
          split: true,
          layout: "fit",
          xtype: "tabpanel",
          items: [me.getColsGrid(), me.getQcGrid(), me.getButtonGrid(), {
            title: "排序"
          }]
        }]
      }]
    });

    me.callParent();

    me.refreshCategoryGrid();
  },

  /**
   * @private
   */
  getToolbarCmp() {
    const me = this;
    return [{
      text: "新建视图分类",
      handler: me.onAddCategory,
      scope: me
    }, {
      text: "编辑视图分类",
      handler: me.onEditCategory,
      scope: me
    }, {
      text: "删除视图分类",
      handler: me.onDeleteCategory,
      scope: me
    }, "-", {
      text: "新建视图",
      handler: me.onAddFv,
      scope: me
    }, {
      text: "编辑视图",
      handler: me.onEditFv,
      scope: me
    }, {
      text: "删除视图",
      handler: me.onDeleteFv,
      scope: me
    }, "-", {
      text: "指南",
      handler() {
        me.focus();
        window.open(me.URL("Home/Help/index?t=formview"));
      }
    }, "-", {
      text: "关闭",
      handler() {
        me.closeWindow();
      },
      scope: me
    }];
  },

  /**
   * 视图分类Grid
   * 
   * @private
   */
  getCategoryGrid() {
    const me = this;

    if (me.__categoryGrid) {
      return me.__categoryGrid;
    }

    const modelName = "PSIFvCategory";

    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "code", "name", "isSystem", "isSystemCaption"]
    });

    me.__categoryGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("视图分类")
      },
      tools: [{
        type: "close",
        handler() {
          Ext.getCmp("panelCategory").collapse();
        }
      }],
      columnLines: true,
      columns: [{
        header: "分类编码",
        dataIndex: "code",
        width: 80,
        menuDisabled: true,
        sortable: false
      }, {
        header: "视图分类",
        dataIndex: "name",
        width: 200,
        menuDisabled: true,
        sortable: false
      }, {
        header: "系统固有",
        dataIndex: "isSystemCaption",
        menuDisabled: true,
        width: 80,
        align: "center",
        sortable: false
      }],
      store: Ext.create("Ext.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      }),
      listeners: {
        select: {
          fn: me.onCategoryGridSelect,
          scope: me
        }
      }
    });

    return me.__categoryGrid;
  },

  /**
   * 视图列Grid
   * 
   * @private
   */
  getColsGrid() {
    const me = this;

    if (me.__colsGrid) {
      return me.__colsGrid;
    }

    const modelName = "PSIFvCols";

    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "caption", "showOrder", "width", "valueFromTableName", "valueFromColName",
        "displayFormat"]
    });

    me.__colsGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      title: "列",
      tbar: [{
        text: "新建列",
        handler: me.onAddCol,
        scope: me
      }, "-", {
        text: "编辑列",
        handler: me.onEditCol,
        scope: me
      }, "-", {
        text: "删除列",
        handler: me.onDeleteCol,
        scope: me
      }],
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false
        },
        items: [{
          header: "显示次序",
          dataIndex: "showOrder",
          width: 80
        }, {
          header: "标题",
          dataIndex: "caption",
          width: 200
        }, {
          header: "宽度(px)",
          dataIndex: "width",
          width: 100
        }, {
          header: "取值表名",
          dataIndex: "valueFromTableName",
          width: 200
        }, {
          header: "取值列名",
          dataIndex: "valueFromColName",
          width: 200
        }, {
          header: "显示格式",
          dataIndex: "displayFormat",
          width: 200
        }]
      },
      store: Ext.create("Ext.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      })
    });

    return me.__colsGrid;
  },

  /**
   * 视图按钮Grid
   * 
   * @private
   */
  getButtonGrid() {
    const me = this;

    if (me.__buttonGrid) {
      return me.__buttonGrid;
    }

    const modelName = "PSIFvButtons";

    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "caption"]
    });

    me.__buttonGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      title: "业务按钮",
      tbar: [{
        text: "新建按钮",
        handler: me.onAddButton,
        scope: me
      }, "-", {
        text: "编辑按钮",
        handler: me.onEditButton,
        scope: me
      }, "-", {
        text: "删除按钮",
        handler: me.onDeleteButton,
        scope: me
      }],
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false
        },
        items: [{
          header: "按钮标题",
          dataIndex: "caption",
          width: 200
        }]
      },
      store: Ext.create("Ext.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      })
    });

    return me.__buttonGrid;
  },

  /**
   * 查询条件Grid
   * 
   * @private
   */
  getQcGrid() {
    const me = this;

    if (me.__qcGrid) {
      return me.__qcGrid;
    }

    const modelName = "PSIFvQueryCondition";

    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "caption"]
    });

    me.__qcGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      title: "查询条件",
      tbar: [{
        text: "新建查询条件",
        handler: me.onAddQc,
        scope: me
      }, "-", {
        text: "编辑查询条件",
        handler: me.onEditQc,
        scope: me
      }, "-", {
        text: "删除查询条件",
        handler: me.onDeleteQc,
        scope: me
      }],
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false
        },
        items: [{
          header: "标题",
          dataIndex: "caption",
          width: 200
        }]
      },
      store: Ext.create("Ext.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      })
    });

    return me.__qcGrid;
  },

  /**
   * 刷新分类Grid中的数据
   * 
   * @param {string} id 如果id不为空，则在数据刷新后，在Grid选中的该id对应的分类
   * 
   * @private
   */
  refreshCategoryGrid(id) {
    const me = this;
    const grid = me.getCategoryGrid();
    const el = grid.getEl() || Ext.getBody();
    el.mask(PSI.Const.LOADING);
    const r = {
      url: me.URL("Home/FormView/categoryList"),
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

  /**
   * 刷新视图Grid中的数据
   * 
   * @param {string} id
   * 
   * @private 
   */
  refreshMainGrid(id) {
    const me = this;

    me.getMainGrid().getStore().reload();
  },

  onCategoryGridSelect() {
    const me = this;
    me.refreshMainGrid();
  },

  /**
   * 新建分类
   * 
   * @private
   */
  onAddCategory() {
    const me = this;

    const form = Ext.create("PSI.FormView.CategoryEditForm", {
      parentForm: me
    });

    form.show();
  },

  /**
   * 编辑分类
   * 
   * @private
   */
  onEditCategory() {
    const me = this;

    const item = me.getCategoryGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要编辑的视图分类");
      return;
    }

    const category = item[0];

    if (category.get("isSystem") == 1) {
      me.showInfo("不能编辑系统分类");
      return;
    }

    const form = Ext.create("PSI.FormView.CategoryEditForm", {
      parentForm: me,
      entity: category
    });

    form.show();
  },

  /**
   * 删除分类
   * 
   * @private
   */
  onDeleteCategory() {
    const me = this;
    const item = me.getCategoryGrid().getSelectionModel()
      .getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要删除的视图分类");
      return;
    }

    const category = item[0];
    if (category.get("isSystem") == 1) {
      me.showInfo("不能删除系统分类");
      return;
    }

    const store = me.getCategoryGrid().getStore();
    let index = store.findExact("id", category.get("id"));
    index--;
    let preIndex = null;
    const preItem = store.getAt(index);
    if (preItem) {
      preIndex = preItem.get("id");
    }

    const info = Ext.String.format("请确认是否删除视图分类: <span style='color:red'>{0}</span> ?",
      category.get("name"));

    const funcConfirm = () => {
      const el = Ext.getBody();
      el.mask("正在删除中...");

      const r = {
        url: me.URL("Home/FormView/deleteViewCategory"),
        params: {
          id: category.get("id")
        },
        callback(options, success, response) {
          el.unmask();

          if (success) {
            const data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成删除操作");
              me.refreshCategoryGrid(preIndex);
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
   * 视图Grid
   * 
   * @private
   */
  getMainGrid() {
    const me = this;
    if (me.__mainGrid) {
      return me.__mainGrid;
    }

    const modelName = "PSIGoodsCategory";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "text", "code", "fid", "memo", "mdVersion", "isFixed",
        "moduleName", "leaf", "children", "xtype", "region",
        "widthOrHeight", "layoutType", "dataSourceType", "dataSourceTableName",
        "handlerClassName"]
    });

    const store = Ext.create("Ext.data.TreeStore", {
      model: modelName,
      proxy: {
        type: "ajax",
        actionMethods: {
          read: "POST"
        },
        url: me.URL("Home/FormView/fvList")
      },
      listeners: {
        beforeload: {
          fn() {
            store.proxy.extraParams = me.getQueryParamForMainGrid();
          },
          scope: me
        }
      }

    });

    me.__mainGrid = Ext.create("Ext.tree.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("视图列表")
      },
      store: store,
      rootVisible: false,
      useArrows: true,
      viewConfig: {
        loadMask: true
      },
      columns: {
        defaults: {
          sortable: false,
          menuDisabled: true,
          draggable: true
        },
        items: [{
          xtype: "treecolumn",
          text: "名称",
          dataIndex: "text",
          width: 220
        }, {
          text: "编码",
          dataIndex: "code",
          width: 100
        }, {
          text: "位置",
          dataIndex: "region",
          width: 70
        }, {
          text: "宽度/高度",
          dataIndex: "widthOrHeight",
          align: "right",
          width: 100
        }, {
          text: "布局",
          dataIndex: "layoutType",
          width: 100
        }, {
          text: "数据源",
          dataIndex: "dataSourceType",
          width: 70
        }, {
          text: "数据源表名",
          dataIndex: "dataSourceTableName",
          width: 150
        }, {
          text: "业务逻辑类名",
          dataIndex: "handlerClassName",
          width: 200
        }, {
          text: "版本",
          dataIndex: "mdVersion",
          width: 70
        }, {
          text: "系统固有",
          dataIndex: "isFixed",
          align: "center",
          width: 80
        }, {
          text: "模块名称",
          dataIndex: "moduleName",
          width: 150
        }, {
          text: "xtype",
          dataIndex: "xtype",
          width: 300
        }, {
          text: "fid",
          dataIndex: "fid",
          width: 160
        }, {
          text: "备注",
          dataIndex: "memo",
          width: 200
        }]
      },
      listeners: {
        select: {
          fn(rowModel, record) {
            me.onMainGridNodeSelect(record);
          },
          scope: me
        }
      }
    });

    return me.__mainGrid;
  },

  /**
   * @private
   */
  getQueryParamForMainGrid() {
    const me = this;
    const item = me.getCategoryGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return { categoryId: "" };
    }

    const category = item[0];

    return { categoryId: category.get("id") };
  },

  onMainGridNodeSelect(record) {
    var me = this;

    var fvId = record.get('id');

    me.refreshColsGrid(fvId);
  },

  refreshColsGrid(fvId, colId) {
    var me = this;

    var grid = me.getColsGrid();
    var el = grid.getEl() || Ext.getBody();
    el.mask(PSI.Const.LOADING);
    var r = {
      url: me.URL("Home/FormView/colList"),
      params: {
        fvId: fvId
      },
      callback(options, success, response) {
        var store = grid.getStore();

        store.removeAll();

        if (success) {
          var data = me.decodeJSON(response.responseText);
          store.add(data);

          if (store.getCount() > 0) {
            if (colId) {
              var r = store.findExact("id", colId);
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

  // 新建视图
  onAddFv() {
    var me = this;

    var item = me.getCategoryGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择一个的视图分类");
      return;
    }

    var category = item[0];

    var form = Ext.create("PSI.FormView.FvEditForm", {
      parentForm: me,
      category: category
    });
    form.show();
  },

  // 编辑视图
  onEditFv() {
    var me = this;

    var item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要编辑的视图");
      return;
    }

    var view = item[0];

    var form = Ext.create("PSI.FormView.FvEditForm", {
      parentForm: me,
      entity: view
    });
    form.show();
  },

  // 删除视图
  onDeleteFv() {
    var me = this;

    var item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要删除的视图");
      return;
    }

    var view = item[0];
    var info = Ext.String.format("请确认是否删除视图: <span style='color:red'>{0}</span> ？",
      view.get("text"));

    var funcConfirm = () => {
      var el = Ext.getBody();
      el.mask("正在删除中...");

      var r = {
        url: me.URL("Home/FormView/deleteFv"),
        params: {
          id: view.get("id")
        },
        callback(options, success, response) {
          el.unmask();

          if (success) {
            var data = me.decodeJSON(response.responseText);
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
  },

  // 新建列
  onAddCol() {
    var me = this;

    var item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要新建列的视图");
      return;
    }

    var fv = item[0];

    var dsName = fv.get("dataSourceType");
    if (!(dsName == "码表" || dsName == "自定义表单")) {
      me.showInfo("只有码表和自定义表单才能定义视图列");
      return;
    }
    var dsTableName = fv.get("dataSourceTableName");
    if (!dsTableName) {
      me.showInfo("只有设置了数据源表名的视图才能定义视图列");
      return;
    }

    var form = Ext.create("PSI.FormView.FvColEditForm", {
      fv: fv,
      parentForm: me
    });
    form.show();
  },

  // 编辑列
  onEditCol() {
    var me = this;

    var item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要编辑列的视图");
      return;
    }

    var fv = item[0];

    var item = me.getColsGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要编辑的列");
      return;
    }
    var col = item[0];

    var form = Ext.create("PSI.FormView.FvColEditForm", {
      fv: fv,
      entity: col,
      parentForm: me
    });
    form.show();
  },

  // 删除列
  onDeleteCol() {
    var me = this;
    var item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择视图");
      return;
    }
    var fv = item[0];

    var item = me.getColsGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要删除的列");
      return;
    }
    var col = item[0];

    var store = me.getColsGrid().getStore();
    var index = store.findExact("id", col.get("id"));
    index--;
    var preIndex = null;
    var preItem = store.getAt(index);
    if (preItem) {
      preIndex = preItem.get("id");
    }

    var info = "请确认是否删除视图列: <span style='color:red'>"
      + col.get("caption")
      + "</span><br /><br />当前操作只删除视图列的元数据，数据库表的字段不会删除";

    var funcConfirm = () => {
      var el = Ext.getBody();
      el.mask("正在删除中...");

      var r = {
        url: me.URL("Home/FormView/deleteFvCol"),
        params: {
          fvId: fv.get("id"),
          id: col.get("id")
        },
        callback(options, success, response) {
          el.unmask();

          if (success) {
            var data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成删除操作");
              me.refreshColsGrid(fv.get("id"), preIndex);
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

  // 新建按钮
  onAddButton() {
    var me = this;
    me.showInfo("TODO")
  },

  // 编辑按钮
  onEditButton() {
    var me = this;
    me.showInfo("TODO")
  },

  // 删除按钮
  onDeleteButton() {
    var me = this;
    me.showInfo("TODO")
  },

  // 新建查询条件
  onAddQc() {
    var me = this;
    me.showInfo("TODO")
  },

  // 编辑查询条件
  onEditQc() {
    var me = this;
    me.showInfo("TODO")
  },

  // 删除查询条件
  onDeleteQc() {
    var me = this;
    me.showInfo("TODO")
  }
});
