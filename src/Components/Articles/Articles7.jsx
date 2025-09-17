import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import article3 from '../../assets/article3.png';
import article1 from '../../assets/article1.png';
import article2 from '../../assets/article2.png';
import CARP from '../../assets/CARP.png';

export default function ArticlesTiresLife() {
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
          ما هو العمر الافتراضي لإطارات المركبة وكيف تحافظ عليها أطول فترة ممكنة؟
        </h1>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 rounded-md p-6">
        <div className="space-y-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">

          {/* Hero Image */}
          <div className="w-full h-300 md:h-300 mb-6 rounded-md overflow-hidden">
            <img
              src={CARP}
              alt="العمر الافتراضي للإطارات"
              className="w-full h-full object-cover"
            />
          </div>

          <p>
            الإطارات هي عنصر مهم جدًا في السيارة، لما لها من تأثير مباشر على السلامة. 
            فمهما كانت تجهيزات الأمان الأخرى مثل الكاميرات والحساسات، فإن إطارات مهترئة 
            قد تجعل السائق عرضة للمخاطر.
          </p>

          <h2 className="text-lg font-bold mt-6">متى يجب استبدال الإطارات؟</h2>
          <p>
            لا توجد صيغة واحدة محددة، لكن الأمر يعتمد على أسطح الطرق، نوع السيارة، أسلوب القيادة 
            ومستوى الصيانة. بشكل عام يجب فحص الإطارات بانتظام لتحديد مدى اهترائها.
          </p>
          <p>
            ينصح باستخدام إطارات بعمق مداس لا يقل عن <strong>3 مم</strong> للإطارات الصيفية 
            أو <strong>4 مم</strong> للإطارات الشتوية، وألا يتجاوز عمرها <strong>أربع سنوات</strong>.  
            بينما قوانين السير تحدد الحد الأدنى بـ<strong>1.6 مم</strong> فقط، وهو أقل مما توصي به 
            الشركات المصنعة.
          </p>

          <h2 className="text-lg font-bold mt-6">العمر الافتراضي للإطارات</h2>
          <p>
            عمر الإطار لا يعتمد فقط على المسافة المقطوعة أو عمق المداس، بل يتأثر أيضًا بمرور الوقت. 
            بمرور السنين يصبح المطاط هشًا مما يزيد من مسافة التوقف عند الكبح ويضعف التماسك 
            خصوصًا على الطرق الرطبة أو الزلقة.
          </p>
          <p>
            لتحديد عمر الإطار يمكن الرجوع إلى رمز <strong>DOT</strong> المطبوع عليه، حيث يوضح 
            تاريخ ومكان الصنع. أول رقمين يمثلان <strong>الأسبوع</strong>، والرقمان التاليان يمثلان 
            <strong>سنة الصنع</strong>.
          </p>

          <h2 className="text-lg font-bold mt-6">عوامل تؤثر على استدامة الإطار</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>الحفاظ على ضغط هواء مناسب دون زيادة أو نقصان.</li>
            <li>تجنب الصدمات الجانبية أو الاصطدام بالأجسام الصلبة.</li>
            <li>موازنة العجلات وضبط زواياها لتفادي الاهتراء غير المنتظم.</li>
          </ul>

          <h2 className="text-lg font-bold mt-6">تخزين الإطارات</h2>
          <p>
            التخزين يؤثر على العمر الافتراضي، لذا يُفضل حفظ الإطارات في مكان بارد، جاف، ومظلم 
            بعيدًا عن أشعة الشمس المباشرة.
          </p>

          <p>
            في <strong>مركز كـــــارسيرفيس</strong> نهتم بفحص الإطارات بشكل دوري عبر 3 فحوصات أساسية 
            للتأكد من سلامتها وضمان أعلى معايير الأمان على الطريق.
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
