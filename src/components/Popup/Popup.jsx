import React, {useEffect} from 'react';
import cn from 'classnames';
import s from './Popup.module.css';

export const Popup = ({isOpen, close, children}) => {

    useEffect(() => {
        const handleEscKeyup = (e) => {
            if (e.key === "Escape") close();
        };

        document.addEventListener("keyup", handleEscKeyup);

        return () => {
            document.removeEventListener("keyup", handleEscKeyup);
        }
    }, []);

    const handleClick = (e) => {
        if (e.target === e.currentTarget) close();
    };

    return (
        <div className={cn(s.wrapper, {[s.opened]: isOpen})}
             onClick={handleClick}
        >
            {children}
        </div>
    )
};