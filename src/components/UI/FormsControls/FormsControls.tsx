import React from 'react';
import {WrappedFieldProps} from 'redux-form';
import s from './FormsControls.module.css'
import {FieldValidatorType} from "../../../validators/validators";

type PropsType = {
    FieldType: React.ElementType,
    validate: Array<FieldValidatorType>
} & React.HTMLAttributes<HTMLDivElement>
export const CustomField: React.FC<WrappedFieldProps & PropsType> = ({
                                                                         input,
                                                                         meta,
                                                                         className,
                                                                         FieldType,
                                                                         ...props
                                                                     }) => {
    const hasError = meta.error && meta.touched
    return (
        <>
            <FieldType {...input} {...props}
                       className={hasError ? `${className} ${s.formControl__textarea_error}` : className}
            />
            {hasError && <p className={s.formControl__error}>{meta.error}</p>}
        </>
    );
};
