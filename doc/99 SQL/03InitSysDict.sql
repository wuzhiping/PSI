SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

TRUNCATE TABLE `t_dict_table_category`;
INSERT INTO `t_dict_table_category` (`id`, `code`, `name`, `parent_id`) VALUES
('01', '01', '码表', NULL),
('02', '02', '自定义表单', NULL),
('03', '03', '视图', NULL),
('10', '10', '基础数据', NULL);

TRUNCATE TABLE `t_dict_table_md`;
INSERT INTO `t_dict_table_md` (`id`, `code`, `name`, `table_name`, `category_id`, `memo`, `py`) VALUES
('0101', '0101', '码表记录状态', 't_sysdict_record_status', '01', '码表记录的状态', 'MBJLZT'),
('0102', '0102', '码表字段编辑器类型', 't_sysdict_editor_xtype', '01', '码表字段编辑器的类型', 'MBZDBJQLX'),
('0201', '0201', '表单字段编辑器类型', 't_sysdict_form_editor_xtype', '02', '表单字段编辑器的类型', 'BDZDBJQLX'),
('0301', '0301', '视图xtype', 't_sysdict_fv_xtype', '03', '视图的组件类型(xtype)', 'STXTYPE'),
('1001', '1001', '税率', 't_sysdict_tax_rate', '10', '', 'SL'),
('1002', '1002', '组织机构性质', 't_sysdict_org_type', '10', '', 'ZZJGXZ'),
('1003', '1003', '性别', 't_sysdict_gender', '10', '', 'XB');

TRUNCATE TABLE `t_sysdict_record_status`;
INSERT INTO `t_sysdict_record_status` (`id`, `code`, `code_int`, `name`, `py`, `memo`, `show_order`) VALUES
('9B90C56E-696E-11E9-B2BF-782BCBD7746B', '1000', 1000, '启用', 'QY', '记录处于启用状态', 1),
('AC7F3FAB-696E-11E9-B2BF-782BCBD7746B', '0', 0, '停用', 'TY', '记录处于停用状态', 2);

TRUNCATE TABLE `t_sysdict_editor_xtype`;
INSERT INTO `t_sysdict_editor_xtype` (`id`, `code`, `code_int`, `name`, `py`, `memo`, `show_order`) VALUES
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

TRUNCATE TABLE `t_sysdict_tax_rate`;
INSERT INTO `t_sysdict_tax_rate` (`id`, `code`, `code_int`, `name`, `py`, `memo`, `show_order`) VALUES
('F2AEB999-8869-11EA-B3D2-E86A641ED142', '-1', -1, '[不设定]', '', '', -1),
('118BF94A-886A-11EA-B3D2-E86A641ED142', '0', 0, '0%', '', '', 0),
('1C249830-886A-11EA-B3D2-E86A641ED142', '1', 1, '1%', '', '', 1),
('24A26BFF-886A-11EA-B3D2-E86A641ED142', '2', 2, '2%', '', '', 2),
('2D865B3E-886A-11EA-B3D2-E86A641ED142', '3', 3, '3%', '', '', 3),
('386B7BDB-886A-11EA-B3D2-E86A641ED142', '4', 4, '4%', '', '', 4),
('43387B7C-886A-11EA-B3D2-E86A641ED142', '5', 5, '5%', '', '', 5),
('4B158D04-886A-11EA-B3D2-E86A641ED142', '6', 6, '6%', '', '', 6),
('56D55F4C-886A-11EA-B3D2-E86A641ED142', '7', 7, '7%', '', '', 7),
('61EA46D7-886A-11EA-B3D2-E86A641ED142', '8', 8, '8%', '', '', 8),
('6D4CDDB1-886A-11EA-B3D2-E86A641ED142', '9', 9, '9%', '', '', 9),
('77AA107A-886A-11EA-B3D2-E86A641ED142', '10', 10, '10%', '', '', 10),
('80D5BB11-886A-11EA-B3D2-E86A641ED142', '11', 11, '11%', '', '', 11),
('8DFEA286-886A-11EA-B3D2-E86A641ED142', '12', 12, '12%', '', '', 12),
('9A016A14-886A-11EA-B3D2-E86A641ED142', '13', 13, '13%', '', '', 13),
('A50DD214-886A-11EA-B3D2-E86A641ED142', '14', 14, '14%', '', '', 14),
('AF2AFC03-886A-11EA-B3D2-E86A641ED142', '15', 15, '15%', '', '', 15),
('B8DC0446-886A-11EA-B3D2-E86A641ED142', '16', 16, '16%', '', '', 16),
('C19955AE-886A-11EA-B3D2-E86A641ED142', '17', 17, '17%', '', '', 17);

TRUNCATE TABLE `t_sysdict_org_type`;
INSERT INTO `t_sysdict_org_type` (`id`, `code`, `code_int`, `name`, `py`, `memo`, `show_order`) VALUES
('C91F7A42-DD09-11EA-A9A2-E86A641ED142', '400', 400, '事业部', 'SYB', '', 1),
('DB073620-DD09-11EA-A9A2-E86A641ED142', '500', 500, '门店', 'MD', '', 2),
('EBBAA708-DD09-11EA-A9A2-E86A641ED142', '600', 600, '内部物流组织机构', 'NBWLZZJG', '', 3),
('F936FAF8-DD09-11EA-A9A2-E86A641ED142', '700', 700, '办事处', 'BSC', '', 4),
('04A8060B-DD0A-11EA-A9A2-E86A641ED142', '2000', 2000, '客户', 'KH', '', 5),
('0EB8EB09-DD0A-11EA-A9A2-E86A641ED142', '3000', 3000, '供应商', 'GYS', '', 6),
('1896898C-DD0A-11EA-A9A2-E86A641ED142', '4000', 4000, '外协工厂', 'WXGC', '', 7),
('23710854-DD0A-11EA-A9A2-E86A641ED142', '5000', 5000, '外部物流商', 'WBWLS', '', 8);

TRUNCATE TABLE `t_sysdict_gender`;
INSERT INTO `t_sysdict_gender` (`id`, `code`, `code_int`, `name`, `py`, `memo`, `show_order`) VALUES
('310B0398-FA19-11EA-AAA9-E86A641ED142', '1', 1, '男', '', '', 1),
('3BDA20B2-FA19-11EA-AAA9-E86A641ED142', '2', 2, '女', '', '', 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
