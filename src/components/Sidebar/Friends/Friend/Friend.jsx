import s from '../Friends.module.css'

const Friend = (props) => {
    return (
        <div className={s.friend}>
            <div className={s.friend__avatar}>
                <img src={props.image} alt="ava"/>
            </div>
            <div className={s.friend__fullName}>{props.name}</div>
        </div>
    )
}

export default Friend
