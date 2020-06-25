import React, { Component } from 'react';
import _ from "lodash";
class PhoiIn extends Component {
      render() {
            let data = this.props.dataitem;

            let itemSheet = [];
            if (this.props.type === "glass" || this.props.type === "luminous") {
                  itemSheet = JSON.parse(localStorage.pc_gllm).item_post;
                  itemSheet = _.toPairs(itemSheet).filter(param => param[0] !== "id" && param[0] !== 'type').map(param => param[1])
            }
            else if (this.props.type === "led") {
                  itemSheet = JSON.parse(localStorage.pc_led).item_post;
                  itemSheet = _.toPairs(itemSheet).filter(param => param[0] !== "id" && param[0] !== 'type').map(param => param[1])

            }
            else if (this.props.type === "silicon") {
                  itemSheet = JSON.parse(localStorage.pc_silicon).item_post;
                  itemSheet = _.toPairs(itemSheet).filter(param => param[0] !== "id" && param[0] !== 'type').map(param => param[1])
                  data = data.reduce((arr, item) => { return [...arr, { ...item, case: (item.case === "ixs" ? "ix" : item.case) }] }, []);

            }


            let amountAllPhoneCase = [];
            let phonecaseSheet = itemSheet.map(param => param.nameDefault);
            for (let i = 0; i < phonecaseSheet.length; i++) {
                  let data2 = data.filter(param => param.case === phonecaseSheet[i]);
                  if (data2.length !== 0) {
                        let am = 0;
                        data2.forEach(element => {
                              am = am + Number(element.amount)
                        });
                        amountAllPhoneCase = [...amountAllPhoneCase, <tr key={i}>
                              <th scope="row h-table">{amountAllPhoneCase.length + 1}</th>
                              <td className="cot_row h-table">{phonecaseSheet[i]}</td>
                              <td className="cot_row h-table">{am}</td>
                        </tr>];
                  }

            }
            return (
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
            );
      }
}

export default PhoiIn;