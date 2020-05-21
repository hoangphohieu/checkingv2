


import React, { Component } from 'react';
import _ from 'lodash';
import RenderTrackingProperties from './RenderTrackingProperties';
import SelectDate from './SelectDate';
import { DropdownButton, Dropdown } from 'react-bootstrap';

class TrackingSearch extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  listOrder: [],
                  dataRenderTracking: null,
                  select: "all",
                  valueInput: "",
                  searchStyle: "by Order"
            }
      }

      componentWillMount() {
            localStorage.setItem("listNameForTracking", JSON.stringify([]));
            localStorage.setItem("listNameForTrackingFail", JSON.stringify([]));
            localStorage.setItem("listTrackingSucsess", JSON.stringify([]));
      }


      componentDidUpdate() {

            this.CDU_checkRequest();
            this.CDU_renderListTrackingSucsess();
            console.log(this.props.itemsPayload.type);

      }
      CDU_renderListTrackingSucsess = () => {
            console.log(this.state.dataRenderTracking);

            if (this.state.dataRenderTracking === null && JSON.parse(localStorage.listTrackingSucsess).length > 0) {
                  this.setState({ dataRenderTracking: JSON.parse(localStorage.listTrackingSucsess) })
            }
      }
      CDU_checkRequest = () => {

            if (this.props.itemsPayload.type === "GET_TRACKING_MORE_SUCSESS") { this.GetTrackingSuccess() }
            else if (this.props.itemsPayload.type === "GET_ORDER_BY_DAY_SUCSESS") { this.getOrderByDaySucsess() }
            else if (this.props.itemsPayload.type === "GET_RFAILURE") { this.GetFail() }

      }
      getOrderByDaySucsess = () => {
            if (_.toPairs(this.props.itemsPayload.listItem).length !== 0) {
                  let listOrder = [];
                  let data = _.mapValues(this.props.itemsPayload.listItem, function (o) { return o[0].name; });
                  _.toPairs(data).forEach(param => {
                        listOrder.push(param[1]);
                  });
                  listOrder = _.uniq(_.flattenDeep(listOrder));
                  console.log(listOrder);
                  this.searchTracking(listOrder);
                  this.setState({ listOrder: listOrder });
            }
            this.props.StateStoreTrackingToDefault();

      }


      GetTrackingSuccess = () => {

            let _this = this;
            let items = this.props.itemsPayload.listItem;
            if (items.meta.code === 200) {
                  let listNameForTracking = JSON.parse(localStorage.listNameForTracking);
                  let listTrackingSucsess = JSON.parse(localStorage.listTrackingSucsess);

                  if (listNameForTracking.length > 0) {
                        items = [...items.data.items];
                        let ordersTrackingSuccess = items.map(param => param.order_id);
                        let listTrackingFail = _.difference(listNameForTracking[listNameForTracking.length - 1], ordersTrackingSuccess);
                        let listNameForTrackingFail = JSON.parse(localStorage.listNameForTrackingFail);
                        listTrackingFail.forEach(param => { listNameForTrackingFail.push(param) })
                        localStorage.setItem("listNameForTrackingFail", JSON.stringify(listNameForTrackingFail));// lưu những item fail vào localstorage
                        listTrackingSucsess = [...listTrackingSucsess, ...items];
                        localStorage.setItem("listTrackingSucsess", JSON.stringify(listTrackingSucsess));// lưu những item success vào localstorage

                        listNameForTracking.pop();
                        localStorage.setItem("listNameForTracking", JSON.stringify(listNameForTracking));
                        if (listNameForTracking.length > 0) {
                              let listName = listNameForTracking[listNameForTracking.length - 1];
                              listName = listName.map(param => { return _.replace(param, '#', '%23') });
                              listName = listName.map(param => { return _.replace(param, ' ', '%20') });
                              listName = [...listName].join(",");
                              let endPoint = "?orders=" + listName + "&limit=500";
                              console.log(endPoint);
                              setTimeout(function () { _this.props.getTrackingMore(endPoint); }, 1000);
                        }
                        else {
                              this.props.StateStoreTrackingToDefault();
                              this.setState({ dataRenderTracking: JSON.parse(localStorage.listTrackingSucsess), select: "all" })
                        }
                  }

            }
            else {
                  alert(items.meta.message);
                  alert("Có lỗi xảy ra, vui lòng F5 lại trang và thực hiện lại");
            }
      }
      GetFail = () => {
            alert("Lỗi internet, vui lòng kiểm tra đường truyền, F5 lại trang và thực hiện lại");
      }
      searchTracking = (listOrderGet) => {
            console.log(listOrderGet);

            let numberPerTrack = 40;
            localStorage.setItem("listNameForTracking", JSON.stringify(_.chunk(listOrderGet, numberPerTrack)));
            listOrderGet = listOrderGet.map(param => { return _.replace(param, '#', '%23') });
            listOrderGet = listOrderGet.map(param => { return _.replace(param, ' ', '%20') });
            listOrderGet = _.chunk(listOrderGet, numberPerTrack);
            let listName = listOrderGet[listOrderGet.length - 1];

            listName = [...listName].join(",")
            let endPoint = "?orders=" + listName + "&limit=500";
            this.props.getTrackingMore(endPoint);
            localStorage.setItem("listTrackingSucsess", JSON.stringify([]));


      }
      setDataRenderTracking = (param, param2) => {
            console.log(param);
            console.log(this);

            this.setState({ dataRenderTracking: param, select: param2 });
      }
      changeValueInput = (e) => {
            this.setState({ valueInput: e.target.value });
      }
      SearchItemByEnter = (e) => {
            if (e.key === "Enter") { this.searchChecking() }
      }
      searchChecking = () => {
            let _this = this;
            let endPoint = ((this.state.searchStyle === "by Order") ? "?orders=" : "?numbers=") + _.replace(this.state.valueInput, '#', '%23') + "&limit=500";
            console.log(endPoint);

            setTimeout(function () { _this.props.getTrackingMore(endPoint); }, 1000);
            localStorage.setItem("listNameForTracking", JSON.stringify([_.replace(this.state.valueInput, '#', '%23')]));
            localStorage.setItem("listTrackingSucsess", JSON.stringify([]));



      }
      setSearchStyle = (param) => {
            this.setState({ searchStyle: param })
      }
      render() {
            let listTrackingSucsess = JSON.parse(localStorage.listTrackingSucsess);
            let listNameTrackingSucsess = listTrackingSucsess.map(param => param.order_id);
            let pending = [], notfound = [], transit = [], pickup = [], delivered = [], undelivered = [], exception = [], expired = [], wrongName = [];
            if (listTrackingSucsess.length > 0) {
                  transit = listTrackingSucsess.filter(param => param.status === "transit");
                  delivered = listTrackingSucsess.filter(param => param.status === "delivered");
                  pickup = listTrackingSucsess.filter(param => param.status === "pickup"); // Out For Delivery
                  exception = listTrackingSucsess.filter(param => param.status === "exception");
                  expired = listTrackingSucsess.filter(param => param.status === "expired");
                  notfound = listTrackingSucsess.filter(param => param.status === "notfound");
                  undelivered = listTrackingSucsess.filter(param => param.status === "undelivered"); //Failed Attempt
                  pending = listTrackingSucsess.filter(param => param.status === "pending");
                  wrongName = _.difference(this.state.listOrder, listNameTrackingSucsess);
            }
            console.log(this.state.dataRenderTracking);
            console.log(pickup);


            let RenderoneTracking = [];
            if (this.state.dataRenderTracking !== null)
                  RenderoneTracking = this.state.dataRenderTracking.map((param, id) => <RenderTrackingProperties key={id} dataTracking={param} />);
            return (<React.Fragment>
                  {this.props.itemsPayload.type !== "STATE_TO_DEFAULT" ? <div className="css-loader">
                        <div className="loader ">Loading...</div>
                  </div> : ""}
                  <div className="row justify-content-center nav-top-item">
                        <div className="col-4 d-flex align-items-center">
                              <div className="input-group ">
                                    <input className="text" className="form-control"
                                          placeholder="Search by TrackingNumber or Order"
                                          aria-label="Username"
                                          aria-describedby="basic-addon2"
                                          onChange={this.changeValueInput}
                                          onKeyDown={this.SearchItemByEnter}
                                          autoFocus />
                                    <div className="input-group-prepend">
                                          <DropdownButton id="dropdown-Secondary-button" title={this.state.searchStyle} variant="secondary">
                                                <Dropdown.Item onClick={() => this.setSearchStyle("by Tracking")}>By Tracking</Dropdown.Item>
                                                <Dropdown.Item onClick={() => this.setSearchStyle("by Order")}>By Order</Dropdown.Item>
                                          </DropdownButton>
                                          <span className="input-group-text hover-pointer" id="basic-addon2" onClick={this.searchChecking}><i className="fa fa-search"></i></span>
                                    </div>

                              </div>

                        </div>
                  </div>
                  <div className="row">
                        <div className="col-2 left-tracking-properties p-0">
                              <div className={"tracking-count" + ((this.state.select === "all") ? " select-product" : "")} onClick={() => this.setDataRenderTracking(listTrackingSucsess, "all")}><span>All</span><span>{listTrackingSucsess.length}</span></div>
                              <div className={"tracking-count" + ((this.state.select === "transit") ? " select-product" : "")} onClick={() => this.setDataRenderTracking(transit, "transit")}><span>Transit</span><span>{transit.length}</span></div>
                              <div className={"tracking-count" + ((this.state.select === "delivered") ? " select-product" : "")} onClick={() => this.setDataRenderTracking(delivered, "delivered")}><span>Delivered</span><span>{delivered.length}</span></div>
                              <div className={"tracking-count" + ((this.state.select === "pickup") ? " select-product" : "")} onClick={() => this.setDataRenderTracking(pickup, "pickup")}><span>Out for Delivery</span><span>{pickup.length}</span></div>
                              <div className={"tracking-count" + ((this.state.select === "exception") ? " select-product" : "")} onClick={() => this.setDataRenderTracking(exception, "exception")}><span>Exception</span><span>{exception.length}</span></div>
                              <div className={"tracking-count" + ((this.state.select === "expired") ? " select-product" : "")} onClick={() => this.setDataRenderTracking(expired, "expired")}><span>Expired</span><span>{expired.length}</span></div>
                              <div className={"tracking-count" + ((this.state.select === "notfound") ? " select-product" : "")} onClick={() => this.setDataRenderTracking(notfound, "notfound")}><span>Not Found</span><span>{notfound.length}</span></div>
                              <div className={"tracking-count" + ((this.state.select === "undelivered") ? " select-product" : "")} onClick={() => this.setDataRenderTracking(undelivered, "undelivered")}><span>Failed Attempt</span><span>{undelivered.length}</span></div>
                              <div className={"tracking-count" + ((this.state.select === "pending") ? " select-product" : "")} onClick={() => this.setDataRenderTracking(pending, "pending")}><span>Pending</span><span>{pending.length}</span></div>
                              <div className={"mb-5 tracking-count" + ((this.state.select === "wrongName") ? " select-product" : "")} onClick={() => this.setDataRenderTracking(wrongName, "wrongName")}><span>Wrong Name</span><span>{wrongName.length}</span></div>

                              <div className="p-1">
                                    <SelectDate {...this.props} />

                              </div>
                        </div>
                        <div className="col-10">
                              <div className="row p-2">
                                    <div className="col-2 title-properties-tracking ">
                                          Tracking No
                                     </div>
                                    <div className="col-2 title-properties-tracking">
                                          Order No
                                    </div>
                                    <div className="col-6 title-properties-tracking">
                                          Parcel Status
                                     </div>
                                    <div className="col-2 title-properties-tracking">
                                          Transit Time
                                     </div>
                              </div>
                              {RenderoneTracking}
                        </div>
                  </div>


            </React.Fragment>
            );
      }
}

export default TrackingSearch;


