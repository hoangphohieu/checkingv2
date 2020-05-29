"object" != typeof JSON && (JSON = {}), function () { "use strict"; var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta, rep; function f(t) { return t < 10 ? "0" + t : t } function this_value() { return this.valueOf() } function quote(t) { return rx_escapable.lastIndex = 0, rx_escapable.test(t) ? '"' + t.replace(rx_escapable, function (t) { var e = meta[t]; return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + t + '"' } function str(t, e) { var r, n, o, u, f, a = gap, i = e[t]; switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(t)), "function" == typeof rep && (i = rep.call(e, t, i)), typeof i) { case "string": return quote(i); case "number": return isFinite(i) ? String(i) : "null"; case "boolean": case "null": return String(i); case "object": if (!i) return "null"; if (gap += indent, f = [], "[object Array]" === Object.prototype.toString.apply(i)) { for (u = i.length, r = 0; r < u; r += 1)f[r] = str(r, i) || "null"; return o = 0 === f.length ? "[]" : gap ? "[\n" + gap + f.join(",\n" + gap) + "\n" + a + "]" : "[" + f.join(",") + "]", gap = a, o } if (rep && "object" == typeof rep) for (u = rep.length, r = 0; r < u; r += 1)"string" == typeof rep[r] && (o = str(n = rep[r], i)) && f.push(quote(n) + (gap ? ": " : ":") + o); else for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (o = str(n, i)) && f.push(quote(n) + (gap ? ": " : ":") + o); return o = 0 === f.length ? "{}" : gap ? "{\n" + gap + f.join(",\n" + gap) + "\n" + a + "}" : "{" + f.join(",") + "}", gap = a, o } } "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value), "function" != typeof JSON.stringify && (meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, JSON.stringify = function (t, e, r) { var n; if (gap = "", indent = "", "number" == typeof r) for (n = 0; n < r; n += 1)indent += " "; else "string" == typeof r && (indent = r); if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify"); return str("", { "": t }) }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) { var j; function walk(t, e) { var r, n, o = t[e]; if (o && "object" == typeof o) for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (void 0 !== (n = walk(o, r)) ? o[r] = n : delete o[r]); return reviver.call(t, e, o) } if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (t) { return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4) })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({ "": j }, "") : j; throw new SyntaxError("JSON.parse") }) }();
app.preferences.rulerUnits = Units.PIXELS; // hệ đo pixel
var selectFileJson;

{// tao folder in an
    var folderInAn = Folder("~/Desktop/in an");
    if (!folderInAn.exists) { folderInAn.create(); }
}

{ // thông số dialog
    var visibleDialog = true;
    var dialog = new Window("dialog");
    dialog.text = "In 1300x2400";
    dialog.preferredSize.width = 300;
    dialog.preferredSize.height = 150;
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10;
    dialog.margins = 16;

    // PANEL1
    // ======
    var panel1 = dialog.add("panel", undefined, undefined, { name: "panel1" });
    panel1.text = "File in";
    panel1.preferredSize.width = 300;
    panel1.orientation = "row";
    panel1.alignChildren = ["center", "fill"];
    panel1.spacing = 10;
    panel1.margins = 10;

    var selectJson = panel1.add("button", undefined, undefined, { name: "selectJson" });
    selectJson.text = "Select file";
    selectJson.justify = "left";

    var statictext1 = panel1.add("statictext", undefined, undefined, { name: "statictext1" });
    statictext1.text = "...";
    statictext1.preferredSize.width = 180;
    statictext1.justify = "center";



    // GROUP1
    // ======
    var group1 = dialog.add("group", undefined, { name: "group1" });
    group1.orientation = "row";
    group1.alignChildren = ["left", "center"];
    group1.spacing = 10;
    group1.margins = [0, 0, 0, 0];

    var button1 = group1.add("button", undefined, undefined, { name: "button1" });
    button1.text = "Create";

    var button2 = group1.add("button", undefined, undefined, { name: "button2" });
    button2.text = "Cancel";
}

// xử lý dialog
selectJson.onClick = function () {
    selectFileJson = File.openDialog("Please select file .json", "*.json");
    if (selectFileJson != null) {
        statictext1.text = decodeURI(selectFileJson.name);
    }
}
button2.onClick = function () { dialog.hide(); }
button1.onClick = function () {
    // alert(statictext1.text);
    dialog.hide();

    if (statictext1.text !== "...") {

        var file = new File(selectFileJson);
        file.open("r");
        var strFile;
        strFile = file.read();
        file.close();
        // read data from json
        var data = JSON.parse(strFile);
        var type = data.type;
        switch (type) {
            case "glass":
                createTableGlass(data, type);
                break;
            case "luminous":
                createTableLuminous(data, type);
                break;
            case "led":
                createTableLed(data, type);
                break;
            case "silicon":
                createTableSilicon(data, type);
                break;

            default:
                alert("co loi xay ra, vui long goi Hieu");
                break;
        }



    }
    else { alert("hay chon file .Json") }

}

