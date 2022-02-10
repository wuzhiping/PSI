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
('1001', '1001', 1001, '/Home/Goods', '', '物料', 6),
('1002', '1002', 1002, '/Home/Goods/unitIndex', '', '物料计量单位', 7),
('1003', '1003', 1003, '/Home/Warehouse', '', '仓库', 8),
('1004', '1004', 1004, '/Home/Supplier', '', '供应商档案', 9),
('1007', '1007', 1007, '/Home/Customer', '', '客户资料', 10),
('2000', '2000', 2000, '/Home/Inventory/initIndex', '', '库存建账', 11),
('2001', '2001', 2001, '/Home/Purchase/pwbillIndex', '', '采购入库', 12),
('2002', '2002', 2002, '/Home/Sale/wsIndex', '', '销售出库', 13),
('2003', '2003', 2003, '/Home/Inventory/inventoryQuery', '', '库存账查询', 14),
('2004', '2004', 2004, '/Home/Funds/rvIndex', '', '应收账款管理', 15),
('2005', '2005', 2005, '/Home/Funds/payIndex', '', '应付账款管理', 16),
('2006', '2006', 2006, '/Home/SaleRej/srIndex', '', '销售退货入库', 17),
('2007', '2007', 2007, '/Home/PurchaseRej', '', '采购退货出库', 18),
('2008', '2008', 2008, '/Home/BizConfig', '', '业务设置', 19),
('2009', '2009', 2009, '/Home/InvTransfer', '', '库间调拨', 20),
('2010', '2010', 2010, '/Home/InvCheck', '', '库存盘点', 21),
('2012', '2012', 2012, '/Home/Report/saleDayByGoods', '', '销售日报表(按商品汇总)', 22),
('2013', '2013', 2013, '/Home/Report/saleDayByCustomer', '', '销售日报表(按客户汇总)', 23),
('2014', '2014', 2014, '/Home/Report/saleDayByWarehouse', '', '销售日报表(按仓库汇总)', 24),
('2015', '2015', 2015, '/Home/Report/saleDayByBizuser', '', '销售日报表(按业务员汇总)', 25),
('2016', '2016', 2016, '/Home/Report/saleMonthByGoods', '', '销售月报表(按商品汇总)', 26),
('2017', '2017', 2017, '/Home/Report/saleMonthByCustomer', '', '销售月报表(按客户汇总)', 27),
('2018', '2018', 2018, '/Home/Report/saleMonthByWarehouse', '', '销售月报表(按仓库汇总)', 28),
('2019', '2019', 2019, '/Home/Report/saleMonthByBizuser', '', '销售月报表(按业务员汇总)', 29),
('2020', '2020', 2020, '/Home/Report/safetyInventory', '', '安全库存明细表', 30),
('2021', '2021', 2021, '/Home/Report/receivablesAge', '', '应收账款账龄分析表', 31),
('2022', '2022', 2022, '/Home/Report/payablesAge', '', '应付账款账龄分析表', 32),
('2023', '2023', 2023, '/Home/Report/inventoryUpper', '', '库存超上限明细表', 33),
('2024', '2024', 2024, '/Home/Funds/cashIndex', '', '现金收支查询', 34),
('2025', '2025', 2025, '/Home/Funds/prereceivingIndex', '', '预收款管理', 35),
('2026', '2026', 2026, '/Home/Funds/prepaymentIndex', '', '预付款管理', 36),
('2027', '2027', 2027, '/Home/PurchaseOrder/pobillIndex', '', '采购订单', 37),
('2028', '2028', 2028, '/Home/SaleOrder/soIndex', '', '销售订单', 38),
('2029', '2029', 2029, '/Home/Goods/brandIndex', '', '物料品牌', 39),
('2031', '2031', 2031, '/Home/Goods/psIndex', '', '价格体系', 40),
('2101', '2101', 2101, '/SLN0002/Subject/index', '', '会计科目', 41),
('2102', '2102', 2102, '/SLN0002/Bank/index', '', '银行账户', 42),
('2103', '2103', 2103, '/SLN0002/GLPeriod/index', '', '会计期间', 43),
('2032', '2032', 2032, '/Home/SaleContract/index', '', '销售合同', 44),
('2033', '2033', 2033, '/Home/WSP/index', '', '存货拆分', 45),
('2034', '2034', 2034, '/Home/Factory/index', '', '工厂', 46),
('2035', '2035', 2035, '/Home/DMO/dmobillIndex', '', '成品委托生产订单', 47),
('2036', '2036', 2036, '/Home/DMW/dmwbillIndex', '', '成品委托生产入库', 48)
;

