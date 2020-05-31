import React, { Component } from 'react';

class ItemLoi extends Component {
    render() {
        let items = this.props.items;
        return (
            <div>
                {(items.length !== 0) ? <div className="ctn-itemthua">
                    <div className="name-itemthua">
                        Name(Order Name)
                    </div>
                    <div className="case-itemthua">
                        Phone Case
                    </div>
                </div> : ""}
                {items.map((param, key) => <div className="ctn-itemthua" key={key}>
                    <div className="name-itemthua">
                        {param.name}
                    </div>
                    <div className="case-itemthua">
                        {param.case}
                    </div>
                </div>)}
            </div>
        );
    }
}

export default ItemLoi;