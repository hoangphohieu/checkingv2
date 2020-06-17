// thêm phần khi upload sẽ update thêm product
// product đã thêm vào this.state.userchange 



import React, { Component } from 'react';
import XLSX from 'xlsx';
import _ from 'lodash';
import Exceltable from './Exceltable';


class InputExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reRender: 0,
            user: [],
            canPost: true,
            lastItem: 0,
            fetchAPI: false,
            itemsLength: 0

        }
    }
    componentWillMount() { // khởi tạo localStorate
        if (JSON.parse(localStorage.getItem("ItemsExcelFail")) === null) {
            localStorage.setItem("ItemsExcelFail", JSON.stringify([]));
        }
        if (localStorage.ItemsExcel === undefined) {
            localStorage.setItem("ItemsExcel", JSON.stringify([]));
        }
        localStorage.setItem("numberSucsess", JSON.stringify(0));

        // this.props.getLastitem("?datatype=item&_limit=1&_sort=name&_order=desc"); // lay sanh sach cac partner

    }


    componentDidUpdate = () => {
        this.CDU_checkRequest(); // kiểm tra và thực hiện hành động khi  request trả về
        this.CDU_renderEnd(); // rerender khi post het list items from excel
    }



    CDU_checkRequest() {

        if (this.props.itemExcelReload.type === "POST_ITEM_EXCEL_SUCSESS") { this.PostItemSucsess() }
        else if (this.props.itemExcelReload.type === "POST_ITEM_EXCEL_RFAILURE") { this.PostItemFail() }
        else if (this.props.itemExcelReload.type === "GET_RFAILURE") { this.getRfailure() }
        else if (this.props.itemExcelReload.type === "STATE_POST_TO_DEFAULT") { }
    }

    getRfailure = () => {
        alert("GET fail")
    }
    CDU_renderEnd() {
        let payload = this.props.itemExcelReload;
        if ((payload.type === "POST_ITEM_EXCEL_SUCSESS" || payload.type === "POST_ITEM_EXCEL_RFAILURE") & (JSON.parse(localStorage.ItemsExcel).length === 0 & (JSON.parse(localStorage.ItemsExcelFail).length === 0))) {
            window.location = "/Upload";

        }
        if (localStorage.ItemsExcel === "[]" & localStorage.ItemsExcelFail !== "[]") {
            localStorage.ItemsExcel = localStorage.ItemsExcelFail;
            localStorage.ItemsExcelFail = "[]";
            this.props.propsImportExcelToDefault();


        }
    }

    PostItemSucsess = () => { //TRUE: ItemsExcel -1 và ItemsExcelSuccess+1, sau đó post ItemsExcel, vòng lặp đến khi nào ItemsExcel=0
        let ItemsExcel = JSON.parse(localStorage.ItemsExcel);
        if (ItemsExcel.length > 0) {
            ItemsExcel.pop();
            localStorage.setItem("ItemsExcel", JSON.stringify(ItemsExcel));
            setTimeout(() => {
                this.postToServer(JSON.parse(localStorage.ItemsExcel));
            }, 100);


            localStorage.numberSucsess = JSON.stringify(JSON.parse(localStorage.numberSucsess) + 1);
        }
    }
    PostItemFail = () => { // FAIL: ItemsExcel-1  và ItemsExcelFail +1; sau đó post ItemsExcel, vòng lặp đến khi nào ItemsExcel=0
        let ItemsExcel = JSON.parse(localStorage.ItemsExcel);
        let itemFail = JSON.parse(localStorage.getItem("ItemsExcelFail"));
        if (ItemsExcel.length > 0) {
            itemFail = _.uniqWith([...itemFail, [...ItemsExcel].pop()], _.isEqual);  // loc va tao ra itemFail
            localStorage.setItem("ItemsExcelFail", JSON.stringify(itemFail)); // lf itemFail vao storage
            ItemsExcel.pop();
            localStorage.setItem("ItemsExcel", JSON.stringify(ItemsExcel));
            setTimeout(() => {
                this.postToServer(JSON.parse(localStorage.ItemsExcel));
            }, 100);
        }
    }
    postToServer = (ItemsExcel) => {
        if (ItemsExcel.length > 0) {
            let itemPost = ItemsExcel[ItemsExcel.length - 1];
            itemPost = _.mapValues(itemPost, function (o) { return String(o) });
            this.props.postItem({ item_post: itemPost });

        }
    }
    clickPostToServer = () => {
        this.setState({ fetchAPI: true })
        setTimeout(() => {
            this.postToServer(JSON.parse(localStorage.ItemsExcel));
        }, 100);
        localStorage.numberSucsess = JSON.stringify(0);

    }


    postItemsExcelFail = (param, id) => {
        this.deleteItemsExcelFail(id);
        let ItemsExcel = JSON.parse(localStorage.ItemsExcel);
        ItemsExcel.push(param);
        localStorage.setItem("ItemsExcel", JSON.stringify(ItemsExcel));
        setTimeout(() => {
            this.postToServer(ItemsExcel);

        }, 100);
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
        let dataObj = data.map(param => { return _.zipObject(data[0], param) });  // [{},{}...{}]
        let checkData = { ...dataObj[0] };
        if (checkData.amount === undefined || checkData.case === undefined || checkData.country === undefined || checkData.date === undefined || checkData.name === undefined || checkData.type === undefined)
            this.alertError("sai thong tin excel - dong 1");
        dataObj.shift();
        // kiem tra items thieu thong tin

        dataObj = dataObj.map(param => {
            if (param.name !== undefined
                & param.country !== undefined
                & param.amount !== undefined
                & param.sku !== undefined
                & param.date !== undefined
                & param.type !== undefined
                & param.case !== undefined
            ) return param
            else return null
        }).filter(param => param !== null);


        let lengthData = dataObj.length;
        dataObj = dataObj.filter(param => {
            if (param.name !== undefined
                & param.country !== undefined
                & param.amount !== undefined
                & param.sku !== undefined
                & param.date !== undefined
                & param.case !== undefined
                & param.type !== undefined
            ) return true
            else return false
        })


        if (lengthData !== dataObj.length) {
            this.alertError("co item khong du thong tin");
            return []
        }
        // het kiem tra thieu thon tin

        dataObj.map((param, key) => { // lọc date, country, và id
            let dateConvert = ((Math.floor(param.date) - 25569) * 24 * 60 * 60 * 1000);
            dateConvert = Date.parse(new Date(new Date(dateConvert).toDateString()));   // parse date sang number cho chinh xac  
            param.date = dateConvert; // lọc và định dạng lại ngày
            if ((param.country.trim().toLowerCase() === "us") || (param.country.trim().toLowerCase().split(" ").join("") === "unitedstates")) { param.country = "US" }
            else if ((param.country.trim().toLowerCase() === "vn") || (param.country.trim().toLowerCase().split(" ").join("") === "vietnam")) { param.country = "VN" } // lọc và định dạnh lại shipping country
            else { param.country = "WW" }
            const uuidv1 = require('uuid/v1');
            param["id"] = uuidv1();// tạo id
            param["printStatus"] = "wait";
            param["month"] = new Date(dateConvert).getMonth() + 1;
            param["year"] = new Date(dateConvert).getFullYear();
            param["datatype"] = "item";
            param["note"] = "";
            param["barcode"] = Date.parse(new Date()) * 10 + key;
            param.name = param.name.trim();
            return param;
        });
        dataObj = _.orderBy(dataObj, ['name'], ['asc']);
        for (let i = 1; i < dataObj.length; i++) {
            if (dataObj[i].name === dataObj[i - 1].name) {
                dataObj[i].barcode = dataObj[i - 1].barcode
            }

        }

        //  xử lý phoneCase i6 i7 ...

        let PhonesAlltribute = JSON.parse(localStorage.pc_gllm).item_post;
        PhonesAlltribute = _.toPairs(PhonesAlltribute).filter(param => param[0] !== "id" && param[0] !== "type").map(param => param[1]);
     

        dataObj = dataObj.map(param => {
            let arr = PhonesAlltribute.map(param2 => {
                let sosanh = param2.nameVariant.trim().split(",").filter(param3 => param3 !== "").filter(param3 => {
               

                    return _.camelCase(param.case).toLowerCase().endsWith(_.camelCase(param3).toLowerCase())
                })


                if (sosanh.length !== 0)
                    return param2.nameDefault
            }).filter(param4 => param4 !== undefined);
            return { ...param, case: arr[0] }

        })

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


        let dataObj = this.convertData(data);
        dataObj = this.checkDataFailImport([...dataObj]);
        localStorage.setItem("ItemsExcel", JSON.stringify(dataObj));
        this.setState({
            itemsLength: dataObj.length
        });

    };
    checkDataFailImport = (data) => {
        let date = data.map(param => param.date);
        let amount = data.map(param => param.amount);
        let name = data.map(param => param.name);
        let sku = data.map(param => param.sku);
        let type = data.map(param => param.type.trim().toLowerCase());

        let errorDate = [], errorAmount = [], errCase = [], errST = [];
        { // kiểm tra ngày
            date.forEach(param => {
                if (isNaN(param) !== false) { errorDate.push(1) }
                else if (param < 1262278800000 || param > 1893430800000) { errorDate.push(1) }
            })
            if (errorDate.length !== 0) {
                this.alertError(' "date" khong dung');
            }
        }

        { // kiem tra so luong
            amount.forEach(param => {
                if (isNaN(param) !== false) { errorAmount.push(1) }
            })
            if (errorAmount.length !== 0)
                this.alertError(" 'amount' không đúng,");
        }
        {// kiem tra phoneCase
            data.forEach(param => {
                if (param.case === undefined) { errCase.push(param.name) }
            })

            errCase = _.uniq(errCase);
            // console.log(errCase);

            if (errCase.length !== 0) {
                this.alertError(`"kiem tra phoneCase: "${errCase}`)
            }
        }
        {// kiem tra name va sku
            name.forEach(param => {
                if (param.match(/[!@$%^&*(),.?":{}|<>]/g)) {
                    this.alertError(" 'name' chứa ký tực đặc biệt   " + param.match(/[!@$%^&*(),.?":{}|<>]/g));
                    errST.push(1);
                }
            });
            sku.forEach(param => {
                if (param.match(/[!@$%#^&*(),.?":{}|<>]/g)) {
                    errST.push(1);
                    this.alertError(" 'sku' chứa ký tực đặc biệt   " + param.match(/[!#@$%^&*(),.?":{}|<>]/g));
                }
            })
        }

        type.forEach(param => {
            switch (param) {
                case "glass":
                    break;
                case "luminous":
                    break;
                case "silicon":
                    break;
                case "led":
                    break;

                default:
                    this.alertError(" 'type' chứa ký tực đặc biệt");
                    break;
            }

        })
        if (errorDate.length !== 0 || errorAmount.length !== 0 || errCase.length !== 0 || errST.length !== 0) return []
        else return data;

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

        return (<React.Fragment>
            <div className="row"> <div className="nav-top"></div> </div>
            <div className="App mt-4">

                <input type="file" id="fileinput" className="" onChange={this.readSingleFile} defaultValue="" />
                <button type="button" className="btn btn-success" onClick={this.clickPostToServer}>Post to Server</button>

                <Exceltable />

            </div>
            {(this.state.fetchAPI === true) ? <div className="pro-get-upload">
                <h1>Đang tải {JSON.parse(localStorage.numberSucsess)}/{this.state.itemsLength}</h1>
            </div> : ""}
        </React.Fragment>

        );
    }
}

export default InputExcel;