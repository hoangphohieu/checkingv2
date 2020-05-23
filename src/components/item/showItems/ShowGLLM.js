import React, { Component } from 'react';
import { json2excel } from 'js2excel';
import copy from 'copy-to-clipboard';
class ShowGLLM extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

            downClickExcel: false,
            downClickJson: false
        }
    }

    open = () => {
        window.open("~/Users/MSI/Downloads/sp181233.jpg")
    }

    saveTextAsFile = (param) => {
        let paramToText = JSON.stringify(param)
        var textToWrite = paramToText // file contents
        var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
        var fileNameToSaveAs = `day${param.day}_${param.mounth}.json`// tên file


        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        downloadLink.click();
        this.setState({ downClickJson: true })
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
    render() {


        let type = this.props.type;
        let items = this.props.items;
        let data = this.props.items;
        items = items.filter(param => param.type === type).map((param, key) => <button
            type="button"
            onClick={() => this.clickItem(param, param.name)}
            className="btn btn-outline-primary ItemProperties"
            key={key}>{param.name}</button>);


        let strWrite = {
            data: data,
            day: 10,
            mounth: 12
        };




        if (this.state.downClickExcel === true) {

            try {
                console.log(data);

                json2excel({
                    data,
                    name: 'Hieudz',
                    formateDate: 'yyyy/mm/dd'
                });
            } catch (e) {
                // console.error('export error');
            }
            this.setState({ downClickExcel: false })
        }



        return (
            <div className="items-con-items ">
                <div className="d-flex">
                    <div>{this.props.type} + {items.length} </div>
                    <button type="button" class="btn btn-secondary" onClick={() => this.setState({ downClickExcel: true })}>Excel</button>
                    <button type="button" class="btn btn-secondary" onClick={() => this.saveTextAsFile(strWrite)}>Json</button>
                </div>
                <div className="col-12">
                    {items}
                </div>


            </div>
        );
    }
}

export default ShowGLLM;