import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import backgroundVideo from "../../assets/backgroundvideo.mp4";
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

function Login() {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  useEffect(() => {
    // Check for success message from registration
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    if (!loginData || !password) {
      setError("من فضلك املأ جميع الحقول");
      return;
    }

    try {
      const res = await axios.post(
        "https://cd-root.com/syarahplus/backend/api/users/login",
        {
          login: loginData.trim(),
          password: password.trim(),
        }
      );

      const token = res.data?.token || res.data?.data?.token || res.data?.access_token;
      
      if (token) {
        const userData = {
          token,
          name: res.data?.data?.name || loginData,
          email: res.data?.data?.email,
          isVerified: res.data?.data?.is_verified === 1
        };

        authLogin(userData);
        setError("");
        setSuccessMessage("تم تسجيل الدخول بنجاح");
        navigate('/');
      } else {
        setError("حدث خطأ في تسجيل الدخول");
      }
    } catch (err) {
      setError(err.response?.data?.message || "فشل تسجيل الدخول");
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="container relative z-10 mx-auto my-10 py-20">
        <div className="w-3/4 md:w-4/6 lg:w-2/5 mx-auto bg-black bg-opacity-60 rounded-2xl py-12">
          <div className="w-3/4 mx-auto text-center">
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-right" role="alert">
                <span className="block sm:inline">{successMessage}</span>
              </div>
            )}

            <input
              type="text"
              placeholder="رقم الهاتف أو اسم المستخدم"
              value={loginData}
              onChange={(e) => setLoginData(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg my-2 text-black ${error ? 'border-red-500' : ''}`}
            />

            <div className="relative my-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg text-black border ${error ? 'border-red-500' : ''}`}
              />
              <span
                className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash size={20} className="text-gray-400" /> : <FaEye size={20} className="text-gray-400" />}
              </span>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3 text-right" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 py-3 rounded-lg mt-5 text-white font-bold hover:bg-blue-700 transition-colors"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
