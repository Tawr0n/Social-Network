import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthorizedUserData} from "../../redux/authReducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        })
            .then( response => {
                if (response.data.resultCode === 0) {
                    this.props.setAuthorizedUserData(response.data.data)
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
