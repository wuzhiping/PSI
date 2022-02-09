/**
 * 科目 - 新增或编辑界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.SLN0002.Subject.EditForm", {
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
        text: "保存并继续新建",
        formBind: true,
        handler() {
          me.onOK(true);
        },
        scope: me
      };

      buttons.push(btn);
    }

    let btn = {
      text: "保存",
      formBind: true,
      iconCls: "PSI-button-ok",
      handler() {
        me.onOK(false);
      },
      scope: me
    };
    buttons.push(btn);

    btn = {
      text: entity == null ? "关闭" : "取消",
      handler() {
        me.close();
      },
      scope: me
    };
    buttons.push(btn);

    const t = entity == null ? "新建科目" : "编辑科目";
    const logoHtml = me.genLogoHtml(entity, t);

    Ext.apply(me, {
      header: {
        title: me.formatTitle(PSI.Const.PROD_NAME),
        height: 40
      },
      width: 400,
      height: 340,
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
        id: "PSI_Subject_EditForm_editForm",
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
          id: "PSI_Subject_EditForm_hiddenId",
          name: "id",
          value: entity == null ? null : entity
            .get("id")
        }, {
          xtype: "hidden",
          name: "companyId",
          value: me.getCompany().get("id")
        }, {
          xtype: "displayfield",
          fieldLabel: "组织机构",
          value: me.getCompany().get("name")
        }, {
          xtype: "hidden",
          id: "PSI_Subject_EditForm_hiddenParentCode",
          name: "parentCode",
          value: null
        }, {
          id: "PSI_Subject_EditForm_editParentCode",
          xtype: "PSI_parent_subject_field",
          fieldLabel: "上级科目",
          allowBlank: false,
          blankText: "没有输入上级科目",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          listeners: {
            specialkey: {
              fn: me.onEditParentCodeSpecialKey,
              scope: me
            }
          },
          callbackFunc: me.onParentCodeCallback,
          callbackScope: me,
          companyId: me.getCompany().get("id")
        }, {
          id: "PSI_Subject_EditForm_editCode",
          fieldLabel: "科目码",
          allowBlank: false,
          blankText: "没有输入科目码",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          name: "code",
          listeners: {
            specialkey: {
              fn: me.onEditCodeSpecialKey,
              scope: me
            }
          }
        }, {
          id: "PSI_Subject_EditForm_editName",
          fieldLabel: "科目名称",
          allowBlank: false,
          blankText: "没有输入科目名称",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          name: "name",
          listeners: {
            specialkey: {
              fn: me.onEditNameSpecialKey,
              scope: me
            }
          }
        }, {
          id: "PSI_Subject_EditForm_editIsLeaf",
          xtype: "combo",
          name: "isLeaf",
          queryMode: "local",
          editable: false,
          valueField: "id",
          fieldLabel: "末级科目",
          store: Ext.create("Ext.data.ArrayStore", {
            fields: ["id", "text"],
            data: [[1, "是"], [0, "否"]]
          }),
          value: 1
        }],
        buttons: buttons
      }]
    });

    me.callParent(arguments);

    me.editForm = Ext.getCmp("PSI_Subject_EditForm_editForm");

    me.hiddenId = Ext.getCmp("PSI_Subject_EditForm_hiddenId");

    me.hiddenParentCode = Ext.getCmp("PSI_Subject_EditForm_hiddenParentCode");
    me.editParentCode = Ext.getCmp("PSI_Subject_EditForm_editParentCode");
    me.editCode = Ext.getCmp("PSI_Subject_EditForm_editCode");
    me.editName = Ext.getCmp("PSI_Subject_EditForm_editName");
    me.editIsLeaf = Ext.getCmp("PSI_Subject_EditForm_editIsLeaf");
  },

  /**
   * 保存
   */
  onOK(thenAdd) {
    const me = this;

    me.hiddenParentCode.setValue(me.editParentCode.getIdValue());

    const f = me.editForm;
    const el = f.getEl();
    el.mask(PSI.Const.SAVING);
    const sf = {
      url: me.URL("SLN0002/Subject/editSubject"),
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
          me.editCode.focus();
        });
      }
    };
    f.submit(sf);
  },

  onEditParentCodeSpecialKey(field, e) {
    const me = this;

    if (e.getKey() == e.ENTER) {
      const editName = me.editCode;
      editName.focus();
      editName.setValue(editName.getValue());
    }
  },

  onEditCodeSpecialKey(field, e) {
    const me = this;

    if (e.getKey() == e.ENTER) {
      const editName = me.editName;
      editName.focus();
      editName.setValue(editName.getValue());
    }
  },

  onEditNameSpecialKey(field, e) {
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
    me.editParentCode.focus();

    const editors = [me.editParentCode, me.editCode, me.editName];
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
        me.getParentForm().onCompanyGridSelect();
      }
    }
  },

  onWndShow() {
    const me = this;

    Ext.get(window).on('beforeunload', me.onWindowBeforeUnload);

    if (me.adding) {
      me.editParentCode.focus();
      return;
    }

    const el = me.getEl() || Ext.getBody();
    el.mask(PSI.Const.LOADING);
    const r = {
      url: me.URL("SLN0002/Subject/subjectInfo"),
      params: {
        id: me.hiddenId.getValue()
      },
      callback(options, success, response) {
        el.unmask();

        if (success) {
          const data = me.decodeJSON(response.responseText);

          me.editParentCode.setValue(data.parentCode);
          me.editParentCode.setReadOnly(true);

          me.editCode.setValue(data.code);

          me.editName.setValue(data.name);
          me.editIsLeaf.setValue(parseInt(data.isLeaf));

          // 编辑的时候不允许编辑科目码
          me.editCode.setReadOnly(true);

          if (data.code.length == 4) {
            // 一级科目
            me.editName.setReadOnly(true);

            me.editIsLeaf.focus();
          } else {
            me.editName.focus();
            me.editName.setValue(me.editName.getValue());
          }
        } else {
          me.showInfo("网络错误")
        }
      }
    };

    me.ajax(r);
  },

  onParentCodeCallback(data) {
    const me = this;
    me.editCode.setValue(data.code);
    me.editName.setValue(data.name + " - ");
  }
});
