import type { Dispatch } from "redux";
import { createApiInstances } from "../axios/axiosServices";
import { setError, setLoading, setUser } from "../Redux/User/userSlice";
import type { ILoginResponse } from "../Types/authTypes";
import { setOtpExpired, setOtpSent, setOtpVerified } from "../Redux/Otp/OtpSlice";

const api = createApiInstances('user')

export const loginUser = async (
  email: string,
  password: string,
  dispatch: any
): Promise<{ success: boolean; message?: string }> => {
  try {
    dispatch(setLoading());

    const response = await api.post<ILoginResponse>(
      "/login",
      { email, password },
      { withCredentials: true }
    );

    const { user, accessToken, refreshToken } = response.data.data;

    console.log("Login response:", response.data);
    dispatch(
      setUser({
        _id: user._id || "",
        fullName: user.fullName || "",
        email: user.email || "",
        mobile_no: user.mobile_no || "",
        isBlocked : user.isBlocked,
        accessToken,
        refreshToken,
        // isBlocked: user.isBlocked || false
      })
    );

    return { success: true };
  } catch (error:any) {
    console.error(error);
    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again.";

    dispatch(setError("Login failed."));
    return { success: false, message: errorMessage };
  }
};

export const sendOtp = async (email:string,dispatch:Dispatch):Promise<{success:boolean,message:string}> => {
  try {
    dispatch(setLoading())
    const response = await api.post('/otp/send',{email})
    dispatch(setOtpSent(email))
    return {success:true,message:response.data.message||"OTP send successfully"}
  } catch (error:any) {
    console.error("Error sending OTP",error);
    const errorMessage = error.response?.data?.message || "Failed to send OTP . Please try again"
    dispatch(setError(errorMessage))
    return {success:false,message:errorMessage}
  }
} 

export const registerUser = async (
  userData: {
    fullName: string;
    email: string;
    password: string;
    mobile_no: string;
    
  },
  dispatch: any
) => {
  try {
    dispatch(setLoading());
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    dispatch(setError("Error registering user."));
    throw error;
  }
};

// verify
export const verifyOtp = async (
    email: string, 
    otp: string, 
    dispatch: any
  ): Promise<{
    success: boolean;
    message: string;
    expired?: boolean;
  }> => {
    try {
      dispatch(setLoading());
      await api.post('/otp/verify', { email, otp });
      dispatch(setOtpVerified());
      return {
        success: true,
        message: 'OTP verified successfully!'
      };
    } catch (error: any) {
      console.error(error);
      
      if (error.response?.data?.message === 'OTP expired') {
        dispatch(setOtpExpired());
        return {
          success: false,
          message: 'Your OTP has expired. Please resend the OTP.',
          expired: true
        };
      }
      
      dispatch(setError('Error verifying OTP.'));
      return {
        success: false,
        message: 'Error verifying OTP. Please try again.'
      };
    }
  };

// resend otp
  export const resendOtp = async (
    email: string,
    dispatch: any
  ): Promise<{ success: boolean; message: string }> => {
    try {
      dispatch(setLoading());
      
      const response = await api.post('/otp/send', { email });
      
      if (response.data.success) {
        dispatch(setOtpSent(email));
        return {
          success: true,
          message: 'A new OTP has been sent to your email.'
        };
      }
      
      throw new Error(response.data.message || 'Failed to send OTP');
      
    } catch (error: any) {
      console.error('OTP Resend Error:', error);
      
      const errorMessage = error.response?.data?.message 
        || error.message
        || 'Error resending OTP. Please try again.';
      
      dispatch(setError('Error resending OTP.'));
      return {
        success: false,
        message: errorMessage
      };
    }
  };