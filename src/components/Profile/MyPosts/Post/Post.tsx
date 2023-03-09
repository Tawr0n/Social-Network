import s from './Post.module.css'
import {PostType} from "../../../../types/types";
import {FC} from "react";


type PropsType = {
    post: PostType
}
const Post: FC<PropsType> = ({post}) => {
    return (
        <div className={s.post}>
            <div className={s.post__avatar}>
                <img
                    src="https://st.depositphotos.com/68991526/58878/v/600/depositphotos_588784556-stock-illustration-golden-snitch-movie-harry-potter.jpg"
                    alt=""/>
            </div>
            <div className={s.post__info}>
                <p className={'post__message'}>{post.message}</p>
                <p className={'post__likes'}>Вподобайка - {post.likesCount}</p>
            </div>
        </div>
    )
}

export default Post
