import React, { Component } from 'react';
import CheckingInput from './CheckingInput';
import _ from "lodash";
import ShowItems from './showItems/ShowItems';
import DayPicker from 'react-day-picker';
import ReactLoading from 'react-loading';
import 'react-day-picker/lib/style.css';
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
                  items: [],
                  reRender: 0
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
            let pcPro = this.props.ItemReducer.listItem;
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
            this.props.patchItem(item);

      }
      patchItemsSucsess = () => {
            let items = JSON.parse(localStorage.itemsPatch);
            items.pop();
            localStorage.itemsPatch = JSON.stringify(items);
            this.props.propsItemsToDefault();

            if (items.length === 0 && this.state.clickPrinted) {
                  this.setState({ clickPrinted: false });

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
            else if (items.length === 0 && this.state.clickReturn) { this.setState({ clickReturn: false }) }
            else if (items.length === 0 && this.state.clickFailded) { this.setState({ clickFailded: false }) }
            else if (items.length === 0 && this.state.clickWait) { this.setState({ clickWait: false }) }
            else if (items.length === 0 && this.state.clickDone) { this.setState({ clickDone: false }) }
            else if (items.length === 0 && this.state.clickDelete) { this.setState({ clickDelete: false }) }



      }

      change_pc_pro = (items, type) => {
            let pc_pro = JSON.parse(localStorage.getItem(type));
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
            if (items.length === 0 && this.state.clickPrinted) { this.setState({ clickPrinted: false }) }
            else if (items.length === 0 && this.state.clickReturn) { this.setState({ clickReturn: false }) }
            else if (items.length === 0 && this.state.clickFailded) { this.setState({ clickFailded: false }) }
            else if (items.length === 0 && this.state.clickWait) { this.setState({ clickWait: false }) }
            else if (items.length === 0 && this.state.clickDone) { this.setState({ clickDone: false }) }
            else if (items.length === 0 && this.state.clickDelete) { this.setState({ clickDelete: false }) }





      }
      getCheckingSucsess = () => {
            let itemsAPI = this.props.ItemReducer.listItem;
            let itemsState = JSON.parse(localStorage.itemsPatch);
            itemsAPI = itemsAPI.map(param => {

                  if (itemsState.filter(param2 => param2.barcode === param.barcode).length === 0) {
                        return param
                  }
            }).filter(param2 => param2 !== undefined)
            localStorage.itemsPatch = JSON.stringify([...JSON.parse(localStorage.itemsPatch), ...itemsAPI]);
            this.props.propsItemsToDefault();

      }

      clickPrinterd = () => {
            localStorage.itemsPrinted = localStorage.itemsPatch;
            this.setStatus({ clickPrinted: true });


      }
      render() {
            console.log(this.props.ItemReducer);

            let loadding = <ReactLoading type={"spinningBubbles"} color={"#000"} height={100} width={100} className="loading" />;
            let items = JSON.parse(localStorage.itemsPatch)

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
                                                <button type="button" className="btn btn-danger" style={{ width: "100%" }}
                                                      onClick={this.clickPrinterd}>đánh dấu đã in xong
                                                </button>
                                                <button type="button" className="btn btn-success" style={{ width: "100%" }}
                                                      onClick={() => this.setStatus({ clickDone: true })}>đánh dấu hàng đã hoàn thành
                                                </button>
                                                <button type="button" className="btn btn-warning" style={{ width: "100%" }}
                                                      onClick={() => this.setStatus({ clickWait: true })}>đánh dấu hàng chưa in
                                                </button>

                                                <button type="button" className="btn btn-secondary" style={{ width: "100%" }}
                                                      onClick={() => this.setStatus({ clickReturn: true })}>đánh dấu hàng hoàn
                                                </button>
                                                <button type="button" className="btn btn-dark" style={{ width: "100%" }}
                                                      onClick={() => this.setStatus({ clickFailded: true })}>đánh dấu hàng lỗi
                                                </button>


                                                <button type="button" className="btn btn-info" style={{ width: "100%" }}
                                                      onClick={() => this.setStatus({ clickDelete: true })}>xóa tất cả
                                                </button>
                                                {/* <div>
                                                      <DayPicker
                                                            onDayClick={this.handleDayClick}
                                                            selectedDays={this.state.selectedDay}
                                                      />

                                                </div> */}

                                          </div>
                                          <ShowItems {...this.props} items={items} />

                                    </div>
                              </div>
                        </div>


                        {/* <div className="row ">
                              <UtilitiesChecking {...this.props} newItems={newItems} /> // download excel
                        </div> */}

                  </React.Fragment >
            );
      }
}

export default ControlItems;