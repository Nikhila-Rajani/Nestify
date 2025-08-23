import React, { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ISignupFormInputs } from '../../Types/authTypes';
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { registerUser, sendOtp } from '../../Api/userApi';
import Button from '../../components/CommonComponents/Button';
import { Eye, EyeOff } from 'lucide-react';
import VerifyOTP from './VerifyOtp';




const Signup : React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('')
  const [showOtpModel, setShowOtpModel] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validationSchema = yup.object({
    fullName: yup
      .string()
      .matches(/^[A-Za-z ]+$/, "Only alphabets and spaces are allowed")
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Must contain at least one special character"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Confirm Password is required"),
    mobile_no: yup
      .string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),

  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISignupFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ISignupFormInputs) => {
    setMessage('')
    try {
      const { success, message: otpMessage } = await sendOtp(data.email, dispatch)
      setMessage(otpMessage)
      if (success) {
        setShowOtpModel(true)
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Failed to send OTP. Please try again.");

    }
  }

  const handleOtpSuccess = async (successMessage: string) => {
    setMessage(successMessage);
    setShowOtpModel(false);
    const data = getValues();
    try {
      await registerUser(
        {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          mobile_no: data.mobile_no,

        },
        dispatch
      );

      setMessage("User registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      setMessage("Error registering user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#D23166]">Create an Account</h2>

        {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <Controller
            name="fullName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded"
              />
            )}
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}

          {/* Email */}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded"
              />
            )}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          {/* Mobile Number */}
          <Controller
            name="mobile_no"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full px-4 py-2 border rounded"
              />
            )}
          />
          {errors.mobile_no && <p className="text-red-500">{errors.mobile_no.message}</p>}

          {/* Password */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded"
              />
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded"
              />
            )}
          />
          <button
           type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          <Button
            type="submit"

            className="w-full bg-[#D23166] hover:bg-[#b61c52] text-white"
          >
            Sign Up
          </Button>
        </form>
          {message && (
              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                <p className="text-center text-sm font-medium text-amber-800 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                  {message}
                </p>
              </div>
            )}

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-sm text-[#D23166] hover:underline">
            Login
          </Link>
        </div>
      </div>
      {showOtpModel && (
        <VerifyOTP
          email={getValues("email")}
          onClose={() => setShowOtpModel(false)}
          onSuccess={handleOtpSuccess}
          show={showOtpModel}
        />
      )}
    </div>
  );
};

export default Signup;




