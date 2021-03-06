# @author 艾格林门信息服务（大连）有限公司
# @copyright 2015 - present
# @license GPL v3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

TRUNCATE TABLE `t_customer`;
INSERT INTO `t_customer` (`id`, `category_id`, `code`, `name`, `contact01`, `qq01`, `tel01`, `mobile01`, `contact02`, `qq02`, `tel02`, `mobile02`, `py`, `init_receivables`, `init_receivables_dt`, `init_payables`, `init_payables_dt`) VALUES
('04B53C5E-B812-11E4-8FC9-782BCBD7746B', 'CDD1DE38-B811-11E4-8FC9-782BCBD7746B', '102', '大连宏光天宝大酒店有限公司', '', '', '', '', '', '', '', '', 'DLHGTBDJDYXGS', '7000.00', '2015-01-01 00:00:00', NULL, NULL),
('20B0AF03-B812-11E4-8FC9-782BCBD7746B', 'CDD1DE38-B811-11E4-8FC9-782BCBD7746B', '103', '大连华城电子有限公司', '', '', '', '', '', '', '', '', 'DLHCDZYXGS', NULL, NULL, NULL, NULL),
('2A837526-B812-11E4-8FC9-782BCBD7746B', 'CDD1DE38-B811-11E4-8FC9-782BCBD7746B', '104', '哈尔滨工大建设监理有限公司', '', '', '', '', '', '', '', '', 'HEBGDJSJLYXGS', NULL, NULL, NULL, NULL),
('3DE2F4E1-B812-11E4-8FC9-782BCBD7746B', 'D33D2C0B-B811-11E4-8FC9-782BCBD7746B', '201', '大连海恩橡胶辅机有限公司', '', '', '', '', '', '', '', '', 'DLHEXJFJYXGS', NULL, NULL, NULL, NULL),
('E76FA3FC-B811-11E4-8FC9-782BCBD7746B', 'CDD1DE38-B811-11E4-8FC9-782BCBD7746B', '101', '匿名', '', '', '', '', '', '', '', '', 'NM', NULL, NULL, NULL, NULL);

update t_customer set data_org = '01010001', company_id = '4D74E1E4-A129-11E4-9B6A-782BCBD7746B' ;

TRUNCATE TABLE `t_customer_category`;
INSERT INTO `t_customer_category` (`id`, `code`, `name`, `parent_id`) VALUES
('CDD1DE38-B811-11E4-8FC9-782BCBD7746B', '1', '市内', NULL),
('D33D2C0B-B811-11E4-8FC9-782BCBD7746B', '2', '北三市', NULL);

update t_customer_category set data_org = '01010001', company_id = '4D74E1E4-A129-11E4-9B6A-782BCBD7746B' ;

