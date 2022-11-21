import React from 'react';
import s from './Main.module.css';
import cn from 'classnames';

export const Main = () => {
    return (
        <div className={s.wrapper}>
            <div className={cn(s.section, s.filesSection)}>
                Files
            </div>
            <div className={cn(s.section, s.settingsSection)}>
                Settings
            </div>
        </div>
    )
};