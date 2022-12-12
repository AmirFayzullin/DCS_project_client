import React from 'react';
import s from './SliderInput.module.css';

export const SliderInput = ({className, value, min, max, step, ...props}) => {
    return (
        <div className={s.wrapper}>
            <input type="range"
                   className={s.input}
                   min={min}
                   max={max}
                   step={step}
                   value={value}
                   {...props}
            />
            <div className={s.progress} style={{width: `calc(${value/max*100}% - 16px*${value/max} + 2px)`}}>

            </div>
        </div>
    )
};