# 实施指南导航
TRUNCATE TABLE `t_sysdict_help_nav`;
INSERT INTO `t_sysdict_help_nav` (`id`, `code`, `code_int`, `name`, `py`, `memo`, `show_order`) VALUES
('login', 'login', 1, '/help/user/10.html', '', '', 1),
('user', 'user', 2, '/help/admin/02-01.html', '', '访问实施指南页面：用户管理', 2),
('priceSystem', 'priceSystem', 3, '/help/admin/02-04-03.html', '', '访问实施指南页面：价格体系', 3),
('initInv', 'initInv', 4, '/help/admin/02-06.html', '', '访问实施指南页面：库存建账', 4),
('permission', 'permission', 5, '/help/admin/02-02.html', '', '访问实施指南页面：权限管理', 5),
('bizlog', 'bizlog', 6, '/help/admin/03.html', '', '访问实施指南页面：业务日志', 6),
('warehouse', 'warehouse', 7, '/help/admin/02-05.html', '', '访问实施指南页面：仓库', 7),
('goods', 'goods', 8, '/help/admin/02-04.html', '', '访问实施指南页面：物料', 8),
('goodsBrand', 'goodsBrand', 9, '/help/admin/02-04-02.html', '', '访问实施指南页面：物料品牌', 9),
('goodsUnit', 'goodsUnit', 10, '/help/admin/02-04-01.html', '', '访问实施指南页面：物料计量单位', 10),
('supplier', 'supplier', 11, '/help/admin/02-07.html', '', '访问实施指南页面：供应商档案', 11),
('customer', 'customer', 12, '/help/admin/02-08.html', '', '访问实施指南页面：客户资料', 12),
('bizconfig', 'bizconfig', 13, '/help/admin/02-03.html', '', '访问实施指南页面：业务设置', 13),
('pobill', 'pobill', 14, '/help/user/20-01.html', '', '访问实施指南页面：采购订单', 14),
('pwbill', 'pwbill', 15, '/help/user/20-02.html', '', '访问实施指南页面：采购入库', 15),
('prbill', 'prbill', 16, '/help/user/20-03.html', '', '访问实施指南页面：采购退货出库', 16),
('sobill', 'sobill', 17, '/help/user/30-01.html', '', '访问实施指南页面：销售订单', 17),
('wsbill', 'wsbill', 18, '/help/user/30-02.html', '', '访问实施指南页面：销售出库', 18),
('srbill', 'srbill', 19, '/help/user/30-03.html', '', '访问实施指南页面：销售退货入库', 19),
('itbill', 'itbill', 20, '/help/user/40-01.html', '', '访问实施指南页面：库间调拨', 20),
('icbill', 'icbill', 21, '/help/user/40-02.html', '', '访问实施指南页面：库存盘点', 21),
('dataOrg', 'dataOrg', 22, '/help/admin/05.html', '', '访问实施指南页面：数据域应用详解', 22),
('commBill', 'commBill', 23, '/help/user/00.html', '', '访问实施指南页面：表单通用操作', 23),
('scbill', 'scbill', 24, '/help/user/30-04.html', '', '访问实施指南页面：销售合同', 24),
('costWeight', 'costWeight', 25, '/help/admin/02-04-04.html', '', '访问实施指南页面：静态BOM-成本分摊权重', 25),
('wspbill', 'wspbill', 26, '/help/user/60-01.html', '', '访问实施指南页面：存货拆分', 26),
('factory', 'factory', 27, '/help/admin/02-09.html', '', '访问实施指南页面：工厂', 27),
('dmobill', 'dmobill', 28, '/help/user/60-02.html', '', '访问实施指南页面：成品委托生产订单', 28),
('dmwbill', 'dmwbill', 29, '/help/user/60-03.html', '', '访问实施指南页面：成品委托生产入库', 29),
('mainMenuMaintain', 'mainMenuMaintain', 30, '/help/dev/lcap/08-01.html', '', '访问实施指南页面：主菜单维护', 30),
('sysdict', 'sysdict', 31, '/help/dev/lcap/08-02.html', '', '访问实施指南页面：系统数据字典', 31),
('codetable', 'codetable', 32, '/help/dev/lcap/08-03.html', '', '访问实施指南页面：码表设置', 32),
('form', 'form', 33, '/help/dev/lcap/08-06.html', '', '访问实施指南页面：自定义表单', 33),
('formview', 'formview', 34, '/help/dev/lcap/08-04.html', '', '访问实施指南页面：视图开发助手', 34),
('solution', 'solution', 35, '/help/dev/lcap/08-05.html', '', '访问实施指南页面：解决方案', 35),
('fromShortcut', 'fromShortcut', 36, '/help/index.html', '', '通过快捷访问进入实施指南页面', 36),
('subject', 'subject', 37, '/help/user/70-01.html', '', '访问实施指南页面：会计科目', 37)
;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
