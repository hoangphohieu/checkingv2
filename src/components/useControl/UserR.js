import React, { Component } from 'react';
import UserRProperties from './UserRProperties';
import PartnersPagination from './PartnersPagination';
import _ from "lodash"
class UserCRUD extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            listUser: [],
            listPartner: [],
            listGetBaseCost: [],
            activePage: 0
        }
    }

    componentWillMount() {




        localStorage.setItem("ListGetBaseCost", JSON.stringify([]));
        localStorage.setItem("ListBaseCostProperties", JSON.stringify([]));

        if (JSON.parse(localStorage.SumOrderHome).length === 0) { this.props.getSumItem("sumitem/?datatype=item&partner=" + JSON.parse(localStorage.UserProperties)[2]) };
    }
    componentDidMount() {
        this.props.getListUser("?datatype=user&name=" + JSON.parse(localStorage.UserProperties)[2]); // laydanh sach cac user


    }

    componentDidUpdate() {
        this.CDU_checkRequest();

        if (JSON.parse(localStorage.SumOrderHome).length !== 0 && this.state.activePage === 0) {
            if (this.state.listPartner.length !== 0) {
                this.getBaseCostByList(this.state.listPartner[0]);
                this.setState({ activePage: 1 })
            }
        }
        console.log(this.props.itemsPayload);

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
            }

        }
        this.props.setStateStoreToDefault();

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

        console.log(listUser);


        // đưa danh sách 10 ngày gần nhất

        let listGetBaseCost2 = [];

        if (JSON.parse(localStorage.ListBaseCostProperties).length !== 0) {
            listGetBaseCost2 = _.toPairs(JSON.parse(localStorage.ListBaseCostProperties)[0]);
            let arr = [];
            if (listGetBaseCost2.length !== 0) {
                listGetBaseCost2.forEach(param => {
                    for (let index = 0; index < 30; index++) {
                        arr.push(param[1].pop())
                    }
                })
            }
            arr = arr.filter(param2 => { return param2 !== undefined });
            listGetBaseCost2 = this.sumAndDelete(arr);
        }
        return (
            <div>
                <div className="row">

                    {(listUser.length !== 0) ? <div className="col-2 left-tracking-properties p-0">
                        <div className="tracking-count mt-3 border-list" >Partner Properties</div>
                        <p className="tracking-count"><span className="checking-item-title">User:</span><span>{[...listUser][0].item_post.name.substr(4)}</span></p>
                        <p className="tracking-count"><span className="checking-item-title">Pass Word:</span><span>{[...listUser][0].item_post.pass}</span></p>
                        <p className="tracking-count"><span className="checking-item-title">Product:</span><span>{[...listUser][0].item_post.product.join(",")}</span></p>
                        <p className="tracking-count"><span className="checking-item-title">Code:</span><span>{[...listUser][0].item_post.code.join(",")}</span></p>
                        <p className="tracking-count"><span className="checking-item-title">Router:</span><span>{([...listUser][0].item_post.router === "R") ? "Đọc" : "Đọc, thêm, sửa, xóa"}</span></p>
                        <p className="tracking-count"><span className="checking-item-title">Partner:</span><span>{[...listUser][0].item_post.partner.substr(4)}</span></p>
                        <p className="tracking-count"><span className="checking-item-title">Phone Number:</span><span>{[...listUser][0].item_post.phone}</span></p>
                        <p className="tracking-count"><span className="checking-item-title">Note:</span><span>{[...listUser][0].item_post.note}</span></p>
                    </div> : ""}

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
                                </div>
                            </div>
                        </div>



                        <div className="row mt-3 justify-content-center">
                            <div className="col-10">


                                {(listUser.length > 0) ? <UserRProperties {...this.props} userProperties={listUser[0]} listDayBaseCost={listGetBaseCost2} /> : ""}
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        );
    }
}

export default UserCRUD;