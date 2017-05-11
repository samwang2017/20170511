
define(['jquery', '../utils', 'template'], function ($, utils, template) {
    // 设置导航
    utils.setMenu('/teacher/index');

    // 全局获取（起到缓存的作用）
    var teacherList = $('#teacherList'),
        teacherModal = $('#teacherModal'),
        html;

    // 发送请求身服务器要数据
    // /api http://api.botue.com
    $.ajax({
        url: '/api/teacher',
        type: 'get',
        success: function (info) {

            // 调用模板引擎
            html = template('teacherTpl', {teachers: info.result});
            // 添加DOM元素
            teacherList.find('tbody').html(html);
        }
    })

    // 显示模态框
    teacherList.on('click', '.view', function () {
        // 获取讲师id
        var tc_id = $(this).parent().attr('data-id');

        // 发送请求，根据tc_id获取讲师详细信息
        $.ajax({
            url: '/api/teacher/view',
            type: 'get',
            data: {tc_id: tc_id},
            success: function (info) {

                // 调整省市县显示格式
                info.result.tc_hometown = info.result.tc_hometown.split('|').join(' ');

                // 调用模板引擎
                html = template('modalTpl', info.result);
                // 添加DOM 
                teacherModal.find('table').html(html);
                // 显示模态框
                teacherModal.modal();
            }
        })
    })

    // 注销/启用讲师
    teacherList.on('click', '.handle', function () {

        // tc_status 值为0(启用状态) 值为1(注销状态)

        var _this = $(this),
            // 获得讲师id
            tc_id = _this.parent().attr('data-id'),
            // 获得讲师当前状态
            tc_status = _this.attr('data-status');

        $.ajax({
            url: '/api/teacher/handle',
            type: 'post',
            // 将讲师当前的状态发送给服务端
            data: {tc_id: tc_id, tc_status: tc_status},
            success: function (info) {
                // 服务端返回的是修改后的状态
                // console.log(info);
                // 返回结果 如果 info.result.tc_status为0
                // 文字应该为注销
                // 返回结果 如果 info.result.tc_status为1
                // 文字应该为启用
                var text = info.result.tc_status == 0 ? '注 销' : '启 用';
                // 更改按钮文字
                _this.text(text);
                // 更新讲师状态（服务端返回的时修改后的状态）
                _this.attr('data-status', info.result.tc_status);
            }
        });

    })
});