import React, {useState} from 'react';
import {AuthForm} from "../AuthForm/AuthForm";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";

export const Login = ({handleLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <AuthForm title={"Login"} handleSubmit={handleSubmit}>
            <Input value={email}
                   name="Email"
                   onChange={e => setEmail(e.target.value)}
            />
            <Input value={password}
                   name="Password"
                   type="password"
                   onChange={e => setPassword(e.target.value)}
            />
            <div>

            </div>
            <Button type="submit">
                Login
            </Button>
        </AuthForm>
    )
};