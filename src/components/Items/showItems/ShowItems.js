import React, { Component } from 'react';
import ShowGLLM from "./ShowGLLM";
import _ from "lodash";
class ShowItems extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

            itemCard: {},
            changeCard: false
        }
    }




    render() {


        // console.log(this.props.ItemsGET);
        

        return (
            <div>
                <div className="grid-items-item2">
                    <ShowGLLM type="glass" items={this.props.ItemsGET} />

                    <ShowGLLM type="luminous" items={this.props.ItemsGET} />

                    <ShowGLLM type="led"  items={this.props.ItemsGET}/>

                    <ShowGLLM type="silicon"  items={this.props.ItemsGET}/>
                </div>

            </div>
        );
    }
}

export default ShowItems;