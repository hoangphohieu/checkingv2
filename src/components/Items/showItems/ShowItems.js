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