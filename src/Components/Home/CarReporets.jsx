import React, { useState, useCallback,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import article3 from '../../assets/article3.png';
import article1 from '../../assets/article1.png';
import article2 from '../../assets/article2.png';
import CARC from '../../assets/CARC.png';
export default function WhyCar() {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleViewAll = () => {
    navigate('/articles');
  };

  const openImageModal = useCallback((imageSrc, imageAlt) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt });
    setIsModalOpen(true);
  }, []);

  const closeImageModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Title Section (خارج البوكس) */}
      <section className="py-8 px-6 text-center">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
           شاهد تقارير<span className="text-red-500">كار سيرفيس</span> ؟
          <br />
        
        </h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
          إليك عزيزي القارئ لمحة سريعة عن الخدمات التي ستستفيد منها ..
        </p>
      </section>

      {/* Box (الصورة + باقي المحتوى) */}
      <div className="flex justify-center">
        <div className="w-full max-w-5xl border border-gray-300 rounded-md overflow-hidden bg-white dark:bg-gray-800">
          
          {/* Hero Image Section */}
          <section className="w-full">
  <img
    src={article2}
    alt="فحص السيارة"
    className="w-full h-[500px] object-cover rounded-lg"
  />
</section>


          {/* Content Section */}
       {/* Content Section */}
<section className="py-8 px-6">
  <div className="space-y-6 text-gray-800 dark:text-gray-200 text-base leading-relaxed">
    <h3 className="text-2xl font-bold text-red-600 mb-4">
      كار سيرفيس يكشف المستور !
    </h3>

    <p>
      نصيحتنا الدائمة لسلامتك وسلامة عائلتك؛ هي فحص السيارة قبل شرائها بالطرق
      العلمية وبالأجهزة المخصّصة للفحص وتحت إشراف المهندسين وذوي الخبرة.
    </p>

    <p>وكما يقول المثل: ليس كل ما يلمع ذهبًا!</p>
    <p>وفعلًا قد يكون قديمك نديمك!</p>

    <p>
      فحص كار سيرقس الشامل يقدم لكم تقريرًا شاملًا عن جميع تفاصيل السيارة مع بيان
      مكان الضربة وتأثيرها على الأداء، كما يمكنك من معرفة صحة عداد مركبتك،
      وسلامة أجزائها الميكانيكية والكهربائية بعيدًا عن المصطلحات التقليدية التي
      تساهم في تخفيض سعر السيارة وتظليل المشتري.
    </p>

    
  </div>
</section>

        </div>

      
      </div>
        {/* Articles Section */}
        <section className="w-10/12 mx-auto my-2 py-2 md:py-10">
          <div>
     

            {/* Main Title */}
            <div className="text-center mb-12">
              <h2 className="font-seimybold text-3xl md:text-5xl mb-8">
  <span className="text-black">مشابهة</span>{" "}
  <span className="text-red-600">المقالات</span>
</h2>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* First Article Card */}
              <div 
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/why-car')}
              >
                <div className="relative">
                  <img 
                    className='w-full h-48 object-cover cursor-pointer' 
                     src={article2} 
                    alt="لماذا يجب ان تختار كار سيرفيس"
                    onClick={(e) => {
                      e.stopPropagation();
                      openImageModal(article3, "لماذا يجب ان تختار كار سيرفيس");
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className='font-bold text-md my-3 text-black hover:text-red-600 transition-colors duration-200'>
                    لماذا يجب ان تختار كار سيرفيس؟ لفحص السيارة قبل الشراء ؟؟
                  </h3>
                  <button className='text-red-600 font-medium text-sm hover:underline mt-2'>
                    اقرأ المزيد ←
                  </button>
                </div>
              </div>

              {/* Second Article Card */}
              <div 
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/Articles3')}
              >
                <div className="relative">
                  <img 
                    className='w-full h-48 object-cover cursor-pointer' 
                    src={CARC} 
                    alt="شاهد تقارير كار سيرفيس"
                    onClick={(e) => {
                      e.stopPropagation();
                      openImageModal(article2, "شاهد تقارير كار سيرفيس");
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className='font-bold text-md my-3 text-black hover:text-red-600 transition-colors duration-200'>
               الأكياس الهوائية (Airbags)
                  </h3>
                  <button className='text-red-600 font-medium text-sm hover:underline mt-2'>
                    اقرأ المزيد ←
                  </button>
                </div>
              </div>

              {/* Third Article Card */}
              <div 
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                         onClick={() => navigate('/car-process')}

             >
                <div className="relative">
                  <img 
                    className='w-full h-48 object-cover cursor-pointer' 
                    src={article1} 
                    alt="فحص السيارات في كار سيرفيس"
                    onClick={(e) => {
                      e.stopPropagation();
                      openImageModal(article1, "فحص السيارات في كار سيرفيس");
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className='font-bold text-md my-3 text-black hover:text-red-600 transition-colors duration-200'>
                    ازاي بيتم فحص السياره في مراكز خدمه كار سيرفيس
                  </h3>
                  <button className='text-red-600 font-medium text-sm hover:underline mt-2'>
                    اقرأ المزيد ←
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="text-center">
              <button 
                className="bg-red-700 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 hover:scale-105"
                onClick={handleViewAll}
              >
                عرض الكل ...
              </button>
            </div>
          </div>
        </section>
    </div>
  );
}
