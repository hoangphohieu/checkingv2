import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/home/Home';
import * as actions from '../actions';

function mapStateToProps(state) {
    return {
        items:state.itemsPartner
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getSumItem:(param)=>dispatch(actions.getSumItem(param)),
        stateStoreHomeToDefault:()=>dispatch(actions.stateStoreHomeToDefault()),
        
        
    };
}

class HomeContainer extends Component {
    render() {
        return (
            <React.Fragment>
                <Home {...this.props}/>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(HomeContainer);