<?php

namespace Home\Controller;

use Home\Common\FIdConst;
use Home\Service\UserService;

/**
 * FId一览Controller
 *
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
class FIdListController extends PSIBaseController
{
  /**
   * FId一览 - 主页面
   * 
   * web\Application\Home\View\FIdList\index.html
   */
  public function index()
  {
    $us = new UserService();

    if ($us->hasPermission(FIdConst::FID_LIST)) {
      $this->initVar();

      $this->assign("title", "FId一览");

      $this->display();
    } else {
      $this->gotoLoginPage("/Home/FIdList");
    }
  }
}
