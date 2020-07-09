import React, { useState, useEffect } from 'react';
import CheckingInput from './CheckingInput';
import _ from "lodash";
import ShowItems from './showItems/ShowItems';
import ReactLoading from 'react-loading';

import Button from '@material-ui/core/Button';
function Items2(props) {
      const [Method, setMethod] = useState({ type: null, fetching: false });
      const [ItemsGET, setItemsGET] = useState([]);
      const [ItemsCount, setItemsCount] = useState([]);
      useEffect(() => {
            localStorage.items_gllm = "[]";
            localStorage.items_led = "[]";
            localStorage.items_silicon = "[]";
      }, []);
      useEffect(() => {
            if (props.ItemReducer.type === "GET_CI_CHECKING_SUCSESS") { getCheckingSucsess() }
            else if (props.ItemReducer.type === "CI_PATCH_ITEMS_RFAILURE") { patchItemsFaild() }
            else if (props.ItemReducer.type === "CI_DELETE_ITEMS_RFAILURE") { patchItemsFaild() }
            else if (props.ItemReducer.type === "CI_UPDATE_PC_PRO_SUCSESS") { updatePCProDone() }
            else if (props.ItemReducer.type === "CI_UPDATE_PC_PRO_RFAILURE") { updatePCProfail() }
            // console.log(ItemsCount);
            // console.log(localStorage.items_gllm);

            if (ItemsGET.length === 0) {
                  if (localStorage.items_gllm !== "[]") {

                        props.updatePcPro(JSON.parse(localStorage.items_gllm));
                  }
                  else if (localStorage.items_led !== "[]") {
                        props.updatePcPro(JSON.parse(localStorage.items_led));
                  }
                  else if (localStorage.items_silicon !== "[]") {
                        props.updatePcPro(JSON.parse(localStorage.items_silicon));
                  }
            }
      });
      useEffect(() => {
            if (props.ItemReducer.type === "CI_PATCH_ITEMS_SUCSESS") { patchItemsSucsess() }
            else if (props.ItemReducer.type === "CI_DELETE_ITEMS_SUCSESS") { patchItemsSucsess() }
      }, [props.ItemReducer]);

      let getCheckingSucsess = () => {
            let itemsAPI = props.ItemReducer.listItem;
            itemsAPI.pop();
            itemsAPI = itemsAPI.map(param => param.item_post);
            itemsAPI = itemsAPI.map(param => {
                  if (ItemsGET.filter(param2 => param2.barcode === param.barcode).length === 0) {
                        return { ...param, handlechange: (param["handlechange"] === undefined) ? `${Date.parse(new Date())}:GET` : param["handlechange"].concat(`,${Date.parse(new Date())}:GET`) }
                  }
            }).filter(param2 => param2 !== undefined);
            setItemsGET([...ItemsGET, ...itemsAPI])
            // localStorage.itemsPatch = JSON.stringify([...JSON.parse(localStorage.itemsPatch), ...itemsAPI]);
            props.propsItemsToDefault();

      }
      let patchItemsSucsess = () => {
            let items = ItemsGET;
            items.pop();
            setItemsGET(items);
            props.propsItemsToDefault();

            // localStorage.itemsPatch = JSON.stringify(items);

            if (items.length !== 0) {
                  let item = items[items.length - 1];
                  patchItem({ ...item, printStatus: Method.type })
            }

            if (items.length === 0) {
                  if (Method.type === "printed") {
                        let items = ItemsCount;

                        localStorage.items_gllm = JSON.stringify(items.filter(param => (param.type === "glass" || param.type === "luminous")));
                        localStorage.items_led = JSON.stringify(items.filter(param => param.type === "led"));
                        localStorage.items_silicon = JSON.stringify(items.filter(param => param.type === "silicon"));

                        // dem 
                        if (localStorage.items_gllm !== "[]") localStorage.items_gllm = JSON.stringify(change_pc_pro(JSON.parse(localStorage.items_gllm), "pc_gllm"));
                        if (localStorage.items_led !== "[]") localStorage.items_led = JSON.stringify(change_pc_pro(JSON.parse(localStorage.items_led), "pc_led"));
                        if (localStorage.items_silicon !== "[]") localStorage.items_silicon = JSON.stringify(change_pc_pro(JSON.parse(localStorage.items_silicon), "pc_silicon"));
                  }
                  // console.log(localStorage.items_gllm);

                  setMethod({ type: null, fetching: false });
                  props.propsItemsToDefault();

            }




      }
      let patchItemsFaild = () => { // dang xu ly cai nay
            let items = ItemsGET;
            let item = items[items.length - 1];
            patchItem({ ...item, printStatus: Method.type });
            props.propsItemsToDefault();

      }
      let updatePCProDone = () => {
            let pcPro = props.ItemReducer.listItem.item_post;
            if (pcPro.id = "pc_gllm") localStorage.items_gllm = "[]";
            if (pcPro.id = "pc_led") localStorage.items_led = "[]";
            if (pcPro.id = "pc_silicon") localStorage.items_silicon = "[]";
      }
      let updatePCProfail = () => {
            props.propsItemsToDefault();
      }
      let patchItem = (item) => {
            let itemConvert = { ...item, lasttime: Date.parse(new Date()), handlechange: (item["handlechange"] === undefined) ? `${Date.parse(new Date())}:PUT` : item["handlechange"].concat(`,${Date.parse(new Date())}:PUT`) }
            props.patchItem({ item_post: itemConvert });

      }
      let change_pc_pro = (items, type) => {
            let pc_pro = JSON.parse(localStorage.getItem(type)).item_post;
            delete pc_pro.id;
            delete pc_pro.type;

            pc_pro = _.toPairs(pc_pro).map(param => param[1]);

            let amountAllPhoneCase = [];
            let phonecaseSheet = pc_pro.map(param => param.nameDefault);


            for (let i = 0; i < phonecaseSheet.length; i++) {
                  let data2 = items.filter(param => param.case === phonecaseSheet[i]);
                  amountAllPhoneCase = [...amountAllPhoneCase, [phonecaseSheet[i], data2.length]];
            }


            pc_pro = pc_pro.map(param => [param.nameDefault, param]);
            pc_pro = _.fromPairs(pc_pro);
            pc_pro = { ...pc_pro, id: type, type: "pc_properties" }




            amountAllPhoneCase.forEach(param => { pc_pro[param[0]].amount = pc_pro[param[0]].amount - param[1] });
            pc_pro = { item_post: { ...pc_pro, id: type, type: "pc_properties" } }

            return pc_pro;


      }
      let handleSetMethod = (param) => {


            if (param === "printed") setItemsCount([...ItemsGET]);
            let item = ItemsGET[ItemsGET.length - 1];
            let itemConvert = {
                  ...item,
                  printStatus: param,
                  lasttime: Date.parse(new Date()),
                  handlechange: (item["handlechange"] === undefined) ? `${Date.parse(new Date())}:PUT` : item["handlechange"].concat(`,${Date.parse(new Date())}:PUT`)
            }
            props.patchItem({ item_post: itemConvert });
            setMethod({ type: param, fetching: true });
      }


      let loadding = <ReactLoading type={"spinningBubbles"} color={"#000"} height={100} width={100} className="loading" />;



      console.log(Method);
      console.log(props.ItemReducer);


      return (
            <React.Fragment>
                  {(Method.fetching === true) ? loadding : ""}
                  <div className="row justify-content-center nav-top-item">
                        <div className="col-4 d-flex align-items-center">
                              <CheckingInput {...props} />

                        </div>
                  </div>

                  <div className="row">
                        <div className="col-12 checking-right mt-3">
                              <div className="grid-container-item">
                                    <div className="grid-items-item1">
                                          <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                onClick={() => handleSetMethod("printed")}>đánh dấu đã in xong
                                    </Button>

                                          <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                onClick={() => handleSetMethod("done")}>đánh dấu hàng đã hoàn thành
                                    </Button>
                                          <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                onClick={() => handleSetMethod("wait")}>đánh dấu hàng chưa in
                                    </Button>
                                          <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                onClick={() => handleSetMethod("return")}>đánh dấu hàng hoàn
                                    </Button>

                                          <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                onClick={() => handleSetMethod("failded")}>đánh dấu hàng lỗi
                                    </Button>
                                          <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                onClick={() => handleSetMethod("send")}>đánh dấu hàng gửi đi in
                                    </Button>
                                          {/* <Button variant="outlined" className="mb-1 w-100  bt-show"
                                                onClick={() => handleSetMethod("done")}>xóa tất cả
                                    </Button> */}
                                    </div>
                                    <ShowItems {...props} ItemsGET={ItemsGET} />
                              </div>
                        </div>
                        {(Method.fetching === true) ? <div className="pro-get-upload">
                              <h1>Đang tải {ItemsGET.length}</h1>
                        </div> : ""}
                  </div>


            </React.Fragment >
      );
}

export default Items2;