import React, {FC} from "react";
import s from "./ProfileDataForm.module.css";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {CustomField} from "../../../UI/FormsControls/FormsControls";
import classNames from "classnames";
import {ContactPropsType, ProfileType} from "../../../../types/types";

type PropsType = {
    profile: ProfileType
    setEditMode: (editMode: boolean) => void
    error?: string
}
const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({
                                                                                        profile,
                                                                                        setEditMode,
                                                                                        error,
                                                                                        ...props
                                                                                    }) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.info}>
            <div className={s.info__list}>
                <div className={s.info__item}>
                    <span className={s.item__title}>Full name:</span>
                    <Field component={CustomField} name='fullName' FieldType='input'
                           className={s.item__input} placeholder='full name'/>
                </div>
                <div className={s.info__item}>
                    <span className={s.item__title}>About me:</span>
                    <Field component={CustomField} name='aboutMe' FieldType='input'
                           className={s.item__input} placeholder='about me'/>
                </div>
                <div className={s.info__item}>
                    <span className={s.item__title}>My technology stack:</span>
                    <Field component={CustomField} name='lookingForAJobDescription' FieldType='input'
                           className={s.item__input} placeholder='my technology stack'/>
                </div>
                <div className={classNames(s.info__item, s.info__item_checkbox)}>
                    <Field component={CustomField} name='lookingForAJob' FieldType='input' type='checkbox'
                           className={s.item__checkbox}/>
                    <span
                        className={classNames(s.item__title, s.item__title_checkbox)}>looking for a job</span>
                </div>
                <div className={s.info__item}>
                    <div className={s.contacts__title}>
                        <span className={s.item__title}>Contacts:</span>
                    </div>
                    <ul className={s.contacts__list}>
                        {Object.keys(profile.contacts)
                            .map(key => <Contact contactTitle={key} key={key}/>
                            )}
                    </ul>
                </div>
                {
                    error && <div className={s.info__error}>
                        {error}
                    </div>
                }
            </div>

            <div className={s.info__buttons}>
                <button className={s.info__button}>Save</button>
                <div onClick={() => setEditMode(false)}
                     className={classNames(s.info__button, s.info__button_cancel)}>Cancel
                </div>
            </div>

        </form>
    )
}

const Contact: FC<ContactPropsType> = ({contactTitle}) => {
    return (
        <li className={s.contacts__item}>
            <div className={s.contacts__itemBlock}>
                <Field component={CustomField} name={`contacts.${contactTitle}`} FieldType='input'
                       className={s.contacts__input} placeholder={contactTitle}/>
                <span className={s.contacts__text}>{contactTitle}</span>
            </div>
        </li>
    );
};

// параметри enableReinitialize: true, destroyOnUnmount: false (допомагають, якщо є Strict.mode)
const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({form: 'profileData'})(ProfileDataForm)

export default ProfileDataReduxForm;
