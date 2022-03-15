﻿/**
 * 自定义字段 - 商品字段，带销售价格
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
PCL.define("PSI.Goods.GoodsWithSalePriceField", {
  extend: "PCL.form.field.Trigger",
  alias: "widget.psi_goods_with_saleprice_field",

  config: {
    parentCmp: null,
    editCustomerName: null,
    editWarehouseName: null,
    showAddButton: false,
    sumInv: "0", // 是否合计当前库存：0 - 不合计；1 - 合计
  },

  /**
   * 初始化组件
   */
  initComponent: function () {
    var me = this;

    me.enableKeyEvents = true;

    me.callParent(arguments);

    me.on("keydown", function (field, e) {
      if (e.getKey() == e.BACKSPACE) {
        field.setValue(null);
        e.preventDefault();
        return false;
      }

      if (e.getKey() != e.ENTER && !e.isSpecialKey(e.getKey())) {
        this.onTriggerClick(e);
      }
    });

    me.on({
      render: function (p) {
        p.getEl().on("dblclick", function () {
          me.onTriggerClick();
        });
      },
      single: true
    });
  },

  /**
   * 单击下拉组件
   */
  onTriggerClick: function (e) {
    var me = this;
    var modelName = "PSIGoodsField";
    PCL.define(modelName, {
      extend: "PCL.data.Model",
      fields: ["id", "code", "name", "spec", "unitName",
        "salePrice", "memo", "priceSystem", "taxRate", "invCnt"]
    });

    var store = PCL.create("PCL.data.Store", {
      model: modelName,
      autoLoad: false,
      data: []
    });
    var lookupGrid = PCL.create("PCL.grid.Panel", {
      cls: "PSI",
      columnLines: true,
      border: 1,
      store: store,
      columns: [{
        header: "编码",
        dataIndex: "code",
        menuDisabled: true,
        width: 70
      }, {
        header: "商品",
        dataIndex: "name",
        menuDisabled: true,
        flex: 1
      }, {
        header: "规格型号",
        dataIndex: "spec",
        menuDisabled: true,
        flex: 1
      }, {
        header: me.getSumInv() == "1" ? "当前库存合计" : "当前库存",
        dataIndex: "invCnt",
        menuDisabled: true,
        align: "right",
        width: 100
      }, {
        header: "单位",
        dataIndex: "unitName",
        menuDisabled: true,
        width: 60
      }, {
        header: "销售价",
        dataIndex: "salePrice",
        menuDisabled: true,
        align: "right",
        xtype: "numbercolumn"
      }, {
        header: "价格体系",
        dataIndex: "priceSystem",
        menuDisabled: true,
        width: 80
      }, {
        header: "备注",
        dataIndex: "memo",
        menuDisabled: true,
        width: 300
      }]
    });
    me.lookupGrid = lookupGrid;
    me.lookupGrid.on("itemdblclick", me.onOK, me);

    var buttons = [];
    if (me.getShowAddButton()) {
      buttons.push({
        text: "新建商品",
        handler: me.onAddGoods,
        iconCls: "PSI-button-add",
        scope: me
      });
    }
    buttons.push({
      text: "确定",
      handler: me.onOK,
      scope: me
    }, {
      text: "取消",
      handler: function () {
        wnd.close();
      }
    });

    var wnd = PCL.create("PCL.window.Window", {
      title: "选择 - 商品",
      header: false,
      border: 0,
      width: 1050,
      height: 300,
      layout: "border",
      items: [{
        region: "center",
        xtype: "panel",
        layout: "fit",
        border: 0,
        items: [lookupGrid]
      }, {
        xtype: "panel",
        region: "south",
        height: 90,
        layout: "fit",
        border: 0,
        items: [{
          xtype: "form",
          layout: "form",
          bodyPadding: 5,
          bodyCls: "PSI-Field",
          items: [{
            id: "__editGoods",
            xtype: "textfield",
            fieldLabel: "商品",
            labelWidth: 50,
            labelAlign: "right",
            labelSeparator: ""
          }, {
            xtype: "displayfield",
            fieldLabel: " ",
            value: "输入编码、商品名称拼音字头、规格型号拼音字头可以过滤查询",
            labelWidth: 50,
            labelAlign: "right",
            labelSeparator: ""
          }, {
            xtype: "displayfield",
            fieldLabel: " ",
            value: "↑ ↓ 键改变当前选择项 ；回车键返回",
            labelWidth: 50,
            labelAlign: "right",
            labelSeparator: ""
          }]
        }]
      }],
      buttons: buttons
    });

    var customerId = null;
    var editCustomer = PCL.getCmp(me.getEditCustomerName());
    if (editCustomer) {
      customerId = editCustomer.getIdValue();
    }

    var warehouseId = null;
    var editWarehouse = PCL.getCmp(me.getEditWarehouseName());
    if (editWarehouse) {
      warehouseId = editWarehouse.getIdValue();
    }

    wnd.on("close", function () {
      me.focus();
    });
    wnd.on("deactivate", function () {
      wnd.close();
    });

    me.wnd = wnd;

    var editName = PCL.getCmp("__editGoods");
    editName.on("change", function () {
      var store = me.lookupGrid.getStore();
      PCL.Ajax.request({
        url: PSI.Const.BASE_URL
          + "Home/Goods/queryDataWithSalePrice",
        params: {
          queryKey: editName.getValue(),
          customerId: customerId,
          warehouseId: warehouseId,
          sumInv: me.getSumInv(),
        },
        method: "POST",
        callback: function (opt, success, response) {
          store.removeAll();
          if (success) {
            var data = PCL.JSON.decode(response.responseText);
            store.add(data);
            if (data.length > 0) {
              me.lookupGrid.getSelectionModel().select(0);
              editName.focus();
            }
          } else {
            PSI.MsgBox.showInfo("网络错误");
          }
        },
        scope: this
      });

    }, me);

    editName.on("specialkey", function (field, e) {
      if (e.getKey() == e.ENTER) {
        me.onOK();
      } else if (e.getKey() == e.UP) {
        var m = me.lookupGrid.getSelectionModel();
        var store = me.lookupGrid.getStore();
        var index = 0;
        for (var i = 0; i < store.getCount(); i++) {
          if (m.isSelected(i)) {
            index = i;
          }
        }
        index--;
        if (index < 0) {
          index = 0;
        }
        m.select(index);
        e.preventDefault();
        editName.focus();
      } else if (e.getKey() == e.DOWN) {
        var m = me.lookupGrid.getSelectionModel();
        var store = me.lookupGrid.getStore();
        var index = 0;
        for (var i = 0; i < store.getCount(); i++) {
          if (m.isSelected(i)) {
            index = i;
          }
        }
        index++;
        if (index > store.getCount() - 1) {
          index = store.getCount() - 1;
        }
        m.select(index);
        e.preventDefault();
        editName.focus();
      }
    }, me);

    me.wnd.on("show", function () {
      editName.focus();
      editName.fireEvent("change");
    }, me);
    wnd.showBy(me);
  },

  onOK: function () {
    var me = this;
    var grid = me.lookupGrid;
    var item = grid.getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return;
    }

    var data = item[0].getData();

    me.wnd.close();
    me.focus();
    me.setValue(data.code);
    me.focus();

    if (me.getParentCmp() && me.getParentCmp().__setGoodsInfo) {
      me.getParentCmp().__setGoodsInfo(data)
    }
  },

  onAddGoods: function () {
    var form = PCL.create("PSI.Goods.GoodsEditForm");

    form.show();
  }
});
