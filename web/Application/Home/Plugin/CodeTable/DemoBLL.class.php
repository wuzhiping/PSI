<?php

namespace Home\Plugin\CodeTable;

/**
 * 码表的示例自定义业务逻辑处理class
 * BLL 是Business Logic Layer的缩写，推荐使用该后缀作为惯例
 *
 * @author 艾格林门信息服务（大连）有限公司
 * @copyright 2015 - present
 * @license GPL v3
 */
class DemoBLL
{
  /**
   * 在一个码表记录删除之前做的自定义业务逻辑判断
   * @param $db 数据库对象
   * @param $fid fid
   * @param $id 码表记录id
   * @return null|string;
   *    null : 表示可以执行删除操作; 返回字符串则会作为提示信息返回给用户，同时不执行删除操作（数据库事务会回滚）
   */
  public function beforeDelete($db, $fid, $id)
  {
    // 在本方法中使用$db的时候不要启动事务，因为当前已经处于事务中

    // 用法1：
    // 下面是返回信息给用户，同时不执行删除
    $m = __METHOD__;
    return "本信息来自演示代码[{$m}]，不能删除当前记录";

    // 用法2：
    /**
     * return null就会允许删除操作，
     * 这里用的是PSI的DAO中的惯例：没有消息就是最好的消息，null表示操作成功
     */
    //return null;
  }

  /**
   * 在一个码表记录新增之后做的自定义业务逻辑处理
   * @param $db 数据库对象
   * @param $fid fid
   * @param $id 码表记录id
   * @return null|string
   *    null : 表示可以继续执行新增操作; 返回字符串则会作为提示信息返回给用户，同时不执行新增操作（数据库事务会回滚）
   */
  public function afterAdd($db, $fid, $id)
  {
    // 在本方法中使用$db的时候不要启动事务，因为当前已经处于事务中

    // 用法1：
    // 下面是返回信息给用户，同时不执行新增
    $m = __METHOD__;
    return "本信息来自演示代码[{$m}]，不能新增当前记录";

    // 用法2：
    /**
     * return null就会允许删除操作，
     * 这里用的是PSI的DAO中的惯例：没有消息就是最好的消息，null表示操作成功
     */
    //return null;
  }

  /**
   * 在一个码表记录编辑之后做的自定义业务逻辑处理
   * @param $db 数据库对象
   * @param $fid fid
   * @param $id 码表记录id
   * @return null|string; 
   *    null : 表示可以继续执行编辑操作; 返回字符串则会作为提示信息返回给用户，同时不执行编辑操作（数据库事务会回滚）
   */
  public function afterUpdate($db, $fid, $id)
  {
    // 在本方法中使用$db的时候不要启动事务，因为当前已经处于事务中

    // 用法1：
    // 下面是返回信息给用户，同时不执行编辑
    $m = __METHOD__;
    return "本信息来自演示代码[{$m}]，不能编辑当前记录";

    // 用法2：
    /**
     * return null就会允许删除操作，
     * 这里用的是PSI的DAO中的惯例：没有消息就是最好的消息，null表示操作成功
     */
    //return null;
  }

  /**
   * 获得码表的默认值，其触发时机是新建一个码表记录的时候
   * 
   * @param $db 数据库对象
   * @param $fid fid
   * @return null|array; 
   *    null : 表示码表的默认值均不需要后台PHP代码处理
   */
  public function getDefaultValues($db, $fid)
  {
    // 在本方法中使用$db的时候不要启动事务，因为当前已经处于事务中

    // 用法1 返回array
    return [
      // 该字段有默认值
      "db_field_name1" => "defalut value1",
      "db_field_name2" => "defalut value2",
      // ...
    ];

    // 用法2 返回null
    // 当码表的默认值均不需要后台PHP代码处理时候，返回null
    // 这样可以简化一些逻辑判断
    // return null;
  }
}
