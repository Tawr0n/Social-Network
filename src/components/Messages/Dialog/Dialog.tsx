import React, {FC} from 'react';
import s from '../Messages.module.css'
import {NavLink} from "react-router-dom";
import {DialogType, IsActiveType} from "../../../types/types";


const isActive = ({isActive}: IsActiveType) => isActive ? s.dialog_active : s.dialog

type PropsType = {
    dialog: DialogType
}
const Dialog: FC<PropsType> = (props) => {
    return (
        <NavLink className={isActive} to={`/messages/${props.dialog.id}`}>
            <div className={s.avatar}>
                <img src={props.dialog.image} alt=""/>
            </div>
            <div className={s.info}>
                <h3 className={s.name}>{props.dialog.name}</h3>
                <div className={s.text}>{props.dialog.text}</div>
            </div>
        </NavLink>);
};

export default Dialog;
