<?php

namespace Home\Controller;

use Home\Service\BizlogService;

/**
 * 实施指南导航Controller
 * 
 * 各个模块先访问本Controller的Action，然后由Action跳转到对于的指南HTML页面
 *
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
class HelpController extends PSIBaseController
{

  public function index()
  {
    $bs = new BizlogService();

    $key = I("get.t");
    switch ($key) {
      case "login":
        // 用户直接访问登录实施指南的时候，多半还没有登录所以没法记录业务日志
        redirect("/help/user/10.html");
        break;
      case "user":
        $bs->insertBizlog("访问实施指南页面：用户管理", "实施指南");
        redirect("/help/admin/02-01.html");
        break;
      case "priceSystem":
        $bs->insertBizlog("访问实施指南页面：价格体系", "实施指南");
        redirect("/help/admin/02-04-03.html");
        break;
      case "initInv":
        $bs->insertBizlog("访问实施指南页面：库存建账", "实施指南");
        redirect("/help/admin/02-06.html");
        break;
      case "permission":
        $bs->insertBizlog("访问实施指南页面：权限管理", "实施指南");
        redirect("/help/admin/02-02.html");
        break;
      case "bizlog":
        $bs->insertBizlog("访问实施指南页面：业务日志", "实施指南");
        redirect("/help/admin/03.html");
        break;
      case "warehouse":
        $bs->insertBizlog("访问实施指南页面：仓库", "实施指南");
        redirect("/help/admin/02-05.html");
        break;
      case "goods":
        $bs->insertBizlog("访问实施指南页面：物料", "实施指南");
        redirect("/help/admin/02-04.html");
        break;
      case "goodsBrand":
        $bs->insertBizlog("访问实施指南页面：物料品牌", "实施指南");
        redirect("/help/admin/02-04-02.html");
        break;
      case "goodsUnit":
        $bs->insertBizlog("访问实施指南页面：物料计量单位", "实施指南");
        redirect("/help/admin/02-04-01.html");
        break;
      case "supplier":
        $bs->insertBizlog("访问实施指南页面：供应商档案", "实施指南");
        redirect("/help/admin/02-07.html");
        break;
      case "customer":
        $bs->insertBizlog("访问实施指南页面：客户资料", "实施指南");
        redirect("/help/admin/02-08.html");
        break;
      case "bizconfig":
        $bs->insertBizlog("访问实施指南页面：业务设置", "实施指南");
        redirect("/help/admin/02-03.html");
        break;
      case "pobill":
        $bs->insertBizlog("访问实施指南页面：采购订单", "实施指南");
        redirect("/help/user/20-01.html");
        break;
      case "pwbill":
        $bs->insertBizlog("访问实施指南页面：采购入库", "实施指南");
        redirect("/help/user/20-02.html");
        break;
      case "prbill":
        $bs->insertBizlog("访问实施指南页面：采购退货出库", "实施指南");
        redirect("/help/user/20-03.html");
        break;
      case "sobill":
        $bs->insertBizlog("访问实施指南页面：销售订单", "实施指南");
        redirect("/help/user/30-01.html");
        break;
      case "wsbill":
        $bs->insertBizlog("访问实施指南页面：销售出库", "实施指南");
        redirect("/help/user/30-02.html");
        break;
      case "srbill":
        $bs->insertBizlog("访问实施指南页面：销售退货入库", "实施指南");
        redirect("/help/user/30-03.html");
        break;
      case "itbill":
        $bs->insertBizlog("访问实施指南页面：库间调拨", "实施指南");
        redirect("/help/user/40-01.html");
        break;
      case "icbill":
        $bs->insertBizlog("访问实施指南页面：库存盘点", "实施指南");
        redirect("/help/user/40-02.html");
        break;
      case "dataOrg":
        $bs->insertBizlog("访问实施指南页面：数据域应用详解", "实施指南");
        redirect("/help/admin/05.html");
        break;
      case "commBill":
        $bs->insertBizlog("访问实施指南页面：表单通用操作", "实施指南");
        redirect("/help/user/00.html");
        break;
      case "scbill":
        $bs->insertBizlog("访问实施指南页面：销售合同", "实施指南");
        redirect("/help/user/30-04.html");
        break;
      case "costWeight":
        $bs->insertBizlog("访问实施指南页面：BOM-成本分摊权重", "实施指南");
        redirect("/help/admin/02-04-04.html");
        break;
      case "wspbill":
        $bs->insertBizlog("访问实施指南页面：存货拆分", "实施指南");
        redirect("/help/user/60-01.html");
        break;
      case "factory":
        $bs->insertBizlog("访问实施指南页面：工厂", "实施指南");
        redirect("/help/admin/02-09.html");
        break;
      case "dmobill":
        $bs->insertBizlog("访问实施指南页面：成品委托生产订单", "实施指南");
        redirect("/help/user/60-02.html");
        break;
      case "dmwbill":
        $bs->insertBizlog("访问实施指南页面：成品委托生产入库", "实施指南");
        redirect("/help/user/60-03.html");
        break;
      case "mainMenuMaintain":
        $bs->insertBizlog("访问实施指南页面：主菜单维护", "实施指南");
        redirect("/help/dev/lcap/08-01.html");
        break;
      case "sysdict":
        $bs->insertBizlog("访问实施指南页面：系统数据字典", "实施指南");
        redirect("/help/dev/lcap/08-02.html");
        break;
      case "codetable":
        $bs->insertBizlog("访问实施指南页面：码表设置", "实施指南");
        redirect("/help/dev/lcap/08-03.html");
        break;
      case "formview":
        $bs->insertBizlog("访问实施指南页面：视图开发助手", "实施指南");
        redirect("/help/dev/lcap/08-04.html");
        break;
      case "solution":
        $bs->insertBizlog("访问实施指南页面：解决方案", "实施指南");
        redirect("/help/dev/lcap/08-05.html");
        break;
      case "fromShortcut":
        // 快捷访问
        $bs->insertBizlog("通过快捷访问进入实施指南页面", "快捷访问");
        redirect("/help/index.html");
        break;
      default:
        $bs->insertBizlog("通过主菜单进入实施指南页面", "实施指南");
        redirect("/help/index.html");
    }
  }
}
