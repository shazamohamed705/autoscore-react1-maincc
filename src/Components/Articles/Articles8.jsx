import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import article3 from '../../assets/article3.png';
import article1 from '../../assets/article1.png';
import article2 from '../../assets/article2.png';
import CARL from '../../assets/CARL.png'; // غيريها بصورة مناسبة للمقال

export default function ArticlesSuspensionBrakes() {
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
          علاقة نظام التعليق بنظام الكبح وأثرهما على سلامة القيادة
        </h1>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 rounded-md p-6">
        <div className="space-y-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">

          {/* Hero Image */}
          <div className="w-full h-300 md:h-300 mb-6 rounded-md overflow-hidden">
            <img
              src={CARL}
              alt="نظام التعليق والكبح"
              className="w-full h-full object-cover"
            />
          </div>

          <p>
            عند قيادة المركبة، تعتبر سلامة السائق والركاب أولوية قصوى، حيث أن مختلف مكونات 
            السيارة تؤثر على الأمان. من بين هذه المكونات، يلعب <strong>نظام التعليق</strong> 
            و<strong>نظام الكبح</strong> دورًا محوريًا، إذ يساهم التعليق في السيطرة والسلاسة 
            أثناء القيادة، بينما يتكفل الكبح بإبطاء وإيقاف المركبة.
          </p>

          <h2 className="text-lg font-bold mt-6">مكونات نظام التعليق</h2>
          <p>
            يتكون نظام التعليق من عدة أجزاء تشمل: الإطارات وضغط الهواء، الكفات، أعمدة التوازن، 
            البوكسات، ممتص الصدمات، الزنبركات وغيرها. جميعها عناصر حاسمة تؤثر مباشرة 
            على ثبات المركبة وتحكم السائق بها.
          </p>

          <h2 className="text-lg font-bold mt-6">فحص نظام التعليق</h2>
          <p>
            في <strong>مركز كارسيرفيس</strong> يتم فحص نظام التعليق بعدة طرق تبدأ بالفحص 
            النظري من أسفل المركبة للتأكد من سلامة الجلود والبوكسات، وخلو الكفات 
            وأعمدة التوازن من الكسور أو الضربات.
          </p>
          <p>
            كما يتم استخدام جهاز <strong>Testlane</strong> لإجراء اختبارات دقيقة تقيس كفاءة 
            ممتص الصدمات، انحراف المركبة، الحاجة لموازنة الهيئة الأمامية والخلفية، 
            بالإضافة إلى اختبار نظام الكبح والهاند بريك بمقارنة القراءات مع المواصفات 
            الأصلية للمركبة.
          </p>
          

          <h2 className="text-lg font-bold mt-6">مكونات نظام الكبح</h2>
          <p>
            يشمل نظام الكبح عدة أجزاء رئيسية: دعسة البريك، السيرفو بريك، الأسطوانة الرئيسية، 
            الخراطيم، المكابس، فحمات البريك، الدرمات، زيت الفرامل، نظام ABS، 
            وحساسات سرعة العجلات.
          </p>

          <h2 className="text-lg font-bold mt-6">فحص نظام الكبح</h2>
          <p>
            يتم فحص النظام عبر تجارب الطريق والفحص النظري للأجزاء والعمر الافتراضي لها، 
            بالإضافة إلى التأكد من كفاءة زيت الفرامل وعدم وجود أي تسريب. 
            كما يتم استخدام أجهزة التشخيص لتحديد الأعطال بدقة وبيان أسبابها.
          </p>
          

          <h2 className="text-lg font-bold mt-6">العلاقة بين نظام التعليق والكبح</h2>
          <p>
            ضعف نظام التعليق يقلل بشكل مباشر من كفاءة نظام الكبح. فعلى سبيل المثال:  
            عند سرعة <strong>80 كم/س</strong> تحتاج المركبة لمسافة <strong>30 مترًا</strong> للتوقف 
            عند كفاءة كاملة، بينما تحتاج إلى <strong>37 مترًا</strong> عند كفاءة 50% 
            (زيادة 23.3%).  
          </p>
          <p>
            عند سرعة <strong>110 كم/س</strong> تحتاج المركبة إلى <strong>60 مترًا</strong> للتوقف 
            بكفاءة كاملة، مقابل <strong>69 مترًا</strong> عند كفاءة 50% 
            (زيادة 15%).  
          </p>

          <p>
            لذلك يوفر <strong>مركز كارسيرفيس </strong> فحصًا علميًا دقيقًا بعيدًا عن الطرق التقليدية 
            مثل هز المركبة يدويًا، لضمان أعلى معايير السلامة.
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
