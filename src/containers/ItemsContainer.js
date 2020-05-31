import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Items from '../components/Items/Items'; 
function mapStateToProps(state) {
      return {
            ItemReducer: state.ItemsReducer
      };
}

function mapDispatchToProps(dispatch) {
      return {
            patchItem: (param) => dispatch(actions.patchItem_ControlItems(param)),
            deleteItem: (param) => dispatch(actions.CI_deleteItem(param)),
            searchChecking: (param) => dispatch(actions.getCheckingControlItem(param)),
            updatePcPro: (param) => dispatch(actions.CI_updatePcPro(param)),
            propsItemsToDefault: () => dispatch(actions.propsControlItemsToDefault()),

  

      };
}

class ItemsContainer extends Component {
      render() {

            return (
                  <React.Fragment>

                        <Items {...this.props} />
                  </React.Fragment>
            );
      }
}

export default connect(
      mapStateToProps, mapDispatchToProps
)(ItemsContainer);