/**
 * 新增或编辑组织机构
 */
Ext.define("PSI.User.OrgEditForm", {
  extend: "PSI.AFX.Form.EditForm",

  /**
   * 初始化组件
   */
  initComponent() {
    var me = this;
    var entity = me.getEntity();

    var t = entity == null ? "新建组织机构" : "编辑组织机构";

    var logoHtml = me.genLogoHtml(entity, t);
    Ext.apply(me, {
      header: {
        title: me.formatTitle(PSI.Const.PROD_NAME),
        height: 40
      },
      width: 400,
      height: 330,
      layout: "border",
      items: [{
        region: "north",
        border: 0,
        height: 70,
        html: logoHtml
      }, {
        region: "center",
        border: 0,
        id: "PSI_User_OrgEditForm_editForm",
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
          msgTarget: 'side'
        },
        items: [{
          xtype: "hidden",
          name: "id",
          value: entity === null ? null : entity.get("id")
        }, {
          id: "PSI_User_OrgEditForm_editName",
          fieldLabel: "名称",
          allowBlank: false,
          blankText: "没有输入名称",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          name: "name",
          value: entity === null ? null : entity.get("text"),
          listeners: {
            specialkey: {
              fn: me.__onEditSpecialKey,
              scope: me
            }
          },
          width: 370
        }, {
          id: "PSI_User_OrgEditForm_editParentOrg",
          xtype: "PSI_parent_org_editor",
          parentItem: me,
          fieldLabel: "上级组织",
          listeners: {
            specialkey: {
              fn: me.__onEditSpecialKey,
              scope: me
            }
          },
          width: 370
        }, {
          id: "PSI_User_OrgEditForm_editParentOrgId",
          xtype: "hidden",
          name: "parentId",
          value: entity === null ? null : entity.get("parentId")
        }, {
          id: "PSI_User_OrgEditForm_editOrgCode",
          fieldLabel: "编码",
          allowBlank: false,
          blankText: "没有输入编码",
          beforeLabelTextTpl: PSI.Const.REQUIRED,
          name: "orgCode",
          value: entity === null ? null : entity.get("orgCode"),
          listeners: {
            specialkey: {
              fn: me.__onEditSpecialKey,
              scope: me
            }
          },
          width: 370
        }, {
          id: "PSI_User_OrgEditForm_editOrgType",
          xtype: "combo",
          queryMode: "local",
          editable: false,
          valueField: "id",
          labelAlign: "right",
          labelSeparator: "",
          fieldLabel: "性质",
          name: "orgType",
          store: Ext.create("Ext.data.ArrayStore", {
            fields: ["id", "text"],
            data: [[0, "[无]"], [400, "事业部"],
            [500, "门店"], [600, "内部物流组织机构"],
            [700, "办事处"],
            [2000, "客户"], [3000, "供应商"],
            [4000, "外协工厂"], [5000, "外部物流商"]]
          }),
          value: 0,
          width: 370,
          listeners: {
            specialkey: {
              fn: me.onLastEditSpecialKey,
              scope: me
            }
          }
        }, {
          xtype: "displayfield",
          fieldLabel: "说明",
          value: "<span class='PSI-field-note'>上级组织机构为空的时候，该组织机构是公司</span>"
        }],
        buttons: [{
          text: "确定",
          formBind: true,
          iconCls: "PSI-button-ok",
          handler: me.onOK,
          scope: me
        }, {
          text: "取消",
          handler: function () {
            me.confirm("请确认是否取消操作?", function () {
              me.close();
            });
          },
          scope: me
        }]
      }],
      listeners: {
        show: {
          fn: me.onEditFormShow,
          scope: me
        },
        close: {
          fn: me.onWndClose,
          scope: me
        }
      }
    });

    me.callParent(arguments);

    me.editParentOrg = Ext.getCmp("PSI_User_OrgEditForm_editParentOrg");
    me.editParentOrgId = Ext.getCmp("PSI_User_OrgEditForm_editParentOrgId");
    me.editName = Ext.getCmp("PSI_User_OrgEditForm_editName");
    me.editOrgCode = Ext.getCmp("PSI_User_OrgEditForm_editOrgCode");
    me.editOrgType = Ext.getCmp("PSI_User_OrgEditForm_editOrgType");

    me.editForm = Ext.getCmp("PSI_User_OrgEditForm_editForm");

    me.__editorList = [me.editName, me.editParentOrg, me.editOrgCode, me.editOrgType];
  },

  onWindowBeforeUnload(e) {
    return (window.event.returnValue = e.returnValue = '确认离开当前页面？');
  },

  onWndClose() {
    var me = this;

    Ext.get(window).un('beforeunload', me.onWindowBeforeUnload);
  },

  onEditFormShow() {
    var me = this;

    Ext.get(window).on('beforeunload', me.onWindowBeforeUnload);

    me.editName.focus();

    var entity = me.getEntity();
    if (entity === null) {
      return;
    }
    var el = me.getEl() || Ext.getBody();
    el.mask("数据加载中...");
    me.ajax({
      url: me.URL("Home/User/orgParentName"),
      params: {
        id: entity.get("id")
      },
      callback: function (options, success, response) {
        el.unmask();
        if (success) {
          var data = Ext.JSON.decode(response.responseText);
          me.editParentOrg.setValue(data.parentOrgName);
          me.editParentOrgId.setValue(data.parentOrgId);
          me.editName.setValue(data.name);
          me.editOrgCode.setValue(data.orgCode);
          var orgType = data.orgType;
          if (!orgType) {
            orgType = 0;
          }
          me.editOrgType.setValue(parseInt(orgType));
        }
      }
    });
  },

  setParentOrg(data) {
    var me = this;
    me.editParentOrg.setValue(data.fullName);
    me.editParentOrgId.setValue(data.id);
  },

  onOK() {
    var me = this;
    var f = me.editForm;
    var el = f.getEl();
    el.mask("数据保存中...");
    f.submit({
      url: me.URL("Home/User/editOrg"),
      method: "POST",
      success: function (form, action) {
        el.unmask();
        me.close();
        me.getParentForm().freshOrgGrid();
      },
      failure: function (form, action) {
        el.unmask();
        me.showInfo(action.result.msg, function () {
          me.editName.focus();
        });
      }
    });
  },

  onLastEditSpecialKey(field, e) {
    var me = this;
    if (e.getKey() == e.ENTER) {
      if (me.editForm.getForm().isValid()) {
        me.onOK();
      }
    }
  }
});
