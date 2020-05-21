import React, { Component } from 'react';
import _ from 'lodash';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

export default class Example extends Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/9hjfkp73/';
  Math_rangeDay = () => {
    let dayFrom = (this.props.date.start !== undefined) ? Date.parse(this.props.date.start.toDateString()) : undefined;
    let dayTo = (this.props.date.end !== undefined) ? Date.parse(this.props.date.end.toDateString()) : undefined;
    let rangeDay = [];
    if (dayFrom !== undefined && dayTo !== undefined) {
      for (let i = dayFrom; i <= dayTo; i = i + 24 * 60 * 60 * 1000) {
        rangeDay.push(i)
      }
    }
    else if (dayFrom !== undefined || dayTo !== undefined) {
      let daySelect = (dayFrom !== undefined) ? dayFrom : dayTo;
      rangeDay.push(daySelect)
    }
    return rangeDay;

  }

  sumAndDeleteAll = (dataChart) => { // hàm tính những ngày bị trùng nhau, cộng lại là để lại 1 ngày duy nhất
    for (let i = 0; i <= dataChart.length - 2; i++) {
      if (dataChart[i].day === dataChart[i + 1].day) {
        dataChart[i + 1].basecost += dataChart[i].basecost;
        dataChart[i + 1].quantity += dataChart[i].quantity;
        dataChart[i + 1].shipping_us += dataChart[i].shipping_us;
        dataChart[i] = null;

      }
    }
    dataChart = dataChart.filter(param => { return param !== null });
    return [...dataChart];
  }
  Math_dataChartAll = (dataChart, rangeDay) => {

    if (dataChart !== undefined) { // TH1: select date = -
      if (rangeDay.length === 0) {

        dataChart = _.orderBy(dataChart, ['day'], ['asc']); // xắp xếp

        dataChart = this.sumAndDeleteAll(dataChart); // lọc
        dataChart = dataChart.map(param => { // đổi sang dữ liệu biểu đồ
          return {
            day: (new Date(param.day)).getDate() + "/" + ((new Date(param.day)).getMonth() + 1),
            basecost: param.basecost

          }
        })
        return dataChart;
      }

      else if (rangeDay.length <= 14) { // TH2: select date là khoảng thời gian 14 ngày
        dataChart = _.orderBy(dataChart, ['day'], ['asc']); // xếp

        dataChart = this.sumAndDeleteAll(dataChart); // lọc

        let dayDataChart = rangeDay.map(rangeDayParam => { // với từng item của khoảng thời gian selectDate
          let dataChartSelect = dataChart.filter(param => { // trả về với item (dataChart)  nào trùng với ngày của item selectDate 
            return param.day === rangeDayParam.toString();
          })
          dataChart = _.pullAllWith(dataChart, dataChartSelect, _.isEqual); // đồng thời (dataChart) xóa những cái vừa lọc ở trên đi 
          let datePrint = (((new Date(rangeDayParam)).getDate()) + "/" + ((new Date(rangeDayParam)).getMonth() + 1));
          let sumData = { day: datePrint, basecost: 0 };
          for (let i = 0; i <= dataChartSelect.length - 1; i++) {
            sumData.basecost += dataChartSelect[i].basecost;
          }
          return sumData;
        })
        console.log(dayDataChart);

        return dayDataChart;
      }
      else if (rangeDay.length <= 119) { // TH3: seledate là khoảng thời gian 4 tháng, chia thành các tuần
        rangeDay = _.chunk(rangeDay, 7); // chia thành  từng 7 ngày
        // console.log(rangeDay);

        dataChart = _.orderBy(dataChart, ['day'], ['asc']);
        dataChart = this.sumAndDeleteAll(dataChart);

        let weekDataChart = rangeDay.map((rangeDayParam, id) => {
          let dataChartSelect = dataChart.filter(param => {
            let stateParam = rangeDayParam.filter(day => { return day === param.day })[0];
            return param.day === stateParam;
          })
          dataChart = _.pullAllWith(dataChart, dataChartSelect, _.isEqual);
          let startDayParam = rangeDayParam[0];
          let endDayParam = rangeDayParam[rangeDayParam.length - 1];
          let datePrint;
          if ((new Date(startDayParam)).getMonth() === (new Date(endDayParam)).getMonth()) { // tính ngày datePrint 7-9/10
            datePrint = (new Date(startDayParam)).getDate() + "-" + (new Date(endDayParam)).getDate() + "/" + ((new Date(startDayParam)).getMonth() + 1)
          }
          else {
            datePrint = (new Date(startDayParam)).getDate() + "/" + ((new Date(startDayParam)).getMonth() + 1) + "-" + (new Date(endDayParam)).getDate() + "/" + ((new Date(endDayParam)).getMonth() + 1)
          }
          let sumData = { day: datePrint, basecost: 0 };
          for (let i = 0; i <= dataChartSelect.length - 1; i++) {
            sumData.basecost += dataChartSelect[i].basecost;
          }
          return sumData;

        })

        return weekDataChart;
      }

      else if (rangeDay.length <= 730) { // giới hạn 2 năm, chia thàng các tháng
        rangeDay = rangeDay.map(param => { return { date: param, month: new Date(param).getMonth() } }) // tính toán để chia range day thành các tháng
        rangeDay = _.groupBy(rangeDay, "month"); // group thành các tháng
        rangeDay = _.toPairs(rangeDay).map(param => param[1]);
        rangeDay.sort((a, b) => { return (a[0].date - b[0].date) }); // lọc từ tháng trước đến tháng sau
        rangeDay = rangeDay.map(param => { param = param.map(param2 => param2.date); return param })
        dataChart = _.orderBy(dataChart, ['day'], ['asc']);
        dataChart = this.sumAndDeleteAll(dataChart);
        // het tinh rangeDay

        let monthDataChart = rangeDay.map(rangeDayParam => {
          let dataChartSelect = dataChart.filter(param => {
            let stateParam = rangeDayParam.filter(day => { return day === param.day })[0];
            return param.day === stateParam;
          })
          dataChart = _.pullAllWith(dataChart, dataChartSelect, _.isEqual);
          let startDayParam = rangeDayParam[0];
          let datePrint = (((new Date(startDayParam)).getMonth() + 1) + "/" + ((new Date(startDayParam)).getFullYear()));
          let sumData = { day: datePrint, basecost: 0 };
          for (let i = 0; i <= dataChartSelect.length - 1; i++) {
            sumData.basecost += dataChartSelect[i].basecost;
          }
          return sumData;
        })
        return monthDataChart;
      }
      return dataChart;
    }
  }


  render() {
  

    let rangeDay = this.Math_rangeDay();
    let dataChart = [];
    if (this.props.product === "all") {
      let data = JSON.parse(this.props.data);
      console.log(data);
      
      if (data.length !== 0) {
        data.forEach(param1 => {
          param1[1].forEach(param2 => {
            dataChart.push(param2)
          })
        })
      }

    }


    dataChart = this.Math_dataChartAll(dataChart, rangeDay);
    console.log(dataChart);


    let payload = [{ value: 'Số lượng', type: 'line' }];
    let writeChart = null;

    writeChart = <BarChart
      width={(dataChart.length > 5) ? dataChart.length * 80 : 400}
      height={250}
      data={dataChart}
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Bar dataKey="basecost" barSize={15} fill="#ffc658" ><LabelList dataKey="basecost" position="top" /></Bar>
    </BarChart>


    return (
      <>
        {writeChart}
      </>
    );
  }
}


