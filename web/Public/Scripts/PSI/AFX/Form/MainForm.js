/**
 * 主界面基类
 * 
 * @author 李静波
 */
Ext.define("PSI.AFX.Form.MainForm", {
  extend: "Ext.panel.Panel",

  mixins: ["PSI.AFX.Mix.Common"],

  border: 0,

  layout: "border",

  // 保存查询条件里面的input列表，用于在回车的时候跳转
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

  // 最后一个查询input回车后，触发onQuery方法查询数据
  __onLastEditSpecialKey(field, e) {
    const me = this;

    if (e.getKey() === e.ENTER) {
      // ComboBox的下拉框出现的时候，回车是选中下拉框中相应的条码
      // 这里ComboBox的默认键盘操作行为，所以不触发查询
      if (field.isExpanded) {
        return;
      }

      if (me.onQuery) {
        me.onQuery.apply(me);
      }
    }
  }

});
