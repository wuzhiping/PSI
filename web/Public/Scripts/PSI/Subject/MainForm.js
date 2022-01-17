/**
 * 会计科目 - 主界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.Subject.MainForm", {
  extend: "PSI.AFX.Form.MainForm",

  /**
   * 初始化组件
   * 
   * @override
   */
  initComponent() {
    const me = this;

    Ext.apply(me, {
      tbar: me.getToolbarCmp(),
      items: [{
        region: "north",
        border: 0,
        height: 2,
      }, {
        id: "companyPanel",
        region: "west",
        width: 300,
        layout: "fit",
        border: 0,
        split: true,
        header: false,
        collapsible: true,
        items: [me.getCompanyGrid()]
      }, {
        region: "center",
        xtype: "panel",
        layout: "border",
        border: 0,
        items: [{
          region: "north",
          height: "40%",
          layout: "fit",
          split: true,
          border: 0,
          items: me.getMainGrid()
        }, {
          region: "center",
          layout: "border",
          border: 1,
          tbar: me.getFmtToolbarCmp(),
          items: [{
            region: "west",
            width: 300,
            layout: "fit",
            split: true,
            border: 0,
            items: me
              .getFmtPropGrid()
          }, {
            region: "center",
            border: 0,
            layout: "fit",
            items: me
              .getFmtColsGrid()
          }]
        }]
      }]
    });

    me.callParent(arguments);

    me.refreshCompanyGrid();
  },

  getToolbarCmp() {
    const me = this;
    return [{
      text: "初始化国家标准科目",
      handler: me.onInit,
      scope: me
    }, "-", {
      text: "新建科目",
      handler: me.onAddSubject,
      scope: me
    }, "-", {
      text: "编辑科目",
      handler: me.onEditSubject,
      scope: me
    }, "-", {
      text: "删除科目",
      handler: me.onDeleteSubject,
      scope: me
    }, "-", {
      text: "关闭",
      handler() {
        me.closeWindow();
      }
    }];
  },

  getFmtToolbarCmp() {
    const me = this;
    return [{
      text: "初始化科目的标准账样",
      handler: me.onInitFmt,
      scope: me
    }, "-", {
      text: "清空标准账样设置",
      handler: me.onUndoInitFmt,
      scope: me
    }, "-", {
      text: "新建账样字段",
      handler: me.onAddFmtCol,
      scope: me
    }, "-", {
      text: "编辑账样字段",
      handler: me.onEditFmtCol,
      scope: me
    }, "-", {
      text: "删除账样字段",
      handler: me.onDeleteFmtCol,
      scope: me
    }, "-", {
      text: "设置字段显示次序",
      handler: me.onEditFmtColShowOrder,
      scope: me
    }, "-", {
      text: "启用账样",
      handler: me.onEnableFmt,
      scope: me
    }];
  },

  refreshCompanyGrid() {
    const me = this;
    const el = Ext.getBody();
    var store = me.getCompanyGrid().getStore();
    el.mask(PSI.Const.LOADING);
    const r = {
      url: me.URL("Home/Subject/companyList"),
      callback(options, success, response) {
        store.removeAll();

        if (success) {
          const data = me.decodeJSON(response.responseText);
          store.add(data);
          if (store.getCount() > 0) {
            me.getCompanyGrid().getSelectionModel().select(0);
          }
        }

        el.unmask();
      }
    };
    me.ajax(r);
  },

  getCompanyGrid() {
    const me = this;
    if (me.__companyGrid) {
      return me.__companyGrid;
    }

    const modelName = "PSI_Subject_Company";

    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "code", "name", "orgType"]
    });

    me.__companyGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("独立核算组织机构")
      },
      tools: [{
        type: "close",
        handler() {
          Ext.getCmp("companyPanel").collapse();
        }
      }],
      forceFit: true,
      columnLines: true,
      columns: [{
        header: "编码",
        dataIndex: "code",
        menuDisabled: true,
        sortable: false,
        width: 70
      }, {
        header: "组织机构名称",
        dataIndex: "name",
        flex: 1,
        menuDisabled: true,
        sortable: false
      }, {
        header: "组织机构性质",
        dataIndex: "orgType",
        width: 100,
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
          fn: me.onCompanyGridSelect,
          scope: me
        }
      }
    });
    return me.__companyGrid;
  },

  onCompanyGridSelect() {
    const me = this;
    me.getFmtPropGrid().setTitle("账样属性");
    me.getFmtPropGrid().getStore().removeAll();
    me.getFmtColsGrid().setTitle("账样字段");
    me.getFmtColsGrid().getStore().removeAll();

    me.getMainGrid().setTitle(me.formatGridHeaderTitle("会计科目"));
    const item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return;
    }

    const company = item[0];
    const title = Ext.String.format("<span class='PSI-title-keyword'>{0}</span> - 会计科目", company.get("name"));
    me.getMainGrid().setTitle(me.formatGridHeaderTitle(title));

    const store = me.getMainGrid().getStore();
    store.load();
  },

  onAddSubject() {
    const me = this;
    const item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择公司");
      return;
    }

    const company = item[0];

    const form = Ext.create("PSI.Subject.EditForm", {
      parentForm: me,
      company: company
    });
    form.show();
  },

  onEditSubject() {
    const me = this;
    let item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择公司");
      return;
    }

    const company = item[0];

    item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择要编辑的科目");
      return;
    }

    const subject = item[0];
    if (!subject.get("id")) {
      me.showInfo("没有获得科目id，请刷新界面");
      return;
    }

    const form = Ext.create("PSI.Subject.EditForm", {
      parentForm: me,
      company: company,
      entity: subject
    });
    form.show();
  },

  onDeleteSubject() {
    const me = this;
    let item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择公司");
      return;
    }

    const company = item[0];

    item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择要删除的科目");
      return;
    }

    const subject = item[0];
    if (!subject.get("id")) {
      me.showInfo("没有获得科目id，请刷新界面");
      return;
    }

    const code = subject.get("code");
    if (!code) {
      me.showInfo("没有获得科目码，请刷新界面");
      return;
    }
    if (code.length == 4) {
      me.showInfo("一级科目不能删除");
      return;
    }

    const info = "请确认是否删除科目: <span style='color:red'>" + code + "</span>?";
    const funcConfirm = () => {
      const el = Ext.getBody();
      el.mask("正在删除中...");
      const r = {
        url: me.URL("Home/Subject/deleteSubject"),
        params: {
          id: subject.get("id")
        },
        callback(options, success, response) {
          el.unmask();

          if (success) {
            const data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成删除操作");
              me.onCompanyGridSelect();
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

  getMainGrid() {
    const me = this;
    if (me.__mainGrid) {
      return me.__mainGrid;
    }

    const modelName = "PSISubject";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "code", "name", "category", "leaf",
        "children", "isLeaf"]
    });

    const store = Ext.create("Ext.data.TreeStore", {
      model: modelName,
      proxy: {
        type: "ajax",
        actionMethods: {
          read: "POST"
        },
        url: me.URL("Home/Subject/subjectList")
      },
      listeners: {
        beforeload: {
          fn() {
            store.proxy.extraParams = me.getQueryParamForSubject();
          },
          scope: me
        }
      }
    });

    me.__mainGrid = Ext.create("Ext.tree.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("会计科目")
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
          draggable: false
        },
        items: [{
          xtype: "treecolumn",
          text: "科目码",
          dataIndex: "code",
          width: 200
        }, {
          text: "科目名称",
          dataIndex: "name",
          width: 400
        }, {
          text: "分类",
          dataIndex: "category",
          width: 80,
          renderer(value) {
            if (value == 1) {
              return "资产";
            } else if (value == 2) {
              return "负债";
            } else if (value == 4) {
              return "所有者权益";
            } else if (value == 5) {
              return "成本";
            } else if (value == 6) {
              return "损益";
            } else {
              return "";
            }
          }
        }, {
          text: "末级科目",
          dataIndex: "isLeaf",
          width: 100
        }]
      },
      listeners: {
        select: {
          fn(rowModel, record) {
            me.onMainGridItemSelect(record);
          },
          scope: me
        }
      }
    });

    return me.__mainGrid;
  },

  getQueryParamForSubject() {
    const me = this;
    const item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return {};
    }

    const company = item[0];

    const result = {
      companyId: company.get("id")
    };

    return result;
  },

  onInit() {
    const me = this;
    const item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("请选择要初始化科目的公司");
      return;
    }

    const company = item[0];

    const confirmFunc = () => {
      const el = Ext.getBody();
      el.mask("正在操作中...");
      const r = {
        url: me.URL("Home/Subject/init"),
        params: {
          id: company.get("id")
        },
        callback(options, success, response) {
          el.unmask();

          if (success) {
            const data = Ext.JSON.decode(response.responseText);
            if (data.success) {
              me.tip("成功完成初始化操作");
              me.onCompanyGridSelect();
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

    const info = `请确认是否初始化<span style='color:red'>${company.get("name")}</span>的科目`;
    me.confirm(info, confirmFunc);
  },

  getFmtPropGrid() {
    var me = this;
    if (me.__fmtPropGrid) {
      return me.__fmtPropGrid;
    }

    var modelName = "PSIFMTProp";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "propName", "propValue"]
    });

    me.__fmtPropGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("账样属性")
      },
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false
        },
        items: [{
          header: "属性名称",
          dataIndex: "propName",
          width: 90
        }, {
          header: "属性值",
          dataIndex: "propValue",
          width: 200
        }]
      },
      store: Ext.create("Ext.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      })
    });

    return me.__fmtPropGrid;
  },

  // 初始化标准账样
  onInitFmt() {
    var me = this;
    var item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择公司");
      return;
    }

    var company = item[0];

    var item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择要初始化账样的科目");
      return;
    }

    var subject = item[0];

    var info = "请确认是否初始化科目: <span style='color:red'>" + subject.get("code")
      + "</span>的账样?";
    const funcConfirm = () => {
      var el = Ext.getBody();
      el.mask("正在初始化中...");
      var r = {
        url: me.URL("Home/Subject/initFmt"),
        params: {
          id: subject.get("id"),
          companyId: company.get("id")
        },
        callback(options, success, response) {
          el.unmask();

          if (success) {
            var data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成操作");
              me.refreshFmtPropGrid();
              me.refreshFmtColsGrid();
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

  // 启用账样
  onEnableFmt() {
    var me = this;
    var item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择要启用账样的科目");
      return;
    }

    PSI.MsgBox.showInfo("TODO");
  },

  getFmtColsGrid() {
    var me = this;
    if (me.__fmtColsGrid) {
      return me.__fmtColsGrid;
    }

    var modelName = "PSIFMTCols";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "showOrder", "caption", "fieldName",
        "fieldType", "fieldLength", "fieldDecimal"]
    });

    me.__fmtColsGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("账样字段")
      },
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false
        },
        items: [{
          header: "排序",
          dataIndex: "showOrder",
          width: 70
        }, {
          header: "列标题",
          dataIndex: "caption",
          width: 200
        }, {
          header: "数据库字段名称",
          dataIndex: "fieldName",
          width: 120
        }, {
          header: "字段类型",
          dataIndex: "fieldType",
          width: 100
        }, {
          header: "字段长度",
          dataIndex: "fieldLength",
          width: 100
        }, {
          header: "字段小数位数",
          dataIndex: "fieldDecimal",
          width: 100
        }]
      },
      store: Ext.create("Ext.data.Store", {
        model: modelName,
        autoLoad: false,
        data: []
      })
    });

    return me.__fmtColsGrid;
  },

  onMainGridItemSelect(record) {
    var me = this;

    if (!record) {
      me.getFmtPropGrid().setTitle("账样属性");
      me.getFmtColsGrid().setTitle("账样字段");
      return;
    }

    var title = Ext.String.format("<span class='PSI-title-keyword'>{0} {1}</span> - 账样属性", record.get("code"),
      record.get("name"));
    me.getFmtPropGrid().setTitle(title);
    var title = Ext.String.format("<span class='PSI-title-keyword'>{0} {1}</span> - 账样字段", record.get("code"),
      record.get("name"));
    me.getFmtColsGrid().setTitle(title);

    me.refreshFmtPropGrid();
    me.refreshFmtColsGrid();
  },

  refreshFmtPropGrid() {
    var me = this;
    var item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return;
    }
    var company = item[0];

    var item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return;
    }
    var subject = item[0];

    var grid = me.getFmtPropGrid();
    var el = grid.getEl();
    el && el.mask(PSI.Const.LOADING);

    var r = {
      url: me.URL("Home/Subject/fmtPropList"),
      params: {
        id: subject.get("id"),
        companyId: company.get("id")
      },
      callback(options, success, response) {
        var store = grid.getStore();

        store.removeAll();

        if (success) {
          var data = me.decodeJSON(response.responseText);
          store.add(data);
        }

        el && el.unmask();
      }
    };
    me.ajax(r);
  },

  refreshFmtColsGrid() {
    var me = this;
    var item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return;
    }
    var company = item[0];

    var item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return;
    }
    var subject = item[0];

    var grid = me.getFmtColsGrid();
    var el = grid.getEl();
    el && el.mask(PSI.Const.LOADING);

    var r = {
      url: me.URL("Home/Subject/fmtColsList"),
      params: {
        id: subject.get("id"),
        companyId: company.get("id")
      },
      callback(options, success, response) {
        var store = grid.getStore();

        store.removeAll();

        if (success) {
          var data = me.decodeJSON(response.responseText);
          store.add(data);
        }

        el && el.unmask();
      }
    };
    me.ajax(r);
  },

  // 清空标准账样
  onUndoInitFmt() {
    var me = this;
    var item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择公司");
      return;
    }

    var company = item[0];

    var item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择要清空账样的科目");
      return;
    }

    var subject = item[0];

    var info = "请确认是否清空科目: <span style='color:red'>" + subject.get("code")
      + "</span> 的账样?";
    const funcConfirm = () => {
      var el = Ext.getBody();
      el.mask("正在操作中...");
      var r = {
        url: me.URL("Home/Subject/undoInitFmt"),
        params: {
          id: subject.get("id"),
          companyId: company.get("id")
        },
        callback(options, success, response) {
          el.unmask();

          if (success) {
            var data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成操作");
              me.refreshFmtPropGrid();
              me.refreshFmtColsGrid();
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

  onAddFmtCol() {
    var me = this;

    var item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择公司");
      return;
    }

    var company = item[0];

    var item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择科目");
      return;
    }

    var subject = item[0];

    if (me.getFmtPropGrid().getStore().getCount() == 0) {
      me.showInfo("还没有初始化标准账样");
      return;
    }

    var form = Ext.create("PSI.Subject.FmtColEditForm", {
      parentForm: me,
      company: company,
      subject: subject
    });
    form.show();
  },

  onEditFmtCol() {
    var me = this;

    var item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择公司");
      return;
    }
    var company = item[0];

    var item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择科目");
      return;
    }
    var subject = item[0];

    if (me.getFmtPropGrid().getStore().getCount() == 0) {
      me.showInfo("还没有初始化标准账样");
      return;
    }

    var item = me.getFmtColsGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择要编辑的账样字段");
      return;
    }
    var entity = item[0];

    var form = Ext.create("PSI.Subject.FmtColEditForm", {
      parentForm: me,
      company: company,
      subject: subject,
      entity: entity
    });
    form.show();
  },

  onDeleteFmtCol() {
    var me = this;
    var item = me.getFmtColsGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择要删除的账样字段");
      return;
    }

    var fmtCol = item[0];

    var info = "请确认是否删除账样字段: <span style='color:red'>"
      + fmtCol.get("caption") + "</span>?";
    const funcConfirm = () => {
      var el = Ext.getBody();
      el.mask("正在删除中...");
      var r = {
        url: me.URL("Home/Subject/deleteFmtCol"),
        params: {
          id: fmtCol.get("id")
        },
        callback(options, success, response) {
          el.unmask();

          if (success) {
            var data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成删除操作");
              me.refreshFmtColsGrid();
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

  onEditFmtColShowOrder() {
    var me = this;
    var item = me.getCompanyGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择公司");
      return;
    }

    var item = me.getMainGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      me.showInfo("没有选择科目");
      return;
    }
    var subject = item[0];

    var store = me.getFmtPropGrid().getStore();
    if (store.getCount() == 0) {
      me.showInfo("还没有初始化标准账样");
      return;
    }

    var form = Ext.create("PSI.Subject.FmtColShowOrderEditForm", {
      parentForm: me,
      entity: subject
    });
    form.show();
  }
});
