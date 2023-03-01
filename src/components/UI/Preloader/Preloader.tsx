import React from 'react';
import s from './Preloader.module.css'
import preloader from "../../../images/Preloader.svg";
import {FC} from "react";

type PropsType = {}
const Preloader: FC<PropsType> = (props) => {
    return (
        <>
            <img className={s.preloader} src={preloader} alt="loading"/>
        </>
    );
};

export default Preloader;
