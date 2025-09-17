import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from "react-router-dom";
import { Router } from 'react-router-dom'
import { FaCalendarAlt, FaWhatsapp, FaPhoneAlt, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import rectangle from '../../assets/Rectangle 113.png'

import f1 from '../../assets/f1.png'
import f2 from '../../assets/f2.png'
import f3 from '../../assets/f3.png'
import f4 from '../../assets/f4.png'
import f5 from '../../assets/f5.png'
import f6 from '../../assets/f6.png'
import f7 from '../../assets/f7.png'
import f8 from '../../assets/f8.png'
import f10 from '../../assets/f10.png'
import f11 from '../../assets/f11.png'
import f12 from '../../assets/f12.png'

function Info() {
 

  

  
  const [active, setActive] = useState(0);



    const navigate = useNavigate(); // ⚡ مهم: هنا بتعرف المتغير

  return (
    <>

   


       
        <section className="py-12 bg-gray-100">
  {/* العنوان */}
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold">
      ماذا يغطي <span className="text-red-600">التقرير ؟</span>
    </h2>
    <p className="text-gray-600 mt-2">
      يغطي التقرير 11 مجموعة
    </p>
  </div>

  {/* الشبكة */}
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 w-4/5 mx-auto">
    {useMemo(() => [
      { img: f3, text: "تاريخ المركبه  " },
      { img: f4, text: "الهيكل الخارجي " },
      { img: f1, text: " الشاصي والهيكل " },
      { img: f2, text: " المحرك وناقل الحركه" },
      { img: f12, text: " نظام التعليق " },
      { img: f10, text: " المجموعه الكهربيه" },
      { img: f8, text: " نظام التكيف " },
      { img: f7, text: " المكابح والسلامه" },
      { img: f6, text: " سجلات المركبه" },
      { img: f5, text: "فحص الطريق  " },
      { img: f11, text: " تقارير المركبه" },
    ], []).map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center text-center"
      >
        <img src={item.img} alt="" className="w-16 h-16 object-contain" loading="lazy" decoding="async" />
        <p className="mt-3 font-semibold text-gray-800">{item.text}</p>
      </div>
    ))}
  </div>

  {/* زر تحت */}
  <div className="text-center mt-10">
    <button

          onClick={() => navigate('/Example')}

     className="bg-red-600 text-white px-6 py-2 rounded-md shadow hover:bg-red-700">
      مثال عن التقرير
    </button>
  </div>
</section>
  {/* آراء العملاء - تصميم كامل الصفحة */}

     



    </>
  )
}

export default Info 