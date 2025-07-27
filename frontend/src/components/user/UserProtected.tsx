import { useSelector } from "react-redux"
import type { RootState } from "../../Redux/Store/Store"
import { Navigate, Outlet } from "react-router-dom"

export const UserProtected : React.FC = () => {
    const user = useSelector ((state:RootState)=> state.user)
    return user ? <Outlet/> : <Navigate to= '/login'/>
}