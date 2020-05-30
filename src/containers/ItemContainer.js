import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Item from '../components/item/Item';
function mapStateToProps(state) {
      return {
            ItemPayload: state.items
      };
}

function mapDispatchToProps(dispatch) {
      return {
            searchChecking: (param) => dispatch(actions.getCheckingAPI(param)),
            changePrintStatus: (param) => dispatch(actions.changePrintStatusAPI(param)),
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

                        <Item {...this.props} />
                  </React.Fragment>
            );
      }
}

export default connect(
      mapStateToProps, mapDispatchToProps
)(ItemContainer);