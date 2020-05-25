import React, { Component } from 'react';
import CheckingInput from './CheckingInput';
import UtilitiesChecking from './UtilitiesChecking';
import Button from '@material-ui/core/Button';
import _ from "lodash";
import ShowItems from './showItems/ShowItems';
import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';
class Item extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = ({ selectedDay: undefined, })
      }

      searchChecking = (param) => {
            this.props.searchChecking(param);
      }
      handleDayClick = (day) => {
            this.setState({ selectedDay: day });
            let date = Date.parse(day) - 12 * 60 * 60 * 1000;

            this.searchChecking(`?datatype=item&date=${date}`)
      }

      render() {

            let items = [...this.props.ItemPayload.listItem];


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

                                                <button type="button" className="btn btn-warning" style={{ width: "100%" }}
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=wait")}>Wait
                                                </button>
                                                <button type="button" className="btn btn-danger" style={{ width: "100%" }}
                                                      onClick={() => this.searchChecking("?datatype=item&printStatus=failded")}>failded
                                                </button>
                                                
                                                <div>
                                                      <DayPicker
                                                            onDayClick={this.handleDayClick}
                                                            selectedDays={this.state.selectedDay}
                                                      />

                                                </div>

                                          </div>
                                          <ShowItems {...this.props} />

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