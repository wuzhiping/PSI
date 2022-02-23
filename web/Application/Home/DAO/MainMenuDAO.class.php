<?php

namespace Home\DAO;

use Home\Common\DemoConst;

/**
 * 主菜单 DAO
 *
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
class MainMenuDAO extends PSIBaseExDAO
{

  /**
   * 查询所有的主菜单项 - 主菜单维护模块中使用
   */
  public function allMenuItemsForMaintain($params)
  {
    $db = $this->db;

    $sub = "select *, 1 as sys_item from t_menu_item
            where sys_category = 1 
            union 
            select *, 2 as sys_item from t_menu_item_plus
            where sys_category = 1";

    $sql = "select id, caption, fid, show_order, sys_item 
            from ({$sub}) m
            where parent_id is null order by show_order";
    $m1 = $db->query($sql);
    $result = [];

    $iconCls = "PSI-MainMenuItemIconClass";

    $index1 = 0;
    foreach ($m1 as $menuItem1) {

      $children1 = [];

      $sql = "select id, caption, fid, show_order, sys_item 
              from ({$sub}) m
              where parent_id = '%s' order by show_order ";
      $m2 = $db->query($sql, $menuItem1["id"]);

      // 第二级菜单
      $index2 = 0;
      foreach ($m2 as $menuItem2) {
        $children2 = [];
        $sql = "select id, caption, fid, show_order, sys_item 
                from ({$sub}) m
                where parent_id = '%s' order by show_order ";
        $m3 = $db->query($sql, $menuItem2["id"]);

        // 第三级菜单
        $index3 = 0;
        foreach ($m3 as $menuItem3) {
          $children2[$index3]["id"] = $menuItem3["id"];
          $children2[$index3]["caption"] = $menuItem3["caption"];
          $children2[$index3]["fid"] = $menuItem3["fid"];
          $children2[$index3]["showOrder"] = $menuItem3["show_order"];
          $children2[$index3]["sysItem"] = $menuItem3["sys_item"];
          $children2[$index3]["children"] = [];
          $children2[$index3]["iconCls"] = $iconCls;
          $index3++;
        }

        $fid = $menuItem2["fid"];
        if ($fid) {
          // 仅有二级菜单
          $children1[$index2]["id"] = $menuItem2["id"];
          $children1[$index2]["caption"] = $menuItem2["caption"];
          $children1[$index2]["fid"] = $menuItem2["fid"];
          $children1[$index2]["showOrder"] = $menuItem2["show_order"];
          $children1[$index2]["sysItem"] = $menuItem2["sys_item"];
          $children1[$index2]["children"] = $children2;
          $children1[$index2]["iconCls"] = $iconCls;
          $index2++;
        } else {
          if (count($children2) > 0) {
            // 二级菜单还有三级菜单
            $children1[$index2]["id"] = $menuItem2["id"];
            $children1[$index2]["caption"] = $menuItem2["caption"];
            $children1[$index2]["fid"] = $menuItem2["fid"];
            $children1[$index2]["showOrder"] = $menuItem2["show_order"];
            $children1[$index2]["sysItem"] = $menuItem2["sys_item"];
            $children1[$index2]["children"] = $children2;
            $children1[$index2]["iconCls"] = $iconCls;
            $index2++;
          }
        }
      }

      if (count($children1) > 0) {
        $menuItem1["iconCls"] = $iconCls;
        $menuItem1["sysItem"] = 1;
        $result[$index1] = $menuItem1;
        $result[$index1]["children"] = $children1;
        $index1++;
      }
    }

    return $result;
  }

  /**
   * Fid字段查询数据
   */
  public function queryDataForFid($params)
  {
    $db = $this->db;

    $queryKey = $params["queryKey"] ?? "";

    $sql = "select fid, name, code, py 
            from t_fid_plus
            where fid like '%s' or name like '%s' or code like '%s' or py like '%s'
            order by fid limit 20";
    $queryParams = [];
    $queryParams[] = "%{$queryKey}%";
    $queryParams[] = "%{$queryKey}%";
    $queryParams[] = "%{$queryKey}%";
    $queryParams[] = "%{$queryKey}%";

    $data = $db->query($sql, $queryParams);
    $result = [];

    foreach ($data as $v) {
      $result[] = [
        "id" => $v["fid"],
        "name" => $v["name"],
        "code" => $v["code"],
        "py" => $v["py"],
      ];
    }

    return $result;
  }

  /**
   * 菜单项自定义字段 - 查询数据
   */
  public function queryDataForMenuItem($params)
  {
    $db = $this->db;

    $queryKey = $params["queryKey"] ?? "";

    $sql = "select id, caption, parent_id
            from t_menu_item
            where (fid is null) and (py like '%s' or caption like '%s')
            order by id";
    $queryParams = [];
    $queryParams[] = "%{$queryKey}%";
    $queryParams[] = "%{$queryKey}%";

    $data = $db->query($sql, $queryParams);

    $result = [];
    foreach ($data as $v) {
      $caption = $v["caption"];
      $parentId = $v["parent_id"];
      if ($parentId) {
        $sql = "select caption from t_menu_item where id = '%s' ";
        $d = $db->query($sql, $parentId);
        if ($d) {
          $caption = $d[0]["caption"] . "\\" . $caption;
        }
      }

      $result[] = [
        "id" => $v["id"],
        "name" => $caption
      ];
    }

    return $result;
  }

  /**
   * 菜单项快捷访问自定义字段 - 查询数据
   */
  public function queryDataForShortcut($params)
  {
    $db = $this->db;

    $queryKey = $params["queryKey"] ?? "";

    $loginUserId = $params["loginUserId"];
    $queryParams = [];
    $sql = "select id, fid, caption, py, code
              from (select * from t_menu_item 
                    union 
                    select * from t_menu_item_plus) m
              where (caption like '%s' or py like '%s' or code like '%s') and (py <> '') 
                and (fid in (
                      select p.fid
                      from  t_role_user ru, t_role_permission rp, 
                        (select * from t_permission union select * from t_permission_plus) p
                      where ru.user_id = '%s' and ru.role_id = rp.role_id
                        and rp.permission_id = p.id
                      )
                    )
              order by py limit 20
              ";
    $queryParams[] = "%{$queryKey}%";
    $queryParams[] = "%{$queryKey}%";
    $queryParams[] = "%{$queryKey}%";
    $queryParams[] = $loginUserId;

    $data = $db->query($sql, $queryParams);

    $result = [];
    foreach ($data as $v) {
      $result[] = [
        "id" => $v["id"],
        "fid" => $v["fid"],
        "caption" => $v["caption"],
        "py" => $v["py"],
        "code" => $v["code"],
      ];
    }

    return $result;
  }

  /**
   * 新增主菜单项
   *
   * @param array $params        	
   * @return array|NULL
   */
  public function addMenuItem(&$params)
  {
    $db = $this->db;

    $fid = $params["fid"];
    $caption = $params["caption"];
    $parentMenuId = $params["parentMenuId"];
    $showOrder = intval($params["showOrder"]);
    $py = $params["py"];

    // 检查fid
    $sql = "select code from t_fid_plus where fid = '%s' ";
    $data = $db->query($sql, $fid);
    if (!$data) {
      return $this->bad("fid在表t_fid_plus中不存在");
    }
    $fidCode = $data[0]["code"];

    $len = strlen($caption);
    if ($len <= 0) {
      return $this->bad("没有输入标题");
    } else if ($len > 40) {
      return $this->bad("标题过长，不能大于40个字符");
    }

    // 检查上级菜单id
    $sql = "select count(*) as cnt from t_menu_item where id = '%s' and parent_id is null ";
    $data = $db->query($sql, $parentMenuId);
    $cnt = $data[0]["cnt"];
    if ($cnt != 1) {
      return $this->bad("上级菜单不存在");
    }

    // 检查该菜单项是否已经设置过了
    $sql = "select count(*) as cnt from t_menu_item_plus where fid = '%s' ";
    $data = $db->query($sql, $fid);
    $cnt = $data[0]["cnt"];
    if ($cnt > 0) {
      return $this->bad("fid为[{$fid}]的模块已经设置了主菜单了，不能重复设置");
    }

    $id = $this->newId();

    $sql = "insert into t_menu_item_plus (id, caption, fid, parent_id, show_order, py, memo, code)
            values ('%s', '%s', '%s', '%s', %d, '%s', '%s', '%s')";
    $rc = $db->execute($sql, $id, $caption, $fid, $parentMenuId, $showOrder, $py, '', $fidCode);
    if ($rc === false) {
      return $this->sqlError(__METHOD__, __LINE__);
    }

    // 操作成功
    $params["id"] = $id;
    return null;
  }

  /**
   * 删除菜单项
   */
  public function deleteMenuItem(&$params)
  {
    $db = $this->db;

    $id = $params["id"];

    // 判断要删除的菜单项是不是系统菜单
    $sql = "select count(*) as cnt from t_menu_item where id = '%s' ";
    $data = $db->query($sql, $id);
    $cnt = $data[0]["cnt"];
    if ($cnt > 0) {
      return $this->bad("系统菜单不能删除");
    }

    $sql = "select caption from t_menu_item_plus where id = '%s' ";
    $data = $db->query($sql, $id);
    if (!$data) {
      return $this->bad("要删除的菜单不存在");
    }

    $caption = $data[0]["caption"];

    $sql = "delete from t_menu_item_plus where id = '%s' ";
    $rc = $db->execute($sql, $id);
    if ($rc === false) {
      return $this->sqlError(__METHOD__, __LINE__);
    }

    // 操作成功
    $params["caption"] = $caption;
    return null;
  }

  /**
   * 某个菜单项的详情信息
   */
  public function menuItemInfo($params)
  {
    $db = $this->db;

    $id = $params["id"];

    $sql = "select fid, caption, parent_id, show_order
            from t_menu_item_plus
            where id = '%s' ";
    $data = $db->query($sql, $id);
    if ($data) {
      $v = $data[0];
      $result = [
        "fid" => $v["fid"],
        "caption" => $v["caption"],
        "parentMenuId" => $v["parent_id"],
        "showOrder" => $v["show_order"]
      ];

      $sql = "select name from t_fid_plus where fid = '%s' ";
      $data = $db->query($sql, $v["fid"]);
      if ($data) {
        $result["fidName"] = $data[0]["name"];
      }

      $sql = "select caption from t_menu_item where id = '%s' ";
      $data = $db->query($sql, $v["parent_id"]);
      if ($data) {
        $result["parentMenuCaption"] = $data[0]["caption"];
      }

      return $result;
    } else {
      return $this->emptyResult();
    }
  }

  /**
   * 编辑菜单项
   *
   * @param array $params        	
   * @return array|null
   */
  public function updateMenuItem(&$params)
  {
    $db = $this->db;

    $id = $params["id"];

    $fid = $params["fid"];
    $caption = $params["caption"];
    $parentMenuId = $params["parentMenuId"];
    $showOrder = intval($params["showOrder"]);
    $py = $params["py"];

    // 检查fid
    $sql = "select code from t_fid_plus where fid = '%s' ";
    $data = $db->query($sql, $fid);
    if (!$data) {
      return $this->bad("fid在表t_fid_plus中不存在");
    }
    $fidCode = $data[0]["code"];

    $len = strlen($caption);
    if ($len <= 0) {
      return $this->bad("没有输入标题");
    } else if ($len > 20) {
      return $this->bad("标题过长，不能大于20个字符");
    }

    // 检查上级菜单id
    $sql = "select count(*) as cnt from t_menu_item where id = '%s' and parent_id is null ";
    $data = $db->query($sql, $parentMenuId);
    $cnt = $data[0]["cnt"];
    if ($cnt != 1) {
      return $this->bad("上级菜单不存在");
    }

    $sql = "update t_menu_item_plus
            set caption = '%s', fid = '%s', parent_id = '%s',
              show_order = %d, py = '%s', code = '%s'
            where id = '%s' ";
    $rc = $db->execute($sql, $caption, $fid, $parentMenuId, $showOrder, $py, $fidCode, $id);
    if ($rc === false) {
      return $this->sqlError(__METHOD__, __LINE__);
    }

    // 操作成功
    return null;
  }

  /**
   * 获得某个模块的导航项
   */
  public function getNav($params)
  {
    $db = $this->db;

    $fid = $params["fid"];

    $sql = "select name from t_sysdict_mainmenu_nav where code = '%s' ";
    $data = $db->query($sql, $fid);
    if ($data) {
      return [
        "url" => $data[0]["name"],
      ];
    } else {
      return null;
    }
  }

  /**
   * 主菜单数据导出SQL
   */
  public function genSQL()
  {
    $db = $this->db;

    // 主菜单数据存在两个表中：t_menu_item和t_menu_item_plus

    $lineSep = "# " . str_repeat("-", 78) . "\n";
    $result = "";

    // t_menu_item
    $result .= $lineSep;
    $result .= "# t_menu_item\n";
    $result .= $lineSep;
    $result .= "DELETE FROM t_menu_item;\n";

    $sql = "select id, caption, fid, parent_id, show_order,
              py, memo, sys_category 
            from t_menu_item
            order by id";
    $data = $db->query($sql);
    foreach ($data as $v) {
      $id = $v["id"];
      $caption = $v["caption"];
      $fid = $v["fid"];
      if (!$fid) {
        $fid = "NULL";
      } else {
        $fid = "'{$fid}'";
      }
      $parentId = $v["parent_id"];
      if (!$parentId) {
        $parentId = "NULL";
      } else {
        $parentId = "'{$parentId}'";
      }
      $showOrder = $v["show_order"];
      $py = $v["py"];
      $memo = $v["memo"];
      $sysCategory = $v["sys_category"];
      $result .= "INSERT INTO t_menu_item(id, caption, fid, parent_id, show_order, py, memo, sys_category)\n";
      $result .= "VALUES ('{$id}', '{$caption}', {$fid}, {$parentId}, {$showOrder}, '{$py}', '{$memo}', {$sysCategory});\n";
    }

    // t_menu_item_plus
    $result .= "\n";
    $result .= $lineSep;
    $result .= "# t_menu_item_plus\n";
    $result .= $lineSep;
    $result .= "DELETE FROM t_menu_item_plus;\n";

    $sql = "select id, caption, fid, parent_id, show_order,
              py, memo, sys_category 
            from t_menu_item_plus
            order by id";
    $data = $db->query($sql);
    foreach ($data as $v) {
      $id = $v["id"];
      $caption = $v["caption"];
      $fid = $v["fid"];
      if (!$fid) {
        $fid = "NULL";
      } else {
        $fid = "'{$fid}'";
      }
      $parentId = $v["parent_id"];
      if (!$parentId) {
        $parentId = "NULL";
      } else {
        $parentId = "'{$parentId}'";
      }
      $showOrder = $v["show_order"];
      $py = $v["py"];
      $memo = $v["memo"];
      $sysCategory = $v["sys_category"];
      $result .= "INSERT INTO t_menu_item_plus(id, caption, fid, parent_id, show_order, py, memo, sys_category)\n";
      $result .= "VALUES ('{$id}', '{$caption}', {$fid}, {$parentId}, {$showOrder}, '{$py}', '{$memo}', {$sysCategory});\n";
    }

    return ["sql" => $result, "success" => true];
  }
}
