/**
 * 新建或编辑业务实体的对话框窗体基类
 * 
 * @author 李静波
 */
Ext.define("PSI.AFX.Form.EditForm", {
  extend: 'Ext.window.Window',

  mixins: ["PSI.AFX.Mix.Common"],

  config: {
    parentForm: null,
    entity: null
  },

  modal: true,
  closable: false,
  resizable: false,
  onEsc: Ext.emptyFn,
});
