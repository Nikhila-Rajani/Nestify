// import React, { useState, type FormEvent } from 'react';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../../Api/userApi';
// import { useDispatch } from 'react-redux';
// import { motion, AnimatePresence } from "framer-motion"
// import { ArrowRight, Loader2, User } from 'lucide-react'
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
// import api from '../../axios/userInstances';
// import { setLoadingAction, setUser } from '../../Redux/User/userSlice';
// import type { IGoogleSignInResponse } from '../../Types/authTypes';
// import app from "../../fireBaseAuthentication/config"
// import ForgotPasswordModel from './ForgotPassword';




// const Login: React.FC = () => {

//   const [email, setEmail] = useState('')
//   const [password, setPassswod] = useState('')
//   const [error, setError] = useState({ email: "", password: "" })
//   const [message, setMessage] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [showForgotPassword, setShowForgotPassword] = useState(false)
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const validateForm = () => {
//     let valid = true
//     const newErrors = { email: "", password: "" }

//     if (!email) {
//       newErrors.email = "Email is required"
//       valid = false
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       newErrors.email = "Invalid email format"
//       valid = false
//     }

//     if (!password) {
//       newErrors.password = "Password is required"
//       valid = false
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters long"
//       valid = false
//     }

//     setError(newErrors)
//     return valid
//   }

//   const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setMessage("")
//     if (!validateForm()) return

//     setLoading(true)
//     const { success, message } = await loginUser(email, password, dispatch)

//     if (success) {
//       toast.success("Login successful!")
//       navigate("/")
//     } else if (message) {
//       setMessage(message)
//     }
//     setLoading(false)
//   }


//   const handleGoogleSignIn = async () => {
//     const auth = getAuth(app)
//     const provider = new GoogleAuthProvider()

//     try {
//       setIsGoogleLoading(true)
//       dispatch(setLoadingAction())

//       const result = await signInWithPopup(auth, provider)
//       const idToken = await result.user.getIdToken()

//       const response: any = await api.post<IGoogleSignInResponse>("/google", { idToken }, { withCredentials: true })

//       const { user, accessToken, refreshToken } = response.data.data

//       if (user) {
//         dispatch(
//           setUser({
//             _id: user.id || "",
//             fullName: user.name || "",
//             email: user.email || "",
//             mobile_no: user.mobile_no || "",
//             accessToken,
//             refreshToken,
//           }),
//         )

//         toast.success("Google Sign-In successful!")
//         navigate("/")
//       } else {
//         throw new Error("Invalid user data received")
//       }
//     } catch (error: any) {
//       console.error("Google Sign-In Error:", error)
//       const errorMessage = error.response?.data?.message || "Google Sign-In failed. Please try again."
//       setError({ email: errorMessage, password: "" })

//       toast.error(errorMessage)
//     } finally {
//       setIsGoogleLoading(false)
//     }
//   }
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Navigation Bar */}
//       <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
//         <div className="text-xl font-bold text-gray-800">Logo</div>
//         <div className="flex gap-6">
//           <a href="#" className="text-gray-600 hover:text-gray-900">Homes</a>
//           <a href="#" className="text-gray-600 hover:text-gray-900">Experiences</a>
//           <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="flex flex-1 p-8 gap-8">
//         {/* Left Side - Authentication */}
//         <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
//           <div className="flex items-center gap-2 mb-6">
//             <span className="text-gray-600">Short Name an account</span>
//             <a href="/signup" className="text-blue-500 hover:text-blue-700 font-medium">Sign Up</a>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-4">
//             <div className="space-y-2">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

//               />
//               <AnimatePresence>
//                 {error.email && (
//                   <motion.p
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="text-red-500 text-sm flex items-center gap-1"
//                   >
//                     {error.email}
//                   </motion.p>
//                 )}
//               </AnimatePresence>
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassswod(e.target.value)}

//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <span>Remember me</span>
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => setShowForgotPassword(true)}
//                   className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
//                 >
//                   Forgot password?
//                 </button>
//                 {/* <a href="" className="text-sm text-blue-500 hover:text-blue-700 block text-right">Forgot password?</a> */}
//               </div>
//             </div>
//             {/* <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 name="rememberMe"
//                 checked={authForm.rememberMe}
//                 onChange={handleInputChange}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">Keep me logged in</label>
//             </div> */}

//             <motion.button
//               type="submit"
//               disabled={loading}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <>
//                   Sign In
//                   <ArrowRight className="w-5 h-5" />
//                 </>
//               )}
//             </motion.button>
//           </form>
//           {/* Divider */}
//           <motion.div variants={itemVariants} className="my-8">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-200"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-white text-gray-500">Or continue with</span>
//               </div>
//             </div>
//           </motion.div>

