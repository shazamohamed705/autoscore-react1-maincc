import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import article3 from '../../assets/article3.png';
import article1 from '../../assets/article1.png';
import article2 from '../../assets/article2.png';
import CARK from '../../assets/CARK.png'; // بدليه بصورة مناسبة للمقال

export default function ArticlesTransmission() {
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
          فحص نظام نقل الحركة في السيارات المستعملة
        </h1>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 rounded-md p-6">
        <div className="space-y-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">

          {/* Hero Image */}
          <div className="w-full h-300 md:h-300 mb-6 rounded-md overflow-hidden">
            <img
              src={CARK}
              alt="فحص ناقل الحركة"
              className="w-full h-full object-cover"
            />
          </div>

          <p>
            عند شراء سيارة مستعملة، ينبغي التأكد من أنها في أفضل حالة ممكنة قبل القيام
            بعملية الشراء، وتعد هذه مهمة <strong>مركز أوتوسكور</strong> الرائد في مجال فحص المركبات.
          </p>

          <p>
            في السيارات المستعملة، يعد <strong>نظام نقل الحركة</strong> واحدًا من أهم الأنظمة التي يجب
            فحصها، لكونه مسؤول عن نقل كل من السرعة وعزم الدوران من المحرك إلى العجلات،
            بالإضافة إلى تكلفته العالية وصعوبة تبديله، وتأثيره المباشر على نعومة القيادة.
          </p>

          <h2 className="text-lg font-bold mt-6">أهمية فحص ناقل الحركة</h2>
          <p>
            ينقسم النظام إلى أجزاء ميكانيكية وكهربائية وكهروميكانيكية وهيدروليكية وإلكترونية.
            جميعها يتم فحصها بطريقة علمية دقيقة للتأكد من خلوها من الأعطال أو التلف
            الذي قد يؤدي إلى كلف صيانة باهظة أو الحاجة إلى استبدال النظام بالكامل.
          </p>

          <h2 className="text-lg font-bold mt-6">طرق فحص ناقل الحركة</h2>

          <h3 className="font-semibold mt-4">1- تفقد سجلات الصيانة:</h3>
          <p>
            مراجعة تاريخ صيانة المركبة تكشف إذا ما خضع النظام لأي صيانة دورية أو إصلاحات
            سابقة، مما يساعد في تقييم حالته الحالية.
          </p>

          <h3 className="font-semibold mt-4">2- الفحص النظري:</h3>
          <p>
            يتم فحص مستوى زيت ناقل الحركة وكفاءته، مع التأكد من خلو النظام من التسريبات
            أو الكسور. كما يتم رفع السيارة على الجك وتشغيلها لفحص الاستجابة، الغيارات،
            والأصوات غير الطبيعية، وتوثيقها بالفيديو للتقرير.
          </p>

          <h3 className="font-semibold mt-4">3- الفحص باستخدام أجهزة تشخيص الأعطال:</h3>
          <p>
            يستخدم جهاز فحص الأعطال لاكتشاف أي خلل كهربائي أو إلكتروني، مثل مشاكل
            الحساسات أو المضخات الخاصة بالتبريد والتزييت، مع تقديم تقرير مفصل للزبون.
          </p>

          <h3 className="font-semibold mt-4">4- الفحص على الطريق:</h3>
          <p>
            يتم اختبار النظام أثناء القيادة للتأكد من استجابته مع عدد دورات المحرك،
            وكفاءة تبديل الغيارات، ورصد أي تأخير أو رجة أو أصوات غير طبيعية.
          </p>

          <p className="mt-6">
            في <strong>مركز كار سيرفيس</strong> يتم فحص ناقل الحركة بدقة عالية بواسطة مهندسين
            وفنيين مختصين باستخدام أحدث الأجهزة، مع تقديم كافة النصائح للمشتري
            وتوضيح أي مشاكل قد تكلفه مبالغ صيانة كبيرة مستقبلًا.
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
