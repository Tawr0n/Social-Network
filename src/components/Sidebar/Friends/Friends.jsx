import s from './Friends.module.css'
import Friend from "./Friend/Friend";

const Friends = ({friends}) => {
    return (
        <div className={s.friends}>
            <h2 className={s.friends__title}>Friends</h2>
            <div className={s.friends__list}>
                {friends.map(friend => <Friend id={friend.id} name={friend.name} image={friend.image}/>)}
            </div>
        </div>
    )
}

export default Friends
