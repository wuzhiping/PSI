<?php

namespace Home\Service;

use Home\DAO\FIdListDAO;
use Home\DAO\SysDictDAO;

/**
 * FId一览Service
 *
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
class FIdListService extends PSIBaseExService
{

  /**
   * 查询全部FId数据
   */
  public function fidList()
  {
    if ($this->isNotOnline()) {
      return $this->emptyResult();
    }

    $dao = new FIdListDAO($this->db());
    return $dao->fidList();
  }
}