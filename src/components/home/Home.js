import React, { Component } from 'react';
import CheckingInput from './CheckingInput';
import _ from "lodash";
import ShowItems from './showItems/ShowItems';
import PhoiTonKho from './phoiTonKho/PhoiTonKho';
import DatePicker from './DatePicker';

import Button from '@material-ui/core/Button';
class Item extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = ({
                  ShowQLP: false,
                  arrDate: [Date.parse(new Date().toDateString())],
                  fetchAPI: false
            })
      }

      searchChecking = (param) => {

            this.props.searchChecking(param);
            this.setState({ fetchAPI: true })
      }

      componentDidUpdate() {
            this.CDU_checkRequest();


      }

      CDU_checkRequest() {

            if (this.props.ItemPayload.type === "ITEM_UPDATE_PC_PRO_RFAILURE" || this.props.ItemPayload.type === "ITEM_GET_PC_PRO_RFAILURE") { this.getPcProFail() }
            else if (this.props.ItemPayload.type === "ITEM_GET_PC_PRO_SUCSESS") { this.getPcProDone() }
            else if (this.props.ItemPayload.type === "GET_CHECKING_SUCSESS"
                  || this.props.ItemPayload.type === "GET_CHECKING_DATE_SUCSESS"
            ) this.setState({ fetchAPI: false })

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


            var el = document.createElement("div");
            el.setAttribute("style", "position:fixed;z-index:99999;top:10px;left:46%;background-color:#80ced6;padding:10px;font-size:2rem;color:white");
            el.innerHTML = msg;
            setTimeout(function () {
                  el.parentNode.removeChild(el);
            }, duration);
            document.body.appendChild(el);
      }
      convertPCProperties = (payload) => {
            payload.pop();


            payload.forEach(items => {
                  localStorage.setItem(items.item_post.id, JSON.stringify(items));
                  return 0;
            });
      }
      getItemsDatePicker = (endPoint, arrDate) => {
            this.setState({ arrDate: arrDate });
            this.props.searchCheckingDate(endPoint);
      }
      changeFetchAPITrue = () => {
            this.setState({ fetchAPI: true })
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
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=failded")}>Hàng lỗi (chờ xử lý)
                                                </Button>
                                                <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=send")}>Hàng gửi đi in
                                                </Button>
                                                <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=return")}>Hàng hoàn
                                                </Button>
                                                <Button variant="outlined" className="mb-1 w-100 bt-show"
                                                      onClick={() => this.setState({ ShowQLP: true })}>Quản lý phôi
                                                </Button>

                                                <PhoiTonKho ShowQLP={this.state.ShowQLP} closeModal={() => this.setState({ ShowQLP: false })} {...this.props} />


                                                <div className="mt-4">
                                                      <DatePicker getItemsDatePicker={this.getItemsDatePicker} changeFetchAPITrue={this.changeFetchAPITrue} />
                                                </div>

                                          </div>
                                          <ShowItems {...this.props} arrDate={this.state.arrDate} changeFetchAPITrue={this.changeFetchAPITrue} />

                                    </div>
                              </div>
                        </div>


                        {(this.state.fetchAPI === true) ? <div className="pro-get-upload">
                              <h1>Đang tải...</h1>
                        </div> : ""}
                  </React.Fragment>
            );
      }
}

export default Item;

