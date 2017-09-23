var jsmindDic = {};
var headArr = [];
var idInd = 0;

function jsonCheck(code) {
    try {
        var obj = JSON.parse(code);
        return "";
    } catch (e) {
        return "<p class='error'>" + e + "</p>"
    }
}

var menuFlag = false;
$(document).ready(function () {
    var url = (myutils.getQueryString("md"));
    url = decodeURIComponent(url);
    url += "?v=" + Math.random();
    $.get(url, function (res) {
        $("#md").html(res);
        renderView();
    });
});

function renderView() {
    render();
    setTitle();
    addMenu();
    $("table").addClass("table table-bordered");
    $("#menuBtn").on("click", function () {
        menuFlag = !menuFlag;
        if (menuFlag) {
            $("#menuDiv").removeClass("hide");
            $("#menuMask").removeClass("hide");
        } else {
            $("#menuDiv").addClass("hide");
            $("#menuMask").addClass("hide");
        }
    });
}

var clipboard;
function render() {
    if (clipboard) {
        clipboard.destroy();
    }

    var md = $('#md').html();
    $('#md').empty()
    var html = marked(md, { renderer: renderer });
    $('#preview').html(html);
    mermaid.init();
    prettyPrint();

    var jsmindList = $(".jsmind");
    var len = jsmindList.length;

    for (var i = 0; i < len; i++) {
        var $jm = jsmindList.eq(i);
        $jm.attr("id", "jm__" + i);
        var jid = $jm.attr("data");
        var mind = JSON.parse(jsmindDic[jid]);

        addSerial2Obj(mind.children, 1);
        createMind("#jm__" + i, mind);
    }

    clipboard = new Clipboard(".copy",
        {
            text: function (e) {
                // console.log(e);
                var span = $(e);
                return span.attr("data");
            }
        });

    clipboard.on("success", function (e) {
        // e.stoppropagation();
        alert("复制成功");
    });

    //添加 qrcode
    var qrcodes = $("div.qrcode");
    var len = qrcodes.length;
    for (var j = 0; j < len; j++) {
        var qr = qrcodes.eq(j);
        var txt = qr.html();
        qr.html("");
        qr.qrcode(txt);
    }

    //修改剪头尺寸
    var marker = $(".edgePath marker");
    if (marker.length > 0) {
        marker.attr("markerWidth", 10);
        marker.attr("markerHeight", 10);
    }

}

//mermaid.initialize({flowchart:{htmlLabels:false}});
mermaid.init();

function addSerial2Obj(list, id) {
    var ind = 1;
    var obj;
    var len = list ? list.length : 0;
    for (var i = 0; i < len; i++) {
        obj = list[i];
        obj.name = id + "-" + (i + 1) + ". " + obj.name;
        if (obj.children && obj.children.length > 0) {
            addSerial2Obj(obj.children, id + "-" + (i + 1));
        }
    }
}

function setTitle() {
    var h1 = $("h1");
    if (h1.length > 0) {
        $(document).attr("title", h1.eq(0).text());
    }
}


function addMenu() {
    var len = headArr.length;
    var ul = $("#menuUl");
    for (var i = 0; i < len; i++) {
        var obj = headArr[i];
        var head = $(obj.node + "#" + obj.id);
        var li = $("<li class='menuItem menu" + obj.level + "'><a href='#" + obj.id + "'>" + head.text() + "</a></li>");
        ul.append(li);
    }

    $(".menuItem").on("click", function () {
        $("#menuDiv").addClass("hide");
        $("#menuMask").addClass("hide");
        menuFlag = false;
    });
    $("#menuMask").on("click", function () {
        $("#menuMask").addClass("hide");
        $("#menuDiv").addClass("hide");
        menuFlag = false;
    });
}