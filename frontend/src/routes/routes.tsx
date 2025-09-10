
import { Route } from 'react-router-dom';
import Home from '../pages/user/Home';
import { ProtectedLogin } from '../components/user/LoginProtected';
import { UserProtected } from '../components/user/UserProtected';
import Signup from '../pages/user/SignUp';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashBoard from '../pages/admin/AdimnDashboard';
import AdminLayOut from '../components/admin/AdminLayOut';
import UserList from '../pages/admin/UserList';
import HostHome from '../pages/host/HostHome';



export const routes = (

    <>
        {/* common */}
        <Route path="/login" element={<ProtectedLogin />} />
        <Route path='/admin/login' element = {< AdminLogin/>} />

        {/* user */}
        <Route element={<UserProtected />}>
            <Route path="/" element={<Home />} />
        </Route>
         <Route path="/signup" element={<Signup />} />
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}

        {/* admin */}
        <Route path='/admin/dashboard' element = {<AdminDashBoard/>} />
        <Route  element = {<AdminLayOut/>}   >
        <Route path='/admin/users' element= {<UserList/>} />
        </Route>

        {/* Host */}
        <Route path="/host" element={<HostHome />} />

    </>
);
