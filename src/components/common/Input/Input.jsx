import React, {useState} from 'react';
import s from './Input.module.css';

const genID = () => (Math.random() * Math.pow(10, 10)).toFixed(0);

const Input = (props) => {
    const [focused, setFocus] = useState(false);
    const inputRef = React.createRef();
    const inputId = genID();

    return (
        <label className={`${s.wrapper} 
                           ${props.value.length ? s.filled : ""} 
                           ${focused ? s.focused : ''}`}
               htmlFor={inputId}
               style={props.style}
        >
            <input className={s.inputEl}
                   id={inputId}
                   ref={inputRef}
                   onFocus={() => setFocus(true)}
                   onBlur={() => {
                       setFocus(false);
                       document.querySelector('*').scrollTop = 0;
                   }}
                   {...props}
            />
            {
                props.name &&
                <p className={s.placeholder}>{props.name}</p>
            }
        </label>
    )
};

export default Input;