/**
 * 码表设置 - 主界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.CodeTable.MainForm", {
  extend: "PSI.AFX.Form.MainForm",

  initComponent() {
    const me = this;

    Ext.apply(me, {
      tbar: me.getToolbarCmp(),
      layout: "border",
      items: [{
        region: "center",
        layout: "border",
        border: 0,
        items: [{
          region: "north",
          height: 2,
          border: 0,
        }, {
          region: "center",
          xtype: "panel",
          layout: "border",
          border: 0,
          items: [{
            region: "center",
            layout: "fit",
            border: 0,
            items: me.getMainGrid()
          }, {
            region: "south",
            layout: "fit",
            border: 0,
            height: "60%",
            split: true,
            items: [me.getColsGrid()]
          }]
        }, {
          id: "panelCategory",
          xtype: "panel",
          region: "west",
          layout: "fit",
          width: 370,
          split: true,
          collapsible: true,
          header: false,
          border: 0,
          items: [me.getCategoryGrid()]
        }]
      }]
    });

    me.callParent(arguments);

    me.comboSolution = Ext.getCmp("comboSolution");

    me.querySolutionList();
  },

  getToolbarCmp() {
    const me = this;

    const modelName = "PSI_CodeTable_MainForm_PSISolution";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["code", "name"]
    });

    return [{
      xtype: "displayfield",
      value: "解决方案"
    }, {
      cls: "PSI-toolbox",
      xtype: "combobox",
      id: "comboSolution",
      queryMode: "local",
      editable: false,
      valueField: "code",
      displayField: "name",
      store: Ext.create("Ext.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      }),
      width: 400,
      listeners: {
        select: {
          fn: me._onComboSolutionSelect,
          scope: me
        }
      }
    }, {
      text: "新建码表分类",
      handler: me._onAddCategory,
      scope: me
    }, {
      text: "编辑码表分类",
      handler: me._onEditCategory,
      scope: me
    }, {
      text: "删除码表分类",
      handler: me._onDeleteCategory,
      scope: me
    }, "-", {
      text: "新建码表",
      handler: me._onAddCodeTable,
      scope: me
    }, {
      text: "编辑码表",
      handler: me._onEditCodeTable,
      scope: me
    }, {
      text: "删除码表",
      handler: me._onDeleteCodeTable,
      scope: me
    }, "-", {
      text: "工具",
      menu: [{
        text: "把码表转化为系统固有码表",
        scope: me,
        handler: me.onConvertToSys
      }, "-", {
        text: "生成SQL语句",
        scope: me,
        handler: me.onGenSQL
      }]
    }, "-", {
      text: "指南",
      handler() {
        me.focus();
        window.open(me.URL("Home/Help/index?t=codetable"));
      }
    }, "-", {
      text: "关闭",
      handler() {
        me.closeWindow();
      }
    }];
  },

  getCategoryGrid() {
    const me = this;

    if (me.__categoryGrid) {
      return me.__categoryGrid;
    }

    const modelName = "PSICodeTableCategory";

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
        title: me.formatGridHeaderTitle("码表分类")
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
        header: "码表分类",
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
          fn: me._onCategoryGridSelect,
          scope: me
        },
        itemdblclick: {
          fn: me._onEditCategory,
          scope: me
        }
      }
    });

    return me.__categoryGrid;
  },

  getMainGrid() {
    const me = this;

    if (me.__mainGrid) {
      return me.__mainGrid;
    }

    const modelName = "PSICodeTable";

    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "code", "name", "moduleName", "tableName",
        "memo", "fid", "mdVersion", "isFixed", "isFixedName", "enableParentId",
        "handlerClassName", "editColCnt", "viewPaging", "autoCodeLength"]
    });

    me.__mainGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("码表")
      },
      columnLines: true,
      columns: [{
        header: "编码",
        dataIndex: "code",
        width: 120,
        menuDisabled: true,
        sortable: false,
        locked: true
      }, {
        header: "码表名称",
        dataIndex: "name",
        width: 200,
        menuDisabled: true,
        sortable: false,
        locked: true
      }, {
        header: "模块名称",
        dataIndex: "moduleName",
        width: 200,
        menuDisabled: true,
        sortable: false
      }, {
        header: "数据库表名",
        dataIndex: "tableName",
        width: 200,
        menuDisabled: true,
        sortable: false
      }, {
        header: "fid",
        dataIndex: "fid",
        width: 200,
        menuDisabled: true,
        sortable: false
      }, {
        header: "编辑布局列数",
        dataIndex: "editColCnt",
        width: 100,
        align: "right",
        menuDisabled: true,
        sortable: false
      }, {
        header: "视图分页",
        dataIndex: "viewPaging",
        width: 100,
        align: "center",
        menuDisabled: true,
        sortable: false
      }, {
        header: "自动编码长度",
        dataIndex: "autoCodeLength",
        width: 100,
        align: "right",
        menuDisabled: true,
        sortable: false
      }, {
        header: "版本",
        dataIndex: "mdVersion",
        width: 90,
        align: "rigth",
        menuDisabled: true,
        sortable: false
      }, {
        header: "系统固有",
        dataIndex: "isFixedName",
        width: 80,
        menuDisabled: true,
        sortable: false,
        align: "center"
      }, {
        header: "层级数据",
        dataIndex: "enableParentId",
        width: 80,
        menuDisabled: true,
        sortable: false,
        align: "center",
        renderer(value) {
          return parseInt(value) == 1 ? "▲" : "";
        }
      }, {
        header: "业务逻辑类名",
        dataIndex: "handlerClassName",
        width: 300,
        menuDisabled: true,
        sortable: false
      }, {
        header: "备注",
        dataIndex: "memo",
        width: 300,
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
          fn: me.onMainGridSelect,
          scope: me
        }
      }
    });

    return me.__mainGrid;
  },

  getColsGrid() {
    const me = this;

    if (me.__colsGrid) {
      return me.__colsGrid;
    }

    const modelName = "PSICodeTableCols";

    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "caption", "fieldName",
        "fieldType", "fieldLength", "fieldDecimal",
        "valueFrom", "valueFromTableName",
        "valueFromColName", "valueFromColNameDisplay", "mustInput",
        "showOrder", "sysCol", "isVisible",
        "widthInView", "note", "showOrderInView", "editorXtype",
        "colSpan"]
    });

    me.__colsGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("码表列")
      },
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
      }, "-", {
        text: "调整编辑界面字段顺序",
        handler: me.onChangeEditShowOrder,
        scope: me
      }],
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false
        },
        items: [{
          header: "列标题",
          dataIndex: "caption",
          width: 150,
          locked: true
        }, {
          header: "列数据库名",
          dataIndex: "fieldName",
          width: 150
        }, {
          header: "列数据类型",
          dataIndex: "fieldType",
          width: 80
        }, {
          header: "列数据长度",
          dataIndex: "fieldLength",
          align: "right",
          width: 90
        }, {
          header: "列小数位数",
          dataIndex: "fieldDecimal",
          align: "right",
          width: 90
        }, {
          header: "值来源",
          dataIndex: "valueFrom",
          width: 120
        }, {
          header: "值来源表",
          dataIndex: "valueFromTableName",
          width: 200
        }, {
          header: "值来源字段(关联用)",
          dataIndex: "valueFromColName",
          width: 150
        }, {
          header: "值来源字段(显示用)",
          dataIndex: "valueFromColNameDisplay",
          width: 150
        }, {
          header: "系统字段",
          dataIndex: "sysCol",
          width: 70
        }, {
          header: "对用户可见",
          dataIndex: "isVisible",
          width: 80
        }, {
          header: "必须录入",
          dataIndex: "mustInput",
          width: 70
        }, {
          header: "编辑器列占位",
          dataIndex: "colSpan",
          width: 100
        }, {
          header: "列视图宽度(px)",
          dataIndex: "widthInView",
          width: 120,
          align: "right"
        }, {
          header: "编辑界面中显示次序",
          dataIndex: "showOrder",
          width: 140,
          align: "right"
        }, {
          header: "视图中显示次序",
          dataIndex: "showOrderInView",
          width: 130,
          align: "right"
        }, {
          header: "编辑器类型",
          dataIndex: "editorXtype",
          width: 130
        }, {
          header: "备注",
          dataIndex: "note",
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

  _onAddCategory() {
    const me = this;

    const slnCode = me.comboSolution.getValue();
    const sln = me.comboSolution.findRecordByValue(slnCode);
    if (!sln) {
      me.showInfo("没有选择解决方案");
      return;
    }
    const slnName = sln.get("name");

    const form = Ext.create("PSI.CodeTable.CategoryEditForm", {
      parentForm: me,
      slnCode, slnName,
    });

    form.show();
  },

  refreshCategoryGrid(id) {
    const me = this;
    const grid = me.getCategoryGrid();

    const slnCode = me.comboSolution.getValue();

    const el = grid.getEl() || Ext.getBody();
    el.mask(PSI.Const.LOADING);
    const r = {
      url: me.URL("Home/CodeTable/categoryList"),
      params: {
        slnCode
      },
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

  _onEditCategory() {
    const me = this;
    const slnCode = me.comboSolution.getValue();
    const sln = me.comboSolution.findRecordByValue(slnCode);
    if (!sln) {
      me.showInfo("没有选择解决方案");
      return;
    }
    const slnName = sln.get("name");

    const item = me.getCategoryGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要编辑的码表分类");
      return;
    }

    const category = item[0];

    if (category.get("isSystem") == 1) {
      me.showInfo("不能编辑系统分类");
      return;
    }

    const form = Ext.create("PSI.CodeTable.CategoryEditForm", {
      parentForm: me,
      entity: category,
      slnCode, slnName,
    });

    form.show();
  },

  _onDeleteCategory() {
    const me = this;
    const item = me.getCategoryGrid().getSelectionModel().getSelection();

    if (item == null || item.length != 1) {
      me.showInfo("请选择要删除的码表分类");
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

    const info = `请确认是否删除码表分类: <span style='color:red'>${category.get("name")}</span> ?`;

    const funcConfirm = () => {
      const el = Ext.getBody();
      el.mask("正在删除中...");

      const r = {
        url: me.URL("Home/CodeTable/deleteCodeTableCategory"),
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

  _onCategoryGridSelect() {
    const me = this;
    me.refreshMainGrid();
  },

  refreshMainGrid(id) {
    const me = this;
    me.getColsGrid().setTitle(me.formatGridHeaderTitle("码表列"));
    me.getColsGrid().getStore().removeAll();

    const item = me.getCategoryGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.getMainGrid().setTitle(me.formatGridHeaderTitle("码表"));
      return;
    }

    const category = item[0];

    const grid = me.getMainGrid();
    grid.setTitle(me.formatGridHeaderTitle("属于分类["
      + category.get("name") + "]的码表"));
    const el = grid.getEl() || Ext.getBody();
    el.mask(PSI.Const.LOADING);
    const r = {
      url: me.URL("Home/CodeTable/codeTableList"),
      params: {
        categoryId: category.get("id")
      },
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

  _onAddCodeTable() {
    const me = this;

    const slnCode = me.comboSolution.getValue();
    const sln = me.comboSolution.findRecordByValue(slnCode);
    if (!sln) {
      me.showInfo("没有选择解决方案");
      return;
    }
    const slnName = sln.get("name");

    const item = me.getCategoryGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择一个的码表分类");
      return;
    }

    const category = item[0];

    const form = Ext.create("PSI.CodeTable.CodeTableEditForm", {
      parentForm: me,
      category,
      slnCode,
      slnName,
    });
    form.show();
  },

  _onEditCodeTable() {
    const me = this;

    const item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要编辑的码表");
      return;
    }

    const codeTable = item[0];

    const form = Ext.create("PSI.CodeTable.CodeTableEditForm", {
      parentForm: me,
      entity: codeTable
    });
    form.show();
  },

  onMainGridSelect() {
    const me = this;
    me.refreshColsGrid();
  },

  refreshColsGrid(id) {
    const me = this;
    const item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.getMainGrid().setTitle(me.formatGridHeaderTitle("码表"));
      me.getColsGrid().setTitle(me.formatGridHeaderTitle("码表列"));
      return;
    }

    const codeTable = item[0];

    const grid = me.getColsGrid();
    grid.setTitle(me.formatGridHeaderTitle("属于码表["
      + codeTable.get("name") + "]的列"));
    const el = grid.getEl() || Ext.getBody();
    el.mask(PSI.Const.LOADING);
    const r = {
      url: me.URL("Home/CodeTable/codeTableColsList"),
      params: {
        id: codeTable.get("id")
      },
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

  _onDeleteCodeTable() {
    const me = this;
    const item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要删除的码表");
      return;
    }

    const codeTable = item[0];

    const store = me.getMainGrid().getStore();
    let index = store.findExact("id", codeTable.get("id"));
    index--;
    let preIndex = null;
    const preItem = store.getAt(index);
    if (preItem) {
      preIndex = preItem.get("id");
    }

    const info = `请确认是否删除码表: <span style='color:red'>${codeTable.get("name")}</span> ?<br /><br />当前操作只删除码表元数据，数据库实际表不会删除`;

    const funcConfirm = () => {
      const el = Ext.getBody();
      el.mask("正在删除中...");

      const r = {
        url: me.URL("Home/CodeTable/deleteCodeTable"),
        params: {
          id: codeTable.get("id")
        },
        callback(options, success, response) {
          el.unmask();

          if (success) {
            const data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成删除操作");
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

  onAddCol() {
    const me = this;

    const item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要新建列的码表");
      return;
    }

    const codeTable = item[0];

    const form = Ext.create("PSI.CodeTable.CodeTableColEditForm", {
      codeTable: codeTable,
      parentForm: me
    });
    form.show();
  },

  onEditCol() {
    const me = this;

    let item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要编辑列的码表");
      return;
    }

    const codeTable = item[0];

    item = me.getColsGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要编辑的列");
      return;
    }
    const col = item[0];

    const form = Ext.create("PSI.CodeTable.CodeTableColEditForm", {
      codeTable: codeTable,
      entity: col,
      parentForm: me
    });
    form.show();
  },

  // 删除码表列
  onDeleteCol() {
    const me = this;
    let item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择码表");
      return;
    }
    const codeTable = item[0];

    item = me.getColsGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要删除的列");
      return;
    }
    const col = item[0];

    const store = me.getColsGrid().getStore();
    let index = store.findExact("id", col.get("id"));
    index--;
    let preIndex = null;
    const preItem = store.getAt(index);
    if (preItem) {
      preIndex = preItem.get("id");
    }

    const info = "请确认是否删除码表列: <span style='color:red'>"
      + col.get("caption")
      + "</span><br /><br />当前操作只删除码表列的元数据，数据库表的字段不会删除";

    const funcConfirm = () => {
      const el = Ext.getBody();
      el.mask("正在删除中...");

      const r = {
        url: me.URL("Home/CodeTable/deleteCodeTableCol"),
        params: {
          tableId: codeTable.get("id"),
          id: col.get("id")
        },
        callback(options, success, response) {
          el.unmask();

          if (success) {
            const data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成删除操作");
              me.refreshColsGrid(preIndex);
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

  onConvertToSys() {
    const me = this;
    const item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要操作的码表");
      return;
    }

    const codeTable = item[0];

    const info = "请确认是否把码表: <span style='color:red'>"
      + codeTable.get("name")
      + "</span> 转化为系统固有码表?";
    const id = codeTable.get("id");

    const funcConfirm = () => {
      const el = Ext.getBody();
      el.mask("正在处理中...");

      const r = {
        url: me.URL("Home/CodeTable/convertCodeTable"),
        params: {
          id: id
        },
        callback(options, success, response) {
          el.unmask();

          if (success) {
            const data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成操作");
              me.refreshMainGrid(id);
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

  // 调整编辑界面字段显示次序
  onChangeEditShowOrder() {
    const me = this;

    const item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择码表");
      return;
    }

    const codeTable = item[0];

    const form = Ext.create("PSI.CodeTable.CodeTableEditColShowOrderForm", {
      codeTable: codeTable,
      parentForm: me
    });
    form.show();
  },

  // 生成SQL语句
  onGenSQL() {
    const me = this;
    const item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择码表");
      return;
    }

    const codeTable = item[0];

    const form = Ext.create("PSI.CodeTable.CodeTableGenSQLForm", {
      codeTable: codeTable
    });
    form.show();
  },

  // 解决方案combo选中项改变的时候的时间处理函数
  _onComboSolutionSelect() {
    const me = this;

    me.getMainGrid().setTitle(me.formatGridHeaderTitle("码表"));
    me.getMainGrid().getStore().removeAll();
    me.getColsGrid().setTitle(me.formatGridHeaderTitle("码表列"));
    me.getColsGrid().getStore().removeAll();

    me.refreshCategoryGrid();
  },

  querySolutionList() {
    const me = this;
    const el = Ext.getBody();
    const comboCompany = me.comboSolution;
    const store = comboCompany.getStore();
    el.mask(PSI.Const.LOADING);
    const r = {
      url: me.URL("Home/CodeTable/querySolutionList"),
      callback(options, success, response) {
        el.unmask();
        store.removeAll();

        if (success) {
          const data = me.decodeJSON(response.responseText);
          store.add(data);
          if (data.length > 0) {
            comboCompany.setValue(data[0]["code"]);
            me.refreshCategoryGrid();
          }
        }

      }
    };
    me.ajax(r);
  },
});
