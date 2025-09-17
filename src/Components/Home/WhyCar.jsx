import React, { useState, useCallback ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import article3 from '../../assets/article3.png';
import article1 from '../../assets/article1.png';
import article2 from '../../assets/article2.png';
import CARC from '../../assets/CARC.png'
export default function WhyCar() {
  const navigate = useNavigate();

 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🟢 هنا تعملي الفانكشنز
  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

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
          لماذا يجب أن تختار <span className="text-red-500">كار سيرفيس</span> ؟
          <br />
          لفحص السيارة قبل الشراء ؟؟
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
              src={article3} 
              alt="فحص السيارة"
              className="w-full h-60 object-cover"
            />
          </section>

          {/* Content Section */}
          <section className="py-8 px-6">
            <ul className="space-y-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">
              <li>١- خدمة فحص شامل لجميع السيارات عملياً بأجهزة دقيقة متقدمة.</li>
              <li>٢- الفحص الإلكتروني يغطي أكثر من 200 نقطة فحص للتأكد من جميع التفاصيل.</li>
              <li>٣- تقرير دقيق ومفصل مع توصيات للحفاظ على السيارة بأفضل حال.</li>
              <li>٤- استخدام أجهزة عالية التقنية مثل Bosch لفحص الكمبيوتر والأنظمة.</li>
              <li>٥- فريق فني متخصص ذو خبرة طويلة للتعامل مع جميع أنواع السيارات.</li>
              <li>٦- فحص السيارة للتأكد من خلوها من أي حوادث أو إصلاحات مخفية.</li>
              <li>٧- التحقق من الأنظمة الكهربائية والإلكترونية في السيارة بشكل كامل.</li>
              <li>٨- توفير تقرير مكتوب يحتوي على جميع تفاصيل حالة السيارة.</li>
              <li>٩- نظام فحص متطور يغطي أنظمة الفرامل، المحرك، ناقل الحركة، والتكييف.</li>
            </ul>

            <div className="mt-8 text-center space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                لمشاهدة بعض تقاريرنا اضغط على الرابط التالي:
              </p>
              <a
                href="http://localhost:3000/car-reporets"
                className="text-blue-600 dark:text-blue-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:3000/car-reporets
              </a>

              <p className="mt-4 text-gray-800 dark:text-gray-200 font-semibold underline decoration-gray-500 underline-offset-2">
                كار سيرفيس .. #بعطيك_الصافي
                <br />
                #قبل_ما_تشتريها_اعرف_سكورها
              </p>

              <p className="mt-4 text-gray-800 dark:text-gray-200 font-semibold">
                موقعنا: المقطم   
                <br />
                0792030419 - 065828040
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
                onClick={() => navigate('/Articles3')}
              >
                <div className="relative">
                  <img 
                    className='w-full h-48 object-cover cursor-pointer' 
                    src={CARC} 
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
              "الأكياس الهوائية (Airbags)
                  </h3>
                  <button className='text-red-600 font-medium text-sm hover:underline mt-2'>
                    اقرأ المزيد ←
                  </button>
                </div>
              </div>

              {/* Second Article Card */}
              <div 
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/car-reporets')}
              >
                <div className="relative">
                  <img 
                    className='w-full h-48 object-cover cursor-pointer' 
                    src={article2} 
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
                    شاهد تقارير كار سيرفيس !!
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
