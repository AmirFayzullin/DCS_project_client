import React from 'react';
import s from './AuthForm.module.css';
import Form from "../common/Form/Form";

export const AuthForm = ({title, children, handleSubmit}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.title}>
                    {title}
                </div>
                <Form onSubmit={handleSubmit}>
                    {children}
                </Form>
            </div>
        </div>
    )
};