import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ControlItems from '../components/controlItems/ControlItems';
function mapStateToProps(state) {
      return {
            ItemReducer: state.ControlItemsReducer
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

class ControlitemsContainer extends Component {
      render() {

            return (
                  <React.Fragment>

                        <ControlItems {...this.props} />
                  </React.Fragment>
            );
      }
}

export default connect(
      mapStateToProps, mapDispatchToProps
)(ControlitemsContainer);