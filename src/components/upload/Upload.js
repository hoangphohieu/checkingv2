// thêm phần khi upload sẽ update thêm product
// product đã thêm vào this.state.userchange 



import React, { Component } from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';
import Exceltable from './Exceltable';
import CheckingFailProperties from './CheckingFailProperties';

class InputExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            dataExcel: null,
            reRender: 0,
            user: [],

            lastItem: 0

        }
    }
    componentWillMount() { // khởi tạo localStorate
        if (JSON.parse(localStorage.getItem("ItemsExcelFail")) === null) {
            localStorage.setItem("ItemsExcelFail", JSON.stringify([]));
        }
        if (JSON.parse(localStorage.getItem("ItemsExcel")) === null) {
            localStorage.setItem("ItemsExcel", JSON.stringify([]));
        }
        localStorage.setItem("numberSucsess", JSON.stringify(0));

        this.props.getLastitem("?datatype=item&_limit=1&_sort=name&_order=desc"); // lay sanh sach cac partner

    }
    componentDidMount() {
        if (JSON.parse(localStorage.getItem("ItemsExcel")) !== null) {
            this.setState({ dataExcel: JSON.parse(localStorage.getItem("ItemsExcel")) })
        }
    }


    componentDidUpdate = () => {
        this.CDU_checkRequest(); // kiểm tra và thực hiện hành động khi có request trả về
        this.CDU_reRenderWhenItemsExcelZero(); // rerender khi post het list items from excel
    }



    CDU_checkRequest() {

        if (this.props.itemExcelReload.type === "POST_ITEM_EXCEL_SUCSESS") { this.doingWhenPostItemSucsess() }
        else if (this.props.itemExcelReload.type === "POST_ITEM_EXCEL_RFAILURE") { this.doingWhenPostItemFail() }
        else if (this.props.itemExcelReload.type === "EXCEL_GET_LIST_BY_ID_SUCSESS") { this.getListByIdSucsess() }
        else if (this.props.itemExcelReload.type === "GET_RFAILURE") { this.getRfailure() }
        else if (this.props.itemExcelReload.type === "STATE_POST_TO_DEFAULT") { }
        else if (this.props.itemExcelReload.type === "GET_LAST_ITEM_SUCSESS") { this.getLastitemSucsess() }


    }
    getLastitemSucsess = () => {
        this.setState({ lastItem: this.props.itemExcelReload.listItem[0].id });
        this.props.propsImportExcelToDefault();
    }




    getListByIdSucsess = () => {
        let item = this.props.itemExcelReload.listItem;
        item.pop();

        // console.log(item);

        this.setState({ user: item });
        this.props.propsImportExcelToDefault();
    }

    getRfailure = () => {
        alert("GET fail")
    }
    CDU_reRenderWhenItemsExcelZero() {
        let payload = this.props.itemExcelReload;
        if ((payload.type === "POST_ITEM_EXCEL_SUCSESS" || payload.type === "POST_ITEM_EXCEL_RFAILURE") && (JSON.parse(localStorage.getItem("ItemsExcel")).length === 0)) {
            this.setState({ dataExcel: null });
            this.props.propsImportExcelToDefault();

        }
    }

    doingWhenPostItemSucsess = () => { //TRUE: ItemsExcel -1 và ItemsExcelSuccess+1, sau đó post ItemsExcel, vòng lặp đến khi nào ItemsExcel=0
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        if (ItemsExcel.length > 0) {
            ItemsExcel.pop();
            localStorage.setItem("ItemsExcel", JSON.stringify(ItemsExcel));
            this.postToServer(JSON.parse(localStorage.getItem("ItemsExcel")));

            localStorage.numberSucsess = JSON.stringify(JSON.parse(localStorage.numberSucsess) + 1);
        }
    }
    doingWhenPostItemFail = () => { // FAIL: ItemsExcel-1  và ItemsExcelFail +1; sau đó post ItemsExcel, vòng lặp đến khi nào ItemsExcel=0
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        let itemFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        if (ItemsExcel.length > 0) {
            itemFail = _.uniqWith([...itemFail, [...ItemsExcel].pop()], _.isEqual);  // loc va tao ra itemFail
            localStorage.setItem("ItemsExcelFail", JSON.stringify(itemFail)); // lf itemFail vao storage
            ItemsExcel.pop();
            localStorage.setItem("ItemsExcel", JSON.stringify(ItemsExcel));
            this.postToServer(JSON.parse(localStorage.getItem("ItemsExcel")));
        }
    }
    postToServer = (ItemsExcel) => {
        if (ItemsExcel.length > 0) {
            let itemPost = ItemsExcel[ItemsExcel.length - 1];
            itemPost = _.mapValues(itemPost, function (o) { return String(o) });
            this.props.postItem(itemPost);

        }
    }
    clickPostToServer = (ItemsExcel) => {
        this.postToServer(ItemsExcel);
        localStorage.numberSucsess = JSON.stringify(0);

    }

    changeItemsExcelFail = (param, id) => {
        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        ItemsExcelFail[id] = param;
        localStorage.setItem("ItemsExcelFail", JSON.stringify(ItemsExcelFail)); // luu itemFail vao storage
        this.setState({ reRender: Math.random() })
    }
    postItemsExcelFail = (param, id) => {
        this.deleteItemsExcelFail(id);
        let ItemsExcel = JSON.parse(localStorage.getItem("ItemsExcel"));
        ItemsExcel.push(param);
        localStorage.setItem("ItemsExcel", JSON.stringify(ItemsExcel));
        this.postToServer(ItemsExcel);
    }
    deleteItemsExcelFail = (id) => {
        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        ItemsExcelFail[id] = null;
        ItemsExcelFail = ItemsExcelFail.filter(param => { return param !== null });
        localStorage.setItem("ItemsExcelFail", JSON.stringify(ItemsExcelFail)); // luu itemFail vao storage
        this.setState({ reRender: Math.random() })
    }
    convertData = (data) => {
        data[0] = data[0].map(param => { param = param.trim().toLowerCase().split(" ").join(""); return param }) // data[0] bo space va chu hoa
        // data = data.map(param => { // chuyuyển thuộc tính undefined thành null
        //     for (let i = 1; i <= param.length - 1; i++) {
        //         if (param[i] === undefined) param[i] = null;
        //     }
        //     return param
        // })

        let dataObj = data.map(param => { return _.zipObject(data[0], param) });  // [{},{}...{}]
        dataObj.shift();
        dataObj.map((param,key) => { // lọc date, country, và id
            let dateConvert = ((param.date - 25569) * 24 * 60 * 60 * 1000);
            dateConvert = Date.parse(new Date(new Date(dateConvert).toDateString()));   // parse date sang number cho chinh xac  
            param.date = dateConvert; // lọc và định dạng lại ngày
            if ((param.country
                .trim().toLowerCase() !== "us") && (param.country
                    .trim().toLowerCase().split(" ").join("") !== "unitedstates")) { param.country = "WW" }
            else { param.country = "US" } // lọc và định dạnh lại shipping country
            const uuidv1 = require('uuid/v1');
            param["id"] = uuidv1();// tạo id
            param["printStatus"] = "wait";
            param["month"] = new Date(dateConvert).getMonth() + 1;
            param["year"] = new Date(dateConvert).getFullYear();
            param["datatype"] = "item";
            param["barcode"] = Date.parse(new Date()) + key;
            param.name = param.name.trim();

            return param;
        });
        return dataObj;
    }
    ProcessExcel = (param) => {
        //Read the Excel File data.
        var workbook = XLSX.read(param, {
            type: 'binary'
        });
        /* convert from workbook to array of arrays */
        var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 }); // data= arr[[],[]...[]]

        let dataObj =this.convertData(data);
            dataObj = this.checkDataFailImport([...dataObj]);
        localStorage.setItem("ItemsExcel", JSON.stringify(dataObj));
        this.setState({ dataExcel: dataObj });

    };
    checkDataFailImport = (data) => {
        let date = data.map(param => param.date);
        let amount = data.map(param => param.amount
        );
        let name = data.map(param => param.name);
        date.forEach(param => {
            if (isNaN(param) !== false) { this.alertError("Có 'date' không đúng, bạn vui lòng xem lại :("); }
            else if (param < 1262278800000 && param > 1893430800000) { this.alertError("Có ngày tháng không đúng, bạn vui lòng xem lại :("); }
        })
        amount.forEach(param => {
            if (isNaN(param) !== false) { this.alertError("Có 'line item quantity' không đúng, bạn vui lòng xem lại :("); }
        })
        name.forEach(param => {
            if (param.match(/[!@$%^&*(),.?":{}|<>]/g)) {
                this.alertError("Có 'name' chứa ký tực đặc biệt   " + param.match(/[!@$%^&*(),.?":{}|<>]/g) + "     bạn vui lòng kiểm tra lại :(");
            }
        })


        return data;

    }
    alertError = (param) => {
        alert(param);
        window.location = "/Upload";

    }
    readSingleFile = (e) => {
        let _this = this;

        //Validate whether File is valid Excel file.
        let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx|.csv)$/;
        if (regex.test(e.target.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        _this.ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(e.target.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        let data = "";
                        let bytes = new Uint8Array(e.target.result);
                        for (let i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        _this.ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(e.target.files[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }
    }

    render() {
        // console.log(this.state.userChange);
        console.log(localStorage.ItemsExcel);
        // console.log(this.props.itemExcelReload);
        if (this.props.itemExcelReload.type === "POST_ITEM_EXCEL_SUCSESS") {
            alert(JSON.parse(localStorage.numberSucsess) + 1);
        }


        let ItemsExcel = JSON.stringify(this.state.dataExcel);
        let ItemsExcelFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        if (ItemsExcelFail.length !== 0) {
            ItemsExcelFail = ItemsExcelFail.map((param, id) => {
                return <CheckingFailProperties {...this.props}
                    proppertiesitem={JSON.stringify(param)} key={id}
                    sttItemsExcelFail={id}
                    changeItemsExcelFail={this.changeItemsExcelFail}
                    deleteItemsExcelFail={this.deleteItemsExcelFail}
                    postItemsExcelFail={this.postItemsExcelFail}
                />
            })
        }


        return (<React.Fragment>
            <div className="row"> <div className="nav-top"></div> </div>
            <div className="App mt-4">

                {(JSON.parse(localStorage.getItem("ItemsExcelFail")).length === 0) ?
                    <>
                        <input type="file" id="fileinput" className="" onChange={this.readSingleFile} />
                        <button type="button" className="btn btn-success" onClick={() => this.clickPostToServer(this.state.dataExcel)}>Post to Server</button>
                    </> :
                    <div className="alert alert-warning" role="alert">Có lỗi xảy ra !!!</div>
                }
                <Exceltable dataExcelTable={ItemsExcel} />
                {ItemsExcelFail}
            </div>
        </React.Fragment>

        );
    }
}

export default InputExcel;