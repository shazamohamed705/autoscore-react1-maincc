import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import article3 from '../../assets/article3.png';
import article1 from '../../assets/article1.png';
import article2 from '../../assets/article2.png';
import CARS from '../../assets/CARS.png'; // غيريها بصورة مناسبة للمقال

export default function ArticlesTitleFraud() {
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
        

Title Washing
التلاعب بتصنيف (تايتل) المركبة
        </h1>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 rounded-md p-6">
        <div className="space-y-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">

          {/* Hero Image */}
          <div className="w-full h-300 md:h-300 mb-6 rounded-md overflow-hidden">
            <img
              src={CARS}
              alt="التلاعب بالتايتل"
              className="w-full h-full object-cover"
            />
          </div>

          <p>
            يعد التلاعب بتايتل المركبة أمر شائع في الولايات المتحدة ولكنه غير قانوني، 
            يستعمل لرفع قيمة المركبات التي تعرضت للضرر، ويتم ذلك بنقل المركبة من ولاية 
            إلى ولاية أخرى لا تستطيع تمييز التايتل الحقيقي للمركبة. 
          </p>

          <h2 className="text-lg font-bold mt-6">ما هو التلاعب بالتايتل؟</h2>
          <p>
            عندما تتعرض السيارة لأضرار بالغة في فيضان أو حريق أو كارثة طبيعية، يتم تصنيفها 
            كخسارة كاملة. تقوم بعض الجهات بالتحايل عبر نقل السيارة إلى ولاية أخرى 
            للحصول على تصنيف "كلين" وإزالة تفاصيل الضرر.
          </p>
          <p>
            العديد من تجار السيارات والبائعين من القطاع الخاص يتورطون في هذه الممارسة 
            غير القانونية. على سبيل المثال، تم الحكم على شخصين بالسجن 3 سنوات بسبب 
            التلاعب بتصنيف 800 مركبة. 
          </p>

          <h2 className="text-lg font-bold mt-6">كيف تتم عملية التلاعب بالتايتل؟</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              تغيير التصنيف من Salvage إلى Clean عبر ولايات ذات قوانين ضعيفة.
            </li>
            <li>
              تزوير الوثائق يدويًا لغياب النسخ الإلكترونية في بعض الولايات.
            </li>
            <li>
              استغلال اختلاف القوانين بين الولايات في حساب نسبة الضرر.
            </li>
            <li>
              استخدام تصنيفات مختلفة لنفس الحالة مثل Rebuilt أو Junk.
            </li>
          </ul>

          <p>
            بعض الولايات مثل تكساس وكاليفورنيا وواشنطن لا تطبق قوانين صارمة ضد هذه الممارسات،
            بينما تعد ميسيسيبي الأسوأ حيث أن 1 من كل 44 سيارة بها مشكلة تايتل.
          </p>

          <h2 className="text-lg font-bold mt-6">لماذا يجب الحذر من التلاعب بالتايتل؟</h2>
          <p>
            لأنه يؤدي في النهاية إلى شراء سيارة مستعملة تعرضت لضرر شديد دون علم المشتري. 
            هذه السيارات قد تبدو بحالة جيدة لكنها تحتاج صيانة مكلفة جدًا. 
          </p>
          <p>
            في كار سيرفيس تم فحص أكثر من 45 سيارة مصنفة Clean وتبين أنها تعرضت للغرق أو حوادث كبيرة، 
            لذلك نؤكد أن الفحص الدقيق والشامل يحمي المشتري من الغش والخداع.
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
