/**
 * 表单分类自定义字段
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.Form.FormCategoryField", {
  extend: "Ext.form.field.Trigger",
  alias: "widget.psi_formcategoryfield",

  config: {
    showModal: false
  },

  /**
   * @override
   */
  initComponent() {
    var me = this;

    me.__idValue = null;

    me.enableKeyEvents = true;

    me.callParent(arguments);

    me.on("keydown", (field, e) => {
      if (me.readOnly) {
        return;
      }

      if (e.getKey() == e.BACKSPACE) {
        field.setValue(null);
        me.setIdValue(null);
        e.preventDefault();
        return false;
      }

      if (e.getKey() != e.ENTER && !e.isSpecialKey(e.getKey())) {
        me.onTriggerClick(e);
      }
    });

    me.on({
      render(p) {
        p.getEl().on("dblclick", () => {
          me.onTriggerClick();
        });
      },
      single: true
    });
  },

  /**
   * @override
   */
  onTriggerClick(e) {
    var me = this;
    var modelName = "PSIFormCategoryField";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "code", "name"]
    });

    var store = Ext.create("Ext.data.Store", {
      model: modelName,
      autoLoad: false,
      data: []
    });
    var lookupGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      columnLines: true,
      store: store,
      columns: [{
        header: "编码",
        dataIndex: "code",
        menuDisabled: true
      }, {
        header: "分类",
        dataIndex: "name",
        menuDisabled: true,
        flex: 1
      }]
    });
    me.lookupGrid = lookupGrid;
    me.lookupGrid.on("itemdblclick", me.onOK, me);

    var wnd = Ext.create("Ext.window.Window", {
      title: "选择 - 表单分类",
      modal: me.getShowModal(),
      header: false,
      border: 0,
      width: 500,
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
          border: 0,
          items: [{
            id: "PSI_Form_FormCategoryField_editCategory",
            xtype: "textfield",
            fieldLabel: "分类",
            labelWidth: 50,
            labelAlign: "right",
            labelSeparator: ""
          }, {
            xtype: "displayfield",
            fieldLabel: " ",
            value: "输入编码、分类可以过滤查询",
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
      buttons: [{
        text: "确定",
        handler: me.onOK,
        scope: me
      }, {
        text: "取消",
        handler() {
          wnd.close();
        }
      }]
    });

    wnd.on("close", () => {
      me.focus();
    });
    if (!me.getShowModal()) {
      wnd.on("deactivate", () => {
        wnd.close();
      });
    }
    me.wnd = wnd;

    var editName = Ext.getCmp("PSI_Form_FormCategoryField_editCategory");
    editName.on("change", () => {
      var store = me.lookupGrid.getStore();
      Ext.Ajax.request({
        url: PSI.Const.BASE_URL + "Home/Form/queryDataForCategory",
        params: {
          queryKey: editName.getValue()
        },
        method: "POST",
        callback(opt, success, response) {
          store.removeAll();
          if (success) {
            var data = Ext.JSON.decode(response.responseText);
            store.add(data);
            if (data.length > 0) {
              me.lookupGrid.getSelectionModel().select(0);
              editName.focus();
            }
          } else {
            PSI.MsgBox.showInfo("网络错误");
          }
        },
        scope: me
      });

    }, me);

    editName.on("specialkey", (field, e) => {
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

    me.wnd.on("show", () => {
      editName.focus();
      editName.fireEvent("change");
    }, me);
    wnd.showBy(me);
  },

  /**
   * @private
   */
  onOK() {
    var me = this;
    var grid = me.lookupGrid;
    var item = grid.getSelectionModel().getSelection();
    if (item == null || item.length != 1) {
      return;
    }

    var data = item[0];

    me.wnd.close();
    me.focus();
    me.setValue(data.get("name"));
    me.focus();

    me.setIdValue(data.get("id"));
  },

  /**
   * @public
   */
  setIdValue(id) {
    this.__idValue = id;
  },

  /**
   * @public
   */
  getIdValue() {
    return this.__idValue;
  },

  /**
   * @public
   */
  clearIdValue() {
    this.setValue(null);
    this.__idValue = null;
  }
});
