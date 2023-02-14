import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";

class HeaderContainer extends React.Component {
    render() {
        return <Header authData={this.props.authData} logout={this.props.logout}/>
    }
}

const mapStateToProps = state => ({
    authData: state.auth
})
export default connect(mapStateToProps, {logout})(HeaderContainer)
