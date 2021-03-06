<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="height:100%">
<head>
<%@ include file="path.jsp"%>
<title>统一认证管理平台</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta http-equiv="description" content="统一认证管理平台" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="keywords" content="酷社区,后台管理系统,coiol" />

<link rel="stylesheet" type="text/css" href="${cdnPath}static/assets/css/bootstrap.min.css" />

<link rel="stylesheet" type="text/css" href="${cdnPath}static/assets/font-awesome/css/font-awesome.min.css" />
<!-- text fonts -->
<!--  
<link rel="stylesheet" type="text/css" href="http://fonts.useso.com/css?family=Open+Sans:400,300" />
-->
<link rel="stylesheet" type="text/css" href="${cdnPath}static/assets/css/ace.min.css" />
<link rel="stylesheet" type="text/css" href="${cdnPath}static/assets/css/supersized.css" />
<!--[if lte IE 9]>
<link rel="stylesheet" type="text/css" href="${cdnPath}static/assets/css/ace-part2.min.css" />
<![endif]-->
<link rel="stylesheet" type="text/css" href="${cdnPath}static/assets/css/ace-rtl.min.css" />
<!--[if lte IE 9]>
		  <link rel="stylesheet" href="${cdnPath}static/assets/css/ace-ie.min.css" />
<![endif]-->

<!--[if lte IE 9]>
		<script src="${cdnPath}static/assets/js/html5shiv.min.js"></script>
		<script src="${cdnPath}static/assets/js/respond.min.js"></script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="${cdnPath}static/assets/css/jquery.gritter.css" />
