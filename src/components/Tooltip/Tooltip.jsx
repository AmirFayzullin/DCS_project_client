import React from 'react';
import s from './Tooltip.module.css';
import {Popup} from "../Popup/Popup";

export const Tooltip = ({message, isOpen, close}) => {
    return (
        <Popup isOpen={isOpen} close={close}>
            <div className={s.wrapper}>
                <p className={s.message}>
                    {message}
                </p>
            </div>
        </Popup>
    )
};