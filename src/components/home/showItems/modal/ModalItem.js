import React, { Component } from 'react';
import { json2excel } from 'js2excel';
import GL_LM_LED from './GL_LM_LED';
import PhoiIn from './PhoiIn';
import SILICON from './SILICON';
class ModalItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            downClickExcel: false,
            downClickJson: false,


        }
    }

    render() {
        let data = this.props.dataitem.map(param => { return { ...param, date: new Date(Number(param.date)) } });


        if (this.state.downClickExcel === true) {

            try {
                let fileNameToSaveAs = `${this.props.type}-${new Date().getHours()}h-${new Date().getDate()}-${(new Date().getMonth() + 1)}`;


                json2excel({
                    data,
                    name: fileNameToSaveAs,
                    formateDate: 'yyyy/mm/dd'
                });
            } catch (e) {
                // console.error('export error');
            }
            this.setState({ downClickExcel: false })
        }


        return (
            <div className={(this.props.showModal === false) ? "d-none" : " d-modal"}>


                {/* modal */}
                <div className="modal-content">
                    <button type="button" className="btn btn-secondary bt-close-card" onClick={this.props.closeModal}>Close</button>

                    <div className="modal-body">
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-warning down-excel" onClick={() => this.setState({ downClickExcel: true })}>Download Excel</button>
                        </div>

                        {/* <h2 style={{ textAlign: 'center', marginTop: 50 }}>Tổng tất cả: {sumAmountAfter + "/" + sumAmountBefore}</h2> */}
                        {(this.props.type === "silicon") ? <SILICON   {...this.props} itemsLocal={data} /> : <GL_LM_LED {...this.props} itemsLocal={data} />}

                        <div className="row">
                            <div className="col-4">
                                <PhoiIn dataitem={this.props.dataitem} type={this.props.type} />
                            </div>
                            <div className="col-5">
                            </div>

                        </div>



                    </div>
                    <div className="modal-footer">

                    </div>
                </div>

            </div >
        );
    }
}

export default ModalItem;