TRUNCATE TABLE `t_goods`;
INSERT INTO `t_goods` (`id`, `category_id`, `code`, `name`, `sale_price`, `spec`, `unit_id`, `purchase_price`, `py`) VALUES
('04C2141B-B74A-11E4-98B5-782BCBD7746B', '6C2AFC9A-B3F3-11E4-9DEA-782BCBD7746B', '2103', '夏普空气净化器', '1399.00', 'KC-W200SW', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'XPKQJHQ'),
('06CFC35B-B75F-11E4-B135-782BCBD7746B', '953219F9-B3F3-11E4-9DEA-782BCBD7746B', '5103', '朗瑞特家用无线智能门铃', '88.00', '白色LR-1688BY-2 ', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'LRTJYWXZNML'),
('089D45AB-B745-11E4-9C3C-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1204', '海尔多门冰箱', '4299.00', '银灰色BCD-339WBA 339 ', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'HEDMBX'),
('14716F2E-B749-11E4-98B5-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1404', '森太消毒柜', '675.00', '黑色一体冲压款F280嵌入式家用厨房消毒碗柜 黑色钢化玻璃轻触按键款 ', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'STXDG'),
('1736597F-B74B-11E4-98B5-782BCBD7746B', '89BCA8E9-B3F3-11E4-9DEA-782BCBD7746B', '4101', '金泰昌按摩足浴盆', '369.00', 'TC-5196', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'JTCAMZYP'),
('1B411CD9-B76A-11E4-9AAE-782BCBD7746B', '74C50B1B-B3F3-11E4-9DEA-782BCBD7746B', '3102', '九阳多功能无网全钢豆浆机', '249.00', 'DJ12B-A603DG ', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'JYDGNWWQGDJJ'),
('1D0177A0-B746-11E4-9C3C-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1303', '飞利浦家庭影院 ', '3599.00', '黑色HTB5540D/93 晶晰音效 3D蓝光DVD 内置WIFI 蓝牙 可搭配高清电视', '50C40382-B745-11E4-9C3C-782BCBD7746B', NULL, 'FLPJTYY'),
('2D1C672D-B74A-11E4-98B5-782BCBD7746B', '6C2AFC9A-B3F3-11E4-9DEA-782BCBD7746B', '2104', '纽贝尔小王子空气净化器', '3999.00', '金色 NBE-XWZ', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'NBEXWZKQJHQ'),
('359389E5-B745-11E4-9C3C-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1205', '松下风冷变频三门冰箱', '5099.00', '316升典雅银NR-C32WP2-S ', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'SXFLBPSMBX'),
('35FA2DE1-B746-11E4-9C3C-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1304', 'JBL CINEMA BASECN 回音壁音箱', '2980.00', '黑色', '50C40382-B745-11E4-9C3C-782BCBD7746B', NULL, 'JCBHYBYX'),
('373A750B-B749-11E4-98B5-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1405', '西门子原装进口电烤箱', '5999.00', 'HB11AB521W', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'XMZYZJKDKX'),
('3AD67063-B74B-11E4-98B5-782BCBD7746B', '89BCA8E9-B3F3-11E4-9DEA-782BCBD7746B', '4201', '欧姆龙电子血压计', '299.00', 'HEM-7051上臂式', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'OMLDZXYJ'),
('45B5B8A2-B3F5-11E4-9DEA-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1201', '容声冰箱', '1498.00', '202升 三门 拉丝银色BCD-202M/TX6-GF61-C', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'RSBX'),
('4735240F-B3F4-11E4-9DEA-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1103', '索尼全高清LED液晶电视', '2799.00', '40英寸黑色KDL-40RM10B', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'SNQGQLJDS'),
('496850A9-B74A-11E4-98B5-782BCBD7746B', '6C2AFC9A-B3F3-11E4-9DEA-782BCBD7746B', '2105', '瑞典布鲁雅尔专业空气净化器', '11680.00', '603', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'RDBLYEZYKQJHQ'),
('5148FC80-B76A-11E4-9AAE-782BCBD7746B', '74C50B1B-B3F3-11E4-9DEA-782BCBD7746B', '3103', '苏泊尔豆浆机', '349.00', 'DJ12B-Y94E', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'SBEDJJ'),
('5472B0C8-B746-11E4-9C3C-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1305', '三星家庭影院', '1499.00', '黑色 无线重低音炮 蓝牙 3D水晶功放Soundbar回音壁音响电视音箱', '50C40382-B745-11E4-9C3C-782BCBD7746B', NULL, 'SXJTYY'),
('5ADA53E3-B749-11E4-98B5-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1501', '凡萨帝高端风冷压缩机恒温红酒柜', '2980.00', '1挂+7层', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'FSDGDFLYSJHWHJG'),
('5E8F05FF-B74B-11E4-98B5-782BCBD7746B', '953219F9-B3F3-11E4-9DEA-782BCBD7746B', '5101', '朗瑞特一拖一 家用无线智能门铃', '48.00', '白色LR-1688BY', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'LRTYTYJYWXZNML'),
('7122320E-B76A-11E4-9AAE-782BCBD7746B', '74C50B1B-B3F3-11E4-9DEA-782BCBD7746B', '3104', '飞利浦豆浆机', '798.00', 'HD2078/03', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'FLPDJJ'),
('7ED6D9C2-B749-11E4-98B5-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1502', '博世专业酒柜', '6899.00', '银色228升 ', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'BSZYJG'),
('8CBD95C4-B3F4-11E4-9DEA-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1104', '创维酷开4K超高清平板液晶电视', '4499.00', '55英寸白色U55', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'CWKKGQPBYJDS'),
('903F1597-B744-11E4-9C3C-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1202', '美的对开门冰箱', '3499.00', '516升泰坦银BCD-516WKM(E) ', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'MDDKMBX'),
('95554EBC-B74A-11E4-98B5-782BCBD7746B', '6C2AFC9A-B3F3-11E4-9DEA-782BCBD7746B', '2106', '爱屋安智能测控空气净化器', '2999.00', 'AP450', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'AWAZNCKKQJHQ'),
('95D1BFFC-B746-11E4-9C3C-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1401', '康宝立式消毒柜消毒碗柜', '439.00', 'ZTP80A-25(H)', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'KBLSXDGXDWG'),
('AB325C43-B744-11E4-9C3C-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1203', '格兰仕节能冰箱', '999.00', 'BCD-178N 178L珍·鲜系列', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'GLSJNBX'),
('B0F6FBA5-B745-11E4-9C3C-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1301', '索尼家庭影院', '3088.00', '黑色HT-CT770无线重低音扬声器 Soundbar回音壁音响 可挂式电视音箱', '50C40382-B745-11E4-9C3C-782BCBD7746B', NULL, 'SNJTYY'),
('BA7AC1DC-B746-11E4-9C3C-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1402', '欧尼尔嵌入式消毒碗柜', '739.00', '黑色低温(OUNIER)X8 消毒柜 家用 消毒碗柜 ', '50C40382-B745-11E4-9C3C-782BCBD7746B', NULL, 'ONEQRSXDWG'),
('BB01CEF8-B3F5-11E4-9DEA-782BCBD7746B', '6C2AFC9A-B3F3-11E4-9DEA-782BCBD7746B', '2101', '飞利浦空气净化器', '2999.00', '香槟色 AC4076 ', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'FLPKQJHQ'),
('BE3C9CBF-B74A-11E4-98B5-782BCBD7746B', '6C2AFC9A-B3F3-11E4-9DEA-782BCBD7746B', '2201', '美的温热型饮水机', '199.00', 'MYR718S-X', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'MDWRXYSJ'),
('BF635F9D-B749-11E4-98B5-782BCBD7746B', '6C2AFC9A-B3F3-11E4-9DEA-782BCBD7746B', '2102', '瑞典布鲁雅尔专业空气净化器', '6299.00', '510B', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'RDBLYEZYKQJHQ'),
('D84201A3-B745-11E4-9C3C-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1302', '飞利浦迷你音响', '1599.00', '黑色HTL4110/93  电视音箱音响 家庭影院 回音壁音箱 木质音箱 USB播放器', '50C40382-B745-11E4-9C3C-782BCBD7746B', NULL, 'FLPMNYX'),
('DA4D10A8-B3F3-11E4-9DEA-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1101', '创维酷开网络平板液晶电视', '2799.00', '50英寸黑色K50J', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'CWKKWLPBYJDS'),
('E2A660FD-B3F4-11E4-9DEA-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1105', '长虹安卓智能LED液晶电视', '2299.00', '42英寸黑色', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'CHAZZNLJDS'),
('E600D194-B75E-11E4-B135-782BCBD7746B', '953219F9-B3F3-11E4-9DEA-782BCBD7746B', '5102', '海得曼无线门铃', '66.00', 'E-228 ', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'HDMWXML'),
('EF05A6DF-B74A-11E4-98B5-782BCBD7746B', '74C50B1B-B3F3-11E4-9DEA-782BCBD7746B', '3101', '九阳双磨多功能全钢豆浆机', '399.00', 'DJ13B-D08EC', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'JYSMDGNQGDJJ'),
('F4BA9C47-B748-11E4-98B5-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1403', '海尔消毒柜', '1098.00', 'ZTD100-A', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'HEXDG'),
('FDE1B0F0-B3F3-11E4-9DEA-782BCBD7746B', '66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1102', '康佳窄边全高清液晶电视', '1999.00', '42英寸黑色LED42E330CE', '5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', NULL, 'KJZBQGQYJDS');

