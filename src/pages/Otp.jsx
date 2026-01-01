import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Otp({ phone }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    if (otp.trim().length >= 4) {
      navigate("/home");
    } else {
      alert("Please enter a valid OTP");
    }
  };

  return (
  <div className="min-h-screen w-full bg-[#F3F5E4] flex items-center justify-center px-[16px]">
    <div className="bg-[#EEF2BD] w-11/12 sm:w-1/2 max-w-[448px] p-[16px] sm:p-[40px] rounded-[24px] border border-[#F2920C] shadow-[0_20px_60px_-15px_rgba(242,146,12,0.12)] transform-gpu hover:-translate-y-1 transition-all">
        <h1 className="text-[34px] font-extrabold text-[#1A1A1A] mb-[12px] text-center">OTP Verification</h1>

        <p className="text-[20px] text-[#9CA3AF] mb-[16px] text-center text-[14px]">Enter the verification code we sent you on your phone number</p>

        <div className="flex flex-col">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="text-[24px] w-full max-w-full box-border bg-gray-50 border border-gray-100 p-[12px] rounded-[12px] text-[16px] outline-none focus:ring-2 focus:ring-[#FFB37B] mb-[16px]"
          />

          <button
            onClick={handleVerify}
            className="text-[24px] w-full bg-[#F2920C] hover:bg-[#FFB37B] text-white p-[12px] rounded-[12px] font-bold text-[16px] shadow-lg active:scale-[0.98] transition-all"
          >
            Verify OTP
          </button>
        </div>

        <p className="mt-[14px] text-[12px] text-[#9CA3AF] text-center">Secure Verification</p>
      </div>
    </div>
  );
}
