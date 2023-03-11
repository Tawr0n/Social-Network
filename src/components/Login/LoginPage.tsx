import React, {FC} from 'react';
import {Navigate} from "react-router-dom";
import s from './Login.module.css'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {CustomField} from "../UI/FormsControls/FormsControls";
import {required} from "../../validators/validators";
import {login} from "../../redux/authReducer";
import {useAppDispatch, useAppSelector} from "../../redux/reduxStore";
import {LoginDataType} from "../../types/types";

type LoginFormOwnProps = { captchaUrl: string | null }
const LoginForm: React.FC<InjectedFormProps<LoginDataType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.login__form}>
            <div>
                <Field validate={[required]} component={CustomField} FieldType={'input'}
                       className={s.login__input} placeholder={'Email'} name={'email'}/>
            </div>
            <div>
                <Field validate={[required]} component={CustomField} FieldType={'input'}
                       className={s.login__input} placeholder={'Password'}
                       name={'password'} type={'password'}/>
            </div>
            <div className={s.login__checkboxBlock}>
                <Field component={CustomField} FieldType={'input'} type={'checkbox'} name={'rememberMe'}/>
                <p className={s.login__checkboxText}>remember me</p>
            </div>
            <div>
                <button className={s.login__button}>Login</button>
            </div>
            {
                props.error && <div className={s.login__error}>
                    {props.error}
                </div>
            }
            {props.captchaUrl &&
                <div className={s.captcha}>
                    <img src={props.captchaUrl} alt="captcha"/>
                    <Field validate={[required]} component={CustomField} FieldType={'input'}
                           className={s.login__input} placeholder={'captcha'}
                           name='captcha'/>
                </div>
            }

        </form>
    )
}

const LoginReduxForm = reduxForm<LoginDataType, LoginFormOwnProps>({
    form: 'login',
})(LoginForm)

type PropsType = {}

export const LoginPage: FC<PropsType> = (props) => {
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const captchaUrl = useAppSelector((state) => state.auth.captchaUrl)
    const dispatch = useAppDispatch()

    const onSubmit = (formData: LoginDataType) => {
        dispatch(login(formData))
    }

    if (isAuth) return <Navigate to='/profile'/>
    return (
        <section className={s.login}>
            <h2 className={s.login__title}>
                Login
            </h2>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </section>
    );
};
