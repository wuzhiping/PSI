<?php

namespace Home\Controller;

use Home\Common\FIdConst;
use Home\Service\SOBillService;
use Home\Service\SRBillService;
use Home\Service\UserService;
use Home\Service\WSBillService;

/**
 * 销售退货入库Controller
 *
 * @author 李静波
 *        
 */
class SaleRejController extends PSIBaseController
{
  /**
   * 销售退货入库 - 主界面
   */
  public function srIndex()
  {
    $us = new UserService();

    if ($us->hasPermission(FIdConst::SALE_REJECTION)) {
      $this->initVar();

      $this->assign("title", "销售退货入库");

      $this->assign("pAdd", $us->hasPermission(FIdConst::SALE_REJECTION_ADD) ? "1" : "0");
      $this->assign("pEdit", $us->hasPermission(FIdConst::SALE_REJECTION_EDIT) ? "1" : "0");
      $this->assign(
        "pDelete",
        $us->hasPermission(FIdConst::SALE_REJECTION_DELETE) ? "1" : "0"
      );
      $this->assign(
        "pCommit",
        $us->hasPermission(FIdConst::SALE_REJECTION_COMMIT) ? "1" : "0"
      );
      $this->assign("pGenPDF", $us->hasPermission(FIdConst::SALE_REJECTION_PDF) ? "1" : "0");
      $this->assign("pPrint", $us->hasPermission(FIdConst::SALE_REJECTION_PRINT) ? "1" : "0");

      $this->display();
    } else {
      $this->gotoLoginPage("/Home/Sale/srIndex");
    }
  }

  /**
   * 销售退货入库单主表信息列表
   */
  public function srbillList()
  {
    if (IS_POST) {
      $params = [
        "billStatus" => I("post.billStatus"),
        "ref" => I("post.ref"),
        "fromDT" => I("post.fromDT"),
        "toDT" => I("post.toDT"),
        "warehouseId" => I("post.warehouseId"),
        "customerId" => I("post.customerId"),
        "paymentType" => I("post.paymentType"),
        "sn" => I("post.sn"),
        "goodsId" => I("post.goodsId"),
        "page" => I("post.page"),
        "start" => I("post.start"),
        "limit" => I("post.limit")
      ];

      $sr = new SRBillService();
      $this->ajaxReturn($sr->srbillList($params));
    }
  }

  /**
   * 销售退货入库单明细信息列表
   */
  public function srBillDetailList()
  {
    if (IS_POST) {
      $params = [
        "id" => I("post.billId")
      ];

      $sr = new SRBillService();
      $this->ajaxReturn($sr->srBillDetailList($params));
    }
  }

  /**
   * 获得销售退货入库单的信息
   */
  public function srBillInfo()
  {
    if (IS_POST) {
      $params = [
        "id" => I("post.id")
      ];

      $rs = new SRBillService();
      $this->ajaxReturn($rs->srBillInfo($params));
    }
  }

  /**
   * 选择销售出库单 - 在销售退货入库中使用
   */
  public function selectWSBillList()
  {
    if (IS_POST) {
      $params = [
        "ref" => I("post.ref"),
        "customerId" => I("post.customerId"),
        "warehouseId" => I("post.warehouseId"),
        "fromDT" => I("post.fromDT"),
        "toDT" => I("post.toDT"),
        "sn" => I("post.sn"),
        "page" => I("post.page"),
        "start" => I("post.start"),
        "limit" => I("post.limit")
      ];

      $rs = new SRBillService();
      $this->ajaxReturn($rs->selectWSBillList($params));
    }
  }

  /**
   * 新增或者编辑销售退货入库单
   */
  public function editSRBill()
  {
    if (IS_POST) {
      $params = [
        "jsonStr" => I("post.jsonStr")
      ];

      $rs = new SRBillService();
      $this->ajaxReturn($rs->editSRBill($params));
    }
  }

  /**
   * 查询要退货的销售出库单信息
   */
  public function getWSBillInfoForSRBill()
  {
    if (IS_POST) {
      $params = [
        "id" => I("post.id")
      ];

      $rs = new SRBillService();
      $this->ajaxReturn($rs->getWSBillInfoForSRBill($params));
    }
  }

  /**
   * 删除销售退货入库单
   */
  public function deleteSRBill()
  {
    if (IS_POST) {
      $params = [
        "id" => I("post.id")
      ];

      $rs = new SRBillService();
      $this->ajaxReturn($rs->deleteSRBill($params));
    }
  }

  /**
   * 提交销售退货入库单
   */
  public function commitSRBill()
  {
    if (IS_POST) {
      $params = [
        "id" => I("post.id")
      ];

      $rs = new SRBillService();
      $this->ajaxReturn($rs->commitSRBill($params));
    }
  }



  /**
   * 销售退货入库单生成pdf文件
   */
  public function srBillPdf()
  {
    $params = [
      "ref" => I("get.ref")
    ];

    $ws = new SRBillService();
    $ws->pdf($params);
  }

  /**
   * 销售出库单明细信息列表
   * 销售退货入库 - 选择销售出库单
   */
  public function wsBillDetailListForSRBill()
  {
    if (IS_POST) {
      $params = [
        "billId" => I("post.billId")
      ];

      $ws = new WSBillService();
      $this->ajaxReturn($ws->wsBillDetailListForSRBill($params));
    }
  }

  /**
   * 生成打印销售退货入库单的页面
   */
  public function genSRBillPrintPage()
  {
    if (IS_POST) {
      $params = [
        "id" => I("post.id")
      ];

      $ss = new SRBillService();
      $data = $ss->getSRBillDataForLodopPrint($params);
      $this->assign("data", $data);
      $this->display();
    }
  }
}