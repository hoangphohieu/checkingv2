import React, { Component } from 'react';
import AllChartsPartner from './AllChartsPartner';
import { DatePicker, AppProvider, Button, ActionList, Popover } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import _ from "lodash";
class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            popoverActive: false,
            dataChart: [],
            selectProduct: "all",
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            selectedDates: {
                start: new Date(Date.parse(new Date()) - new Date().getDay() * 24 * 60 * 60 * 1000),
                end: new Date()
            }
        }
    }
    componentWillMount() {
       
        let user = JSON.parse(localStorage.UserProperties)[1];
        user = user.substr(4);
        if (user === "all") { this.props.getSumItem("sumitem/?datatype=item") }
        else { this.props.getSumItem("sumitem/?datatype=item&partner=user" + user) }

    }
    togglePopoverActive = () => {
        this.setState({ popoverActive: !this.state.popoverActive })
    }
    handleMonthChange = (month, year) => { this.setState({ month: month, year: year }) };

    setSelectedDates = (param) => {
        this.setState({ selectedDates: param });
        let user = JSON.parse(localStorage.UserProperties)[1];
        user = user.substr(4);
    }

    componentDidUpdate() {
        this.CDU_checkRequest();
        console.log(this.props.items.type);

    }
    CDU_checkRequest = () => {
        if (this.props.items.type === "GET_SUM_ITEM_SUCSESS") { this.getSumItemSucsess() }
        else if (this.props.items.type === "GET_HOME_RFAILURE") { this.getFail() }
    }

    getSumItemSucsess = () => {
        localStorage.setItem("SumOrderHome", JSON.stringify(_.toPairs(this.props.items.listItem)));
        this.props.stateStoreHomeToDefault();
        this.setState({ dataChart: _.toPairs(this.props.items.listItem) })
        // console.log(this.props.items.listItem);

    }
    getFail = () => {
        alert("Vui lòng kiểm tra đường truyền internet !")
    }


    render() {
        const activator = <Button onClick={this.togglePopoverActive} disclosure >More actions</Button>;
        console.log(JSON.parse(localStorage.SumOrderHome));
        let data = this.state.dataChart;
        return (<React.Fragment>
            {this.props.items.type !== "STATE_TO_DEFAULT" ? <div className="css-loader">
                <div className="loader ">Loading...</div>
            </div> : ""}
            <div className="row"> <div className="nav-top"></div> </div>
            <div className="row">
                <div className="col-2 left-tracking-properties p-0">
                    <div className={"Home-select-product" + ((this.state.selectProduct === "all") ? " select-product" : "")} onClick={() => this.setState({ dataChart: JSON.parse(localStorage.SumOrderHome), selectProduct: "all" })}>All</div>
                    {JSON.parse(localStorage.SumOrderHome).map((param, id) => <div className={"Home-select-product" + ((this.state.selectProduct === param[0]) ? " select-product" : "")} key={id} onClick={() => this.setState({ dataChart: [param], selectProduct: param[0] })}>{param[0]} </div>)}


                    <div className="p-1 mt-5">
                        <AppProvider i18n={enTranslations}>
                            <DatePicker month={this.state.month}
                                year={this.state.year}
                                onChange={this.setSelectedDates}
                                onMonthChange={this.handleMonthChange}
                                selected={this.state.selectedDates}
                                allowRange={true}
                                disableDatesAfter={new Date()}
                            />
                        </AppProvider>
                    </div>
                </div>
                <div className="col-10">
                    <AllChartsPartner date={this.state.selectedDates} data={JSON.stringify(data)} product="all" />

                </div>
            </div>

        </React.Fragment>

        );
    }
}

export default Home;