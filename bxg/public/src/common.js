define(['jquery','template','nprogress','cookie'],function($,template,NProgress){
	NProgress.start();
	NProgress.done();

	// ajax loading
	$(document).ajaxStart(function(){
		$('.overlay').show();
	});

	$(document).ajaxStop(function(){
		setTimeout(function(){
			$('.overlay').hide();
		},300);
	});

	// 检测用户是否登陆
	if(document.cookie.indexOf('PHPSESSID')==-1&&location.pathname!='/login'){
		location.href='/login';
	}

	// 获取用户的登陆信息
	var loginfo=$.cookie('loginfo')&&JSON.parse($.cookie('loginfo'));

	// 定义模板
	var source='<div class="avatar img-circle">\
		<img src="<%= tc_avatar%>">\
		</div>\
		<h4><%= tc_name%></div>',

		// 编译模板
		render=template.compile(source),

		// 传递数据
		html=render(loginfo||{});

		// $('.aside .profile').append(html);

		// 推出登陆
		$('#logout').on('click',function(){
			$.ajax({
				url:'api/logout',
				type:'post',
				success:function(info){
					if(info.code==200){
						alert('logout success');
						location.href='/login';
					}
				}
			})
		});

		// 导航栏交互
		$('navs ul').prev('a').on('click',function(){
			$(this).next().slideToggle();
		})

})