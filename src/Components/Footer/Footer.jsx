import React, { useContext } from 'react'
import { BiPlanet } from 'react-icons/bi';
import { FaTwitter, FaYoutube } from 'react-icons/fa';
import { IoLogoInstagram } from 'react-icons/io';
import { Link } from "react-router-dom";
import { DarkModeContext } from '../context/DarkModeContext';

function Footer() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <>
      <footer className= {`w-full bg-opacity-80 z-40 shadow-2xl shadow-gray-700 ${isDarkMode ? 'bg-[#0f0f21ed]  text-white' : 'bg-white text-black'}`}>
        <div className="footer">
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-center py-5">
            <Link to="/">
              <div className="col-span-1 text-center">
                <h2 className="lg:text-2xl mx-2">
                  <strong className="">كـــــار</strong> سيرفيس
                </h2>
              </div>
            </Link>
            <div className="col-span-1 flex justify-center">
              <div className=" flex items-center gap-5  ">
                <Link to="about" className="hover:text-orange-500">
                  من نحن
                </Link>
                <Link to="/Questions" className="hover:text-orange-500">
                  أسئلة و أجوبة
                </Link>
                <Link to="/articles" className="hover:text-orange-500">
                  مقالات
                </Link>
                <Link to="/contact" className="hover:text-orange-500">
                  اتصل بنا
                </Link>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex items-center justify-center gap-4">
                <IoLogoInstagram className="text-2xl" />
                <BiPlanet className="text-2xl" />
                <FaTwitter className="text-2xl" />
                <FaYoutube className="text-2xl" />
              </div>
            </div>

          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer