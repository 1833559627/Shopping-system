<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>在线商城管理系统</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="${pageContext.request.contextPath }/css/bootstrap.min.css" type="text/css"></link>
    <link rel="stylesheet" href="${pageContext.request.contextPath }/css/login.css" type="text/css"></link>
    <script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/js/bootstrap.min.js"></script>
  </head>
  <body>
  	<!-- 使用自定义css样式 div-signin 完成元素居中-->
    <div class="containercc div-signin">
      <div class="panel panel-primary div-shadow">
      	<!-- h3标签加载自定义样式，完成文字居中和上下间距调整 -->
	    <div class="panel-heading">
	    	<h3>在线商城 3.0</h3>
	    	<span>Network Mall Manager System</span>
	    </div>
	    <div class="panel-body">
	      <!-- login form start -->
			<form id="loginFrm" class="form-horizontal ccc" enctype="multipart/form-data">
				 <div class="form-group">
				   <label class="col-sm-3 control-label">账&nbsp;&nbsp;&nbsp;&nbsp;号：</label>
				   <div class="col-sm-9">
					 <input class="form-control" type="text" placeholder="请输入账号" id="username" name="staffCode" data-toggle="tooltip">
				   </div>
				 </div>

				 <div class="form-group">
				   <label class="col-sm-3 control-label">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
				   <div class="col-sm-9">
					 <input class="form-control" type="password" placeholder="请输入密码" id="password" name="password" data-toggle="tooltip">
				   </div>
				 </div>

				 <div class="form-group">
				   <label class="col-sm-3 control-label">身&nbsp;&nbsp;&nbsp;&nbsp;份：</label>
				   <div class="col-sm-9">
					   <select class="form-control" id="state" name="staffRole" data-toggle="tooltip">
							<option value="${0}">-请选择身份-</option>
							<option value="${1}">超级管理员</option>
							<option value="${2}">普通管理员</option>
					   </select>
				   </div>
				</div>

				 <div class="form-group">
				   <label class="col-sm-3 control-label">验证码：</label>
				   <div class="col-sm-4">
					 <input class="form-control" type="text" placeholder="请输入验证码" id="code" name="code" data-toggle="tooltip">
				   </div>
				   <div class="col-sm-2">
					  <!-- 验证码图片加载（需引入验证码文件）图像高度经过测试，建议不要修改 -->
					   <img class="img-rounded" id="codeImg" src="http://localhost:8080/b/back/staff/code" style="height: 28px; width: 70px;" onclick="changeImg()"/>
				   </div>
				   <div class="col-sm-2">
					 <button type="button" class="btn btn-link" onclick="changeImg()">看不清</button>
				   </div>
				</div>
			</form>
		    <div class="form-group">
		       <div class="col-sm-9  col-sm-offset-3 padding-left-0">
		       	 <div class="col-sm-4">
			         <button type="button" class="btn btn-link btn-block">忘记密码？</button>
		       	 </div>
		       	 <div class="col-sm-4">
			         <button type="reset" class="btn btn-primary btn-block">重&nbsp;&nbsp;置</button>
		       	 </div>
		       	 <div class="col-sm-4">
					 <button type="button" id="submit" class="btn btn-primary btn-block">登&nbsp;&nbsp;录</button>
		       	 </div>
		       </div>
		    </div>
		</div>
	      <!-- login form end -->
	    </div>
	  </div>
    </div>

  </body>

  <script type="text/javascript" src="${pageContext.request.contextPath }/js/endLogin.js"></script>
</html>
