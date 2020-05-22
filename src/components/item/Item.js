import React, { Component } from 'react';
import CheckingInput from './CheckingInput';
import UtilitiesChecking from './UtilitiesChecking';
import Button from '@material-ui/core/Button';
import _ from "lodash";
import ShowItems from './showItems/ShowItems';
class Item extends Component {
      searchChecking = (param) => {
            this.props.searchChecking(param);
      }
      render() {

            let items = [...this.props.ItemPayload.listItem];
            console.log(items);

            return (
                  <React.Fragment>
                        <div className="row justify-content-center nav-top-item">
                              <div className="col-4 d-flex align-items-center">
                                    <CheckingInput {...this.props} />

                              </div>
                        </div>

                        <div className="row">
                              <div className="col-12 checking-right mt-3">
                                    <div className="grid-container-item">
                                          <div className="grid-items-item1">
                                                <Button variant="contained" color="primary"
                                                      style={{ width: "100%" }}
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=wait")} >
                                                      chưa in
                                                </Button>
                                          </div>
                                         <ShowItems {...this.props}/>

                                    </div>
                              </div>
                        </div>


                        {/* <div className="row ">
                              <UtilitiesChecking {...this.props} newItems={newItems} /> // download excel
                        </div> */}

                  </React.Fragment>
            );
      }
}

export default Item;