update t_goods set data_org = '01010001', company_id = '4D74E1E4-A129-11E4-9B6A-782BCBD7746B' ;

TRUNCATE TABLE `t_goods_category`;
INSERT INTO `t_goods_category` (`id`, `code`, `name`) VALUES
('66D899C2-B3F3-11E4-9DEA-782BCBD7746B', '1', '大家电'),
('6C2AFC9A-B3F3-11E4-9DEA-782BCBD7746B', '2', '生活电器'),
('74C50B1B-B3F3-11E4-9DEA-782BCBD7746B', '3', '厨房电器'),
('89BCA8E9-B3F3-11E4-9DEA-782BCBD7746B', '4', '个护健康'),
('953219F9-B3F3-11E4-9DEA-782BCBD7746B', '5', '五金家装');

update t_goods_category set data_org = '01010001', full_name = name, company_id = '4D74E1E4-A129-11E4-9B6A-782BCBD7746B' ;

TRUNCATE TABLE `t_goods_unit`;
INSERT INTO `t_goods_unit` (`id`, `name`, `code`) VALUES
('50C40382-B745-11E4-9C3C-782BCBD7746B', '套', '1'),
('5D6D901E-B3F3-11E4-9DEA-782BCBD7746B', '台', '2');

update t_goods_unit set data_org = '01010001', company_id = '4D74E1E4-A129-11E4-9B6A-782BCBD7746B';

