<?php

namespace Home\DAO;

/**
 * FId一览 DAO
 *
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
class FIdListDAO extends PSIBaseExDAO
{

  /**
   * 查询全部FId数据
   */
  public function fidList()
  {
    $db = $this->db;

    $result = [];

    $sql = "select fid, code, py, name from t_fid order by code";
    $data = $db->query($sql);

    foreach ($data as $v) {
      $result[] = [
        "fid" => $v["fid"],
        "code" => $v["code"],
        "name" => $v["name"],
        "py" => $v["py"],
        "category" => "系统固有",
        "sln" => "SLN0000 - PSI低代码应用平台",
      ];
    }

    return $result;
  }
}
