import React, { Component } from 'react';
import ShowGLLM from "./ShowGLLM";
import _ from "lodash";
import Select from 'react-select';
class ShowItems extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            items: [],
            itemCard: {},
            changeCard: false
        }
    }

    componentDidUpdate() {
        this.CDU_checkRequest(); // kiểm tra và thực hiện hành động khi  request trả về
    }

    CDU_checkRequest() {

        if (this.props.ItemPayload.type === "GET_CHECKING_SUCSESS") { this.getCheckingSucsess() }
        else if (this.props.ItemPayload.type === "POST_ITEM_EXCEL_RFAILURE") { this.doingWhenPostItemFail() }



    }

    getCheckingSucsess = () => {
        this.setState({ items: this.props.ItemPayload.listItem });
        this.props.propsItemsToDefault();

    }
    setCard = (item) => {
        // console.log(_.toPairs(item));
        // item = _.toPairs(item);
        this.setState({
            itemCard: item,
            changeCard: false
        });

        for (let i = 0; i <= item.length - 1; i++) {
            if (this.refs[item[i][0]] !== undefined && this.refs[item[i][0]].value !== "") {
                this.refs[item[i][0]].value = item[i][1];
            }
        }
    }
    saveItem = () => {
        let item = _.toPairs(this.state.itemCard);
        let arrObj = this.state.itemCard;
        for (let i = 0; i <= item.length - 1; i++) {
            if (this.refs[item[i][0]] !== undefined && this.refs[item[i][0]].value !== "") {
                arrObj[item[i][0]] = this.refs[item[i][0]].value;
            }
        }
        this.props.patchItemCheckingProperties(arrObj);

    }

    setCountry = (country) => {
        this.setState({ itemCard: { ...this.state.itemCard, country: country } })
    }
    setPhoneCase = (phoneCase) => {
        this.setState({ itemCard: { ...this.state.itemCard, case: phoneCase } })

    }
    setPrintStatus = (status) => {
        this.setState({ itemCard: { ...this.state.itemCard, printStatus: status } })

    }
    render() {
        let country = <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.itemCard.country}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#" onClick={() => this.setCountry("VN")}>VN</a>
                <a className="dropdown-item" href="#" onClick={() => this.setCountry("US")}>US</a>
                <a className="dropdown-item" href="#" onClick={() => this.setCountry("WW")}>WW</a>
            </div>
        </div>
        let phoneCase = <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.itemCard.case}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {(JSON.parse(localStorage.PhonesAlltribute)).map((param, key) => <a className="dropdown-item" href="#" key={key} onClick={() => this.setPhoneCase(param.nameDefault)}>{param.nameDefault}</a>)}

            </div>
        </div>
        let printStatus = <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.itemCard.printStatus}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#" onClick={() => this.setPrintStatus("wait")}>wait</a>
                <a className="dropdown-item" href="#" onClick={() => this.setPrintStatus("printed")}>printed</a>
                <a className="dropdown-item" href="#" onClick={() => this.setPrintStatus("faild")}>faild</a>
            </div>
        </div>

        let properties = "";

        if (this.state.changeCard === false) {
            properties = _.toPairs(this.state.itemCard).filter(param => param[0] !== "datatype" & param[0] !== "id" & param[0] !== "month" & param[0] !== "year")
                .map((param, key) => <div key={key} >
                    <span >{param[0]}</span>
                        :
                    <span >{param[1]}</span>
                </div>)
        }
        else {
            properties = _.toPairs(this.state.itemCard).filter(param => param[0] !== "datatype" & param[0] !== "id" & param[0] !== "month" & param[0] !== "year" & param[0] !== "case" & param[0] !== "country" & param[0] !== "printStatus")
                .map((param, key) => <input
                    className="card-text"
                    type="text"
                    defaultValue={param[1]} key={key} ref={param[0]}
                />)
        }
        let card = "";
        let itemShow = _.toPairs(this.state.itemCard);
        if (JSON.stringify(this.state.itemCard) !== "{}") {
            card = <div className="card items-ItemProperties-card" style={{ width: "18rem" }}>

                <div className="card-body card-container">
                    <button type="button" className="btn btn-warning card-change" onClick={() => this.setState({ changeCard: !this.state.changeCard })}>Sửa</button>
                    <button type="button" className="btn btn-btn-info" onClick={this.saveItem}>Lưu</button>
                    {/* us-ww-vn */}
                    {(this.state.changeCard === true) ? country : ""}
                    {(this.state.changeCard === true) ? phoneCase : ""}
                    {(this.state.changeCard === true) ? printStatus : ""}

                    {properties}




                </div>
            </div>
        }


        return (
            <div>
                <div className="grid-items-item2">
                    <ShowGLLM type="glass" items={this.state.items} setCard={this.setCard} />

                    <ShowGLLM type="luminous" items={this.state.items} setCard={this.setCard} />

                    <ShowGLLM type="led" items={this.state.items} setCard={this.setCard} />

                    <ShowGLLM type="silicon" items={this.state.items} setCard={this.setCard} />
                </div>
                {card}
            </div>
        );
    }
}

export default ShowItems;