import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/apiservice";

export default function Login({ setPhone }) {
  const [num, setNum] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser(num);

      if (data.status === "Success") {
        setPhone(num);
        navigate("/otp");
      } else {
        alert("Error: " + (data.error_message || "Something went wrong"));
      }
    } catch (e) {
      const message =
        e.response?.data?.error_message || e.message || "Server Error";
      alert("Error: " + message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F3F5E4] flex items-center justify-center px-[16px]">
      <div className="bg-[#EEF2BD] w-11/12 sm:w-1/2 max-w-[448px] p-[16px] sm:p-[40px] rounded-[24px] border border-[#F2920C] shadow-[0_20px_60px_-15px_rgba(242,146,12,0.12)] transform-gpu hover:-translate-y-1 transition-all">
        <h1 className="text-[34px] font-extrabold text-[#1A1A1A] mb-[12px] text-center">Enter Your Mobile Number</h1>

        <p className="text-[20px] text-[#9CA3AF] mb-[16px] text-center text-[14px]">We will send you a verification code</p>

          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            className="text-[24px] w-full max-w-full box-border bg-gray-100 p-[12px] rounded-[12px] text-[16px] outline-none mb-[16px] focus:ring-2 focus:ring-[#FFB37B]"
          />

          <button
            onClick={handleLogin}
            className="text-[24px] w-full bg-[#F2920C] hover:bg-[#FFB37B] text-white p-[12px] rounded-[12px] font-bold text-[16px] transition-all active:scale-95"
          >
            Send OTP
          </button>

        <p className="mt-[12px] text-[14px] text-[#9CA3AF] text-center">Secure Login • OTP based</p>
      </div>
    </div>
  );
}
