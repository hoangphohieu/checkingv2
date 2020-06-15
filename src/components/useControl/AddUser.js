import React, { Component } from 'react';
import _ from 'lodash';
import { Modal, Button } from 'react-bootstrap';

import MultiSelect from "@khanacademy/react-multi-select";
class UserProperties extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  change: false,
                  delete: false,
                  partner: null,
                  router: "R",
                  name: ""

            }
      }

      saveChange = () => {
            this.setState({ change: false });
            let obj = {
                  id: "user" + this.state.name,
                  router: this.state.router,
                  partner: "user" + ((this.state.name !== "") ? this.state.name : "all"),
                  phone: this.refs["phone"].value.trim(),
                  name: "user" + this.state.name,
                  note: this.refs["note"].value,
                  pass: this.refs["pass"].value.trim(),
                  datatype: "user",
                  product: [],
                  code: this.refs["code"].value.trim(),
                  paid: []

            };



            if (this.state.router === null) {
                  alert("Không thành Công, hãy chọn chức năng !");
            }

            else if (this.state.name === "") {
                  alert("Không thành Công, hãy đặt tên đăng nhập !");
            }

            else if (this.refs["pass"].value === "") {
                  alert("Không thành Công, hãy đặt mật khẩu !");
            }
            else if (this.refs["code"].value === "") {
                  alert("Không thành Công, hãy đặt code !");
            }
            else {
                  obj.code = obj.code.split(",").filter(param => param !== "");
                  this.props.createUser(obj);
            }



      }
      deleteItemChecking = () => {
            this.handleDeleteClose();
      }
      setrouter = (e) => {
            this.setState({ router: e.target.value })
      }
      setpartner = (e) => {
            this.setState({ partner: e.target.value })

      }
      setname = (e) => {
            this.setState({ name: e.target.value.trim() })
      }
      handleClose = () => { this.setState({ change: false }) };
      handleShow = () => { this.setState({ change: true }) };
      handleDeleteClose = () => { this.setState({ delete: false }) };
      render() {


            return (
                  <React.Fragment>
                        <div className={"tracking-count select-product"} onClick={this.handleShow}>Add Partner</div>

                        <Modal show={this.state.change} onHide={this.handleClose}>
                              <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                    <p className="checking-item-altribute">
                                          <span className="checking-item-title">Tên:</span> <br />
                                          <input type="text" className="form-control" placeholder="" onChange={this.setname} placeholder="Tên đăng nhập" value={this.state.name} />
                                    </p>

                                    <p className="checking-item-altribute">
                                          <span className="checking-item-title">Mật khẩu:</span> <br />
                                          <input type="text" className="form-control" placeholder="" ref="pass" placeholder="Mật khẩu là..." defaultValue="" />
                                    </p>
                                    <p className="checking-item-altribute">
                                          <span className="checking-item-title">SDT:</span> <br />
                                          <input type="text" className="form-control" placeholder="" ref="phone" defaultValue="000" />
                                    </p>
                                    <p className="checking-item-altribute">
                                          <span className="checking-item-title">Chú thích:</span> <br />
                                          <input type="text" className="form-control" placeholder="Chú thích" ref="note" />
                                    </p>
                                    <p className="checking-item-altribute">
                                          <span className="checking-item-title">Code: (cách nhau bởi dấy phẩy ,)</span> <br />
                                          <input type="text" className="form-control" placeholder="Chú thích" ref="code" />
                                    </p>
                                    <p className="checking-item-altribute">
                                          <span className="checking-item-title">Chức Năng:</span>
                                          <select className="browser-default custom-select" onChange={this.setrouter}>
                                                <option selected value="R" className="d-none ">Chỉ đọc</option>
                                                <option value="CRUD">Đọc, thêm, sửa, xóa</option>
                                                <option value="R">Chỉ Đọc</option>
                                          </select>
                                    </p>
                                    <div className="checking-item-altribute">
                                          <span className="checking-item-title">Phân Quyền:</span>
                                          <select className="browser-default custom-select" onChange={this.setpartner}>
                                                <option selected value={this.state.name} className="d-none ">{this.state.name}</option>
                                                <option value="userall">all</option>
                                                <option value={this.state.name}>{this.state.name}</option>
                                          </select>
                                    </div>
                              </Modal.Body>
                              <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                          Close
                                    </Button>
                                    <Button variant="primary" onClick={this.saveChange}>
                                          Tạo tài khoản
                                     </Button>
                              </Modal.Footer>
                        </Modal>


                  </React.Fragment>
            );
      }
}

export default UserProperties;


