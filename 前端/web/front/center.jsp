<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>

<head>
    <title>个人中心</title>
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
                        <h3>基本资料</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <form class="form-horizontal" id="frontModUserFormId">

                <input type="hidden" id="iUid" name="uid">

                <div class="form-group">
                    <label for="userCode" class="col-md-2 col-sm-2 control-label">登录账号:</label>
                    <div class="col-md-8  col-sm-10">
                        <input type="text" class="form-control" id="userCode" readonly/>
                    </div>
                </div>

                <div class="form-group">
                    <label for="userName" class="col-md-2  col-sm-2 control-label">用户姓名:</label>
                    <div class="col-md-8 col-sm-10">
                        <input type="text" class="form-control" id="userName" name="userName" data-toggle="tooltip" placeholder="用户姓名">
                    </div>
                </div>
                
                <div class="form-group" >
                    <label for="phone" class="col-md-2  col-sm-2 control-label">联系电话:</label>
                    <div class="col-md-8 col-sm-10">
                        <input type="text" class="form-control" id="phone" name="phone" data-toggle="tooltip" placeholder="联系电话">
                    </div>
                </div>
                <div class="form-group">
                    <label for="userAddress" class="col-md-2   col-sm-2  control-label">联系地址:</label>
                    <div class="col-md-8 col-sm-10">

                        <input type="text" class="form-control" id="userAddress" name="userAddress" data-toggle="tooltip" placeholder="联系地址">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="button" id="modUserSubmit" class="btn btn-warning">确认修改</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="page-header" style="margin-bottom: 0px;">
                        <h3>修改头像</h3>
                    </div>
                </div>
            </div>
            <form class="form-horizontal" id="modAvatarId" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="showImg" class="col-md-2   col-sm-2  control-label">选择头像:</label>
                    <div class="col-md-10 col-sm-10">
                        <input type="hidden" id="aUid" name="uid">
                        <img  id="showImg" class="togeImg" onclick="openFile()" alt="" width="100" height="100" data-toggle="tooltip">
                        <input  type="file" style="display: none;" id="uploadAvatar" name="file" accept="image/jpg,image/jpeg,image/png,image/bmp"/>
                        <script>
                        function openFile() {
                            $("#uploadAvatar").click();
                        }
                        $('#uploadAvatar').change(function() {
                            $("#showImg").attr("src", window.URL.createObjectURL(this.files[0]));
                        });
                        </script>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" id="modAvatarSubmit" class="btn btn-warning">确认修改</button>
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col-xs-12">
                    <div class="page-header" style="margin-bottom: 0px;">
                        <h3>上传生活照</h3>
                    </div>
                </div>
            </div>
            <form id="lifePhotoId" class="form-horizontal" enctype="multipart/form-data">
                <div class="form-group">
                    <label class="col-md-2   col-sm-2  control-label">选择生活照:</label>
                    <div class="col-md-10 col-sm-10" >
                        <div id="lpDiv"></div>
                        <input type="hidden" id="lUid" name="uid" >
                        <img src="${pageContext.request.contextPath }/images/add.png" id="showLifePhoto" class="togeImg" onclick="openFileImg.call(this)" alt="" width="100" height="100">
                        <input id="uploadLifePhoto" type="file" style="display: none;" name="file" onchange="showImg.call(this)" accept="image/jpg,image/jpeg,image/png,image/bmp" />
                        <script>
                            function openFileImg()
                            {
                                $(this).next().click();
                            }

                            function showImg()
                            {
                                $(this).prev().attr("src", window.URL.createObjectURL(this.files[0]));
                            }

                        </script>
                        
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="button" id="lifePhotoSubmit" class="btn btn-warning margin-right-15">上传</button>
                    </div>
                </div>
            </form>
        </div>
        <!-- content end-->

        <script type="text/javascript">

        </script>
    </body>


    <script src="${pageContext.request.contextPath }/js/frontUser.js" type="text/javascript" charset="utf-8"></script>


</html>
