import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div className={`main__posts ${s.posts}`}>
            <h2 className={s.posts__title}>MyPosts</h2>
            <div>
                 <textarea className={s.posts__input} placeholder={'Введіть текст...'} cols="20"
                           rows="3"/>
            </div>
            <div>
                <button className={s.posts__button}>Відправити</button>
            </div>
            <Post message={'Слизерин'} likesCount={41}/>
            <Post message={'Рейвенклов'} likesCount={59}/>

        </div>

    )
}

export default MyPosts