function createTableGlass(data) {
    var arr = data.items;
    var day = data.day; var type = data.type;
    var mounth = data.mounth; var hour = data.hour;
    var wAll = 2400, hAll = 1300;
    hAll = Math.round(hAll / 0.084667);
    wAll = Math.round(wAll / 0.084667);


    var yPosition, xPosition, hLast, wLast;
    var stt = 0;



    { // tạo nhãn
        createTem(); // hàm tạo tem và nhãn
        for (var i = 0; i <= arr.length - 1; i++) {
            for (var j = 0; j <= arr[i].length - 1; j++) {
                moveTem(arr[i][j], type);
                var folder1 = Folder("~/Desktop/in an/Glass " + (i + 1) + "_" + hour + "_" + day + "_" + mounth + "/tem");
                if (!folder1.exists) { folder1.create(); }
                app.activeDocument.saveAs(Folder("~/Desktop/in an/Glass " + (i + 1) + "_" + hour + "_" + day + "_" + mounth + "/tem/" + arr[i][j].stt + ".jpg"), JPEGSaveOptions, true, Extension.LOWERCASE);


            }
        }
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

    }
};
function createTableLuminous(data) {
    var arr = data.items;
    var day = data.day; var type = data.type;
    var mounth = data.mounth; var hour = data.hour;
    var wAll = 2400, hAll = 1300;
    hAll = Math.round(hAll / 0.084667);
    wAll = Math.round(wAll / 0.084667);


    var yPosition, xPosition, hLast, wLast;
    var stt = 0;
    for (var i = 0; i <= arr.length - 1; i++) { // loop làm file in
        app.documents.add(wAll, hAll, 300, "GLLM");
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "CMYK";
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "SPOT";

        yPosition = 0;
        xPosition = 0;
        hLast = 0;
        wLast = 0;
        var lastName = "";
        GLLMOneTable(arr, wAll, hAll, yPosition, xPosition, hLast, wLast, lastName, stt, i);

        { // xử lý sau khi duplicate hết items
            app.activeDocument.activeLayer = app.activeDocument.layerSets["SPOT"].artLayers.getByName("SPOTKhung");
            var PSpotKhung = app.activeDocument.activeLayer.bounds;
            app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
            app.activeDocument.rotateCanvas(180);
            app.doAction("selectArea", "autoUv");
            app.doAction("createSPOTWithArea", "autoUv");
        }
        { // lưu file khung
            app.activeDocument.layerSets.getByName("SPOT").visible = false;
            app.activeDocument.layerSets.getByName("CMYK").visible = false;
            var folder1 = Folder("~/Desktop/in an/Luminous " + (i + 1) + "_" + hour + "_" + day + "_" + mounth);
            if (!folder1.exists) { folder1.create(); }
            app.activeDocument.saveAs(Folder("~/Desktop/in an/Luminous " + (i + 1) + "_" + hour + "_" + day + "_" + mounth + "/khung.tif"), TiffSaveOptions, false, Extension.LOWERCASE);
        }
        {// lưu file in
            app.activeDocument.channels.getByName("Spot Color 1").remove();
            app.activeDocument.layerSets.getByName("CMYK").visible = true;

            app.activeDocument.saveAs(Folder("~/Desktop/in an/Luminous " + (i + 1) + "_" + hour + "_" + day + "_" + mounth + "/in.tif"), TiffSaveOptions, false, Extension.LOWERCASE);

        }
        {
            app.activeDocument.activeLayer = app.activeDocument.layerSets.getByName("CMYK");
            app.doAction("createSmarkOBJ", "autoUv");
            app.doAction("selectArea", "autoUv");
            app.doAction("createSPOTWithArea", "autoUv");
            app.activeDocument.artLayers.getByName("CMYK").visible = false;
            app.activeDocument.saveAs(Folder("~/Desktop/in an/Luminous " + (i + 1) + "_" + hour + "_" + day + "_" + mounth + "/white.tif"), TiffSaveOptions, false, Extension.LOWERCASE);
        }
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    } // hết làm file
    { // tạo nhãn
        createTem(); // hàm tạo tem và nhãn
        for (var i = 0; i <= arr.length - 1; i++) {
            for (var j = 0; j <= arr[i].length - 1; j++) {
                moveTem(arr[i][j], day, mounth);
                var folder1 = Folder("~/Desktop/in an/Luminous " + (i + 1) + "_" + hour + "_" + day + "_" + mounth + "/tem");
                if (!folder1.exists) { folder1.create(); }
                app.activeDocument.saveAs(Folder("~/Desktop/in an/Luminous " + (i + 1) + "_" + hour + "_" + day + "_" + mounth + "/tem/" + arr[i][j].stt + ".jpg"), JPEGSaveOptions, true, Extension.LOWERCASE);
            }
        }
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
};
function createTableSilicon(data) {
    var type = data.items;
    var day = data.day; var type = data.type;
    var mounth = data.mounth; var hour = data.hour;
    var hAll = 6496, wAll = 10039;

    { // khoảng cách padding của bàn mica
        var paddingLeft = 20;
        var paddingBottom = 10;
    }
    {
        var paddingPrintTB = 4;
        var paddingPrintLR = 3;
    }
    { // khung để đặt ốp, có chiều 100 x 180 mm
        var wk = Math.round(100 / 0.084667);
        var hk = Math.round(180 / 0.084667);
    }
    paddingBottom = Math.round(paddingBottom / 0.084667);
    paddingLeft = Math.round(paddingLeft / 0.084667);

    for (var arr = 0; arr <= type.length - 1; arr++) {
        if (type[arr].length != 0) {
            for (var ban = 0; ban <= type[arr].length - 1; ban++) { // loop  1 bàn
                { // tạo bảng in và group CMYK, SPOT
                    app.documents.add(wAll, hAll, 300, "silicon");
                    app.activeDocument.layerSets.add();
                    app.activeDocument.activeLayer.name = "CMYK";
                    app.activeDocument.layerSets.add();
                    app.activeDocument.activeLayer.name = "SPOT";
                }

                for (var i = 0; i <= type[arr][ban].length - 1; i++) { // loop 1 hàng
                    for (var j = 0; j <= type[arr][ban][i].length - 1; j++) { // lop 1 cái
                        var wphone = type[arr][ban][i][j].pixel.w;
                        var hphone = type[arr][ban][i][j].pixel.h;
                        wphone = Math.round((wphone - paddingPrintLR) / 0.084667);
                        hphone = Math.round((hphone - paddingPrintTB) / 0.084667);


                        try {
                            app.open(File("D:/DATA/file design/" + type[arr][ban][i][j].sku + ".tif"));
                            app.activeDocument.flipCanvas(Direction.HORIZONTAL);
                        } catch (error) {
                            app.documents.add(1200, 2400, 300, "aaaa");

                        }

                        var checksku = type[arr][ban][i][j].sku.split("-");
                        checksku = checksku[checksku.length - 1];
                        if (checksku != "spot") {
                            if (app.activeDocument.artLayers.length === 1) { // nhân đôi layer, kiểm tra nếu có 2 layer là phải làm lại từ đầu
                                app.activeDocument.rotateCanvas(180);
                                app.activeDocument.activeLayer.name = "1";
                                app.activeDocument.activeLayer.duplicate(app.activeDocument.activeLayer, ElementPlacement.PLACEBEFORE); // nhân đôi layer
                                app.activeDocument.resizeCanvas(wphone, hphone); // resize canvas về cỡ cần in với loại điện thoại

                                { // resize layer về cỡ cần in
                                    if ((hphone / wphone) < 2) { var newSize = (wphone * 100 / 1200) }
                                    else { var newSize = (hphone * 100 / 2400) }
                                    app.activeDocument.artLayers["1 copy"].resize(newSize, newSize, AnchorPosition.MIDDLECENTER);
                                }

                                { // xử lý và đưa ảnh sang bàn silicon
                                    app.activeDocument.mergeVisibleLayers(); // gộp all layer 
                                    if (type[arr][ban][i][j].case.slice(0, 1) == "i")
                                        app.doAction("createRectangle120", "autoUv");
                                    else
                                        app.doAction("createRectangle80", "autoUv");

                                    var cropw = wphone * 100 / 1000;
                                    var croph = hphone * 100 / 1500;
                                    app.activeDocument.activeLayer.resize(cropw, croph, AnchorPosition.MIDDLECENTER);
                                    app.doAction("selectAreaLayer", "autoUv");
                                    app.activeDocument.artLayers.getByName("Rounded Rectangle 1").remove();

                                    app.doAction("duplicateSelection", "autoUv"); // tạo layer mới từ vùng chọn
                                    app.activeDocument.activeLayer.name = type[arr][ban][i][j].stt; // đặt tên cho layer voi stt
                                    app.activeDocument.activeLayer.duplicate(app.documents["silicon"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                                    app.activeDocument.activeLayer.name = "2";
                                    app.doAction("createSpot", "autoUv");
                                    app.doAction("strokeWhite1px", "autoUv");
                                    app.activeDocument.artLayers["1"].name = type[arr][ban][i][j].stt; // đặt tên cho layer voi stt
                                    app.activeDocument.activeLayer.duplicate(app.documents["silicon"].layerSets["SPOT"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                                    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                                }

                                { // translate layer đến vị trí cần in
                                    app.activeDocument.activeLayer = app.activeDocument.layerSets["CMYK"].artLayers.getByName(type[arr][ban][i][j].stt);
                                    app.doAction("moveZero", "autoUv");
                                    app.activeDocument.activeLayer.translate(paddingLeft + j * wk + Math.round(paddingPrintLR / (2 * 0.084667)), (paddingBottom + i * hk + Math.round(paddingPrintTB / (2 * 0.084667))) * (-1));
                                    app.activeDocument.activeLayer = app.activeDocument.layerSets["SPOT"].artLayers.getByName(type[arr][ban][i][j].stt);
                                    app.doAction("moveZero", "autoUv");
                                    app.activeDocument.activeLayer.translate(paddingLeft + j * wk + Math.round(paddingPrintLR / (2 * 0.084667)), (paddingBottom + i * hk + Math.round(paddingPrintTB / (2 * 0.084667))) * (-1));
                                }
                            }
                            else { alert("file design khong > 1 layer") };

                        }
                        else {
                            if (app.activeDocument.artLayers.length === 1) { // nhân đôi layer, kiểm tra nếu có 2 layer là phải làm lại từ đầu
                                app.activeDocument.rotateCanvas(180);
                                app.activeDocument.activeLayer.name = "1";
                                app.activeDocument.artLayers.add();
                                app.doAction("strokeWhite1px", "autoUv");
                                app.activeDocument.mergeVisibleLayers();

                                // app.activeDocument.activeLayer.duplicate(app.activeDocument.activeLayer, ElementPlacement.PLACEBEFORE); // nhân đôi layer
                                app.activeDocument.resizeCanvas(wphone, hphone); // resize canvas về cỡ cần in với loại điện thoại

                                { // resize layer về cỡ cần in
                                    if ((hphone / wphone) < 2) { var newSize = (wphone * 100 / 1200) }
                                    else { var newSize = (hphone * 100 / 2400) }
                                    app.activeDocument.artLayers[0].resize(newSize, newSize, AnchorPosition.MIDDLECENTER);
                                }

                                { // xử lý và đưa ảnh sang bàn silicon
                                    // app.activeDocument.mergeVisibleLayers(); // gộp all layer 
                                    app.activeDocument.selection.selectAll(); // chọn tất cả ctrl + A
                                    if (type[arr][ban][i][j].case.slice(0, 1) == "i")
                                        app.doAction("createRectangle120", "autoUv");
                                    else
                                        app.doAction("createRectangle80", "autoUv");

                                    var cropw = wphone * 100 / 1000;
                                    var croph = hphone * 100 / 1500;
                                    app.activeDocument.activeLayer.resize(cropw, croph, AnchorPosition.MIDDLECENTER);
                                    app.doAction("selectAreaLayer", "autoUv");
                                    app.activeDocument.artLayers.getByName("Rounded Rectangle 1").remove();
                                    app.doAction("duplicateSelection", "autoUv"); // tạo layer mới từ vùng chọn
                                    app.doAction("strokeWhite1px", "autoUv");
                                    app.activeDocument.activeLayer.name = type[arr][ban][i][j].stt; // đặt tên cho layer voi stt
                                    app.activeDocument.activeLayer.duplicate(app.documents["silicon"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                                    app.activeDocument.activeLayer.name = "2";
                                    app.doAction("createSpot-spot", "autoUv");
                                    app.doAction("strokeWhite1px", "autoUv");
                                    app.activeDocument.artLayers[0].name = type[arr][ban][i][j].stt; // đặt tên cho layer voi stt
                                    app.activeDocument.activeLayer.duplicate(app.documents["silicon"].layerSets["SPOT"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                                    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                                }

                                { // translate layer đến vị trí cần in
                                    app.activeDocument.activeLayer = app.activeDocument.layerSets["CMYK"].artLayers.getByName(type[arr][ban][i][j].stt);
                                    app.doAction("moveZero", "autoUv");
                                    app.activeDocument.activeLayer.translate(paddingLeft + j * wk + Math.round(paddingPrintLR / (2 * 0.084667)), (paddingBottom + i * hk + Math.round(paddingPrintTB / (2 * 0.084667))) * (-1));
                                    app.activeDocument.activeLayer = app.activeDocument.layerSets["SPOT"].artLayers.getByName(type[arr][ban][i][j].stt);
                                    app.doAction("moveZero", "autoUv");
                                    app.activeDocument.activeLayer.translate(paddingLeft + j * wk + Math.round(paddingPrintLR / (2 * 0.084667)), (paddingBottom + i * hk + Math.round(paddingPrintTB / (2 * 0.084667))) * (-1));
                                }

                            }
                            else { alert("file design khong > 1 layer") };
                        }





                    }
                }
                app.doAction("createSpotChannel", "autoUv"); //đã xếp xong, tạo kênh spot
                app.activeDocument.layerSets.getByName("SPOT").visible = false;

                app.activeDocument.rotateCanvas(180);
                app.doAction("createStroke3", "autoUv");
                if (arr == 0)
                    var folder1 = Folder("~/Desktop/in an/z9-silicon " + (ban + 1) + " ngay " + day);
                else
                    var folder1 = Folder("~/Desktop/in an/z10-silicon " + (ban + 1) + " ngay " + day);

                if (!folder1.exists) { folder1.create(); }
                app.activeDocument.saveAs(folder1, TiffSaveOptions, false, Extension.LOWERCASE);
                app.activeDocument.close();
            }
            {// chạy nhãn dán

                createTem(); // hàm tạo tem và nhãn
                { // chaạy nhãn
                    for (var ban = 0; ban <= type[arr].length - 1; ban++) { // loop  1 bàn
                        for (var i = 0; i <= type[arr][ban].length - 1; i++) { // loop 1 hàng
                            for (var j = 0; j <= type[arr][ban][i].length - 1; j++) { // lop 1 cái
                                moveTem(type[arr][ban][i][j], day, mounth);
                                if (arr == 0)
                                    var folder1 = Folder("~/Desktop/in an/z9-silicon " + (ban + 1) + " ngay " + day + "/tem");
                                else
                                    var folder1 = Folder("~/Desktop/in an/z10-silicon " + (ban + 1) + " ngay " + day + "/tem");
                                if (!folder1.exists) { folder1.create(); }
                                if (arr == 0)
                                    app.activeDocument.saveAs(Folder("~/Desktop/in an/z9-silicon " + (ban + 1) + " ngay " + day + "/tem/ " + type[arr][ban][i][j].stt + ".jpg"), JPEGSaveOptions, true, Extension.LOWERCASE);
                                else
                                    app.activeDocument.saveAs(Folder("~/Desktop/in an/z10-silicon " + (ban + 1) + " ngay " + day + "/tem/ " + type[arr][ban][i][j].stt + ".jpg"), JPEGSaveOptions, true, Extension.LOWERCASE);


                            }
                        }
                    }
                }
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

            }
        }


    }

};
function createTableLed(data) {
    var arr = data.items;
    var day = data.day; var type = data.type;
    var mounth = data.mounth; var hour = data.hour;

    var hItem, wItem, yPosition, xPosition, hLast, wLast;
    var stt = 0;

    var wAll = 2400, hAll = 1300;
    hAll = Math.round(hAll / 0.084667);
    wAll = Math.round(wAll / 0.084667);


    var yPosition, xPosition, hLast, wLast;
    var stt = 0;

    for (var i = 0; i <= arr.length - 1; i++) { // loop làm file in
        app.documents.add(wAll, hAll, 300, "GLLM");
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "CMYK";
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "SPOT";
        app.activeDocument.layerSets.add();
        app.activeDocument.activeLayer.name = "SPOT2";

        yPosition = 0;
        xPosition = 0;
        hLast = 0;
        wLast = 0;
        var lastName = "";
        LEDOneTable(arr, wAll, hAll, yPosition, xPosition, hLast, wLast, lastName, stt, i);

        { // xử lý sau khi duplicate hết items
            app.activeDocument.activeLayer = app.activeDocument.layerSets["SPOT"].artLayers.getByName("SPOTKhung");
            var PSpotKhung = app.activeDocument.activeLayer.bounds;
            app.activeDocument.crop(PSpotKhung, 0, PSpotKhung[2] - PSpotKhung[0], PSpotKhung[3] - PSpotKhung[1]);
            app.activeDocument.rotateCanvas(180);
            app.doAction("selectArea", "autoUv");
            app.doAction("createSPOTWithArea", "autoUv");
        }
        { // lưu file khung
            app.activeDocument.layerSets.getByName("SPOT").visible = false;
            app.activeDocument.layerSets.getByName("SPOT2").visible = false;
            app.activeDocument.layerSets.getByName("CMYK").visible = false;
            var folder1 = Folder("~/Desktop/in an/Led " + (i + 1) + "_" + hour + "_" + day + "_" + mounth);
            if (!folder1.exists) { folder1.create(); }
            app.activeDocument.saveAs(Folder("~/Desktop/in an/Led " + (i + 1) + "_" + hour + "_" + day + "_" + mounth + "/khung.tif"), TiffSaveOptions, false, Extension.LOWERCASE);

        }
        {// lưu file in 1
            app.activeDocument.channels.getByName("Spot Color 1").remove();
            app.activeDocument.layerSets.getByName("CMYK").visible = true;
            app.activeDocument.activeLayer = app.activeDocument.layerSets.getByName("CMYK");
            app.doAction("createSmarkOBJ", "autoUv");
            app.doAction("selectArea", "autoUv");
            app.doAction("createSPOTWithArea", "autoUv");
            app.activeDocument.activeLayer = app.activeDocument.layerSets.getByName("SPOT2").artLayers.getByName("SPOTWhite");
            app.doAction("selectArea", "autoUv");
            app.activeDocument.activeChannels = [app.activeDocument.channels.getByName("Spot Color 1")];
            app.doAction("fillChannelsLED0", "autoUv");
            showRGBChannel();
            app.activeDocument.channels.getByName("Spot Color 1").visible = true;
            app.activeDocument.saveAs(Folder("~/Desktop/in an/Led " + (i + 1) + "_" + hour + "_" + day + "_" + mounth + "/in 1.tif"), TiffSaveOptions, false, Extension.LOWERCASE);

        }
        { // lưu file in 2
            app.activeDocument.channels.getByName("Spot Color 1").remove();
            app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("CMYK");
            app.doAction("selectArea", "autoUv");
            {
                var bColor = new SolidColor;
                bColor.cmyk.cyan = 75;
                bColor.cmyk.magenta = 68;
                bColor.cmyk.yellow = 67;
                bColor.cmyk.black = 90;
                var wColor = new SolidColor;
                wColor.cmyk.cyan = 0;
                wColor.cmyk.magenta = 0;
                wColor.cmyk.yellow = 0;
                wColor.cmyk.black = 0;
            }
            app.activeDocument.artLayers.add();
            app.activeDocument.activeLayer.name = "black";
            app.activeDocument.selection.fill(bColor);
            app.activeDocument.artLayers.getByName("CMYK").visible = false;

            app.activeDocument.activeLayer = app.activeDocument.layerSets.getByName("SPOT2").artLayers.getByName("SPOTWhite");
            app.doAction("selectArea", "autoUv");
            app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("black");
            app.activeDocument.selection.fill(wColor);
            app.activeDocument.selection.deselect();
            app.doAction("createSPOTWithArea", "autoUv");
            app.activeDocument.activeLayer = app.activeDocument.layerSets.getByName("SPOT2").artLayers.getByName("SPOTWhite");
            app.doAction("selectArea", "autoUv");
            app.activeDocument.activeChannels = [app.activeDocument.channels.getByName("Spot Color 1")];
            app.doAction("fillChannelsLED20", "autoUv");
            showRGBChannel();
            app.activeDocument.saveAs(Folder("~/Desktop/in an/Led " + (i + 1) + "_" + hour + "_" + day + "_" + mounth + "/in 2.tif"), TiffSaveOptions, false, Extension.LOWERCASE);



        }
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }

    { // tạo nhãn
        createTem(); // hàm tạo tem và nhãn
        for (var i = 0; i <= arr.length - 1; i++) {
            for (var j = 0; j <= arr[i].length - 1; j++) {
                moveTem(arr[i][j], day, mounth);
                var folder1 = Folder("~/Desktop/in an/Led " + (i + 1) + "_" + hour + "_" + day + "_" + mounth + "/tem");
                if (!folder1.exists) { folder1.create(); }
                app.activeDocument.saveAs(Folder("~/Desktop/in an/Led " + (i + 1) + "_" + hour + "_" + day + "_" + mounth + "/tem/" + arr[i][j].stt + ".jpg"), JPEGSaveOptions, true, Extension.LOWERCASE);


            }
        }
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

    }
};

function createTem() {
    var wtem = 50; var htem = 30;
    wtem = Math.round(wtem / 0.084667);
    htem = Math.round(htem / 0.084667);
    app.documents.add(wtem, htem, 300, "tem");

    { // màu chữ đen
        var colorTextBlack = new SolidColor(); // tao mau cho layer
        colorTextBlack.rgb.red = 0;
        colorTextBlack.rgb.green = 0;
        colorTextBlack.rgb.blue = 0;
    }
    { // tạo id client
        app.activeDocument.artLayers.add(); // tao layer text
        app.activeDocument.activeLayer.kind = LayerKind.TEXT;
        app.doAction("changeFontRoboto", "autoUv");
        app.activeDocument.activeLayer.name = "name";
        app.activeDocument.activeLayer.textItem.contents = "name";
        app.activeDocument.activeLayer.textItem.kind = TextType.PARAGRAPHTEXT; // loại text
        app.activeDocument.activeLayer.textItem.width = 100; // chiều rộng của khung
        app.activeDocument.activeLayer.textItem.height = 60; // chiều cao của khung
        app.activeDocument.activeLayer.textItem.autoLeadingAmount = 80; // leading - khoảng cách giữa 2 dòng
        app.activeDocument.activeLayer.textItem.justification = Justification.CENTER; // căn giữa
        app.activeDocument.activeLayer.textItem.size = 15; // font size
        app.activeDocument.activeLayer.textItem.color = colorTextBlack; // màu chữ 

    }
    { // tao thanh chia

        app.doAction("createRectangleTem", "autoUv");
        app.activeDocument.artLayers.getByName("Rectangle 1").translate(430, 0);
        app.doAction("moveRectangle", "autoUv");
        app.activeDocument.artLayers.getByName("Rectangle 1").translate(0, - app.activeDocument.height);
        app.activeDocument.artLayers.getByName("Rectangle 1").translate(0, 270);

    }

    { // tao ngay in 
        app.activeDocument.artLayers.add(); // tao layer text
        app.activeDocument.activeLayer.kind = LayerKind.TEXT;
        app.activeDocument.activeLayer.name = "date";
        app.activeDocument.activeLayer.textItem.contents = "date";
        app.activeDocument.activeLayer.textItem.kind = TextType.PARAGRAPHTEXT; // loại text
        app.activeDocument.activeLayer.textItem.width = 100; // chiều rộng của khung
        app.activeDocument.activeLayer.textItem.justification = Justification.CENTER; // căn giữa
        app.activeDocument.activeLayer.textItem.size = 10; // font size
        app.activeDocument.activeLayer.textItem.color = colorTextBlack; // màu chữ 
        app.doAction("moveTL", "autoUv");
        app.activeDocument.artLayers.getByName("date").translate(0, 200);

    }
    { // tạo barcode
        app.activeDocument.artLayers.add(); // tao layer text
        app.activeDocument.activeLayer.kind = LayerKind.TEXT;
        app.doAction("changeFontBarcode", "autoUv");
        app.activeDocument.activeLayer.name = "barcode";
        app.activeDocument.activeLayer.textItem.contents = "ËÊÊÊÊÊÊÊÌ";
        // app.activeDocument.activeLayer.textItem.kind = TextType.PARAGRAPHTEXT; // loại text
        // app.activeDocument.activeLayer.textItem.width = 120; // chiều rộng của khung
        // app.activeDocument.activeLayer.textItem.height = 80; // chiều cao của khung
        app.activeDocument.activeLayer.textItem.justification = Justification.CENTER; // căn giữa
        app.activeDocument.activeLayer.textItem.size = 20; // font size
        app.activeDocument.activeLayer.textItem.color = colorTextBlack; // màu chữ 


    }

    {// tao stt
        app.activeDocument.artLayers.add(); // tao layer text
        app.activeDocument.activeLayer.kind = LayerKind.TEXT;
        app.activeDocument.activeLayer.name = "stt";
        app.activeDocument.activeLayer.textItem.contents = "stt";
        app.activeDocument.activeLayer.textItem.size = 13; // font size
        app.activeDocument.activeLayer.textItem.color = colorTextBlack; // màu chữ 



    }

    {// tao amount
        app.activeDocument.artLayers.add(); // tao layer text
        app.activeDocument.activeLayer.kind = LayerKind.TEXT;
        app.activeDocument.activeLayer.name = "amount";
        app.activeDocument.activeLayer.textItem.contents = "amount";
        app.activeDocument.activeLayer.textItem.size = 20; // font size
        app.activeDocument.activeLayer.textItem.color = colorTextBlack; // màu chữ 
        app.activeDocument.activeLayer.textItem.fauxBold = true;
    }

}
function convertDate(date, type, country) {
    var _type = type;
    switch (type) {
        case "luminous":
            _type = "Lu"
            break;
        case "glass":
            _type = "Gl"
            break;
        case "silicon":
            _type = "Si"
            break;
        case "led":
            _type = "Le"
            break;
        default:
            break;
    }
    var nameDate = new Date(date).getDate() + "-" + (new Date(date).getMonth() + 1) + " " + _type + " / " + country;
    return nameDate
}
function moveTem(item, type) {
    // alert(type)
    var PRectangleTem = app.activeDocument.artLayers.getByName("Rectangle 1").bounds;
    app.activeDocument.artLayers.getByName("date").textItem.contents = convertDate(item.date, type, item.country);
    app.activeDocument.artLayers.getByName("name").textItem.contents = item.name;
    app.activeDocument.artLayers.getByName("barcode").textItem.contents = item.barcode;
    app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("barcode");
    app.doAction("moveBarcode", "autoUv");
    app.activeDocument.artLayers.getByName("barcode").translate(0, 120);
    app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("name");
    app.doAction("moveTL", "autoUv");
    var Pname = app.activeDocument.artLayers.getByName("name").bounds;
    app.activeDocument.activeLayer.translate(10, (260 + Pname[1] - Pname[3]) / 2);

    app.activeDocument.artLayers.getByName("stt").textItem.contents = item.stt;
    app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("stt");
    app.doAction("moveTL", "autoUv");
    var PStt = app.activeDocument.artLayers.getByName("stt").bounds;
    app.activeDocument.artLayers.getByName("stt").translate(
        PRectangleTem[2] + ((app.activeDocument.width - PRectangleTem[2] - PStt[2] + PStt[0]) / 2),
        (app.activeDocument.height / 2) + ((app.activeDocument.height / 2) - PStt[3] + PStt[1]) / 4);

    if (item.amount <= 1) { app.activeDocument.artLayers.getByName("amount").textItem.contents = "" }
    else {
        app.activeDocument.artLayers.getByName("amount").textItem.contents = item.amount;
    }

    app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("amount");
    app.doAction("moveTL", "autoUv");
    var PAmount = app.activeDocument.artLayers.getByName("amount").bounds;
    app.activeDocument.artLayers.getByName("amount").translate(PRectangleTem[2] + ((app.activeDocument.width - PRectangleTem[2] - PAmount[2] + PAmount[0]) / 2), ((app.activeDocument.height / 2) - PAmount[3] + PAmount[1]) / 2);
}


function GLLMOneTable(arr, wAll, hAll, yPosition, xPosition, hLast, wLast, lastName, stt, i) {
    // for loop items

    for (var j = 0; j <= arr[i].length - 1; j++) {
        var wphone = arr[i][j].pixel.w;
        var hphone = arr[i][j].pixel.h;
        wphone = Math.round(wphone / 0.084667);
        hphone = Math.round(hphone / 0.084667);
        stt = arr[i][j].stt;
        if (yPosition + hLast + hphone <= hAll) {
            if (wLast == wphone) {
                yPosition = yPosition + hLast;
                hLast = hphone;
                wLast = wphone;
            }
            else {
                yPosition = 0;
                xPosition = xPosition + wLast;
                hLast = hphone;
                wLast = wphone;
            }
        }
        else {
            yPosition = 0;
            xPosition = xPosition + wLast;
            hLast = hphone;
            wLast = wphone;
        }


        // try {
        app.open(File("D:/DATA/file design/" + arr[i][j].sku + ".tif"));
        // } catch (error) {
        //     app.documents.add(1200, 2400, 300, "aaaa");
        // }
        if (app.activeDocument.width !== 1200 || app.activeDocument.height !== 2400) {
            alert(arr[i][j].sku, " khác cỡ 1200 x 2400 !")
        }
        else if (app.activeDocument.artLayers.length === 1) {
            app.activeDocument.activeLayer.name = "1";
            app.activeDocument.activeLayer.duplicate(app.activeDocument.activeLayer, ElementPlacement.PLACEBEFORE); // nhân đôi layer
            app.activeDocument.resizeCanvas(wphone, hphone); // resize canvas về cỡ cần in với loại điện thoại
            { // resize layer về cỡ cần in
                if ((hphone / wphone) < 2) { var newSize = (wphone * 100 / 1200) }
                else { var newSize = (hphone * 100 / 2400) }
                app.activeDocument.artLayers["1 copy"].resize(newSize, newSize, AnchorPosition.MIDDLECENTER);
                app.activeDocument.mergeVisibleLayers(); // gộp all layer 

            }
            { // xử lý file in và duplicate sang bàn GLLM
                app.activeDocument.activeLayer.name = arr[i][j].stt; // đặt tên cho layer voi stt
                app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                app.activeDocument.artLayers.add();
                app.activeDocument.artLayers.getByName(arr[i][j].stt).remove();
                app.doAction("strokeRed1px", "autoUv");

                app.activeDocument.artLayers.add();
                app.activeDocument.activeLayer.kind = LayerKind.TEXT;
                app.activeDocument.activeLayer.textItem.contents = arr[i][j].stt;
                app.activeDocument.activeLayer.textItem.size = 30;
                var textColor = new SolidColor;
                textColor.rgb.red = 255;
                textColor.rgb.green = 0;
                textColor.rgb.blue = 0;
                app.activeDocument.activeLayer.textItem.color = textColor;
                app.activeDocument.activeLayer.name = "1 copy";
                app.doAction("moveCenter", "autoUv");
                app.activeDocument.activeLayer.name = "1 copy 2";


                if (arr[i][j].case != lastName) {
                    app.activeDocument.artLayers.add();
                    app.activeDocument.activeLayer.kind = LayerKind.TEXT;
                    app.activeDocument.activeLayer.textItem.contents = arr[i][j].case;
                    app.activeDocument.activeLayer.textItem.size = 40;
                    app.activeDocument.activeLayer.textItem.color = textColor;
                    app.activeDocument.activeLayer.name = "1 copy";
                    app.doAction("moveCenter", "autoUv");
                    app.activeDocument.activeLayer.translate(0, 300);
                    lastName = arr[i][j].case;
                }
                app.activeDocument.mergeVisibleLayers();
                app.activeDocument.activeLayer.name = arr[i][j].stt;

                app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["SPOT"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            }

            { // translate layer đến vị trí cần in
                app.activeDocument.activeLayer = app.activeDocument.layerSets["CMYK"].artLayers.getByName(arr[i][j].stt);
                app.doAction("moveZero", "autoUv");
                app.activeDocument.activeLayer.translate(xPosition, yPosition * (-1));
                app.activeDocument.activeLayer = app.activeDocument.layerSets["SPOT"].artLayers.getByName(arr[i][j].stt);
                app.doAction("moveZero", "autoUv");
                app.activeDocument.activeLayer.translate(xPosition, yPosition * (-1));
                if (j > 0) app.activeDocument.activeLayer.merge();
                app.activeDocument.activeLayer.name = "SPOTKhung";
            }
        }
        else { alert("file design không > 1 layer !") };

    }

}
function LEDOneTable(arr, wAll, hAll, yPosition, xPosition, hLast, wLast, lastName, stt, i) {
    // for loop items
    for (var j = 0; j <= arr[i].length - 1; j++) {
        var wphone = arr[i][j].pixel.w;
        var hphone = arr[i][j].pixel.h;
        wphone = Math.round(wphone / 0.084667);
        hphone = Math.round(hphone / 0.084667);
        stt = arr[i][j].stt;
        if (yPosition + hLast + hphone <= hAll) {
            if (wLast == wphone) {
                yPosition = yPosition + hLast;
                hLast = hphone;
                wLast = wphone;
            }
            else {
                yPosition = 0;
                xPosition = xPosition + wLast;
                hLast = hphone;
                wLast = wphone;
            }
        }
        else {
            yPosition = 0;
            xPosition = xPosition + wLast;
            hLast = hphone;
            wLast = wphone;
        }


        try {
            app.open(File("D:/DATA/file design/" + arr[i][j].sku + ".tif"));
        } catch (error) {
            app.documents.add(1200, 2400, 300, "aaaa");
        }
        if (app.activeDocument.width !== 1200 || app.activeDocument.height !== 2400) {
            alert(arr[i][j].sku, " khác cỡ 1200 x 2400 !")
        }
        else if (app.activeDocument.artLayers.length === 1) {
            app.activeDocument.activeLayer.name = "1";
            app.activeDocument.activeLayer.duplicate(app.activeDocument.activeLayer, ElementPlacement.PLACEBEFORE); // nhân đôi layer
            app.activeDocument.resizeCanvas(wphone, hphone); // resize canvas về cỡ cần in với loại điện thoại
            { // resize layer về cỡ cần in
                if ((hphone / wphone) < 2) { var newSize = (wphone * 100 / 1200) }
                else { var newSize = (hphone * 100 / 2400) }
                app.activeDocument.artLayers["1 copy"].resize(newSize, newSize, AnchorPosition.MIDDLECENTER);
                app.activeDocument.mergeVisibleLayers(); // gộp all layer 

            }
            { // xử lý file in và duplicate sang bàn GLLM
                app.activeDocument.activeLayer.name = arr[i][j].stt; // đặt tên cho layer voi stt
                app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["CMYK"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                app.activeDocument.artLayers.add();
                app.activeDocument.artLayers.getByName(arr[i][j].stt).remove();
                app.doAction("strokeRed1px", "autoUv");

                app.activeDocument.artLayers.add();
                app.activeDocument.activeLayer.kind = LayerKind.TEXT;
                app.activeDocument.activeLayer.textItem.contents = arr[i][j].stt;
                app.activeDocument.activeLayer.textItem.size = 30;
                var textColor = new SolidColor;
                textColor.rgb.red = 255;
                textColor.rgb.green = 0;
                textColor.rgb.blue = 0;
                app.activeDocument.activeLayer.textItem.color = textColor;
                app.activeDocument.activeLayer.name = "1 copy";
                app.doAction("moveCenter", "autoUv");
                app.activeDocument.activeLayer.name = "1 copy 2";


                if (arr[i][j].case != lastName) {
                    app.activeDocument.artLayers.add();
                    app.activeDocument.activeLayer.kind = LayerKind.TEXT;
                    app.activeDocument.activeLayer.textItem.contents = arr[i][j].case;
                    app.activeDocument.activeLayer.textItem.size = 40;
                    app.activeDocument.activeLayer.textItem.color = textColor;
                    app.activeDocument.activeLayer.name = "1 copy";
                    app.doAction("moveCenter", "autoUv");
                    app.activeDocument.activeLayer.translate(0, 300);
                    lastName = arr[i][j].case;
                }
                app.activeDocument.mergeVisibleLayers();
                app.activeDocument.activeLayer.name = arr[i][j].stt;

                app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["SPOT"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            }

            { // translate layer đến vị trí cần in
                app.activeDocument.activeLayer = app.activeDocument.layerSets["CMYK"].artLayers.getByName(arr[i][j].stt);
                app.doAction("moveZero", "autoUv");
                app.activeDocument.activeLayer.translate(xPosition, yPosition * (-1));
                app.activeDocument.activeLayer = app.activeDocument.layerSets["SPOT"].artLayers.getByName(arr[i][j].stt);
                app.doAction("moveZero", "autoUv");
                app.activeDocument.activeLayer.translate(xPosition, yPosition * (-1));
                if (j > 0) app.activeDocument.activeLayer.merge();
                app.activeDocument.activeLayer.name = "SPOTKhung";
            }
        }
        else { alert("file design không > 1 layer !") };


        // lam SPOT2
        try {
            app.open(File("D:/DATA/file design/" + arr[i][j].sku + "flash.tif"));
        } catch (error) {
            app.documents.add(1200, 2400, 300, "aaaa");
        }
        if (app.activeDocument.width !== 1200 || app.activeDocument.height !== 2400) {
            alert(arr[i][j].sku, " khác cỡ 1200 x 2400 !")
        }
        else if (app.activeDocument.artLayers.length === 1) {
            app.activeDocument.activeLayer.name = "1";
            app.activeDocument.artLayers.add();
            app.doAction("strokeWhite1px", "autoUv");
            app.activeDocument.mergeVisibleLayers();
            app.activeDocument.activeLayer.duplicate(app.activeDocument.activeLayer, ElementPlacement.PLACEBEFORE); // nhân đôi layer
            app.activeDocument.resizeCanvas(wphone, hphone); // resize canvas về cỡ cần in với loại điện thoại
            { // resize layer về cỡ cần in
                if ((hphone / wphone) < 2) { var newSize = (wphone * 100 / 1200) }
                else { var newSize = (hphone * 100 / 2400) }
                // app.doAction("strokeWhite1px", "autoUv");
                app.activeDocument.artLayers["Layer 1 copy"].resize(newSize, newSize, AnchorPosition.MIDDLECENTER);
                app.activeDocument.artLayers.getByName("Layer 1").remove();
                app.activeDocument.artLayers.add()
                app.activeDocument.mergeVisibleLayers(); // gộp all layer 
                app.doAction("strokeWhite1px", "autoUv");
                app.activeDocument.activeLayer.name = arr[i][j].stt; // đặt tên cho layer voi stt
                app.activeDocument.activeLayer.duplicate(app.documents["GLLM"].layerSets["SPOT2"], ElementPlacement.PLACEATBEGINNING);// đưa file in sang bên bàn in
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                app.activeDocument.activeLayer = app.activeDocument.layerSets["SPOT2"].artLayers.getByName(arr[i][j].stt);
                app.doAction("moveZero", "autoUv");
                app.activeDocument.activeLayer.translate(xPosition, yPosition * (-1));
                if (j > 0) app.activeDocument.activeLayer.merge();
                app.activeDocument.activeLayer.name = "SPOTWhite";
            }

        }
        else { alert("file design không > 1 layer !") };

    }

}
function showRGBChannel() {
    app.activeDocument.channels.getByName("Red").visible = true;
    app.activeDocument.channels.getByName("Green").visible = true;
    app.activeDocument.channels.getByName("Blue").visible = true;
}

dialog.show(); 