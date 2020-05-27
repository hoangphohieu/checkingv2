import React, { Component } from 'react';
import _ from 'lodash';
import CheckFileIn from "./CheckFileIn";
class BigTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            printScreen: false,
            changePrint: false,
            wkhay: 2400,
            hkhay: 1200
        }
    }


    changeScreen = () => { this.setState({ printScreen: !this.state.printScreen }) }
    changePrint = () => { this.setState({ changePrint: !this.state.changePrint }) }

    saveTextAsFile = (param) => {
        let paramToText = JSON.stringify(param)
        var textToWrite = paramToText // file contents
        var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
        var fileNameToSaveAs = `day${param.day}_${param.mounth}.json`// tên file


        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        downloadLink.click();
        this.setState({ downClickJson: true })
    }
    render() {


        let items = this.props.itemsLocal;
        let itemSheet = JSON.parse(localStorage.PCSheetChild);
        let itemFail = JSON.parse(localStorage.PCSheetReturn);


        let itemCheck = [];
        let sumAmountBefore, sumAmountAfter, itemsFilter;
        let amountAllcase = [];
        let allFileName = [];
        let dataSortItems = [];
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
                // console.log(bodem);

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
            items = items.map(item => { return { name: item.name, name: item.case, sku: item.sku.trim(), stt: item.stt, pixel: toPixel(item.case), country: item.country, amount: item.amount } })
           

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
                // console.log(items[i].name);
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


        console.log(arr);

        return (
            <React.Fragment>
                <p>itemFail</p>

                <div>
                    <CheckFileIn dataNone={allFileName} itemNoPrint={itemNotPrint} />
                    <button type="button" class="btn btn-secondary" onClick={() => this.saveTextAsFile(arr)}>Json</button>

                    {/* <DownText dataMayInTo={arr} {...this.props} /> */}
                    <h2>Tổng tất cả phôi: {sumAmountAfter + " / " + sumAmountBefore}</h2>
                    <h2>Số liệu bàn in: {arr.map(arr1 => <span className="so-lieu-ban">{arr1.length}</span>)}</h2>

                </div>


                {/* <BanTo itemsBanTo={arr} printScreen={this.state.printScreen} {...this.props} /> */}


                {/* <div className="row justify-content-center">
                        <div className="col-5">
                            <h2 style={{ textAlign: 'center', marginTop: 50 }}>Tổng tất cả: {sumAmountAfter + "/" + sumAmountBefore}</h2>
                            <table className="table table-striped table_amounts">
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Tên</th>
                                        <th scope="col">Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {amountAllcase}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-5">
                            <h2 style={{ textAlign: 'center', marginTop: 50 }}>Tổng tất cả: {sumAmountAfter + "/" + sumAmountBefore}</h2>
                            <div className="row justify-content-around">
                                <div className="col-3">
                                    <table className="table  table_amounts">
                                        <thead>
                                            <tr>
                                                <th scope="col">Tên</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {danhSach.map((param, key) => <tr key={key}>
                                                <td className="cot_row">{param}</td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-3">
                                    <table className="table  table_amounts">
                                        <thead>
                                            <tr>
                                                <th scope="col">Số lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {danhsach2.map((param, key) => <tr key={key}>
                                                <td className="cot_row">{param[1]}</td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                        </div>

                    </div> */}


            </React.Fragment>
        );

    }
}
export default BigTable;