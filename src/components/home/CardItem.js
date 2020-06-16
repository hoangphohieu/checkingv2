import React, { Component } from 'react';
import _ from "lodash";

class CardItem extends Component {

    setCountry = (country) => {
        this.props.clickChangeCard({ itemCard: { ...this.props.itemCard, country: country } });
    }
    setPhoneCase = (phoneCase) => {
        this.props.clickChangeCard({ itemCard: { ...this.props.itemCard, case: phoneCase } });
    }
    setPrintStatus = (status) => {
        this.props.clickChangeCard({ itemCard: { ...this.props.itemCard, printStatus: status } });
    }
    setType = (status) => {
        this.props.clickChangeCard({ itemCard: { ...this.props.itemCard, type: status } });
    }
    saveItem = () => {
        let item = _.toPairs(this.props.itemCard);
        let arrObj = this.props.itemCard;
        for (let i = 0; i <= item.length - 1; i++) {
            if (this.refs[item[i][0]] !== undefined && this.refs[item[i][0]].value !== "") {
                arrObj[item[i][0]] = this.refs[item[i][0]].value;
            }
        }
        console.log(arrObj);
        let amuntCV = Number(arrObj.amount);
        if (isNaN(amuntCV)) {
            alert("vui long nhap so");
        }
        else {
            arrObj.amount = Number(arrObj.amount);
            console.log(arrObj);

            this.props.patchItemCheckingProperties({ item_post: arrObj });

        }


    }
    deleteItem = () => {
        let cf = window.confirm("nhấn oke để xóa.");
        if (cf === true)
            // console.log(this.props.itemCard);

            this.props.deleteItemChecking({ item_post: this.props.itemCard });
    }
    render() {
        // console.log(this.props.itemCard);
        let printStt = "";
        switch (this.props.itemCard.printStatus) {
            case "wait":
                printStt = "Chưa in"
                break;
            case "printed":
                printStt = "Đã in"
                break;
            case "failded":
                printStt = "Hỏng"
                break;
            case "done":
                printStt = "Đã xong!"
                break;
            case "return":
                printStt = "Hàng hoàn"
                break;
            default:
                break;
        }
        let pcname = [];
        if (localStorage.pc_gllm !== "[]") {

            pcname = _.toPairs(JSON.parse(localStorage.pc_gllm).item_post).filter(param => param[0] !== "id" && param[0] !== "type");
        }
        // console.log(_.toPairs(JSON.parse(localStorage.pc_gllm).item_post));


        let country = <div className="dropdown">
            <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.props.itemCard.country}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#" onClick={() => this.setCountry("VN")}>VN</a>
                <a className="dropdown-item" href="#" onClick={() => this.setCountry("US")}>US</a>
                <a className="dropdown-item" href="#" onClick={() => this.setCountry("WW")}>WW</a>
            </div>
        </div>
        let phoneCase = <div className="dropdown">
            <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.props.itemCard.case}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {pcname.map((param, key) => <a className="dropdown-item" href="#" key={key} onClick={() => this.setPhoneCase(param[1].nameDefault)}>{param[1].nameDefault}</a>)}

            </div>
        </div>
        let printStatus = <div className="dropdown">
            <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {printStt}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#" onClick={() => this.setPrintStatus("wait")}>Chưa in</a>
                <a className="dropdown-item" href="#" onClick={() => this.setPrintStatus("printed")}>Đã in</a>
                <a className="dropdown-item" href="#" onClick={() => this.setPrintStatus("failded")}>Hỏng</a>
                <a className="dropdown-item" href="#" onClick={() => this.setPrintStatus("done")}>Đã xong!</a>
                <a className="dropdown-item" href="#" onClick={() => this.setPrintStatus("return")}>Hàng hoàn</a>

            </div>
        </div>
        let type = <div className="dropdown">
            <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.props.itemCard.type}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#" onClick={() => this.setType("glass")}>glass</a>
                <a className="dropdown-item" href="#" onClick={() => this.setType("luminous")}>luminous</a>
                <a className="dropdown-item" href="#" onClick={() => this.setType("silicon")}>silicon</a>
                <a className="dropdown-item" href="#" onClick={() => this.setType("led")}>led</a>
            </div>
        </div>
        let properties = "";

        if (this.props.changeCard === false) {
            properties = _.toPairs(this.props.itemCard).filter(param => param[0] !== "datatype" & param[0] !== "id" & param[0] !== "month" & param[0] !== "year")
                .map((param, key) => <div key={key} className="ct-card-pro" >
                    <span className="tt-card-pro">{param[0]}</span>
                        :
                    <span >{(param[0] === "date") ? (new Date(Number(param[1])).toDateString()) : param[1]}</span>
                </div>)
        }
        else {
            properties = _.toPairs(this.props.itemCard).filter(param => param[0] !== "datatype" & param[0] !== "id" & param[0] !== "month" & param[0] !== "year" & param[0] !== "case" & param[0] !== "date" & param[0] !== "country" & param[0] !== "printStatus" & param[0] !== "type")
                .map((param, key) => <div key={key} className="ctn-card-pro">
                    <div className="card-title-pro">{param[0]}: </div>
                    <input
                        className="card-text card-pro"
                        type="text"
                        defaultValue={param[1]} ref={param[0]}
                    />
                </div>)



        }
        let card = "";
        let itemShow = _.toPairs(this.props.itemCard);
        let proDropdown = "";
        if (this.props.changeCard === true) {
            proDropdown = <><div className="ctn-card-pro"><div className="card-title-pro">country: </div>{country}</div>
                <div className="ctn-card-pro"><div className="card-title-pro">phoneCase: </div>{phoneCase}</div>
                <div className="ctn-card-pro"><div className="card-title-pro">printStatus: </div>{printStatus}</div>
                <div className="ctn-card-pro"><div className="card-title-pro">type: </div>{type}</div></>
        }
        if (this.props.showCard === true) {
            card = <div className="card items-ItemProperties-card">

                <div className="card-body card-container">
                    <button type="button" className="btn btn-warning card-change mr-1"
                        onClick={() => this.props.clickChangeCard({ changeCard: !this.props.changeCard })}>Sửa</button>
                    <button type="button" className="btn btn-danger mr-1" onClick={this.deleteItem}>Xóa</button>

                    <button type="button" className="btn btn-info mr-1" onClick={this.saveItem}>Lưu</button>
                    <div className="close-card" onClick={this.props.closeCard}>X</div>
                    {proDropdown}
                    {properties}




                </div>
            </div >
        }

        return (
            <React.Fragment>
                {card}
            </React.Fragment>
        );
    }
}

export default CardItem;