import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import article3 from '../../assets/article3.png';
import article1 from '../../assets/article1.png';
import article2 from '../../assets/article2.png';
import CARC from '../../assets/CARC.png';
import AIR1 from '../../assets/AIR1.png';
import AIR2 from '../../assets/AIR2.png';
export default function ArticlesAirbags() {
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
          الأكياس الهوائية في المركبات: <span className="text-red-500">تقنية السلامة</span>
        </h1>
      </section>

     

      {/* Main Content */}
      <section className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 rounded-md p-6">
        <div className="space-y-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">
 {/* Hero Image */}
      <div className="flex justify-center mb-6">
        <img
          src={CARC}
          alt="الأكياس الهوائية"
          className="w-full md:h-96 h-80 object-cover rounded-md"
        />
      </div>
          <p>
            
الأكياس الهوائية: تقنية السلامة في المركبة : 
الوسائد الهوائية ليست تقنية جديدة في سلامة السيارات، حيث يعود تاريخ إستخدامها لخمسينيات القرن الماضي، وهذه الوسائد الهوائية صممت خصيصا لتأمين ركاب السيارة من أي إصابات خطيرة أو من الحوادث المميتة. وحيث تعمل الوسائد الهوائية سوية بجانب أحزمة الأمان لتأمين أفضل حماية للركاب داخل السيارة بأفضل طريقة.

تساعد الوسائد الهوائية في إنقاذ الركاب من الإصابات، حيث أن هناك احتمالية عالية لاصدام الجزء العلوي من الجسم والرأس للركاب بالأجزاء الداخلية من السيارة، وقد يؤدي ذلك إلى إصابات أو حوادث مميتة.


          </p>

          <p>
           
تاريخ الأكياس الهوائية :
يعود تاريخ الوسادة الهوائية إلى عام 1951، الوسادة هوائية هي واحدة من أدوات سلامة السيارات من اختراع المهندس الألماني والتر ليندر والأمريكي جون دبليو. وقد صنعت الوسائد الهوائية على نظام الهواء المضغوط، ويتم تفعيلها إما عن طريق المصد أو من قبل السائق. في عام 1960، وجد البحث أن هذه الوسائد الهوائية ليست آمنة وغير قادرة على توفير أسرع وأقصى مستوى من الأمان . وقد وصف الباحثون اختراع المهندس الألماني والتر ليندر والأمريكي جون دبليو هيتريك بأنه نظام غير عملي.

في عام 1964، في اليابان، ياسزابورو كوبوري، بدأ تطوير شبكة أمان الوسائد الهوائية وحصل أيضا على براءات الاختراع في 14 بلدا، ولكن في عام 1975 توفي دون أن يرى الانتشار الواسع للوسائد الهوائية .

في عام 1967، اخترع )ألن ك. بريد( كرة ميكانيكية في أنبوب للكشف عن التحطم ويعتبر هذا الاختراع أن يكون حدث هام في تاريخ الوسائد الهوائية. تم توصيل جهاز الاستشعار الكهروميكانيكي مع كرة فولاذية إلى أنبوب من خلال المغناطيس الذي يضخم الوسادة الهوائية ويملأها بالهواء في أقل من 30 مللي ثانية. لأول مرة ، بدلا من الهواء المضغوط ، استخدم بادئ شرارة صغير يولد انفجارًا صغيرًا لِفتح الأكياس الهوائية.


          </p>

          <p>
            <strong>أنواع الوسائد الهوائية:</strong>
          </p>

          <ul className="list-disc pl-6">
            <li>
هناك العديد من أنواع الوسائد الهوائية التي يتم تركيبها في السيارة لحماية الركاب. وفي ما يلي بعض أنواع الوسائد الهوائية:</li>
          
          </ul>
<strong> -الوسادة الهوائية الأمامية للسائق والركاب:</strong>
                    <ul className="list-disc pl-6">
            <li>تم تصميم الوسائد الهوائية الأمامية لتفتح عند الحوادث الأمامية المتوسطة إلى الشديدة، لمنع رأس السائق والراكب وصدره من الاصطدام بالهياكل الصلبة في السيارة
</li>
        <li>وهي توفر أكبر حماية عندما يرتدي الركاب أحزمة الأمان ويجلسون بشكل صحيح في المقعد ولكنها مصممة لتوفير الحماية لجميع الركاب.

</li>  
          </ul>
 <div className="w-full h-48 flex items-center justify-center rounded-md overflow-hidden">
    <img
      src={AIR1}
      alt="الوسادة الهوائية الجانبية"
      className="w-40 h-40"
    />
  </div>
               <strong> - الوسائد الهوائية الجانبية:</strong>
                    <ul className="list-disc pl-6">
                   <li>تحمي الوسائد الهوائية الجانبية السائق والركاب من الإصابات والحوادث المميتة من جوانب السيارة. وتسمى الوسائد الهوائية الجانبية أيضا بالوسائد الستارية، وهي تحمي الرأس من الإصابات
                 </li>
        
                </ul>
                <div className="w-full h-48 flex items-center justify-center rounded-md overflow-hidden">
    <img
      src={AIR2}
      alt="الوسادة الهوائية الأمامية"
      className="w-40 h-40"
    />
  </div>
  <strong> - الوسادة الهوائية للكرسي</strong>
                    <ul className="list-disc pl-6">
                   <li>
                    يتم تركيب وسائد هوائية داخل المقعد لحماية الركاب والسائق من الإصابات، وأيضا للتقليل من نسبة الوفيات. تم تركيب وسادة المقعد لأول مرة في تويوتا، وتم تركيب هذه الوسادة الهوائية لتخفيف الضرر على منطقة الحوض عند التعرض لحادث.


                 </li>
        
                </ul>
                  <strong>- الوسائد الهوائية لحزام الأمان</strong>
                    <ul className="list-disc pl-6">
                   <li>

تم تصميم الوسائد الهوائية لحزام الأمان لإنقاذ الركاب من الإصابات، وعند حدوث التصادم، تظهر هذه الوسائد الهوائية من أحزمة الأمان وتزيد مساحة المنطقة التي يحميها حزام الأمان. حيث تقلل هذه الوسائد من الإصابات المحتملة على الصدر والقفص الصدري.


                 </li>
        
                </ul>
          {/* Placeholder للصور داخل المقال */}
          {/* صور الوسائد الهوائية داخل المقال */}


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
