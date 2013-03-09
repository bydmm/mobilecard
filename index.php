<?php
define('APP_NAME','FrontEnd');
define('APP_PATH','./FrontEnd/');
//开启调试模式
define('APP_DEBUG', true);

// 采用rest模式运行 
// define('MODE_NAME', 'rest');

//url常量
define('PUBLIC', 'Public/');
define('IMAGES', 'Public/images');
define('CSS', 'Public/css');
define('JS', 'Public/js');
define('EDITOR', 'Public/editor');

require 'ThinkPHP/ThinkPHP.php';