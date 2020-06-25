import React, { Component } from 'react';
import { DatePicker, AppProvider, Button, ActionList, Popover } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import _ from "lodash";
class CPN extends Component {
      constructor(props, context) {
            super(props, context);
            this.state = {
                  month: new Date().getMonth(),
                  year: new Date().getFullYear(),
                  selectedDates: {
                        start: new Date(),
                        end: new Date()
                  }
            }
      }
      setSelectedDates = (date) => {
            this.setState({ selectedDates: date });
            this.convertDate(date);
      }
      convertDate = (date) => {
            let start = Date.parse(date.start);
            let end = Date.parse(date.end);
            let arr = [start];
            while (arr[arr.length - 1] < end) {
                  arr.push(arr[arr.length - 1] + (24 * 60 * 60 * 1000))
            }
            let arrMonth = arr.map(param => ((new Date(param)).getMonth() + 1));
            arrMonth = _.uniq(arrMonth).map(param => `month=${param}`).join("&");
            let endPoint = "?datatype=item&" + arrMonth;
            this.props.getItemsDatePicker(endPoint, arr);
            this.props.changeFetchAPITrue();



      }
      handleMonthChange = (month, year) => { this.setState({ month: month, year: year }) };

      render() {
      
            return (
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
            );
      }
}

export default CPN;