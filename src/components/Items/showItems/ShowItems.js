import React, { Component } from 'react';
import ShowGLLM from "./ShowGLLM";
import _ from "lodash";
import Select from 'react-select';
class ShowItems extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

            itemCard: {},
            changeCard: false
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



    render() {


        

        return (
            <div>
                <div className="grid-items-item2">
                    <ShowGLLM type="glass" />

                    <ShowGLLM type="luminous" />

                    <ShowGLLM type="led" />

                    <ShowGLLM type="silicon" />
                </div>

            </div>
        );
    }
}

export default ShowItems;