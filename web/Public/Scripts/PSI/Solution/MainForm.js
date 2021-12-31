/**
 * 解决方案 - 主界面
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */

Ext.define("PSI.Solution.MainForm", {

  extend: "PSI.AFX.Form.MainForm",

  /**
   * 初始化组件
   */
  initComponent() {
    const me = this;

    Ext.apply(me, {
      tbar: [{
        text: "新建解决方案",
        handler: me.onAdd,
        scope: me
      }, {
        text: "编辑解决方案",
        handler: me.onEdit,
        scope: me
      }, {
        text: "删除解决方案",
        handler: me.onDelete,
        scope: me
      }, "-", {
        text: "指南",
        handler() {
          me.showInfo("TODO");
        }
      }, "-", {
        text: "关闭",
        handler() {
          me.closeWindow();
        }
      }],
      items: {
        region: "center",
        xtype: "panel",
        layout: "fit",
        border: 0,
        items: []
      }
    });

    me.callParent(arguments);
  },

  /**
   * 新增解决方案
   */
  onAdd() {
    const me = this;

    me.showInfo("TODO")
  },

  /**
   * 编辑解决方案
   */
  onEdit() {
    const me = this;

    me.showInfo("TODO")
  },

  /**
   * 删除解决方案
   */
  onDelete() {
    const me = this;
    me.showInfo("TODO")
  },
});
