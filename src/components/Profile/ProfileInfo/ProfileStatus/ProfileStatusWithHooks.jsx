import React, {useState} from "react";
import s from './ProfileStatus.module.css'

const ProfileStatusWithHooks = (props) => {
    const [status, setStatus] = useState(props.status)
    const [editMode, setEditMode] = useState(false)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (event) => {
        setStatus(event.currentTarget.value)
    }
    return (
        <div className={s.profile__status}>
            {editMode
                ? <input onChange={onStatusChange} onBlur={deactivateEditMode}
                         className={s.status__input} type="text"
                         value={status} autoFocus={true}/>
                :
                <span onDoubleClick={activateEditMode}
                      className={s.status__text}>{props.status || 'Про себе...!'}</span>
            }
        </div>
    )
}

export default ProfileStatusWithHooks
