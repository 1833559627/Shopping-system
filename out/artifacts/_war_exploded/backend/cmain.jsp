<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

<head>

    <title>后台管理</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/bootstarp/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/index.css" />
    <script src="${pageContext.request.contextPath }/js/jquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/bootstarp/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/js/userSetting.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
        $(function(){
            // 点击切换页面
            $("#user-set").click(function() {
                $("#frame-id").attr("src", "${pageContext.request.contextPath }/backend/userManager.jsp");
            });
            $("#product-set").click(function() {
                $("#frame-id").attr("src", "${pageContext.request.contextPath }/backend/productManager.jsp");
            });
            $("#product-type-set").click(function() {
                $("#frame-id").attr("src", "${pageContext.request.contextPath }/backend/productTypeManager.jsp");
            });
            $("#dept-set").click(function() {
                $("#frame-id").attr("src", "${pageContext.request.contextPath }/backend/deptManager.jsp");
            });
        });
    </script>
</head>

<body>
<div class="wrapper-cc clearfix">
    <div class="content-cc">
        <!-- header start -->
        <div class="clear-bottom head">
            <div class="container head-cc">
                <p>在线商城后台管理系统</p>
            </div>
        </div>
        <div align="right">
            <td>欢迎您：${param.staffName}</td>
            <td><a href="${pageContext.request.contextPath }/backend/login.jsp">退出</a></td>
        </div>
        <!-- header end -->
        <!-- content start -->
        <div class="container-flude flude-cc" id="a">
            <div class="row user-setting">
                <div class="col-xs-3 user-wrap">
                    <ul class="list-group">
                        <li class="list-group-item active" name="userSet" id="product-type-set">
                            <i class="glyphicon glyphicon-lock"></i> &nbsp;商品类型管理
                        </li>
                        <li class="list-group-item" name="userPic" id="product-set">
                            <i class="glyphicon glyphicon-facetime-video"></i> &nbsp;商品管理
                        </li>

                        <li class="list-group-item" name="departmentSet" id="dept-set">
                            <i class="glyphicon glyphicon-modal-window"></i> &nbsp;部门管理
                        </li>
                        <li class="list-group-item" name="userInfo" id="user-set">
                            <i class="glyphicon glyphicon-user"></i> &nbsp;用户管理
                        </li>
                    </ul>
                </div>
                <div class="col-xs-9" id="userPanel">
                    <iframe id="frame-id" src="${pageContext.request.contextPath }/backend/productTypeManager.jsp" width="100%" height="100%" frameborder="0" scrolling="no"/>
                </div>

            </div>
        </div>
        <!-- content end-->
    </div>
</div>
</body>


</html>