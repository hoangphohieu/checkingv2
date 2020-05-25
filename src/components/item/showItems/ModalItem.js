import React, { Component } from 'react';
import { json2excel } from 'js2excel';

class ModalItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            downClickExcel: false,
            downClickJson: false,
            
            
        }
    }

    saveTextAsFile = (param) => {
        let paramToText = JSON.stringify(param)
        var textToWrite = paramToText // file contents
        var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
        var fileNameToSaveAs = `day${param.day}_${param.mounth}.json`// tên file


        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        downloadLink.click();
        this.setState({ downClickJson: true })
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

        let strWrite = {
            data: data,
            day: 10,
            mounth: 12
        };
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
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="d-flex">
                            <button type="button" class="btn btn-secondary" onClick={() => this.setState({ downClickExcel: true })}>Excel</button>
                            <button type="button" class="btn btn-secondary" onClick={() => this.saveTextAsFile(strWrite)}>Json</button>
                        </div>

                        {/* <h2 style={{ textAlign: 'center', marginTop: 50 }}>Tổng tất cả: {sumAmountAfter + "/" + sumAmountBefore}</h2> */}
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
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.props.closeModal}>Close</button>
                        <button type="button" className="btn btn-primary">Understood</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default ModalItem;