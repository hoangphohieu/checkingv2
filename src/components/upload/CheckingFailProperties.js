import React, { Component } from 'react';
import _ from 'lodash';
import { Modal, Button } from 'react-bootstrap';
class CheckingProperties extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  change: false,
                  delete: false,
            }
      }

      postItemsExcelFail = (param, id) => {
                  this.props.postItemsExcelFail(param, id);
      }
      saveChange = (param, id) => {
            this.setState({ change: false });
            let arrObj = {};
            for (let i = 0; i <= param.length - 1; i++) {
                  if (this.refs[param[i][0]] !== undefined && this.refs[param[i][0]].value !== "") {
                        arrObj[param[i][0]] = this.refs[param[i][0]].value;
                  }
            }
            this.props.changeItemsExcelFail(arrObj,id);
      }

      deleteItemChecking = (param, id) => {
            this.setState({ delete: false });
            let arrObj = {};
            for (let i = 0; i <= param.length - 1; i++) {
                  if (this.refs[param[i][0]] !== undefined && this.refs[param[i][0]].value !== "") {
                        arrObj[param[i][0]] = this.refs[param[i][0]].value;
                  }
            }
            this.props.deleteItemsExcelFail(id);

      }


      handleClose = () => { this.setState({ change: false }) };
      handleShow = () => { this.setState({ change: true }) };
      handleDeleteClose = () => { this.setState({ delete: false }) };
      handleDeleteShow = () => { this.setState({ delete: true }) };
      render() {
            const uuidv1 = require('uuid/v1');
            let id = uuidv1();

            let item = JSON.parse(this.props.proppertiesitem) ;
            if (item.day !== undefined) {
                  item.day = (new Date(item.day)).toLocaleDateString();
                  item.id = id;
            }

            let itemObj = JSON.parse(this.props.proppertiesitem);
            if (itemObj.day !== undefined) {
                  itemObj.id = id;
            }

            item = _.toPairs(item); // props.proppertiesitem là object => array

            return (

                  <React.Fragment>
                        <div className="row border-item-checking">
                              <div className="col-12">
                                    <button onClick={() => this.postItemsExcelFail(itemObj, this.props.sttItemsExcelFail)} type="button" className="btn btn-danger checking-right-state">
                                          Post to server !
                                    </button>
                                    {
                                          item.map((param, id) => {
                                                return (<p className="checking-item-altribute" key={id}><span className="checking-item-title">{param[0]}:</span><span>{[param[1]]}</span></p>)
                                          })
                                    }
                              </div>


                              {/* modal */}
                              <div className="state_itemChecking">
                                    <Button className="state_itemChecking_button" variant="primary" onClick={this.handleShow}>
                                          Thay đổi
                              </Button>
                                    <Button className="state_itemChecking_button" variant="danger" onClick={this.handleDeleteShow}>
                                          Xóa
                              </Button>
                              </div>

                              <Modal show={this.state.change} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                          <Modal.Title>Modal heading</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                          {
                                                item.map((param, id) => {
                                                      if (param[0] !== "id" && param[0] !== "printStatus")
                                                            return <p className="checking-item-altribute" key={id}>
                                                                  <span className="checking-item-title">{param[0]}:</span>
                                                                  <input type="text" className="form-control" placeholder="" ref={param[0]} defaultValue={param[1]} />
                                                            </p>
                                                      return 0;
                                                })
                                          }
                                    </Modal.Body>
                                    <Modal.Footer>
                                          <Button variant="secondary" onClick={this.handleClose}>
                                                Close
                                    </Button>
                                          <Button variant="primary" onClick={() => this.saveChange(item, this.props.sttItemsExcelFail)}>
                                                Save Changes
                                     </Button>
                                    </Modal.Footer>
                              </Modal>




                              {/* modal */}


                              <Modal show={this.state.delete} onHide={this.handleDeleteClose}>
                                    <Modal.Header closeButton>
                                          <Modal.Title>Ấn oke để xóa</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Footer>
                                          <Button variant="primary" onClick={() => this.deleteItemChecking(item, this.props.sttItemsExcelFail)}>
                                                OK
                                          </Button>
                                          <Button variant="secondary" onClick={this.handleDeleteClose}>
                                                Close
                                          </Button>
                                    </Modal.Footer>
                              </Modal>
                        </div>

                  </React.Fragment>
            );
      }
}

export default CheckingProperties;