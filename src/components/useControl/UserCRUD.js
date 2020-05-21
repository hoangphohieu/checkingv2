import React, { Component } from 'react';
import UserCRUDProperties from './UserCRUDProperties';
import PartnersPagination from './PartnersPagination';

import AddUser from './AddUser';
import _ from "lodash"
class UserCRUD extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            listUser: [],
            listPartner: [],
            listGetBaseCost: []
        }
    }

    componentWillMount() {


        if (localStorage.SumOrderHome === undefined) {
            localStorage.setItem("SumOrderHome", JSON.stringify([]));
        }

        localStorage.setItem("ListGetBaseCost", JSON.stringify([]));
        localStorage.setItem("ListBaseCostProperties", JSON.stringify([]));

        if (JSON.parse(localStorage.SumOrderHome).length === 0) { this.props.getSumItem("sumitem/?datatype=item") };
    }
    componentDidMount() {
        this.props.getListUser("?datatype=user"); // laydanh sach cac user


    }

    componentDidUpdate() {
        this.CDU_checkRequest();
    }
    CDU_checkRequest = () => {
        if (this.props.itemsPayload.type === "GET_LIST_USER_SUCSESS") { this.getListUserSucsess() }
        else if (this.props.itemsPayload.type === "CHANGE_USE_PROPERTIES_SUCSESS") { this.changeUserPropertiesSucsess() }
        else if (this.props.itemsPayload.type === "CREATE_USER_SUCSESS") { this.createUserSucsess() }
        else if (this.props.itemsPayload.type === "GET_SUM_ITEM_SUCSESS") { this.getSumItemSucsess() }
        else if (this.props.itemsPayload.type === "DELETE_USER_SUCSESS") { this.deleteUserSucsess() }
        else if (this.props.itemsPayload.type === "DELETE_USER_RFAILURE") { this.deleteUserFail() }
    }
    getSumItemSucsess = () => {


        if (JSON.parse(localStorage.SumOrderHome).length === 0) {
            localStorage.setItem("SumOrderHome", JSON.stringify(_.toPairs(this.props.itemsPayload.listItem)));
            this.props.setStateStoreToDefault();
        }
        else {


            let ListGetBaseCost = JSON.parse(localStorage.ListGetBaseCost);
            if (ListGetBaseCost.length > 0) {
                ListGetBaseCost.pop();
                localStorage.ListGetBaseCost = JSON.stringify(ListGetBaseCost);
                let ListBaseCostProperties = JSON.parse(localStorage.ListBaseCostProperties);
                ListBaseCostProperties = [this.props.itemsPayload.listItem, ...ListBaseCostProperties];
                localStorage.ListBaseCostProperties = JSON.stringify(ListBaseCostProperties);


                if (ListGetBaseCost.length !== 0)
                    this.props.getSumItem("sumitem/?datatype=item&partner=user" + ListGetBaseCost[ListGetBaseCost.length - 1]);
                else
                    this.props.setStateStoreToDefault();


            }

        }

    }
    deleteUserFail = () => {
        alert("kiểm tra lại đường truyền mạng!");
        this.props.setStateStoreToDefault();

    }
    deleteUserSucsess = () => {
        this.props.getListUser("?datatype=user"); // laydanh sach cac user
    }
    createUserSucsess = () => {
        this.props.getListUser("?datatype=user"); // laydanh sach cac user
    }
    createUserFail = () => {
        alert("Tài khoản đã tồn tại, hoặc kiểm tra lại đường truyền mạng!");
        this.props.setStateStoreToDefault();

    }
    changeUserPropertiesSucsess = () => {
        this.props.getListUser("?datatype=user"); // laydanh sach cac user
    }

    getListUserSucsess = () => {
        let listUser = this.props.itemsPayload.listItem;

        if (listUser.length > 1) {
            listUser.pop();
            listUser = listUser.filter(param => param.item_post.id !== "adminretc_000");
            let listPartner = _.chunk(listUser.map(param => param.item_post.partner.substr(4)), 6);

            this.setState({ listUser: listUser, listPartner: listPartner });
            this.props.setStateStoreToDefault();
        }


    }

    getBaseCostByList = (param) => {
        localStorage.setItem("ListGetBaseCost", JSON.stringify(param));
        this.props.getSumItem("sumitem/?datatype=item&partner=user" + param[param.length - 1]);
        this.setState({ listGetBaseCost: param });
    }
    sumAndDelete = (dataChart) => { // hàm tính những ngày bị trùng nhau, cộng lại là để lại 1 ngày duy nhất
        for (let i = 0; i <= dataChart.length - 2; i++) {
            if (dataChart[i].day === dataChart[i + 1].day) {
                dataChart[i + 1].basecost += dataChart[i].basecost;
                dataChart[i] = null;
            }
        }
        dataChart = dataChart.filter(param => { return param !== null }).map(param => { return { day: param.day, basecost: param.basecost } });
        dataChart = _.orderBy(dataChart, ['day'], ['desc']);
        return [...dataChart];
    }
    render() {
        let listUser = this.state.listUser;

        //  tính tổng số base cost
        let sumBaseCost = 0;
        if (JSON.parse(localStorage.SumOrderHome).length !== 0) {
            JSON.parse(localStorage.SumOrderHome).forEach(element => {
                element[1].forEach(element2 => {
                    sumBaseCost += element2.basecost;
                })
            });
        }

        // tính tổng đã thanh toán paid
        let paid = 0;
        if (listUser.length > 0) {
            listUser.forEach(param => {
                if (param.item_post.paid.length !== 0) {
                    param.item_post.paid.forEach(param2 => {
                        paid += parseInt(param2[1]);
                    })
                }
            })
        }
        // tính cái khác
        // tính tổng base cose
        let listGetBaseCost = this.state.listGetBaseCost.map((param, id) => {
            let user = listUser.filter(param2 => param2.item_post.partner.substr(4) === param)[0];
            let basecost = _.toPairs(JSON.parse(localStorage.ListBaseCostProperties)[id]);
            let sumBaseCost = 0;
            if (basecost.length !== 0) {
                basecost.forEach(param => {
                    param[1].forEach(param2 => {
                        sumBaseCost += param2.basecost;
                    })
                })
            }
            user.item_post["sumBaseCost"] = sumBaseCost;
            return user
        })

        // đưa danh sách 10 ngày gần nhất
        let listGetBaseCost2 = this.state.listGetBaseCost.map((param, id) => {
            let basecost = _.toPairs(JSON.parse(localStorage.ListBaseCostProperties)[id]);
            let arr = [];
            if (basecost.length !== 0) {
                basecost.forEach(param => {
                    for (let index = 0; index < 10; index++) {
                        arr.push(param[1].pop())
                    }
                    // param[1].length = 10;
                    // param[1] = param[1].filter(param2 => { return param2 !== undefined });
                    // arr = [...arr, ...param[1]];
                })
            }
            arr = arr.filter(param2 => { return param2 !== undefined });
            arr = this.sumAndDelete(arr);
            return arr
        })
        return (
            <div>
                <div className="row">
                    <div className="col-2 left-tracking-properties p-0">
                        <AddUser {...this.props} />
                        <div className="tracking-count mt-3 border-list" >List Partner</div>
                        <PartnersPagination partnersPaginations={this.state.listPartner} getBaseCostByList={this.getBaseCostByList} />




                    </div>
                    <div className="col-10">
                        <div className="row mt-2 justify-content-center">
                            <div className="col-10">
                                <div className="d-flex justify-content-around">
                                    <div className="user-sum-number">
                                        <h4 className="m-0">{sumBaseCost}</h4>
                                        <p>Base Cost</p>
                                    </div>
                                    <div className="user-sum-number">
                                        <h4 className="m-0">{paid}</h4>
                                        <p>Paid</p>
                                    </div>
                                    <div className={"user-sum-number" + ((sumBaseCost - paid <= 0) ? " btn btn-success" : "")}>
                                        <h4 className="m-0">{Math.abs(sumBaseCost - paid)}</h4>
                                        <p> In Debt</p>
                                    </div>
                                    <div className="user-sum-number">
                                        <h4 className="m-0">{_.flattenDeep(this.state.listPartner).length}</h4>
                                        <p>Partner</p>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-2 p-2 title-properties-tracking">
                                        Partner
                                    </div>
                                    <div className="col-2 p-2 title-properties-tracking">
                                        Base Cost
                                    </div>
                                    <div className="col-2 p-2 title-properties-tracking">
                                        Paid
                                    </div>
                                    <div className="col-2 p-2 title-properties-tracking">
                                        In Debt
                                    </div>
                                    <div className="col-2 p-2 title-properties-tracking">
                                        Status
                                    </div>
                                    <div className="col-2 p-2 title-properties-tracking">
                                        some thing !
                                    </div>
                                </div>

                                {(listGetBaseCost.length > 0) ? listGetBaseCost.map((param, id) => { return <UserCRUDProperties {...this.props} userProperties={param} listDayBaseCost={listGetBaseCost2[id]} key={id} /> }) : ""}
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        );
    }
}

export default UserCRUD;