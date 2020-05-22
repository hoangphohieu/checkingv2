import React, { Component } from 'react';
import ShowGLLM from "./ShowGLLM";
class ShowItems extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            items: []
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

    render() {
        console.log(this.state.items);


        return (
            <div className="grid-items-item2">
                <ShowGLLM  type="glass" items={this.state.items}/>
                <div className="items-con-items">
                    <h2>Luminous</h2>

                </div>
                <div className="items-con-items">
                    <h2>Led</h2>

                </div>
                <div className="items-con-items">
                    <h2>Silicon</h2>

                </div>
            </div>
        );
    }
}

export default ShowItems;