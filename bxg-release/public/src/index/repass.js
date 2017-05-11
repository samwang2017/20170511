
define(['jquery', 'form', 'validate'], function ($) {

    $('#repassForm').validate({
        sendForm: false,
        onKeyup: true,
        eachValidField: function () {},
        eachInvalidField: function () {},
        valid: function () {
            // 
            $(this).ajaxSubmit({
                url: '/api/teacher/repass',
                type: 'post',
                success: function (info) {
                    if(info.code == 200) {
                        alert('修改成功，下次登录生效！');
                    }
                }
            });
        },
        invalid: function () {
            alert('有某些不合法了');
        },
        conditional: {
            confirm: function () {
                // this 指向当前表单元素
                // console.log($(this).val());

                // 返回一个条件，如果条件值为 true 则合法
                // 否则不合法
                // return $(this).val() > 18;

                return $(this).val() == $('.pass').val();
            }
        },
        description: {
            repass: {
                required: '必须确认密码',
                conditional: '两次密码不一致'
            }
        }
    });

});