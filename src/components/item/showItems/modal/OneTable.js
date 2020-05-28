import React, { Component } from 'react';
import copy from 'copy-to-clipboard';

class OneTable extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  psdDone: false
            }
      }
      psdDone = () => { this.setState({ psdDone: true }) }
      convertDate = (date) => {
            return (new Date(Number(date)).getDate()) + "-" + (new Date(Number(date)).getMonth() + 1)
      }
      copyVanban = (param) => {
            copy(param);
            this.tempAlert(param, 200);
      }
      tempAlert = (msg, duration) => {
            var el = document.createElement("div");
            el.setAttribute("style", "position:fixed;z-index:9999999;top:100px;right:100px;background-color:#80ced6;padding:10px;font-size:1.5rem;color:white");
            el.innerHTML = msg;
            setTimeout(function () {
                  el.parentNode.removeChild(el);
            }, duration);
            document.body.appendChild(el);
      }
      render() {
            let items = this.props.items;
            let _this = this;
            console.log(items);

            let danhSachItem = items.map((item, key) => <div key={key} className={"col-2  gll-ctn1 "}>
                  {(item.amount > 1) ? <p className="gll-amount">{item.amount}</p> : ""}
                  <p className={" gll-name" + ((item.amount > 1) ? " gll-name-more " : "")} onClick={() => this.copyVanban(item.name)}>{item.name}</p>
                  <p className=" gll-country">{_this.convertDate(item.date)} {_this.props.typeTable} </p>
                  <p className=" gll-date">{item.stt} {item.country}</p>
                  <p className="gll-sku" onClick={() => this.copyVanban(item.sku)}>{item.sku}</p>
                  <p className="gll-phoneCase">{item.case}</p>

            </div>)

            return (


                  <div className="container-fluid khoangcasch mt-5">
                        <div className="container-fluid one-chil-ctn2 " >
                              <div className="row border_khung">
                                    <div className="col-12 border_khung" >
                                          <h1 style={{ fontSize: "2rem" }}>  Ban {this.props.numberTable + 1} {this.props.typeTable} </h1>

                                    </div>
                                    <div className="col-12">
                                          <div className="row">
                                                {danhSachItem}
                                          </div>
                                    </div>

                              </div>
                        </div>

                  </div>
            );
      }
}

export default OneTable;