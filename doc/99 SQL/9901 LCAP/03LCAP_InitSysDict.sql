# @author 艾格林门信息服务（大连）有限公司
# @copyright 2015 - present
# @license GPL v3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

TRUNCATE TABLE `t_dict_table_category`;
INSERT INTO `t_dict_table_category` (`id`, `code`, `name`, `parent_id`) VALUES
('SLN0000.01', 'SLN0000.01', '码表', NULL),
('SLN0000.02', 'SLN0000.02', '自定义表单', NULL),
('SLN0000.03', 'SLN0000.03', '视图', NULL),
('SLN0000.04', 'SLN0000.04', '报表', NULL),
('SLN0000.05', 'SLN0000.05', '工作流', NULL),
('SLN0000.51', 'SLN0000.51', '组织机构', NULL),
('SLN0000.52', 'SLN0000.52', '用户', NULL);

TRUNCATE TABLE `t_dict_table_md`;
INSERT INTO `t_dict_table_md` (`id`, `code`, `name`, `table_name`, `category_id`, `memo`, `py`) VALUES
('473D4804-60AF-11EC-A41B-E86A641ED142', 'SLN0000.01.01', '码表记录状态', 't_sysdict_ct_record_status', 'SLN0000.01', '码表记录的状态', 'MBJLZT'),
('53965D61-60AF-11EC-A41B-E86A641ED142', 'SLN0000.01.02', '码表字段编辑器类型', 't_sysdict_ct_editor_xtype', 'SLN0000.01', '码表字段编辑器的类型', 'MBZDBJQLX'),
('5DAC23B4-60AF-11EC-A41B-E86A641ED142', 'SLN0000.02.01', '表单字段编辑器类型', 't_sysdict_form_editor_xtype', 'SLN0000.02', '表单字段编辑器的类型', 'BDZDBJQLX'),
('68BE0DF3-60AF-11EC-A41B-E86A641ED142', 'SLN0000.03.01', '视图xtype', 't_sysdict_fv_xtype', 'SLN0000.03', '视图的组件类型(xtype)', 'STXTYPE'),
('6C5F4D19-8952-11EC-9791-E86A641ED142', 'SLN0000.05.01', '主菜单导航', 't_sysdict_mainmenu_nav', 'SLN0000.05', '主菜单导航 - 主菜单中单击模块后跳转的URL', 'ZCDDH'),
('5E538B96-8973-11EC-9791-E86A641ED142', 'SLN0000.05.02', '实施指南导航', 't_sysdict_help_nav', 'SLN0000.05', '实施指南导航 - 模块中单击指南按钮后跳转的URL', 'SSZNDH');

TRUNCATE TABLE `t_sysdict_ct_record_status`;
INSERT INTO `t_sysdict_ct_record_status` (`id`, `code`, `code_int`, `name`, `py`, `memo`, `show_order`) VALUES
('9B90C56E-696E-11E9-B2BF-782BCBD7746B', '1000', 1000, '启用', 'QY', '记录处于启用状态', 1),
('AC7F3FAB-696E-11E9-B2BF-782BCBD7746B', '0', 0, '停用', 'TY', '记录处于停用状态', 2);

TRUNCATE TABLE `t_sysdict_ct_editor_xtype`;
INSERT INTO `t_sysdict_ct_editor_xtype` (`id`, `code`, `code_int`, `name`, `py`, `memo`, `show_order`) VALUES
('5104A62E-9F97-11E9-9BDF-F0BF9790E21F', '1', 1, 'textfield', 'textfield', '字符串编辑器', 1),
('7B795BEF-9F97-11E9-9BDF-F0BF9790E21F', '2', 2, 'numberfield', 'numberfield', '数值编辑器', 2),
('FD1F4CF4-9F97-11E9-9BDF-F0BF9790E21F', '3', 3, 'psi_codetable_parentidfield', 'psi_codetable_parentidfield', '上级记录编辑器', 3),
('9929B6FA-AD1A-11E9-B2D3-F0BF9790E21F', '4', 4, 'psi_codetable_recordreffield', 'psi_codetable_recordreffield', '码表记录引用字段编辑器', 4),
('D5A2BB45-F42F-11EA-843F-E86A641ED142', '5', 5, 'datefield', 'datefield', '日期编辑器', 5);

