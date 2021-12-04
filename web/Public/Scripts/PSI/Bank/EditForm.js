/**
 * 银行账户 - 新建或编辑界面
 * 
 * @author 李静波
 */
Ext.define("PSI.Bank.EditForm", {
  extend: "PSI.AFX.Form.EditForm",

  config: {
    company: null
  },

  /**
   * 初始化组件
   */
  initComponent() {
    const me = this;

    const entity = me.getEntity();

    me.adding = entity == null;

    const buttons = [];
    if (!entity) {
      const btn = {
        text: "保存并继续新增",
        formBind: true,
        handler() {
          me.onOK(true);
        },
        scope: me
      };

      buttons.push(btn);
    }

    buttons.push({
      text: "保存",
      formBind: true,
      iconCls: "PSI-button-ok",
      handler() {
        me.onOK(false);
      },
      scope: me
    });

    buttons.push({
      text: entity == null ? "关闭" : "取消",
      handler() {
        me.close();
      },
      scope: me
    });

    const t = entity == null ? "新建银行账户" : "编辑银行账户";
    const logoHtml = me.genLogoHtml(entity, t);

    Ext.apply(me, {
      header: {
        title: me.formatTitle(PSI.Const.PROD_NAME),
        height: 40
      },
      width: 400,
      height: 310,
      layout: "border",
      listeners: {
        show: {
          fn: me.onWndShow,
          scope: me
        },
        close: {
          fn: me.onWndClose,
          scope: me
        }
      },
      items: [{
        region: "north",
        height: 70,
        border: 0,
        html: logoHtml
      }, {
        region: "center",
        border: 0,
        id: "PSI_Bank_EditForm_editForm",
        xtype: "form",
        layout: {
          type: "table",
          columns: 1
        },
        height: "100%",
        bodyPadding: 5,
        defaultType: 'textfield',
        fieldDefaults: {
          labelWidth: 60,
          labelAlign: "right",
          labelSeparator: "",
          msgTarget: 'side',
          width: 370,
          margin: "5"
        },
        items: [{
          xtype: "hidden",
          name: "id",
          value: entity == null ? null : entity.get("id")
        }, {
          xtype: "hidden",
          name: "companyId",
          value: me.getCompany().get("id")
        }, {
          fieldLabel: "组织机构",
          xtype: "displayfield",
          value: me.getCompany().get("name")
        }, {
          id: "PSI_Bank_EditForm_editBankName",
          fieldLabel: "银行",
          allowBlank: false,
          blankText: "没有输入银行名称",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          name: "bankName",
          value: entity == null ? null : entity.get("bankName"),
          listeners: {
            specialkey: {
              fn: me.onEditBankNameSpecialKey,
              scope: me
            }
          }
        }, {
          id: "PSI_Bank_EditForm_editBankNumber",
          fieldLabel: "账号",
          allowBlank: false,
          blankText: "没有输入账号",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          name: "bankNumber",
          value: entity == null ? null : entity.get("bankNumber"),
          listeners: {
            specialkey: {
              fn: me.onEditBankNumberSpecialKey,
              scope: me
            }
          }
        }, {
          id: "PSI_Bank_EditForm_editMemo",
          fieldLabel: "备注",
          name: "memo",
          value: entity == null ? null : entity.get("memo"),
          listeners: {
            specialkey: {
              fn: me.onEditMemoSpecialKey,
              scope: me
            }
          }
        }],
        buttons: buttons
      }]
    });

    me.callParent(arguments);

    me.editForm = Ext.getCmp("PSI_Bank_EditForm_editForm");

    me.editBankName = Ext.getCmp("PSI_Bank_EditForm_editBankName");
    me.editBankNumber = Ext.getCmp("PSI_Bank_EditForm_editBankNumber");
    me.editMemo = Ext.getCmp("PSI_Bank_EditForm_editMemo");
  },

  /**
   * 保存
   */
  onOK(thenAdd) {
    const me = this;
    const f = me.editForm;
    const el = f.getEl();
    el.mask(PSI.Const.SAVING);
    const sf = {
      url: me.URL("Home/Bank/editBank"),
      method: "POST",
      success(form, action) {
        me.__lastId = action.result.id;

        el.unmask();

        PSI.MsgBox.tip("数据保存成功");
        me.focus();
        if (thenAdd) {
          me.clearEdit();
        } else {
          me.close();
        }
      },
      failure(form, action) {
        el.unmask();
        PSI.MsgBox.showInfo(action.result.msg, () => {
          me.editBankName.focus();
        });
      }
    };
    f.submit(sf);
  },

  onEditBankNameSpecialKey(field, e) {
    const me = this;

    if (e.getKey() == e.ENTER) {
      me.setFocusAndCursorPosToLast(me.editBankNumber);
    }
  },

  onEditBankNumberSpecialKey(field, e) {
    const me = this;

    if (e.getKey() == e.ENTER) {
      me.setFocusAndCursorPosToLast(me.editMemo);
    }
  },

  onEditMemoSpecialKey(field, e) {
    const me = this;

    if (e.getKey() == e.ENTER) {
      const f = me.editForm;
      if (f.getForm().isValid()) {
        me.onOK(me.adding);
      }
    }
  },

  clearEdit() {
    const me = this;
    me.editBankName.focus();

    const editors = [me.editBankName, me.editBankNumber, me.editMemo];
    for (let i = 0; i < editors.length; i++) {
      const edit = editors[i];
      edit.setValue(null);
      edit.clearInvalid();
    }
  },

  onWindowBeforeUnload(e) {
    return (window.event.returnValue = e.returnValue = '确认离开当前页面？');
  },

  onWndClose() {
    const me = this;

    Ext.get(window).un('beforeunload', me.onWindowBeforeUnload);

    if (me.__lastId) {
      if (me.getParentForm()) {
        me.getParentForm().refreshMainGrid(me.__lastId);
      }
    }
  },

  onWndShow() {
    const me = this;

    Ext.get(window).on('beforeunload', me.onWindowBeforeUnload);

    me.setFocusAndCursorPosToLast(me.editBankName);
  }
});
