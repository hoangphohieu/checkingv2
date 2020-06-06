import React, { Component } from 'react';
import PhoiTonKhoItem from "./PhoiTonKhoItem";
import _ from "lodash";
class TablePTK extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  showFieldAdd: false,
                  newPC: {
                        width: null,
                        hight: null,
                        amount: null,
                        nameVariant: null,
                        nameDefault: null,
                        numberMica: null,
                        zPosition: null

                  }
            }
      }


      changePC_Properties = (item, type) => {
            let items = JSON.parse(localStorage.getItem(type));
            this.props.updatePcProperties(this.convertPcPro(items, type, item))
      }
      deleteItem = (item, type) => {
            let items = JSON.parse(localStorage.getItem(type));
            items = items.filter(param => JSON.stringify(param) !== JSON.stringify(item));
            this.props.updatePcProperties(this.convertPcPro(items, type))

      }
      convertPcPro = (items, type, item) => {
            items = items.map(param => [param.nameDefault, param]);
            items = _.fromPairs(items);
            console.log(item);

            if (item !== undefined)
                  items[item.nameDefault] = item;
            items = { ...items, id: type, type: "pc_properties" }
            return items;
      }
      addPcPro = () => {
            let type = this.props.typePTK;
            let item = this.state.newPC
            if (type !== "pc_silicon") {
                  delete item.numberMica;
                  delete item.zPosition;
            }
            if (item.width === null | item.hight === null | item.amount === null | item.nameVariant === null | item.nameDefault === null | item.numberMica === null | item.zPosition === null) {
                  alert("nhap thieu truong");
            }
            else {
                  let pc_pro = JSON.parse(localStorage.getItem(this.props.typePTK));
                  pc_pro.push(item);


                  this.props.updatePcProperties(this.convertPcPro(pc_pro, type));
            }


      }
      render() {
            let items = _.orderBy(JSON.parse(localStorage.getItem(this.props.typePTK)), ['nameDefault'], ['asc']);
            let si_pro = "";
            if (this.props.typePTK === "pc_silicon") {
                  si_pro = <><div className="ptk-pro-ctn">
                        <span className="ptk-pro-name">Mica</span>
                        <input type="text" className="form-control" placeholder={"50"} onChange={(e) => this.setState({ newPC: { ...this.state.newPC, numberMica: Number(e.target.value) } })} />
                  </div>
                        <div className="ptk-pro-ctn">
                              <span className="ptk-pro-name">Z</span>
                              <input type="text" className="form-control" placeholder={"8.5"} onChange={(e) => this.setState({ newPC: { ...this.state.newPC, zPosition: Number(e.target.value) } })} />
                        </div></>
            }


            let renderAddPc = "";
            if (this.state.showFieldAdd === true) {
                  renderAddPc = <div className="row">
                        <div className="col-12">
                              <div className="ptk-pro-ctn">
                                    <span className="ptk-pro-name">Name</span>
                                    <input type="text" className="form-control" placeholder={"i7"} onChange={(e) => this.setState({ newPC: { ...this.state.newPC, nameDefault: e.target.value } })} />
                              </div>
                              <div className="ptk-pro-ctn">
                                    <span className="ptk-pro-name">Width</span>
                                    <input type="text" className="form-control" placeholder={"80"} onChange={(e) => this.setState({ newPC: { ...this.state.newPC, width: Number(e.target.value) } })} />
                              </div>
                              <div className="ptk-pro-ctn">
                                    <span className="ptk-pro-name">Hight</span>
                                    <input type="text" className="form-control" placeholder={"160"} onChange={(e) => this.setState({ newPC: { ...this.state.newPC, hight: Number(e.target.value) } })} />
                              </div>
                              <div className="ptk-pro-ctn">
                                    <span className="ptk-pro-name">SL</span>
                                    <input type="text" className="form-control" placeholder={"1000"} onChange={(e) => this.setState({ newPC: { ...this.state.newPC, amount: Number(e.target.value) } })} />
                              </div>
                              {si_pro}
                              <div className="ptk-pro-ctn">
                                    <span className="ptk-pro-name">Variant</span>
                                    <input type="text" className="form-control" placeholder={"i7,i8,iphone7"} onChange={(e) => this.setState({ newPC: { ...this.state.newPC, nameVariant: e.target.value } })} />
                              </div>
                              <button type="button" className="btn btn-info" onClick={this.addPcPro}>Thêm</button>
                        </div>

                  </div>
            }
            return (
                  <div className="col-4">
                        {(this.props.typePTK === "pc_gllm") ? <h3 className="ptk-title"> Glass-Luminous</h3> : ((this.props.typePTK === "pc_led") ? <h3 className="ptk-title"> Led</h3> : <h3 className="ptk-title">Silicon</h3>)}

                        <div className="row ptl-ctn">
                              <div className="col-3 ptk-item">
                                    STT
                               </div>
                              <div className="col-6 ptk-item">
                                    Phôi
                              </div>
                              <div className="col-3 ptk-item d-relative">
                                    Số lượng

                              </div>
                        </div>
                        {items.map((param, key) => <PhoiTonKhoItem item={param} key={key} stt={key + 1} changePC_Properties={this.changePC_Properties} deleteItem={this.deleteItem} type={this.props.typePTK} />)}

                        {/* them pc-pro moi */}
                        {renderAddPc}


                        <div className="row justify-content-center">
                              <button className="add-pc-pro" onClick={() => this.setState({ showFieldAdd: !this.state.showFieldAdd })}>
                                    {(this.state.showFieldAdd === false) ? "Thêm" : "Đóng"}
                              </button>

                        </div>
                  </div>

            );
      }
}

export default TablePTK;