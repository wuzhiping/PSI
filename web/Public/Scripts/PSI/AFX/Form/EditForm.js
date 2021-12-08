/**
 * 新建或编辑业务实体的对话框窗体基类
 * 
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
Ext.define("PSI.AFX.Form.EditForm", {
  extend: 'Ext.window.Window',

  mixins: ["PSI.AFX.Mix.Common"],

  config: {
    // 调用本Form的父Form，通常是一个模块的MainForm
    // 主要用途是：在编辑完成后，回调parntForm中的刷新页面的函数
    parentForm: null,

    // 新建的时候entity == null；编辑的时候则为要编辑的业务实体
    entity: null
  },

  modal: true,
  closable: false,
  resizable: false,
  onEsc: Ext.emptyFn,

  __onWindowBeforeUnload(e) {
    return (window.event.returnValue = e.returnValue = '确认离开当前页面？');
  },

  // 保存input列表，用于在回车的时候跳转
  __editorList: [],
  __onEditSpecialKey(field, e) {
    const me = this;

    if (e.getKey() === e.ENTER) {
      const id = field.getId();
      for (let i = 0; i < me.__editorList.length; i++) {
        const editor = me.__editorList[i];
        if (id === editor.getId()) {
          const edit = me.__editorList[i + 1];
          me.setFocusAndCursorPosToLast(edit);
        }
      }
    }
  },

});
