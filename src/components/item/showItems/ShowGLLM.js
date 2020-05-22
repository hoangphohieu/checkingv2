import React, { Component } from 'react';
import { json2excel } from 'js2excel';

class ShowGLLM extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            items: {},
            downClick: false
        }
    }
    changeItem = (param) => {
        this.setState({ items: param });
    }
    open = () => {
        window.open("~/Users/MSI/Downloads/sp181233.jpg")
    }
    render() {
        console.log(this.state.items);

        let type = this.props.type;
        let items = this.props.items;
        let data=this.props.items;
        items = items.filter(param => param.type === type).map((param, key) => <button
            type="button"
            onClick={() => this.changeItem(param)}
            className="btn btn-outline-primary ItemProperties"
            key={key}>{param.name}</button>);




        if (this.state.downClick === true ) {

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
            this.setState({ downClick: false })
        }


        let properties = <div className="card items-ItemProperties-card" style={{ width: "18rem", "z-index": JSON.stringify(Date.parse(new Date())) }}>

            <div className="card-body">
                <h5 className="card-title">{this.state.items.name}</h5>
                <p className="card-text">{this.state.items.amount} + {this.state.items.country}</p>
                <p className="card-text">{this.state.items.sku}</p>
                <p className="card-text">{this.state.items.case}</p>

            </div>
        </div>
        return (
            <div className="items-con-items ">
                <div className="d-flex">
                    <div>{this.props.type}</div>
                    <button type="button" class="btn btn-secondary" onClick={()=>this.setState({downClick:true})}>Excel</button>
                </div>
                <div className="col-12">
                    {items}
                </div>
                <div className=" ">
                    {(JSON.stringify(this.state.items) !== "{}") ? properties : ""}
                </div>
            </div>
        );
    }
}

export default ShowGLLM;