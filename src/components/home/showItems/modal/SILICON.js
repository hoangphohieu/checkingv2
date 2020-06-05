import React, { Component } from 'react';
import _ from 'lodash';
import CheckFileIn from "./CheckFileIn";
import OneTable from "./OneTable";
import ItemLoi from './ItemLoi';
class Silicon extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  printScreen: false,
                  changePrint: false,
                  wkhay: 2400,
                  hkhay: 1300
            }
      }


      changeScreen = () => { this.setState({ printScreen: !this.state.printScreen }) }
      changePrint = () => { this.setState({ changePrint: !this.state.changePrint }) }
      convertBarcode = (barcode) => {
            const obj = {
                  "00": "!",
                  "01": '"',
                  "02": "#",
                  "03": "$",
                  "04": "%",
                  "05": "&",
                  "06": "'",
                  "07": "(",
                  "08": ")",
                  "09": "*",
                  "10": "+",
                  "11": ",",
                  "12": "–",
                  "13": ".",
                  "14": "/",
                  "15": "0",
                  "16": "1",
                  "17": "2",
                  "18": "3",
                  "19": "4",
                  "20": "5",
                  "21": "6",
                  "22": "7",
                  "23": "8",
                  "24": "9",
                  "25": ":",
                  "26": ";",
                  "27": "<",
                  "28": "=",
                  "29": ">",
                  "30": "?",
                  "31": "@",
                  "32": "A",
                  "33": "B",
                  "34": "C",
                  "35": "D",
                  "36": "E",
                  "37": "F",
                  "38": "G",
                  "39": "H",
                  "40": "I",
                  "41": "J",
                  "42": "K",
                  "43": "L",
                  "44": "M",
                  "45": "N",
                  "46": "O",
                  "47": "P",
                  "48": "Q",
                  "49": "R",
                  "50": "S",
                  "51": "T",
                  "52": "U",
                  "53": "V",
                  "54": "W",
                  "55": "X",
                  "56": "Y",
                  "57": "Z",
                  "58": "[",
                  "59": "\\",
                  "60": "]",
                  "61": "^",
                  "62": "_",
                  "63": "`",
                  "64": "a",
                  "65": "b",
                  "66": "c",
                  "67": "d",
                  "68": "e",
                  "69": "f",
                  "70": "g",
                  "71": "h",
                  "72": "i",
                  "73": "j",
                  "74": "k",
                  "75": "l",
                  "76": "m",
                  "77": "n",
                  "78": "o",
                  "79": "p",
                  "80": "q",
                  "81": "r",
                  "82": "s",
                  "83": "t",
                  "84": "u",
                  "85": "v",
                  "86": "w",
                  "87": "x",
                  "88": "y",
                  "89": "z",
                  "90": "{",
                  "91": "|",
                  "92": "}",
                  "93": "~",
                  "94": "Å",
                  "95": "Æ",
                  "96": "Ç",
                  "97": "È",
                  "98": "É",
                  "99": "Ê",
                  "START": "Ë",
                  "STOP": "Ì",


            };
            // console.log(barcode);

            if (barcode.split("").length !== 14) this.alertError("co loi upload.js - barcode");
            barcode = barcode.split("");
            barcode = _.chunk(barcode, 2);
            barcode = barcode.map(param => { return param.join("") }).map(param => { return obj[param] })
            barcode = barcode.join("");
            return (obj["START"] + barcode + obj["STOP"])


      }

      saveTextAsFile = (arr) => {
            let arr2 = arr.map(arr1 => {
                  if (arr1.length !== 0)
                        if (arr1[0].length === 0) return []
                  return arr1
            })


            let itemsConvert = arr2.map(param2 => {
                  if (param2.length !== 0)
                        return param2.map(param3 => {
                              return param3.map(param4 => {
                                    return param4.map(param5 => {


                                          return { ...param5, barcode: this.convertBarcode(param5.barcode) }
                                    })
                              })

                        })
                  else return []

            });
            console.log(itemsConvert);


            let items = { items: itemsConvert, type: this.props.type, day: new Date().getDate(), mounth: new Date().getMonth() + 1, hour: new Date().getHours() }
            let paramToText = JSON.stringify(items)
            let textToWrite = paramToText // file contents
            let textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });

            let fileNameToSaveAs = `day${new Date().getDate()}${this.props.type}${new Date().getHours()}_${(new Date().getMonth() + 1)}.json`



            let downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            downloadLink.click();
            this.setState({ downClickJson: true })
      }
      render() {
            let items = this.props.itemsLocal;
            let itemSheet = JSON.parse(localStorage.pc_silicon);


            let sumAmountBefore, sumAmountAfter, itemsFilter, itemThua;
            let amountAllcase = [];
            let allFileName = [];
            let arr = [];
            // let danhsach2 = [];
            let z9 = [], z10 = [];
            let z9Screen = [], z10Screen = [];
            let z9Json = [], z10Json = [];

            {
                  itemSheet = itemSheet.map(param => {
                        let dataparam = [param.nameDefault, Number(param.width), Number(param.hight), param.nameVariant.split(","), Number(param.numberMica), Number(param.zPosition)];
                        dataparam[3] = dataparam[3].filter(param2 => { return param2 !== "" });
                        return dataparam
                  });
            }

            if (items != null) {
                  // items = items.Sheet1;
                  items = items.filter(item => (item.name !== undefined || item.amount !== undefined)); // lọc loại bỏ những item trắng
                  items = items.map(item => { return { ...item, amount: parseInt(item.amount) } }) // chuyển amount từ string sang number

                  sumAmountBefore = items.reduce((sum, item) => { // tính tổng amount
                        return (sum + parseInt(item.amount))
                  }, 0);
                  items = items.map(item => {
                        if (item.case === undefined) return item
                        else {
                              let itemFilter = itemSheet.filter(item2 => {
                                    let itemFilter2 = item2[3].filter(item3 => {
                                          if (item.case.trim().toLowerCase().endsWith(item3.trim().toLowerCase()) === true) {
                                                return true
                                          }
                                    });


                                    if (itemFilter2.length !== 0) { return true }
                                    else { return false }
                                    // đang code cái này
                              });
                              if (itemFilter.length === 1) {
                                    item.case = itemFilter[0][0];
                                    return item
                              }
                              else if (itemFilter.length > 1) {
                                    alert("kiểm tra lại endWith: " + item.case);
                                    window.location.reload();
                                    return item
                              }
                              else if (itemFilter.length === 0) {
                                    return item
                              }
                        }
                  });



                  for (let i = 0; i <= items.length - 1; i++) {  // lặp lại những item có amount >1
                        if (items[i].amount > 1) {
                              for (let j = 1; j < items[i].amount; j++) {
                                    items.push({ ...items[i], amount: 0 })
                              }
                        }
                  }

                  items = items.sort(function (a, b) { // lọc danh sách items theo name
                        var x = a.name.toLowerCase();
                        var y = b.name.toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                  });

                  // console.log(items);
                  { // cái này để thông báo số lượng items trùng, nhưng đọc lại éo biết là đã code cái gì :)))
                        let obj = {}
                        for (let k = 0; k < items.length; k++) {
                              if (obj[items[k].name] === undefined) {
                                    obj[items[k].name] = [items[k]]
                              }
                              else {
                                    obj[items[k].name] = [...obj[items[k].name], items[k]]
                              }
                        }
                        obj = _.toPairs(obj);
                        obj = obj.map(param1 => {
                              return param1[1].map(param2 => {
                                    param2["amount"] = param1[1].length;
                                    return param2
                              })
                        })
                        obj = _.flattenDeep(obj);
                  }


                  // console.log(items);
                  itemsFilter = items.filter(items1 => {
                        let itemsFilter2 = itemSheet.filter(itemSheet1 => {
                              if (itemSheet1[0] === items1.case) { return true }
                              else { return false }
                        })
                        if (itemsFilter2.length !== 0) { return true }
                        else { return false }
                  })


                  // lấy item thừa 
                  itemThua = _.difference(items, itemsFilter);
                  // console.log(itemThua);

                  // lấy sku để xem file nào chưa có
                  allFileName = items.map(item => { return item.sku })


                  // đếm ốp
                  let allcase = [];
                  let bodem = {};

                  for (let j = 0; j < items.length; j++) { // lấy danh sách tên tất cả các đt trong items
                        if (allcase.indexOf(items[j].case) === -1)
                              allcase.push(items[j].case)
                  }

                  for (let j = 0; j < allcase.length; j++) {
                        let onecase = items.filter(item => { return item.case === allcase[j] });
                        let tenaaa = allcase[j];
                        bodem[tenaaa] = onecase.length;
                        // console.log(bodem);

                        amountAllcase.push(
                              <tr key={j}>
                                    <th scope="row">{j + 1}</th>
                                    <td className="cot_row">{allcase[j]}</td>
                                    <td className="cot_row">{onecase.length}</td>
                              </tr>)
                  }

                  // danhsach2 = danhSach.map(param => {
                  //       if (bodem[param] !== undefined) return [param, bodem[param]]
                  //       else return [param, 0]


                  // })

                  items = itemsFilter;

                  items = _.orderBy(items, ['case', 'name', 'sku'], ['asc', 'asc', 'desc']);



                  items = items.map((item, key) => { return { ...item, stt: key + 1 } });
                  items = items.map(item => { return { barcode: item.barcode, name: item.name, case: item.case, sku: item.sku.trim(), stt: item.stt, pixel: toPixel(item.case), country: item.country, amount: item.amount, date: item.date } })
                  console.log(items);


                  function toPixel(toPixel1) {// toPixel1 là nameDefault
                        let dataToPixel1 = itemSheet.filter(itemSheet1 => {
                              if (toPixel1 === itemSheet1[0]) { return true }
                              else { return false }
                        })
                        if (dataToPixel1.length > 1) {
                              alert("trên sheet có dòng đt bị lặp");
                              window.location.reload();
                        }
                        return [{ w: dataToPixel1[0][1], h: dataToPixel1[0][2] }, dataToPixel1[0][4], dataToPixel1[0][5]]
                  }
                  items = items.map(item => {
                        return {
                              name: item.name,
                              name: item.case,
                              sku: item.sku.trim(),
                              stt: item.stt, pixel: toPixel(item.case)[0],
                              country: item.country,
                              amount: item.amount,
                              numberMica: toPixel(item.case)[1],
                              zPosition: toPixel(item.case)[2],
                              barcode: item.barcode


                        }
                  })
                  z9 = items.filter(items1 => items1.zPosition < 8);
                  z10 = items.filter(items1 => items1.zPosition >= 8);
                  // console.log(z9);
                  // console.log(z10);


                  function chiaban(zx) {
                        zx = JSON.parse(JSON.stringify(zx));
                        let z9Sort = [[]];
                        while (zx.length > 0) {
                              if (z9Sort[z9Sort.length - 1].length === 24) { z9Sort.push([]) };// nếu đã đủ 24 thì thêm arr mới để lưu

                              let z9L2 = zx.length;
                              let j = 0;
                              while (z9L2 === zx.length) {
                                    let z9End = z9Sort[z9Sort.length - 1];
                                    if (zx[j].numberMica > z9End.filter(z9End1 => z9End1.name === zx[j].name).length) {
                                          z9Sort[z9Sort.length - 1].push(zx[j]);
                                          zx[j] = null;
                                          zx = zx.filter(z91 => { return z91 !== null });
                                    } else {
                                          j = j + 1;
                                    }
                                    if (j >= zx.length) {
                                          if (zx.length !== 0) {
                                                z9Sort.push([]);
                                                j = 0;
                                          }
                                    }
                              }
                        }


                        // console.log(z9Sort);

                        return z9Sort
                  }
                  z9Screen = chiaban(z9);
                  z10Screen = chiaban(z10);
                  { // chunk 8 
                        z10Screen = z10Screen.map(z9Sort1 => {
                              while (z9Sort1.length < 24) {
                                    z9Sort1.push({
                                          name: null,
                                          country: null,
                                          amount: null,
                                          sku: null,
                                          case: null,
                                          stt: null
                                    })
                              }

                              let a = _.chunk(z9Sort1, 8); return a
                        });
                        z9Screen = z9Screen.map(z9Sort1 => {
                              while (z9Sort1.length < 24) {
                                    z9Sort1.push({
                                          name: null,
                                          country: null,
                                          amount: null,
                                          sku: null,
                                          case: null,
                                          stt: null
                                    })
                              }

                              let a = _.chunk(z9Sort1, 8); return a
                        })
                  }

                  z9Json = chiaban(z9);
                  z10Json = chiaban(z10);
                  z9Json = z9Json.map(z9Sort1 => {
                        let a = _.chunk(z9Sort1, 8); return a
                  });
                  z10Json = z10Json.map(z9Sort1 => {
                        let a = _.chunk(z9Sort1, 8); return a
                  });
                  // console.log(z9);
                  // console.log(z10);
                  // console.log(items);

                  sumAmountAfter = items.length;

                  arr = _.chunk(items, 24);
                  arr = arr.filter(item => { return item.length > 0 });
                  arr = arr.map(param5 => { let a = _.chunk(param5, 8); return a });


                  // itemCheck = JSON.parse(JSON.stringify(items));
            } // het if param!==undefi param.namened

            console.log(arr);


            return (
                  <React.Fragment>
                        <div>
                              {/* <CheckFileIn dataNone={allFileName} itemNoPrint={itemNotPrint} /> */}
                              <button type="button" className="btn btn-secondary" onClick={() => this.saveTextAsFile([z9Json, z10Json])}>Down Load Json</button>

                              <h2>Tổng tất cả phôi: {sumAmountAfter + " / " + sumAmountBefore}</h2>
                              <h2>Số liệu bàn in: {arr.map(arr1 => <span className="so-lieu-ban">{arr1.length}</span>)}</h2>
                              <ItemLoi items={itemThua} />
                        </div>
                        {/* {renderTable} */}
                  </React.Fragment>
            );

      }
}
export default Silicon;