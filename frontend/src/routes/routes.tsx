
import { Route } from 'react-router-dom';
import Home from '../pages/user/Home';
import { ProtectedLogin } from '../components/user/LoginProtected';
import { UserProtected } from '../components/user/UserProtected';


export const routes = (

    <>
        {/* common */}
        <Route path="/login" element={<ProtectedLogin />} />

        {/* user */}
        <Route element={<UserProtected />}>
            <Route path="/" element={<Home />} />
        </Route>
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}
    </>
);
