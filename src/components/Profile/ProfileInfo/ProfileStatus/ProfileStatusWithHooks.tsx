import React, {FC, useEffect, useState} from "react";
import s from './ProfileStatus.module.css'

type PropsType = {
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
}
const ProfileStatusWithHooks: FC<PropsType> = (props) => {
    // якщо useState проініціалізований, то можна тип не уточнювати
    const [status, setStatus] = useState<string>(props.status)
    const [editMode, setEditMode] = useState<boolean>(false)
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        if (props.isOwner) setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
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
