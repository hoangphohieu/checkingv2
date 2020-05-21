import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';
import Tracking from '../components/Tracking/Tracking';

function mapStateToProps(state) {
    return {
        itemsPayload: state.Tracking
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getOrderByDay: (param) => dispatch(actions.getOrderByDay(param)),
        StateStoreTrackingToDefault: () => dispatch(actions.StateStoreTrackingToDefault()),
        getTrackingMore: (param) => dispatch(actions.getTrackingMore(param)),

        

        
    };
}
class TrackingSearchContainer extends Component {
    render() {
        return (
            <React.Fragment>
                <Tracking {...this.props} />
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(TrackingSearchContainer);