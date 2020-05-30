import React, { Component } from 'react';
import CheckingInput from './CheckingInput';
import _ from "lodash";
import ShowItems from './showItems/ShowItems';
import DayPicker from 'react-day-picker';
import PhoiTonKho from './phoiTonKho/PhoiTonKho';

import 'react-day-picker/lib/style.css';
class Item extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = ({
                  selectedDay: undefined,
                  ShowQLP: false
            })
      }

      searchChecking = (param) => {
            this.props.searchChecking(param);
      }
      handleDayClick = (day) => {
            this.setState({ selectedDay: day });
            let date = Date.parse(day) - 12 * 60 * 60 * 1000;

            this.searchChecking(`?datatype=item&date=${date}`)
      }
      componentDidUpdate() {
            console.log(this.props.ItemPayload);

            this.CDU_checkRequest();
      }
      CDU_checkRequest() {

            if (this.props.ItemPayload.type === "ITEM_UPDATE_PC_PRO_RFAILURE" || this.props.ItemPayload.type === "ITEM_GET_PC_PRO_RFAILURE") { this.getPcProFail() }
            else if (this.props.ItemPayload.type === "ITEM_GET_PC_PRO_SUCSESS") { this.getPcProDone() }

      }
      showAlert = (param) => {
            alert(param);
            window.location = "/item"
      }
      getPcProFail = () => {
            this.showAlert("items.js-kiem tra duong truyen mang! ")
      }
      getPcProDone = () => {
            this.convertPCProperties(this.props.ItemPayload.listItem);
            this.tempAlert("Thay doi thanh cong", 500);
            this.props.propsItemsToDefault();
      }
      tempAlert = (msg, duration) => {
            console.log(msg);

            var el = document.createElement("div");
            el.setAttribute("style", "position:fixed;z-index:99999;top:10px;left:46%;background-color:#80ced6;padding:10px;font-size:2rem;color:white");
            el.innerHTML = msg;
            setTimeout(function () {
                  el.parentNode.removeChild(el);
            }, duration);
            document.body.appendChild(el);
      }
      convertPCProperties = (payload) => {
            payload.forEach(items => {
                  let C_Items = _.toPairs(items).filter(param => (param[0] !== "id" && param[0] !== "type")).map(param => { return { ...param[1], nameDefault: param[0] } });
                  localStorage.setItem(items.id, JSON.stringify(C_Items));

            });
      }
      render() {




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
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=wait")}>Hàng chưa in
                                                </button>
                                                <button type="button" className="btn btn-danger" style={{ width: "100%" }}
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=printed")}>Hàng in xong chưa gửi
                                                </button>
                                                <button type="button" className="btn btn-dark" style={{ width: "100%" }}
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=failded")}>Hàng lỗi
                                                </button>
                                                <button type="button" className="btn btn-secondary" style={{ width: "100%" }}
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=return")}>Hàng hoàn
                                                </button>
                                                <button type="button" className="btn btn-secondary" style={{ width: "100%" }}
                                                      onClick={() => this.setState({ ShowQLP: true })}>Quản lý phôi
                                                </button>
                                                <PhoiTonKho ShowQLP={this.state.ShowQLP} closeModal={() => this.setState({ ShowQLP: false })} {...this.props} />

                                                <div>
                                                      <DayPicker
                                                            onDayClick={this.handleDayClick}
                                                            selectedDays={this.state.selectedDay}
                                                      />

                                                </div>

                                          </div>
                                          <ShowItems {...this.props} />

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

export default Item;

