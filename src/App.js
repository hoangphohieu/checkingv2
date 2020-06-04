import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import ItemsContainer from './containers/ItemsContainer';
import HomeContainer from './containers/HomeContainer';
import UploadContainer from './containers/UploadContainer';
import UseControlContainer from './containers/UseControlContainer';
import * as actions from './actions';
import { connect } from 'react-redux';
import _ from "lodash";
function mapStateToProps(state) {
  return {
    itemReducer: state.itemsApp
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getSheetPhone: (param) => dispatch(actions.getSheetPhone(param)),



  };
}
class App extends Component {




  componentWillMount() {
    if (JSON.parse(localStorage.getItem("UserProperties")) === null) {
      localStorage.setItem("UserProperties", JSON.stringify([]));
    }
    if (JSON.parse(localStorage.getItem("CI_itemsPatchFail")) === null) {
      localStorage.setItem("CI_itemsPatchFail", JSON.stringify([]));
    }
    localStorage.setItem("SumOrderHome", JSON.stringify([]));
    localStorage.setItem("PhonesAlltribute", JSON.stringify([]));
    localStorage.setItem("pc_gllm", JSON.stringify([]));

    this.props.getSheetPhone("gllm");
  }
  convertPCProperties = (payload) => {
    payload.forEach(items => {
      let C_Items = _.toPairs(items).filter(param => (param[0] !== "id" && param[0] !== "type")).map(param => { return { ...param[1], nameDefault: param[0] } });
      localStorage.setItem(items.id, JSON.stringify(C_Items));

    });
  }
  componentDidUpdate() {
    if (this.props.itemReducer.type === "GET_SHEET_PHONE_SUCSESS") {
      this.convertPCProperties(this.props.itemReducer.listItem);
    }
    else if (this.props.itemReducer.type === "GET_SHEET_PHONE_RFAILURE") {
      alert("kiem tra duong truyen mang - api")
      window.location = "/";
    }
  }


