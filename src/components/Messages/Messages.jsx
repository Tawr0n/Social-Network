import React from 'react';
import s from './Messages.module.css'
import {NavLink} from "react-router-dom";

const Messages = () => {
    return (
        <section className={s.section}>
            <div className={s.dialogs}>
                <NavLink to={'/messages/1'}>
                    <div className={s.dialog + ' ' + s.dialog_active}>
                        <div className={s.avatar}>
                            <img src="" alt=""/>
                        </div>
                        <div className={s.info}>
                            <h3 className={s.name}>Албус</h3>
                            <div className={s.text}>Прибуду о 20:00 у суботу</div>
                        </div>
                    </div>
                </NavLink>
                <NavLink to={'/messages/2'}>
                    <div className={s.dialog}>
                        <div className={s.avatar}>
                            <img src="" alt=""/>
                        </div>
                        <div className={s.info}>
                            <h3 className={s.name}>Северус</h3>
                            <div className={s.text}>І не забудь.</div>
                        </div>
                    </div>
                </NavLink>
                <NavLink to={'/messages/3'}>
                    <div className={s.dialog}>
                        <div className={s.avatar}>
                            <img src="" alt=""/>
                        </div>
                        <div className={s.info}>
                            <h3 className={s.name}>Рон</h3>
                            <span className={s.text}>Як життя, старий?</span>
                        </div>
                    </div>
                </NavLink>
            </div>

            <div className={s.messages}>
                <div className={s.message}>Експеліармус</div>
                <div className={s.message}>Акціо</div>
            </div>
        </section>
    );
};

export default Messages;
