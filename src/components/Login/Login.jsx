import React from 'react';
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const Login = ({isAuth}) => {
    if (isAuth) return <Navigate to='/profile'/>
    return (
        <h2>
            Login
        </h2>
    );
};


const mapDispatchToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapDispatchToProps, {})(Login);
