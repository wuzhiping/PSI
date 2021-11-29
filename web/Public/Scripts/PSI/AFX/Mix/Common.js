/**
 * 常用的公共Mix
 * 
 * @author 李静波
 */
Ext.define("PSI.AFX.Mix.Common", {
  // 显示提示信息
  tip(info) {
    PSI.MsgBox.tip(info);
  },

  // 显示需要用户确认的信息
  confirm(confirmInfo, funcOnYes) {
    PSI.MsgBox.confirm(confirmInfo, funcOnYes);
  },

  // 构建最终的URL
  URL(url) {
    return PSI.Const.BASE_URL + url;
  },

  // Ajax调用
  ajax(r) {
    if (!r.method) {
      r.method = "POST";
    }
    Ext.Ajax.request(r);
  },

  // 把字符串解析为JSON
  decodeJSON(str) {
    return Ext.JSON.decode(str);
  },

  // 把对象转换成JSON字符串
  encodeJSON(obj) {
    return Ext.JSON.encode(obj);
  },

  // 关闭当前模块
  closeWindow() {
    if (PSI.Const.MOT == "0") {
      window.location.replace(PSI.Const.BASE_URL);
    } else {
      window.close();

      if (!window.closed) {
        window.location.replace(PSI.Const.BASE_URL);
      }
    }
  },

  // 把input的光标定位到最后
  setFocusAndCursorPosToLast(edit) {
    edit.focus();
    const v = edit.getValue();
    edit.inputEl.dom.selectionStart = v ? v.length : 0;
  },

  // 格式化Dialogue Form的标题
  formatTitle(title) {
    return `<span style='font-size:160%'>${title}</span>`;
  },

  // 格式化Grid标题
  formatGridHeaderTitle(title) {
    return `<span style='font-size:13px'>${title}</sapn>`;
  },

  // 生成Edit Form这类窗体左上的Logo
  genLogoHtml(entity, title) {
    const f = entity == null
      ? "edit-form-create.png"
      : "edit-form-update.png";
    const logoHtml = `
      <img style='float:left;margin:0px 20px 0px 10px;width:48px;height:48px;' 
        src='${PSI.Const.BASE_URL}Public/Images/${f}'></img>
      <div style='margin-left:60px;margin-top:0px;'>
        <h2 style='color:#196d83;margin-top:0px;'>${title}</h2>
        <p style='color:#196d83'>标记 <span style='color:red;font-weight:bold'>*</span>的是必须录入数据的字段</p>
      </div>`;

    return logoHtml;
  }
});
