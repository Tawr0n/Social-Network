import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div className={'main__posts posts'}>
            <h2 className={'posts__title'}>MyPosts</h2>
            <textarea className={'posts__input'} placeholder={'Введіть текст...'} cols="20"
                      rows="3"/>
            <button className={'posts__button'}>Відправити</button>
            <Post message={'Слизерин'} likesCount={41}/>
            <Post message={'Рейвенклов'} likesCount={59}/>

        </div>

    )
}

export default MyPosts