  logOut = () => {
    localStorage.setItem("UserProperties", JSON.stringify([]));
    window.location = '/';
  }
  render() {
    let userProperties = JSON.parse(localStorage.UserProperties);
    let partnerTypeUser = userProperties[0];


    return (
      <React.Fragment>
        <div className="container-fluid">

        </div>

        <div className="App h-100">
          <div className="container-fluid h-100 ">
            <div className="row h-100">
              <div className="col-2 border-right-gray">
                <div className="row">
                  <div className="nav-top">
                    <img className="logo" src="/printway.png" />
                  </div>
                </div>
                <div className="row flex-column ">



                  {(partnerTypeUser === undefined) ? ""
                    : <Link to="/" className=" nav-item-h">
                      <div className="d-flex align-items-center ">
                        <span className="_2-hnq">
                          <svg viewBox="0 0 20 20" className="v3ASA" focusable="false" aria-hidden="true"><path fill="currentColor" d="M7 13h6v6H7z"></path><path d="M19.664 8.252l-9-8a1 1 0 0 0-1.328 0L8 1.44V1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5.773L.336 8.252a1.001 1.001 0 0 0 1.328 1.496L2 9.449V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.449l.336.299a.997.997 0 0 0 1.411-.083 1.001 1.001 0 0 0-.083-1.413zM16 18h-2v-5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v5H4V7.671l6-5.333 6 5.333V18zm-8 0v-4h4v4H8zM4 2h2v1.218L4 4.996V2z" fillRule="evenodd"></path></svg>
                        </span>
                        <span className="ml-4">Home</span>
                      </div>
                    </Link>}

                  {(partnerTypeUser === undefined) ? ""
                    : <Link to="/Items" className=" nav-item-h">
                      <div className="d-flex align-items-center">
                        <span className="_2-hnq ">
                          <span className="_2-hnq"><img className="_219ua" src="data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; version=&quot;1.1&quot; viewBox=&quot;0 0 1000 1000&quot;><path d=&quot;M935.3,908.6c-0.7-16.6-3.1-33.1-4.7-49.6c-3.2-31.9-6.4-63.8-9.6-95.6c-2.9-28.6-5.7-57.2-8.5-85.7c-3.2-31.7-6.4-63.5-9.6-95.2c-3.2-31.7-6.3-63.5-9.5-95.2c-3.2-32.2-6.5-64.4-9.7-96.5c-1.4-13.7-1.7-27.5-4.1-41c-7-39.6-40.4-67.2-80.6-67.4c-25.4-0.1-50.8,0-76.2,0c-1.6,0-3.2,0-5.2,0c0-17.3,0.5-34.1-0.1-50.8c-0.5-14.2-1.3-28.4-3.6-42.4c-14-85.7-84.1-157.6-169.6-174.4c-10.2-2-20.6-3.1-30.9-4.6c-9.1,0-18.1,0-27.2,0c-1.2,0.2-2.3,0.6-3.5,0.7c-49.1,4-92.3,22.4-128.7,55.5c-42.6,38.7-66.7,86.9-71,144.4c-1.6,22.1-0.7,44.4-1,66.6c0,1.6,0,3.2,0,5c-2.3,0-4,0-5.6,0c-26.2,0-52.3-0.2-78.5,0.1c-37.2,0.5-71,28.4-77.3,65.1c-3.5,20.4-4.4,41.1-6.5,61.7c-2.9,28.6-5.7,57.1-8.5,85.7c-3.2,32-6.4,64.1-9.6,96.1c-3.1,31.4-6.3,62.9-9.4,94.3c-3.5,34.7-7,69.5-10.5,104.2c-3.2,32.3-6.5,64.7-9.7,97c-0.9,9.3-2.5,18.8-1.8,28c3.1,43,38.3,75.5,81.5,75.5c235.8,0.1,471.5,0,707.3,0c11,0,21.6-2.1,31.8-6.3C915.4,971.3,936.6,940.2,935.3,908.6z M336.7,224.2c0.9-76.6,58.7-144.2,134.3-157.1c88.8-15.1,171.1,40.9,189.2,129c1.5,7.5,2.7,15.3,2.8,22.9c0.4,20.8,0.1,41.7,0.1,63.1c-108.8,0-217.3,0-326.2,0c-0.1-1.2-0.3-2.3-0.3-3.5C336.6,260.4,336.5,242.3,336.7,224.2z M836.6,934.6c-3.9,0.6-7.8,0.9-11.7,0.9c-216.6,0-433.1,0-649.7,0c-29.4,0-51.9-18.8-55.6-47.8c-1.1-8.7,0.6-17.7,1.6-26.6c3.7-34.3,7.6-68.5,11.4-102.7c4.1-36.8,8.2-73.6,12.3-110.4c3.5-31.2,6.9-62.5,10.4-93.7c3.5-31.2,7-62.5,10.4-93.7c2.7-24.5,5.6-48.9,7.7-73.5c2.4-27.7,25.4-50,53.1-50.4c17.5-0.2,35.1-0.1,52.6-0.1c0.9,0,1.8,0.1,3.1,0.2c0,20,0.1,39.6-0.1,59c0,1.6-1.8,3.6-3.3,4.6c-33.7,23.4-30.9,74.1,5.2,93.2c25.4,13.4,56.8,4.8,71.9-19.6c15.1-24.6,8.5-56.7-15.5-73.1c-2.9-2-3.8-4-3.8-7.3c0.2-18.7,0.1-37.5,0.1-56.6c108.8,0,217.5,0,326.4,0c0.1,1.3,0.2,2.6,0.2,3.9c0,17.8-0.1,35.7,0.1,53.5c0,2.9-1,4.5-3.4,6.2c-20,13.6-28.6,38.1-21.5,61c7,22.7,28,38.3,51.7,38.4c23.8,0.1,44.9-15.2,52.1-37.8c7.3-22.9-1-47.6-20.8-61.3c-2.8-1.9-3.9-3.8-3.9-7.3c0.2-17.4,0.1-34.8,0.1-52.2c0-1.5,0-3,0-4.8c8.3,0,16.1-0.1,23.9,0c13.1,0.2,26.4-0.6,39.4,1c24.6,3,43.5,24.6,45.6,49.3c1.6,19,3.8,37.9,5.9,56.8c3.1,28.7,6.4,57.4,9.6,86.1c3.5,31.4,7,62.8,10.5,94.2c3.2,28.5,6.3,57.1,9.5,85.6c3.5,31.4,7,62.8,10.5,94.2c2.8,25.2,5.9,50.4,8.4,75.7C883.3,904.6,862.4,930.3,836.6,934.6z&quot;/></svg>" alt="" aria-hidden="true" /></span>
                        </span>
                        <span className="ml-4">Items</span>
                      </div>
                    </Link>}
                  {(partnerTypeUser !== undefined) ? <>

                    <Link to="/Upload" className=" nav-item-h">
                      <div className="d-flex align-items-center">
                        <span className="_2-hnq ">
                          <svg viewBox="0 0 20 20" className="v3ASA" focusable="false" aria-hidden="true"><path d="M1 1h7v7H1V1zm0 11h7v7H1v-7zm11 0h7v7h-7v-7z" fill="currentColor"></path><path d="M8 11H1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1zm-1 7H2v-5h5v5zM8 0H1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zM7 7H2V2h5v5zm12 4h-7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1zm-1 7h-5v-5h5v5zM12 6h2v2a1 1 0 1 0 2 0V6h2a1 1 0 1 0 0-2h-2V2a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2z"></path></svg>
                        </span>
                        <span className="ml-4">Upload</span>
                      </div>
                    </Link>
                  </>
                    : ""}
                  {/* {(partnerTypeUser === undefined) ? <Link to="/" className=" nav-item-h">
                    <div className="d-flex align-items-center">
                      <span className="_2-hnq ">
                        <svg viewBox="0 0 20 20" className="v3ASA" focusable="false" aria-hidden="true"><path fill="currentColor" d="M7 13h6v6H7z"></path><path d="M19.664 8.252l-9-8a1 1 0 0 0-1.328 0L8 1.44V1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5.773L.336 8.252a1.001 1.001 0 0 0 1.328 1.496L2 9.449V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.449l.336.299a.997.997 0 0 0 1.411-.083 1.001 1.001 0 0 0-.083-1.413zM16 18h-2v-5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v5H4V7.671l6-5.333 6 5.333V18zm-8 0v-4h4v4H8zM4 2h2v1.218L4 4.996V2z" fillRule="evenodd"></path></svg>
                      </span>
                      <span className="ml-4">User</span>
                    </div>
                  </Link>
                    :
                    <Link to="/useControl" className=" nav-item-h">
                      <div className="d-flex align-items-center">
                        <span className="_2-hnq ">
                          <svg viewBox="0 0 20 20" className="v3ASA" focusable="false" aria-hidden="true"><path d="M10 13c-4 0-7 3-7 3l1 3h12l1-3s-3-3-7-3" fill="currentColor"></path><path d="M17.707 15.293a.999.999 0 0 1 .241 1.023l-1 3A.999.999 0 0 1 16 20H4a1 1 0 0 1-.949-.684l-1-3a.999.999 0 0 1 .242-1.023C2.427 15.158 5.635 12 10 12c4.364 0 7.572 3.158 7.707 3.293zM15.28 18l.562-1.687c-.92-.752-3.155-2.313-5.84-2.313-2.704 0-4.928 1.558-5.844 2.31L4.72 18h10.56zM10 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0 8c2.757 0 5-2.243 5-5s-2.243-5-5-5-5 2.243-5 5 2.243 5 5 5"></path></svg>
                        </span>
                        <span className="ml-4">User</span>
                      </div>
                    </Link>
                  } */}
                  {(partnerTypeUser !== undefined) ?
                    <div className=" nav-item-h" onClick={this.logOut}>
                      <div className="d-flex align-items-center">
                        <span className="_2-hnq ">
                          <svg viewBox="0 0 20 20" className="v3ASA" focusable="false" aria-hidden="true"><path fill="currentColor" d="M10 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm7-3c0-.53-.064-1.044-.176-1.54L19 7.23l-2.047-3.464-2.106 1.188A6.978 6.978 0 0 0 12 3.292V1H8v2.294a6.99 6.99 0 0 0-2.847 1.662L3.047 3.768 1 7.232 3.176 8.46C3.064 8.955 3 9.47 3 10s.064 1.044.176 1.54L1 12.77l2.047 3.464 2.106-1.188A6.99 6.99 0 0 0 8 16.708V19h4v-2.294a6.99 6.99 0 0 0 2.847-1.662l2.106 1.188L19 12.768l-2.176-1.227c.112-.49.176-1.01.176-1.54z"></path><path d="M19.492 11.897l-1.56-.88a7.63 7.63 0 0 0 .001-2.035l1.56-.88a1 1 0 0 0 .369-1.38L17.815 3.26a1 1 0 0 0-1.353-.363l-1.49.84A8.077 8.077 0 0 0 13 2.587V1a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v1.586a8.072 8.072 0 0 0-1.97 1.152l-1.492-.84a1 1 0 0 0-1.352.36L.14 6.724a1.004 1.004 0 0 0 .369 1.381l1.55.88C2.02 9.325 2 9.665 2 10s.023.675.068 1.017l-1.56.88a1 1 0 0 0-.369 1.372l2.04 3.46c.27.47.87.63 1.35.36l1.49-.844c.6.48 1.26.87 1.97 1.154V19c0 .552.443 1 1 1h4c.55 0 1-.448 1-1v-1.587c.7-.286 1.37-.675 1.97-1.152l1.49.85a.992.992 0 0 0 1.35-.36l2.047-3.46a1.006 1.006 0 0 0-.369-1.38zm-3.643-3.22c.1.45.15.894.15 1.323s-.05.873-.15 1.322c-.1.43.1.873.48 1.09l1.28.725-1.03 1.742-1.257-.71a.988.988 0 0 0-1.183.15 6.044 6.044 0 0 1-2.44 1.42.99.99 0 0 0-.714.96V18H9v-1.294c0-.443-.29-.833-.714-.96a5.985 5.985 0 0 1-2.44-1.424 1 1 0 0 0-1.184-.15l-1.252.707-1.03-1.75 1.287-.73c.385-.22.58-.66.485-1.09A5.907 5.907 0 0 1 4 10c0-.43.05-.874.152-1.322a1 1 0 0 0-.485-1.09L2.38 6.862 3.41 5.12l1.252.707a.998.998 0 0 0 1.184-.15 6.02 6.02 0 0 1 2.44-1.425A1 1 0 0 0 9 3.294V2h2v1.294c0 .442.29.832.715.958.905.27 1.75.762 2.44 1.426.317.306.8.365 1.183.15l1.253-.708 1.03 1.742-1.28.726a.999.999 0 0 0-.48 1.09zM10 6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path></svg>
                        </span>
                        <span className="ml-4">logOut</span>
                      </div>
                    </div>
                    : ""}

                </div>
              </div>


              <div className="col-10">

                <Switch  >
                  {(partnerTypeUser !== "R") ?
                    <Route exact path="/Items" render={(props) => <ItemsContainer {...props} />} />
                    : ""}

                  {(partnerTypeUser !== "R") ?
                    <Route exact path="/Upload" render={(props) => <UploadContainer {...props} />} />
                    : ""}

                  {/* 
                  {(localStorage.UserProperties === "[]") ? <Route exact path="/" render={(props) => <UseControlContainer {...props} />} />
                    : ""} */}
                  {(partnerTypeUser !== undefined) ?
                    <Route exact path="/" render={(props) => <HomeContainer {...props} />} />
                    : <Route exact path="/" render={(props) => <UseControlContainer {...props} />} />}
                </Switch>

              </div>

            </div>
          </div>


        </div>
      </React.Fragment >
    );
  }
}
// export default App;



export default connect(
  mapStateToProps, mapDispatchToProps
)(App);








