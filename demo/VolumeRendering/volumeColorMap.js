/*
 * @Author: volume colormap
 * @Date: 2022-03-16 15:38:46
 * @LastEditTime: 2022-03-18 18:01:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\VolumeRendering\volumeColorMap.js
 */

function colorRGBtoHex(color) {
    var rgb = color.split(",");
    var r = parseInt(rgb[0].split("(")[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(")")[0]);
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}

// GetVolumeSummerColor 1
function GetVolumeSummerColor() {
    var canvas = document.createElement("canvas");
    canvas.height = 17;
    canvas.width = 150;
    var ctx = canvas.getContext("2d");
    var grd = ctx.createLinearGradient(0, 0, canvas.width - 1, canvas.height - 1);

    var colorMapLength = 256;
    // var clrmapstr = "";
    var r = 255;
    var g = 0;
    var b = 0;
    var n = (3 * colorMapLength) / 8;
    for (var i = 0; i < colorMapLength; i++) {
        var temp = 1 - (1.0 * i) / (colorMapLength - 1);

        r = parseInt(255 * temp);
        g = parseInt(255 * 0.5 * (1 + temp));
        b = parseInt(255 * 0.4);
        let colorPos = colorRGBtoHex(`${r},${g},${b}`);
        grd.addColorStop(i / colorMapLength, colorPos);
        // if (i > 0) clrmapstr += "\n";
        // clrmapstr += parseInt(r) + " " + parseInt(g) + " " + parseInt(b);
    }

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);
    return canvas;
}

// GetVolumeSpringColor 2
function GetVolumeSpringColor() {
    var canvas = document.createElement("canvas");
    canvas.height = 17;
    canvas.width = 150;
    var ctx = canvas.getContext("2d");
    var grd = ctx.createLinearGradient(0, 0, canvas.width - 1, canvas.height - 1);

    var colorMapLength = 256;
    var clrmapstr = "";
    var r = 255;
    var g = 0;
    var b = 0;
    for (var i = 0; i < colorMapLength; i++) {
        r = 255;
        g = 255 - parseInt(255 * (1.0 * i / (colorMapLength - 1)));
        b = 255 - g;
        let colorPos = colorRGBtoHex(`${r},${g},${b}`);
        grd.addColorStop(i / colorMapLength, colorPos);


        // if (i > 0)
        //   clrmapstr += "\n";
        // clrmapstr += r + " " + g + " " + b;
    }
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);
    return canvas;
}

// GetVolumeAutumnColor - 3
function GetVolumeAutumnColor() {
    var canvas = document.createElement("canvas");
    canvas.height = 17;
    canvas.width = 150;
    var ctx = canvas.getContext("2d");
    var grd = ctx.createLinearGradient(0, 0, canvas.width - 1, canvas.height - 1);

    var colorMapLength = 256;
    var clrmapstr = "";
    var a = 255;
    var r = 255;
    var g = 0;
    var b = 0;
    for (var i = 0; i < colorMapLength; i++) {
        if (i > 0)
            clrmapstr += "\n";

        g = parseInt(255 * (1 - 1.0 * i / (colorMapLength - 1)));
        let colorPos = colorRGBtoHex(`${r},${g},${b}`);
        grd.addColorStop(i / colorMapLength, colorPos);
        // clrmapstr += a + " " + r + " " + g + " " + b;
    }

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);
    return canvas;

}

// GetVolumeWinterColor - 4
function GetVolumeWinterColor() {
    debugger
    var canvas = document.createElement("canvas");
    canvas.height = 17;
    canvas.width = 150;
    var ctx = canvas.getContext("2d");
    var grd = ctx.createLinearGradient(0, 0, canvas.width - 1, canvas.height - 1);
    var colorMapLength = 256;
    // var clrmapstr = "";
    var r = 255;
    var g = 0;
    var b = 0;
    var n = 3 * colorMapLength / 8;
    for (var i = 0; i < colorMapLength; i++) {
        var temp = 1.0 * i / (colorMapLength - 1);
        r = 0;
        g = parseInt(255 * temp);
        b = parseInt(255 * (1.0 - 0.5 * temp));
        let colorPos = colorRGBtoHex(`${r},${g},${b}`);
        grd.addColorStop(i / colorMapLength, colorPos);
    }

    // console.log(clrmapstr, "clrmapstr - 体渲染配色方案");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);
    return canvas;
}

