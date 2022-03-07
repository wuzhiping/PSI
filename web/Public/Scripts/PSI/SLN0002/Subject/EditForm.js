/**
 * 科目 - 新增或编辑界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
PCL.define("PSI.SLN0002.Subject.EditForm", {
  extend: "PSI.AFX.Form.EditForm",

  config: {
    company: null
  },

  /**
   * 初始化组件
   * 
   * @private
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
          me._onOK(true);
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
        me._onOK(false);
      },
      scope: me
    };
    buttons.push(btn);

    btn = {
      text: "取消",
      handler() {
        const info = !me.getEntity() ? "新建会计科目" : "编辑会计科目";
        me.confirm(`请确认是否取消：${info} ?`, () => {
          me.close();
        });
      },
      scope: me
    };
    buttons.push(btn);

    const t = entity == null ? "新建会计科目" : "编辑会计科目";
    const logoHtml = me.genLogoHtml(entity, t);

    const width = 600;
    PCL.apply(me, {
      header: {
        title: me.formatTitle(PSI.Const.PROD_NAME),
        height: 40
      },
      width: 650,
      height: 370,
      layout: "border",
      listeners: {
        show: {
          fn: me._onWndShow,
          scope: me
        },
        close: {
          fn: me._onWndClose,
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
          columns: 1,
          tableAttrs: PSI.Const.TABLE_LAYOUT,
        },
        height: "100%",
        bodyPadding: 5,
        defaultType: 'textfield',
        fieldDefaults: {
          labelWidth: 60,
          labelAlign: "right",
          labelSeparator: "",
          msgTarget: 'side',
          width,
          margin: "5"
        },
        items: [{
          xtype: "hidden",
          id: "PSI_Subject_EditForm_hiddenId",
          name: "id",
          value: entity == null ? null : entity.get("id")
        }, {
          xtype: "hidden",
          name: "companyId",
          value: me.getCompany().get("id")
        }, {
          xtype: "displayfield",
          fieldLabel: "组织机构",
          value: `<span class='PSI-field-note'>${me.getCompany().get("name")}</span>`
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
              fn: me.__onEditSpecialKey,
              scope: me
            }
          },
          callbackFunc: me._onParentCodeCallback,
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
              fn: me.__onEditSpecialKey,
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
              fn: me.__onEditSpecialKey,
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
          store: PCL.create("PCL.data.ArrayStore", {
            fields: ["id", "text"],
            data: [[1, "是"], [0, "否"]]
          }),
          value: 1,
          listeners: {
            specialkey: {
              fn: me._onLastEditSpecialKey,
              scope: me
            }
          }
        }],
        buttons: buttons
      }]
    });

    me.callParent(arguments);

    me.editForm = PCL.getCmp("PSI_Subject_EditForm_editForm");

    me.hiddenId = PCL.getCmp("PSI_Subject_EditForm_hiddenId");

    me.hiddenParentCode = PCL.getCmp("PSI_Subject_EditForm_hiddenParentCode");
    me.editParentCode = PCL.getCmp("PSI_Subject_EditForm_editParentCode");
    me.editCode = PCL.getCmp("PSI_Subject_EditForm_editCode");
    me.editName = PCL.getCmp("PSI_Subject_EditForm_editName");
    me.editIsLeaf = PCL.getCmp("PSI_Subject_EditForm_editIsLeaf");

    me.__editorList = [me.editParentCode, me.editCode, me.editName, me.editIsLeaf];
  },

  /**
   * 保存
   * 
   * @private
   */
  _onOK(thenAdd) {
    const me = this;

    me.hiddenParentCode.setValue(me.editParentCode.getIdValue());

    const f = me.editForm;
    const el = f.getEl();
    el.mask(PSI.Const.SAVING);
    const sf = {
      url: me.URL("SLN0002/Subject/editSubject"),
      method: "POST",
      success(form, action) {
        me._lastId = action.result.id;

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

  /**
   * @private
   */
  _onLastEditSpecialKey(field, e) {
    const me = this;

    if (e.getKey() == e.ENTER) {
      const f = me.editForm;
      if (f.getForm().isValid()) {
        me._onOK(me.adding);
      }
    }
  },

  /**
   * @private
   */
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

  /**
   * @private
   */
  _onWndClose() {
    const me = this;

    PCL.get(window).un('beforeunload', me.__onWindowBeforeUnload);

    if (me._lastId) {
      const parentForm = me.getParentForm();
      if (parentForm) {
        parentForm._onCompanyGridSelect.apply(parentForm, []);
      }
    }
  },

  /**
   * @private
   */
  _onWndShow() {
    const me = this;

    PCL.get(window).on('beforeunload', me.__onWindowBeforeUnload);

    if (me.adding) {
      me.editParentCode.focus();
      return;
    }

    const el = me.getEl() || PCL.getBody();
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

            me.setFocusAndCursorPosToLast(me.editIsLeaf);
          } else {
            me.setFocusAndCursorPosToLast(me.editName);
          }
        } else {
          me.showInfo("网络错误");
        }
      }
    };

    me.ajax(r);
  },

  /**
   * @private
   */
  _onParentCodeCallback(data) {
    const me = this;
    me.editCode.setValue(data.code);
    me.editName.setValue(data.name + " - ");
  }
});
