export interface OtpState {
    email:string | null,
    otpSent : boolean,
    otpVerified : boolean,
    loading : boolean,
    error : string | null,
    otpExpired : boolean
}
export interface OtpModalProps {
  show: boolean
  email: string
  onClose: () => void
  onSuccess: (message: string) => void
}