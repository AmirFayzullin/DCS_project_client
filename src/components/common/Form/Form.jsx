import React from 'react';
import s from './Form.module.css';

const Form = (props) => {
    return (
        <form {...props}
              onSubmit={props.onSubmit}
              className={s.form}
        >
            {props.children}
        </form>
    )
};

export default Form;