TRUNCATE TABLE `t_sysdict_form_editor_xtype`;
INSERT INTO `t_sysdict_form_editor_xtype` (`id`, `code`, `code_int`, `name`, `py`, `memo`, `show_order`) VALUES
('133BC834-62A4-11EA-BE39-F0BF9790E21F', '1', 1, 'textfield', 'textfield', '字符字段编辑器', 1),
('2E01A0A4-62A4-11EA-BE39-F0BF9790E21F', '2', 2, 'numberfield', 'numberfield', '数值字段编辑器', 2),
('28D248CD-843D-11EA-8C00-E86A641ED142', '3', 3, 'datefield', 'datefield', '日期字段编辑器', 3),
('BF6F569E-843D-11EA-8C00-E86A641ED142', '4', 4, 'displayfield', 'displayfield', '不使用编辑器', 4),
('CD0B859B-843D-11EA-8C00-E86A641ED142', '5', 5, 'psi_userfield', 'psi_userfield', '用户字段编辑器', 5);

TRUNCATE TABLE `t_sysdict_fv_xtype`;
INSERT INTO `t_sysdict_fv_xtype` (`id`, `code`, `code_int`, `name`, `py`, `memo`, `show_order`) VALUES
('7E444093-97CF-11EA-8BF1-E86A641ED142', '-1', -1, 'panel', 'panel', '占位容器', -1),
('882978F6-90CA-11EA-B303-E86A641ED142', '1', 1, 'psi_codetable_view_cmp', 'psi_codetable_view_cmp', '数据来自码表的视图', 1);

# 主菜单导航
TRUNCATE TABLE `t_sysdict_mainmenu_nav`;
INSERT INTO `t_sysdict_mainmenu_nav` (`id`, `code`, `code_int`, `name`, `py`, `memo`, `show_order`) VALUES
('-9996', '-9996', -9996, '/Home/User/changeMyPassword', '', '修改我的密码', 1),
('-9994', '-9994', -9994, '/Home/About', '', '关于', 2),
('-8999', '-8999', -8999, '/Home/User', '', '用户管理', 3),
('-8997', '-8997', -8997, '/Home/Bizlog', '', '业务日志', 4),
('-8996', '-8996', -8996, '/Home/Permission', '', '权限管理', 5),
('-7999', '-7999', -7999, '/Home/Form', '', '自定义表单', 6),
('-7997', '-7997', -7997, '/Home/FormView', '', '视图开发助手', 7),
('-7996', '-7996', -7996, '/Home/CodeTable', '', '码表设置', 8),
('-7995', '-7995', -7995, '/Home/MainMenu/maintainIndex', '', '主菜单维护', 9),
('-7994', '-7994', -7994, '/Home/SysDict', '', '系统数据字典', 10),
('-6000', '-6000', -6000, '/Home/Solution', '', '解决方案', 11)
;

# 实施指南导航
TRUNCATE TABLE `t_sysdict_help_nav`;
INSERT INTO `t_sysdict_help_nav` (`id`, `code`, `code_int`, `name`, `py`, `memo`, `show_order`) VALUES
('login', 'login', 1, '/help/user/10.html', '', '', 1),
('user', 'user', 2, '/help/admin/02-01.html', '', '访问实施指南页面：用户管理', 2),
('permission', 'permission', 5, '/help/admin/02-02.html', '', '访问实施指南页面：权限管理', 5),
('bizlog', 'bizlog', 6, '/help/admin/03.html', '', '访问实施指南页面：业务日志', 6),
('dataOrg', 'dataOrg', 22, '/help/admin/05.html', '', '访问实施指南页面：数据域应用详解', 22),
('commBill', 'commBill', 23, '/help/user/00.html', '', '访问实施指南页面：表单通用操作', 23),
('mainMenuMaintain', 'mainMenuMaintain', 30, '/help/dev/lcap/08-01.html', '', '访问实施指南页面：主菜单维护', 30),
('sysdict', 'sysdict', 31, '/help/dev/lcap/08-02.html', '', '访问实施指南页面：系统数据字典', 31),
('codetable', 'codetable', 32, '/help/dev/lcap/08-03.html', '', '访问实施指南页面：码表设置', 32),
('form', 'form', 33, '/help/dev/lcap/08-06.html', '', '访问实施指南页面：自定义表单', 33),
('formview', 'formview', 34, '/help/dev/lcap/08-04.html', '', '访问实施指南页面：视图开发助手', 34),
('solution', 'solution', 35, '/help/dev/lcap/08-05.html', '', '访问实施指南页面：解决方案', 35),
('fromShortcut', 'fromShortcut', 36, '/help/index.html', '', '通过快捷访问进入实施指南页面', 36)
;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;