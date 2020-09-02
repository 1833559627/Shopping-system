$(function () {
    GetCarList(GetSqlCarOwner());
});
// 列表
function GetCarList(strWhere) {
    if ($("#depotId").val() == "") {
        $("#depotId").val($("#deId").val());
    }
    //得到查询条件
    var searchString = strWhere;
    //得到每页显示条数
    var pageSize = $("#pageSize").val().trim();
    //得到显示第几页
    var pageNum = $("#pageNum").val().trim();

    $.ajax({
        type: "POST",
        async: false,
        url: "../Ajax/CarOwnerAjax.ashx",
        data: {
            "strWhere": searchString,
            "rows": pageSize,
            "page": pageNum,
            "cmd": "carOwnerList",
            "de_Id": $("#depotId").val()
        },
        dataType: "text",
        success: function (data) {
            //将json字符串转为json对象
            var pageEntity = JSON.parse(data);
            //得到结果集
            var obj = pageEntity["rows"];
            //将除模板行的thead删除，即删除之前的数据重新加载
            $("thead").eq(0).nextAll().remove();
            //将获取到的数据动态的加载到table中
            for (var i = 0; i < obj.length; i++) {
                //获取模板行，复制一行
                var row = $("#tem").clone();
                //给每一行赋值
                row.find("#cr_Date").text(obj[i].cr_Date);
                row.find("#cr_Name").text(obj[i].cr_Name);
                row.find("#cr_Tel").text(obj[i].cr_Tel);
                row.find("#cr_CarType").text(obj[i].cr_CarType);
                row.find("#cr_CarNum").text(obj[i].cr_CarNum);
                row.find("#cr_LicenseNum").text(obj[i].cr_LicenseNum);
                row.find("#cr_kmCount").text(obj[i].cr_kmCount);
                row.find("#de_Name").text(obj[i].de_Name);
                if (obj[i].cr_MemberId == 0||obj[i].cr_MemberId ==null) {
                    row.find("#cr_MemberId").text("");
                }
                if (obj[i].cr_IsMember == 1) {
                    row.find("#cr_MemberId").text(obj[i].cr_MemberId);
                }
                if (obj[i].cr_IsMember == 0) {
                    row.find("#cr_IsMember").text("否");
                    //$("#cr_IsMember").css("background-color", "#eee3a7");
                }
                if (obj[i].cr_IsMember == 1) {
                    row.find("#cr_IsMember").text("是");
                    //$("#cr_IsMember").css("background-color", "#b1d3f1");
                }
                row.find("#cr_Memo").text(obj[i].cr_Memo);
                //将新行添加到表格中
                row.appendTo("#table");

            }
            //当前记录总数
            var pageNumCount = pageEntity["total"];
            //当前记录开始数
            var pageNumBegin = (pageNum - 1) * pageSize + 1;
            //当前记录结束数
            var pageNumEnd = pageNum * pageSize
            //如果结束数大于记录总数，则等于记录总数
            if (pageNumEnd > pageNumCount) {
                pageNumEnd = pageNumCount;
            }
            //得到总页数
            var pageCount;
            if (pageNumCount / pageSize == 0) {
                pageCount = pageNumCount / pageSize;

            } else {
                pageCount = Math.ceil(pageNumCount / pageSize);
            }
            //输出共多少页
            if (pageCount <= 1) {
                document.getElementById("totalPage").innerHTML = 1;

            } else {
                document.getElementById("totalPage").innerHTML = pageCount;
            }

            //显示所有的页码数

            var pageSelect = document.getElementById("page");

            var pageOption = "";

            var flag;

            //删除select下所有的option，清除所有页码

            document.getElementById("pageNum").options.length = 0;
            if (pageCount <= 1) {
                var  option = new Option("1", "1", false, true);
                document.getElementById("pageNum").options.add(option);
            } else {
                for (var i = 0; i < pageCount; i++) {
                    flag = (i + 1).toString();
                    var option;
                    //如果等于当前页码
                    if (flag == pageNum) {
                        //实例化一个option,则当前页码为选中状态
                        option = new Option(flag, flag, false, true);
                    } else {
                        option = new Option(flag, flag, false, false);
                    }
                    //将option加入select中
                    document.getElementById("pageNum").options.add(option);
                }
            }

            /**给上一步下一步加颜色**/
            //判断是否只有一页
            if (pageCount == 1) {
                //如果只有一页，上一步，下一步都为灰色

                $("#previousPage").css("color", "#AAA");//给上一步加灰色

                $("#nextPage").css("color", "#AAA");//给下一步加灰色

            } else if (pageNum - 1 < 1) {

                //如果是首页,则给上一步加灰色，下一步变蓝

                $("#previousPage").css("color", "#AAA");//给上一步加灰色

                $("#nextPage").css("color", "#66a4db");//给下一步加蓝色

            } else if (pageNum == pageCount) {

                //如果是尾页,则给上一步加蓝色，下一步灰色

                $("#previousPage").css("color", "#66a4db");//给上一步标签加蓝色

                $("#nextPage").css("color", "#AAA");//给下一步标签加灰色

            } else {

                //上一步为蓝色，下一步为绿色

                $("#previousPage").css("color", "#66a4db");//给上一步加蓝色

                $("#nextPage").css("color", "#66a4db");//给下一步加蓝色

            }

        }

    });

}
//切换到第几页
function ToPage() {
    GetCarList(GetSqlCarOwner());
}
//上一页
function previous() {
    //得到当前选中项的页号
    var id = $("#pageNum option:selected").val();
    //计算上一页的页号
    var previousPage = parseInt(id) - 1;
    //得到select的option集合
    var list = document.getElementById("pageNum").options;
    //得到select中，上一页的option
    var previousOption = list[previousPage - 1];
    //修改select的选中项
    previousOption.selected = true;
    //调用查询方法
    GetCarList(GetSqlCarOwner());

}
//下一页
function next() {
    //得到当前选中项的页号
    var id = $("#pageNum option:selected").val();
    //计算下一页的页号
    var nextPage = parseInt(id) + 1;
    //得到select的option集合
    var list = document.getElementById("pageNum").options;
    //得到select中，下一页的option
    var nextOption = list[nextPage - 1];
    //修改select的选中项
    nextOption.selected = true;
    //调用查询方法
    GetCarList(GetSqlCarOwner());
}

//修改每页显示条数 ，要从第一页开始查起
function research() {
    //得到select的option集合
    var list = document.getElementById("pageNum").options;
    //得到select中，第一页的option
    var nextOption = list[0];
    //修改select的选中项
    nextOption.selected = true;
    //调用查询方法
    GetCarList(GetSqlCarOwner());

}