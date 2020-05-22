import React, { Component } from 'react';
class ShowGLLM extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { items: {} }
    }
    changeItem = (param) => {
        this.setState({ items: param });
    }
    render() {
        console.log(this.state.items);
        
        let type = this.props.type;
        let items = this.props.items;
        items = items.filter(param => param.type === type).map((param, key) => <button
            type="button"
            onClick={() => this.changeItem(param)}
            class="btn btn-outline-primary ItemProperties"
            key={key}>{param.name}</button>);
        console.log(items);
        let properties = <div className="card items-ItemProperties-card" style={{ width: "18rem" }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{this.state.items.name}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        return (
            <div className="items-con-items ">
                <div className="col-12">
                    Glass
                    </div>
                <div className="col-12">
                    {items}
                </div>
                <div className=" ">
                    {properties}
                </div>
            </div>
        );
    }
}

export default ShowGLLM;