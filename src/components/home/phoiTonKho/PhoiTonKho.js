import React, { Component } from 'react';
import _ from "lodash";
import TablePTK from './TablePTK';

class PhoiTonKho extends Component {

      render() {
           

            return (
                  <div className={(this.props.ShowQLP === false) ? "d-none" : " d-modal"}>


                        {/* modal */}
                        <div className="modal-content">
                              <div className="modal-body">
                                    <div className="row">
                                          {/* gllm */}
                                          <TablePTK {...this.props} typePTK={"pc_gllm"} />
                                          {/* LED */}
                                          <TablePTK {...this.props} typePTK={"pc_led"} />


                                          {/* silicon */}
                                          <TablePTK {...this.props} typePTK={"pc_silicon"} />

                                    </div>
                              </div>
                        </div>
                        <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" onClick={this.props.closeModal}>Close</button>

                        </div>
                  </div>


            );
      }
}

export default PhoiTonKho;