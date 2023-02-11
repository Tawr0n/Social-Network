import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";


const MyPosts = ({posts, addPost}) => {
    const onAddPostSubmit = (formData) => {
        addPost(formData.newPostText)
    }
    return (
        <div className={`main__posts ${s.posts}`}>
            <h2 className={s.posts__title}>MyPosts</h2>
            <AddPostReduxForm onSubmit={onAddPostSubmit} />
            {posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount} key={p.id}/>)}
        </div>

    )
}

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={'textarea'} className={s.posts__input}
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
