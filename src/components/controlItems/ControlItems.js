import React, { Component } from 'react';
import CheckingInput from './CheckingInput';
import _ from "lodash";
import ShowItems from './showItems/ShowItems';
import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';
class ControlItems extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = ({
                  selectedDay: undefined,
                  clickPrinted: false,
                  items: []
            })
      }

      setAllPrinted = () => {
            this.setState({ clickPrinted: true })
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
            if (this.state.clickPrinted && this.state.items.length !== 0) {
                  let item = this.state.items[this.state.items.length - 1];
                  this.patchItem({ ...item, printStatus: "printed" })
            }
      }
      patchItem = (item) => {
            this.props.patchItem(item);

      }
      patchItemsSucsess = () => {
            let items = this.state.items;
            items.pop();
            this.setState({ items: items });
            this.props.propsItemsToDefault();

      }
      patchItemsFaild = () => { // dang xu ly cai nay
            let items = this.state.items;
            let itemFaild = items[items.length - 1];
            let itemFailLocal = JSON.parse(localStorage.CI_itemsPatchFail);
            localStorage.setItem("CI_itemsPatchFail", JSON.stringify([...itemFailLocal, itemFaild]));
            items.pop();
            this.setState({ items: items });
            this.props.propsItemsToDefault();
      }
      getCheckingSucsess = () => {
            let itemsAPI = this.props.ItemReducer.listItem;
            let itemsState = this.state.items;
            itemsAPI = itemsAPI.map(param => {

                  if (itemsState.filter(param2 => param2.barcode === param.barcode).length === 0) {
                        return param
                  }
            }).filter(param2 => param2 !== undefined)

            this.setState({ items: [...this.state.items, ...itemsAPI] });
            this.props.propsItemsToDefault();

      }


      render() {
            console.log(this.props.ItemReducer);




            return (
                  <React.Fragment>
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
                                                      onClick={() => this.setAllPrinted()}>đánh dấu đã in
                                                </button>


                                                {/* <div>
                                                      <DayPicker
                                                            onDayClick={this.handleDayClick}
                                                            selectedDays={this.state.selectedDay}
                                                      />

                                                </div> */}

                                          </div>
                                          <ShowItems {...this.props} items={this.state.items} />

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