import React from 'react';
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import s from './Login.module.css'
import {Field, reduxForm} from "redux-form";
import {CustomField} from "../UI/FormsControls/FormsControls";
import {required} from "../../validators/validators";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.login__form}>
            <div>
                <Field validate={[required]} component={CustomField} FieldType={'input'} className={s.login__input} placeholder={'Login'} name={'login'}/>
            </div>
            <div>
                <Field validate={[required]} component={CustomField} FieldType={'input'} className={s.login__input} placeholder={'Password'}
                       name={'password'}/>
            </div>
            <div className={s.login__checkboxBlock}>
                <Field component={CustomField} FieldType={'input'} type={'checkbox'} name={'rememberMe'}/>
                <p className={s.login__checkboxText}>remember me</p>
            </div>
            <div>
                <button className={s.login__button}>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login',
})(LoginForm)

const Login = ({isAuth}) => {
    // if (isAuth) return <Navigate to='/profile'/>
    const onSubmit = (formData) => {
        console.log(formData)
    }
    return (
        <section className={s.login}>
            <h2 className={s.login__title}>
                Login
            </h2>
            <LoginReduxForm onSubmit={onSubmit}/>
        </section>
    );
};


const mapDispatchToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapDispatchToProps, {})(Login);
