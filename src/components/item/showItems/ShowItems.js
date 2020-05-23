import React, { Component } from 'react';
import ShowGLLM from "./ShowGLLM";
import _ from "lodash";
import Select from 'react-dropdown-select';
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
        item = _.toPairs(item);
        this.setState({ itemCard: item });

        for (let i = 0; i <= item.length - 1; i++) {
            if (this.refs[item[i][0]] !== undefined && this.refs[item[i][0]].value !== "") {
                this.refs[item[i][0]].value = item[i][1];
            }
        }
    }
    saveItem = () => {
        let item = this.state.itemCard;
        let arrObj = {};
        for (let i = 0; i <= item.length - 1; i++) {
            if (this.refs[item[i][0]] !== undefined && this.refs[item[i][0]].value !== "") {
                arrObj[item[i][0]] = this.refs[item[i][0]].value;
            }
        }
        this.props.patchItemCheckingProperties(arrObj);

    }
    render() {
        let card = "";
        if (JSON.stringify(this.state.itemCard) !== "{}") {
            card = <div className="card items-ItemProperties-card" style={{ width: "18rem" }}>

                <div className="card-body card-container">
                    <button type="button" class="btn btn-warning card-change" onClick={() => this.setState({ changeCard: !this.state.changeCard })}>Sửa</button>
                    <button type="button" class="btn btn-btn-info" onClick={this.saveItem}>Lưu</button>
                    
                    <Select
                        options={[{name:"vn",id:1},{name:"us",id:2},{name:"ww",id:3}]}
                        onChange={(values) => this.onChange(values)}
                    />
                    {this.state.itemCard.map((param, key) => <input className="card-text" type="text" defaultValue={param[1]} key={key} ref={param[0]} style={(this.state.changeCard === false) ? { pointerEvents: "none" } : {}} />)}

                </div>
            </div>
        }
        console.log(this.state.itemCard);

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