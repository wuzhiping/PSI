/**
 * 码表列 - 新建或编辑界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
PCL.define("PSI.CodeTable.CodeTableColEditForm", {
  extend: "PSI.AFX.Form.EditForm",

  config: {
    codeTable: null
  },

  /**
   * @override
   */
  initComponent() {
    const me = this;
    const entity = me.getEntity();
    this.adding = entity == null;

    const buttons = [];

    buttons.push({
      text: "保存",
      formBind: true,
      iconCls: "PSI-button-ok",
      handler: function () {
        me._onOK(false);
      },
      scope: me
    }, {
      text: "取消",
      handler() {
        const info = entity == null ? "新建码表列" : "编辑码表列";

        me.confirm(`请确认是否取消：${info}?`, () => {
          me.close();
        });
      },
      scope: me
    });

    const t = entity == null ? "新建码表列" : "编辑码表列";
    const logoHtml = me.genLogoHtml(entity, t);

    PCL.apply(me, {
      header: {
        title: me.formatTitle(PSI.Const.PROD_NAME),
        height: 40
      },
      width: 890,
      height: 410,
      layout: "border",
      items: [{
        region: "north",
        border: 0,
        height: 60,
        html: logoHtml
      }, {
        region: "center",
        border: 0,
        layout: "fit",
        items: {
          xtype: "tabpanel",
          id: "PSI_CodeTable_CodeTableColEditForm_tabPanel",
          border: 0,
          items: [{
            title: "数据库结构",
            id: "tabDbStruct",
            border: 0,
            layout: "fit",
            items: {
              border: 0,
              xtype: "form",
              bodyStyle: "margin-top:10px",
              layout: {
                type: "table",
                columns: 3,
                tableAttrs: PSI.Const.TABLE_LAYOUT,
              },
              defaultType: 'textfield',
              fieldDefaults: {
                labelWidth: 90,
                labelAlign: "right",
                labelSeparator: "",
                msgTarget: 'side'
              },
              items: me.getDbStructCols()
            }
          }, {
            title: "取值",
            id: "tabValueFrom",
            border: 0,
            layout: "fit",
            items: {
              border: 0,
              xtype: "form",
              bodyStyle: "margin-top:10px",
              layout: {
                type: "table",
                columns: 3,
                tableAttrs: PSI.Const.TABLE_LAYOUT,
              },
              defaultType: 'textfield',
              fieldDefaults: {
                labelWidth: 120,
                labelAlign: "right",
                labelSeparator: "",
                msgTarget: 'side'
              },
              items: me.getFetchValueCols()
            }
          }, {
            title: "显示",
            id: "tabDisplay",
            border: 0,
            layout: "fit",
            items: {
              border: 0,
              xtype: "form",
              bodyStyle: "margin-top:10px",
              layout: {
                type: "table",
                columns: 3,
                tableAttrs: PSI.Const.TABLE_LAYOUT,
              },
              defaultType: 'textfield',
              fieldDefaults: {
                labelWidth: 120,
                labelAlign: "right",
                labelSeparator: "",
                msgTarget: 'side'
              },
              items: me.getDisplayCols()
            }
          }, {
            title: "编辑",
            id: "tabEdit",
            border: 0,
            layout: "fit",
            items: {
              border: 0,
              xtype: "form",
              bodyStyle: "margin-top:10px",
              layout: {
                type: "table",
                columns: 3,
                tableAttrs: PSI.Const.TABLE_LAYOUT,
              },
              defaultType: 'textfield',
              fieldDefaults: {
                labelWidth: 90,
                labelAlign: "right",
                labelSeparator: "",
                msgTarget: 'side'
              },
              items: me.getEditCols()
            }
          }],
          listeners: {
            tabchange: {
              fn: me._onTabChange,
              scope: me
            },
          }
        }
      }],
      buttons,
      listeners: {
        show: {
          fn: me._onWndShow,
          scope: me
        },
        close: {
          fn: me._onWndClose,
          scope: me
        }
      }
    });

    me.callParent(arguments);

    me.editName = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editName");
    me.editTableName = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editTableName");
    me.editCaption = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editCaption");
    me.editFieldName = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editFieldName");
    me.hiddenFieldType = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_hiddenFieldType");
    me.editFieldType = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editFieldType");
    me.editFieldLength = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editFieldLength");
    me.editFieldDec = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editFieldDec");
    me.hiddenValueFrom = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_hiddenValueFrom");
    me.editValueFrom = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editValueFrom");
    me.editValueFromTableName = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editValueFromTableName");
    me.editValueFromColName = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editValueFromColName");
    me.editValueFromColNameDisplay = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editValueFromColNameDisplay");
    me.editWidthInView = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editWidthInView");
    me.editShowOrder = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editShowOrder");
    me.editColSpan = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editColSpan");
    me.editShowOrderInView = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editShowOrderInView");
    me.hiddenEditorXtype = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_hiddenEditorXtype");
    me.editEditorXtype = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editEditorXtype");
    me.editMemo = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editMemo");
    me.hiddenIsVisible = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_hiddenIsVisible");
    me.editIsVisible = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editIsVisible");
    me.hiddenMustInput = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_hiddenMustInput");
    me.editMustInput = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_editMustInput");

    me.__useTabPanel = true;
    me.__tabPanelId = "PSI_CodeTable_CodeTableColEditForm_tabPanel";
    me.__editorList = [
      [me.editCaption, me.editFieldName, me.editFieldType, me.editMemo],
      [me.editValueFrom],
      [me.editWidthInView, me.editShowOrderInView, me.editShowOrder],
      [me.editColSpan, me.editEditorXtype, me.editIsVisible, me.editMustInput]
    ];

    me.buttonRefCol = PCL.getCmp("PSI_CodeTable_CodeTableColEditForm_buttonRefCol");
  },

  /**
   * @private
   * 
   * 和数据库结构相关的列
   */
  getDbStructCols() {
    const me = this;
    const entity = me.getEntity();
    const isSysCol = (entity != null) && (parseInt(entity.get("sysColRawValue")) == 1);

    const col2Width = 550;
    const col3Width = 830;

    const list = [];

    list.push({
      xtype: "hidden",
      name: "id",
      value: entity == null ? null : entity.get("id")
    }, {
      xtype: "hidden",
      name: "codeTableId",
      value: me.getCodeTable().get("id")
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editName",
      fieldLabel: "码表名称",
      xtype: "displayfield",
      value: `<span class='PSI-field-note'>${me.getCodeTable().get("name")}</span>`
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editTableName",
      fieldLabel: "数据库表名",
      xtype: "displayfield",
      colspan: 2,
      width: col2Width,
      value: `<span class='PSI-field-note'>${me.getCodeTable().get("tableName")}</span>`
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editCaption",
      fieldLabel: "列标题",
      xtype: me.adding ? "textfield" : (isSysCol ? "displayfield" : "textfield"),
      allowBlank: false,
      blankText: "没有输入列标题",
      beforeLabelTextTpl: PSI.Const.REQUIRED,
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      },
      name: "caption"
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editFieldName",
      xtype: me.adding ? "textfield" : "displayfield",
      fieldLabel: "列数据库名",
      allowBlank: false,
      blankText: "没有输入列数据库名",
      beforeLabelTextTpl: PSI.Const.REQUIRED,
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      },
      colspan: 2,
      width: col2Width,
      name: "fieldName"
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_hiddenFieldType",
      xtype: "hidden",
      name: "fieldType",
      value: "varchar",
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editFieldType",
      xtype: me.adding ? "psi_sysdictfield" : "displayfield",
      tableName: "t_sysdict_sln0000_ct_field_type",
      callbackFunc: me._fieldTypeCallback,
      callbackScope: me,
      labelAlign: "right",
      labelSeparator: "",
      fieldLabel: "列数据类型",
      allowBlank: false,
      blankText: "没有输入列数据类型",
      beforeLabelTextTpl: PSI.Const.REQUIRED,
      value: "varchar",
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      },
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editFieldLength",
      fieldLabel: "列数据长度",
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      },
      xtype: me.adding ? "numberfield" : "displayfield",
      hideTrigger: true,
      allowDecimal: false,
      minValue: 1,
      value: 255,
      name: "fieldLength"
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editFieldDec",
      fieldLabel: "列小数位数",
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      },
      xtype: me.adding ? "numberfield" : "displayfield",
      hideTrigger: true,
      allowDecimal: false,
      minValue: 0,
      value: 0,
      name: "fieldDecimal",
      disabled: true
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editMemo",
      fieldLabel: "备注",
      name: "memo",
      value: entity == null ? null : entity
        .get("note"),
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      },
      width: col3Width,
      colspan: 3
    });

    return list;
  },

  /**
   * @private
   * 
   * 和取值相关的列
   */
  getFetchValueCols() {
    const me = this;

    const list = [{
      id: "PSI_CodeTable_CodeTableColEditForm_hiddenValueFrom",
      xtype: "hidden",
      name: "fieldType",
      value: 1,
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editValueFrom",
      xtype: me.adding ? "psi_sysdictfield" : "displayfield",
      tableName: "t_sysdict_sln0000_ct_value_from",
      callbackFunc: me._valueFromCallback,
      callbackScope: me,
      fieldLabel: "值来源",
      labelWidth: 60,
      allowBlank: false,
      blankText: "没有输入值来源",
      beforeLabelTextTpl: PSI.Const.REQUIRED,
      value: "直接录入",
      colspan: 1,
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      },
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_buttonRefCol",
      xtype: "button",
      text: "选择值来源的引用列",
      disabled: true,
      handler: me._onRefCol,
      scope: me,
      colspan: 2
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editValueFromTableName",
      fieldLabel: "引用表名",
      labelWidth: 60,
      disabled: true,
      name: "valueFromTableName"
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editValueFromColName",
      fieldLabel: "引用列名(关联用)",
      disabled: true,
      name: "valueFromColName"
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editValueFromColNameDisplay",
      fieldLabel: "引用列名(显示用)",
      disabled: true,
      name: "valueFromColNameDisplay"
    }];

    return list;
  },

  /**
   * @private
   * 
   * 显示相关的列
   */
  getDisplayCols() {
    const me = this;

    const list = [{
      id: "PSI_CodeTable_CodeTableColEditForm_editWidthInView",
      fieldLabel: "列视图宽度(px)",
      labelWidth: 100,
      xtype: "numberfield",
      hideTrigger: true,
      allowDecimal: false,
      minValue: 10,
      value: 120,
      allowBlank: false,
      blankText: "没有输入列视图宽度",
      beforeLabelTextTpl: PSI.Const.REQUIRED,
      name: "widthInView",
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      }
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editShowOrderInView",
      fieldLabel: "视图界面显示次序",
      allowBlank: false,
      blankText: "没有输入视图界面显示次序",
      beforeLabelTextTpl: PSI.Const.REQUIRED,
      xtype: "numberfield",
      hideTrigger: true,
      allowDecimal: false,
      name: "showOrderInView",
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      },
      colspan: 1,
      value: 1000,
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editShowOrder",
      fieldLabel: "编辑界面显示次序",
      allowBlank: false,
      blankText: "没有输入编辑界面显示次序",
      beforeLabelTextTpl: PSI.Const.REQUIRED,
      xtype: "numberfield",
      hideTrigger: true,
      allowDecimal: false,
      name: "showOrder",
      value: 1000,
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      }
    }];

    if (me.adding) {
      list.push({
        xtype: "displayfield",
        fieldLabel: "提示",
        labelWidth: 100,
        colspan: 3,
        value: "<span class='PSI-field-note'>显示次序可以通过其他处的可视化功能灵活调整，新建列的时候填写默认值1000即可</span>"
      });
    }

    return list;
  },

  /**
   * @private
   * 
   * 编辑相关的列
   */
  getEditCols() {
    const me = this;
    const col2Width = 550;

    const list = [{
      id: "PSI_CodeTable_CodeTableColEditForm_editColSpan",
      fieldLabel: "编辑器列占位",
      allowBlank: false,
      blankText: "没有输入编辑器列占位",
      beforeLabelTextTpl: PSI.Const.REQUIRED,
      xtype: "numberfield",
      hideTrigger: true,
      allowDecimal: false,
      minValue: 1,
      name: "colSpan",
      value: 1,
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      }
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_hiddenEditorXtype",
      xtype: "hidden",
      name: "editorXtype",
      value: 1,
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editEditorXtype",
      xtype: "psi_sysdictfield",
      tableName: "t_sysdict_sln0000_ct_editor_xtype",
      callbackFunc: me._editorXtypeCallback,
      callbackScope: me,
      labelAlign: "right",
      labelSeparator: "",
      fieldLabel: "编辑器类型",
      allowBlank: false,
      blankText: "没有输入编辑器类型",
      beforeLabelTextTpl: PSI.Const.REQUIRED,
      store: PCL.create("PCL.data.ArrayStore", {
        fields: ["id", "text"],
        data: []
      }),
      value: "textfield",
      colspan: 2,
      width: col2Width,
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      }
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_hiddenIsVisible",
      xtype: "hidden",
      name: "isVisible",
      value: 1,
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editIsVisible",
      xtype: "psi_sysdictfield",
      tableName: "t_sysdict_sln0000_ct_field_visible",
      callbackFunc: me._isVisibleCallback,
      callbackScope: me,
      labelAlign: "right",
      labelSeparator: "",
      fieldLabel: "对用户可见",
      allowBlank: false,
      blankText: "没有输入是否对用户可见",
      beforeLabelTextTpl: PSI.Const.REQUIRED,
      value: "对用户可见",
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      }
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_hiddenMustInput",
      xtype: "hidden",
      name: "mustInput",
      value: 1,
    }, {
      id: "PSI_CodeTable_CodeTableColEditForm_editMustInput",
      xtype: "psi_sysdictfield",
      tableName: "t_sysdict_sln0000_ct_must_input",
      callbackFunc: me._mustInputCallback,
      callbackScope: me,
      labelAlign: "right",
      labelSeparator: "",
      fieldLabel: "必须录入",
      allowBlank: false,
      blankText: "没有输入必须录入",
      beforeLabelTextTpl: PSI.Const.REQUIRED,
      value: "非必须录入项",
      listeners: {
        specialkey: {
          fn: me._onEditLastSpecialKey,
          scope: me
        }
      }
    }];

    return list;
  },

  /**
   * @private
   */
  _onWndShow() {
    const me = this;

    PCL.get(window).on('beforeunload', me.__onWindowBeforeUnload);

    const el = me.getEl();
    el && el.mask(PSI.Const.LOADING);
    me.ajax({
      url: me.URL("Home/CodeTable/codeTableColInfo"),
      params: {
        id: me.adding ? null : me.getEntity().get("id"),
        tableId: me.getCodeTable().get("id")
      },
      callback(options, success, response) {
        if (success) {
          el && el.unmask();

          const data = PCL.JSON.decode(response.responseText);

          if (me.adding) {
            // 新建
            me.editCaption.focus();
          } else {
            // 编辑
            me.editTableName.setReadOnly(true);
            me.editCaption.setReadOnly(true);
            me.editFieldName.setReadOnly(true);
            me.editFieldType.setReadOnly(true);
            me.editFieldLength.setReadOnly(true);
            me.editFieldLength.setDisabled(false);
            me.editFieldDec.setReadOnly(true);
            me.editFieldDec.setDisabled(false);

            const col = data.col;
            if (col) {
              me.editCaption.setValue(col.caption);
              me.editFieldName.setValue(`<span class='PSI-field-note'>${col.fieldName}</span>`);
              me.editFieldType.setValue(`<span class='PSI-field-note'>${col.fieldType}</span>`);
              me.editFieldLength.setValue(`<span class='PSI-field-note'>${col.fieldLength}</span>`);
              me.editFieldDec.setValue(`<span class='PSI-field-note'>${col.fieldDecimal}</span>`);
              const valueFrom = parseInt(col.valueFrom);
              me.editValueFrom.setValue(valueFrom);
              me.editValueFromTableName.setValue(col.valueFromTableName);
              me.editValueFromColName.setValue(col.valueFromColName);
              me.editValueFromColNameDisplay.setValue(col.valueFromColNameDisplay);

              if (valueFrom == 4) {
                // 引用自身数据
                me.editValueFrom.setReadOnly(true);
                me.editValueFromTableName.setReadOnly(true);
                me.editValueFromTableName.setDisabled(false);
                me.editValueFromColName.setDisabled(false);
                me.editValueFromColNameDisplay.setDisabled(false);
              }

              me.editIsVisible.setValue(parseInt(col.isVisible));
              me.editMustInput.setValue(parseInt(col.mustInput));
              me.editWidthInView.setValue(col.widthInView);
              me.editShowOrder.setValue(col.showOrder);
              me.editColSpan.setValue(col.colSpan);
              me.editShowOrderInView.setValue(col.showOrderInView);
              me.editEditorXtype.setValue(col.editorXtype);
              me.editMemo.setValue(col.memo);

              if (col.sysCol == 1) {
                // 系统列的时候，进一步限制字段的修改
                me.editCaption.setValue(`<span class='PSI-field-note'>${col.caption}</span>`);

                me.editValueFrom.setReadOnly(true);
                me.editIsVisible.setReadOnly(true);
                me.editMustInput.setReadOnly(true);
                me.editWidthInView.setReadOnly(true);
                me.editWidthInView.clearInvalid();
                me.editWidthInView.setMinValue(0);
                me.editEditorXtype.setReadOnly(true);
              } else {
                me.editCaption.setDisabled(false);
                me.editCaption.setReadOnly(false);
              }

              if (col.isVisible == 1) {
                // 可见的字段，也能设置在视图中的宽度
                me.editWidthInView.setReadOnly(false);
              }
              if (col.sysCol == 1) {
                // 系统列的时候
                me.editMemo.focus();
              } else {
                me.editCaption.focus();
              }
            }
          }
        }
      }
    });
  },

  /**
   * @private
   */
  _onOK() {
    const me = this;

    const entity = me.getEntity();
    const params = {
      id: entity == null ? null : entity.get("id"),
      codeTableId: me.getCodeTable().get("id"),
      caption: me.editCaption.getValue(),
      fieldName: me.editFieldName.getValue(),
      fieldType: me.hiddenFieldType.getValue(),
      fieldLength: me.editFieldLength.getValue(),
      fieldDecimal: me.editFieldDec.getValue(),
      valueFrom: me.hiddenValueFrom.getValue(),
      valueFromTableName: me.editValueFromTableName.getValue(),
      valueFromColName: me.editValueFromColName.getValue(),
      valueFromColNameDisplay: me.editValueFromColNameDisplay.getValue(),
      mustInput: me.hiddenMustInput.getValue(),
      widthInView: me.editWidthInView.getValue(),
      showOrder: me.editShowOrder.getValue(),
      showOrderInView: me.editShowOrderInView.getValue(),
      isVisible: me.hiddenIsVisible.getValue(),
      editorXtype: me.hiddenEditorXtype.getValue(),
      memo: me.editMemo.getValue(),
      colSpan: me.editColSpan.getValue(),
    };
    const el = me.getEl();
    el && el.mask(PSI.Const.SAVING);

    const r = {
      url: me.URL("Home/CodeTable/editCodeTableCol"),
      params,
      callback(options, success, response) {
        el && el.unmask();

        if (success) {
          const data = me.decodeJSON(response.responseText);
          if (data.success) {
            me.tip("数据保存成功", true);
            me._lastId = data.id;
            me.close();
            const parentForm = me.getParentForm();
            if (parentForm) {
              parentForm.refreshColsGrid.apply(parentForm, [me._lastId]);
            }
          } else {
            me.showInfo(data.msg);
          }
        } else {
          me.showInfo("网络错误");
        }
      }
    };

    me.ajax(r);
  },

  _onEditLastSpecialKey(field, e) {
    const me = this;
    me.tip("TODO")

    // if (e.getKey() === e.ENTER) {
    //   const f = me.editForm;
    //   if (f.getForm().isValid()) {
    //     me.onOK();
    //   }
    // }
  },

  /**
   * @private
   */
  _onWndClose() {
    const me = this;

    PCL.get(window).un('beforeunload', me.__onWindowBeforeUnload);
  },

  /**
   * @private
   */
  _onFieldTypeChange() {
    const me = this;
    const v = me.hiddenFieldType.getValue();
    if (v == "varchar") {
      me.editFieldLength.setValue(255);
      me.editFieldLength.setDisabled(false);
      me.editFieldDec.setDisabled(true);
      me.editFieldDec.setValue(null);
    } else if (v == "int") {
      me.editFieldLength.setValue(11);
      me.editFieldLength.setDisabled(true);
      me.editFieldDec.setDisabled(true);
      me.editFieldDec.setValue(null);
    } else if (v == "decimal") {
      me.editFieldLength.setValue(19);
      me.editFieldLength.setDisabled(true);
      me.editFieldDec.setDisabled(false);
      me.editFieldDec.setValue(2);
    } else if (v == "datetime") {
      me.editFieldLength.setValue(null);
      me.editFieldLength.setDisabled(true);
      me.editFieldDec.setDisabled(true);
      me.editFieldDec.setValue(null);
    }
  },

  /**
   * @private
   */
  _onValueFromChange() {
    const me = this;
    const v = me.hiddenValueFrom.getValue();
    if (v == 1) {
      me.buttonRefCol.setDisabled(true);
      me.editValueFromTableName.setDisabled(true);
      me.editValueFromColName.setDisabled(true);
      me.editValueFromColNameDisplay.setDisabled(true);
    } else if (v == 2) {
      me.buttonRefCol.setDisabled(false);
      me.editValueFromTableName.setDisabled(false);
      me.editValueFromColName.setDisabled(false);
      me.editValueFromColNameDisplay.setDisabled(false);
    } else if (v == 3) {
      me.buttonRefCol.setDisabled(false);
      me.editValueFromTableName.setDisabled(false);
      me.editValueFromColName.setDisabled(false);
      me.editValueFromColNameDisplay.setDisabled(false);
    } else if (v == 4) {
      me.buttonRefCol.setDisabled(false);
      me.editValueFromTableName.setDisabled(true);
      me.editValueFromColName.setDisabled(false);
      me.editValueFromColNameDisplay.setDisabled(false);
    }
  },

  /**
   * @private
   */
  _onRefCol() {
    const me = this;
    me.showInfo("TODO")
  },

  /**
   * TabPanel选中的Tab发生改变的时候的时间处理函数
   * @private
   */
  _onTabChange(tabPanel, newCard, oldCard, eOpts) {
    const me = this;

    const id = newCard.getId();

    // 延迟0.1秒后设置input焦点
    // 这是一个奇怪的写法，不这样处理，就不能正确设置焦点
    // 原因目前不明
    PCL.Function.defer(() => {
      if (id == "tabDbStruct") {
        me.setFocusAndCursorPosToLast(me.editCaption);
      } else if (id == "tabValueFrom") {
        me.setFocusAndCursorPosToLast(me.editValueFrom);
      } else if (id == "tabDisplay") {
        me.setFocusAndCursorPosToLast(me.editWidthInView);
      } else if (id == "tabEdit") {
        me.setFocusAndCursorPosToLast(me.editColSpan);
      }
    }, 100);
  },

  /**
   * 列数据类型 - 回调本方法
   * 
   * @private
   */
  _fieldTypeCallback(data, scope) {
    const me = scope;

    let t = data ? data.get("id") : null;
    if (!t) {
      t = "varchar";
    }
    me.hiddenFieldType.setValue(t);

    me._onFieldTypeChange();
  },

  /**
   * 值来源 - 回调本方法
   * 
   * @private
   */
  _valueFromCallback(data, scope) {
    const me = scope;

    let t = data ? data.get("id") : null;
    if (!t) {
      t = 1; // 直接录入
    }
    me.hiddenValueFrom.setValue(parseInt(t));

    me._onValueFromChange();
  },

  /**
   * 编辑器类型 - 回调本方法
   * 
   * @private
   */
  _editorXtypeCallback(data, scope) {
    const me = scope;

    let t = data ? data.get("id") : null;
    if (!t) {
      t = 1; // textfield
    }
    me.hiddenEditorXtype.setValue(parseInt(t));
  },

  /**
   * 对用户是否可见 - 回调本方法
   * 
   * @private
   */
  _isVisibleCallback(data, scope) {
    const me = scope;

    let t = data ? data.get("id") : null;
    if (!t) {
      t = 1; // 可见
    }
    me.hiddenIsVisible.setValue(parseInt(t));
  },

  /**
   * 必须录入 - 回调本方法
   * 
   * @private
   */
  _mustInputCallback(data, scope) {
    const me = scope;

    let t = data ? data.get("id") : null;
    if (!t) {
      t = 1; // 非必录项
    }
    me.hiddenMustInput.setValue(parseInt(t));
  },
});
