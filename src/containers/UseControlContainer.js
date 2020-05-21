import React, { Component } from 'react';
import { connect } from 'react-redux';
import UseControl from './../components/useControl/UseControl';
import * as actions from './../actions';

function mapStateToProps(state) {
    return {
        itemsPayload: state.UseData
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getUse: (param) => dispatch(actions.getUseAPI(param)),
        setStateStoreToDefault: () => dispatch(actions.setStateUserToDefault()),
        getListUser: (param) => dispatch(actions.getListUserAPI(param)),
        userGetListById: (param) => dispatch(actions.userGetListById(param)),
        changeUserProperties: (param) => dispatch(actions.changeUserPropertiesAPI(param)),
        createUser: (param) => dispatch(actions.createUser(param)),
        deleteUser: (param) => dispatch(actions.deleteUser(param)),
        getSumItem:(param)=>dispatch(actions.getSumItem(param))

    };
}

class UseControlContainer extends Component {
    render() {
        return (
            <React.Fragment>
                <UseControl {...this.props} />
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(UseControlContainer);