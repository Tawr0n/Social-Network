import React from 'react';
import s from './FormsControls.module.css'

export const CustomField = ({input, meta, className, FieldType, ...props}) => {
    debugger
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
