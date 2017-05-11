
define(['jquery'], function () {

    return {
        setMenu: function (key) {
            // 根据key值来决定哪个导航链接可以被选中
            $('.navs a[href="'+ key +'"]')
            .addClass('active')
            .parents('ul').show();
        },
        qs: function (key) {
            // location.search 可以获取地址上的请求参数
            // location.search;
            var search = location.search.slice(1).split('&'),
                o = {};

            for(var i=0; i<search.length; i++) {
                var temp = search[i].split('=');

                o[temp[0]] = temp[1];
            }

            return o[key];
        }
    }
})