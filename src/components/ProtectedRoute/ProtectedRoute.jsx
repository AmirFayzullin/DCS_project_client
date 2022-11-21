import React from 'react';
import {Navigate} from 'react-router-dom'

export const ProtectedRoute = ({children, isAllowed, to}) => {
    return isAllowed ? children : <Navigate to={to}/>
};