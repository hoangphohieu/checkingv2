import React, { Component } from 'react';
import _ from 'lodash';
import copy from 'copy-to-clipboard';

class CheckFileIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrNameFile: []
        }
    }

    checkFilesNone = (event) => {
        let arrNameFile = [];
        let input = event.target;
        for (var i = 0; i < input.files.length; i++) {
            let name = input.files[i].name;
            name = name.split(".");
            name = name[0].toLowerCase();
            arrNameFile.push(name);
        }
        this.setState({ arrNameFile: arrNameFile })


    }

    copyText = (param) => {
        copy(param)
    }
    render() {
        let allNameItems = this.props.dataNone;
        let itemNoPrint = this.props.itemNoPrint;

        allNameItems = allNameItems.map(item => { return item.toLowerCase().trim() })




        let itemsNone = _.difference(allNameItems, this.state.arrNameFile);
        itemsNone = [...new Set(itemsNone)]
        // console.log(itemNoPrint);



        let tableitemsnone = [];
        for (let j = 0; j < itemsNone.length; j++) {
            tableitemsnone.push(
                <tr key={j}>
                    <th scope="row">{j + 1}</th>
                    <td className="cot_row" onClick={() => this.copyText(itemsNone[j])} style={{ cursor: "pointer" }}>{itemsNone[j]}</td>

                </tr>)
        }




        return (
            <div className="mt-2">
                <input id='file-input' type='file' className=" btn btn-info" onChange={this.checkFilesNone} multiple style={{ display: "none" }} />
                <label htmlFor="file-input" className="input_exel btn btn-info">Kiểm Tra File Tif (Phòng in)</label>
                <div className="row justify-content-center">
                    <div className="col-5">
                        {
                            (tableitemsnone.length !== 0) ? (<table className="table table-striped table_amounts">
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Tên</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableitemsnone}
                                </tbody>
                            </table>) : ""

                        }
                    </div>
                    <div className="col-5">
                        {(itemNoPrint.length !== 0) ?
                            <table className="table table-striped table_amounts">
                                <thead>
                                    <tr>
                                        <th scope="col">stt APP</th>
                                        <th scope="col">Tên</th>
                                        <th scope="col">code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemNoPrint.map((param4, key) => <tr key={key}>
                                        <th scope="row">{param4.stt}</th>
                                        <td className="cot_row" onClick={() => this.copyText(param4.idClient)} style={{ cursor: "pointer" }}>{param4.idClient}</td>
                                        <td className="cot_row" onClick={() => this.copyText(param4.code)} style={{ cursor: "pointer" }}>{param4.code}</td>

                                    </tr>)}
                                </tbody>
                            </table> : ""

                        }
                    </div>
                </div>



            </div>

        );
    }
}

export default CheckFileIn;