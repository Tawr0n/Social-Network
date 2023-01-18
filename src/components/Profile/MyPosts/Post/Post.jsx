import s from './Post.module.css'

const Post = () => {
    return (
        <div className={s.post}>
            <div className={s.post__imgBlock}>
                <img src="https://st.depositphotos.com/68991526/58878/v/600/depositphotos_588784556-stock-illustration-golden-snitch-movie-harry-potter.jpg" alt=""/>
            </div>
            <div className={'post__text'}>Hermione Granger</div>
        </div>
    )
}

export default Post
