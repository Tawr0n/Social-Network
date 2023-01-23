import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = ({posts, newPostText, addPost, updateNewPostText}) => {

    const textareaRef = React.createRef()
    const onAddPost = () => {
        addPost()
    }
    const onPostChange = () => {
        const text = textareaRef.current.value
        updateNewPostText(text)
    }
    return (
        <div className={`main__posts ${s.posts}`}>
            <h2 className={s.posts__title}>MyPosts</h2>
            <div>
                 <textarea onChange={onPostChange} value={newPostText} ref={textareaRef}
                           className={s.posts__input}
                           placeholder={'Введіть текст...'}
                           cols="20"
                           rows="3"/>
            </div>
            <div>
                <button onClick={onAddPost} className={s.posts__button}>Відправити</button>
            </div>
            {posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)}
        </div>

    )
}

export default MyPosts
