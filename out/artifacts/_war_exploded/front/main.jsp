<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>在线购物商城</title>

    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/style.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath }/iconfont/iconfont.css">
    <script src="${pageContext.request.contextPath }/js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/js/frontSetting.js" type="text/javascript" charset="utf-8"></script>


    <script type="text/javascript">
        $(function(){
            var Cuid;
            $.ajax({
                url: "http://localhost:8080/b/front/user/getUserSession",
                type: "post",
                dataType: "json",
                async:false,
                success: function (obj) {
                    Cuid = obj["uid"];
                    $("#frontMenu li").attr("tx",1);
                },error:function (obj) {
                    $("#frontMenu li").attr("tx",0);
                }
            });

            // 点击切换页面
            $("#product-show").click(function() {
                $("#frame-id").attr("src", "${pageContext.request.contextPath }/front/product.jsp");
                $("#frame-id").attr("height","100%");
            });
            $("#cart-show").click(function() {
                if(Cuid==null||Cuid==''){
                    alert("请先登录！");
                    $("#loginModal").modal("show");
                }else{
                    $("#frame-id").attr("src", "${pageContext.request.contextPath }/front/cart.jsp");
                    $("#frame-id").attr("height","200%");
                }
            });
            $("#myOrder-show").click(function() {
                if(Cuid==null||Cuid==''){
                    alert("请先登录！");
                    $("#loginModal").modal("show");
                }else{
                    $("#frame-id").attr("src", "${pageContext.request.contextPath }/front/myOrders.jsp");
                    $("#frame-id").attr("height","100%");
                }
            });
            $("#center-show").click(function() {
                if(Cuid==null||Cuid==''){
                    alert("请先登录！");
                    $("#loginModal").modal("show");
                }else{
                    $("#frame-id").attr("src", "${pageContext.request.contextPath }/front/center.jsp?");
                    $("#frame-id").attr("height","150%");
                }
            });
        });

    </script>

<body>


<div class="navbar navbar-default clear-bottom">
    <div class="container">
        <!-- logo start -->
        <div class="navbar-header">
            <%--<a class="navbar-brand logo-style" href="${pageContext.request.contextPath }/front/main.jsp?uid=${param.uid}">--%>
                <a class="navbar-brand logo-style" href="${pageContext.request.contextPath }/front/main.jsp">
                <img class="brand-img" src="${pageContext.request.contextPath }/images/com-logo1.png" alt="logo" height="70">
            </a>
        </div>
        <!-- logo end -->

        <!-- navbar start -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav" id="frontMenu">
                <li class="active" id="product-show" name="product-show" tx="1">
                    <a>商城主页</a>
                </li>
                <li id="cart-show" name="cart-show" tx="1">
                    <a>购物车</a>
                </li>
                <li id="myOrder-show" name="myOrder-show" tx="1">
                    <a>我的订单</a>
                </li>
                <li class="dropdown" id="center-show" name="center-show" tx="1">
                    <a>会员中心</a>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li id="loginTextId">
                    <a href="#" data-toggle="modal" data-target="#loginModal">登录</a>
                </li>
                <li id="registerTextId">
                    <a href="#" data-toggle="modal" data-target="#registModal">注册</a>
                </li>


                <li class="dropdown" id="userImageTextId" >
                    <a href="#" class="dropdown-toggle user-active" data-toggle="dropdown" role="button" id="userAvatar">
                        <img class="img-circle" id="avatar" height="30" />
                        <input type="hidden" id="getUid"value="">
                        <span id="showUserName"></span>
                        <span class="caret"></span>
                    </a>

                    <ul class="dropdown-menu">
                        <li>
                            <a href="#" data-toggle="modal" data-target="#modifyPasswordModal">
                                <i class="glyphicon glyphicon-cog"></i>修改密码
                            </a>
                        </li>
                        <li>
                            <a id="logOut">
                                <i class="glyphicon glyphicon-off"></i> 退出
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- navbar end -->
    </div>
</div>

<!-- 修改密码模态框 -->
<div class="modal fade" id="modifyPasswordModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="modPassword">修改密码</h4>
            </div>
            <form id="frontModPasswordId" class="form-horizontal" method="post">
                <input type="hidden" id="uid" name="uid">
                <div class="modal-body">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">原密码：</label>
                        <div class="col-sm-6">
                            <input class="form-control" type="password" id="bPwd" name="password" data-toggle="tooltip">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">新密码：</label>
                        <div class="col-sm-6">
                            <input class="form-control" type="password" id="nPwd" name="newPassword" data-toggle="tooltip">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">重复密码：</label>
                        <div class="col-sm-6">
                            <input class="form-control" type="password" id="rnPwd" data-toggle="tooltip">
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal" aria-label="Close">关&nbsp;&nbsp;闭</button>
                    <button type="reset" class="btn btn-warning">重&nbsp;&nbsp;置</button>
                    <button type="button" id="modPasswordSubmit" class="btn btn-warning">修&nbsp;&nbsp;改</button>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- 登录模态框   -->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="frontLogin">登&nbsp;录</h4>
            </div>
            <form id="frontLoginFormId" class="form-horizontal" method="post">
                <div class="modal-body">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">登录帐号：</label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" id="userCode" name="userCode" data-toggle="tooltip">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">密码：</label>
                        <div class="col-sm-6">
                            <input class="form-control" type="password" id="password" name="password" data-toggle="tooltip">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">验证码：</label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" placeholder="请输入验证码" id="code" name="code" data-toggle="tooltip">
                        </div>
                        <div class="col-sm-2 input-height">
                            <img class="img-rounded" id="codeImg" src="http://localhost:8080/b/front/user/code" style="height: 28px; width: 70px;" onclick="changeImg()"/>
                            <button type="button" class="btn btn-link" onclick="changeImg()">看不清</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal" aria-label="Close">关&nbsp;&nbsp;闭</button>
                    <button type="reset" class="btn btn-warning">重&nbsp;&nbsp;置</button>
                    <button type="button" id="loginSubmit" class="btn btn-warning">登&nbsp;&nbsp;录</button>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- 注册模态框 -->
<div class="modal fade" id="registModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">会员注册</h4>
            </div>
            <form id="frontRegisterFormId" class="form-horizontal" method="post">
                <div class="modal-body">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">用户姓名:</label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" id="uName" name="userName" data-toggle="tooltip">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">登录账号:</label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" id="uCode" name="userCode" data-toggle="tooltip">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">登录密码:</label>
                        <div class="col-sm-6">
                            <input class="form-control" type="password" id="uPass" name="password" data-toggle="tooltip">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">联系电话:</label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" id="uPhone" name="phone" data-toggle="tooltip">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">联系地址:</label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" id="uArs" name="userAddress" data-toggle="tooltip">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal" aria-label="Close">关&nbsp;&nbsp;闭</button>
                    <button type="reset" class="btn btn-warning">重&nbsp;&nbsp;置</button>
                    <button type="button" id="registerSubmit" class="btn btn-warning">注&nbsp;&nbsp;册</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath }/js/head.js"></script>

<div>
    <iframe id="frame-id" src="${pageContext.request.contextPath }/front/product.jsp" width="100%" height="100%" frameborder="0" scrolling="no"/>
</div>


</body>

</html>