import React, { Component } from 'react';

class PhoiTonKhoItem extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  showInfo: false,
                  width: 0,
                  hight: 0,
                  amount: 0,
                  numberMica: 0,
                  zPosition: 0,
                  nameVariant: ""
            }
      }
      changeWidth = (e) => {
            this.setState({ width: Number(e.target.value) })
      }
      changeHight = (e) => {
            this.setState({ hight: Number(e.target.value) })
      }
      changeAmount = (e) => {

            this.setState({ amount: Number(e.target.value) })
      }
      changeNameVariant = (e) => {
            this.setState({ nameVariant: e.target.value })
      }
      changeNumberMica = (e) => {
            this.setState({ numberMica: Number(e.target.value) })
      }
      changeZPosition = (e) => {
            this.setState({ zPosition: Number(e.target.value) })
      }

      changeValue = () => {
            let item = this.props.item[1];
            if (this.state.width !== 0) {
                  item = { ...item, width: this.state.width }
            }
            if (this.state.hight !== 0) {
                  item = { ...item, hight: this.state.hight }
            }
            if (this.state.numberMica !== 0) {
                  item = { ...item, numberMica: this.state.numberMica }
            }
            if (this.state.zPosition !== 0) {
                  item = { ...item, zPosition: this.state.zPosition }
            }
            if (this.state.nameVariant !== "") {
                  item = { ...item, nameVariant: this.state.nameVariant }
            }
            if (this.state.amount !== 0) {
                  item = { ...item, amount: this.state.amount }
            }
            // console.log(item);

            this.props.changePC_Properties(item, this.props.type);
      }

      render() {
            let item = this.props.item[1];
            // console.log(this.props.item);

            let si_pro = "";
            if (this.props.type === "pc_silicon") {
                  si_pro = <><div className="ptk-pro-ctn">
                        <span className="ptk-pro-name">Mica</span>
                        <input type="text" className="form-control" defaultValue={item.numberMica} onChange={this.changeNumberMica} />
                  </div>
                        <div className="ptk-pro-ctn">
                              <span className="ptk-pro-name">Z</span>
                              <input type="text" className="form-control" defaultValue={item.zPosition} onChange={this.changeZPosition} />
                        </div></>
            }
            return (<React.Fragment>
                  <div className="row ptl-ctn" onClick={() => this.setState({ showInfo: !this.state.showInfo })}>
                        <div className="col-3 ptk-item">
                              {this.props.stt}
                        </div>
                        <div className="col-6 ptk-item">
                              {item.nameDefault}
                        </div>
                        <div className="col-3 ptk-item d-relative">
                              {item.amount}
                        </div>
                  </div>
                  {(this.state.showInfo === true) ? <div className="row">
                        <div className="col-12">
                              {/* <div className="">
                                    Width
                              </div> */}
                              <div className="ptk-pro-ctn">
                                    <span className="ptk-pro-name">Width</span>
                                    <input type="text" className="form-control" defaultValue={item.width} onChange={this.changeWidth} />
                              </div>
                              <div className="ptk-pro-ctn">
                                    <span className="ptk-pro-name">Hight</span>
                                    <input type="text" className="form-control" defaultValue={item.hight} onChange={this.changeHight} />
                              </div>
                              <div className="ptk-pro-ctn">
                                    <span className="ptk-pro-name">SL</span>
                                    <input type="text" className="form-control" defaultValue={item.amount} onChange={this.changeAmount} />
                              </div>
                              {si_pro}
                              <div className="ptk-pro-ctn">
                                    <span className="ptk-pro-name">Variant</span>
                                    <input type="text" className="form-control" defaultValue={item.nameVariant} onChange={this.changeNameVariant} />
                              </div>
                              <button type="button" className="btn btn-success" onClick={this.changeValue}>Thay Đổi</button>
                              <button type="button" className="btn btn-warning" onClick={() => this.props.deleteItem(item, this.props.type)}>xóa</button>
                        </div>
                  </div> : ""
                  }
            </React.Fragment>
            );
      }
}

export default PhoiTonKhoItem;