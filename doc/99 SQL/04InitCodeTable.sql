SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

# 码表分类
DELETE FROM `t_code_table_category` where `id` = 'F9D80BD6-8519-11EA-B071-E86A641ED142';
INSERT INTO `t_code_table_category` (`id`, `code`, `name`, `parent_id`, `is_system`) VALUES
('F9D80BD6-8519-11EA-B071-E86A641ED142', 'PSI-0001', '用户', NULL, 1);
DELETE FROM `t_code_table_category` where `id` = '58BF84A3-8517-11EA-B071-E86A641ED142';
INSERT INTO `t_code_table_category` (`id`, `code`, `name`, `parent_id`, `is_system`) VALUES
('58BF84A3-8517-11EA-B071-E86A641ED142', 'PSI-0002', '物料', NULL, 1);
DELETE FROM `t_code_table_category` where `id` = '05717096-851A-11EA-B071-E86A641ED142';
INSERT INTO `t_code_table_category` (`id`, `code`, `name`, `parent_id`, `is_system`) VALUES
('05717096-851A-11EA-B071-E86A641ED142', 'PSI-0003', '仓库', NULL, 1);
DELETE FROM `t_code_table_category` where `id` = '0F8C175C-851A-11EA-B071-E86A641ED142';
INSERT INTO `t_code_table_category` (`id`, `code`, `name`, `parent_id`, `is_system`) VALUES
('0F8C175C-851A-11EA-B071-E86A641ED142', 'PSI-0004', '供应商', NULL, 1);
DELETE FROM `t_code_table_category` where `id` = '19DFD9E7-851A-11EA-B071-E86A641ED142';
INSERT INTO `t_code_table_category` (`id`, `code`, `name`, `parent_id`, `is_system`) VALUES
('19DFD9E7-851A-11EA-B071-E86A641ED142', 'PSI-0005', '客户', NULL, 1);
DELETE FROM `t_code_table_category` where `id` = '2FCB8D75-851A-11EA-B071-E86A641ED142';
INSERT INTO `t_code_table_category` (`id`, `code`, `name`, `parent_id`, `is_system`) VALUES
('2FCB8D75-851A-11EA-B071-E86A641ED142', 'PSI-0006', '工厂', NULL, 1);

