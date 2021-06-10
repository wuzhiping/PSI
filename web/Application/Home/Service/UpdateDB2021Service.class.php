<?php

namespace Home\Service;

use Home\Common\FIdConst;
use Think\Think;

/**
 * 数据库升级Service - 用于PSI 2021，减少原有UpdateDBService的代码行数
 * 
 * 由UpdateDBService调用本class
 *
 * @author 李静波
 */
class UpdateDB2021Service extends PSIBaseService
{
  /**
   *
   * @var \Think\Model $db
   */
  protected $db;

  function __construct($db)
  {
    $this->db = $db;
  }

  public function update()
  {
    $this->update_20210501_01();
    $this->update_20210507_01();
    $this->update_20210507_02();
    $this->update_20210508_01();
    $this->update_20210510_01();
    $this->update_20210511_01();
    $this->update_20210514_01();
    $this->update_20210516_01();
    $this->update_20210524_01();
  }

  private function update_20210524_01()
  {
    // 本次更新：新增表t_matrix_bom_config
    $db = $this->db;

    $tableName = "t_matrix_bom_config";
    if (!$this->tableExists($db, $tableName)) {
      $sql = "CREATE TABLE IF NOT EXISTS `t_matrix_bom_config` (
              `id` varchar(255) NOT NULL,
              `code_name` varchar(255) NOT NULL,
              `col_name` varchar(255) NOT NULL,
              PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
            ";
      $db->execute($sql);

      // 初始化其中的数据
      $sql = "insert into t_matrix_bom_config (`id`, `code_name`, `col_name`)
              values ('A2B72BA1-BC54-11EB-8835-E86A641ED142', '编号', '序列');
              ";
      $db->execute($sql);
    }
  }

  private function update_20210516_01()
  {
    // 本次更新：因为去掉中台和移动端，需要清除主菜单中无用数据
    $db = $this->db;

    $sql = "delete from t_menu_item where sys_category = 2 or sys_category = 3";
    $db->execute($sql);
  }

  private function update_20210514_01()
  {
    // 本次更新：新增表t_so_bill_bom和t_so_bill_bom_expand

    $db = $this->db;
    $tableName = "t_so_bill_bom";
    if (!$this->tableExists($db, $tableName)) {
      $sql = "CREATE TABLE IF NOT EXISTS `t_so_bill_bom` (
                `id` varchar(255) NOT NULL,
                `sobill_id` varchar(255) NOT NULL,
                `show_order` int(11) NOT NULL,
                `goods_id` varchar(255) NOT NULL,
                `sub_goods_id` varchar(255) NOT NULL,
                `sub_goods_count` decimal(19,8) NOT NULL,
                `m_category` int(11) NOT NULL DEFAULT 1,
                PRIMARY KEY (`id`)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
              ";
      $db->execute($sql);
    }

    $tableName = "t_so_bill_bom_expand";
    if (!$this->tableExists($db, $tableName)) {
      $sql = "CREATE TABLE IF NOT EXISTS `t_so_bill_bom_expand` (
                `id` varchar(255) NOT NULL,
                `sobill_id` varchar(255) NOT NULL,
                `show_order` int(11) NOT NULL,
                `goods_id` varchar(255) NOT NULL,
                `goods_count` decimal(19,8) NOT NULL,
                `sub_goods_id` varchar(255) NOT NULL,
                `sub_goods_count` decimal(19,8) NOT NULL,
                `m_category` int(11) NOT NULL DEFAULT 1,
                PRIMARY KEY (`id`)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
              ";
      $db->execute($sql);
    }
  }

  private function update_20210511_01()
  {
    // 本次更新：清除t_menu_item_h5中的数据，该表暂时不删除

    $db = $this->db;

    if ($this->tableExists($db, "t_menu_item_h5")) {
      $sql = "delete from t_menu_item_h5";
      $db->execute($sql);
    }
  }

  private function update_20210510_01()
  {
    // 本次更新：迁移移动端主菜单
    $db = $this->db;

    $sql = "delete from t_menu_item where sys_category = 3;

            INSERT INTO `t_menu_item` (`id`, `caption`, `fid`, `parent_id`, `show_order`, `py`, `memo`, `sys_category`) VALUES
            ('MH5-01', '销售', NULL, NULL, 1, '', 'XS', 3),
            ('MH5-0101', '销售订单', '2028', 'MH5-01', 1, 'XSDD', '', 3),
            ('MH5-02', '客户关系', NULL, NULL, 2, '', 'KHGX', 3),
            ('MH5-0201', '客户资料', '1007', 'MH5-02', 1, 'KHZL', '', 3);
            ";
    $db->execute($sql);
  }

  private function update_20210508_01()
  {
    // 本次更新：中台菜单调整
    $db = $this->db;

    $sql = "delete from t_menu_item where sys_category = 2;

            INSERT INTO `t_menu_item` (`id`, `caption`, `fid`, `parent_id`, `show_order`, `py`, `memo`, `sys_category`) VALUES
            ('MP-01', '首页', NULL, NULL, 1, 'SY', '', 2),
            ('MP-99', '关于', NULL, NULL, 2, 'GY', '', 2),
            ('MP-9901', '关于PSI中台', 'MP-9999', 'MP-99', 1, 'GYPSIZT', '', 2);
            ";
    $db->execute($sql);
  }

  private function update_20210507_02()
  {
    // 本次更新：初始化中台菜单
    $db = $this->db;

    $sql = "delete from t_menu_item where sys_category = 2;

            INSERT INTO `t_menu_item` (`id`, `caption`, `fid`, `parent_id`, `show_order`, `py`, `memo`, `sys_category`) VALUES
            ('MP-01', '首页', NULL, NULL, 1, 'SY', '', 2),
            ('MP-99', '关于', NULL, NULL, 1, 'GY', '', 2),
            ('MP-9901', '关于PSI中台', 'MP-9999', 'MP-99', 1, 'GYPSIZT', '', 2);
            ";
    $db->execute($sql);
  }

  private function update_20210507_01()
  {
    // 本次更新：菜单【二次开发】改为【低代码应用平台】
    $db = $this->db;
    $sql = "update t_menu_item
            set caption = '低代码应用平台'
            where id = '0905' ";
    $db->execute($sql);
  }

  private function update_20210501_01()
  {
    // 本次更新：t_menu_item、t_menu_item_plus新增字段sys_category
    $db = $this->db;
    $tableName = "t_menu_item";
    $columnName = "sys_category";
    if (!$this->columnExists($db, $tableName, $columnName)) {
      $sql = "alter table {$tableName} add {$columnName} int(11) NOT NULL DEFAULT 1;";
      $db->execute($sql);
    }

    $tableName = "t_menu_item_plus";
    $columnName = "sys_category";
    if (!$this->columnExists($db, $tableName, $columnName)) {
      $sql = "alter table {$tableName} add {$columnName} int(11) NOT NULL DEFAULT 1;";
      $db->execute($sql);
    }
  }
}
