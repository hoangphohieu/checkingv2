import React, { Component } from 'react';
import { json2excel } from 'js2excel';
import GL_LM_LED from './GL_LM_LED';
class ModalItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            downClickExcel: false,
            downClickJson: false,


        }
    }

    render() {
        let data = this.props.dataitem;
        let amountAllPhoneCase = [];
        let phonecaseSheet = JSON.parse(localStorage.PhonesAlltribute).map(param => param.nameDefault);
        for (let i = 0; i < phonecaseSheet.length; i++) {
            let data2 = data.filter(param => param.case === phonecaseSheet[i]);
            if (data2.length !== 0)
                amountAllPhoneCase = [...amountAllPhoneCase, <tr key={i}>
                    <th scope="row">{amountAllPhoneCase.length + 1}</th>
                    <td className="cot_row">{phonecaseSheet[i]}</td>
                    <td className="cot_row">{data2.length}</td>
                </tr>];

        }

        if (this.state.downClickExcel === true) {

            try {
                console.log(data);

                json2excel({
                    data,
                    name: 'Hieudz',
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
                    <div className="modal-body">
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-warning down-excel" onClick={() => this.setState({ downClickExcel: true })}>Down Load Excel</button>
                        </div>

                        {/* <h2 style={{ textAlign: 'center', marginTop: 50 }}>Tổng tất cả: {sumAmountAfter + "/" + sumAmountBefore}</h2> */}
                        <GL_LM_LED {...this.props} itemsLocal={data} />
                        <div className="row">
                            <div className="col-5">
                                <table className="table table-striped table_amounts">
                                    <thead>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Tên</th>
                                            <th scope="col">Số lượng</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {amountAllPhoneCase}
                                    </tbody>
                                </table>
                            </div>
                        </div>



                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.props.closeModal}>Close</button>
                        <button type="button" className="btn btn-primary">Understood</button>
                    </div>
                </div>

            </div >
        );
    }
}

export default ModalItem;