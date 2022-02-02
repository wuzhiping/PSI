/**
 * 用户管理 - 主界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */

///==================================
/// 在这个文件里面会编写大量的ExtJS编程技巧的注释
/// 以帮助大家掌握其常见套路
///==================================

/// 知识点1：Ext.define
/// 这是在ExtJS中定义class的方法
/// 在ExtJS创立的年代，JS中并没有class，为了实现OOP，ExtJS采用这种自己独创的方式
/// Ext.define(类名, JSON对象);
/// 每个JS中都是上述的套路

Ext.define("PSI.User.MainForm", {

  /// 知识点2：继承
  /// 通过extend属性，实现继承
  /// 本例中PSI.User.MainForm 继承了PSI.AFX.Form.MainForm
  extend: "PSI.AFX.Form.MainForm",

  /// 知识点3：配置项，以及通过配置项在claas创建的时候，传入参数
  /// 配置项会生成对应的方法
  /// 例如下面的pAddOrg会生成 getPAddOrg()方法，该方法可以获得pAddOrg的值。
  /// 那么它的值是怎么传入的呢？
  /// \web\Application\Home\View\User\index.html 中
  /// 用Ext.create创建本class的时候，第二个参数中就传入了pAddOrg等参数
  /// 因为\web\Application\Home\View\User\index.html对应后台的Controller的一个方法
  /// 这样整个流程就实现了从后台取数，然后传递给ExtJS class
  /// 
  /// 用配置项，也能实现在ExtJS class之间传递参数
  /// 在PSI中最常用的模式是：在MainForm中创建其他的Form的时候，把MainForm自身作为parentForm传递给
  /// 其他Form，以便其他Form回调MainForm中的方法
  /// 具体例子参见：本class的_onAddOrg方法  
  config: {
    pAddOrg: null,
    pEditOrg: null,
    pDeleteOrg: null,
    pAddUser: null,
    pEditUser: null,
    pDeleteUser: null,
    pChangePassword: null
  },

  /// 知识点4：initComponent
  /// 创建UI的关键方法
  /// ExtJS用了模板方法设计模式(Template Method)
  /// 该设计模式也形象地称为【三明治模式】，具体见方法内的注释
  /**
   * 初始化组件
   * 
   * @override
   */
  initComponent() {
    /// 把this用me局部变量保存，然后后续的代码中都使用me，而不使用this
    /// 这是避免JS this是上下文绑定这个特性带了的惊喜
    /// 用me这个名称，是ExtJS的惯例
    const me = this;

    /// 三明治模式的第一层
    /// 通常就是 Ext.apply(...)
    Ext.apply(me, {
      items: [{
        tbar: [{
          text: "新建组织机构",
          disabled: me.getPAddOrg() == "0",
          handler: me._onAddOrg,
          /// 特别知识点：scope
          /// 在给组件绑定事件的时候，
          /// 通常把scope也赋值为me
          /// 这是进入避免JS this上下文绑定带来的莫名惊喜
          /// 这样确保me._onAddOrg中的this是me
          scope: me
        }, {
          text: "编辑组织机构",
          disabled: me.getPEditOrg() == "0",
          handler: me._onEditOrg,
          scope: me
        }, {
          text: "删除组织机构",
          disabled: me.getPDeleteOrg() == "0",
          handler: me._onDeleteOrg,
          scope: me
        }, "-", {
          text: "新建用户",
          disabled: me.getPAddUser() == "0",
          handler: me._onAddUser,
          scope: me
        }, {
          text: "编辑用户",
          disabled: me.getPEditUser() == "0",
          handler: me._onEditUser,
          scope: me
        }, {
          text: "删除用户",
          disabled: me.getPDeleteUser() == "0",
          handler: me._onDeleteUser,
          scope: me
        }, "-", {
          text: "修改用户密码",
          disabled: me.getPChangePassword() == "0",
          handler: me._onEditUserPassword,
          scope: me
        }, "-", {
          text: "指南",
          handler() {
            me.focus();
            window.open(me.URL("/Home/Help/index?t=user"));
          }
        }, "-", {
          text: "关闭",
          handler() {
            me.closeWindow();
          }
        }],
        id: "panelQueryCmp",
        region: "north",
        border: 0,
        height: 65,
        header: false,
        collapsible: true,
        collapseMode: "mini",
        layout: {
          type: "table",
          columns: 4
        },
        items: me.getQueryCmp()
      }, {
        region: "center",
        xtype: "panel",
        layout: "fit",
        border: 0,
        items: [me.getUserGrid()]
      }, {
        id: "panelOrg",
        xtype: "panel",
        region: "west",
        layout: "fit",
        width: 510,
        split: true,
        collapsible: true,
        header: false,
        border: 0,
        items: [me.getOrgGrid()]
      }]
    });

    /// 三明治模式第二层：调用父类方法
    me.callParent(arguments);

    /// 三明治模式第三层：使用创建的组件
    me.orgTree = me.getOrgGrid();

    // 查询控件input List
    me.__editorList = [Ext.getCmp("editQueryLoginName"), Ext.getCmp("editQueryName"), Ext.getCmp("editQueryEnabled")];
  },

  /**
   * @private
   */
  getQueryCmp() {
    const me = this;
    return [{
      id: "editQueryLoginName",
      labelWidth: 60,
      labelAlign: "right",
      labelSeparator: "",
      fieldLabel: "登录名",
      margin: "5, 0, 0, 0",
      xtype: "textfield",
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      }
    }, {
      id: "editQueryName",
      labelWidth: 60,
      labelAlign: "right",
      labelSeparator: "",
      fieldLabel: "姓名",
      margin: "5, 0, 0, 0",
      xtype: "textfield",
      listeners: {
        specialkey: {
          fn: me.__onEditSpecialKey,
          scope: me
        }
      }
    }, {
      id: "editQueryEnabled",
      xtype: "combo",
      queryMode: "local",
      editable: false,
      valueField: "id",
      labelWidth: 60,
      labelAlign: "right",
      labelSeparator: "",
      fieldLabel: "状态",
      margin: "5, 0, 0, 0",
      store: Ext.create("Ext.data.ArrayStore", {
        fields: ["id", "text"],
        data: [[-1, "全部"], [1, "允许登录"], [0, "禁止登录"]]
      }),
      value: -1,
      listeners: {
        specialkey: {
          fn: me.__onLastEditSpecialKey,
          scope: me
        }
      }
    }, {
      xtype: "container",
      items: [{
        xtype: "button",
        text: "查询",
        width: 100,
        height: 26,
        margin: "5, 0, 0, 20",
        handler: me._onQuery,
        scope: me
      }, {
        xtype: "button",
        text: "清空查询条件",
        width: 100,
        height: 26,
        margin: "5, 0, 0, 5",
        handler: me._onClearQuery,
        scope: me
      }, {
        xtype: "button",
        text: "隐藏工具栏",
        width: 130,
        height: 26,
        iconCls: "PSI-button-hide",
        margin: "5 0 0 10",
        handler: function () {
          Ext.getCmp("panelQueryCmp").collapse();
        },
        scope: me
      }]
    }];
  },

  /**
   * @private
   */
  getOrgGrid() {
    const me = this;
    if (me._orgGrid) {
      return me._orgGrid;
    }

    const modelName = "PSIModel.PSI.User.OrgModel";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "text", "fullName", "orgCode", "dataOrg",
        "leaf", "children", "userCount", "orgType"]
    });

    const orgStore = Ext.create("Ext.data.TreeStore", {
      model: modelName,
      proxy: {
        type: "ajax",
        actionMethods: {
          read: "POST"
        },
        url: me.URL("Home/User/allOrgs")
      },
      listeners: {
        beforeload: {
          fn() {
            orgStore.proxy.extraParams = me.getQueryParamForCategory();
          },
          scope: me
        }
      }
    });

    orgStore.on("load", me._onOrgStoreLoad, me);

    const orgTree = Ext.create("Ext.tree.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("组织机构")
      },
      store: orgStore,
      rootVisible: false,
      useArrows: true,
      viewConfig: {
        loadMask: true
      },
      tools: [{
        type: "close",
        handler() {
          Ext.getCmp("panelOrg").collapse();
        }
      }],
      columns: {
        defaults: {
          sortable: false,
          menuDisabled: true,
          draggable: false
        },
        items: [{
          xtype: "treecolumn",
          text: "名称",
          dataIndex: "text",
          width: 300
        }, {
          text: "编码",
          dataIndex: "orgCode",
          width: 100
        }, {
          text: "数据域",
          dataIndex: "dataOrg",
          width: 100
        }, {
          text: "用户数",
          dataIndex: "userCount",
          width: 80,
          align: "right"
        }, {
          text: "组织机构性质",
          dataIndex: "orgType",
          width: 200
        }]
      }
    });

    orgTree.on("select", (rowModel, record) => {
      me._onOrgTreeNodeSelect(record);
    }, me);

    orgTree.on("itemdblclick", me._onEditOrg, me);

    me._orgGrid = orgTree;

    return me._orgGrid;
  },

  /**
   * @private
   */
  getUserGrid() {
    const me = this;

    if (me._userGrid) {
      return me._userGrid;
    }

    const modelName = "PSIModel.PSI.User.UserModel";
    Ext.define(modelName, {
      extend: "Ext.data.Model",
      fields: ["id", "loginName", "name", "enabled", "orgCode",
        "gender", "birthday", "idCardNumber", "tel",
        "tel02", "address", "dataOrg", "roleName"]
    });
    const storeGrid = Ext.create("Ext.data.Store", {
      autoLoad: false,
      model: modelName,
      data: [],
      pageSize: 20,
      proxy: {
        type: "ajax",
        actionMethods: {
          read: "POST"
        },
        url: me.URL("Home/User/users"),
        reader: {
          root: 'dataList',
          totalProperty: 'totalCount'
        }
      }
    });
    storeGrid.on("beforeload", () => {
      storeGrid.proxy.extraParams = me.getUserParam();
    });

    me._userGrid = Ext.create("Ext.grid.Panel", {
      cls: "PSI",
      header: {
        height: 30,
        title: me.formatGridHeaderTitle("人员列表")
      },
      viewConfig: {
        enableTextSelection: true
      },
      columnLines: true,
      columns: {
        defaults: {
          menuDisabled: true,
          sortable: false,
        },
        items: [Ext.create("Ext.grid.RowNumberer", {
          text: "#",
          width: 40
        }), {
          header: "登录名",
          dataIndex: "loginName",
          locked: true,
          width: 250, // 登录名用这么宽，是因为常用手机号作为登录名
          renderer(value, metaData, record) {
            if (parseInt(record.get("enabled")) == 1) {
              return value;
            } else {
              return "<span style='color:gray;text-decoration:line-through;'>"
                + value + "</span>";
            }
          }
        }, {
          header: "姓名",
          dataIndex: "name",
          locked: true,
          renderer(value, metaData, record) {
            if (parseInt(record.get("enabled")) == 1) {
              return value;
            } else {
              return "<span style='color:gray;text-decoration:line-through;'>"
                + value + "</span>";
            }
          }
        }, {
          header: "权限角色",
          dataIndex: "roleName",
          width: 200
        }, {
          header: "编码",
          dataIndex: "orgCode",
        }, {
          header: "是否允许登录",
          dataIndex: "enabled",
          renderer(value) {
            return value == 1
              ? "允许登录"
              : "<span style='color:red'>禁止登录</span>";
          }
        }, {
          header: "性别",
          dataIndex: "gender",
          width: 70
        }, {
          header: "生日",
          dataIndex: "birthday",
        }, {
          header: "身份证号",
          dataIndex: "idCardNumber",
          width: 200
        }, {
          header: "联系电话",
          dataIndex: "tel",
        }, {
          header: "备用联系电话",
          dataIndex: "tel02",
        }, {
          header: "家庭住址",
          dataIndex: "address",
          width: 200
        }, {
          header: "数据域",
          dataIndex: "dataOrg",
          width: 100
        }]
      },
      store: storeGrid,
      listeners: {
        itemdblclick: {
          fn: me._onEditUser,
          scope: me
        }
      },
      bbar: ["->", {
        id: "pagingToolbar",
        border: 0,
        xtype: "pagingtoolbar",
        store: storeGrid
      }, "-", {
          xtype: "displayfield",
          value: "每页显示"
        }, {
          id: "comboCountPerPage",
          xtype: "combobox",
          editable: false,
          width: 60,
          store: Ext.create("Ext.data.ArrayStore", {
            fields: ["text"],
            data: [["20"], ["50"], ["100"], ["300"],
            ["1000"]]
          }),
          value: 20,
          listeners: {
            change: {
              fn() {
                storeGrid.pageSize = Ext.getCmp("comboCountPerPage").getValue();
                storeGrid.currentPage = 1;
                Ext.getCmp("pagingToolbar").doRefresh();
              },
              scope: me
            }
          }
        }, {
          xtype: "displayfield",
          value: "条记录"
        }]
    });

    return me._userGrid;
  },

  /**
   * 新增组织机构
   * 
   * @private
   */
  _onAddOrg() {
    const me = this;

    /// 知识点5：用Ext.create创建ExtJS class，不要是new创建ExtJS class
    /// Ext.create(类名, 配置项JSON对象)
    const form = Ext.create("PSI.User.OrgEditForm", {
      /// 这就是通过配置项在ExtJS组件之间传递参数
      /// 参考PSI.User.OrgEditForm的onOK方法中如何回调本class的方法的
      parentForm: me
    });
    form.show();
  },

  /**
   * 编辑组织机构
   * 
   * @private
   */
  _onEditOrg() {
    const me = this;
    if (me.getPEditOrg() == "0") {
      return;
    }

    const tree = me.getOrgGrid();
    const item = tree.getSelectionModel().getSelection();
    if (item === null || item.length !== 1) {
      me.showInfo("请选择要编辑的组织机构");
      return;
    }

    const org = item[0];

    const form = Ext.create("PSI.User.OrgEditForm", {
      parentForm: me,
      entity: org
    });
    form.show();
  },

  /**
   * 删除组织机构
   * 
   * @private
   */
  _onDeleteOrg() {
    const me = this;
    const tree = me.getOrgGrid();
    const item = tree.getSelectionModel().getSelection();
    if (item === null || item.length !== 1) {
      me.showInfo("请选择要删除的组织机构");
      return;
    }

    const org = item[0].getData();

    const funcConfirm = () => {
      Ext.getBody().mask("正在删除中...");
      const r = {
        url: me.URL("Home/User/deleteOrg"),
        params: {
          id: org.id
        },
        callback(options, success, response) {
          Ext.getBody().unmask();

          if (success) {
            const data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成删除操作");
              me.freshOrgGrid();
            } else {
              me.showInfo(data.msg);
            }
          }
        }
      };

      me.ajax(r);
    };

    const info = `请确认是否删除组织机构 <span style='color:red'>${org.fullName}</span> ?`;
    me.confirm(info, funcConfirm);
  },

  /**
   * @private
   */
  freshOrgGrid() {
    const me = this;

    me.getOrgGrid().getStore().reload();
  },

  /**
   * @private
   */
  freshUserGrid() {
    const me = this;

    const tree = me.getOrgGrid();
    const item = tree.getSelectionModel().getSelection();
    if (item === null || item.length !== 1) {
      return;
    }

    me._onOrgTreeNodeSelect(item[0]);
  },

  /**
   * 新增用户
   * 
   * @private
   */
  _onAddUser() {
    const me = this;

    const tree = me.getOrgGrid();
    const item = tree.getSelectionModel().getSelection();
    let org = null;
    if (item != null && item.length > 0) {
      org = item[0];
    }

    const form = Ext.create("PSI.User.UserEditForm", {
      parentForm: me,
      defaultOrg: org
    });
    form.show();
  },

  /**
   * 编辑用户
   * 
   * @private
   */
  _onEditUser() {
    const me = this;
    if (me.getPEditUser() == "0") {
      return;
    }

    const item = me.getUserGrid().getSelectionModel().getSelection();
    if (item === null || item.length !== 1) {
      me.showInfo("请选择要编辑的用户");
      return;
    }

    const user = item[0];

    const form = Ext.create("PSI.User.UserEditForm", {
      parentForm: me,
      entity: user
    });
    form.show();
  },

  /**
   * 修改用户密码
   * 
   * @private
   */
  _onEditUserPassword() {
    const me = this;

    const item = me.getUserGrid().getSelectionModel().getSelection();
    if (item === null || item.length !== 1) {
      me.showInfo("请选择要修改密码的用户");
      return;
    }

    const user = item[0].getData();
    const form = Ext.create("PSI.User.ChangeUserPasswordForm", {
      entity: user
    });
    form.show();
  },

  /**
   * 删除用户
   * 
   * @private
   */
  _onDeleteUser() {
    const me = this;
    const item = me.getUserGrid().getSelectionModel().getSelection();
    if (item === null || item.length !== 1) {
      me.showInfo("请选择要删除的用户");
      return;
    }

    const user = item[0].getData();

    const funcConfirm = () => {
      Ext.getBody().mask("正在删除中...");
      const r = {
        url: me.URL("Home/User/deleteUser"),
        params: {
          id: user.id
        },
        callback(options, success, response) {
          Ext.getBody().unmask();

          if (success) {
            const data = me.decodeJSON(response.responseText);
            if (data.success) {
              me.tip("成功完成删除操作", true);
              me.freshUserGrid();
            } else {
              me.showInfo(data.msg);
            }
          }
        }
      };
      me.ajax(r);
    };

    const info = `请确认是否删除用户 <span style='color:red'>${user.name}</span> ?`;
    me.confirm(info, funcConfirm);
  },

  /**
   * @private
   */
  _onOrgTreeNodeSelect(rec) {
    if (!rec) {
      return;
    }

    const org = rec.data;
    if (!org) {
      return;
    }

    const me = this;
    const grid = me.getUserGrid();

    grid.setTitle(me.formatGridHeaderTitle(`<span class='PSI-title-keyword'>${org.fullName}</span> - 人员列表`));

    Ext.getCmp("pagingToolbar").doRefresh();
  },

  /**
   * @private
   */
  _onOrgStoreLoad() {
    const me = this;

    const tree = me.getOrgGrid();
    const root = tree.getRootNode();
    if (root) {
      const node = root.firstChild;
      if (node) {
        tree.getSelectionModel().select(node);
      }
    }
  },

  /**
   * @private
   */
  getUserParam() {
    const me = this;
    const item = me.getOrgGrid().getSelectionModel().getSelection();
    if (item == null || item.length == 0) {
      return {};
    }

    const org = item[0];

    let queryLoginName = null;
    const editLoginName = Ext.getCmp("editQueryLoginName");
    if (editLoginName) {
      queryLoginName = editLoginName.getValue();
    }

    let queryName = null;
    const editQueryName = Ext.getCmp("editQueryName");
    if (editQueryName) {
      queryName = editQueryName.getValue();
    }

    let enabled = -1;
    const edit = Ext.getCmp("editQueryEnabled");
    if (edit) {
      enabled = edit.getValue();
    }

    const orgId = org.get("id");

    return {
      orgId,
      queryLoginName,
      queryName,
      enabled,
    }
  },

  /**
   * @private
   */
  _onClearQuery() {
    const me = this;

    Ext.getCmp("editQueryLoginName").setValue(null);
    Ext.getCmp("editQueryName").setValue(null);
    Ext.getCmp("editQueryEnabled").setValue(-1);

    me._onQuery();
  },

  /**
   * @private
   */
  _onQuery() {
    const me = this;

    me.getUserGrid().getStore().removeAll();

    me.freshOrgGrid();
  },

  /**
   * @private
   */
  getQueryParamForCategory() {
    let queryLoginName = null;
    const editLoginName = Ext.getCmp("editQueryLoginName");
    if (editLoginName) {
      queryLoginName = editLoginName.getValue();
    }

    let queryName = null;
    const editQueryName = Ext.getCmp("editQueryName");
    if (editQueryName) {
      queryName = editQueryName.getValue();
    }

    let enabled = -1;
    const edit = Ext.getCmp("editQueryEnabled");
    if (edit) {
      enabled = edit.getValue();
    }

    return {
      queryLoginName,
      queryName,
      enabled
    };
  }
});
