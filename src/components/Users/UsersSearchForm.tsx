import React from "react";
import {Field, Form, Formik} from "formik";
import {FilterType} from "../../redux/usersReducer";

const usersSearchFormValidate = (values: any) => {
    const errors: any = {};
    return errors;
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type ValuesType = {
    term: string
    friend: string
}
export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: ValuesType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {

        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        props.onFilterChanged(filter)
        debugger
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{term: '', friend: 'null'}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <Field name="friend" as="select" className="my-select">
                            <option value="null">All users</option>
                            <option value="true">Only followed users</option>
                            <option value="false">Only unfollowed users</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
