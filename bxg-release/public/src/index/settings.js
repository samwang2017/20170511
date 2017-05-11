
define(['jquery', 'template', 'ckeditor', 'validate', 'form', 'region','datepicker', 'language', 'uploadify'], function ($, template, CKEDITOR) {

    var settings = $('#settings'),
        html;

    // 先将讲师的基本信息获取，然后进行完善
    $.ajax({
        url: '/api/teacher/profile',
        type: 'get',
        success: function (info) {
            console.log(info)
            // 调用模板引擎
            html = template('settingsTpl', info.result);

            settings.find('form').html(html);

            // 富文本
            CKEDITOR.replace('ckeditor', {
                toolbarGroups: [
                    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                    { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
                    { name: 'links' },
                    { name: 'insert' },
                    { name: 'forms' },
                    { name: 'tools' },
                    { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
                    { name: 'others' },
                    '/',
                    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                    { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                    { name: 'styles' },
                    { name: 'colors' },
                    { name: 'about' }
                ]
            });

            // 省市县
            $('.hometown').region({
                url: '/public/assets/jquery-region/region.json'
            });

            // 表单处理
            settings.find('form').validate({
                sendForm: false,
                onKeyup: true,
                eachValidField: function () {
                    // this 指是任意合法的表单项（input、select等）
                },
                eachInvalidField: function () {
                    // this 指是任意不合法的表单项（input、select等）
                },
                valid: function () {
                    // 提交ckeditor数据
                    for(instance in CKEDITOR.instances) {
                        CKEDITOR.instances[instance].updateElement();
                    }
                    // this 指的是当前被验证的表单
                    $(this).ajaxSubmit({
                        url: '/api/teacher/modify',
                        type: 'post',
                        success: function (info) {
                            console.log(info)
                        }
                    });
                },
                description: {
                    // 错误信息描述
                }
            });

            // 头像上传
            $('#upfile').uploadify({
                width: 120,
                height: 120,
                buttonText: '',
                fileTypeExts: '*.jpg; *.png',
                fileSizeLimit: '2MB',
                swf: '/public/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/avatar',
                fileObjName: 'tc_avatar',
                onUploadSuccess: function (file, data) {
                    // data 是json字符串
                    data = JSON.parse(data);
                    console.log(data);

                    $('.preview img').attr('src', data.result.path);
                }
            });
        }
    })

})