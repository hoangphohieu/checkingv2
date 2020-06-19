import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import Modalitem from "./modal/ModalItem";
import _ from "lodash";
class ShowGLLM extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {


            showModal: false
        }
    }


    tempAlert = (msg, duration) => {

        var el = document.createElement("div");
        el.setAttribute("style", "position:fixed;z-index:1000;top:10px;left:46%;background-color:#80ced6;padding:10px;font-size:2rem;color:white");
        el.innerHTML = msg;
        setTimeout(function () {
            el.parentNode.removeChild(el);
        }, duration);
        document.body.appendChild(el);
    }

    copyVanban = (param) => {

        copy(param);
        this.tempAlert(param, 200);
    }
    clickItem = (param, idDesign) => {
        this.props.setCard(param);
        this.copyVanban(idDesign);
    }
    closeModal = () => {
        this.setState({ showModal: false });
        localStorage.PCSheetReturn = "[]"
    }
    clickMore = () => {
        this.setState({ showModal: !this.state.showModal });
        if (this.props.type === "glass" || this.props.type === "luminous") this.props.getPCReturn();

    }
    render() {
        let type = this.props.type;

        let items = this.props.items.filter(param => param.type === type);
        items = _.orderBy(items, ['note'], ['desc']);
        let data = JSON.parse(JSON.stringify(items));
        let itemsLength = 0;
        items.forEach(element => {
            itemsLength = itemsLength + Number(element.amount);
            return 0
        });
        let items2 = [];// lặp lại những item có amount >1
        for (let i = 0; i <= items.length - 1; i++) {
            if (items[i].amount > 1) {
                for (let j = 0; j < items[i].amount; j++) {
                    items2.push(items[i])
                }
            }
            else items2.push(items[i])
        }
        items = items2;
        items = items.map((param, key) => <button
            type="button"
            onClick={() => this.clickItem(param, param.name)}
            className={"btn btn-outline-primary ItemProperties" + ((param.note !== "") ? " bt-gllm-note" : "")}
            key={key}>{param.name}</button>);



        return (
            <div className="items-con-items ">



                <div className="ctn-gllm-info">
                    {/* Button trigger modal */}
                    <h3 className="GLLM-info " >{this.props.type}: {itemsLength} </h3>
                    <button type="button" className="btn btn-primary bt-thongtin" onClick={this.clickMore}>
                        Thông tin
                    </button>

                    {/* Modal */}
                    {(this.state.showModal) ? <Modalitem {...this.props} dataitem={data} showModal={this.state.showModal} closeModal={this.closeModal} /> : ""}


                    {/* end modal */}

                </div>
                <div className="col-12">
                    {items}
                </div>


            </div>
        );
    }
}

export default ShowGLLM;