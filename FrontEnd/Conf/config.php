<?php
return array(
	//'配置项'=>'配置值'
	//数据库配置信息
    'DB_TYPE'   => 'mysql', // 数据库类型
    'DB_HOST'   => 'localhost', // 服务器地址
    'DB_NAME'   => 'visitingcard', // 数据库名
    'DB_USER'   => 'root', // 用户名
    'DB_PWD'    => '417swsr', // 密码
    'DB_PORT'   => 3306, // 端口
    'DB_PREFIX' => 'pmc_', // 数据库表前缀 

    //默认错误跳转对应的模板文件
	'TMPL_ACTION_ERROR' => APP_PATH . 'Tpl/dispatch_jump.tpl',
	//默认成功跳转对应的模板文件
	'TMPL_ACTION_SUCCESS' => APP_PATH . 'Tpl/dispatch_jump.tpl'
);
?>