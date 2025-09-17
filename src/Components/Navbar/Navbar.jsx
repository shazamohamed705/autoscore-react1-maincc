import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/auto-vehicle-repair-service-logo_681672-1437 1.png";
import { DarkModeContext } from "../context/DarkModeContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { FaXmark, FaUser, FaGear, FaRightFromBracket } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCloseMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className={`flex justify-between items-center w-full px-10 py-4 shadow-md transition-all duration-300
    ${isDarkMode ? "bg-[#0f0f21cc] text-white" : "bg-white/70 backdrop-blur-md text-black"}
  `}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={handleCloseMenu}
        >
          <img className="w-12 h-12" src={logo} alt="logo" />
          <h2 className="lg:text-2xl font-bold">
            كـــــار <span className="text-red-600">سيرفيس</span>
          </h2>
        </Link>

        <div className="flex items-center gap-6">
          {/* الرئيسية */}
          <Link
            to="/"
            className="relative group text-lg font-medium"
            onClick={handleCloseMenu}
          >
            الرئيسية
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="about"
              className="relative group text-lg font-medium"
            >
              من نحن
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink
              to="/Questions"
              className="relative group text-lg font-medium"
            >
              أسئلة وأجوبة
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink
              to="/articles"
              className="relative group text-lg font-medium"
            >
              مقالات
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink
              to="/gallery"
              className="relative group text-lg font-medium"
            >
              معرض الصور
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink
              to="/info"
              className="relative group text-lg font-medium"
            >
              فحص كارسيرفيس
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <NavLink
              to="/report"
              className="relative group text-lg font-medium"
            >
              التقرير
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </div>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={24}
            moonColor="white"
            sunColor="black"
          />
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                <FaUser />
                <span>{user.name}</span>
              </button>
              
              {isProfileOpen && (
                <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 
                  ${isDarkMode ? 'bg-[#0f0f21] border border-gray-700' : 'bg-white'}
                `}>
                  <div className="px-4 py-2 text-sm text-gray-500 border-b">
                    {user.email}
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-orange-500 hover:text-white transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <FaGear />
                    <span>الإعدادات</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                      navigate('/login');
                    }}
                    className="flex items-center gap-2 w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <FaRightFromBracket />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/register"
                className="border-2 border-orange-500 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition"
              >
                إنشاء حساب
              </Link>
              <Link
                to="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                تسجيل الدخول
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={24}
            moonColor="white"
            sunColor="black"
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black dark:text-white text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden flex flex-col items-center gap-6 py-10 mt-2 mx-4 rounded-lg shadow-lg 
            ${isDarkMode ? "bg-[#0f0f21] text-white" : "bg-white text-black"}
          `}
        >
          <button
            onClick={handleCloseMenu}
            className="absolute top-4 right-6 text-2xl"
          >
            <FaXmark className="text-orange-500" />
          </button>
          <NavLink to="about" onClick={handleCloseMenu}>من نحن</NavLink>
          <NavLink to="/Questions" onClick={handleCloseMenu}>أسئلة وأجوبة</NavLink>
          <NavLink to="/articles" onClick={handleCloseMenu}>مقالات</NavLink>
          <NavLink to="/gallery" onClick={handleCloseMenu}>معرض الصور</NavLink>
          <NavLink to="/info" onClick={handleCloseMenu}>معلومات عنا</NavLink>
          <NavLink to="/report" onClick={handleCloseMenu}>التقرير</NavLink>

          <div className="flex flex-col gap-3 mt-6 w-full px-6">
            {user ? (
              <>
                <div className="text-center mb-2">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                  onClick={handleCloseMenu}
                >
                  <FaGear />
                  <span>الإعدادات</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    handleCloseMenu();
                    navigate('/login');
                  }}
                  className="flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                  <FaRightFromBracket />
                  <span>تسجيل الخروج</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-center"
                  onClick={handleCloseMenu}
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition text-center"
                  onClick={handleCloseMenu}
                >
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