</head>
<body class="login-layout light-login">
		<div class="main-container">
			<div class="main-content">
				<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<div class="login-container">
							<div class="center">
								<h1>
									<i class="ace-icon fa fa-leaf green"></i>
									<span class="red">统一</span>
									<span class="white" id="id-text2">认证管理系统</span>
								</h1>
								<h4 class="blue" id="id-company-text">&copy;  Coiol.Inc</h4>
							</div>
							<div class="space-6"></div>
							<div class="position-relative">
								<div id="login-box" class="login-box visible widget-box no-border">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header blue lighter bigger">
												<i class="ace-icon fa fa-coffee green"></i>
												请输入登录用户信息
											</h4>

											<div class="space-6"></div>

											<form id = "login" method="post">
												<fieldset>
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" class="form-control" name="username" placeholder="请输入用户名" />
															<i class="ace-icon fa fa-user"></i>
														</span>
													</label>
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" class="form-control" name="password" placeholder="请输入密码" />
															<i class="ace-icon fa fa-lock"></i>
														</span>
														
													</label>
													<label class="block clearfix">
														<span class="col-login-6 input-icon input-icon-right" style="vertical-align: bottom">
															<input type="text" class="form-control" name="verifyCode" placeholder="请输入验证码" />
															<i class="ace-icon fa fa-list-ol"></i>
														</span>
														<span>
															<a id="verifyClick" title="看不清楚？点击获得新图片。" href="javascript:void(0);"> 
																<img id="verifyCode" src="${sysPath}Authentication/captchaImage.do" />
														 	</a>
														</span>
													</label>
													<div class="space"></div>

													<div class="clearfix">
														<label class="inline">
															<input type="checkbox" class="ace" />
															<span class="lbl"> 记住我</span>
														</label>

														<button type="button" id="loginAction" class="width-35 pull-right btn btn-sm btn-primary">
															<i class="ace-icon fa fa-key"></i>
															<span class="bigger-110">登录</span>
														</button>
													</div>

													<div class="space-4"></div>
												</fieldset>
											</form>

											
										</div><!-- /.widget-main -->

										<div class="toolbar clearfix">
											<div>
												<a href="#" data-target="#forgot-box" class="forgot-password-link">
													<i class="ace-icon fa fa-arrow-left"></i>
													忘记密码？
												</a>
											</div>

											<div>
												<a href="#" data-target="#signup-box" class="user-signup-link">
													注册
													<i class="ace-icon fa fa-arrow-right"></i>
												</a>
											</div>
											
										</div>
									</div><!-- /.widget-body -->
								</div><!-- /.login-box -->

								<div id="forgot-box" class="forgot-box widget-box no-border">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header red lighter bigger">
												<i class="ace-icon fa fa-key"></i>
												取回 密码
											</h4>

											<div class="space-6"></div>
											<p>
												输入您的电子邮件地址和接收指令
											</p>

											<form id="forgetPasswordForm">
												<fieldset>
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" class="form-control" name="account" placeholder="用户名" />
															<i class="ace-icon fa fa-user"></i>
														</span>
													</label>
													
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="email" class="form-control" name="email" placeholder="Email" />
															<i class="ace-icon fa fa-envelope"></i>
														</span>
													</label>
													
													<label class="block clearfix">
														<span class="col-login-6 input-icon input-icon-right" style="vertical-align: bottom">
															<input type="text" class="form-control" name="verifyCode" placeholder="请输入验证码" />
															<i class="ace-icon fa fa-list-ol"></i>
														</span>
														<span>
															<a id="findVerifyClick" title="看不清楚？点击获得新图片。" href="javascript:void(0);"> 
																<img id="findVerifyCode" src="${sysPath}Authentication/captchaImage.do" />
														 	</a>
														</span>
													</label>
													<div class="clearfix">
														<button id="resetPassword" type="button" class="width-35 pull-right btn btn-sm btn-danger">
															<i class="ace-icon fa fa-lightbulb-o"></i>
															<span class="bigger-110">发送</span>
														</button>
													</div>
												</fieldset>
											</form>
										</div><!-- /.widget-main -->

										<div class="toolbar center">
											<a href="#" data-target="#login-box" class="back-to-login-link">
												返回登录
												<i class="ace-icon fa fa-arrow-right"></i>
											</a>
										</div>
									</div><!-- /.widget-body -->
								</div><!-- /.forgot-box -->

								<div id="signup-box" class="signup-box widget-box no-border">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header green lighter bigger">
												<i class="ace-icon fa fa-users blue"></i>
												新用户注册
											</h4>

											<div class="space-6"></div>
											<p> 请填写以下信息来完成注册: </p>

											<form>
												<fieldset>
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="email" class="form-control" placeholder="Email" />
															<i class="ace-icon fa fa-envelope"></i>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" class="form-control" placeholder="用户名" />
															<i class="ace-icon fa fa-user"></i>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" class="form-control" placeholder="密码" />
															<i class="ace-icon fa fa-lock"></i>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" class="form-control" placeholder="确认密码" />
															<i class="ace-icon fa fa-retweet"></i>
														</span>
													</label>

													<label class="block">
														<input type="checkbox" class="ace" />
														<span class="lbl">
															我接受
															<a href="#">用户协议</a>
														</span>
													</label>

													<div class="space-24"></div>

													<div class="clearfix">
														<button type="reset" class="width-30 pull-left btn btn-sm">
															<i class="ace-icon fa fa-refresh"></i>
															<span class="bigger-110">重置</span>
														</button>

														<button type="button" class="width-65 pull-right btn btn-sm btn-success">
															<span class="bigger-110">注册</span>

															<i class="ace-icon fa fa-arrow-right icon-on-right"></i>
														</button>
													</div>
												</fieldset>
											</form>
										</div>

										<div class="toolbar center">
											<a href="#" data-target="#login-box" class="back-to-login-link">
												<i class="ace-icon fa fa-arrow-left"></i>
												返回登录
											</a>
										</div>
									</div><!-- /.widget-body -->
								</div><!-- /.signup-box -->
							</div><!-- /.position-relative -->

							<div class="navbar-fixed-top align-right">
								<br />
								&nbsp;
								<a id="btn-login-dark" href="#">Dark</a>
								&nbsp;
								<span class="blue">/</span>
								&nbsp;
								<a id="btn-login-blur" href="#">Blur</a>
								&nbsp;
								<span class="blue">/</span>
								&nbsp;
								<a id="btn-login-light" href="#">Light</a>
								&nbsp; &nbsp; &nbsp;
							</div>
						</div>
					</div><!-- /.col -->
				</div><!-- /.row -->
			</div><!-- /.main-content -->
		</div><!-- /.main-container -->

		<!-- basic scripts -->

		<!--[if !IE]> -->
		<script type="text/javascript" src="${cdnPath}static/assets/js/jquery/jquery-2.1.1.min.js"></script>
		<!-- <![endif]-->

		<!--[if IE]>
		<script type="text/javascript" src="${cdnPath}static/assets/js/jquery/jquery-1.11.1.min.js"></script>
		<![endif]-->

		<!--[if !IE]> -->
		<script type="text/javascript">
			window.jQuery || document.write("<script src='${cdnPath}static/assets/js/jquery.min.js'>"+"<"+"/script>");
		</script>
		<!-- <![endif]-->

		<!--[if IE]>
		<script type="text/javascript">
		 window.jQuery || document.write("<script src='${cdnPath}static/assets/js/jquery1x.min.js'>"+"<"+"/script>");
		</script>
		<![endif]-->
		
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='${cdnPath}static/assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script type="text/javascript" src="${cdnPath}static/assets/js/layer/layer.js"></script>
		<script type="text/javascript" src="${cdnPath}static/assets/js/supersized.3.2.7.min.js"></script>
		<script type="text/javascript" src="${cdnPath}static/assets/js/supersized-init.js"></script>
		<script type="text/javascript" src="${cdnPath}static/assets/js/util.js"></script>
		<script type="text/javascript" src="${cdnPath}static/assets/js/login.js"></script>
		<!-- inline scripts related to this page -->
		<script type="text/javascript">
		var sex = eval('(${fields.cdn==null?"{}":fields.cdn})');
			jQuery(function($) {
			 $(document).on('click', '.toolbar a[data-target]', function(e) {
				e.preventDefault();
				var target = $(this).data('target');
				$('.widget-box.visible').removeClass('visible');//hide others
				$(target).addClass('visible');//show target
			 });
			});
		</script>
	</body>
</html>
