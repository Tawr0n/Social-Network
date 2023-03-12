import React from "react";
import {Field, Form, Formik} from "formik";
import {FilterType} from "../../redux/usersReducer";
import {useAppSelector} from "../../redux/reduxStore";
import {getUsersFilter} from "../../redux/usersSelectors";

const usersSearchFormValidate = (values: any) => {
    const errors: any = {};
    return errors;
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = 'true' | 'false' | 'null';
type ValuesType = {
    term: string
    friend: FriendFormType
}
export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const filter = useAppSelector(getUsersFilter)
    const submit = (values: ValuesType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {

        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
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
