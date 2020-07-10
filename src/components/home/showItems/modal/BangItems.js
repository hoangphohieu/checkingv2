import React, { Component } from 'react';
import copy from 'copy-to-clipboard';

import _ from 'lodash';
class Bangitems extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            psdDone: false
        }
    }
    psdDone = () => { this.setState({ psdDone: true }) }
    convertDate = (date) => {
        console.log(date);
        
        return (new Date(date).getDate()) + "-" + (new Date(date).getMonth() + 1)
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
        let items = this.props.Item24;
        let _this = this;

  

        let danhSachItem;
        if (items !== undefined) {
            console.log(items);
            
            danhSachItem = items.map((item, key1) =>
 
                <div className="col-12" key={key1}>
                    <div className="row dkmdkm">
                        {
                            item.map((item2, key2) => <div className={"gll-ctn1 item-silicon"} key={key2}>
                                {(item2.amount > 1) ? <p className="gll-amount">{item2.amount}</p> : ""}
                                <p className={" gll-name" + ((item2.amount > 1) ? " gll-name-more " : "")} onClick={() => this.copyVanban(item2.name)}>{item2.name}</p>
                                {(item2.name !== null) ? <p className=" gll-country">{_this.convertDate(item2.date)} {_this.props.typeTable} </p> : ""}
                                <p className=" gll-date">{item2.stt} {item2.country}</p>
                                <p className="gll-sku" onClick={() => this.copyVanban(item2.sku)}>{item2.sku}</p>
                                <p className="gll-phoneCase">{item2.case}</p>
                            </div>)
                        }
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="container-fluid khoangcasch mt-5">
                    <div className={"container-fluid "}>
                        <div className="row border_khung">
                            <div className="col-12 border_khung" >
                                <h1 style={{ fontSize: 35 }}>
                                    Ban {this.props.numberTable + 1} {this.props.typeTable}
                                    {(this.props.type === "z14") ? "     Z14" : "     Z15"}
                                </h1>
                            </div>
                            <div className="col-12">
                                <div className="row flex-column-reverse">
                                    {danhSachItem}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bangitems;