TRUNCATE TABLE `t_payables`;
INSERT INTO `t_payables` (`id`, `act_money`, `balance_money`, `ca_id`, `ca_type`, `pay_money`) VALUES
('88072F8B-B80F-11E4-8FC9-782BCBD7746B', '0.00', '5000.00', '87D62652-B80F-11E4-8FC9-782BCBD7746B', 'supplier', '5000.00');

update t_payables set data_org = '01010001', company_id = '4D74E1E4-A129-11E4-9B6A-782BCBD7746B' ;

TRUNCATE TABLE `t_payables_detail`;
INSERT INTO `t_payables_detail` (`id`, `act_money`, `balance_money`, `ca_id`, `ca_type`, `biz_date`, `date_created`, `pay_money`, `ref_number`, `ref_type`) VALUES
('8800479E-B80F-11E4-8FC9-782BCBD7746B', '0.00', '5000.00', '87D62652-B80F-11E4-8FC9-782BCBD7746B', 'supplier', '2015-01-01 00:00:00', '2015-02-19 16:15:57', '5000.00', '87D62652-B80F-11E4-8FC9-782BCBD7746B', '应付账款期初建账');

update t_payables_detail set data_org = '01010001', company_id = '4D74E1E4-A129-11E4-9B6A-782BCBD7746B' ;

TRUNCATE TABLE `t_receivables`;
INSERT INTO `t_receivables` (`id`, `act_money`, `balance_money`, `ca_id`, `ca_type`, `rv_money`) VALUES
('04DFC20D-B812-11E4-8FC9-782BCBD7746B', '0.00', '7000.00', '04B53C5E-B812-11E4-8FC9-782BCBD7746B', 'customer', '7000.00');

update t_receivables set data_org = '01010001', company_id = '4D74E1E4-A129-11E4-9B6A-782BCBD7746B' ;

TRUNCATE TABLE `t_receivables_detail`;
INSERT INTO `t_receivables_detail` (`id`, `act_money`, `balance_money`, `ca_id`, `ca_type`, `biz_date`, `date_created`, `ref_number`, `ref_type`, `rv_money`) VALUES
('04D71E39-B812-11E4-8FC9-782BCBD7746B', '0.00', '7000.00', '04B53C5E-B812-11E4-8FC9-782BCBD7746B', 'customer', '2015-01-01 00:00:00', '2015-02-19 16:33:45', '04B53C5E-B812-11E4-8FC9-782BCBD7746B', '应收账款期初建账', '7000.00');

update t_receivables_detail set data_org = '01010001', company_id = '4D74E1E4-A129-11E4-9B6A-782BCBD7746B' ;

