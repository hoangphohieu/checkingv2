import React, { Component } from 'react';
import CheckingInput from './CheckingInput';
import _ from "lodash";
import ShowItems from './showItems/ShowItems';
import PhoiTonKho from './phoiTonKho/PhoiTonKho';
import DatePicker from './DatePicker';
import 'react-day-picker/lib/style.css';
import Button from '@material-ui/core/Button';
class Item extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = ({
                  ShowQLP: false,
                  arrDate: [Date.parse(new Date().toDateString())]
            })
      }

      searchChecking = (param) => {
            this.props.searchChecking(param);
      }

      componentDidUpdate() {
            this.CDU_checkRequest();
      }

      CDU_checkRequest() {

            if (this.props.ItemPayload.type === "ITEM_UPDATE_PC_PRO_RFAILURE" || this.props.ItemPayload.type === "ITEM_GET_PC_PRO_RFAILURE") { this.getPcProFail() }
            else if (this.props.ItemPayload.type === "ITEM_GET_PC_PRO_SUCSESS") { this.getPcProDone() }

      }
      showAlert = (param) => {
            alert(param);
            window.location = "/"
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
      getItemsDatePicker = (endPoint, arrDate) => {
            this.setState({ arrDate: arrDate });
            this.props.searchCheckingDate(endPoint);
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
                                                <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=wait")}>Hàng chưa in
                                                </Button>
                                                <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=printed")}>Hàng in xong chưa gửi
                                                </Button>
                                                <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=failded")}>Hàng lỗi
                                                </Button>
                                                <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=return")}>Hàng hoàn
                                                </Button>
                                                <Button variant="outlined" className="mb-1 w-100 bt-show"
                                                      onClick={() => this.setState({ ShowQLP: true })}>Quản lý phôi
                                                </Button>

                                                <PhoiTonKho ShowQLP={this.state.ShowQLP} closeModal={() => this.setState({ ShowQLP: false })} {...this.props} />


                                                <div className="mt-4">
                                                      <DatePicker getItemsDatePicker={this.getItemsDatePicker} />
                                                </div>

                                          </div>
                                          <ShowItems {...this.props} arrDate={this.state.arrDate} />

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
