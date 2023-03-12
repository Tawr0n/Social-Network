import React, {FC, useEffect, useState} from "react";
import s from './ProfileStatus.module.css'
import {useAppDispatch, useAppSelector} from "../../../../redux/reduxStore";
import {getStatus} from "../../../../redux/profileSelectors";
import {updateStatus} from "../../../../redux/profileReducer";

type PropsType = {
    isOwner: boolean
}
const ProfileStatusWithHooks: FC<PropsType> = (props) => {
    const statusProps = useAppSelector(getStatus)
    const dispatch = useAppDispatch()
    // якщо useState проініціалізований, то можна тип не уточнювати
    const [status, setStatus] = useState<string>(statusProps)
    const [editMode, setEditMode] = useState<boolean>(false)
    useEffect(() => {
        setStatus(statusProps)
    }, [statusProps])

    const activateEditMode = () => {
        if (props.isOwner) setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatus(status))
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
                      className={s.status__text}>{statusProps || '❔'}</span>
            }
        </div>
    )
}

export default ProfileStatusWithHooks
