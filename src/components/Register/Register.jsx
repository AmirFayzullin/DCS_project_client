import React, {useState} from 'react';
import {AuthForm} from "../AuthForm/AuthForm";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";

export const Register = ({handleRegister}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister();
    };

    return (
        <AuthForm title={"Registration"} handleSubmit={handleSubmit}>
            <Input value={email}
                   name="Email"
                   onChange={e => setEmail(e.target.value)}
            />
            <Input value={password}
                   name="Password"
                   type="password"
                   onChange={e => setPassword(e.target.value)}
            />
            <Input value={repPassword}
                   name="Repeated password"
                   type="password"
                   onChange={e => setRepPassword(e.target.value)}
            />
            <div>

            </div>
            <Button type="submit">
                Register
            </Button>
        </AuthForm>
    )
};