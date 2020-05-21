

import React, { Component } from 'react';
import { DatePicker, AppProvider, Button, ActionList, Popover } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';


class PopoverWithActionListExample extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            popoverActive: false,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            selectedDates: {
                start: new Date(),
                end: new Date()
            }


        }
    }

    componentWillMount() {
        let user = JSON.parse(localStorage.UserProperties)[1].substr(4);
        let daySelect = Date.parse(this.state.selectedDates.start.toDateString());

        if (user === "all") { this.props.getOrderByDay("sumitem/?datatype=item&day=" + daySelect); }
        else { this.props.getOrderByDay("sumitem/?datatype=item&partner=user" + user + "&day=" + daySelect); }
    }

    togglePopoverActive = () => {
        this.setState({ popoverActive: !this.state.popoverActive })
    }
    handleMonthChange = (month, year) => { this.setState({ month: month, year: year }) };

    setSelectedDates = (param) => {
        this.setState({ selectedDates: param });
        let user = JSON.parse(localStorage.UserProperties)[1].substr(4);
        let daySelect = Date.parse(param.start.toDateString());

        if (user === "all") { this.props.getOrderByDay("sumitem/?datatype=item&day=" + daySelect); }
        else { this.props.getOrderByDay("sumitem/?datatype=item&partner=user" + user + "&day=" + daySelect); }
        console.log(param);


    }



    render() {
        const activator = <Button onClick={this.togglePopoverActive} disclosure className="bt-selectdate" >More actions</Button>;

        return (
            <AppProvider i18n={enTranslations}>
                <DatePicker
                            month={this.state.month}
                            year={this.state.year}
                            onChange={this.setSelectedDates}
                            onMonthChange={this.handleMonthChange}
                            selected={this.state.selectedDates}
                            disableDatesAfter={new Date()}
                        />

            </AppProvider>

        );
    }
}

export default PopoverWithActionListExample;





































    // import React from 'react';
    // import Helmet from 'react-helmet';
// import DayPicker, {DateUtils} from 'react-day-picker';
            // import 'react-day-picker/lib/style.css';
            // import _ from 'lodash';
// import {join} from 'path';

// export default class Example extends React.Component {
//     static defaultProps = {
//         numberOfMonths: 2,
//     };

//     constructor(props) {
//         super(props);
//         this.handleDayClick = this.handleDayClick.bind(this);
//         this.handleResetClick = this.handleResetClick.bind(this);
//         this.state = this.getInitialState();
//     }

//     getInitialState() {
//         return {
//             from: undefined,
//             to: undefined,
//             listDay: [[]],
//         };
//     }


//     componentDidUpdate() {
//         this.CDU_setStateListDay(); // lấy listDay của partner được GET(getListDayById) ở  component (SelectPartnerAndDay)
//     }
//     CDU_setStateListDay = () => {
//         if (this.props.items !== undefined) {
//             if (this.props.items.type === "getListDayById") {
//                 let listDay = JSON.parse(JSON.stringify(this.props.items.listItem));
//                 console.log(listDay);


//                 listDay = listDay.map(listDayCon => _.toPairs(listDayCon).filter(param => { return param[0] !== "id" }).map(param => param[1]));
//                 listDay = _.flatten(listDay);
//                 listDay.length = 300;


//                 // let userProperties = JSON.parse(localStorage.UserProperties);
//                 if (JSON.parse(localStorage.UserProperties)[1] !== "all") {
//                     let userProperties = JSON.parse(localStorage.UserProperties)[1].map(param => param[0]);
//                     listDay = listDay.map(param => {
//                         if (userProperties.some(param2 => param2 === param[0])) { return param }
//                         else { return undefined }
//                     });
//                 }
//                 console.log(listDay);
//                 listDay = _.uniq(listDay);

//                 listDay = listDay.filter(param => { return param !== undefined });
//                 console.log(this.state.listDay);



//                 // let paramId = _.toPairs(JSON.parse(JSON.stringify(this.props.items.listItem))[0]).filter(param => { return param[0] === "id" });
//                 // listDay.push(paramId[0]);
//                 if (listDay.length !== 0) {
//                     console.log(this.state.listDay);
//                     console.log(listDay);
//                     if (_.flattenDeep(this.state.listDay).join("")!==_.flattenDeep(listDay).join("") ) {


//                         this.setState({ listDay: listDay })
//                     }
//                 }

//             }
//         }
//     }
//     handleDayClick(day) { // click khi select Date
//         const range = DateUtils.addDayToRange(day, this.state);
//         this.setState(range);
//         this.props.sentDayToProps(range);   //  gọi tới  component (Home)  để setState và truyền date cho toàn bộ component
//         this.getdataFromServer(); // gọi tới hàm nội bộ  (getdataFromServer) để GET   khi click select Date
//     }
//     handleResetClick() {
//         this.props.sentDayToProps(this.getInitialState()); // gọi tới  component (Home)  để setState và truyền date cho toàn bộ component
//         this.setState({ from: undefined, to: undefined }); // setState lại

