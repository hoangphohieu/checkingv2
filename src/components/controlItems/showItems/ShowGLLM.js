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
        let items = this.props.items.filter(param => param.type === type);
        let data = JSON.parse(JSON.stringify(items));
        

        items = items.map((param, key) => <button
            type="button"
            onClick={() => this.clickItem(param, param.name)}
            className="btn btn-outline-primary ItemProperties"
            key={key}>{param.name}</button>);



        return (
            <div className="items-con-items ">



                <div>
                    {/* Button trigger modal */}
                    <div>{this.props.type} + {items.length} </div>
                    <button type="button" className="btn btn-primary" onClick={() => this.setState({ showModal: !this.state.showModal })}>
                        Launch static backdrop modal
                    </button>

                    {/* Modal */}
                    <Modalitem {...this.props} dataitem={data} showModal={this.state.showModal} closeModal={this.closeModal} />

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