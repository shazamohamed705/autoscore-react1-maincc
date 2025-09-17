import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import article3 from '../../assets/article3.png';
import article1 from '../../assets/article1.png';
import article2 from '../../assets/article2.png';
import CARA from '../../assets/CARA.png';
export default function Articles1() {
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
        عداد السيارة<span className="text-red-500">كار سيرفيس</span> 
    
  
        </h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
          إليك عزيزي القارئ لمحة سريعة عن الخدمات التي ستستفيد منها ..
        </p>
      </section>

      {/* Hero Image & Content Box */}
      <div className="flex justify-center">
        <div className="w-full max-w-5xl border border-gray-300 rounded-md overflow-hidden bg-white dark:bg-gray-800">
          {/* Hero Image */}
          <section className="w-full">
            <img
              src={CARA} 
              alt="فحص السيارة"
              className="w-full h-60 object-cover"
            />
          </section>

          {/* Main Content */}
          <section className="py-8 px-6">
            <div className="space-y-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">

              <p>
                يعد عداد المسافة المقطوعة في السيارة من أهم الأمور التي ينظر لها عند شراء السيارات المستعملة، والتي تؤثر بشكل مباشر على قيمة المركبة، ويعتقد كثير من الناس أنه بمجرد النظر إلى لوحة العدادات، تظهر لهم المسافة الحقيقية التي قطعتها السيارة، ولا يضعون أي احتمال ما إذا كان قد تم التلاعب بالعداد من تنزيل قيمته إلى مئات أو حتى آلاف الكيلومترات، فتجدر الإشارة إلى أهمية التأكد من وجود عملية تلاعب بالعداد.
              </p>

              <p>
                ما هو التلاعب العداد؟ كأي قطعة بالسيارة قابلة للتغيير، يمكن تنزيل عداد السيارة بآلاف الكيلومترات وبحسب الغاية المرادة من اخفاء عيوب وغيرها، لعقود مضت، وقع الكثير من الناس بهذه الخدعة نظرا لقلة الخبرة وعدم التوجه للآخصائيين للتأكد من وجود التلاعب.
              </p>

              <p>
                يوجد نوعين من عدادات المسافة بالسيارة، العدادات الميكانيكية والتي يتم تنزيلها يدويا، وهو النوع القديم من العدادات، والنوع الآخر هو العدادات الإلكترونية، والتي يتم تنزيلها بإستخدام أجهزة إلكترونية متخصصة.
              </p>

              <p>
                يتم الكشف عن وجود تلاعب بالعداد بطرق عديدة منها، إصدار تاريخ المركبة الذي يبين سجلات قراءة العداد عند إجراء عمليات الصيانة للمركبة ومقارنته بالعداد الفعلي الموجود على لوحة العدادات، وأيضا من خلال أجهزة فحص متطورة تستطيع الدخول لكمبيوتر السيارة لإظهار المسافة الحقيقية، وهناك طرق أخرى يتبعها الفنيين المحترفين لهذه الغاية.
              </p>

              <p>
                وبحسب إحصائيات مركز أوتوسكور، تتصدر السيارات الواردة من كوريا القائمة بأكثر السيارات تلاعبا للعدادات نظرا لاستخدامها السياحي بكوريا والقيمة الكبيرة لِعداد المسافة مقارنة مع سنة الصنع، تليها السيارات الألمانية، ثم السيارات وارد أوروبا.
              </p>

              <p>
                وشهدت الفترة الأخيرة، ارتفاع نسب التلاعب بالعدادات، مما يحتم على من يريد شراء سيارة وضع هذا الأمر نصب عينيه، والمشتري يريد شراء سيارة متأكد من موثوقيتها وخالية قدر الإمكان من أي عيوب، و العداد أحد أهم المؤشرات العمر التشغيلي للمركبة، وله دور هام في تحديد قيمة المركبة، فلو تم التغافل عنه، فكأنك تريد شراء سيارة تم تنزيل عدادها بمبلغ مالي لا تستحقه مما يرتب عليه خسائر اقتصادية على المشتري.
              </p>

              <p>
                ويعد التلاعب بالعداد جريمة يعاقب عليها القانون في الولايات المتحدة وأوروبا وبعض الدول الأخرى، لما يترتب عليه من غش وخداع وتلاعب بالقيمة الفعلية للمركبة.
              </p>

              <p>
                يعد مركز أوتوسكور رائد في مجال فحص السيارات بشكل عام، ومختص بمشكلة التلاعب بالعدادات، حيث يحرص المركز على تسليط الضوء على المشاكل التي تواجه المشتري وايضاحها له، وإيجاد الحلول العلمية الهندسية بمعايير عالمية.
              </p>

            </div>
          </section>
        </div>
      </div>

      {/* Similar Articles Section */}
      <section className="w-10/12 mx-auto my-2 py-2 md:py-10">
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
