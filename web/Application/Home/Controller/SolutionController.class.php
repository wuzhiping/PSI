<?php

namespace Home\Controller;

use Home\Common\FIdConst;
use Home\Service\SolutionService;
use Home\Service\UserService;

/**
 * 解决方案Controller
 *
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
class SolutionController extends PSIBaseController
{
  /**
   * 解决方案 - 主页面
   */
  public function index()
  {
    $us = new UserService();
    if ($us->hasPermission(FIdConst::SOLUTION)) {
      $this->initVar();

      $this->assign("title", "解决方案");

      $this->display();
    } else {
      $this->gotoLoginPage("/Home/Solution/index");
    }
  }

  /**
   * 解决方案列表
   */
  public function solutionList()
  {
    if (IS_POST) {
      $us = new UserService();
      if (!$us->hasPermission(FIdConst::SOLUTION)) {
        die("没有权限");
      }

      $service = new SolutionService();
      $this->ajaxReturn($service->solutionList());
    }
  }
}
