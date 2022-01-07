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

  private function checkParams($params)
  {
    $code = trim($params["code"]);
    $name = trim($params["name"]);

    if (!$code) {
      return $this->bad("没有录入解决方案编码");
    }
    if (strlen($code) > 20) {
      return $this->bad("解决方案编码长度不能超过20位");
    }

    if (!$name) {
      return $this->bad("没有录入解决方案名称");
    }
    if (strlen($code) > 50) {
      return $this->bad("解决方案名称长度不能超过50位");
    }

    // 没有错误
    return null;
  }

  /**
   * 新建解决方案
   */
  public function addSolution(&$params)
  {
    $rc = $this->checkParams($params);
    if ($rc) {
      return $rc;
    }

    $db = $this->db;
    $code = strtoupper(trim($params["code"]));
    $name = trim($params["name"]);

    // 检查编码是否存在
    $sql = "select count(*) as cnt from t_solution where code = '%s' ";
    $data = $db->query($sql, $code);
    $cnt = $data[0]["cnt"];
    if ($cnt > 0) {
      return $this->bad("编码[{$code}]已经存在");
    }
    // 检查名称是否已经存在
    $sql = "select count(*) as cnt from t_solution where name = '%s' ";
    $data = $db->query($sql, $name);
    $cnt = $data[0]["cnt"];
    if ($cnt > 0) {
      return $this->bad("解决方案[{$name}]已经存在");
    }

    $id = $this->newId();
    $sql = "insert into t_solution(id, code, name)
            values ('%s', '%s', '%s')";
    $rc = $db->execute($sql, $id, $code, $name);
    if ($rc === false) {
      return $this->sqlError(__METHOD__, __LINE__);
    }

    // 操作成功
    $params["id"] = $id;
    return null;
  }

  /**
   * 编辑解决方案
   */
  public function updateSolution(&$params)
  {
    return $this->todo();
  }
}
