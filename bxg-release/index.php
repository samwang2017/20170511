<?php

    // phpinfo();exit;

    // 通过PHP来获得地址的信息
    // 根地址的信息执行不同的逻辑

    // 如何获得地址信息？

    // PHP 通过$_GET可以获得 get 方式发送的请求
    // PHP 通过$_POST可以获得 post 方式发送的请求
    // PHP 通过$_FILES可以获得 上传的文件

    // PHP 还提供了 $_SERVER 可以获得服务器信息

    // var_dump($_SERVER);

    // 通过$_SERVER['PATH_INFO']可以获得地址的部分信息
    // 通过此信息可以调整输出的内容

    $pathinfo = $_SERVER['PATH_INFO'];

    // echo $pathinfo;

    // include './views' . $pathinfo . '.html';


    // 当网站规模较大时，页面也会增多
    // 需要处理的逻辑也就会变复杂

    // 这时有必对路由进行设计，以达到优化目的

    // 通过分析博学谷项目发现页面基本是两层结构
    // 例如讲师管理包含 添加讲师、修改讲师、讲师列表
    // 课程管理包含 基本信息、图片信息、课时信息等
    
    // 页面分成两层结构
    // 地址也需要做出相应的调整，地址也需要是两层

    // 例如 bxg.com/index.php/index/index
    // views/index/index.html
    // 例如 bxg.com/index.php/teacher/index
    // views/teacher/index.html

    // 如何访问 teacher/manage.html?
    // bxg.com/index.php/teacher/manage

    // $pathinfo 就包含了路径的两部分

    // 为了保证地址和灵活性，地址需要支持一层结构
    // bxg.com/index
    // bxg.com/login
    // 假如是一层结构，默认采的目录名称为 index
    // 如上相当于是 bxg.com/index/index
    // bxg.com/index/login

    // 和两层结构
    // box.com/teacher/index

    // 判断地址是一层结构还是两层

    // 将$pathinfo拆分成数组，然后判断数据情况得到地址的结构

    // 在PHP中如何将字符串拆成数组？
    // 使用explode()将字符串拆成数组

    $pathinfo = substr($pathinfo, 1);

    // echo '<br>';

    // echo $pathinfo;

    $route = explode('/', $pathinfo);

    // print_r($route);

    // PHP 使用empty()函数可以判断某个变量是否为空
    // 为空则为true，否则false

    // var_dump(empty($pathinfo));
    if(empty($pathinfo)) {
        $path = 'index/index';
    } else if(count($route) == 1) { // 判断数组长度为1
        $path = 'index/' . $route[0];
    } else { // 判断数组长度为2
        $path = $route[0] . '/' . $route[1];
    }

    // echo $path;

    include './views/' . $path . '.html';

