import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import article3 from '../../assets/article3.png';
import article1 from '../../assets/article1.png';
import article2 from '../../assets/article2.png';
import CARD from '../../assets/CARD.png'; // غيريها بصورة لمحرك

export default function ArticlesCarEngine() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openImageModal = useCallback((imageSrc, imageAlt) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt });
    setIsModalOpen(true);
  }, []);

  const closeImageModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
  }, []);

  const handleViewAll = () => {
    navigate('/articles');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Title Section */}
      <section className="py-8 px-6 text-center">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          فحص المحرك قبل شراء السيارة: خطوات أساسية يجب معرفتها
        </h1>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 rounded-md p-6">
        <div className="space-y-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">

          {/* Hero Image */}
          <div className="w-full h-300 md:h-300 mb-6 rounded-md overflow-hidden">
            <img
              src={CARD}
              alt="فحص المحرك"
              className="w-full h-full object-cover"
            />
          </div>

          <p>
            يعد محرك المركبة أحد أهم أجزائها الرئيسية، وهو القلب النابض الذي يمدها بالحركة،
            والتي تنتقل منه إلى صندوق السرعات وباقي أجزاء منظومة نقل الحركة وصولاً للعجلات.
          </p>

          <p>
            وعند شراء سيارة مستعملة، تعد حالة المحرك أمرًا مهمًا جدًا معرفته، لأن مشاكل المحرك
            عادة ما تكون مكلفة للإصلاح. من الصعب تقييم الحالة الميكانيكية للمحرك بالاعتماد فقط
            على اختبار قيادة سريع أو الفحوصات التقليدية، لذلك نوصي في أوتوسكور بفحصه بشكل علمي
            من قبل ميكانيكيين مؤهلين.
          </p>

          <h2 className="text-lg font-bold mt-6">طرق فحص المحرك والكشف عن مشاكله</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>تفقد سجلات الصيانة:</strong> إذا كانت متاحة، فهي مؤشر على أن السيارة تمت
              صيانتها بانتظام، مثل تغيير الزيت والفلاتر والأقشطة في المواعيد الصحيحة.
            </li>
            <li>
              <strong>تفقد مؤشر زيت المحرك:</strong> النظر لحالة الزيت ومستواه، مع الانتباه لأي
              رائحة احتراق أو اختلاط بسائل التبريد.
            </li>
            <li>
              <strong>ضغط المحرك:</strong> مقياس مهم لكفاءته، يؤثر على العزم والقدرة الناتجة.
              في أوتوسكور يتم فحصه بطريقة علمية دون الحاجة لتفكيك أجزاء كبيرة.
            </li>
            <li>
              <strong>تفقد تهريب زيوت المحرك:</strong> يتم التحقق من أسفل المحرك وناقل الحركة
              لتحديد مصدر أي تسريب.
            </li>
            <li>
              <strong>فحص نظام التبريد:</strong> التأكد من حالة سائل التبريد، الروديتر، الخراطيم،
              المواسير والمراوح.
            </li>
            <li>
              <strong>فحص غازات العادم:</strong> لون العادم ونسبة الانبعاثات (CO, CO2, HC) تعطي
              مؤشرًا دقيقًا على حالة المحرك.
            </li>
            <li>
              <strong>فحص الطريق:</strong> اختبار أداء المحرك على الطريق، استجابته للتسارع
              والتباطؤ، الأصوات والاهتزازات، ومراقبة الحرارة.
            </li>
            <li>
              <strong>فحص أعطال المحرك بأجهزة التشخيص:</strong> باستخدام جهاز متخصص لفحص الأنظمة
              الإلكترونية والكهربائية المرتبطة بالمحرك وتحليل الأعطال.
            </li>
          </ul>

          <p>
            في مركز أوتوسكور، يتم فحص المحرك بأجهزة متطورة وبأفضل الطرق العلمية من قبل مهندسين
            مختصين وكادر فني ذو خبرة، حيث يعد المركز معتمدًا من شركة بوش العالمية.
          </p>
        </div>
      </section>

      {/* Similar Articles Section */}
      <section className="w-10/12 mx-auto my-10">
        <div>
          <div className="text-center mb-12">
            <h2 className="font-seimybold text-3xl md:text-5xl mb-8">
              <span className="text-black">مشابهة</span>{" "}
              <span className="text-red-600">المقالات</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[{img: article3, title: "لماذا يجب ان تختار كار سيرفيس", link: '/why-car'},
              {img: article2, title: "شاهد تقارير كار سيرفيس", link: '/car-reporets'},
              {img: article1, title: "ازاي بيتم فحص السياره في مراكز خدمه كار سيرفيس", link: '/car-process'}].map((art, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate(art.link)}
              >
                <div className="relative">
                  <img 
                    className='w-full h-48 object-cover cursor-pointer' 
                    src={art.img} 
                    alt={art.title}
                    onClick={(e) => {
                      e.stopPropagation();
                      openImageModal(art.img, art.title);
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className='font-bold text-md my-3 text-black hover:text-red-600 transition-colors duration-200'>
                    {art.title}
                  </h3>
                  <button className='text-red-600 font-medium text-sm hover:underline mt-2'>
                    اقرأ المزيد ←
                  </button>
                </div>
              </div>
            ))}
          </div>

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

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeImageModal}
        >
          <img 
            src={selectedImage.src} 
            alt={selectedImage.alt} 
            className="max-h-[90%] max-w-[90%] rounded-md shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
