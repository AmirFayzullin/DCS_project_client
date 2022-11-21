import React from 'react';
import s from './Header.module.css'
import {Route, Routes, Link} from 'react-router-dom'
import Button from "../common/Button/Button";

export const Header = ({logOut}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.logo}>
                Logo
            </div>
            <Routes>
                <Route path="/"
                       element={
                           <div className={s.logOutSection}>
                               <Button onClick={() => {logOut()}}>
                                   Log out
                               </Button>
                           </div>
                       }
                />
                <Route path="/sign-up"
                       element={
                           <div className={s.logOutSection}>
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
                           <div className={s.logOutSection}>
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