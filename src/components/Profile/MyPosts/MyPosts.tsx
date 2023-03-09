import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FieldValidatorType, maxLengthCreator, required} from "../../../validators/validators";
import {CustomField} from "../../UI/FormsControls/FormsControls";
import {MyPostsPropsType} from "./MyPostsContainer";

type NewPostFormType = { newPostText: string }

class MyPosts extends React.PureComponent<MyPostsPropsType> {
    render() {
        let {posts, addPost} = this.props;
        const onAddPostSubmit = (formData: NewPostFormType) => {
            addPost(formData.newPostText)
        }
        return (
            <div className={`main__posts ${s.posts}`}>
                <h2 className={s.posts__title}>MyPosts</h2>
                <AddPostReduxForm onSubmit={onAddPostSubmit}/>
                {posts.map(p => <Post post={p} key={p.id}/>)}
            </div>

        )
    }
}

const maxLength: FieldValidatorType = maxLengthCreator(100)

const AddPostForm: React.FC<InjectedFormProps<NewPostFormType>> = (props) => {

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
const AddPostReduxForm = reduxForm<NewPostFormType>({form: 'post'})(AddPostForm)

export default MyPosts
