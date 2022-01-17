/**
 * 码表运行 - 新增或编辑界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.CodeTable.RuntimeEditForm", {
  extend: "PSI.AFX.Form.EditForm",

  config: {
    metaData: null
  },

  /**
   * @override
   */
  initComponent() {
    const me = this;

    const md = me.getMetaData();

    const entity = me.getEntity();

    me.adding = entity == null;

    const buttons = [];
    if (!entity) {
      buttons.push({
        text: "保存并继续新增",
        formBind: true,
        handler() {
          me.onOK(true);
        },
        scope: me
      });
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

    buttons.push(btn = {
      text: entity == null ? "关闭" : "取消",
      handler() {
        me.close();
      },
      scope: me
    });

    // 计算Form的高度
    let sumColSpan = 0;
    for (let i = 0; i < md.cols.length; i++) {
      const colMd = md.cols[i];
      if (colMd.isVisible) {
        sumColSpan += parseInt(colMd.colSpan);
      }
    }
    const rowCount = Math.ceil(sumColSpan / md.editColCnt);
    const formHeight = 190 + rowCount * 30;

    // 每个字段的编辑器宽度
    const fieldWidth = 370;
    const formWidth = fieldWidth * md.editColCnt + 50;

    const t = entity == null ? "新增" + md.name : "编辑" + md.name;
    const logoHtml = me.genLogoHtml(entity, t);
    Ext.apply(me, {
      header: {
        title: me.formatTitle(PSI.Const.PROD_NAME),
        height: 40
      },
      width: formWidth,
      height: formHeight,
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
        id: "PSI_CodeTable_RuntimeEditForm_editForm",
        xtype: "form",
        layout: {
          type: "table",
          columns: md.editColCnt
        },
        height: "100%",
        bodyPadding: 5,
        defaultType: 'textfield',
        fieldDefaults: {
          labelWidth: 80,
          labelAlign: "right",
          labelSeparator: "",
          msgTarget: 'side',
          width: fieldWidth,
          margin: "5"
        },
        items: me.getEditItems(),
        buttons: buttons
      }]
    });

    me.callParent(arguments);

    me.editForm = Ext.getCmp("PSI_CodeTable_RuntimeEditForm_editForm");
  },

  getEditItems() {
    const me = this;

    const entity = me.getEntity();

    const md = me.getMetaData();
    if (!md) {
      return [];
    }

    // 自动编码长度
    const autoCodeLength = parseInt(md.autoCodeLength);

    const result = [{
      xtype: "hidden",
      name: "id",
      value: entity == null ? null : entity.get("id")
    }, {
      xtype: "hidden",
      name: "fid",
      value: md.fid
    }];

    const colsMd = md.cols;
    const colsCount = colsMd.length;
    for (let i = 0; i < colsCount; i++) {
      const colMd = colsMd[i];

      if (colMd.isVisible) {
        const item = {
          fieldLabel: colMd.caption,
          xtype: colMd.editorXtype,
          name: colMd.fieldName,
          id: me.buildEditId(colMd.fieldName),
          listeners: {
            specialkey: {
              fn: me._onEditSpecialKey,
              scope: me
            }
          },
          colspan: colMd.colSpan,
          width: parseInt(colMd.colSpan) * 370
        };
        if (colMd.editorXtype == "numberfield") {
          Ext.apply(item, {
            hideTrigger: true
          });
        }
        if (colMd.editorXtype == "datefield") {
          // 日期
          Ext.apply(item, {
            format: "Y-m-d"
          });
        }

        if (md.treeView && colMd.fieldName == "parent_id") {
          // hiddenParentId用来在提交Form的时候向后台传递上级id
          const hiddenParentId = Ext.create("Ext.form.field.Hidden", {
            id: me.buildEditId("parent_id"),
            name: "parent_id"
          });
          result.push(hiddenParentId);

          Ext.apply(item, {
            idCmp: hiddenParentId,
            metadata: md,
            id: me.buildEditId("parent_id_value"),
            name: "parent_id_value"
          });
        }

        if (parseInt(colMd.valueFrom) == 2) {
          // 引用系统数据字典
          // TODO 当前是用combo来展示数据，当字典数据量大的时候是不合适的，需要进一步优化
          const store = Ext.create("Ext.data.ArrayStore", {
            fields: [colMd.valueFromColName, "name"],
            data: []
          });
          store.add(colMd.valueFromExtData);
          Ext.apply(item, {
            xtype: "combo",
            queryMode: "local",
            editable: false,
            valueField: colMd.valueFromColName,
            displayField: "name",
            store: store,
            value: store.getAt(0)
          });
        } else if (parseInt(colMd.valueFrom) == 3) {
          // 引用其他码表
          // hiddenId用来在提交Form的时候向后台传递码表id
          const hiddenId = Ext.create("Ext.form.field.Hidden", {
            id: me.buildEditId(colMd.fieldName + "_hidden_id"),
            name: colMd.fieldName
          });
          result.push(hiddenId);
          Ext.apply(item, {
            name: colMd.fieldName + "display",
            fid: colMd.valueFromFid
          });
        }

        if (colMd.mustInput) {
          // 必录项
          Ext.apply(item, {
            allowBlank: false,
            blankText: "没有输入" + colMd.caption,
            beforeLabelTextTpl: PSI.Const.REQUIRED
          });
        }
        if (colMd.fieldName == "code") {
          // 处理自动编码
          if (autoCodeLength > 0 && me.adding) {
            Ext.apply(item, {
              xtype: "displayfield",
              value: "保存后自动生成"
            });
          }
        }

        result.push(item);
      }
    }

    return result;
  },

  /**
   * 保存
   */
  onOK(thenAdd) {
    const me = this;

    const md = me.getMetaData();
    const colsMd = md.cols;
    const colsCount = colsMd.length;
    for (let i = 0; i < colsCount; i++) {
      const colMd = colsMd[i];
      if (parseInt(colMd.valueFrom) == 3) {
        // 当前字段是引用其他码表，需要赋值id给对应的hidden
        const fieldName = colMd.fieldName;
        const hidden = Ext.getCmp(me.buildEditId(fieldName + "_hidden_id"));
        const editor = Ext.getCmp(me.buildEditId(fieldName));
        hidden.setValue(editor.getIdValue());
      }
    }

    const f = me.editForm;
    if (!f.isValid()) {
      return;
    }
    const el = f.getEl();
    el && el.mask(PSI.Const.SAVING);
    const sf = {
      url: me.URL("Home/CodeTable/editCodeTableRecord"),
      method: "POST",
      success(form, action) {
        me.__lastId = action.result.id;

        el && el.unmask();

        me.tip("数据保存成功", !thenAdd);
        me.focus();
        if (thenAdd) {
          me.clearEdit();
        } else {
          me.close();
        }
      },
      failure(form, action) {
        el.unmask();
        me.showInfo(action.result.msg, () => {
          me.focusOnFirstEdit();
        });
      }
    };
    f.submit(sf);
  },

  clearEdit() {
    const me = this;
    const md = me.getMetaData();
    const autoCodeLength = parseInt(md.autoCodeLength);

    for (let i = 0; i < md.cols.length; i++) {
      const colMd = md.cols[i];
      if (colMd.fieldName == "code" && autoCodeLength > 0) {
        continue;
      }

      if (colMd.isVisible) {
        const id = me.buildEditId(colMd.fieldName);
        const edit = Ext.getCmp(id);
        if (edit) {
          if (parseInt(colMd.valueFrom) == 2) {
            edit.setValue(edit.getStore().getAt(0));
          } else {
            edit.setValue(null);
            edit.clearInvalid();
          }
        }
      }
    }

    me.focusOnFirstEdit();
  },

  _onWndClose() {
    const me = this;

    Ext.get(window).un('beforeunload', me.__onWindowBeforeUnload);

    if (me.__lastId) {
      const parentForm = me.getParentForm();
      if (parentForm) {
        parentForm.refreshMainGrid.apply(parentForm, [me.__lastId]);
      }
    }
  },

  _onWndShow() {
    const me = this;
    const md = me.getMetaData();

    Ext.get(window).on('beforeunload', me.__onWindowBeforeUnload);

    const el = me.getEl();
    el && el.mask(PSI.Const.LOADING);
    me.ajax({
      url: me.URL("Home/CodeTable/recordInfo"),
      params: {
        id: me.adding ? null : me.getEntity().get("id"),
        fid: md.fid
      },
      callback(options, success, response) {
        if (success) {
          const data = me.decodeJSON(response.responseText);
          me.setDataForEdit(data);
        }

        el && el.unmask();
      }
    });
  },

  setDataForEdit(data) {
    const me = this;

    if (me.adding) {
      me.focusOnFirstEdit();
      return;
    }

    if (!data) {
      return;
    }

    const md = me.getMetaData();
    for (let i = 0; i < md.cols.length; i++) {
      const colMd = md.cols[i];
      if (colMd.isVisible) {
        const fieldName = colMd.fieldName;
        let id = me.buildEditId(fieldName);

        let edit = Ext.getCmp(id);
        if (edit) {
          if (fieldName == "parent_id") {
            id = me.buildEditId("parent_id_value");
            edit = Ext.getCmp(id);
            if (edit) {
              edit.setValue(data["parent_id_value"]);
              edit.setIdValue(data["parent_id"]);
            }
          } else {
            if (parseInt(colMd.valueFrom) == 3) {
              // 码表
              edit.setValue(data[fieldName + "_display_value"]);
              edit.setIdValue(data[fieldName]);
            } else {
              edit.setValue(data[fieldName]);
            }
          }
        }
      }
    }

    me.focusOnFirstEdit();
  },

  /**
   * 把录入焦点设置到第一个input
   * 
   * @private
   */
  focusOnFirstEdit() {
    const me = this;
    const md = me.getMetaData();
    const autoCodeLength = parseInt(md.autoCodeLength);
    if (autoCodeLength > 0) {
      // 自动编码的时候，把焦点设置在name字段上
      const id = me.buildEditId("name");
      const edit = Ext.getCmp(id);
      if (edit) {
        edit.focus();
      }

      return;
    }

    // 把输入焦点设置为第一个可见的输入框
    for (let i = 0; i < md.cols.length; i++) {
      const colMd = md.cols[i];
      if (colMd.isVisible) {
        const id = me.buildEditId(colMd.fieldName);
        const edit = Ext.getCmp(id);
        if (edit) {
          edit.focus();
        }

        return;
      }
    }
  },

  buildEditId(fieldName) {
    const me = this;
    const md = me.getMetaData();
    return "PSI_CodeTable_RuntimeEditForm_edit_" + md.fid + "_" + fieldName;
  },

  _onEditSpecialKey(field, e) {
    const me = this;

    if (e.getKey() === e.ENTER) {
      const id = field.getId();

      const md = me.getMetaData();
      let currentEditIndex = -1;
      for (let i = 0; i < md.cols.length; i++) {
        const colMd = md.cols[i];
        if (id == me.buildEditId(colMd.fieldName)) {
          currentEditIndex = i;

          if (currentEditIndex == md.cols.length - 1) {
            // 是最后一个编辑框，这时候回车就提交Form
            me.onOK(me.adding);
            return;
          } else {
            continue;
          }
        }

        if (currentEditIndex > -1) {
          const nextEditId = me.buildEditId(colMd.fieldName);
          const edit = Ext.getCmp(nextEditId);
          if (edit) {
            me.setFocusAndCursorPosToLast(edit);
            return;
          }
        }
      }
    }
  }
});
