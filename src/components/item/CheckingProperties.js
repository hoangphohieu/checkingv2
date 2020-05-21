import React, { Component } from 'react';
import _ from 'lodash';
import { Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';
class CheckingProperties extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  change: false,
                  delete: false
            }
      }

      changePrintStatus = (item) => {
            console.log(String(Boolean(item.item_post.printStatus)));

            console.log(item.item_post.printStatus);

            item.item_post.printStatus = ((item.item_post.printStatus === "true") ? "false" : "true");
            console.log(item.item_post.printStatus);

            this.props.changePrintStatus({ item_post: item.item_post })
      }
      saveChange = (param) => {
            this.setState({ change: false });
            let item = _.toPairs(param.item_post);
            let arrObj = { id: param.item_post.id };
            for (let i = 0; i <= item.length - 1; i++) {
                  if (this.refs[item[i][0]] !== undefined && this.refs[item[i][0]].value !== "") {
                        arrObj[item[i][0]] = this.refs[item[i][0]].value;
                  }
            }
            console.log(arrObj);

            this.props.patchItemCheckingProperties({ item_post: arrObj });

      }
      deleteItemChecking = (item) => {
            this.handleDeleteClose();
            this.props.deleteItemChecking(item)
      }


      handleClose = () => { this.setState({ change: false }) };
      handleShow = () => { this.setState({ change: true }) };
      handleDeleteClose = () => { this.setState({ delete: false }) };
      handleDeleteShow = () => { this.setState({ delete: true }) };
      reFun = (item) => {
            const uuidv1 = require('uuid/v1');
            let idrd = uuidv1();
            item = item.item_post;
            item.id = idrd;
            item["printStatus"] = "false";
            item["refun"] = "true";
            item["resend"] = "false";
            item.day = Date.parse(new Date(new Date().toDateString()));
            item.basecost = String(Number(item.basecost) * (-1));
            this.props.postItem(item);
            // console.log(item);

      }
      reSend = (item) => {
            const uuidv1 = require('uuid/v1');
            let idrd = uuidv1();
            item = item.item_post;
            item.id = idrd;
            item["printStatus"] = "false";
            item["resend"] = "true";
            item["refun"] = "false";
            item.day = Date.parse(new Date(new Date().toDateString()));
            item.basecost = "0";
            this.props.postItem(item);
      }

      render() {
            let item = JSON.parse(this.props.proppertiesitem);
            let valueItem = JSON.parse(this.props.proppertiesitem).item_post;
            console.log(item);

            valueItem = _.toPairs(valueItem); // props.proppertiesitem là object => array
            let printStatus = valueItem.filter(param => { return param[0] === "printStatus" });
            if (printStatus.length === 0) { printStatus = [["printStatus", false]] }

            let idStatus = valueItem.id;

            return (
                  <React.Fragment>

                        <div className=" col-6 mb-2">
                              <div className="row border-card">
                                    <div className="col-4">
                                          <div className="p-1 pt-5 text-muted">
                                                <div className="row justify-content-center">
                                                      <div className="col-8">
                                                            <img className="card-img-top" src={"https://res.cloudinary.com/hieudz/image/upload/c_scale,q_80,w_500/v1573400959/demo%20tool/" + item.item_post.lineitemname.trim().split(" ").pop() + ".jpg"} alt="has no file" />
                                                      </div>
                                                      <div className="col-10">
                                                            <div className="state_itemChecking">
                                                                  <button onClick={() => this.changePrintStatus(item)} type="button"
                                                                        className={" mt-2 mb-2 btn btn-" + ((item.item_post.printStatus === "true") ? "primary" : "danger") + " checking-right-state"}>
                                                                        {(item.item_post.printStatus === "true") ? "Done !" : "Print ..."}
                                                                  </button>
                                                                  <Button className="state_itemChecking_button" variant="primary" onClick={this.handleShow}>
                                                                        Change
                                                      </Button>
                                                                  <Button className="state_itemChecking_button" variant="danger" onClick={this.handleDeleteShow}>
                                                                        Delele
                                                      </Button>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="col-8">
                                          <DropdownButton className="change-re" id="dropdown-basic-button" title="" drop="left">
                                                <Dropdown.Item onClick={() => this.reFun(item)} >ReFun</Dropdown.Item>
                                                <Dropdown.Item onClick={() => this.reSend(item)} >ReSend</Dropdown.Item>
                                          </DropdownButton>

                                          <div className="card-body">
                                                <h5 className="card-title">
                                                      {item.item_post.name}
                                                      {(item.item_post.refun === "true") ? <button type="button" className="ml-2 btn btn-primary show-position-re">Re Fun</button> : ""}
                                                      {(item.item_post.resend === "true") ? <button type="button" className="ml-2 btn btn-primary show-position-re">Re send</button> : ""}
                                                </h5>
                                                {
                                                      valueItem.map((param, id) => {
                                                            if ((param[0] !== "id" && param[0] !== "printStatus") && (param[0] !== "refun" && param[0] !== "resend"))
                                                                  return <p className="checking-item-altribute" key={id}><span className="checking-item-title">{param[0]}:</span><span>{[param[1]]}</span></p>
                                                      })
                                                }
                                          </div>
                                    </div>
                              </div>
                        </div>


                        <Modal show={this.state.change} onHide={this.handleClose}>
                              <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                    {
                                          valueItem.map((param, id) => {
                                                if (param[0] !== "id" && param[0] !== "printStatus")
                                                      return <p className="checking-item-altribute" key={id}>
                                                            <span className="checking-item-title">{param[0]}:</span>
                                                            <input type="text" className="form-control" placeholder="" ref={param[0]} defaultValue={param[1]} />
                                                      </p>

                                          })
                                    }
                              </Modal.Body>
                              <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                          Close
                                    </Button>
                                    <Button variant="primary" onClick={() => this.saveChange(item)}>
                                          Save Changes
                                     </Button>
                              </Modal.Footer>
                        </Modal>


                        <Modal show={this.state.delete} onHide={this.handleDeleteClose}>
                              <Modal.Header closeButton>
                                    <Modal.Title>Ấn oke để xóa</Modal.Title>
                              </Modal.Header>

                              <Modal.Footer>
                                    <Button variant="primary" onClick={() => this.deleteItemChecking(item)}>
                                          OK
                                          </Button>
                                    <Button variant="secondary" onClick={this.handleDeleteClose}>
                                          Close
                                          </Button>
                              </Modal.Footer>
                        </Modal>


                  </React.Fragment >
            );
      }
}

export default CheckingProperties;