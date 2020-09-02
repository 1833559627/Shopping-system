<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>我的购物车</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/style.css" />
    <script src="${pageContext.request.contextPath }/js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
    <body style="margin: 0px;padding: 0px">

        <!-- content start -->
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="page-header" style="margin-bottom: 0px;">
                        <h3>我的购物车</h3>
                        <input type="hidden" id="getUid" name="uid">
                    </div>
                </div>
            </div>
            <table class="table table-hover table-striped table-bordered" id="cartItem">
            </table>

        </div>
        <!-- content end-->
    </body>
        <script src="${pageContext.request.contextPath }/js/frontCart.js" type="text/javascript" charset="utf-8"></script>

</html>