TRUNCATE TABLE `t_recent_fid`;
INSERT INTO `t_recent_fid` (`fid`, `user_id`, `click_count`) VALUES
('-8999', '6C2A09CD-A129-11E4-9B6A-782BCBD7746B', 4),
('-8996', '6C2A09CD-A129-11E4-9B6A-782BCBD7746B', 3),
('1003', '6C2A09CD-A129-11E4-9B6A-782BCBD7746B', 2),
('1002', '6C2A09CD-A129-11E4-9B6A-782BCBD7746B', 2),
('1001', '6C2A09CD-A129-11E4-9B6A-782BCBD7746B', 12),
('-8997', '6C2A09CD-A129-11E4-9B6A-782BCBD7746B', 2),
('2001', '6C2A09CD-A129-11E4-9B6A-782BCBD7746B', 3),
('1004', '6C2A09CD-A129-11E4-9B6A-782BCBD7746B', 2),
('2005', '6C2A09CD-A129-11E4-9B6A-782BCBD7746B', 1),
('1007', '6C2A09CD-A129-11E4-9B6A-782BCBD7746B', 2),
('2004', '6C2A09CD-A129-11E4-9B6A-782BCBD7746B', 1),
('2000', '6C2A09CD-A129-11E4-9B6A-782BCBD7746B', 1),
('2009', '6C2A09CD-A129-11E4-9B6A-782BCBD7746B', 1);

