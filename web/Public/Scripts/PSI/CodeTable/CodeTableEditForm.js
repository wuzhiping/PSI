/**
 * 码表设置 - 新建或编辑码表元数据界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.CodeTable.CodeTableEditForm", {
  extend: "PSI.AFX.Form.EditForm",

  config: {
    category: null,
    slnCode: "",
    slnName: "",
  },

  initComponent() {
    const me = this;
    const entity = me.getEntity();
    me.adding = entity == null;

    const buttons = [];

    buttons.push({
      text: "保存",
      formBind: true,
      iconCls: "PSI-button-ok",
      handler() {
        me.onOK(false);
      },
      scope: me
    }, {
      text: entity == null ? "关闭" : "取消",
      handler() {
        me.close();
      },
      scope: me
    });

    const t = entity == null ? "新建码表" : "编辑码表";
    const logoHtml = me.genLogoHtml(entity, t);

    Ext.apply(me, {
      header: {
        title: me.formatTitle(PSI.Const.PROD_NAME),
        height: 40
      },
      width: 550,
      height: 380,
      layout: "border",
      items: [{
        region: "north",
        border: 0,
        height: 70,
        html: logoHtml
      }, {
        region: "center",
        border: 0,
        id: "PSI_CodeTable_CodeTableEditForm_editForm",
        xtype: "form",
        layout: {
          type: "table",
          columns: 2
        },
        height: "100%",
        bodyPadding: 5,
        defaultType: 'textfield',
        fieldDefaults: {
          labelWidth: 100,
          labelAlign: "right",
          labelSeparator: "",
          msgTarget: 'side'
        },
        items: [{
          xtype: "hidden",
          name: "id",
          value: entity == null ? null : entity.get("id")
        }, {
          xtype: "hidden",
          name: "slnCode",
          value: me.getSlnCode(),
        }, {
          id: "PSI_CodeTable_CodeTableEditForm_editCategoryId",
          xtype: "hidden",
          name: "categoryId"
        }, {
          xtype: "displayfield",
          fieldLabel: "解决方案",
          value: `<span class='PSI-field-note'>${me.getSlnName()}</span>`,
          colspan: 2,
          width: 510,
        }, {
          id: "PSI_CodeTable_CodeTableEditForm_editCategory",
          xtype: "psi_codetablecategoryfield",
          fieldLabel: "分类",
          allowBlank: false,
          blankText: "没有输入码表分类",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          valueField: "id",
          displayField: "name",
          listeners: {
            specialkey: {
              fn: me.onEditSpecialKey,
              scope: me
            }
          }
        }, {
          id: "PSI_CodeTable_CodeTableEditForm_editCode",
          fieldLabel: "编码",
          name: "code",
          listeners: {
            specialkey: {
              fn: me.onEditSpecialKey,
              scope: me
            }
          }
        }, {
          id: "PSI_CodeTable_CodeTableEditForm_editName",
          fieldLabel: "码表名称",
          allowBlank: false,
          blankText: "没有输入中文名称",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          name: "name",
          listeners: {
            specialkey: {
              fn: me.onEditSpecialKey,
              scope: me
            }
          }
        }, {
          id: "PSI_CodeTable_CodeTableEditForm_editModuleName",
          fieldLabel: "模块名称",
          allowBlank: false,
          blankText: "没有输入模块名称",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          name: "moduleName",
          listeners: {
            specialkey: {
              fn: me.onEditSpecialKey,
              scope: me
            }
          }
        }, {
          id: "PSI_CodeTable_CodeTableEditForm_editTableName",
          fieldLabel: "数据库表名",
          allowBlank: false,
          blankText: "没有输入数据库表名",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          name: "tableName",
          listeners: {
            specialkey: {
              fn: me.onEditSpecialKey,
              scope: me
            }
          },
          colspan: 2,
          width: 510
        }, {
          id: "PSI_CodeTable_CodeTableEditForm_editEnableParentId",
          xtype: "combo",
          queryMode: "local",
          editable: false,
          valueField: "id",
          fieldLabel: "层级数据",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          store: Ext.create("Ext.data.ArrayStore", {
            fields: ["id", "text"],
            data: [[0, "否"], [1, "是"]]
          }),
          value: 0,
          name: "enableParentId"
        }, {
          id: "PSI_CodeTable_CodeTableEditForm_editEditColCnt",
          fieldLabel: "编辑布局列数",
          allowBlank: false,
          blankText: "没有输入编辑布局列数",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          xtype: "numberfield",
          hideTrigger: true,
          allowDecimal: false,
          minValue: 1,
          name: "editColCnt",
          value: entity == null ? 1 : entity.get("editColCnt"),
          listeners: {
            specialkey: {
              fn: me.onEditSpecialKey,
              scope: me
            }
          }
        }, {
          id: "PSI_CodeTable_CodeTableEditForm_editViewPaging",
          xtype: "combo",
          queryMode: "local",
          editable: false,
          valueField: "id",
          fieldLabel: "视图分页",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          store: Ext.create("Ext.data.ArrayStore", {
            fields: ["id", "text"],
            data: [[1, "分页"], [2, "不分页"]]
          }),
          value: 2,
          name: "viewPaging"
        }, {
          id: "PSI_CodeTable_CodeTableEditForm_editAutoCodeLength",
          fieldLabel: "自动编码长度",
          allowBlank: false,
          blankText: "没有输入自动编码长度",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          xtype: "numberfield",
          hideTrigger: true,
          allowDecimal: false,
          minValue: 0,
          maxValue: 20,
          name: "autoCodeLength",
          value: entity == null ? 0 : entity.get("autoCodeLength"),
          listeners: {
            specialkey: {
              fn: me.onEditSpecialKey,
              scope: me
            }
          }
        }, {
          id: "PSI_CodeTable_CodeTableEditForm_editHandlerClassName",
          fieldLabel: "业务逻辑类名",
          name: "handlerClassName",
          value: entity == null ? null : entity
            .get("handlerClassName"),
          listeners: {
            specialkey: {
              fn: me.onEditSpecialKey,
              scope: me
            }
          },
          width: 510,
          colspan: 2
        }, {
          id: "PSI_CodeTable_CodeTableEditForm_editMemo",
          fieldLabel: "备注",
          name: "memo",
          value: entity == null ? null : entity
            .get("note"),
          listeners: {
            specialkey: {
              fn: me.onEditLastSpecialKey,
              scope: me
            }
          },
          width: 510,
          colspan: 2
        }],
        buttons: buttons
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

    me.editForm = Ext.getCmp("PSI_CodeTable_CodeTableEditForm_editForm");

    me.editCategoryId = Ext.getCmp("PSI_CodeTable_CodeTableEditForm_editCategoryId");
    me.editCategory = Ext.getCmp("PSI_CodeTable_CodeTableEditForm_editCategory");
    me.editCode = Ext.getCmp("PSI_CodeTable_CodeTableEditForm_editCode");
    me.editName = Ext.getCmp("PSI_CodeTable_CodeTableEditForm_editName");
    me.editModuleName = Ext.getCmp("PSI_CodeTable_CodeTableEditForm_editModuleName");
    me.editTableName = Ext.getCmp("PSI_CodeTable_CodeTableEditForm_editTableName");
    me.editEnableParentId = Ext.getCmp("PSI_CodeTable_CodeTableEditForm_editEnableParentId");
    me.editEditColCnt = Ext.getCmp("PSI_CodeTable_CodeTableEditForm_editEditColCnt");
    me.editAutoCodeLength = Ext.getCmp("PSI_CodeTable_CodeTableEditForm_editAutoCodeLength");
    me.editHandlerClassName = Ext.getCmp("PSI_CodeTable_CodeTableEditForm_editHandlerClassName");
    me.editMemo = Ext.getCmp("PSI_CodeTable_CodeTableEditForm_editMemo");
    me.editViewPaging = Ext.getCmp("PSI_CodeTable_CodeTableEditForm_editViewPaging");

    me.__editorList = [
      me.editCategory, me.editCode, me.editName, me.editModuleName,
      me.editTableName, me.editEditColCnt, me.editAutoCodeLength,
      me.editHandlerClassName, me.editMemo];

    const c = me.getCategory();
    if (c) {
      me.editCategory.setIdValue(c.get("id"));
      me.editCategory.setValue(c.get("name"));
    }
  },

  onWndShow() {
    const me = this;

    Ext.get(window).on('beforeunload', me.onWindowBeforeUnload);

    if (me.adding) {
      // 新建
      me.editTableName.setValue("t_ct_");
    } else {
      // 编辑
      const el = me.getEl();
      el && el.mask(PSI.Const.LOADING);
      me.ajax({
        url: me.URL("Home/CodeTable/codeTableInfo"),
        params: {
          id: me.getEntity().get("id")
        },
        callback(options, success, response) {
          if (success) {
            const data = me.decodeJSON(response.responseText);
            me.editCategory.setIdValue(data.categoryId);
            me.editCategory.setValue(data.categoryName);
            me.editCode.setValue(data.code);
            me.editName.setValue(data.name);
            me.editModuleName.setValue(data.moduleName);
            me.editTableName.setValue(data.tableName);
            me.editEnableParentId.setValue(parseInt(data.enableParentId));
            me.editEnableParentId.setReadOnly(true);
            me.editTableName.setReadOnly(true);
            me.editEditColCnt.setValue(data.editColCnt);
            me.editAutoCodeLength.setValue(data.autoCodeLength);
            me.editHandlerClassName.setValue(data.handlerClassName);
            me.editMemo.setValue(data.memo);
            me.editViewPaging.setValue(parseInt(data.viewPaging));
          }

          el && el.unmask();
        }
      });
    }

    me.setFocusAndCursorPosToLast(me.editCode);
  },

  onOK() {
    const me = this;

    me.editCategoryId.setValue(me.editCategory.getIdValue());

    const f = me.editForm;
    const el = f.getEl();
    el && el.mask(PSI.Const.SAVING);
    f.submit({
      url: me.URL("Home/CodeTable/editCodeTable"),
      method: "POST",
      success(form, action) {
        el && el.unmask();
        PSI.MsgBox.tip("数据保存成功");
        me.focus();
        me.__lastId = action.result.id;
        me.close();
      },
      failure(form, action) {
        el && el.unmask();
        me.showInfo(action.result.msg, () => {
          me.editCode.focus();
        });
      }
    });
  },

  onEditSpecialKey(field, e) {
    const me = this;

    if (e.getKey() === e.ENTER) {
      const id = field.getId();
      for (let i = 0; i < me.__editorList.length; i++) {
        const edit = me.__editorList[i];
        if (id == edit.getId()) {
          const editNext = me.__editorList[i + 1];
          me.setFocusAndCursorPosToLast(editNext);
        }
      }
    }
  },

  onEditLastSpecialKey(field, e) {
    const me = this;

    if (e.getKey() === e.ENTER) {
      const f = me.editForm;
      if (f.getForm().isValid()) {
        me.onOK();
      }
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
  }
});
