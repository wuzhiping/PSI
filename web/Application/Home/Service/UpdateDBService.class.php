<?php

namespace Home\Service;

/**
 * 数据库升级Service
 *
 * @author 李静波
 */
class UpdateDBService extends PSIBaseService
{

  /**
   *
   * @var \Think\Model
   */
  private $db;

  public function updateDatabase()
  {
    if ($this->isNotOnline()) {
      return $this->notOnlineError();
    }

    // 脚本执行最长时间设置为5分钟
    ini_set("max_execution_time", 60 * 5);

    $db = M();

    $this->db = $db;

    // -----------------------------------------------------
    //
    // 2021-6-10 调整代码
    // 以 PSI2022 built2021-6-10 14:50为基线做后续版本的升级更新
    // 
    // -----------------------------------------------------

    // 检查t_psi_db_version中的版本号
    $sql = "select db_version from t_psi_db_version";
    $data = $db->query($sql);
    $dbVersion = $data[0]["db_version"];
    if ($dbVersion == $this->CURRENT_DB_VERSION) {
      return $this->bad("当前数据库是最新版本，不用升级");
    }

    $service2022 = new UpdateDB2022Service($db);
    $service2022->update();

    $sql = "delete from t_psi_db_version";
    $db->execute($sql);
    $sql = "insert into t_psi_db_version (db_version, update_dt) 
            values ('%s', now())";
    $db->execute($sql, $this->CURRENT_DB_VERSION);

    $bl = new BizlogService();
    $bl->insertBizlog("升级数据库表结构，数据库表结构版本 = " . $this->CURRENT_DB_VERSION);

    return $this->ok();
  }
}
