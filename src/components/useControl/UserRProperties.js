import React, { Component } from 'react';
import _ from 'lodash';
import { Modal, Button } from 'react-bootstrap';

class UserProperties extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  change: false,
                  delete: false,
                  addPaid: false,
                  partner: this.props.userProperties.item_post.partner,
                  router: this.props.userProperties.item_post.router,
                  show: false

            }
      }

      saveChange = (id) => {
            let item = this.props.userProperties.item_post;


            this.setState({ change: false });
            let obj = {
                  id: id,
                  router: this.state.router,
                  partner: this.state.partner,
                  phone: this.refs["phone"].value,
                  note: this.refs["note"].value,
                  code: this.refs["code"].value,
                  pass: this.refs["pass"].value,
                  paid: item.paid


            };

            if (this.state.router === null) {
                  alert("Không thành Công, hãy chọn chức năng !");
            }
            else if (this.state.partner === null) {
                  alert("Không thành Công, hãy chọn quyền !");

            }

            else {
                  obj.code = obj.code.split(",").filter(param => param !== "");
                  obj = { ...this.props.userProperties, item_post: obj };
                  this.props.changeUserProperties(obj);
            }



      }
      AddPaid = () => {
            let item = this.props.userProperties.item_post;
            this.setState({ addPaid: false });
            let obj = {
                  ...item,
                  paid: item.paid
            };


            if (this.refs["paid"].value !== "0") {
                  obj.paid = [[Date.parse(new Date().toDateString()), this.refs["paid"].value], ...obj.paid];
            }
            obj = { ...this.props.userProperties, item_post: obj };
            this.props.changeUserProperties(obj);


      }

      setrouter = (e) => {
            this.setState({ router: e.target.value });
      }
      setPartner = (e) => {
            this.setState({ partner: e.target.value });
      }
      handleClose = () => { this.setState({ change: false }) };
      handleShow = () => { this.setState({ change: true }) };
      handleCloseAddPaid = () => { this.setState({ addPaid: false }) };
      handleAddPaid = () => { this.setState({ addPaid: true }) };
      handleDeleteClose = () => { this.setState({ delete: false }) };
      handleDeleteShow = () => { this.setState({ delete: true }) };
      showProperties = () => {
            this.setState({ show: !this.state.show })
      }
      render() {
            let item = this.props.userProperties.item_post;
            let paid = 0;
            if (item.paid.length !== 0) item.paid.forEach(param => {
                  paid += parseInt(param[1]);
            })


            return (
                  <React.Fragment>


                        {/* more */}
                   <div className="row mb-1 justify-content-around">
                                    {/*  danh sách paid theo ngày */}
                                    <div className="col-5 ">
                                          <p className="checking-item-altribute"><span className="checking-item-title">Has Paid</span></p>
                                          <table className="table table-striped">
                                                <thead>
                                                      <tr>
                                                            <th scope="col">Stt</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">$$$</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {
                                                            (item.paid.length !== 0) ?
                                                                  item.paid.map((param, id) => <tr key={id} >
                                                                        <th scope="row">{id + 1}</th>
                                                                        <td>{new Date(param[0]).toDateString()}</td>
                                                                        <td>{param[1]}</td>
                                                                  </tr>)
                                                                  : ""
                                                      }


                                                </tbody>
                                          </table>
                                    </div>

                                    {/*  danh sách base cost theo ngày */}
                                    <div className="col-5 ">
                                          <p className="checking-item-altribute"><span className="checking-item-title">Base Cost</span></p>
                                          <table className="table table-striped">
                                                <thead>
                                                      <tr>
                                                            <th scope="col">Stt</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Base Cost</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {
                                                            (this.props.listDayBaseCost.length !== 0) ?
                                                                  this.props.listDayBaseCost.map((param, id) => <tr key={id} >
                                                                        <th scope="row">{id + 1}</th>
                                                                        <td>{new Date(Number(param.day)).toDateString()}</td>
                                                                        <td>{param.basecost}</td>
                                                                  </tr>)
                                                                  : ""
                                                      }


                                                </tbody>
                                          </table>
                                    </div>


                                    {/* modal */}
                                    <Modal show={this.state.addPaid} onHide={this.handleCloseAddPaid}>
                                          <Modal.Header closeButton>
                                                <Modal.Title>Add Paid</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                                <p className="checking-item-altribute">
                                                      <span className="checking-item-title">Date:</span>{new Date().toDateString()} <br />
                                                      <input type="text" className="form-control" placeholder="" ref="paid" defaultValue={0} />
                                                </p>
                                          </Modal.Body>
                                          <Modal.Footer>
                                                <Button variant="secondary" onClick={this.handleCloseAddPaid}>
                                                      Close
                                    </Button>
                                                <Button variant="primary" onClick={() => this.AddPaid(item.id)}>
                                                      Add Paid
                                     </Button>
                                          </Modal.Footer>
                                    </Modal>



                                    <Modal show={this.state.change} onHide={this.handleClose}>
                                          <Modal.Header closeButton>
                                                <Modal.Title>Change User Properties</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>


                                                <p className="checking-item-altribute">
                                                      <span className="checking-item-title">Pass Word:</span> <br />
                                                      <input type="text" className="form-control" placeholder="" ref="pass" defaultValue={item.pass} />
                                                </p>

                                                <p className="checking-item-altribute">
                                                      <span className="checking-item-title">Phone Number:</span> <br />
                                                      <input type="text" className="form-control" placeholder="" ref="phone" defaultValue={item.phone} />
                                                </p>
                                                <p className="checking-item-altribute">
                                                      <span className="checking-item-title">Note:</span> <br />
                                                      <input type="text" className="form-control" placeholder="" ref="note" defaultValue={item.note} />
                                                </p>
                                                <p className="checking-item-altribute">
                                                      <span className="checking-item-title">Code:</span> <br />
                                                      <input type="text" className="form-control" placeholder="" ref="code" defaultValue={item.code.join(",")} />
                                                </p>

                                                <p className="checking-item-altribute">
                                                      <span className="checking-item-title">Router:</span>
                                                      <select className="browser-default custom-select" onChange={this.setrouter}>
                                                            <option selected value={item.router} className="d-none ">{(item.router === "R") ? "Chỉ Đọc" : "Đọc, thêm, sửa,xóa"}</option>
                                                            <option value="CRUD">Creat, Read, Update, Delete</option>
                                                            <option value="R">Only Read</option>
                                                      </select>
                                                </p>
                                                <div className="checking-item-altribute">
                                                      <span className="checking-item-title">Set Partner:</span>
                                                      <select className="browser-default custom-select" onChange={this.setPartner}>
                                                            <option selected value={item.partner} className="d-none ">{item.partner.substr(4)}</option>
                                                            <option value="userall">all</option>
                                                            <option value={item.name}>{item.name.substr(4)}</option>
                                                      </select>

                                                </div>


                                          </Modal.Body>
                                          <Modal.Footer>
                                                <Button variant="secondary" onClick={this.handleClose}>
                                                      Close
                                    </Button>
                                                <Button variant="primary" onClick={() => this.saveChange(item.id)}>
                                                      Save Changes
                                     </Button>
                                          </Modal.Footer>
                                    </Modal>




                                    {/* modal */}


                                    <Modal show={this.state.delete} onHide={this.handleDeleteClose}>
                                          <Modal.Header closeButton>
                                                <Modal.Title>Delete User</Modal.Title>
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
                              </div>
                        {/* more */}




                  </React.Fragment >
            );
      }
}

export default UserProperties;


