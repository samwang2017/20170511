<?php

/**
*phpinfo();exit;
*
*$_GET()
*$_POST()
*$_FILES()
*$_SERVER
*var_dump($_SERVER)
*$_SERVER('PATH_INFO')
*
*
*
*
*
*
*
**/


$pathinfo=$_SERVER['PATH_INFO'];

$pathinfo=substr($pathinfo,1);
$route=explode('/',$pathinfo);
if(empty($pathinfo)){
	$path='index/index';
}else if(count($route)==1){
	// 判断数组长度是一
	$path='index/'.$route[0];
}else{
	// 判断数组长度是2
	$path=$route[0].''.$route[1];
}

include './views/'.$path.'html';

?>