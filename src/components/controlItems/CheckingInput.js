import React, { Component } from 'react';
import _ from "lodash";
class CheckingInput extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  valueInput: "",
            }
      }
      changeValueInput = (e) => {
            this.setState({ valueInput: e.target.value });
      }
      searchChecking = () => {

            this.props.searchChecking("?datatype=item&barcode=" + this.state.valueInput);
      }
      SearchItemByEnter = (e) => {
            if (e.key === "Enter") { this.searchChecking() }
      }
      render() {


            return (
                  <React.Fragment>
                        <div className="input-group ">
                              <input className="text" className="form-control"
                                    placeholder="barcode here"
                                    aria-label="Username"
                                    aria-describedby="basic-addon2"
                                    onChange={this.changeValueInput}
                                    onKeyDown={this.SearchItemByEnter}
                                    autoFocus />
                              <div className="input-group-prepend">
                                    <span className="input-group-text hover-pointer" id="basic-addon2" onClick={this.searchChecking}><i className="fa fa-search"></i></span>
                              </div>

                        </div>

                  </React.Fragment>
            );
      }
}

export default CheckingInput;