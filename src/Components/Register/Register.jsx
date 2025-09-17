import React, { useState } from 'react';
import axios from 'axios';
import backgroundVideo from '../../assets/backgroundvideo.mp4';
import {  FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^05\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'رقم الهاتف غير صالح';
    }
    
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await axios.post(
        'https://cd-root.com/syarahplus/backend/api/users/register',
        {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          username: formData.email.split('@')[0],
          phone_number: formData.phone,
          registration_method: "form",
          platform: "web"
        }
      );

      if (res.data.success) {
        localStorage.setItem('token', res.data.data.token);
        navigate('/login', { 
          state: { 
            message: 'تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.',
            type: 'success' 
          } 
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'حدث خطأ في إنشاء الحساب';
      setErrors(prev => ({
        ...prev,
        submit: errorMessage
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

<div className="container relative z-10 mx-auto my-4 py-10">
  <div className="w-11/12 md:w-3/5 lg:w-2/5 mx-auto bg-black bg-opacity-60 rounded-2xl py-10 px-6">
    <div className="w-full mx-auto text-center">
            {/* Name Input */}
            <div className="relative my-2">
              <input
                type="text"
                name="name"
                placeholder="الاسم الكامل"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg text-black border ${errors.name ? 'border-red-500' : ''}`}
              />
              <span className="absolute top-1/2 left-3 -translate-y-1/2">
                <FaUser size={20} className="text-gray-400" />
              </span>
              {errors.name && <p className="text-red-500 text-sm mt-1 text-right">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="relative my-2">
              <input
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg text-black border ${errors.email ? 'border-red-500' : ''}`}
              />
              <span className="absolute top-1/2 left-3 -translate-y-1/2">
                <FaEnvelope size={20} className="text-gray-400" />
              </span>
              {errors.email && <p className="text-red-500 text-sm mt-1 text-right">{errors.email}</p>}
            </div>

            {/* Phone Input */}
        
      {/* Phone Input */}
<div className="relative my-2">
  <input
    type="tel"
    name="phone"
    placeholder="رقم الهاتف"
    value={formData.phone}
    onChange={handleInputChange}
    className={`w-full pl-10 pr-4 py-3 rounded-lg text-black border text-right ${errors.phone ? 'border-red-500' : ''}`}
  />
  <span className="absolute top-1/2 left-3 -translate-y-1/2">
    <FaPhone size={20} className="text-gray-400" />
  </span>
  {errors.phone && <p className="text-red-500 text-sm mt-1 text-right">{errors.phone}</p>}
</div>


            {/* Password Input */}
            <div className="relative my-2">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="كلمة المرور"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg text-black border ${errors.password ? 'border-red-500' : ''}`}
              />
              <span
                className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash size={20} className="text-gray-400" /> : <FaEye size={20} className="text-gray-400" />}
              </span>
              {errors.password && <p className="text-red-500 text-sm mt-1 text-right">{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className="relative my-2">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="تأكيد كلمة المرور"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg text-black border ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 text-right">{errors.confirmPassword}</p>}
            </div>

          <button className="text-end mt-5 w-full">نسيت كلمه المرور</button>

              {/* زر التسجيل */}
              {errors.submit && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 text-right" role="alert">
                  <span className="block sm:inline">{errors.submit}</span>
                </div>
              )}

              <button
                onClick={handleRegister}
                disabled={isLoading}
                className={`block w-full mainBg py-4 px-4 rounded-lg my-10 font-bold ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'جاري إنشاء الحساب...' : 'انشاء حساب'}
              </button>

           
              <h6 className="secondColor mt-14 px-4 text-sm font-medium text-center">
                انشاء حساب
              </h6>
            </div>
          </div>
        </div>
        
        
      
    </section>
  );
}

export default Register;
