<?php

namespace Home\Controller;

use Home\Common\FIdConst;
use Home\Service\UserService;
use Home\Service\SysDictService;

/**
 * 系统数据字典Controller
 *
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
class SysDictController extends PSIBaseController
{

  /**
   * 系统数据字典 - 主页面
   * 
   * web\Application\Home\View\SysDict\index.html
   */
  public function index()
  {
    $us = new UserService();

    if ($us->hasPermission(FIdConst::SYS_DICT)) {
      $this->initVar();

      $this->assign("title", "系统数据字典");

      $this->display();
    } else {
      $this->gotoLoginPage("/Home/SysDict/index");
    }
  }

  /**
   * 数据字典分类列表
   * 
   * JS: web\Public\Scripts\PSI\SysDict\MainForm.js
   */
  public function categoryList()
  {
    if (IS_POST) {
      $us = new UserService();
      if (!$us->hasPermission(FIdConst::SYS_DICT)) {
        die("没有权限");
      }

      $service = new SysDictService();
      $this->ajaxReturn($service->categoryList());
    }
  }

  /**
   * 某个分类下的数据字典
   * 
   * JS: web\Public\Scripts\PSI\SysDict\MainForm.js
   */
  public function sysDictList()
  {
    if (IS_POST) {
      $us = new UserService();
      if (!$us->hasPermission(FIdConst::SYS_DICT)) {
        die("没有权限");
      }

      $params = [
        "categoryId" => I("post.categoryId")
      ];

      $service = new SysDictService();
      $this->ajaxReturn($service->sysDictList($params));
    }
  }

  /**
   * 查询某个码表的数据
   * 
   * JS: web\Public\Scripts\PSI\SysDict\MainForm.js
   */
  public function dictDataList()
  {
    if (IS_POST) {
      $us = new UserService();
      if (!$us->hasPermission(FIdConst::SYS_DICT)) {
        die("没有权限");
      }

      $params = [
        "id" => I("post.id")
      ];

      $service = new SysDictService();
      $this->ajaxReturn($service->dictDataList($params));
    }
  }
}
