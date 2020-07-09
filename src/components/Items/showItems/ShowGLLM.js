import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import Modalitem from "./ModalItem";
class ShowGLLM extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {


            showModal: false
        }
    }

    open = () => {
        window.open("~/Users/MSI/Downloads/sp181233.jpg")
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

        this.copyVanban(idDesign);
    }
    closeModal = () => {
        this.setState({ showModal: false })
    }
    render() {
        let type = this.props.type;
        // console.log( this.props.items);

        let items = this.props.items.filter(param => param.type === type);

        // console.log(items);

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
            className="btn btn-outline-primary ItemProperties"
            key={key}>{param.name}</button>);
        return (
            <div className="items-con-items ">
                <div>
                    <h3 className="GLLM-info text-left">{this.props.type} : {items.length} </h3>
                </div>
                <div className="col-12">
                    {items}
                </div>


            </div>
        );
    }
}

export default ShowGLLM;