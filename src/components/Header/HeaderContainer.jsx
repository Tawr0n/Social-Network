import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthorizedUserData} from "../../redux/authReducer";
import {authAPI} from "../../api/api";

class HeaderContainer extends React.Component {
    componentDidMount() {

        authAPI.authMe().then(data => {
            if (data.resultCode === 0) {
                this.props.setAuthorizedUserData(data.data)
            }
        })
    }

    render() {
        return <Header authData={this.props.authData}/>
    }
}

const mapStateToProps = state => ({
    authData: state.auth
})
export default connect(mapStateToProps, {setAuthorizedUserData})(HeaderContainer)
