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

    // t_fid中的均为 系统固有和SLN0000
    $category = "系统固有";
    $sln = "SLN0000 - PSI低代码应用平台";

    $sql = "select fid, code, py, name from t_fid order by fid";
    $data = $db->query($sql);

    foreach ($data as $v) {
      $result[] = [
        "fid" => $v["fid"],
        "code" => $v["code"],
        "name" => $v["name"],
        "py" => $v["py"],
        "category" => $category,
        "sln" => $sln,
      ];
    }

    // t_fid_plus 由码表设置、自定义表单、视图开发助手等模块添加的Fid
    $sql = "select fid, code, py, name from t_fid_plus order by fid";
    $data = $db->query($sql);

    foreach ($data as $v) {
      $fid = $v["fid"];
      $item = [
        "fid" => $fid,
        "code" => $v["code"],
        "name" => $v["name"],
        "py" => $v["py"],
      ];

      $category = "";
      $sln = "";
      if (substr($fid, 0, 2) == "ct") {
        // 码表
        $category = "码表";

        $sql = "select s.name, m.sln_code
                from t_code_table_md m, t_solution s
                where m.sln_code = s.code and m.fid = '%s' ";
        $d = $db->query($sql, $fid);
        if ($d) {
          $n = $d[0]["name"];
          $c = $d[0]["sln_code"];
          $sln = "{$c} - {$n}";
        } else {
          $sln = "未查询到解决方案";
        }
      } else {
        // TODO 其他模块的查询逻辑
        $category = "待处理";
      }

      $item["category"] = $category;
      $item["sln"] = $sln;

      $result[] = $item;
    }

    return $result;
  }

  /**
   * 编辑fid
   */
  public function editFId(&$params)
  {
    $db = $this->db;

    $fid = $params["fid"];
    $code = strtoupper(trim($params["code"]));
    $py = strtoupper(trim($params["py"]));

    if (!$fid) {
      return $this->badParam("fid");
    }
    if (!$py) {
      return $this->bad("拼音字头不能为空");
    }

    $sql = "select count(*) as cnt from t_fid where fid = '%s' ";
    $data = $db->query($sql, $fid);
    $cnt = $data[0]["cnt"];
    if ($cnt == 1) {
      $sql = "update t_fid
              set code = '%s', py = '%s'
              where fid = '%s' ";
      $rc = $db->execute($sql, $code, $py, $fid);
      if ($rc === false) {
        return $this->sqlError(__METHOD__, __LINE__);
      }
    } else {
      $sql = "select count(*) as cnt from t_fid_plus where fid = '%s' ";
      $data = $db->query($sql, $fid);
      $cnt = $data[0]["cnt"];
      if ($cnt == 1) {
        $sql = "update t_fid_plus
                set code = '%s', py = '%s'
                where fid = '%s' ";
        $rc = $db->execute($sql, $code, $py, $fid);
        if ($rc === false) {
          return $this->sqlError(__METHOD__, __LINE__);
        }
      } else {
        return $this->bad("fid:{$fid} 不存在");
      }
    }

    // 操作成功
    $params["log"] = "编辑fid：{$fid} 的编码和拼音字头";
    return null;
  }
}
