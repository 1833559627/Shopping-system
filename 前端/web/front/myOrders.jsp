<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>

<head>
    <title>我的订单</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/style.css" />
    <script src="${pageContext.request.contextPath }/js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>

    <body>
        <!-- content start -->
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="page-header" style="margin-bottom: 0px;">
                        <h3>我的订单</h3>
                    </div>
                </div>
            </div>
            <table class="table table-hover table-striped table-bordered" id="ordersList">
                <%--
                ajax动态写入
                --%>
            </table>
        </div>
        <!-- content end-->
    </body>
    <script src="${pageContext.request.contextPath }/js/frontMyOrders.js" type="text/javascript" charset="utf-8"></script>
</html>