//           {/* Social Login & Register */}
//           <motion.div variants={itemVariants} className="space-y-4">
//             <motion.button
//               onClick={handleGoogleSignIn}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {isGoogleLoading ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <>
//                   <svg className="w-5 h-5" viewBox="0 0 24 24">
//                     <path
//                       fill="#4285F4"
//                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                     />
//                     <path
//                       fill="#34A853"
//                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                     />
//                     <path
//                       fill="#FBBC05"
//                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                     />
//                     <path
//                       fill="#EA4335"
//                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                     />
//                   </svg>
//                   Continue with Google
//                 </>
//               )}
//             </motion.button>

//             <motion.button
//               type="button"
//               onClick={() => navigate("/signup")}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full bg-transparent border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
//             >
//               <User className="w-5 h-5" />
//               Create New Account
//             </motion.button>
//           </motion.div>

//           {/* Error Message */}
//           <AnimatePresence>
//             {message && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl"
//               >
//                 <p className="text-red-600 text-sm text-center">{message}</p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Right Side - Content */}
//         <div className="flex-1">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


//           </div>
//         </div>
//       </div>
//       <ForgotPasswordModel show={showForgotPassword} onClose={() => setShowForgotPassword(false)} role={"user"} />
//       {/* Footer */}
//       <footer className="bg-white border-t border-gray-200">
//         <div className="px-8 py-6 flex flex-wrap gap-6 justify-center">
//           <a href="#" className="text-gray-600 hover:text-gray-900">Support</a>
//           <a href="#" className="text-gray-600 hover:text-gray-900">Community</a>
//           <a href="#" className="text-gray-600 hover:text-gray-900">Heritage</a>
//           <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
//           <a href="#" className="text-gray-600 hover:text-gray-900">Handicollen</a>
//         </div>
//         <div className="px-8 py-4 text-center text-sm text-gray-500">
//           <p>@2022 Mark Me... <a href="#" className="text-blue-500 hover:text-blue-700">Privacy</a> - <a href="#" className="text-blue-500 hover:text-blue-700">Terms</a> - <a href="#" className="text-blue-500 hover:text-blue-700">Sitemap</a></p>
//         </div>

//       </footer>
//     </div>
//   );
// };

// export default Login;


import React, { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Api/userApi';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, User } from 'lucide-react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import api from '../../axios/userInstances';
import { setLoadingAction, setUser } from '../../Redux/User/userSlice';
import type { IGoogleSignInResponse } from '../../Types/authTypes';
import app from "../../fireBaseAuthentication/config";
import ForgotPasswordModel from './ForgotPassword';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassswod] = useState('');
  const [error, setError] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setError(newErrors);
    return valid;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    if (!validateForm()) return;

    setLoading(true);
    const { success, message } = await loginUser(email, password, dispatch);

    if (success) {
      toast.success("Login successful!");
      navigate("/");
    } else if (message) {
      setMessage(message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      setIsGoogleLoading(true);
      dispatch(setLoadingAction());

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response: any = await api.post<IGoogleSignInResponse>("/google", { idToken }, { withCredentials: true });

      const { user, accessToken, refreshToken } = response.data.data;

      if (user) {
        dispatch(
          setUser({
            _id: user.id || "",
            fullName: user.name || "",
            email: user.email || "",
            mobile_no: user.mobile_no || "",
            accessToken,
            refreshToken,
          }),
        );

        toast.success("Google Sign-In successful!");
        navigate("/");
      } else {
        throw new Error("Invalid user data received");
      }
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      const errorMessage = error.response?.data?.message || "Google Sign-In failed. Please try again.";
      setError({ email: errorMessage, password: "" });

      toast.error(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-50">
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-between items-center px-6 py-4 bg-white shadow-lg"
      >
        <div className="text-2xl font-bold text-blue-900">Nestify</div>
        <div className="flex gap-8">
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Homes</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Experiences</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Services</a>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-extrabold text-blue-900 mb-3 text-center">Welcome Back to Nestify</h2>
          <p className="text-gray-500 mb-6 text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">Sign Up</a>
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div variants={itemVariants} initial="hidden" animate="visible">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50"
                placeholder="you@example.com"
              />
              <AnimatePresence>
                {error.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    {error.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassswod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50"
                placeholder="••••••"
              />
              <AnimatePresence>
                {error.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  >
                    {error.password}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
                >
                  Forgot Password?
                </button>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="my-6 relative"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="space-y-4">
            <motion.button
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full bg-white border-2 border-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              onClick={() => navigate("/signup")}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full bg-transparent border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              Create New Account
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-red-600 text-sm text-center">{message}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <ForgotPasswordModel show={showForgotPassword} onClose={() => setShowForgotPassword(false)} role={"user"} />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="bg-white border-t border-gray-200 py-6"
      >
        <div className="px-6 flex flex-wrap gap-6 justify-center">
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Support</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Community</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Heritage</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">About</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Handicollen</a>
        </div>
        <div className="px-6 py-4 text-center text-sm text-gray-500">
          <p>© 2025 Nestify. <a href="#" className="text-blue-600 hover:text-blue-800">Privacy</a> - <a href="#" className="text-blue-600 hover:text-blue-800">Terms</a> - <a href="#" className="text-blue-600 hover:text-blue-800">Sitemap</a></p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Login;

