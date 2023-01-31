import React from 'react';
import s from './Preloader.module.css'
import preloader from "../../../images/Preloader.svg";

const Preloader = () => {
    return (
        <>
            <img className={s.preloader} src={preloader} alt="loading"/>
        </>
    );
};

export default Preloader;
