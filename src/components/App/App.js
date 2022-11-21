import '../../App.css';
import {Header} from "../Header/Header";
import React, {useState} from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import {Main} from "../Main/Main";
import {Login} from "../Login/Login";
import {Register} from "../Register/Register";
import s from './App.module.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleRegister = () => {
    setLoggedIn(true);
  };

  return (
    <div className={s.wrapper}>
      <Header/>
      <Routes>
        <Route index element={
          <ProtectedRoute isAllowed={isLoggedIn}
                          to="/sign-in"
          >
            <Main />
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
    </div>
  );
}

export default App;
