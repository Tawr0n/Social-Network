import React, {useEffect, useState} from "react";
import s from './ProfileStatus.module.css'

const ProfileStatusWithHooks = (props) => {
    const [status, setStatus] = useState(props.status)
    const [editMode, setEditMode] = useState(false)
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

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
            <span className={s.status__title}>Status:</span>
            {editMode
                ? <input onChange={onStatusChange} onBlur={deactivateEditMode}
                         className={s.status__input} type="text"
                         value={status} autoFocus={true}/>
                :
                <span onDoubleClick={activateEditMode}
                      className={s.status__text}>{props.status || '❔'}</span>
            }
        </div>
    )
}

export default ProfileStatusWithHooks
