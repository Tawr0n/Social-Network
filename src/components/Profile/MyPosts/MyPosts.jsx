import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../validators/validators";
import {CustomField} from "../../UI/FormsControls/FormsControls";

const MyPosts = ({posts, addPost}) => {
    const onAddPostSubmit = (formData) => {
        addPost(formData.newPostText)
    }
    return (
        <div className={`main__posts ${s.posts}`}>
            <h2 className={s.posts__title}>MyPosts</h2>
            <AddPostReduxForm onSubmit={onAddPostSubmit}/>
            {posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount} key={p.id}/>)}
        </div>

    )
}
const maxLength = maxLengthCreator(10)
const AddPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required, maxLength]} name={'newPostText'} component={CustomField}
                       className={s.posts__input} FieldType={'textarea'}
                       placeholder={'Введіть текст...'} cols="20" rows="3"/>
            </div>
            <div>
                <button className={s.posts__button}>Відправити</button>
            </div>
        </form>
    )
}
const AddPostReduxForm = reduxForm({form: 'post'})(AddPostForm)

export default MyPosts
