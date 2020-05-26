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
            else if (this.props.ItemReducer.type === "CI_PATCH_ITEMS_RFAILURE") { this.patchItemsFaild() }
            else if (this.props.ItemReducer.type === "POST_ITEM_EXCEL_RFAILURE") { this.doingWhenPostItemFail() }
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
            if (localStorage.itemsPatch === "[]" && localStorage.CI_itemsPatchFail !== "[]") {
                  localStorage.itemsPatch = localStorage.CI_itemsPatchFail;
                  localStorage.CI_itemsPatchFail = "[]";
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
            console.log(items);

            if (items.length === 0 && this.state.clickPrinted) { this.setState({ clickPrinted: false }) }
            else if (items.length === 0 && this.state.clickReturn) { this.setState({ clickReturn: false }) }
            else if (items.length === 0 && this.state.clickFailded) { this.setState({ clickFailded: false }) }
            else if (items.length === 0 && this.state.clickWait) { this.setState({ clickWait: false }) }
            else if (items.length === 0 && this.state.clickDone) { this.setState({ clickDone: false }) }



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

                                                <button type="button" className="btn btn-warning" style={{ width: "100%" }}
                                                      onClick={() => this.setStatus({ clickPrinted: true })}>đánh dấu đã in
                                                </button>
                                                <button type="button" className="btn btn-secondary" style={{ width: "100%" }}
                                                      onClick={() => this.setStatus({ clickReturn: true })}>đánh dấu hàng hoàn
                                                </button>
                                                <button type="button" className="btn btn-danger" style={{ width: "100%" }}
                                                      onClick={() => this.setStatus({ clickFailded: true })}>đánh dấu hàng lỗi
                                                </button>
                                                <button type="button" className="btn btn-primary" style={{ width: "100%" }}
                                                      onClick={() => this.setStatus({ clickWait: true })}>đánh dấu hàng chưa in
                                                </button>
                                                <button type="button" className="btn btn-success" style={{ width: "100%" }}
                                                      onClick={() => this.setStatus({ clickDone: true })}>đánh dấu hàng đã hoàn thành
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

                  </React.Fragment>
            );
      }
}

export default ControlItems;