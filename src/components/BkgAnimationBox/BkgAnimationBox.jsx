import React from 'react';
import s from './BkgAnimationBox.module.css';

export const BkgAnimationBox = (props) => {
    return (
        <>
            <ul className={`${s.circles} ${props.toShow ? "" : s.hidden}`}>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
            </ul>
        </>
    )
};
