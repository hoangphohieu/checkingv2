import React, { Component } from 'react';
import _ from 'lodash';

class Exceltable extends Component {
    render() {
        let datalog = JSON.parse(localStorage.ItemsExcel);
        datalog = datalog.map(param => {
            return {
                name: param.name,
                country: param.country,
                amount: param.amount,
                sku: param.sku,
                case: param.case,
                type: param.type,
                date: new Date(param.date).toDateString(),
            }
        })
        console.log(datalog);

        let titleDatalog = undefined;
        // console.log(datalog);

        if (datalog !== null) {

            datalog = datalog.map(param => {
                return _.toPairs(param)
            });
            titleDatalog = datalog[0];
        }


        return (
            <React.Fragment>
                <table className="table table-striped">
                    <thead>
                        <tr>{(titleDatalog !== undefined) ? (titleDatalog.map((param, id) => <th scope="col" key={id}>{param[0]}</th>)) : ""}</tr>
                    </thead>
                    <tbody>{(datalog !== null) ?
                        datalog.map((param, id2) => {
                            let arrItem = [];
                            for (let j = 0; j <= param.length - 1; j++) {
                                arrItem.push(<td key={j + 1}>{param[j][1]}</td>)
                            }
                            return <tr key={id2}>{arrItem}</tr>
                        }
                        )
                        : ""
                    }</tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default Exceltable;