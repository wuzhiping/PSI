<?php

namespace Home\Controller;

use Home\Common\FIdConst;
use Home\Service\UserService;

/**
 * 首页Controller
 *
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
class IndexController extends PSIBaseController
{

  /**
   * 首页
   */
  public function index()
  {
    $us = new UserService();

    if ($us->hasPermission()) {
      $this->initVar();

      $this->assign("title", "首页");

      $this->assign("pSale", $us->hasPermission(FIdConst::PORTAL_SALE) ? 1 : 0);
      $this->assign("pInventory", $us->hasPermission(FIdConst::PORTAL_INVENTORY) ? 1 : 0);
      $this->assign("pPurchase", $us->hasPermission(FIdConst::PORTAL_PURCHASE) ? 1 : 0);
      $this->assign("pMoney", $us->hasPermission(FIdConst::PORTAL_MONEY) ? 1 : 0);

      $this->display();
    } else {
      $this->gotoLoginPage();
    }
  }
}
