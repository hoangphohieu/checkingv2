import React, { Component } from 'react';
import ChartQuantity from './ChartQuantity';
import ChartBaseCost from './ChartBaseCost';

import _ from 'lodash';

class AllChartsPartner extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-6 one-chart">
                        <ChartBaseCost styleChart="Sumbasecost" {...this.props} />

                    </div>
                    <div className="col-6 one-chart ">
                        <ChartQuantity styleChart="Sumlineitemquantity"  {...this.props} />

                    </div>
                </div>


            </React.Fragment>
        );
    }
}

export default AllChartsPartner;