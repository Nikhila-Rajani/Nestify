import React, { useEffect, useRef, useState } from 'react';
import type { OtpModalProps } from '../../Types/otpType';
import { useDispatch } from 'react-redux';
import { resendOtp, verifyOtp } from '../../Api/userApi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { RefreshCw } from 'lucide-react';


const VerifyOTP: React.FC<OtpModalProps> = ({ email, show, onClose, onSuccess }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [resendMsg, setResendMsg] = useState(false)
  const [timer, setTimer] = useState(60);
  const dispatch = useDispatch();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])


  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpString = otp

    if (otpString.length !== 6) {
      setMessage("Please enter all 6 digits")
      return
    }

    const { success, message } = await verifyOtp(email, otpString, dispatch)

    if (success) {
      onSuccess(message)
      onClose()
    } else {
      setMessage(message)
    }
  }

  const handleResend = async () => {
    setMessage("")
    setResendMsg(true)
    setTimer(60)

    const { success, message } = await resendOtp(email, dispatch)

    setMessage(message)
    setResendMsg(false)

    if (!success) {
      setTimer(0)
    } else {
      // Clear OTP inputs and focus first one
      setOtp("")
      inputRefs.current[0]?.focus()
    }
  };
  if (!show) return null
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#D23166]">Verify OTP</h2>

        {/* {error && <p className="text-red-500 text-center mb-2">{error}</p>} */}
        {message && <p className="text-green-500 text-center mb-2">{message}</p>}
        {resendMsg && <p className="text-green-600 text-center mb-2">{resendMsg}</p>}

        <form onSubmit={handleVerify} className="space-y-4">
          <Input
            label="Enter OTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Button type="submit" className="w-full bg-[#D23166] hover:bg-[#b61c52] text-white">
            Verify
          </Button>
        </form>

        <div className="mt-4 text-center">
          {timer > 0 ? (
            <p className="text-gray-500">Resend OTP in {timer} seconds</p>
          ) : (
            <button
              type='button'
              disabled={resendMsg}
              onClick={handleResend}
              className="text-[#D23166] font-semibold hover:underline"
            >
              {resendMsg ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Resend Code
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
