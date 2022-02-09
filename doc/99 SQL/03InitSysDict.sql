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
('6C5F4D19-8952-11EC-9791-E86A641ED142', 'SLN0000.05.01', '主菜单导航', 't_sysdict_mainmenu_nav', 'SLN0000.05', '主菜单导航', 'ZCDDH');

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
('-9994', '-9994', -9994, '/Home/About/index', '', '关于', 1),
('-9996', '-9996', -9996, '/Home/User/changeMyPassword', '', '修改我的密码', 2),
('-8999', '-8999', -8999, '/Home/User', '', '用户管理', 3),
('-8996', '-8996', -8996, '/Home/Permission', '', '权限管理', 4),
('-8997', '-8997', -8997, '/Home/Bizlog', '', '业务日志', 5)
;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
