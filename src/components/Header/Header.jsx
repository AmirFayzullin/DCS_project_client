import React, {useContext} from 'react';
import s from './Header.module.css'
import {Route, Routes, Link} from 'react-router-dom'
import Button from "../common/Button/Button";
import {UserContext} from "../../contexts/UserContext";

export const Header = ({logOut}) => {
    const userData = useContext(UserContext);

    return (
        <div className={s.wrapper}>
            <div className={s.logo}>
                Logo
            </div>
            <Routes>
                <Route path="/"
                       element={
                           <div className={s.contextSection}>
                               <p>{userData.email}</p>
                               <Button onClick={() => {
                                   logOut()
                               }}>
                                   Log out
                               </Button>
                           </div>
                       }
                />
                <Route path="/sign-up"
                       element={
                           <div className={s.contextSection}>
                               <Link to="/sign-in">
                                   <p>
                                       Sign in
                                   </p>
                               </Link>
                           </div>
                       }
                />
                <Route path="/sign-in"
                       element={
                           <div className={s.contextSection}>
                               <Link to="/sign-up">
                                   <p>
                                       Sign up
                                   </p>
                               </Link>
                           </div>
                       }
                />
            </Routes>
        </div>
    )
};