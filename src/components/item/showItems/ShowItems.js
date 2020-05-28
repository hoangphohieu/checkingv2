import React, { Component } from 'react';
import ShowGLLM from "./ShowGLLM";
import _ from "lodash";
import Select from 'react-select';
import CardItem from '../CardItem';
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
    componentDidMount() {
        localStorage.PCSheetChild = JSON.stringify([]);
        localStorage.PCSheetReturn = JSON.stringify([]);
    }
    CDU_checkRequest() {

        if (this.props.ItemPayload.type === "GET_CHECKING_SUCSESS") { this.getCheckingSucsess() }
        else if (this.props.ItemPayload.type === "ITEMS_GET_SHEET_PC_SUCSESS") { this.getSheetPCDone() }
        else if (this.props.ItemPayload.type === "ITEMS_GET_PC_RETURN_SUCSESS") { this.getSheetPCReturnDone() }
        else if (this.props.ItemPayload.type === "ITEMS_GET_SHEET_PC_RFAILURE" || this.props.ItemPayload.type === "ITEMS_GET_PC_RETURN_RFAILURE") { this.getSheetPCFail() }
        else if (this.props.ItemPayload.type === "GET_CHECKING_RFAILURE") { this.getCheckingFail() }



    }

    getCheckingSucsess = () => {
        this.setState({ items: this.props.ItemPayload.listItem });
        this.props.propsItemsToDefault();

    }
    getSheetPCFail = () => {
        alert("Kiem tra duong truyen mang");
        window.location = '/Item';
    }
    getSheetPCDone = () => {
        localStorage.PCSheetChild = JSON.stringify(this.props.ItemPayload.listItem);
        this.props.propsItemsToDefault();
    }
    getSheetPCReturnDone = () => {
        localStorage.PCSheetReturn = JSON.stringify(this.props.ItemPayload.listItem);
        this.props.propsItemsToDefault();
    }
    getCheckingFail = () => {
        alert("kiem tra duong truyen mang");
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
    clickChangeCard = (param) => {
        this.setState(param);
        
        
    }

    render() {



        return (
            <div>
                <div className="grid-items-item2">
                    <ShowGLLM type="glass" items={this.state.items} setCard={this.setCard} {...this.props} />

                    <ShowGLLM type="luminous" items={this.state.items} setCard={this.setCard} {...this.props} />

                    <ShowGLLM type="led" items={this.state.items} setCard={this.setCard} {...this.props} />

                    <ShowGLLM type="silicon" items={this.state.items} setCard={this.setCard}  {...this.props} />
                </div>
                <CardItem {...this.props} itemCard={this.state.itemCard} changeCard={this.state.changeCard} clickChangeCard={this.clickChangeCard} />
            </div>
        );
    }
}

export default ShowItems;