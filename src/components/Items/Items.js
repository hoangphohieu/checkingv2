import React, { Component } from 'react';
import CheckingInput from './CheckingInput';
import _ from "lodash";
import ShowItems from './showItems/ShowItems';
import ReactLoading from 'react-loading';

import Button from '@material-ui/core/Button';

class ControlItems extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = ({
                  selectedDay: undefined,
                  clickPrinted: false,
                  clickReturn: false,
                  clickFailded: false,
                  clickWait: false,
                  clickDone: false,
                  clickDelete: false,
                  clickSend: false,
                  items: [],
                  reRender: 0,
                  fetching: false
            })
      }
      reRender = () => {
            this.setState({
                  reRender: Math.random()
            })
      }

      setStatus = (param) => {
            this.setState(param)
      }
      componentWillMount() {
            localStorage.itemsPatch = JSON.stringify([]);
            localStorage.items_gllm = "[]";
            localStorage.items_led = "[]";
            localStorage.items_silicon = "[]";
      }
      componentDidUpdate() {
            this.CDU_checkRequest(); // kiểm tra và thực hiện hành động khi  request trả về
            this.CDU_SetAllPrinted();
      }

      CDU_checkRequest() {
            if (this.props.ItemReducer.type === "GET_CI_CHECKING_SUCSESS") { this.getCheckingSucsess() }
            else if (this.props.ItemReducer.type === "CI_PATCH_ITEMS_SUCSESS") { this.patchItemsSucsess() }
            else if (this.props.ItemReducer.type === "CI_DELETE_ITEMS_SUCSESS") { this.patchItemsSucsess() }
            else if (this.props.ItemReducer.type === "CI_PATCH_ITEMS_RFAILURE") { this.patchItemsFaild() }
            else if (this.props.ItemReducer.type === "CI_DELETE_ITEMS_RFAILURE") { this.patchItemsFaild() }
            else if (this.props.ItemReducer.type === "CI_UPDATE_PC_PRO_SUCSESS") { this.updatePCProDone() }
            else if (this.props.ItemReducer.type === "CI_UPDATE_PC_PRO_RFAILURE") { this.updatePCProfail() }

            else if (this.props.ItemReducer.type === "POST_ITEM_EXCEL_RFAILURE") { this.doingWhenPostItemFail() }
      }
      updatePCProDone = () => {
            let pcPro = this.props.ItemReducer.listItem.item_post;

            if (pcPro.id = "pc_gllm") localStorage.items_gllm = "[]";
            if (pcPro.id = "pc_led") localStorage.items_led = "[]";
            if (pcPro.id = "pc_silicon") localStorage.items_silicon = "[]";
      }
      CDU_SetAllPrinted() {
            let items = JSON.parse(localStorage.itemsPatch);
            if (this.state.clickPrinted === true && items.length !== 0) {
                  let item = items[items.length - 1];


                  this.patchItem({ ...item, printStatus: "printed" })
            }
            else if (this.state.clickReturn === true && items.length !== 0) {
                  let item = items[items.length - 1];
                  this.patchItem({ ...item, printStatus: "return" })
            }
            else if (this.state.clickFailded === true && items.length !== 0) {
                  let item = items[items.length - 1];
                  this.patchItem({ ...item, printStatus: "failded" })
            }
            else if (this.state.clickWait === true && items.length !== 0) {
                  let item = items[items.length - 1];
                  this.patchItem({ ...item, printStatus: "wait" })
            }
            else if (this.state.clickDone === true && items.length !== 0) {
                  let item = items[items.length - 1];
                  this.patchItem({ ...item, printStatus: "done" })
            }
            else if (this.state.clickDelete === true && items.length !== 0) {
                  let item = items[items.length - 1];
                  this.props.deleteItem(item);
            }
            else if (this.state.clickSend === true && items.length !== 0) {
                  let item = items[items.length - 1];
                  this.patchItem({ ...item, printStatus: "send" })
            }




            if (localStorage.itemsPatch === "[]" & localStorage.CI_itemsPatchFail !== "[]" & localStorage.items_gllm === "[]" & localStorage.items_led === "[]" & localStorage.items_silicon === "[]") {
                  localStorage.itemsPatch = localStorage.CI_itemsPatchFail;
                  localStorage.CI_itemsPatchFail = "[]";
            }
            if (localStorage.itemsPatch === "[]") {
                  if (localStorage.items_gllm !== "[]") {
                        this.props.updatePcPro(JSON.parse(localStorage.items_gllm));
                  }
                  else if (localStorage.items_led !== "[]") {
                        this.props.updatePcPro(JSON.parse(localStorage.items_led));
                  }
                  else if (localStorage.items_silicon !== "[]") {
                        this.props.updatePcPro(JSON.parse(localStorage.items_silicon));
                  }
            }
      }
      patchItem = (item) => {
            let itemConvert = { ...item, handlechange: (item["handlechange"] === undefined) ? `${Date.parse(new Date())}:PUT` : item["handlechange"].concat(`,${Date.parse(new Date())}:PUT`) }
            this.props.patchItem({ item_post: itemConvert });

      }
      patchItemsSucsess = () => {
            let items = JSON.parse(localStorage.itemsPatch);
            items.pop();
            localStorage.itemsPatch = JSON.stringify(items);
            // this.props.propsItemsToDefault();

            if (items.length === 0 && this.state.clickPrinted) {
                  this.setState({ fetching: false, clickPrinted: false });

                  let items = JSON.parse(localStorage.itemsPrinted);
                  if (JSON.parse(localStorage.CI_itemsPatchFail).length !== 0) {
                        items = _.difference(JSON.parse(localStorage.itemsPrinted), JSON.parse(localStorage.CI_itemsPatchFail));
                  }
                  localStorage.items_gllm = JSON.stringify(items.filter(param => (param.type === "glass" || param.type === "luminous")));
                  localStorage.items_led = JSON.stringify(items.filter(param => param.type === "led"));
                  localStorage.items_silicon = JSON.stringify(items.filter(param => param.type === "silicon"));

                  // dem 
                  if (localStorage.items_gllm !== "[]") localStorage.items_gllm = JSON.stringify(this.change_pc_pro(JSON.parse(localStorage.items_gllm), "pc_gllm"));
                  if (localStorage.items_led !== "[]") localStorage.items_led = JSON.stringify(this.change_pc_pro(JSON.parse(localStorage.items_led), "pc_led"));
                  if (localStorage.items_silicon !== "[]") localStorage.items_silicon = JSON.stringify(this.change_pc_pro(JSON.parse(localStorage.items_silicon), "pc_silicon"));


            }
            else if (items.length === 0 && this.state.clickReturn) { this.setState({ fetching: false, clickReturn: false }) }
            else if (items.length === 0 && this.state.clickFailded) { this.setState({ fetching: false, clickFailded: false }) }
            else if (items.length === 0 && this.state.clickWait) { this.setState({ fetching: false, clickWait: false }) }
            else if (items.length === 0 && this.state.clickDone) { this.setState({ fetching: false, clickDone: false }) }
            else if (items.length === 0 && this.state.clickDelete) { this.setState({ fetching: false, clickDelete: false }) }
            else if (items.length === 0 && this.state.clickSend) { this.setState({ fetching: false, clickSend: false }) }



      }

      change_pc_pro = (items, type) => {
            let pc_pro = JSON.parse(localStorage.getItem(type)).item_post;
            delete pc_pro.id;
            delete pc_pro.type;

            pc_pro = _.toPairs(pc_pro).map(param => param[1]);

            let amountAllPhoneCase = [];
            let phonecaseSheet = pc_pro.map(param => param.nameDefault);


            for (let i = 0; i < phonecaseSheet.length; i++) {
                  let data2 = items.filter(param => param.case === phonecaseSheet[i]);
                  amountAllPhoneCase = [...amountAllPhoneCase, [phonecaseSheet[i], data2.length]];
            }


            pc_pro = pc_pro.map(param => [param.nameDefault, param]);
            pc_pro = _.fromPairs(pc_pro);
            pc_pro = { ...pc_pro, id: type, type: "pc_properties" }




            amountAllPhoneCase.forEach(param => { pc_pro[param[0]].amount = pc_pro[param[0]].amount - param[1] });
            pc_pro = { item_post: { ...pc_pro, id: type, type: "pc_properties" } }

            return pc_pro;


      }
      patchItemsFaild = () => { // dang xu ly cai nay
            let items = JSON.parse(localStorage.itemsPatch);
            let itemFaild = items[items.length - 1];
            let itemFailLocal = JSON.parse(localStorage.CI_itemsPatchFail);
            localStorage.CI_itemsPatchFail = JSON.stringify([...itemFailLocal, itemFaild]);
            items.pop();
            localStorage.itemsPatch = JSON.stringify(items);
            this.props.propsItemsToDefault();
            if (items.length === 0 && this.state.clickPrinted) { this.setState({ fetching: false, clickPrinted: false }) }
            else if (items.length === 0 && this.state.clickReturn) { this.setState({ fetching: false, clickReturn: false }) }
            else if (items.length === 0 && this.state.clickFailded) { this.setState({ fetching: false, clickFailded: false }) }
            else if (items.length === 0 && this.state.clickWait) { this.setState({ fetching: false, clickWait: false }) }
            else if (items.length === 0 && this.state.clickDone) { this.setState({ fetching: false, clickDone: false }) }
            else if (items.length === 0 && this.state.clickDelete) { this.setState({ fetching: false, clickDelete: false }) }
            else if (items.length === 0 && this.state.clickSend) { this.setState({ fetching: false, clickSend: false }) }






      }
      getCheckingSucsess = () => {
            let itemsAPI = this.props.ItemReducer.listItem;
            itemsAPI.pop();
            itemsAPI = itemsAPI.map(param => param.item_post)
            let itemsState = JSON.parse(localStorage.itemsPatch);
            itemsAPI = itemsAPI.map(param => {

                  if (itemsState.filter(param2 => param2.barcode === param.barcode).length === 0) {
                        return { ...param, handlechange: param["handlechange"].concat(`,${Date.parse(new Date())}:GET`) }
                  }
            }).filter(param2 => param2 !== undefined);
            // console.log(itemsAPI);

            localStorage.itemsPatch = JSON.stringify([...JSON.parse(localStorage.itemsPatch), ...itemsAPI]);
            this.props.propsItemsToDefault();

      }

      clickPrinterd = () => {
            localStorage.itemsPrinted = localStorage.itemsPatch;
            this.setStatus({ fetching: true, clickPrinted: true });


      }
      dmm = () => {
            this.setState({ reRender: Math.random() })

            // console.log(localStorage.itemsPatch);

      }
      loadJson = (e) => {
            let _this = this;

            //Validate whether File is valid Excel file.
            let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.json)$/;
            if (regex.test(e.target.value.toLowerCase())) {
                  if (typeof (FileReader) != "undefined") {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                              // _this.ProcessExcel(e.target.result);
                              let items = JSON.parse(e.target.result).items;
                              let type = JSON.parse(e.target.result).type;
                              items = _.flattenDeep(items).map(param => { return { ...param, type: type } });

                              localStorage.itemsPatch = JSON.stringify(items);
                              _this.dmm();

                              // console.log(JSON.parse(e.target.result));

                        };
                        reader.readAsBinaryString(e.target.files[0]);

                  } else {
                        alert("This browser does not support HTML5.");
                  }
            } else {
                  alert("Please upload a valid .Json file.");
            }
      }
      render() {


            let loadding = <ReactLoading type={"spinningBubbles"} color={"#000"} height={100} width={100} className="loading" />;


            return (
                  <React.Fragment>
                        {(this.state.clickPrinted === true) ? loadding : ""}
                        <div className="row justify-content-center nav-top-item">
                              <div className="col-4 d-flex align-items-center">
                                    <CheckingInput {...this.props} />

                              </div>
                        </div>

                        <div className="row">
                              <div className="col-12 checking-right mt-3">
                                    <div className="grid-container-item">
                                          <div className="grid-items-item1">
                                                <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                      onClick={this.clickPrinterd}>đánh dấu đã in xong
                                                </Button>

                                                <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                      onClick={() => this.setStatus({ fetching: true, clickDone: true })}>đánh dấu hàng đã hoàn thành
                                                </Button>
                                                <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                      onClick={() => this.setStatus({ fetching: true, clickWait: true })}>đánh dấu hàng chưa in
                                                </Button>
                                                <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                      onClick={() => this.setStatus({ fetching: true, clickReturn: true })}>đánh dấu hàng hoàn
                                                </Button>

                                                <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                      onClick={() => this.setStatus({ fetching: true, clickFailded: true })}>đánh dấu hàng lỗi
                                                </Button>
                                                <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                      onClick={() => this.setStatus({ fetching: true, clickSend: true })}>đánh dấu hàng gửi đi in
                                                </Button>
                                                <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                      onClick={() => this.setStatus({ fetching: true, clickDelete: true })}>xóa tất cả
                                                </Button>

                                                {/* <input type="file" id="fileinput" className="" onChange={this.loadJson} defaultValue="" /> */}




                                          </div>
                                          <ShowItems {...this.props} />

                                    </div>
                              </div>
                              {(this.state.fetching === true) ? <div className="pro-get-upload">
                                    <h1>Đang tải {JSON.parse(localStorage.itemsPatch).length}</h1>
                              </div> : ""}
                        </div>


                        {/* <div className="row ">
                              <UtilitiesChecking {...this.props} newItems={newItems} /> // download excel
                        </div> */}

                  </React.Fragment >
            );
      }
}

export default ControlItems;