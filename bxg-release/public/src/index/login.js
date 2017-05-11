
// 定义模块，此模块用来实现登录功能
define(['jquery', 'cookie'], function ($) {

    // 提供用户输入界面，用户输入登录信息，将用户的登录信息发送至服务端
    // 由服务端验证用户是否合法

    // 用户提交表单时将数据发送到服务端
    // 要将表单提交有两种方式 a) 鼠标点击 b) 回车
    // 有一个事件叫submit，当表单提交时触发
    $('#loginForm').on('submit', function () {

        // 获取用户输入的信息
        // 将这些信息发送到服务器

        // 发送信息有两种方式，一种使用表单的默认提交
        // 一种是xhr进行提交

        // 获得所有表单的数据（自动忽略没name属性的表单）
        var formData = $(this).serialize();
        // /api http://api.botue.com

        // 当我们访问 /api/login
        // 实际访问是自已本地的apache
        // apache发现你的地址上有api这个字符
        // apache会自动将请求转移到 http://api.botue.com
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: formData,
            success: function (info) {
                if(info.code == 200) {
                    alert('登录成功!');

                    // 将服务返回的用户信息
                    // 存到cookie中，方便其它页面使用
                    // cookie只能用来存存字符串
                    // console.log(info);
                    $.cookie('loginfo', JSON.stringify(info.result));

                    location.href = '/';
                }
            }
        })

        // 阻止默认行为（页面就不会被刷新了）
        return false;
    });

})