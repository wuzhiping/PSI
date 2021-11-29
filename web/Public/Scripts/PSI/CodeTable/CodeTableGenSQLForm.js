/**
 * 导出SQL
 * 
 * @author 李静波
 */
Ext.define("PSI.CodeTable.CodeTableGenSQLForm", {
  extend: "Ext.window.Window",

  mixins: ["PSI.AFX.Mix.Common"],

  config: {
    codeTable: null
  },

  initComponent() {
    const me = this;

    Ext.apply(me, {
      title: "导出SQL",
      width: 800,
      height: 420,
      layout: "fit",
      items: [{
        id: "editForm",
        xtype: "form",
        layout: "form",
        height: "100%",
        bodyPadding: 5,
        defaultType: 'textfield',
        fieldDefaults: {
          labelWidth: 60,
          labelAlign: "right",
          labelSeparator: "",
          msgTarget: 'side'
        },
        items: [{
          id: "editSQL",
          fieldLabel: "SQL",
          xtype: "textareafield",
          height: 300,
          readOnly: true
        }],
        buttons: [{
          text: "关闭",
          handler() {
            me.close();
          },
          scope: me
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

  onWndShow() {
    const me = this;

    const el = me.getEl();
    el && el.mask(PSI.Const.LOADING);
    const r = {
      url: me.URL("Home/CodeTable/codeTableGenSQL"),
      params: {
        id: me.getCodeTable().get("id")
      },
      callback(options, success, response) {
        if (success) {
          const data = me.decodeJSON(response.responseText);

          if (data.success) {
            Ext.getCmp("editSQL").setValue(data.sql);
          } else {
            Ext.getCmp("editSQL").setValue(data.msg);
          }
        } else {
          me.showInfo("网络错误");
        }

        el && el.unmask();
      }
    };

    me.ajax(r);
  }
});
