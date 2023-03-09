import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {InitialAuthStateType, logout} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

type TStateProps = {
    authData: InitialAuthStateType
}

type TDispatchProps = {
    logout: () => void
}


class HeaderContainer extends React.Component<TStateProps & TDispatchProps> {
    render() {
        return <Header authData={this.props.authData} logout={this.props.logout}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    authData: state.auth
})
export default connect<TStateProps, TDispatchProps, {}, AppStateType>(mapStateToProps, {
    logout
})(HeaderContainer)
