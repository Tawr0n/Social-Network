import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/reduxStore";

type TStateProps = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): TStateProps => ({
    isAuth: state.auth.isAuth
})

function withAuthRedirect<Props extends TStateProps>(Component: React.ComponentType<Props>) {
    const RedirectComponent: React.FC<TStateProps> = (props) => {
        if (!props.isAuth) return <Navigate to='/login'/>
        return <Component {...props as Props}/>
    };

    return connect<TStateProps, {}, Props, AppStateType>(mapStateToProps)(RedirectComponent)
}

export default withAuthRedirect;
