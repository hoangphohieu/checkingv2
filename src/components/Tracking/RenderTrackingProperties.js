import React, { Component } from 'react';

class RenderTrackingProperties extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = { show: false }
      }
      showProperties = () => {
            this.setState({ show: !this.state.show })
      }
      render() {

            let dataTracking = this.props.dataTracking;
            // console.log(dataTracking);


            return (
                  <React.Fragment>



                        {/* properties */}
                        <div className="row p-1 hover-pointer one-properties-tracking align-items-center"  onClick={this.showProperties}>
                              <div className="col-2 text-center">
                                    {dataTracking.tracking_number}

                              </div>
                              <div className="col-2 text-center">
                                    {dataTracking.order_id}
                              </div>
                              <div className="col-6 d-flex  Parcel-Status">
                                    <span className={"mr-1 border-" + dataTracking.status}>{dataTracking.status}</span>
                                    <span >{dataTracking.lastEvent}</span>
                              </div>
                              <div className="col-2 text-center">
                                    {dataTracking.itemTimeLength}

                              </div>
                        </div>
                        {/* properties */}

                        {/* more */}
                        {(this.state.show === true) ? <div className="row mb-1">
                              <div className="col-12">
                                    <h6 className="titletracking-properties">Other Information</h6>
                                    <p className="more-tracking-info">Courier:{dataTracking.carrier_code}</p>
                                    <p className="more-tracking-info">Goods Title:{dataTracking.title}</p>
                                    <p className="more-tracking-info">Customer Name:{dataTracking.customer_name}</p>
                                    <h6 className="titletracking-properties">Destination Country - {dataTracking.destination_country}:</h6>
                                    {(dataTracking.destination_info.trackinfo !== null) ? dataTracking.destination_info.trackinfo.map(param => <p className="more-tracking-info">{param.Date},{param.StatusDescription},{param.Details}</p>) : ""}
                                    <h6 className="titletracking-properties">Origin Country - {dataTracking.original_country}:</h6>
                                    {(dataTracking.origin_info.trackinfo !== null) ? dataTracking.origin_info.trackinfo.map(param => <p className="more-tracking-info">{param.Date},{param.StatusDescription},{param.Details}</p>) : ""}
                              </div>
                        </div> : ""}
                        {/* more */}

                  </React.Fragment>

            );
      }
}

export default RenderTrackingProperties;