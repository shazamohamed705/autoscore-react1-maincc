import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import article3 from '../../assets/article3.png';
import article1 from '../../assets/article1.png';
import article2 from '../../assets/article2.png';
import CARB from '../../assets/CARB.png';

export default function Articles2() {
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
       الطريقة العلمية لِفحص البودي و الأجزاء الخارجية والشاصيات
        </h1>
    
      </section>

      {/* Hero Image & Content Box */}
      <div className="flex justify-center">
        <div className="w-full max-w-5xl border border-gray-300 rounded-md overflow-hidden bg-white dark:bg-gray-800">
          {/* Hero Image */}
          <section className="w-full">
            <img
              src={CARB} 
              alt="فحص الشاصي والبودي"
             className="w-full md:h-96 h-80 object-cover"
            />
          </section>

          {/* Main Content */}
          <section className="py-8 px-6">
            <div className="space-y-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">
              
              <p>
                شهدت صناعة السيارات في الآونة الأخيرة ثورة تكنولوجية ساهمت في رفع جودة عملية التصنيع كماً ونوعاً، حيث تتنافس الشركات الصانعة لإنتاج تصاميم للمركبات تحقق أعلى أهداف السلامة والأمان للركاب حتى عند تعرض المركبة لحوادث اصطدام.
              </p>

              <p>
                وتتعرض المركبات خلال فترة عمرها التشغيلي للعديد من حوادث الاصطدام و تضرر بعض أجزائها الخارجية أو الشاصي أو حتى في بعض الأحيان الأجزاء الميكانيكية، وتكمن خطورة هذه الأضرار في عدم إصلاحها بشكل صحيح، حيث لا تستند غالبية عمليات الإصلاح لأي أسس علمية، مما يؤثر على المظهر و الموثوقية والأداء في المركبة.
              </p>

              <p>
                ونستعرض قليلا كيف يتم تصنيع هيكل المركبة الخارجي، حيث يتم تصنيع الشاصي وتشكيله ليتناسب مع شكل السيارة وفق قياسات محددة.
              </p>

              <p>
                وتتم عملية طلاء المركبة للمرة الأولى بطريقة آلية عن طريق روبوتات متخصصة، وبطريقة مثالية تكاد تكون خالية من الأخطاء، بحيث يكون الطلاء ثابتاً وبوضعيات تتلائم مع شكل كل قطعة ومساحة منطقة الدهان.
              </p>

              <p>
                عند تعرض المركبة لحادث، قد تتضرر الأجزاء الخارجية وقد يصل الضرر للشاصي، وعند القيام بأي عملية إصلاح للأجزاء الخارجية للمركبة، فإن سماكة الدهان تتغير، حيث يصبح هناك فرق بين السماكة الأصلية وسماكة المنطقة التي تم دهانها مؤخرا بعد الإصلاح.
              </p>

              <p>
                وفي حال تعرض الشاصي للضرر، تتغير قياساته ويحدث خلل في أحد أبعاده (الطول، العرض، الإرتفاع)، وفي حال عدم إرجاع هذه الأبعاد إلى قيمها الصحيحة وفق بيانات الشركة الصانعة، يتأثر أداء المركبة سلباً، من حيث سيرها على الطريق بشكل غير متوازن، وتركيب بعض القطع الميكانيكية بشكل خاطئ على الشاصي المتضرر مما يسرع تلف القطع ويقلل عمرها الإفتراضي، والعديد من السلبيات الأخرى.
              </p>

              <p>
                الكثير من السيارات الحديثة تكون أجزائها الخارجية مصنوعة من الكاربون فايبر والبلاستيك والألمنيوم، حيث يجب التأكد من صحة ودقة عملية الإصلاح والمعايرة وفق قياسات الشركة الصانعة.
              </p>

              <p>
                حيث يشكل وجود فراغات بين أجزاء البودي بسبب عملية المعايرة غير الصحيحة أمر خطير، لما يسببه من مشكلات مثل دخول المياه من الخارج إلى السيارة، مما يؤدي إلى تماسات كهربائية وحوادث محتملة، وأيضاً دخول الهواء يؤثر على العزل الداخلي والراحة.
              </p>

              <p>
                وتدعو الحاجة عند شراء السيارات المستعملة تحديداً لفحص الشاصي والبودي والأجزاء الخارجية لتحديد الأجزاء المتضررة في حال وجودها، وتقييم جودة الإصلاح، نظراً للانتشار الكبير للسيارات التي تعرضت لحادث مسبقاً.
              </p>

              <p>
                الطريقة الصحيحة لفحص الأجزاء الخارجية للسيارة والمتبعة في أوتوسكور، استخدام أجهزة قياس متخصصة لقياس سماكات المعجون والدهان على جميع أجزاء السيارة، وقياس أبعاد الشاصي بالليزر للتأكد من توافقها مع بيانات الشركة الصانعة.
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
