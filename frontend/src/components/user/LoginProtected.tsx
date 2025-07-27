import type React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from "../../pages/user/Login";
import type {  RootState } from "../../Redux/Store/Store"


 export const ProtectedLogin : React.FC = () => {
    const user = useSelector((state :  RootState) => state.user.user)
    return user ? <Navigate to = '/' replace /> : <Login/>

} 