# 码表: t_org
DELETE FROM `t_code_table_md` where `id` = 'AFB52688-851E-11EA-B071-E86A641ED142';
DELETE FROM `t_code_table_cols_md` where `table_id` = 'AFB52688-851E-11EA-B071-E86A641ED142' and `sys_col` = 1;
INSERT INTO `t_code_table_md` (`id`, `code`, `name`, `table_name`, `category_id`, `memo`, `py`, `fid`, `md_version`, `is_fixed`, `enable_parent_id`, `handler_class_name`) VALUES
('AFB52688-851E-11EA-B071-E86A641ED142', 'PSI-0001-01', '组织机构', 't_org', 'F9D80BD6-8519-11EA-B071-E86A641ED142', '', '', '', 1, 1, 1, '');
INSERT INTO `t_code_table_cols_md` (`id`, `table_id`, `caption`, `db_field_name`, `db_field_type`, `db_field_length`, `db_field_decimal`, `show_order`, `value_from`, `value_from_table_name`, `value_from_col_name`, `value_from_col_name_display`, `must_input`, `sys_col`, `is_visible`, `width_in_view`, `note`, `show_order_in_view`, `editor_xtype`) VALUES
('AFB552D4-851E-11EA-B071-E86A641ED142', 'AFB52688-851E-11EA-B071-E86A641ED142', 'id', 'id', 'varchar', 255, 0, -1000, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('AFB57C6D-851E-11EA-B071-E86A641ED142', 'AFB52688-851E-11EA-B071-E86A641ED142', '编码', 'code', 'varchar', 255, 0, 0, 1, '', '', '', 2, 1, 1, 120, NULL, 0, 'textfield'),
('AFB58EDB-851E-11EA-B071-E86A641ED142', 'AFB52688-851E-11EA-B071-E86A641ED142', '名称', 'name', 'varchar', 255, 0, 1, 1, '', '', '', 2, 1, 1, 200, NULL, 1, 'textfield'),
('AFB5A12F-851E-11EA-B071-E86A641ED142', 'AFB52688-851E-11EA-B071-E86A641ED142', '拼音字头', 'py', 'varchar', 255, 0, -900, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('AFB5B1D0-851E-11EA-B071-E86A641ED142', 'AFB52688-851E-11EA-B071-E86A641ED142', '数据域', 'data_org', 'varchar', 255, 0, -800, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('AFB5C1E8-851E-11EA-B071-E86A641ED142', 'AFB52688-851E-11EA-B071-E86A641ED142', '公司id', 'company_id', 'varchar', 255, 0, -700, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('AFB5D22F-851E-11EA-B071-E86A641ED142', 'AFB52688-851E-11EA-B071-E86A641ED142', '记录创建时间', 'date_created', 'datetime', 0, 0, -699, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('AFB5E0A0-851E-11EA-B071-E86A641ED142', 'AFB52688-851E-11EA-B071-E86A641ED142', '记录创建人id', 'create_user_id', 'varchar', 255, 0, -698, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('AFB5EEA3-851E-11EA-B071-E86A641ED142', 'AFB52688-851E-11EA-B071-E86A641ED142', '最后一次编辑时间', 'update_dt', 'datetime', 0, 0, -697, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('AFB5FCDA-851E-11EA-B071-E86A641ED142', 'AFB52688-851E-11EA-B071-E86A641ED142', '最后一次编辑人id', 'update_user_id', 'varchar', 255, 0, -696, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('AFB60A25-851E-11EA-B071-E86A641ED142', 'AFB52688-851E-11EA-B071-E86A641ED142', '状态', 'record_status', 'int', 11, 0, 2, 2, 't_sysdict_record_status', 'code_int', 'name', 2, 1, 1, 80, NULL, 2, 'textfield'),
('AFB617D7-851E-11EA-B071-E86A641ED142', 'AFB52688-851E-11EA-B071-E86A641ED142', '上级', 'parent_id', 'varchar', 255, 0, 4, 4, 't_org', 'id', 'full_name', 0, 1, 1, 0, NULL, -1000, 'psi_codetable_parentidfield'),
('AFB625A6-851E-11EA-B071-E86A641ED142', 'AFB52688-851E-11EA-B071-E86A641ED142', '全名', 'full_name', 'varchar', 1000, 0, -1000, 5, '', '', '', 0, 1, 2, 300, NULL, 3, 'textfield');

# 码表: t_user
DELETE FROM `t_code_table_md` where `id` = '1C7AE1C9-85CC-11EA-A819-E86A641ED142';
DELETE FROM `t_code_table_cols_md` where `table_id` = '1C7AE1C9-85CC-11EA-A819-E86A641ED142' and `sys_col` = 1;
INSERT INTO `t_code_table_md` (`id`, `code`, `name`, `table_name`, `category_id`, `memo`, `py`, `fid`, `md_version`, `is_fixed`, `enable_parent_id`, `handler_class_name`) VALUES
('1C7AE1C9-85CC-11EA-A819-E86A641ED142', 'PSI-0001-02', '用户', 't_user', 'F9D80BD6-8519-11EA-B071-E86A641ED142', '', '', '', 1, 1, 0, '');
INSERT INTO `t_code_table_cols_md` (`id`, `table_id`, `caption`, `db_field_name`, `db_field_type`, `db_field_length`, `db_field_decimal`, `show_order`, `value_from`, `value_from_table_name`, `value_from_col_name`, `value_from_col_name_display`, `must_input`, `sys_col`, `is_visible`, `width_in_view`, `note`, `show_order_in_view`, `editor_xtype`) VALUES
('1C7B14AE-85CC-11EA-A819-E86A641ED142', '1C7AE1C9-85CC-11EA-A819-E86A641ED142', 'id', 'id', 'varchar', 255, 0, -1000, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('1C7B3E91-85CC-11EA-A819-E86A641ED142', '1C7AE1C9-85CC-11EA-A819-E86A641ED142', '编码', 'code', 'varchar', 255, 0, 0, 1, '', '', '', 2, 1, 1, 120, NULL, 0, 'textfield'),
('1C7B5BB4-85CC-11EA-A819-E86A641ED142', '1C7AE1C9-85CC-11EA-A819-E86A641ED142', '名称', 'name', 'varchar', 255, 0, 1, 1, '', '', '', 2, 1, 1, 200, NULL, 1, 'textfield'),
('1C7B791B-85CC-11EA-A819-E86A641ED142', '1C7AE1C9-85CC-11EA-A819-E86A641ED142', '拼音字头', 'py', 'varchar', 255, 0, -900, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('1C7BA8A5-85CC-11EA-A819-E86A641ED142', '1C7AE1C9-85CC-11EA-A819-E86A641ED142', '数据域', 'data_org', 'varchar', 255, 0, -800, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('1C7BC667-85CC-11EA-A819-E86A641ED142', '1C7AE1C9-85CC-11EA-A819-E86A641ED142', '公司id', 'company_id', 'varchar', 255, 0, -700, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('1C7BDDD5-85CC-11EA-A819-E86A641ED142', '1C7AE1C9-85CC-11EA-A819-E86A641ED142', '记录创建时间', 'date_created', 'datetime', 0, 0, -699, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('1C7BF3A3-85CC-11EA-A819-E86A641ED142', '1C7AE1C9-85CC-11EA-A819-E86A641ED142', '记录创建人id', 'create_user_id', 'varchar', 255, 0, -698, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('1C7C092C-85CC-11EA-A819-E86A641ED142', '1C7AE1C9-85CC-11EA-A819-E86A641ED142', '最后一次编辑时间', 'update_dt', 'datetime', 0, 0, -697, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('1C7C1E35-85CC-11EA-A819-E86A641ED142', '1C7AE1C9-85CC-11EA-A819-E86A641ED142', '最后一次编辑人id', 'update_user_id', 'varchar', 255, 0, -696, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('1C7C3324-85CC-11EA-A819-E86A641ED142', '1C7AE1C9-85CC-11EA-A819-E86A641ED142', '状态', 'record_status', 'int', 11, 0, 2, 2, 't_sysdict_record_status', 'code_int', 'name', 2, 1, 1, 80, NULL, 2, 'textfield');

#码表：t_warehouse
DELETE FROM `t_code_table_md` where `id` = '49F3F27F-8607-11EA-A0E2-E86A641ED142';
DELETE FROM `t_code_table_cols_md` where `table_id` = '49F3F27F-8607-11EA-A0E2-E86A641ED142' and `sys_col` = 1;
INSERT INTO `t_code_table_md` (`id`, `code`, `name`, `table_name`, `category_id`, `memo`, `py`, `fid`, `md_version`, `is_fixed`, `enable_parent_id`, `handler_class_name`) VALUES
('49F3F27F-8607-11EA-A0E2-E86A641ED142', 'PSI-0003-01', '仓库', 't_warehouse', '05717096-851A-11EA-B071-E86A641ED142', '', '', '', 1, 1, 0, '');
INSERT INTO `t_code_table_cols_md` (`id`, `table_id`, `caption`, `db_field_name`, `db_field_type`, `db_field_length`, `db_field_decimal`, `show_order`, `value_from`, `value_from_table_name`, `value_from_col_name`, `value_from_col_name_display`, `must_input`, `sys_col`, `is_visible`, `width_in_view`, `note`, `show_order_in_view`, `editor_xtype`) VALUES
('49F42B5E-8607-11EA-A0E2-E86A641ED142', '49F3F27F-8607-11EA-A0E2-E86A641ED142', 'id', 'id', 'varchar', 255, 0, -1000, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('49F43F2A-8607-11EA-A0E2-E86A641ED142', '49F3F27F-8607-11EA-A0E2-E86A641ED142', '编码', 'code', 'varchar', 255, 0, 0, 1, '', '', '', 2, 1, 1, 120, NULL, 0, 'textfield'),
('49F44FFE-8607-11EA-A0E2-E86A641ED142', '49F3F27F-8607-11EA-A0E2-E86A641ED142', '名称', 'name', 'varchar', 255, 0, 1, 1, '', '', '', 2, 1, 1, 200, NULL, 1, 'textfield'),
('49F45D67-8607-11EA-A0E2-E86A641ED142', '49F3F27F-8607-11EA-A0E2-E86A641ED142', '拼音字头', 'py', 'varchar', 255, 0, -900, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('49F46C4D-8607-11EA-A0E2-E86A641ED142', '49F3F27F-8607-11EA-A0E2-E86A641ED142', '数据域', 'data_org', 'varchar', 255, 0, -800, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('49F47EF1-8607-11EA-A0E2-E86A641ED142', '49F3F27F-8607-11EA-A0E2-E86A641ED142', '公司id', 'company_id', 'varchar', 255, 0, -700, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('49F48D39-8607-11EA-A0E2-E86A641ED142', '49F3F27F-8607-11EA-A0E2-E86A641ED142', '记录创建时间', 'date_created', 'datetime', 0, 0, -699, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('49F49D88-8607-11EA-A0E2-E86A641ED142', '49F3F27F-8607-11EA-A0E2-E86A641ED142', '记录创建人id', 'create_user_id', 'varchar', 255, 0, -698, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('49F4AB83-8607-11EA-A0E2-E86A641ED142', '49F3F27F-8607-11EA-A0E2-E86A641ED142', '最后一次编辑时间', 'update_dt', 'datetime', 0, 0, -697, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('49F4B946-8607-11EA-A0E2-E86A641ED142', '49F3F27F-8607-11EA-A0E2-E86A641ED142', '最后一次编辑人id', 'update_user_id', 'varchar', 255, 0, -696, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('49F4C69A-8607-11EA-A0E2-E86A641ED142', '49F3F27F-8607-11EA-A0E2-E86A641ED142', '状态', 'record_status', 'int', 11, 0, 2, 2, 't_sysdict_record_status', 'code_int', 'name', 2, 1, 1, 80, NULL, 2, 'textfield');

#码表：t_goods_category
DELETE FROM `t_code_table_md` where `id` = 'C68DBABE-860B-11EA-A0E2-E86A641ED142';
DELETE FROM `t_code_table_cols_md` where `table_id` = 'C68DBABE-860B-11EA-A0E2-E86A641ED142' and `sys_col` = 1;
INSERT INTO `t_code_table_md` (`id`, `code`, `name`, `table_name`, `category_id`, `memo`, `py`, `fid`, `md_version`, `is_fixed`, `enable_parent_id`, `handler_class_name`) VALUES
('C68DBABE-860B-11EA-A0E2-E86A641ED142', 'PSI-0002-01', '物料分类', 't_goods_category', '58BF84A3-8517-11EA-B071-E86A641ED142', '', '', '', 1, 1, 1, '');
INSERT INTO `t_code_table_cols_md` (`id`, `table_id`, `caption`, `db_field_name`, `db_field_type`, `db_field_length`, `db_field_decimal`, `show_order`, `value_from`, `value_from_table_name`, `value_from_col_name`, `value_from_col_name_display`, `must_input`, `sys_col`, `is_visible`, `width_in_view`, `note`, `show_order_in_view`, `editor_xtype`) VALUES
('C68F8441-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', 'id', 'id', 'varchar', 255, 0, -1000, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('C68F9A48-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', '编码', 'code', 'varchar', 255, 0, 0, 1, '', '', '', 2, 1, 1, 120, NULL, 0, 'textfield'),
('C68FAABB-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', '名称', 'name', 'varchar', 255, 0, 1, 1, '', '', '', 2, 1, 1, 200, NULL, 1, 'textfield'),
('C68FB980-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', '拼音字头', 'py', 'varchar', 255, 0, -900, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('C68FC83A-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', '数据域', 'data_org', 'varchar', 255, 0, -800, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('C68FD533-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', '公司id', 'company_id', 'varchar', 255, 0, -700, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('C68FE37E-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', '记录创建时间', 'date_created', 'datetime', 0, 0, -699, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('C68FF17F-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', '记录创建人id', 'create_user_id', 'varchar', 255, 0, -698, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('C68FFCCA-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', '最后一次编辑时间', 'update_dt', 'datetime', 0, 0, -697, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('C69009F3-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', '最后一次编辑人id', 'update_user_id', 'varchar', 255, 0, -696, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('C6901758-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', '状态', 'record_status', 'int', 11, 0, 2, 2, 't_sysdict_record_status', 'code_int', 'name', 2, 1, 1, 80, NULL, 2, 'textfield'),
('C69022E3-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', '上级', 'parent_id', 'varchar', 255, 0, 4, 4, 't_goods_category', 'id', 'full_name', 0, 1, 1, 0, NULL, -1000, 'psi_codetable_parentidfield'),
('C6902FD8-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', '全名', 'full_name', 'varchar', 1000, 0, -1000, 5, '', '', '', 0, 1, 2, 300, NULL, 3, 'textfield'),
('F04C6359-860B-11EA-A0E2-E86A641ED142', 'C68DBABE-860B-11EA-A0E2-E86A641ED142', '税率', 'tax_rate', 'decimal', 19, 2, 8, 1, '', '', '', 1, 1, 1, 120, '', 8, 'numberfield');


# 码表：t_goods_unit
DELETE FROM `t_code_table_md` where `id` = '8BD2B19E-8623-11EA-B463-E86A641ED142';
DELETE FROM `t_code_table_cols_md` where `table_id` = '8BD2B19E-8623-11EA-B463-E86A641ED142' and `sys_col` = 1;
INSERT INTO `t_code_table_md` (`id`, `code`, `name`, `table_name`, `category_id`, `memo`, `py`, `fid`, `md_version`, `is_fixed`, `enable_parent_id`, `handler_class_name`) VALUES
('8BD2B19E-8623-11EA-B463-E86A641ED142', 'PSI-0002-02', '物料计量单位', 't_goods_unit', '58BF84A3-8517-11EA-B071-E86A641ED142', '', '', '', 1, 1, 0, '');
INSERT INTO `t_code_table_cols_md` (`id`, `table_id`, `caption`, `db_field_name`, `db_field_type`, `db_field_length`, `db_field_decimal`, `show_order`, `value_from`, `value_from_table_name`, `value_from_col_name`, `value_from_col_name_display`, `must_input`, `sys_col`, `is_visible`, `width_in_view`, `note`, `show_order_in_view`, `editor_xtype`) VALUES
('8BD477BD-8623-11EA-B463-E86A641ED142', '8BD2B19E-8623-11EA-B463-E86A641ED142', 'id', 'id', 'varchar', 255, 0, -1000, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('8BD49349-8623-11EA-B463-E86A641ED142', '8BD2B19E-8623-11EA-B463-E86A641ED142', '编码', 'code', 'varchar', 255, 0, 0, 1, '', '', '', 2, 1, 1, 120, NULL, 0, 'textfield'),
('8BD4A5B2-8623-11EA-B463-E86A641ED142', '8BD2B19E-8623-11EA-B463-E86A641ED142', '名称', 'name', 'varchar', 255, 0, 1, 1, '', '', '', 2, 1, 1, 200, NULL, 1, 'textfield'),
('8BD4B6D7-8623-11EA-B463-E86A641ED142', '8BD2B19E-8623-11EA-B463-E86A641ED142', '拼音字头', 'py', 'varchar', 255, 0, -900, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('8BD4C711-8623-11EA-B463-E86A641ED142', '8BD2B19E-8623-11EA-B463-E86A641ED142', '数据域', 'data_org', 'varchar', 255, 0, -800, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('8BD4D4AF-8623-11EA-B463-E86A641ED142', '8BD2B19E-8623-11EA-B463-E86A641ED142', '公司id', 'company_id', 'varchar', 255, 0, -700, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('8BD4E2A3-8623-11EA-B463-E86A641ED142', '8BD2B19E-8623-11EA-B463-E86A641ED142', '记录创建时间', 'date_created', 'datetime', 0, 0, -699, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('8BD4EFF4-8623-11EA-B463-E86A641ED142', '8BD2B19E-8623-11EA-B463-E86A641ED142', '记录创建人id', 'create_user_id', 'varchar', 255, 0, -698, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('8BD4FEA4-8623-11EA-B463-E86A641ED142', '8BD2B19E-8623-11EA-B463-E86A641ED142', '最后一次编辑时间', 'update_dt', 'datetime', 0, 0, -697, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('8BD50B33-8623-11EA-B463-E86A641ED142', '8BD2B19E-8623-11EA-B463-E86A641ED142', '最后一次编辑人id', 'update_user_id', 'varchar', 255, 0, -696, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('8BD5173E-8623-11EA-B463-E86A641ED142', '8BD2B19E-8623-11EA-B463-E86A641ED142', '状态', 'record_status', 'int', 11, 0, 2, 2, 't_sysdict_record_status', 'code_int', 'name', 2, 1, 1, 80, NULL, 2, 'textfield');

#码表：t_goods_brand
DELETE FROM `t_code_table_md` where `id` = 'D7D9D328-8834-11EA-8C36-E86A641ED142';
DELETE FROM `t_code_table_cols_md` where `table_id` = 'D7D9D328-8834-11EA-8C36-E86A641ED142' and `sys_col` = 1;
INSERT INTO `t_code_table_md` (`id`, `code`, `name`, `table_name`, `category_id`, `memo`, `py`, `fid`, `md_version`, `is_fixed`, `enable_parent_id`, `handler_class_name`) VALUES
('D7D9D328-8834-11EA-8C36-E86A641ED142', 'PSI-0002-03', '物料品牌', 't_goods_brand', '58BF84A3-8517-11EA-B071-E86A641ED142', '', '', '', 1, 1, 1, '');
INSERT INTO `t_code_table_cols_md` (`id`, `table_id`, `caption`, `db_field_name`, `db_field_type`, `db_field_length`, `db_field_decimal`, `show_order`, `value_from`, `value_from_table_name`, `value_from_col_name`, `value_from_col_name_display`, `must_input`, `sys_col`, `is_visible`, `width_in_view`, `note`, `show_order_in_view`, `editor_xtype`) VALUES
('D7DA0F07-8834-11EA-8C36-E86A641ED142', 'D7D9D328-8834-11EA-8C36-E86A641ED142', 'id', 'id', 'varchar', 255, 0, -1000, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('D7DA2831-8834-11EA-8C36-E86A641ED142', 'D7D9D328-8834-11EA-8C36-E86A641ED142', '编码', 'code', 'varchar', 255, 0, 0, 1, '', '', '', 2, 1, 1, 120, NULL, 0, 'textfield'),
('D7DA38C1-8834-11EA-8C36-E86A641ED142', 'D7D9D328-8834-11EA-8C36-E86A641ED142', '名称', 'name', 'varchar', 255, 0, 1, 1, '', '', '', 2, 1, 1, 200, NULL, 1, 'textfield'),
('D7DA46DE-8834-11EA-8C36-E86A641ED142', 'D7D9D328-8834-11EA-8C36-E86A641ED142', '拼音字头', 'py', 'varchar', 255, 0, -900, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('D7DA5596-8834-11EA-8C36-E86A641ED142', 'D7D9D328-8834-11EA-8C36-E86A641ED142', '数据域', 'data_org', 'varchar', 255, 0, -800, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('D7DA6187-8834-11EA-8C36-E86A641ED142', 'D7D9D328-8834-11EA-8C36-E86A641ED142', '公司id', 'company_id', 'varchar', 255, 0, -700, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('D7DA6ED9-8834-11EA-8C36-E86A641ED142', 'D7D9D328-8834-11EA-8C36-E86A641ED142', '记录创建时间', 'date_created', 'datetime', 0, 0, -699, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('D7DA7DA5-8834-11EA-8C36-E86A641ED142', 'D7D9D328-8834-11EA-8C36-E86A641ED142', '记录创建人id', 'create_user_id', 'varchar', 255, 0, -698, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('D7DA8BEF-8834-11EA-8C36-E86A641ED142', 'D7D9D328-8834-11EA-8C36-E86A641ED142', '最后一次编辑时间', 'update_dt', 'datetime', 0, 0, -697, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('D7DA9B13-8834-11EA-8C36-E86A641ED142', 'D7D9D328-8834-11EA-8C36-E86A641ED142', '最后一次编辑人id', 'update_user_id', 'varchar', 255, 0, -696, 1, '', '', '', 1, 1, 2, 0, NULL, -1000, 'textfield'),
('D7DAA800-8834-11EA-8C36-E86A641ED142', 'D7D9D328-8834-11EA-8C36-E86A641ED142', '状态', 'record_status', 'int', 11, 0, 2, 2, 't_sysdict_record_status', 'code_int', 'name', 2, 1, 1, 80, NULL, 2, 'textfield'),
('D7DAB56C-8834-11EA-8C36-E86A641ED142', 'D7D9D328-8834-11EA-8C36-E86A641ED142', '上级', 'parent_id', 'varchar', 255, 0, 4, 4, 't_goods_brand', 'id', 'full_name', 0, 1, 1, 0, NULL, -1000, 'psi_codetable_parentidfield'),
('D7DAC2CD-8834-11EA-8C36-E86A641ED142', 'D7D9D328-8834-11EA-8C36-E86A641ED142', '全名', 'full_name', 'varchar', 1000, 0, -1000, 5, '', '', '', 0, 1, 2, 300, NULL, 3, 'textfield');


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
