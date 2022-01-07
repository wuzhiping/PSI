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

  /**
   * 新建或编辑解决方案
   */
  public function editSolution()
  {
    if (IS_POST) {
      $us = new UserService();
      if (!$us->hasPermission(FIdConst::SOLUTION)) {
        die("没有权限");
      }

      $params = [
        "id" => I("post.id"),
        "code" => I("post.code"),
        "name" => I("post.name"),
      ];

      $service = new SolutionService();
      $this->ajaxReturn($service->editSolution($params));
    }
  }

  /**
   * 删除解决方案
   */
  public function deleteSolution()
  {
    if (IS_POST) {
      $us = new UserService();
      if (!$us->hasPermission(FIdConst::SOLUTION)) {
        die("没有权限");
      }

      $params = [
        "id" => I("post.id"),
      ];

      $service = new SolutionService();
      $this->ajaxReturn($service->deleteSolution($params));
    }
  }

  /**
   * 获得某个解决方案的详情
   */
  public function solutionInfo()
  {
    if (IS_POST) {
      $us = new UserService();
      if (!$us->hasPermission(FIdConst::SOLUTION)) {
        die("没有权限");
      }

      $params = [
        "id" => I("post.id"),
      ];

      $service = new SolutionService();
      $this->ajaxReturn($service->solutionInfo($params));
    }
  }
}
