import{r as s,o as l,c as r,a as e,b as t,F as i,d as o,e as c}from"./app.58db4e50.js";import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";var _="/help/assets/100-01.7c1289ff.jpg";const p={},d=e("h1",{id:"\u5982\u4F55\u65B0\u589E\u4E00\u4E2A\u6A21\u5757",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u5982\u4F55\u65B0\u589E\u4E00\u4E2A\u6A21\u5757","aria-hidden":"true"},"#"),o(" \u5982\u4F55\u65B0\u589E\u4E00\u4E2A\u6A21\u5757")],-1),h=e("hr",null,null,-1),u=e("p",null,"1\u3001fid",-1),m=e("p",null,[e("code",null,"fid"),o("\u662F\u529F\u80FDid\u7684\u7F29\u5199\u3002\u4E00\u4E2A"),e("code",null,"fid"),o("\u53EA\u8981\u505A\u5230\u5168\u5C40\u552F\u4E00\u5373\u53EF\uFF0C\u4F46\u662F\u6700\u597D\u53C2\u8003PSI\u73B0\u5728\u7684\u9ED8\u8BA4\u547D\u540D\u60EF\u4F8B\u3002")],-1),b=e("code",null,"fid",-1),f=o("\u7684\u5B9A\u4E49\u5728\uFF1A"),g={href:"https://gitee.com/crm8000/PSI/blob/master/web/Application/Home/Common/FIdConst.class.php",target:"_blank",rel:"noopener noreferrer"},P=o("/web/Application/Home/Common/FIdConst.class.php"),k=e("p",null,"2\u3001\u4E3B\u83DC\u5355",-1),C=e("p",null,"\u7528\u6237\u8FDB\u5165\u4E00\u4E2A\u4E1A\u52A1\u6A21\u5757\u7684\u64CD\u4F5C\u5165\u53E3\u662F\u4E3B\u83DC\u5355\u3002",-1),x=o("PSI\u7684\u4E3B\u83DC\u5355\u5B9A\u4E49\u5728\u6570\u636E\u5E93\u7684\u8868 "),w=e("code",null,"t_menu_item",-1),I=o(" \u4E2D\uFF0C\u8868\u7ED3\u6784\u7684\u5177\u4F53\u542B\u4E49\u8BF7\u53C2\u8003 "),S={href:"https://gitee.com/crm8000/PSI/tree/master/doc/02%20%E8%A1%A8%E7%BB%93%E6%9E%84",target:"_blank",rel:"noopener noreferrer"},v=o("/doc/02 \u8868\u7ED3\u6784/\u8868\u7ED3\u6784\u8BF4\u660E.ods"),M=o("\u3002"),H=e("p",null,[e("code",null,"t_menu_item"),o("\u4E2D\u7684\u4E00\u6761\u8BB0\u5F55\u5C31\u5BF9\u5E94\u4E00\u4E2A\u83DC\u5355\u9879\uFF0C\u6240\u4EE5\u65B0\u52A0\u4E00\u4E2A\u6A21\u5757\uFF0C\u5C31\u9700\u8981\u5411"),e("code",null,"t_menu_item"),o("\u4E2D\u6DFB\u52A0\u4E00\u6761\u65B0\u8BB0\u5F55\u3002")],-1),V=o("\u83DC\u5355\u7684\u56FE\u6807\u662F\u7528css\u5B9E\u73B0\u7684\uFF0C\u8BE5css\u6587\u4EF6\u5728"),E={href:"https://gitee.com/crm8000/PSI/blob/master/web/Public/Content/icons.css",target:"_blank",rel:"noopener noreferrer"},A=o("PSI/web/Public/Content/icons.css"),B=c(`<p>\u4F8B\u5982\uFF1A\u5BA2\u6237\u8D44\u6599\u7684fid\u662F1007\uFF0C\u90A3\u4E48\u5B83\u7684\u56FE\u6807\u5728css\u4E2D\u5C31\u662F\u8FD9\u4E48\u5199\u7684</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.PSI-fid1007 {
    background-image:url(../Images/fid/fid1007.png) !important;
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>3\u3001\u6743\u9650</p><p>\u7ED9\u8868 <code>t_permission</code> \u4E2D\u65B0\u589E\u4E00\u6761\u8BB0\u5F55\uFF0C\u5BF9\u5E94\u4E8E\u901A\u8FC7\u83DC\u5355\u8FDB\u5165\u4E1A\u52A1\u6A21\u5757\u7684\u6743\u9650\u3002</p><p>\u5982\u679C\u9875\u9762\u91CC\u9762\u7684\u6309\u94AE\u4E5F\u9700\u8981\u6743\u9650\u63A7\u5236\uFF0C\u6709\u51E0\u4E2A\u6743\u9650\u9879\u5C31\u518D\u5B9A\u4E49\u51E0\u4E2Afid\uFF0C\u5E76\u5411\u8868 <code>t_permission</code> \u91CC\u9762\u65B0\u589E\u5BF9\u5E94\u7684\u8BB0\u5F55\u3002</p><p>4\u3001\u7F16\u5199\u4E1A\u52A1\u6A21\u5757Controller</p><p>Controller\u9700\u8981\u4ECEPSIBaseController\u7EE7\u627F\u3002</p><p>\u4E1A\u52A1\u6A21\u5757\u7684\u5165\u53E3\u9875\u9762\u901A\u5E38\u7684action\u5C31\u7528index()\u3002</p><p>\u4E0B\u56FE\u662FPermissionController\u7684index()\u7684\u65B9\u6CD5\u3002</p><p><img src="`+_+'" alt=""></p><blockquote><p>\u5173\u952E\u6280\u672F\u70B9\uFF1A</p><ol><li><p>\u7528UserService\u7684\u65B9\u6CD5hasPermission\u6765\u5224\u65AD\u662F\u5426\u6709\u6743\u9650</p></li><li><p>\u5982\u679C\u6CA1\u6709\u6743\u9650\u7528$this-&gt;gotoLoginPage\u6765\u8DF3\u8F6C\u9875\u9762</p></li><li><p>\u7528$this-&gt;initVar()\u521D\u59CB\u5316\u9ED8\u8BA4\u53D8\u91CF\u503C</p></li></ol></blockquote>',11),T=o("\u8FD9\u662F\u6807\u51C6\u7684ThinkPHP 3.2\u7684Controller\u5F00\u53D1\u5185\u5BB9\uFF0C\u8BF7\u53C2\u8003"),F={href:"https://www.kancloud.cn/manual/thinkphp/1712",target:"_blank",rel:"noopener noreferrer"},N=e("code",null,"ThinkPHP 3.2\u5F00\u53D1\u6587\u6863",-1),j=o("\u3002"),L=e("p",null,"5\u3001\u7F16\u5199\u4E1A\u52A1\u6A21\u5757View",-1),q=e("p",null,"\u4E1A\u52A1\u6A21\u5757\u7684\u5165\u53E3\u9875\u9762\u901A\u5E38\u7684action\u5C31\u7528index()\uFF0C\u5BF9\u5E94\u7684View\u5C31\u662Findex.html",-1),$=o("\u8FD9\u662F\u6807\u51C6\u7684ThinkPHP 3.2\u7684View\u5F00\u53D1\u5185\u5BB9\uFF0C\u8BF7\u53C2\u8003"),U={href:"https://www.kancloud.cn/manual/thinkphp/1785",target:"_blank",rel:"noopener noreferrer"},y=e("code",null,"ThinkPHP 3.2\u5F00\u53D1\u6587\u6863",-1),z=o("\u3002"),D=e("p",null,"6\u3001\u4FEE\u6539MainMenuController\u7684\u4EE3\u7801",-1),G=o("MainMenuController \u4F4D\u4E8E "),J={href:"https://gitee.com/crm8000/PSI/blob/master/web/Application/Home/Controller/MainMenuController.class.php",target:"_blank",rel:"noopener noreferrer"},K=e("code",null,"/web/Application/Home/Controller/MainMenuController.class.php",-1),O=e("p",null,[o("\u5728MainMenuController\u7684\u65B9\u6CD5 "),e("code",null,"navigateTo"),o(" \u4E2D\u589E\u52A0\u76F8\u5E94\u7684\u8DF3\u8F6C\u4EE3\u7801\u3002")],-1);function Q(R,W){const n=s("ExternalLinkIcon");return l(),r(i,null,[d,h,u,m,e("p",null,[b,f,e("a",g,[P,t(n)])]),k,C,e("p",null,[x,w,I,e("a",S,[v,t(n)]),M]),H,e("p",null,[V,e("a",E,[A,t(n)])]),B,e("p",null,[T,e("a",F,[N,t(n)]),j]),L,q,e("p",null,[$,e("a",U,[y,t(n)]),z]),D,e("p",null,[G,e("a",J,[K,t(n)])]),O],64)}var Z=a(p,[["render",Q]]);export{Z as default};
