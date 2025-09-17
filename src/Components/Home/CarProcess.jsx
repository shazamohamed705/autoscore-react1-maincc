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
اشترِ بثقة..   <span className="text-red-500"> بلا خداع  </span> 
    
        </h1>
      </section>

      {/* Box (الصورة + باقي المحتوى) */}
      <div className="flex justify-center">
        <div className="w-full max-w-5xl border border-gray-300 rounded-md overflow-hidden bg-white dark:bg-gray-800">
          
          {/* Hero Image Section */}
          <section className="w-full">
            <img
              src={article1} 
              alt="فحص السيارة"
              className="w-full h-60 object-cover"
            />
          </section>

        {/* Content Section */}
<section className="py-8 px-6 space-y-6 text-gray-800 dark:text-gray-200 leading-relaxed text-base">
  <p>
    في ظل الظروف الإقتصادية التي نمر بها، أصبح من الصعب شراء سيارة جديدة كليا "عداد زيرو"،
    ويلجأ الكثير من الناس لشراء السيارات المستعملة ذات الكلفة الأقل نسبيا.
  </p>

  <p>
    اعتدنا في مصر في السنوات الثلاثين الماضية على سماع مصطلحات فحص السيارات التقليدية 
    التي لم نجد لها أي تفسير علمي او هندسي في عالم السيارات مثل قصعة و دقة و ضربة كوع 
    و 4 جيد و موتور 60%. تعد هذه المصطلحات غير مفهومة لعامة الناس وفضفاضة ويمكن فهمها 
    بأكثر من معنى، ولها تأثير كبير على سعر المركبة عند شراء و بيع السيارة و تؤثر سلباً 
    على سعر السيارة و يصل التأثير في الغالب لآلاف الجنيهات.
  </p>

  <p>
    وبشكل خاص ، تتمثل الطريقة الصحيحة المتبعة عالمياً، والمطبقة في كار سيرفيس لفحص جميع 
    أجزاء السيارة لاكثر من 200 نقطة تشمل جميع الأنظمة الميكانيكية والكهربائية ونظام 
    الهايبرد و الشاصي الهيكل بطريقة علمية هندسية محترفة اعتمادا على الضربات و التأثير 
    على أداء السيارة مع بيان مكان الضربة بعيدا عن المصطلحات التقليدية. وتتم عملية قياس 
    أبعاد الشاصي بالليزر، حيث يتم أخذ قياسات من مناطق مختلفة من أجزاء شاصي المركبة بالكامل، 
    والتأكد من أن هذه الأبعاد تتوافق مع بيانات الشركة الصانعة.
  </p>

  <p>
    نفتخر في كار سيرفيس ، كوننا الشركة الأولى و النموذجية في تقديم أول فحص علمي و تقني شامل 
    و مختص في فحص وتقييم السيارات بتقديم اول تقرير مفصل يعطي الحالة الحقيقية للسيارة 
    عن طريق فحص دقيق و شامل لجميع أجزاء السيارة لاكثر من 200 نقطة تشمل جميع الأنظمة و النقاط 
    من النمرة للنمرة، بعيدا عن استخدام أي مصطلحات غير مفهومة ومبهمة، ولا تلائم التطور 
    التقني والتكنولوجي الذي وصلت إليه شركات السيارات والتي تتسابق في سبيل تحقيق الأفضل.
  </p>

  <p>
    قمنا في كار سيرفيس، بفحص آلاف السيارات وحماية المئات من المشترين من التعرض لعمليات 
    الخداع بحجة أن السيارة "4 جيد" أو "7 جيد" أو "حبة بلادها"، وغيرها الكثير من مثل هذه المصطلحات.
  </p>

  <p>
    قرار شراء السيارة قرار مهم في هذه الأيام، وعند اتخاذه قم بالإجراءات الصحيحة واتباع 
    الطريقة العلمية المثلى للفحص، والتي يتبعها كار سيرفيس.
  </p>

  <p className="font-semibold text-red-600 text-lg">
    شاهد تقرير كار سيرفيس لمعرفة الفرق
  </p>
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
                    src={article3} 
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
            onClick={() => navigate('/Articles3')}
              >
                <div className="relative">
                  <img 
                    className='w-full h-48 object-cover cursor-pointer' 
                    src={CARC} 
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
                 "الأكياس الهوائية (Airbags)
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
