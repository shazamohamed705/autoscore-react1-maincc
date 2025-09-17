import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import article3 from '../../assets/article3.png';
import article1 from '../../assets/article1.png';
import article2 from '../../assets/article2.png';
import CARf from '../../assets/CARF.png'; // غيريها بصورة مناسبة للمقال الجديد

export default function ArticlesCarCheck() {
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
         فحص السيارة قبل شرائها: أساسيات يجب معرفتها قبل وبعد فحص السيارة في كـــــارسيرفيس


        </h1>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 rounded-md p-6">
        <div className="space-y-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">

          {/* Hero Image */}
      {/* Hero Image */}
<div className="w-full h-300 md:h-300 mb-6 rounded-md overflow-hidden">
  <img
    src={CARf}
    alt="فحص السيارة قبل الشراء"
    className="w-full h-full object-cover"
  />
</div>


          <p>
            إن قرار شراء سيارة هو بمثابة استثمار عملي سيوفر لك بشكل أساسي عملية تنقّل سهلة وميسّرة، 
            عدا عن جانب الرفاهية الذي سيتيح لك استخدام جميع وسائل الترفيه والأنظمة المساعدة 
            وأنظمة الأمان والسلامة التي مازالت في تطوّر دائم وفي تنافسٍ قوي بين الشركات الصانعة للسيارات حول العالم.
          </p>

          <p>
            لذا يجب عليك عدم الامتثال أمام العاطفة عند شراء أي سيارة تعجبك، وأن تغض الطرف عن أي جماليات 
            وإضافات مستحدثة فيها، أو عن تصميمها وقوتها دون فحص جميع الأنظمة التي سيترتب على عدم وجودها 
            وفعاليتها الكثير من المشاكل والعديد من التكاليف المستقبلية.
          </p>

          <h2 className="text-lg font-bold mt-6">لماذا يتوجب عليك فحص السيارة قبل إتمام عملية الشراء؟</h2>
          <p>
            أهم ما يمكن قوله في سببية فحص السيارة قبل إتمام عملية الشراء، هو السلامة العامة والتوفير الحقيقي،
            فعندما تقرر شراء سيارة دون التأكد من سلامة أنظمتها الداخلية وتكتشف بوجود العديد من الأعطال المبهمة 
            والعديد من الإصلاحات الخاطئة فيها، سيترتب عليك إصلاحها فورًا لتفادي حصول أي مشاكل وخيمة تعرِّض 
            سلامتك وسلامة عائلتك للخطر. وإذا فكّرت في بيعها ستواجه خسارة كبيرة في قيمتها لا محالة.
          </p>

          <h2 className="text-lg font-bold mt-6">ما هي الأنظمة والأجزاء الأساسية التي يتم فحصها قبل الشراء؟</h2>
          <ul className="list-decimal pl-6 space-y-1">
            <li>فحص الهيكل والأجزاء الخارجية</li>
            <li>فحص الشاصي بالقياسات والليزر</li>
            <li>فحص أنظمة التعليق والميزان</li>
            <li>فحص نظام المحرك</li>
            <li>فحص أنظمة الجير</li>
            <li>فحص أنظمة الدفع</li>
            <li>فحص أنظمة الميكانيك بالتفصيل</li>
            <li>فحص أنظمة الكمبيوتر والحساسات</li>
            <li>فحص الأنظمة الكهربائية والشحن</li>
            <li>فحص نظام التكييف والتدفئة</li>
            <li>فحص أنظمة تبريد المحرك والجير والبطارية</li>
            <li>فحص أنظمة الأمان والسلامة</li>
            <li>تصوير السيارة من كافة الزوايا مع الملاحظات</li>
            <li>فحص الطريق</li>
          </ul>

          <h2 className="text-lg font-bold mt-6">ما المقصود بـ200 نقطة في فحص كـــــارسيرفيس بريميوم؟</h2>
          <p>
            نقاط الفحص هي عبارة عن أجزاء الأنظمة التي يتم فحصها، حيث يوضّح تقرير الفحص النهائي 
            النقاط لكل نظام، ويبيّن المشاكل أو العمر الافتراضي المتبقي أو حتى الصيانات الخاطئة 
            والسابقة في كل نقطة، وفي النهاية يقرر نتيجة الفحص بدرجة نجاح أو رسوب ضمن المجموع الكلي للنقاط.
          </p>

          <h2 className="text-lg font-bold mt-6">ما هي التقارير والملاحظات التي ستحصل عليها بعد فحص كـــــارسيرفيس</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>تقرير النقاط والأضرار</li>
            <li>تقرير تاريخ السيارة قبل الاستيراد</li>
            <li>تقرير تاريخ السيارة بعد الاستيراد</li>
          </ul>

          <h2 className="text-lg font-bold mt-6">ما هي الخدمات الأخرى التي يقدمها كـــــارسيرفيس</h2>
          <p>
            سيحصل العملاء بعد فحص كار سيرفيس بريميوم على خدمة "تخمين المركبة" المعتمد لدى البنوك الكبرى 
            في الأردن، بالإضافة إلى خدمة "تخمين قيمة الإصلاحات" المطلوبة للسيارة.
          </p>

          <h2 className="text-lg font-bold mt-6">كم عدد فروع أوتوسكور؟</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>فرع  المقطم </li>
            <li> المعادي</li>
            <li> نزله السمان</li>
          </ul>

          <h2 className="text-lg font-bold mt-6">كيف يمكنني حجز موعد للفحص؟</h2>
          <p>
            يمكنك حجز موعد لفحص سيارتك من خلال موقع أوتوسكور عبر الرابط: 
            <a href="http://localhost:3000/Appointment" target="_blank" rel="noreferrer" className="text-red-600 underline ml-2">
              Book Appointment (كـــــارسيرفيس.com)
            </a>
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
