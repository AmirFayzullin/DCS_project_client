import React, {useContext, useState} from 'react';
import {AuthForm} from "../AuthForm/AuthForm";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import {TooltipServiceContext} from "../../contexts/TooltipServiceContext";

export const Register = ({handleRegister}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');

    const {open: openTooltip} = useContext(TooltipServiceContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || password !== repPassword) {
            let message = "Invalid email or password";
            if (password !== repPassword) message = "Passwords aren't same";

            openTooltip({message});

            return;
        }
        handleRegister({email, password});
    };

    return (
        <AuthForm title={"Registration"} handleSubmit={handleSubmit}>
            <Input value={email}
                   name="Email"
                   type="email"
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