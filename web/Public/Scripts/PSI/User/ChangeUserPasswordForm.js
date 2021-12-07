/**
 * 修改用户密码
 */
Ext.define("PSI.User.ChangeUserPasswordForm", {
  extend: "PSI.AFX.Form.EditForm",

  /**
   * 初始化组件
   */
  initComponent() {
    const me = this;
    const entity = me.getEntity();

    const t = "修改用户登录密码";
    const f = "edit-form-password.png";
    const logoHtml = `
      <img style='float:left;margin:0px 20px 0px 10px;width:48px;height:48px;' 
        src='${PSI.Const.BASE_URL}Public/Images/${f}'></img>
      <h2 style='color:#196d83;margin-top:0px;'>${t}</h2>
      <p style='color:#196d83'>标记 <span style='color:red;font-weight:bold'>*</span>的是必须录入数据的字段</p>`;

    Ext.apply(me, {
      header: {
        title: me.formatTitle(PSI.Const.PROD_NAME),
        height: 40
      },
      width: 400,
      height: 300,
      layout: "border",
      items: [{
        region: "north",
        border: 0,
        height: 70,
        html: logoHtml
      }, {
        region: "center",
        border: 0,
        id: "PSI_User_ChangeUserPasswordForm_editForm",
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
          width: 370
        },
        items: [{
          xtype: "hidden",
          name: "id",
          value: entity.id
        }, {
          fieldLabel: "登录名",
          value: entity.loginName,
          xtype: "displayfield"
        }, {
          fieldLabel: "姓名",
          value: entity.name,
          xtype: "displayfield"
        }, {
          id: "PSI_User_ChangeUserPasswordForm_editPassword",
          fieldLabel: "密码",
          allowBlank: false,
          blankText: "没有输入密码",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          inputType: "password",
          name: "password",
          listeners: {
            specialkey: {
              fn: me.__onEditSpecialKey,
              scope: me
            }
          }
        }, {
          id: "PSI_User_ChangeUserPasswordForm_editConfirmPassword",
          fieldLabel: "确认密码",
          allowBlank: false,
          blankText: "没有输入确认密码",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          inputType: "password",
          listeners: {
            specialkey: {
              fn: me.onLastEditSpecialKey,
              scope: me
            }
          }
        }],
        buttons: [{
          text: "确定",
          formBind: true,
          iconCls: "PSI-button-ok",
          handler: me.onOK,
          scope: me
        }, {
          text: "取消",
          handler() {
            me.close();
          },
          scope: me
        }]
      }],
      listeners: {
        show: {
          fn: me.onEditFormShow,
          scope: me
        }
      }
    });

    me.callParent(arguments);

    me.editPassword = Ext.getCmp("PSI_User_ChangeUserPasswordForm_editPassword");
    me.editConfirmPassword = Ext.getCmp("PSI_User_ChangeUserPasswordForm_editConfirmPassword");
    me.editForm = Ext.getCmp("PSI_User_ChangeUserPasswordForm_editForm");

    me.__editorList = [me.editPassword, me.editConfirmPassword];
  },

  onEditFormShow() {
    var me = this;
    me.setFocusAndCursorPosToLast(me.editPassword);
  },

  /**
   * 修改密码
   */
  onOK() {
    const me = this;
    const pass = me.editPassword.getValue();
    const pass2 = me.editConfirmPassword.getValue();
    if (pass != pass2) {
      me.showInfo("输入的密码和确认密码不一致，请重新输入", () => {
        me.editPassword.focus();
      });

      return;
    }

    const f = me.editForm;
    const el = f.getEl();
    el.mask("数据保存中...");
    f.submit({
      url: me.URL("Home/User/changePassword"),
      method: "POST",
      success(form, action) {
        el.unmask();
        me.tip("成功修改密码");
        me.close();
      },
      failure(form, action) {
        el.unmask();
        me.showInfo(action.result.msg);
      }
    });
  },

  onLastEditSpecialKey(field, e) {
    const me = this;

    if (e.getKey() == e.ENTER) {
      if (me.editForm.getForm().isValid()) {
        me.onOK();
      }
    }
  }
});