TRUNCATE TABLE `t_supplier`;
INSERT INTO `t_supplier` (`id`, `category_id`, `code`, `name`, `contact01`, `qq01`, `tel01`, `mobile01`, `contact02`, `qq02`, `tel02`, `mobile02`, `py`, `init_receivables`, `init_receivables_dt`, `init_payables`, `init_payables_dt`) VALUES
('01F98E5A-B811-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '220', '大连华鑫船舶物资有限公司', '', '', '', '', '', '', '', '', 'DLHXCBWZYXGS', NULL, NULL, NULL, NULL),
('0AAE3DAA-B811-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '221', '大连聚丰芮生国际贸易有限公司', '', '', '', '', '', '', '', '', 'DLJFRSGJMYYXGS', NULL, NULL, NULL, NULL),
('1275ABFD-B810-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '208', '大连纳源电力建设工程有限公司', '', '', '', '', '', '', '', '', 'DLNYDLJSGCYXGS', NULL, NULL, NULL, NULL),
('2530FF8A-B810-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '209', '大连天运物流设备有限公司', '', '', '', '', '', '', '', '', 'DLTYWLSBYXGS', NULL, NULL, NULL, NULL),
('267C11BA-B811-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '222', '大连弗瑞得科技有限公司', '', '', '', '', '', '', '', '', 'DLFRDKJYXGS', NULL, NULL, NULL, NULL),
('3AE15383-B811-11E4-8FC9-782BCBD7746B', '599B7CF5-B80F-11E4-8FC9-782BCBD7746B', '101', '杉德电子商务服务有限公司大连分公司', '', '', '', '', '', '', '', '', 'SDDZSWFWYXGSDLFGS', NULL, NULL, NULL, NULL),
('3EB4B95E-B810-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '210', '大连亚农农业科技有限公司', '', '', '', '', '', '', '', '', 'DLYNNYKJYXGS', NULL, NULL, NULL, NULL),
('4B41D6E0-B810-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '211', '大连市友光科技有限公司', '', '', '', '', '', '', '', '', 'DLSYGKJYXGS', NULL, NULL, NULL, NULL),
('5AD88F44-B810-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '212', '大连保税区埃玛国际贸易有限公司', '', '', '', '', '', '', '', '', 'DLBSQAMGJMYYXGS', NULL, NULL, NULL, NULL),
('634489C3-B811-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '223', '辽宁华谊兄弟贸易有限公司', '', '', '', '', '', '', '', '', 'LNHYXDMYYXGS', NULL, NULL, NULL, NULL),
('7566E8A3-B810-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '213', '大连北城国际贸易有限公司', '', '', '', '', '', '', '', '', 'DLBCGJMYYXGS', NULL, NULL, NULL, NULL),
('83E70C80-B810-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '214', '大连升鑫金属制品有限公司', '', '', '', '', '', '', '', '', 'DLSXJSZPYXGS', NULL, NULL, NULL, NULL),
('87D62652-B80F-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '201', '大连保税区海尔电冰箱贸易有限公司', '', '', '', '', '', '', '', '', 'DLBSQHEDBXMYYXGS', NULL, NULL, '5000.00', '2015-01-01 00:00:00'),
('92FC6367-B811-11E4-8FC9-782BCBD7746B', '599B7CF5-B80F-11E4-8FC9-782BCBD7746B', '102', '大连铭源伟业商贸有限公司', '', '', '', '', '', '', '', '', 'DLMYWYSMYXGS', NULL, NULL, NULL, NULL),
('97940C9F-B80F-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '202', '大连宜家家居有限公司', '', '', '', '', '', '', '', '', 'DLYJJJYXGS', NULL, NULL, NULL, NULL),
('99D4AD20-B811-11E4-8FC9-782BCBD7746B', '599B7CF5-B80F-11E4-8FC9-782BCBD7746B', '103', '苏宁易购大连分公司', '', '', '', '', '', '', '', '', 'SNYGDLFGS', NULL, NULL, NULL, NULL),
('AAE2F77F-B80F-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '203', '大连伊辉商贸有限公司', '', '', '', '', '', '', '', '', 'DLYHSMYXGS', NULL, NULL, NULL, NULL),
('AEF560B6-B810-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '215', '海而空调器有限公司大连分公司', '', '', '', '', '', '', '', '', 'HEKTQYXGSDLFGS', NULL, NULL, NULL, NULL),
('B7DCAC49-B80F-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '204', '屈臣氏个人用品连锁商店有限公司', '', '', '', '', '', '', '', '', 'QCSGRYPLSSDYXGS', NULL, NULL, NULL, NULL),
('BB1C951F-B810-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '216', '大连富盾机械有限公司', '', '', '', '', '', '', '', '', 'DLFDJXYXGS', NULL, NULL, NULL, NULL),
('C881D864-B810-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '217', '大连伟丰国际贸易有限公司', '', '', '', '', '', '', '', '', 'DLWFGJMYYXGS', NULL, NULL, NULL, NULL),
('C8D67CBB-B80F-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '205', '大连明天良友金伴便利连锁有限公司', '', '', '', '', '', '', '', '', 'DLMTLYJBBLLSYXGS', NULL, NULL, NULL, NULL),
('DDA71B3E-B810-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '218', '大连中运国际', '', '', '', '', '', '', '', '', 'DLZYGJ', NULL, NULL, NULL, NULL),
('F1974D46-B80F-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '206', '大连冠晨科技发展有限公司', '', '', '', '', '', '', '', '', 'DLGCKJFZYXGS', NULL, NULL, NULL, NULL),
('F5AA127C-B810-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '219', '大连海珍尚品海洋产品商贸有限公司', '', '', '', '', '', '', '', '', 'DLHZSPHYCPSMYXGS', NULL, NULL, NULL, NULL),
('FE7BCC92-B80F-11E4-8FC9-782BCBD7746B', '602BA712-B80F-11E4-8FC9-782BCBD7746B', '207', '大连彤加贸易有限公司', '', '', '', '', '', '', '', '', 'DLTJMYYXGS', NULL, NULL, NULL, NULL);

update t_supplier set data_org = '01010001', company_id = '4D74E1E4-A129-11E4-9B6A-782BCBD7746B' ;

TRUNCATE TABLE `t_supplier_category`;
INSERT INTO `t_supplier_category` (`id`, `code`, `name`) VALUES
('599B7CF5-B80F-11E4-8FC9-782BCBD7746B', '1', '电商'),
('602BA712-B80F-11E4-8FC9-782BCBD7746B', '2', '本地供应商');

update t_supplier_category set data_org = '01010001', company_id = '4D74E1E4-A129-11E4-9B6A-782BCBD7746B' ;

TRUNCATE TABLE `t_warehouse`;
INSERT INTO `t_warehouse` (`id`, `code`, `inited`, `name`, `py`) VALUES
('17A72FFA-B3F3-11E4-9DEA-782BCBD7746B', '1', 1, '城区中心库房', 'CQZXKF');

update t_warehouse set data_org = '01010001', company_id = '4D74E1E4-A129-11E4-9B6A-782BCBD7746B' ;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
