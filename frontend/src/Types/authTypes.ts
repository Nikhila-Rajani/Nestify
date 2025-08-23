export interface IUser {
    _id: string;
    email: string;
    password?: string;
    fullName: string;
    mobile_no: string
    role?: 'user' | 'admin' | 'host';
    status?: 'active' | 'blocked';
    isBlocked?: boolean;
    isVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    otp?: string;
    refreshToken?: string;
    accessToken?: string;
}
export interface ILoginResponse {
  status: number;
  message: string;
  data: {
    user: IUser;
    accessToken?: string;
    refreshToken?: string;
  };
}

 export interface ISignupFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile_no: string;
}

export interface IGoogleSignInResponse {
  status: number;
  message: string;
  data: IUser;
}

export interface IAxiosError {
    response?: {
      status: any;
      data?: {
        message?: string;
        error?:any
      };

    };
  }