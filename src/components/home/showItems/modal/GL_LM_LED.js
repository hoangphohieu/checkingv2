import React, { Component } from 'react';
import _ from 'lodash';
import CheckFileIn from "./CheckFileIn";
import OneTable from "./OneTable";
import ItemLoi from './ItemLoi';
class BigTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            printScreen: false,
            changePrint: false,
            wkhay: 2400,
            hkhay: 1300
        }
    }


    changeScreen = () => { this.setState({ printScreen: !this.state.printScreen }) }
    changePrint = () => { this.setState({ changePrint: !this.state.changePrint }) }
    convertBarcode = (barcode) => {
        const obj = {
            "00": "!",
            "01": '"',
            "02": "#",
            "03": "$",
            "04": "%",
            "05": "&",
            "06": "'",
            "07": "(",
            "08": ")",
            "09": "*",
            "10": "+",
            "11": ",",
            "12": "-",
            "13": ".",
            "14": "/",
            "15": "0",
            "16": "1",
            "17": "2",
            "18": "3",
            "19": "4",
            "20": "5",
            "21": "6",
            "22": "7",
            "23": "8",
            "24": "9",
            "25": ":",
            "26": ";",
            "27": "<",
            "28": "=",
            "29": ">",
            "30": "?",
            "31": "@",
            "32": "A",
            "33": "B",
            "34": "C",
            "35": "D",
            "36": "E",
            "37": "F",
            "38": "G",
            "39": "H",
            "40": "I",
            "41": "J",
            "42": "K",
            "43": "L",
            "44": "M",
            "45": "N",
            "46": "O",
            "47": "P",
            "48": "Q",
            "49": "R",
            "50": "S",
            "51": "T",
            "52": "U",
            "53": "V",
            "54": "W",
            "55": "X",
            "56": "Y",
            "57": "Z",
            "58": "[",
            "59": "\\",
            "60": "]",
            "61": "^",
            "62": "_",
            "63": "`",
            "64": "a",
            "65": "b",
            "66": "c",
            "67": "d",
            "68": "e",
            "69": "f",
            "70": "g",
            "71": "h",
            "72": "i",
            "73": "j",
            "74": "k",
            "75": "l",
            "76": "m",
            "77": "n",
            "78": "o",
            "79": "p",
            "80": "q",
            "81": "r",
            "82": "s",
            "83": "t",
            "84": "u",
            "85": "v",
            "86": "w",
            "87": "x",
            "88": "y",
            "89": "z",
            "90": "{",
            "91": "|",
            "92": "}",
            "93": "~",
            "94": "Å",
            "95": "Æ",
            "96": "Ç",
            "97": "È",
            "98": "É",
            "99": "Ê",
            "START": "Ë",
            "STOP": "Ì",


        };
 

        if (barcode.split("").length !== 14) this.alertError("co loi upload.js - barcode");
        barcode = barcode.split("");
        barcode = _.chunk(barcode, 2);
        barcode = barcode.map(param => { return param.join("") }).map(param => { return obj[param] })
        barcode = barcode.join("");
        return (obj["START"] + barcode + obj["STOP"])


    }

    saveTextAsFile = (param) => {
      


        let itemsConvert = param.map(param2 => {
            return param2.map(param3 => {
                return { ...param3, barcode: this.convertBarcode(param3.barcode) }
            })

        });


        let items = { items: itemsConvert, type: this.props.type, day: new Date().getDate(), mounth: new Date().getMonth() + 1, hour: new Date().getHours() }
        let paramToText = JSON.stringify(items)
        let textToWrite = paramToText // file contents
        let textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });

        let fileNameToSaveAs = `${this.props.type}-${new Date().getHours()}h-${new Date().getDate()}-${(new Date().getMonth() + 1)}.json`;



        let downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        downloadLink.click();
        this.setState({ downClickJson: true })
    }
    render() {


        let items = this.props.itemsLocal;
        let itemSheet = [];
        if (this.props.type === "glass" || this.props.type === "luminous") {
            itemSheet = JSON.parse(localStorage.pc_gllm).item_post;
            itemSheet = _.toPairs(itemSheet).filter(param => param[0] !== "id" && param[0] !== 'type').map(param => param[1]);

        }
        else if (this.props.type === "led") {
            itemSheet = JSON.parse(localStorage.pc_led).item_post;
            itemSheet = _.toPairs(itemSheet).filter(param => param[0] !== "id" && param[0] !== 'type').map(param => param[1]);


        }
        let itemFail = JSON.parse(localStorage.PCSheetReturn);


        let itemCheck = [];
        let sumAmountBefore, sumAmountAfter, itemsFilter;
        let amountAllcase = [];
        let allFileName = [];
        let itemThua = [];
        let arr = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
        let danhSach = [], danhsach2 = [];


        if (items.length !== 0 && itemSheet.length !== 0) {

            danhSach = itemSheet.map(itemSheet1 => itemSheet1.nameDefault);



            {
                itemSheet = itemSheet.map(param => {
                    let dataparam = [param.nameDefault, Number(param.width), Number(param.hight), param.nameVariant.split(",")];
                    dataparam[3] = dataparam[3].filter(param2 => { return param2 !== "" });
                    return dataparam
                });
            }

            items = items.filter(item => (item.name !== undefined || item.amount !== undefined)); // lọc loại bỏ những item trắng
            items = items.map(item => { return { ...item, amount: parseInt(item.amount) } }) // chuyển amount từ string sang number

            sumAmountBefore = items.reduce((sum, item) => { // tính tổng amount
                return (sum + parseInt(item.amount))
            }, 0);

            items = items.map(item => { // kiểm tra dòng máy và đổi sang tên mặc định
                if (item.case === undefined) return item
                else {
                    let itemFilter = itemSheet.filter(item2 => {
                        let itemFilter2 = item2[3].filter(item3 => {
                            if (item.case.trim().toLowerCase().endsWith(item3.trim().toLowerCase()) === true) {
                                return true
                            }
                        });
                        if (itemFilter2.length !== 0) { return true }
                        else { return false }
                    });
                    if (itemFilter.length === 1) {
                        item.case = itemFilter[0][0];
                        return item
                    }
                    else if (itemFilter.length > 1) {
                        alert("kiểm tra lại endWith: " + item.case);
                        window.location.reload();
                        return item
                    }
                    else if (itemFilter.length === 0) {
                        return item
                    }
                }
            });



            for (let i = 0; i <= items.length - 1; i++) {  // lặp lại những item có amount >1
                if (items[i].amount > 1) {
                    for (let j = 1; j < items[i].amount; j++) {
                        items.push({ ...items[i], amount: 0 })
                    }
                }
            }

            items = items.sort(function (a, b) { // lọc danh sách items theo name
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            });


            { // cái này để thông báo số lượng items trùng, nhưng đọc lại éo biết là đã code cái gì :)))
                let obj = {}
                for (let k = 0; k < items.length; k++) {
                    if (obj[items[k].name] === undefined) {
                        obj[items[k].name] = [items[k]]
                    }
                    else {
                        obj[items[k].name] = [...obj[items[k].name], items[k]]
                    }
                }
                obj = _.toPairs(obj);
                obj = obj.map(param1 => {
                    return param1[1].map(param2 => {
                        param2["amount"] = param1[1].length;
                        return param2
                    })
                })
                obj = _.flattenDeep(obj);
            }


            // dem item thua
            itemsFilter = items.filter(items1 => {
                let itemsFilter2 = itemSheet.filter(itemSheet1 => {
                    if (itemSheet1[0] === items1.case) { return true }
                    else { return false }
                })
                if (itemsFilter2.length !== 0) { return true }
                else { return false }
            })


            // lấy item thừa 
            itemThua = _.difference(items, itemsFilter);
            items = itemsFilter;

        

            // lấy sku để xem file nào chưa có
            allFileName = items.map(item => { return item.sku })


            // đếm ốp
            let allcase = [];
            let bodem = {};

            for (let j = 0; j < items.length; j++) { // lấy danh sách tên tất cả các đt trong items
                if (allcase.indexOf(items[j].case) === -1)
                    allcase.push(items[j].case)
            }

            for (let j = 0; j < allcase.length; j++) {
                let onecase = items.filter(item => { return item.case === allcase[j] });
                let tenaaa = allcase[j];
                bodem[tenaaa] = onecase.length;
              

                amountAllcase.push(
                    <tr key={j}>
                        <th scope="row">{j + 1}</th>
                        <td className="cot_row">{allcase[j]}</td>
                        <td className="cot_row">{onecase.length}</td>
                    </tr>)
            }

            danhsach2 = danhSach.map(param => {
                if (bodem[param] !== undefined) return [param, bodem[param]]
                else return [param, 0]
            })



            items = _.orderBy(items, ['case', 'name', 'sku'], ['asc', 'asc', 'desc']);
            items = items.map((item, key) => { return { ...item, stt: key + 1 } });
            items = items.map(item => { return { barcode: item.barcode, name: item.name, case: item.case, sku: item.sku.trim(), stt: item.stt, pixel: toPixel(item.case), country: item.country, amount: item.amount, date: item.date } })



            function toPixel(toPixel1) {// toPixel1 là nameDefault


                let dataToPixel1 = itemSheet.filter(itemSheet1 => {
                    if (toPixel1 === itemSheet1[0]) { return true }
                    else { return false }
                })
                if (dataToPixel1.length > 1) {
                    alert("trên sheet có dòng đt bị lặp", dataToPixel1);
                    window.location.reload();
                }


                return { w: dataToPixel1[0][1], h: dataToPixel1[0][2] }
            }
            sumAmountAfter = items.length;
        

            // chia khay
            let hAll = this.state.hkhay;
            let wAll = this.state.wkhay;
            let hNow = hAll; let wNow = wAll;
            let wLastCase = items[0].pixel.w;
            let j = 0;

            for (let i = 0; i <= items.length - 1; i++) {
                let hI = items[i].pixel.h;
                let wI = items[i].pixel.w;
               
                if (((hNow - hI) >= 0) && ((wNow - wI) >= 0)) {
                    if ((wLastCase !== wI)) {
                        if (wNow - wI - wLastCase >= 0) {

                            arr[j].push(items[i]);
                            hNow = hAll - hI;
                            wNow = wNow - wLastCase;
                            wLastCase = wI;
                        }
                        else {

                            j = j + 1;
                            arr[j].push(items[i]);
                            hNow = hAll - hI;
                            wNow = wAll;
                            wLastCase = wI;
                        }
                    }
                    else {

                        arr[j].push(items[i]);
                        hNow = hNow - hI;
                        wLastCase = wI;

                    }

                }
                else if (((hNow - hI) >= 0) && ((wNow - wI) < 0)) {

                    j = j + 1;
                    arr[j].push(items[i]);
                    hNow = hAll - hI;
                    wNow = wAll;
                    wLastCase = wI;

                }
                else if (((hNow - hI) < 0) && ((wNow - wLastCase - wI) >= 0)) {

                    arr[j].push(items[i]);
                    hNow = hAll - hI;
                    wNow = wNow - wLastCase;
                    wLastCase = wI;

                }
                else if (((hNow - hI) < 0) && ((wNow - wLastCase - wI) < 0)) {

                    j = j + 1;
                    arr[j].push(items[i]);
                    hNow = hAll - hI;
                    wNow = wAll;
                    wLastCase = wI;


                }
                else {
                    alert("alert")
                }
            }
            itemCheck = JSON.parse(JSON.stringify(items));

        } // het if param!==undefi param.namened
        arr = arr.filter(item => { return item.length > 0 });


        itemFail = itemFail.filter(param4 => {
            return (param4.idDesign !== null && param4.phoneCase !== null)
        })
        let itemNotPrint = [];

        for (let k = 0; k < itemCheck.length; k++) {
            let itemC = [];
            for (let m = 0; m < itemFail.length; m++) {


                if ((itemFail[m].idDesign.toLowerCase().trim() === itemCheck[k].sku.toLowerCase().trim())
                    && (itemFail[m].phoneCase.trim().toLowerCase() === itemCheck[k].name.toLowerCase().trim())
                ) {
                    itemC.push({ ...itemCheck[k], code: itemFail[m].stt });
                    itemFail[m] = null;
                    break;
                }
            }
            itemFail = itemFail.filter(param3 => param3 !== null)
            if (itemC.length !== 0) {
                itemNotPrint.push(itemC[0]);
            }
        }

        items = arr;
        let renderTable = [];
        if (items.length !== 0) renderTable = items.map((item, key) => <OneTable key={key} items={item} numberTable={key} typeTable={this.props.type} />)
      

        return (
            <React.Fragment>
                <div>
                    <CheckFileIn dataNone={allFileName} itemNoPrint={itemNotPrint} typeTable={"GL_LM_LED"} />
                    <button type="button" className="btn btn-secondary" onClick={() => this.saveTextAsFile(items)}>Down Load Json</button>

                    <h2>Tổng tất cả phôi: {sumAmountAfter + " / " + sumAmountBefore}</h2>
                    <h2>Số liệu bàn in: {arr.map(arr1 => <span className="so-lieu-ban">{arr1.length}</span>)}</h2>
                    <ItemLoi items={itemThua} />
                </div>
                {renderTable}
            </React.Fragment>
        );

    }
}
export default BigTable;