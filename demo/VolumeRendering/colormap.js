
    var GetRGB=function( val,  factor)
    {
        var RGB = 0;
        
            RGB = parseInt(val * factor);
            if (RGB < 0)
                RGB = 0;
            else if (RGB > 255)
                RGB = 255;
       
        return RGB;
    };
    
    /*RGB颜色转换为16进制*/
    var colorHex=function (colorrgb){
      
            var rgb = colorrgb.split(',');
            var r = parseInt(rgb[0].split('(')[1]);
            var g = parseInt(rgb[1]);
            var b = parseInt(rgb[2].split(')')[0]);
            var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            return hex;
    };
     /*16进制颜色转为RGB格式*/
     function colorRgb(colorhex) {
        var sColor = this.toLowerCase();
        if(sColor && reg.test(sColor)){
            if(sColor.length === 4){
                var sColorNew = "#";
                    for(var i=1; i<4; i+=1){
                        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));       
                    }
                    sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for(var i=1; i<7; i+=2){
                sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));       
            }
            return "RGB(" + sColorChange.join(",") + ")";
        }else{
            return sColor;       
        }
    };
    var getColorMapValue=function(colorMapID, colormapLength,isReverseColor,   minVal,  maxVal, edgeColorType, edgeColor,val )
    {
        colors = new Array(colormapLength);
        var clrstr;
        switch (colorMapID)
        {
            case 1:
                clrstr=GetSummerColor();
                break;
            case 2:
                clrstr=GetSpringColor();
                break;
            case 3:
                clrstr=GetAutumnColor();
                break;
            case 4:
                clrstr=GetWinterColor();
                break;
            case 5:
                clrstr=GetCoolColor();
                break;
            case 6:
                clrstr=GetHotColor();
                break;
            case 7:
                clrstr=GetBlueColor();
                break;
            case 8:
                clrstr=GetJetColor();
                break;
        }
        var clrmapStrArray = clrstr.trim().split('\n');
        for (var cl = 0; cl < colormapLength; cl++)
        {
            var strs = clrmapStrArray[cl].trim().split(' ');
    
            if (strs.length >= 2)
            {
                            var order = cl;
                            var offset = 0;
                            var factor = 1;
                            if (strs.Length == 3)
                            {
                                factor = 255;
                                offset = 1;
                            }
    
                            if (isReverseColor=='true')
                                order = colormapLength - (cl + 1);
                            var r = GetRGB(strs[0 - offset], factor);
                            var g = GetRGB(strs[1 - offset], factor);
                            var b = GetRGB(strs[2 - offset], factor);
                            colors[order] = colorHex('RGB('+r+','+ g+','+ b+')');
            }
        }
        debugger
        if ((val < minVal || val >= maxVal))
        {
            switch (edgeColorType)
            {
                case 'NoColor':
                    return '#000000';
                case 'CustomColor':
                    return edgeColor;
                case 'EdgeColor':
                {
                    if (val < minVal)
                        return colors[0];
                    else
                        return colors[colors.Length - 1];
                }
            }
        }
        else
        {
            var v = 1 / colormapLength;
                if (maxVal > minVal)
                {
                    v = (val - minVal) / (maxVal - minVal);
                }

                var id = parseInt(Math.floor(v * colormapLength));
                if (id == colormapLength)
                {
                    id -= 1;
                }
                return colors[id];

        }
    };
    var GetSummerColor= function() {
            var colormapLength00 = 256;
            var clrmapstr = "";
            var r = 255;
            var g = 0;
            var b = 0;
            var n = 3 * colormapLength00 / 8;
                for (var i = 0; i < colormapLength00; i++)
                {
    
     
                    var temp = 1 - 1.0 * i / (colormapLength00 - 1);
                    
                   r = parseInt(255 * temp);
                   g = parseInt(255 * 0.5 * (1 + temp));
                   b = parseInt(255 * 0.4);
    
    
                    if (i > 0)
                        clrmapstr += "\n";
                    clrmapstr += parseInt(r) + " " + parseInt(g) + " " + parseInt(b);
                }
            return clrmapstr;
    };
    
    var GetBlueColor= function() {
        var colorMapLength = 256;
            var clrmapstr = "";
            var r = 255;
            var g = 0;
            var b = 0;
            var n = 3 * colorMapLength / 8;
                for (var i = 0; i < colorMapLength; i++)
                {
    
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
                        r = 255 - parseInt(255 * r);
                        g = 255 - parseInt(255 * g);
                        b = 255 - parseInt(255 * b);
                    }
    
    
                    if (i > 0)
                        clrmapstr += "\n";
                    clrmapstr += parseInt(r) + " " + parseInt(g) + " " + parseInt(b);
                }
            return clrmapstr;
    };
    
    var GetCoolColor= function() {
            var colormapLength00 = 256;
            var clrmapstr = "";
            var r = 255;
            var g = 0;
            var b = 0;
            var n = 3 * colormapLength00 / 8;
                for (var i = 0; i < colormapLength00; i++)
                {
                    var temp = 1.0 * i / (colormapLength00 - 1);
                    {
                        r = parseInt(255 * temp);
                        g = parseInt(255 * (1 - temp));
                    }
                    b = 255;
    
                    if (i > 0)
                        clrmapstr += "\n";
                    clrmapstr +=parseInt(r) + " " + parseInt(g) + " " + parseInt(b);
                }
            return clrmapstr;
     };
    
    var GetHotColor= function() {
            var colormapLength00 = 256;
            var clrmapstr = "";
            var r = 255;
            var g = 0;
            var b = 0;
            var n = 3 * colormapLength00 / 8;
            for (var i = 0; i < colormapLength00; i++)
            {
    
    
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
                  b = 1.0 * (i + 1 - 2 * n) / (colormapLength00 - 2 * n);
    
                
                {
                   b = 255 - parseInt(255 * r);
                   g = 255 - parseInt(255 * g);
                   r = 255 - parseInt(255 * b);
                }
    
    
    
               
    
                if (i > 0)
                    clrmapstr += "\n";
                clrmapstr += parseInt( r) + " " + parseInt(g) + " " + parseInt(b);
            }
            return clrmapstr;
    };
    
    var GetJetColor= function() {
            var colormapLength00 = 256;
            var clrmapstr = "";
            var r = 255;
            var g = 0;
            var b = 0;
    
                var jetclr = Jet(colormapLength00);
                colormapLength00 = jetclr.length;
    
                for (var i = 0; i < colormapLength00; i++)
                {
                    r = jetclr[i][1];
                    g = jetclr[i][2];
                    b = jetclr[i][3];
    
                    if (i > 0)
                        clrmapstr += "\n";
                    clrmapstr +=  r + " " + g + " " + b;
                }
            return clrmapstr;
        };
        Jet= function(colormapLength) {
            var reverse = false;
            var cmap = new Array();
            for(var k=0;k<colormapLength;k++){ 
                cmap[k]=[0,0,0,0];
                }
            var cMatrix = new Array();
            for(var k=0;k<colormapLength;k++){ 
                cMatrix[k]=[0,0,0];
                }
            var n = Math.ceil(colormapLength / 4.0);
            var nMod = 0;
            var fArray = new Array(3 * n - 1);
            var red = new Array(fArray.length);
            var green = new Array(fArray.length);
            var blue = new Array(fArray.length);
    
            if (colormapLength % 4 == 1)
            {
                nMod = 1;
            }
            for (var i = 0; i < fArray.length; i++)
            {
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
            for (var i = 0; i < blue.length; i++)
            {
                if (blue[i] > 0)
                    nb++;
            }
            for (var i = 0; i < colormapLength; i++)
            {
                for (var j = 0; j < red.length; j++)
                {
                    if (i == red[j] && red[j] < colormapLength)
                    {
                        if (reverse)
                            cMatrix[i][2] = fArray[i - red[0]];
                        else
                            cMatrix[i][0] = fArray[i - red[0]];
                    }
                }
                for (var j = 0; j < green.length; j++)
                {
                    if (i == green[j] && green[j] < colormapLength)
                        cMatrix[i][1] = fArray[i - green[0]];
                }
                for (var j = 0; j < blue.length; j++)
                {
                    if (i == blue[j] && blue[j] >= 0)
                    {
                        if (reverse)
                            cMatrix[i][0] = fArray[fArray.length - 1 - nb + i];
                        else
                            cMatrix[i][2] = fArray[fArray.length - 1 - nb + i];
                    }
                }
            }
            debugger
            for (var i = 0; i < colormapLength; i++)
            {
                cmap[i][0] = 255;
                for (var j = 0; j < 3; j++)
                {
                    cmap[i][j + 1] = parseInt(cMatrix[i][j] * 255);
                }
            }
            return cmap;
        
    };
    var GetSpringColor= function() {
            var colormapLength = 256;
            var clrmapstr = "";
                var r = 255;
                var g = 0;
                var b = 0;
                for (var i = 0; i < colormapLength; i++)
                {
    
                                 
                   r = 255;               
                    g = 255 - parseInt(255 *(1.0 * i / (colormapLength - 1)));
                    b = 255 - g;
    
                    if (i > 0)
                        clrmapstr += "\n";           
                    clrmapstr +=  r + " " + g + " " + b;
                }
            return clrmapstr;
    };
    
    var GetSummerColor= function() {
            var colormapLength = 256;
            var clrmapstr = "";
                var r = 255;
                var g = 0;
                var b = 0;
                var n = 3 * colormapLength / 8;
                for (var i = 0; i < colormapLength; i++)
                {
    
     
                    var temp = 1 - 1.0 * i / (colormapLength - 1);
                    
                   r = parseInt(255 * temp);
                   g = parseInt(255 * 0.5 * (1 + temp));
                   b = parseInt(255 * 0.4);
    
    
                    if (i > 0)
                        clrmapstr += "\n";
                    clrmapstr +=  parseInt(r) + " " + parseInt(g) + " " +parseInt(b);
                }
            return clrmapstr;
    };
    var GetAutumnColor= function() {
        var colormapLength = 256;
        var clrmapstr = "";
        var a = 255;
        var r = 255;
        var g = 0;
        var b = 0;
        for (var i = 0; i < colormapLength; i++)
        {
            if (i > 0)
                clrmapstr += "\n";

            g = parseInt(255 * (1 - 1.0 * i / (colormapLength - 1)));

            clrmapstr += a + " " + r + " " + g + " " + b; 
        }
        return clrmapstr;
};
    var GetWinterColor= function() {
            var colormapLength = 256;
            var clrmapstr = "";
            var r = 255;
            var g = 0;
            var b = 0;
            var n = 3 * colormapLength / 8;
                for (var i = 0; i < colormapLength; i++)
                {
    
    
    
                    var temp = 1.0 * i / (colormapLength - 1);
    
                    r = 0;
                    g = parseInt(255 * temp);
                    b = parseInt(255 * (1.0 - 0.5 * temp));
    
    
                    if (i > 0)
                        clrmapstr += "\n";
                    clrmapstr +=  parseInt(r) + " " + parseInt(g) + " " + parseInt(b);
                }
            return clrmapstr;
    };
    