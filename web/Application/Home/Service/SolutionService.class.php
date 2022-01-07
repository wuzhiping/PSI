<?php

namespace Home\Service;

/**
 * 解决方案Service
 *
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
class SolutionService extends PSIBaseExService
{

  /**
   * 解决方案列表
   */
  public function solutionList($params)
  {
    if ($this->isNotOnline()) {
      return $this->emptyResult();
    }

    // $dao = new SolutionDAO($this->db());
    // return $dao->solutionList($params);
  }
}
