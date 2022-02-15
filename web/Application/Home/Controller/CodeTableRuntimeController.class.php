<?php

namespace Home\Controller;

use Home\Common\FIdConst;
use Home\Service\UserService;
use Home\Service\CodeTableRuntimeService;
use Home\Service\PinyinService;

/**
 * 码表运行时Controller
 *
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
class CodeTableRuntimeController extends PSIBaseController
{

  /**
   * 码表运行 - 主页面
   * 
   * web\Application\Home\View\CodeTableRuntime\index.html
   */
  public function index()
  {
    $fid = I("get.fid");

    $us = new UserService();
    if ($us->hasPermission($fid)) {
      $this->initVar();

      // 按钮权限：设计工具下的各个按钮权限
      $this->assign("pDesignTool", $us->hasPermission(FIdConst::CODE_TABLE) ? "1" : "0");


      $service = new CodeTableRuntimeService();
      $md = $service->getMetaDataByFid($fid);

      if ($md) {
        $this->assign("title", $md["title"]);
        $this->assign("fid", $fid);

        $this->display();
      } else {

        // 错误的fid，跳转到首页
        $this->gotoLoginPage("/Home");
      }
    } else {
      $this->gotoLoginPage("/Home/CodeTableRuntime/?fid={$fid}");
    }
  }

  /**
   * 查询码表元数据 - 运行界面用
   */
  public function getMetaDataForRuntime()
  {
    if (IS_POST) {
      $fid = I("post.fid");

      $us = new UserService();
      if (!$us->hasPermission($fid)) {
        die("没有权限");
      }

      $params = [
        "fid" => $fid
      ];

      $service = new CodeTableRuntimeService();
      $this->ajaxReturn($service->getMetaDataForRuntime($params));
    }
  }

  /**
   * 新增或编辑码表记录
   */
  public function editCodeTableRecord()
  {
    if (IS_POST) {
      $fid = I("post.fid");

      $us = new UserService();
      if (I("post.id")) {
        // 编辑
        if (!$us->hasPermission("{$fid}-update")) {
          die("没有权限");
        }
      } else {
        // 新增
        if (!$us->hasPermission("{$fid}-add")) {
          die("没有权限");
        }
      }

      $params = [
        "fid" => $fid
      ];

      $service = new CodeTableRuntimeService();

      $md = $service->getMetaDataForRuntime($params);

      $params["id"] = I("post.id");

      foreach ($md["cols"] as $colMd) {
        if ($colMd["isVisible"]) {
          $fieldName = $colMd["fieldName"];
          $params[$fieldName] = I("post.{$fieldName}");
        }
      }

      $params["code"] = strtoupper($params["code"]);

      $this->ajaxReturn($service->editCodeTableRecord($params));
    }
  }

  /**
   * 删除码表记录
   */
  public function deleteCodeTableRecord()
  {
    if (IS_POST) {
      $fid = I("post.fid");

      $us = new UserService();
      if (!$us->hasPermission("{$fid}-delete")) {
        die("没有权限");
      }

      $params = [
        "id" => I("post.id"),
        "fid" => $fid
      ];

      $service = new CodeTableRuntimeService();
      $this->ajaxReturn($service->deleteCodeTableRecord($params));
    }
  }

  /**
   * 码表记录列表
   */
  public function codeTableRecordList()
  {
    if (IS_POST) {
      $fid = I("post.fid");

      $us = new UserService();
      if (!$us->hasPermission($fid)) {
        die("没有权限");
      }

      $params = [
        "fid" => $fid,
        "start" => I("post.start"),
        "limit" => I("post.limit"),
      ];

      $service = new CodeTableRuntimeService();
      $this->ajaxReturn($service->codeTableRecordList($params));
    }
  }

  /**
   * 码表记录 - 树状结构
   */
  public function codeTableRecordListForTreeView()
  {
    if (IS_POST) {
      $fid = I("post.fid");

      $us = new UserService();
      if (!$us->hasPermission($fid)) {
        die("没有权限");
      }

      $params = [
        "fid" => $fid
      ];

      $service = new CodeTableRuntimeService();
      $this->ajaxReturn($service->codeTableRecordListForTreeView($params));
    }
  }

  /**
   * 查询码表记录的详情
   */
  public function recordInfo()
  {
    if (IS_POST) {
      $fid = I("post.fid");

      $us = new UserService();
      if (!$us->hasPermission($fid)) {
        die("没有权限");
      }

      $params = [
        "id" => I("post.id"),
        "fid" => $fid
      ];

      $service = new CodeTableRuntimeService();
      $this->ajaxReturn($service->recordInfo($params));
    }
  }

  /**
   * 码表记录引用字段 - 查询数据
   */
  public function queryDataForRecordRef()
  {
    if (IS_POST) {
      $fid = I("post.fid");

      $us = new UserService();
      if (!$us->hasPermission($fid . "-dataorg")) {
        die("没有权限");
      }

      $params = [
        "queryKey" => I("post.queryKey"),
        "fid" => $fid
      ];

      $service = new CodeTableRuntimeService();
      $this->ajaxReturn($service->queryDataForRecordRef($params));
    }
  }

  /**
   * 保存列视图布局
   */
  public function saveColViewLayout()
  {
    if (IS_POST) {
      $us = new UserService();
      if (!$us->hasPermission(FIdConst::CODE_TABLE)) {
        die("没有权限");
      }

      $params = [
        "fid" => I("post.fid"),
        "json" => I("post.json")
      ];

      $service = new CodeTableRuntimeService();
      $this->ajaxReturn($service->saveColViewLayout($params));
    }
  }
}
