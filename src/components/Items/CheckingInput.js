import React, { Component } from 'react';
import _ from "lodash";
class CheckingInput extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  valueInput: "",
                  inputType: "barcode"
            }
      }
      changeValueInput = (e) => {
            this.setState({ valueInput: e.target.value });
      }
      searchChecking = () => {
            if (this.state.inputType === "name") this.props.searchChecking("?datatype=item&name=" + _.replace(this.state.valueInput, '#', '%23'));
            else this.props.searchChecking("?datatype=item&barcode=" + this.state.valueInput);

            this.setState({ valueInput: "" })
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
                                    value={this.state.valueInput}
                                    autoFocus />
                              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.state.inputType}
                              </button>
                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#" onClick={() => this.setState({ inputType: "barcode" })}>barcode</a>
                                    <a className="dropdown-item" href="#" onClick={() => this.setState({ inputType: "name" })}>name</a>


                              </div>

                        </div>

                  </React.Fragment>
            );
      }
}

export default CheckingInput;