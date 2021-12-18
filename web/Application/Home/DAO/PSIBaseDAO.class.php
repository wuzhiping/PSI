<?php

namespace Home\DAO;

/**
 * PSI DAO 基类
 *
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
class PSIBaseDAO
{

  /**
   * 操作失败
   *
   * @param string $msg
   *        	错误信息
   * @return array
   */
  protected function bad($msg)
  {
    return [
      "success" => false,
      "msg" => $msg
    ];
  }

  /**
   * 数据库错误
   *
   * @param string $methodName
   *        	方法名称
   * @param int $codeLine
   *        	代码行号
   * @return array
   */
  protected function sqlError($methodName, $codeLine)
  {
    $info = "数据库错误，请联系管理员<br />错误定位：{$methodName} - {$codeLine}行";
    return $this->bad($info);
  }

  /**
   * 把时间类型格式化成类似2015-08-13的格式
   *
   * @param string $d        	
   * @return string
   */
  protected function toYMD($d)
  {
    if ($d == "0000-00-00 00:00:00") {
      return "";
    }

    return date("Y-m-d", strtotime($d));
  }

  /**
   * 当前功能还没有开发
   *
   * @param string $info
   *        	附加信息
   * @return array
   */
  protected function todo($info = null)
  {
    if ($info) {
      return [
        "success" => false,
        "msg" => "TODO: 功能还没开发, 附加信息：$info"
      ];
    } else {
      return [
        "success" => false,
        "msg" => "TODO: 功能还没开发"
      ];
    }
  }
}
