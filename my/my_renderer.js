var renderer = new marked.Renderer();
renderer.code = function (code, language) {
    // console.log(code, language);
    if (!language) {
        return "";
    }
    if (language == 'mermaid') {
        return '<pre class="mermaid">' + code + '</pre>';
    } else if (language === "jsmind") {
        code = code.replace(/\r\n/g, "");
        code = code.replace(/\r/g, "");
        code = code.replace(/\n/g, "");
        var id = Math.floor(Math.random() * 10000);
        jsmindDic["mind" + id] = code;
        return '<div class="jsmind" data=\'mind' + id + '\'></div>';
    } else if (language == "qrcode") {
        return '<div class="qrcode">' + code + '</div>';
    } else {
        code = code.replace(/\r/g, "\n");
        code = code.replace(/\n/g, "\r\n");

        var err = "";
        if (language === "json") {
            err = jsonCheck(code);
        }

        var arr = code.split("\r\n");
        var len = arr.length;
        var str = "";
        for (var i = 0; i < len; i++) {
            str += "<li><code>" + arr[i] + "</code></li>"
        }
        return '<pre class="prettyprint"><i class="fa fa-copy copy" data=\'' + code + '\'></i><ol>' + str + '</ol></pre>' + err;
    }
};


var myMd5 = new md5();

//添加标签唯一ID，用于目录点击定位
renderer.heading = function (text, level, raw) {
    var id_md5 = myMd5.hex_md5(raw).toLowerCase();
    var id = "mymd_" + id_md5;

    console.log(level);
    if (level > 1 && level < 5) {
        var len = headArr.length;
        for (var i = 0; i < len; i++) {
            var obj = headArr[i];
            if (obj.id == id && obj.level == level) {
                console.log("same id")
                id = id + "" + idInd;
                idInd++;
                break;
            }
        }
        headArr.push({ id: id, level: level, node: "h" + level });
    }
    var str = '<h'
        + level
        + ' id="'
        + id
        + '">'
        + text
        + '</h'
        + level
        + '>\n';
    return str;
};