//     }
//     getdataFromServer = () => {
//         let partnerSelect = this.props.partnerSelect; // props lấy từ  component (SelectPartnerAndDay)
//         let product = this.props.product; // props lấy từ  component (SelectPartnerAndDay)
//         let start = null;
//         let end = null;
//         if (this.props.date !== null) { // tính start và end là số 121212121212121, lấy từ component (Home)
//             start = (this.props.date.from !== undefined) ? Date.parse(this.props.date.from) : null;
//             end = (this.props.date.to !== undefined) ? Date.parse(this.props.date.to) : null;
//         }
//         let endPoint += null;

//         if (product !== null) {  // tính endPoint ứng với partnerSelect và date select
//             endPoint += this.getEndPoint(partnerSelect, product, start, end);
//         }
//         else if (product === null) {
//             endPoint += this.getEndPoint("allPartner", product, start, end);
//         }
//         this.props.getListByCustom(endPoint); // GET API
//     }
    // getendPoint += (partnerSelect, product, start, end) => {
    //     let timeNow = new Date();
    //     let monthNow = timeNow.getMonth() + 1;
    //     let endPoint += null;
    //     partnerSelect = (partnerSelect !== "allPartner" && partnerSelect !== null) ? ("?namePartner=" + partnerSelect + "&Sumproduct=" + product) : ("?namePartner=allPartner" + ((product !== null) ? ("&Sumproduct=" + product) : ""));

    //     if (start === null && end === null) {
    //         endPoint += partnerSelect
    //             + "&month=" + monthNow
    //             + "&month=" + ((monthNow === 1) ? "12" : (monthNow - 1));
    //     }
    //     else if (start !== null && end !== null) {
    //         let monthStart = new Date(start).getMonth() + 1;
    //         let monthEnd = new Date(end).getMonth() + 1;
    //         if (monthStart === monthEnd) {
    //             endPoint += partnerSelect
    //                 + "&month=" + monthEnd
    //                 + "&month=" + ((monthEnd === 1) ? "12" : (monthEnd - 1));
    //         }
    //         else if (monthStart < monthEnd) {
    //             endPoint += partnerSelect;
    //             for (let i = monthStart; i <= monthEnd; i++) {
    //                 endPoint += endPoint + "&month=" + i
    //             }
    //         }
    //         else if (monthStart > monthEnd) {
    //             endPoint += partnerSelect;
    //             for (let i = monthStart; i <= 12; i++) {
    //                 endPoint += endPoint + "&month=" + i
    //             }
    //             for (let i = 1; i <= monthEnd; i++) {
    //                 endPoint += endPoint + "&month=" + i
    //             }
    //         }
    //     }
    //     else if (start !== null || end !== null) {
    //         let monthNowSelect = new Date(((start !== null) ? start : end)).getMonth() + 1;
    //         endPoint += partnerSelect
    //             + "&month=" + monthNowSelect
    //             + "&month=" + ((monthNowSelect === 1) ? "12" : (monthNowSelect - 1));
    //     }
    //     return endPoint;
    // }

//     render() {


//         let listDay = (this.props.product !== null) ? this.state.listDay.filter(param => { return param[0] === this.props.product }) : this.state.listDay.filter(param => { return param[0] !== "id" });
//         listDay = listDay.map(param => { return (new Date(param[1])) })
//         // listDay =.map(param => param[1]).map(param => { return (new Date(param)) });



//         let { from, to } = this.props.date;
//         let modifiers = { start: from, end: to, highlighted: [] };  // obj chứa date select và ngày nổi trội hơn 
//         modifiers.highlighted = listDay;
//         return (
//             <div className="RangeExample">
//                 <p className="p_reset_day">
//                     {!from && !to && 'Click to select range date'}
//                     {from && !to && 'Click to select range date'}
//                     {from &&
//                         to &&
//                         `From${from.toLocaleDateString()} To
//                 ${to.toLocaleDateString()}`}{' '}
//                     {from && to && (
//                         <button className="link button_reset_day" onClick={this.handleResetClick}>
//                             Reset
//             </button>
//                     )}
//                 </p>
//                 <DayPicker
//                     className="Selectable"
//                     numberOfMonths={this.props.numberOfMonths}
//                     selectedDays={[from, { from, to }]}
//                     modifiers={modifiers}
//                     onDayClick={this.handleDayClick}
//                 />
//                 <Helmet>
//                     <style>{`
//   .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
//     background-color: #d2e4f5  !important;
//     color: #000;
//   }
//   .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover{
//     background-color: #c0ded9 !important;
//     color: #fff;

//   }

//   .Selectable .DayPicker-Day {
//     border-radius: 0 !important;
//   }
//   .Selectable .DayPicker-Day--start {
//     border-top-left-radius: 50% !important;
//     border-bottom-left-radius: 50% !important;
//   }
//   .Selectable .DayPicker-Day--end {
//     border-top-right-radius: 50% !important;
//     border-bottom-right-radius: 50% !important;
//   }
//   .DayPicker-Day--highlighted {
//     background-color: #ffb337;
//     color: white;
//     border-top-right-radius: 50% !important;
//     border-bottom-right-radius: 50% !important;
//   }
// `}</style>
//                 </Helmet>
//             </div>
//         );
//     }
// }