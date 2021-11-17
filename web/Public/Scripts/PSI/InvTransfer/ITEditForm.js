/**
 * 调拨单
 */
Ext.define("PSI.InvTransfer.ITEditForm", {
  extend: "PSI.AFX.BaseDialogForm",

  initComponent: function () {
    var me = this;
    me.__readonly = false;
    var entity = me.getEntity();
    me.adding = entity == null;

    var title = entity == null ? "新建调拨单" : "编辑调拨单";
    title = me.formatTitle(title);

    Ext.apply(me, {
      header: {
        title: title,
        height: 40
      },
      maximized: true,
      width: 1000,
      height: 600,
      layout: "border",
      defaultFocus: "editFromWarehouse",
      tbar: [{
        text: "保存",
        iconCls: "PSI-button-ok",
        handler: me.onOK,
        scope: me,
        id: "buttonSave"
      }, "-", {
        text: "取消",
        handler: function () {
          if (me.__readonly) {
            me.close();
            return;
          }
          PSI.MsgBox.confirm("请确认是否取消当前操作?", function () {
            me.close();
          });
        },
        scope: me,
        id: "buttonCancel"
      }, "->", {
        text: "表单通用操作指南",
        iconCls: "PSI-help",
        handler: function () {
          me.focus();
          window.open(me.URL("Home/Help/index?t=commBill"));
        }
      }, "-", {
        fieldLabel: "快捷访问",
        labelSeparator: "",
        margin: "5 5 5 0",
        cls: "PSI-toolbox",
        labelAlign: "right",
        labelWidth: 50,
        emptyText: "双击此处弹出选择框",
        xtype: "psi_mainmenushortcutfield"
      }],
      items: [{
        region: "center",
        border: 0,
        bodyPadding: 10,
        layout: "fit",
        items: [me.getGoodsGrid()]
      }, {
        region: "north",
        border: 0,
        layout: {
          type: "table",
          columns: 4
        },
        height: 60,
        bodyPadding: 10,
        items: [{
          xtype: "hidden",
          id: "hiddenId",
          name: "id",
          value: entity == null ? null : entity
            .get("id")
        }, {
          id: "editRef",
          fieldLabel: "单号",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "",
          xtype: "displayfield",
          value: "<span style='color:red'>保存后自动生成</span>"
        }, {
          id: "editBizDT",
          fieldLabel: "业务日期",
          allowBlank: false,
          blankText: "没有输入业务日期",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          xtype: "datefield",
          format: "Y-m-d",
          value: new Date(),
          name: "bizDT",
          listeners: {
            specialkey: {
              fn: me.onEditBizDTSpecialKey,
              scope: me
            }
          }
        }, {
          id: "editFromWarehouse",
          fieldLabel: "调出仓库",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "",
          xtype: "psi_warehousefield",
          fid: "2009",
          allowBlank: false,
          blankText: "没有输入调出仓库",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          listeners: {
            specialkey: {
              fn: me.onEditFromWarehouseSpecialKey,
              scope: me
            }
          }
        }, {
          id: "editToWarehouse",
          fieldLabel: "调入仓库",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "",
          xtype: "psi_warehousefield",
          fid: "2009",
          allowBlank: false,
          blankText: "没有输入调入仓库",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          listeners: {
            specialkey: {
              fn: me.onEditToWarehouseSpecialKey,
              scope: me
            }
          }
        }, {
          id: "editBizUser",
          fieldLabel: "业务员",
          xtype: "psi_userfield",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "",
          allowBlank: false,
          blankText: "没有输入业务员",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          listeners: {
            specialkey: {
              fn: me.onEditBizUserSpecialKey,
              scope: me
            }
          }
        }, {
          id: "editBillMemo",
          fieldLabel: "备注",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "",
          colspan: 3,
          width: 680,
          xtype: "textfield",
          listeners: {
            specialkey: {
              fn: me.onEditBillMemoSpecialKey,
              scope: me
            }
          }
        }]
      }],
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
  },

  onWindowBeforeUnload: function (e) {
    return (window.event.returnValue = e.returnValue = '确认离开当前页面？');
  },

  onWndClose: function () {
    // 加上这个调用是为了解决 #IMQB2 - https://gitee.com/crm8000/PSI/issues/IMQB2
    // 这个只是目前的临时应急方法，实现的太丑陋了
    Ext.WindowManager.hideAll();

    Ext.get(window).un('beforeunload', this.onWindowBeforeUnload);
  },

  onWndShow: function () {
    Ext.get(window).on('beforeunload', this.onWindowBeforeUnload);

    var me = this;
    me.__canEditGoodsPrice = false;
    var el = me.getEl() || Ext.getBody();
    el.mask(PSI.Const.LOADING);
    Ext.Ajax.request({
      url: PSI.Const.BASE_URL + "Home/InvTransfer/itBillInfo",
      params: {
        id: Ext.getCmp("hiddenId").getValue()
      },
      method: "POST",
      callback: function (options, success, response) {
        el.unmask();

        if (success) {
          var data = Ext.JSON.decode(response.responseText);

          if (data.ref) {
            Ext.getCmp("editRef").setValue(data.ref);
          }

          Ext.getCmp("editBizUser")
            .setIdValue(data.bizUserId);
          Ext.getCmp("editBizUser")
            .setValue(data.bizUserName);
          if (data.bizDT) {
            Ext.getCmp("editBizDT").setValue(data.bizDT);
          }
          if (data.fromWarehouseId) {
            Ext.getCmp("editFromWarehouse")
              .setIdValue(data.fromWarehouseId);
            Ext.getCmp("editFromWarehouse")
              .setValue(data.fromWarehouseName);
          }
          if (data.toWarehouseId) {
            Ext.getCmp("editToWarehouse")
              .setIdValue(data.toWarehouseId);
            Ext.getCmp("editToWarehouse")
              .setValue(data.toWarehouseName);
          }
          if (data.billMemo) {
            Ext.getCmp("editBillMemo")
              .setValue(data.billMemo);
          }

          var store = me.getGoodsGrid().getStore();
          store.removeAll();
          if (data.items) {
            store.add(data.items);
          }
          if (store.getCount() == 0) {
            store.add({});
          }

          if (data.billStatus && data.billStatus != 0) {
            me.setBillReadonly();
          }

        } else {
          PSI.MsgBox.showInfo("网络错误")
        }
      }
    });
  },

  onOK: function () {
    var me = this;
    Ext.getBody().mask("正在保存中...");
    Ext.Ajax.request({
      url: PSI.Const.BASE_URL + "Home/InvTransfer/editITBill",
      method: "POST",
      params: {
        adding: me.adding ? "1" : "0",
        jsonStr: me.getSaveData()
      },
      callback: function (options, success, response) {
        Ext.getBody().unmask();

        if (success) {
          var data = Ext.JSON.decode(response.responseText);
          if (data.success) {
            me.close();
            me.getParentForm().refreshMainGrid(data.id);
            me.tip("成功保存数据");
          } else {
            PSI.MsgBox.showInfo(data.msg);
          }
        }
      }
    });
  },

  onEditBizDTSpecialKey: function (field, e) {
    if (e.getKey() == e.ENTER) {
      Ext.getCmp("editFromWarehouse").focus();
    }
  },

  onEditFromWarehouseSpecialKey: function (field, e) {
    if (e.getKey() == e.ENTER) {
      Ext.getCmp("editToWarehouse").focus();
    }
  },
  onEditToWarehouseSpecialKey: function (field, e) {
    if (e.getKey() == e.ENTER) {
      Ext.getCmp("editBizUser").focus();
    }
  },
  onEditBizUserSpecialKey: function (field, e) {
    if (e.getKey() == e.ENTER) {
      Ext.getCmp("editBillMemo").focus();
    }
  },

  onEditBillMemoSpecialKey: function (field, e) {
    if (this.__readonly) {
      return;
    }

    if (e.getKey() == e.ENTER) {
      var me = this;
      var store = me.getGoodsGrid().getStore();
      if (store.getCount() == 0) {
        store.add({});
      }
      me.getGoodsGrid().focus();
      me.__cellEditing.startEdit(0, 1);
    }
  },

  getGoodsGrid: function () {
    var me = this;
    if (me.__goodsGrid) {
      return me.__goodsGrid;
    }
    var modelName = "PSIITBillDetail_EditForm";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "goodsId", "goodsCode", "goodsName",
        "goodsSpec", "unitName", "goodsCount", "memo"]
    });
    var store = Ext.create("Ext.data.Store", {
      autoLoad: false,
      model: modelName,
      data: []
    });

    me.__cellEditing = Ext.create("PSI.UX.CellEditing", {
      clicksToEdit: 1,
      listeners: {
        edit: {
          fn: me.cellEditingAfterEdit,
          scope: me
        }
      }
    });

    me.__goodsGrid = Ext.create("Ext.grid.Panel", {
      viewConfig: {
        enableTextSelection: true,
        markDirty: !me.adding
      },
      plugins: [me.__cellEditing],
      columnLines: true,
      columns: [Ext.create("Ext.grid.RowNumberer", {
        text: "#",
        width: 30
      }), {
        header: "物料编码",
        dataIndex: "goodsCode",
        menuDisabled: true,
        draggable: false,
        sortable: false,
        editor: {
          xtype: "psi_goodsfield",
          parentCmp: me
        }
      }, {
        menuDisabled: true,
        draggable: false,
        sortable: false,
        header: "品名/规格型号",
        dataIndex: "goodsName",
        width: 330,
        renderer: function (value, metaData, record) {
          return record.get("goodsName") + " " + record.get("goodsSpec");
        }
      }, {
        header: "调拨数量",
        dataIndex: "goodsCount",
        menuDisabled: true,
        draggable: false,
        sortable: false,
        align: "right",
        width: 90,
        editor: {
          xtype: "numberfield",
          allowDecimals: PSI.Const.GC_DEC_NUMBER > 0,
          decimalPrecision: PSI.Const.GC_DEC_NUMBER,
          minValue: 0,
          hideTrigger: true
        }
      }, {
        header: "单位",
        dataIndex: "unitName",
        menuDisabled: true,
        sortable: false,
        draggable: false,
        width: 60,
        algin: "center"
      }, {
        header: "备注",
        dataIndex: "memo",
        menuDisabled: true,
        sortable: false,
        draggable: false,
        width: 200,
        editor: {
          xtype: "textfield"
        }
      }, {
        header: "",
        align: "center",
        menuDisabled: true,
        draggable: false,
        width: 50,
        xtype: "actioncolumn",
        id: "columnActionDelete",
        items: [{
          icon: PSI.Const.BASE_URL
            + "Public/Images/icons/delete.png",
          tooltip: "删除当前记录",
          handler: function (grid, row) {
            var store = grid.getStore();
            store.remove(store.getAt(row));
            if (store.getCount() == 0) {
              store.add({});
            }
          },
          scope: me
        }]
      }, {
        header: "",
        id: "columnActionAdd",
        align: "center",
        menuDisabled: true,
        draggable: false,
        width: 50,
        xtype: "actioncolumn",
        items: [{
          icon: PSI.Const.BASE_URL
            + "Public/Images/icons/insert.png",
          tooltip: "在当前记录之前插入新记录",
          handler: function (grid, row) {
            var store = grid.getStore();
            store.insert(row, [{}]);
          },
          scope: me
        }]
      }, {
        header: "",
        id: "columnActionAppend",
        align: "center",
        menuDisabled: true,
        draggable: false,
        width: 50,
        xtype: "actioncolumn",
        items: [{
          icon: PSI.Const.BASE_URL
            + "Public/Images/icons/add.png",
          tooltip: "在当前记录之后新增记录",
          handler: function (grid, row) {
            var store = grid.getStore();
            store.insert(row + 1, [{}]);
          },
          scope: me
        }]
      }],
      store: store,
      listeners: {
        cellclick: function () {
          return !me.__readonly;
        }
      }
    });

    return me.__goodsGrid;
  },

  cellEditingAfterEdit: function (editor, e) {
    var me = this;

    var fieldName = e.field;
    if (fieldName == "memo") {
      var store = me.getGoodsGrid().getStore();
      if (e.rowIdx == store.getCount() - 1) {
        store.add({});
        var row = e.rowIdx + 1;
        me.getGoodsGrid().getSelectionModel().select(row);
        me.__cellEditing.startEdit(row, 1);
      }
    }
  },

  // xtype:psi_goodsfield回调本方法
  // 参见PSI.Goods.GoodsField的onOK代码
  __setGoodsInfo: function (data) {
    var me = this;
    var item = me.getGoodsGrid().getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return;
    }
    var goods = item[0];

    goods.set("goodsId", data.id);
    goods.set("goodsCode", data.code);
    goods.set("goodsName", data.name);
    goods.set("unitName", data.unitName);
    goods.set("goodsSpec", data.spec);
  },

  getSaveData: function () {
    var result = {
      id: Ext.getCmp("hiddenId").getValue(),
      bizDT: Ext.Date
        .format(Ext.getCmp("editBizDT").getValue(), "Y-m-d"),
      fromWarehouseId: Ext.getCmp("editFromWarehouse").getIdValue(),
      toWarehouseId: Ext.getCmp("editToWarehouse").getIdValue(),
      bizUserId: Ext.getCmp("editBizUser").getIdValue(),
      billMemo: Ext.getCmp("editBillMemo").getValue(),
      items: []
    };

    var store = this.getGoodsGrid().getStore();
    for (var i = 0; i < store.getCount(); i++) {
      var item = store.getAt(i);
      result.items.push({
        id: item.get("id"),
        goodsId: item.get("goodsId"),
        goodsCount: item.get("goodsCount"),
        memo: item.get("memo")
      });
    }

    return Ext.JSON.encode(result);
  },

  setBillReadonly: function () {
    var me = this;
    me.__readonly = true;
    me.setTitle("<span style='font-size:160%'>查看调拨单</span>");
    Ext.getCmp("buttonSave").setDisabled(true);
    Ext.getCmp("buttonCancel").setText("关闭");
    Ext.getCmp("editBizDT").setReadOnly(true);
    Ext.getCmp("editFromWarehouse").setReadOnly(true);
    Ext.getCmp("editToWarehouse").setReadOnly(true);
    Ext.getCmp("editBizUser").setReadOnly(true);
    Ext.getCmp("columnActionDelete").hide();
    Ext.getCmp("columnActionAdd").hide();
    Ext.getCmp("columnActionAppend").hide();
  }
});
