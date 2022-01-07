<?php

namespace Home\DAO;

/**
 * 解决方案DAO
 *
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
class SolutionDAO extends PSIBaseExDAO
{

  /**
   * 解决方案列表
   */
  public function solutionList()
  {
    $db = $this->db;

    $sql = "select id, code, name
            from t_solution
            order by code";
    $data = $db->query($sql);

    $result = [];
    foreach ($data as $v) {
      $result[] = [
        "id" => $v["id"],
        "code" => $v["code"],
        "name" => $v["name"]
      ];
    }

    return $result;
  }
}