// GetVolumeCoolColor - 5
function GetVolumeCoolColor() {
    var canvas = document.createElement("canvas");
    canvas.height = 17;
    canvas.width = 150;
    var ctx = canvas.getContext("2d");
    var grd = ctx.createLinearGradient(0, 0, canvas.width - 1, canvas.height - 1);

    var colorMapLength = 256;
    var clrmapstr = "";
    var r = 255;
    var g = 0;
    var b = 0;
    var n = 3 * colorMapLength / 8;
    for (var i = 0; i < colorMapLength; i++) {
        var temp = 1.0 * i / (colorMapLength - 1);
        {
            r = parseInt(255 * temp);
            g = parseInt(255 * (1 - temp));
        }
        b = 255;
        let colorPos = colorRGBtoHex(`${r},${g},${b}`);
        grd.addColorStop(i / colorMapLength, colorPos);

        // if (i > 0)
        //   clrmapstr += "\n";
        // clrmapstr += parseInt(r) + " " + parseInt(g) + " " + parseInt(b);
    }

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);
    return canvas;
}

// GetVolumeHotColor - 6
function GetVolumeHotColor() {
    var canvas = document.createElement("canvas");
    canvas.height = 17;
    canvas.width = 150;
    var ctx = canvas.getContext("2d");
    var grd = ctx.createLinearGradient(0, 0, canvas.width - 1, canvas.height - 1);

    var colorMapLength = 256;
    var clrmapstr = "";
    var r = 255;
    var g = 0;
    var b = 0;
    var n = 3 * colorMapLength / 8;
    for (var i = 0; i < colorMapLength; i++) {
        if (i < n)
            r = 1.0 * (i + 1) / n;
        else
            r = 1.0;
        if (i < n)
            g = 0;
        else if (i >= n && i < 2 * n)
            g = 1.0 * (i + 1 - n) / n;
        else
            g = 1;
        if (i < 2 * n)
            b = 0;
        else
            b = 1.0 * (i + 1 - 2 * n) / (colorMapLength - 2 * n);
        {
            b = 255 - parseInt(255 * r);
            g = 255 - parseInt(255 * g);
            r = 255 - parseInt(255 * b);
        }

        let colorPos = colorRGBtoHex(`${r},${g},${b}`);
        grd.addColorStop(i / colorMapLength, colorPos);

    }

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);
    return canvas;

}

// GetVolumeBlueColor 7
function GetVolumeBlueColor() {
    var canvas = document.createElement("canvas");
    canvas.height = 17;
    canvas.width = 150;
    var ctx = canvas.getContext("2d");
    var grd = ctx.createLinearGradient(0, 0, canvas.width - 1, canvas.height - 1);

    var colorMapLength = 256;
    var clrmapstr = "";
    var r = 255;
    var g = 0;
    var b = 0;
    var n = (3 * colorMapLength) / 8;
    for (var i = 0; i < colorMapLength; i++) {
        if (i < n) r = (1.0 * (i + 1)) / n;
        else r = 1.0;
        if (i < n) g = 0;
        else if (i >= n && i < 2 * n) g = (1.0 * (i + 1 - n)) / n;
        else g = 1;
        if (i < 2 * n) b = 0;
        else b = (1.0 * (i + 1 - 2 * n)) / (colorMapLength - 2 * n);

        {
            r = 255 - parseInt(255 * r);
            g = 255 - parseInt(255 * g);
            b = 255 - parseInt(255 * b);
            let colorPos = colorRGBtoHex(`${r},${g},${b}`);
            grd.addColorStop(i / colorMapLength, colorPos);
        }

        // if (i > 0) clrmapstr += "\n";
        // clrmapstr += parseInt(r) + " " + parseInt(g) + " " + parseInt(b);
    }

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);
    return canvas;
}

