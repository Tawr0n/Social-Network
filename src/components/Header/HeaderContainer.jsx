import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {authMe} from "../../redux/authReducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.authMe()
    }

    render() {
        return <Header authData={this.props.authData}/>
    }
}

const mapStateToProps = state => ({
    authData: state.auth
})
export default connect(mapStateToProps, {authMe})(HeaderContainer)
