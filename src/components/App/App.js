import '../../App.css';
import {Header} from "../Header/Header";
import React, {useContext, useEffect, useState} from "react";
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import {Main} from "../Main/Main";
import {Login} from "../Login/Login";
import {Register} from "../Register/Register";
import s from './App.module.css';
import {TooltipContainer} from "../Tooltip/TooltipContainer";
import {ApiContext} from "../../contexts/ApiContext";
import {TooltipServiceContext} from "../../contexts/TooltipServiceContext";
import {UserContext} from "../../contexts/UserContext";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const {api} = useContext(ApiContext);
    const {open: openTooltip} = useContext(TooltipServiceContext);

    const [userData, setUserData] = useState({email: ""});

    const navigate = useNavigate();

    const handleLogin = (userData) => {
        api.login(userData)
            .then((data) => {
                // when code !== 0 => deviation from expecting flow on server(e.g.  invalid data)
                if (data.status !== 0) {
                    return openTooltip({
                        message: "Login error: " + data.messages.join(", ")
                    });
                }

                localStorage.setItem("token", data.token);

                setUserData({email: userData.email});
                setLoggedIn(true);
            })
            .catch(err => {
                // server error: status NOT 2xx
                openTooltip({
                    message: "Internal server error"
                });
                console.log(err)
            });
    };

    const handleRegister = (userData) => {
        api.register(userData)
            .then((data) => {
                // when code !== 0 => deviation from expecting flow on server(e.g. user exists)
                if (data.status !== 0) {
                    openTooltip({
                        message: "Error during registration: " + data.messages.join(", ")
                    });
                    return data;
                }

                handleLogin(userData);
            })
            .catch(err => {
                // server error: status NOT 2xx
                openTooltip({
                    message: "Internal server error"
                });
                console.log(err)
            });
    };

    const handleLogOut = () => {
        setLoggedIn(false);
        localStorage.removeItem("token");
    };

    const checkToken = () => {
        const token = localStorage.getItem("token");

        if (!token) return;

        api.me(token)
            .then(data => {
                if (data.status !== 0) {
                    return localStorage.removeItem("token");
                }

                setUserData({
                    email: data.email
                });
                setLoggedIn(true);
            })
            .catch(err => {
                console.log("Error token verifying: ", err);
            })
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <UserContext.Provider value={userData}>
            <div className={s.wrapper}>
                <Header logOut={handleLogOut}/>
                <Routes>
                    <Route index element={
                        <ProtectedRoute isAllowed={isLoggedIn}
                                        to="/sign-in"
                        >
                            <Main/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/sign-in" element={
                        <ProtectedRoute isAllowed={!isLoggedIn}
                                        to="/"
                        >
                            <Login handleLogin={handleLogin}/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/sign-up" element={
                        <ProtectedRoute isAllowed={!isLoggedIn}
                                        to="/"
                        >
                            <Register handleRegister={handleRegister}/>
                        </ProtectedRoute>
                    }/>
                    <Route path="*"
                           element={<Navigate to={isLoggedIn ? "/" : "/sign-in"}/>}
                    />
                </Routes>

                <TooltipContainer/>
            </div>
        </UserContext.Provider>

    );
}

export default App;
