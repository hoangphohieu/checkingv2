import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Home from '../components/home/Home';
function mapStateToProps(state) {
      return {
            ItemPayload: state.HomeReducer
      };
}

function mapDispatchToProps(dispatch) { 
      return {
            searchChecking: (param) => dispatch(actions.getCheckingAPI(param)),
            searchCheckingDate: (param) => dispatch(actions.Item_searchCheckingDate(param)),
            patchItemCheckingProperties: (param) => dispatch(actions.patchItemCheckingProperties(param)),
            deleteItemChecking: (param) => dispatch(actions.deleteItemChecking(param)),
            getSheetPhone: (param) => dispatch(actions.ItemGetSheetPhone(param)),
            getPCReturn: (param) => dispatch(actions.ItemGetPCReturn(param)),
            postItem: (param) => dispatch(actions.itemPostItem(param)),
            updatePcProperties: (param) => dispatch(actions.Items_updatePcProperties(param)),
            
            propsItemsToDefault: () => dispatch(actions.propsItemsToDefault()),



      };
}

class ItemContainer extends Component {
      render() {

            return (
                  <React.Fragment>

                        <Home {...this.props} />
                  </React.Fragment>
            );
      }
}

export default connect(
      mapStateToProps, mapDispatchToProps
)(ItemContainer);