function Jet(colormapLength) {
    var reverse = false;
    var cmap = new Array();
    for (var k = 0; k < colormapLength; k++) {
        cmap[k] = [0, 0, 0, 0];
    }
    var cMatrix = new Array();
    for (var k = 0; k < colormapLength; k++) {
        cMatrix[k] = [0, 0, 0];
    }
    var n = Math.ceil(colormapLength / 4.0);
    var nMod = 0;
    var fArray = new Array(3 * n - 1);
    var red = new Array(fArray.length);
    var green = new Array(fArray.length);
    var blue = new Array(fArray.length);

    if (colormapLength % 4 == 1) {
        nMod = 1;
    }
    for (var i = 0; i < fArray.length; i++) {
        if (i < n)
            fArray[i] = parseFloat(i + 1) / n;
        else if (i >= n && i < 2 * n - 1)
            fArray[i] = 1.0;
        else if (i >= 2 * n - 1)
            fArray[i] = parseFloat(3 * n - 1 - i) / n;
        green[i] = Math.ceil(n / 2.0) - nMod + i;
        red[i] = green[i] + n;
        blue[i] = green[i] - n;
    }
    var nb = 0;
    for (var i = 0; i < blue.length; i++) {
        if (blue[i] > 0)
            nb++;
    }
    for (var i = 0; i < colormapLength; i++) {
        for (var j = 0; j < red.length; j++) {
            if (i == red[j] && red[j] < colormapLength) {
                if (reverse)
                    cMatrix[i][2] = fArray[i - red[0]];
                else
                    cMatrix[i][0] = fArray[i - red[0]];
            }
        }
        for (var j = 0; j < green.length; j++) {
            if (i == green[j] && green[j] < colormapLength)
                cMatrix[i][1] = fArray[i - green[0]];
        }
        for (var j = 0; j < blue.length; j++) {
            if (i == blue[j] && blue[j] >= 0) {
                if (reverse)
                    cMatrix[i][0] = fArray[fArray.length - 1 - nb + i];
                else
                    cMatrix[i][2] = fArray[fArray.length - 1 - nb + i];
            }
        }
    }
    debugger
    for (var i = 0; i < colormapLength; i++) {
        cmap[i][0] = 255;
        for (var j = 0; j < 3; j++) {
            cmap[i][j + 1] = parseInt(cMatrix[i][j] * 255);
        }
    }
    return cmap;

};

// GetVolumeJetColor - 8
function GetVolumeJetColor() {
    var canvas = document.createElement("canvas");
    canvas.height = 17;
    canvas.width = 150;
    var ctx = canvas.getContext("2d");
    var grd = ctx.createLinearGradient(0, 0, canvas.width - 1, canvas.height - 1);

    var colorMapLength = 256;
    var clrmapstr = "";
    var r = 255;
    var g = 0;
    var b = 0;

    var jetclr = Jet(colorMapLength);
    colorMapLength = jetclr.length;

    for (var i = 0; i < colorMapLength; i++) {
        r = jetclr[i][1];
        g = jetclr[i][2];
        b = jetclr[i][3];
        let colorPos = colorRGBtoHex(`${r},${g},${b}`);
        grd.addColorStop(i / colorMapLength, colorPos);
        if (i > 0)
            clrmapstr += "\n";
        clrmapstr += r + " " + g + " " + b;
    }
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);
    return canvas;
}



// 传入图片对应的id - 即可获取对应的颜色
function getVolumeColorMap(colorMapID) {
    let currentCanvas
    switch (colorMapID) {
        case 1:
            currentCanvas = GetVolumeSummerColor();
            break;
        case 2:
            currentCanvas = GetVolumeSpringColor();
            break;
        case 3:
            currentCanvas = GetVolumeAutumnColor();
            break;
        case 4:
            currentCanvas = GetVolumeWinterColor();
            break;
        case 5:
            currentCanvas = GetVolumeCoolColor();
            break;
        case 6:
            currentCanvas = GetVolumeHotColor();
            break;
        case 7:
            currentCanvas = GetVolumeBlueColor();
            break;
        case 8:
            currentCanvas = GetVolumeJetColor();
            break;
    }

    console.log("方便将当前获取的canvas传入着色器");
    console.log(currentCanvas);

    return currentCanvas
}

// 保存成png格式的图片
function saveAsPNG(canvas) {
    return canvas.toDataURL("image/png")
}

function downLoad(url) {
    var oA = document.createElement("a");
    oA.download = '';// 设置下载的文件名，默认是'下载'
    oA.href = url;
    document.body.appendChild(oA);
    oA.click();
    oA.remove(); // 下载之后把创建的元素删除
}







