/**
 * 采购订单 - 查看界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.Bill.POViewForm", {
  extend: "PSI.AFX.BaseDialogForm",

  config: {
    ref: null
  },

  initComponent: function () {
    var me = this;

    Ext.apply(me, {
      header: {
        title: me.formatTitle("查看采购订单"),
        height: 40,
      },
      modal: true,
      closable: false,
      onEsc: Ext.emptyFn,
      maximized: true,
      width: 1000,
      height: 600,
      layout: "border",
      items: [{
        region: "center",
        layout: "fit",
        border: 0,
        bodyPadding: 10,
        items: [me.getGoodsGrid()]
      }, {
        region: "north",
        id: "editForm",
        layout: {
          type: "table",
          columns: 4
        },
        height: 120,
        bodyPadding: 10,
        border: 0,
        items: [{
          id: "editRef",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "：",
          fieldLabel: "单号",
          xtype: "displayfield",
          value: `<span class='PSI-field-note'>${me.getRef()}</span>`
        }, {
          id: "editDealDate",
          fieldLabel: "交货日期",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "：",
          xtype: "displayfield",
        }, {
          id: "editSupplier",
          colspan: 2,
          width: 430,
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "：",
          xtype: "displayfield",
          fieldLabel: "供应商"
        }, {
          id: "editDealAddress",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "：",
          fieldLabel: "交货地址",
          colspan: 2,
          width: 430,
          xtype: "displayfield",
        }, {
          id: "editContact",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "：",
          fieldLabel: "联系人",
          xtype: "displayfield",
        }, {
          id: "editTel",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "：",
          fieldLabel: "电话",
          xtype: "displayfield",
        }, {
          id: "editFax",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "：",
          fieldLabel: "传真",
          xtype: "displayfield",
        }, {
          id: "editOrg",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "：",
          fieldLabel: "组织机构",
          xtype: "displayfield",
          colspan: 2,
          width: 430
        }, {
          id: "editBizUser",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "：",
          fieldLabel: "业务员",
          xtype: "displayfield",
        }, {
          id: "editPaymentType",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "：",
          fieldLabel: "付款方式",
          xtype: "displayfield",
        }, {
          id: "editBillMemo",
          labelWidth: 70,
          labelAlign: "right",
          labelSeparator: "：",
          fieldLabel: "备注",
          xtype: "displayfield",
          colspan: 3,
          width: 645
        }]
      }],
      listeners: {
        show: {
          fn: me.onWndShow,
          scope: me
        }
      }
    });

    me.callParent(arguments);
  },

  onWndShow: function () {
    var me = this;

    var el = me.getEl() || Ext.getBody();
    el.mask(PSI.Const.LOADING);
    Ext.Ajax.request({
      url: PSI.Const.BASE_URL + "Home/Bill/poBillInfo",
      params: {
        ref: me.getRef()
      },
      method: "POST",
      callback: function (options, success, response) {
        el.unmask();

        if (success) {
          var data = Ext.JSON.decode(response.responseText);

          const _t = (info)=> `<span class='PSI-field-note'>${info}</span>`;

          Ext.getCmp("editSupplier").setValue(_t(data.supplierName));
          Ext.getCmp("editBillMemo").setValue(_t(data.billMemo));
          Ext.getCmp("editDealDate").setValue(_t(data.dealDate));
          Ext.getCmp("editDealAddress").setValue(_t(data.dealAddress));
          Ext.getCmp("editContact").setValue(_t(data.contact));
          Ext.getCmp("editTel").setValue(_t(data.tel));
          Ext.getCmp("editFax").setValue(_t(data.fax));

          Ext.getCmp("editBizUser").setValue(_t(data.bizUserName));
          Ext.getCmp("editOrg").setValue(_t(data.orgFullName));

          Ext.getCmp("editPaymentType").setValue(_t(data.paymentType));

          var store = me.getGoodsGrid().getStore();
          store.removeAll();
          store.add(data.items);
        }
      }
    });
  },

  getGoodsGrid: function () {
    var me = this;
    if (me.__goodsGrid) {
      return me.__goodsGrid;
    }
    var modelName = "PSIPOBillDetail_ViewForm";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "goodsId", "goodsCode",
        "goodsName", "goodsSpec", "unitName",
        "goodsCount", "goodsMoney", "goodsPrice",
        "memo", "taxRate", "tax", "moneyWithTax"]
    });
    var store = Ext.create("Ext.data.Store", {
      autoLoad: false,
      model: modelName,
      data: []
    });

    me.__goodsGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      viewConfig: {
        enableTextSelection: true
      },
      columnLines: true,
      columns: [{
        xtype: "rownumberer",
        width: 40,
        text: "序号"
      }, {
        header: "物料编码",
        dataIndex: "goodsCode",
        menuDisabled: true,
        sortable: false
      }, {
        header: "品名",
        dataIndex: "goodsName",
        menuDisabled: true,
        sortable: false,
        width: 200
      }, {
        header: "规格型号",
        dataIndex: "goodsSpec",
        menuDisabled: true,
        sortable: false,
        width: 200
      }, {
        header: "采购数量",
        dataIndex: "goodsCount",
        menuDisabled: true,
        sortable: false,
        align: "right",
        width: 100
      }, {
        header: "单位",
        dataIndex: "unitName",
        menuDisabled: true,
        sortable: false,
        width: 60
      }, {
        header: "采购单价",
        dataIndex: "goodsPrice",
        menuDisabled: true,
        sortable: false,
        align: "right",
        xtype: "numbercolumn",
        width: 100
      }, {
        header: "采购金额",
        dataIndex: "goodsMoney",
        menuDisabled: true,
        sortable: false,
        align: "right",
        xtype: "numbercolumn",
        width: 120
      }, {
        header: "税率(%)",
        dataIndex: "taxRate",
        menuDisabled: true,
        sortable: false,
        align: "right",
        xtype: "numbercolumn",
        format: "#",
        width: 80
      }, {
        header: "税金",
        dataIndex: "tax",
        menuDisabled: true,
        sortable: false,
        align: "right",
        xtype: "numbercolumn",
        width: 120
      }, {
        header: "价税合计",
        dataIndex: "moneyWithTax",
        menuDisabled: true,
        sortable: false,
        align: "right",
        xtype: "numbercolumn",
        width: 120
      }, {
        header: "备注",
        dataIndex: "memo",
        menuDisabled: true,
        sortable: false,
        width: 200
      }],
      store: store
    });

    return me.__goodsGrid;
  }
});
