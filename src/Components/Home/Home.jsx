import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from "react-router-dom";
import { Router } from 'react-router-dom'
import { FaCalendarAlt, FaWhatsapp, FaPhoneAlt, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import rectangle from '../../assets/Rectangle 113.png'

import f1 from '../../assets/f1.png'
import f2 from '../../assets/f2.png'
import f3 from '../../assets/f3.png'
import f4 from '../../assets/f4.png'
import f5 from '../../assets/f5.png'
import f6 from '../../assets/f6.png'
import f7 from '../../assets/f7.png'
import f8 from '../../assets/f8.png'
import f10 from '../../assets/f10.png'
import f11 from '../../assets/f11.png'
import f12 from '../../assets/f12.png'
import photo5 from '../../assets/photo5.png'
import photo1 from '../../assets/photo5.png'
import phoyo7 from '../../assets/phoyo7.png'
import photo3 from '../../assets/photo3.png'
import photo4 from '../../assets/photo4.png'
import photo6 from '../../assets/photo6.png'
import bg3 from '../../assets/Clip path group.png'
import article from '../../assets/Group 46.png'
import article1 from '../../assets/article1.png'
import article2 from '../../assets/article2.png'
import article3 from '../../assets/article3.png'
import say from '../../assets/say.png'
import say2 from '../../assets/say2.png'
import car from '../../assets/car.png'

import { GoArrowUpRight } from 'react-icons/go'
import Slider from 'react-slick/lib/slider'
import { TbMessageHeart } from 'react-icons/tb'
function Home() {
 

  

  // State for image modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [active, setActive] = useState(0);

  // عملائنا قالو عننا ايه ؟ - محسن للأداء
  const settings2 = useMemo(() => ({
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    fade: true,
    cssEase: "linear"
  }), []);
    const navigate = useNavigate(); // ⚡ مهم: هنا بتعرف المتغير
{/* بيانات الفروع - محسنة للأداء */}
const branchesData = useMemo(() => ({
  'المقطم': {
    title: 'فرع المقطم',
    description: 'الموقع الاستراتيجي في منطقة المقطم بالقاهرة، بالقرب من الطريق الدائري الذي يربط الشمال والجنوب من العاصمة. مع مساحة تزيد عن 2000 متر مربع، وهو منشأة مزودة بأحدث التقنيات الحديثة لفحص المركبات، و 10 رافعات لضمان الخدمة المثلى، بسعة 25 مركبة. تم تصميم المرفق خصيصًا للتعامل مع جميع أنواع المركبات في نفس الوقت، حيث يقوم الموظفون بإجراء عملية تفتيش يتم خلالها اتخاذ جميع تدابير مراقبة الجودة للحفاظ على أعلى مستوى من الدقة والدقة.',
    team: 'فريق العمل في فرع المقطم يتكون من مهندسي الإشراف، مهندسي التفتيش، الفنيين، وحدات التحكم، مهندسي مراقبة الجودة، المدير الفني، ومدير العمليات.',
    image: rectangle
  },
  'المعادي': {
    title: 'فرع المعادي',
    description: 'يقع فرع المعادي في موقع استراتيجي مميز بالقرب من كورنيش النيل، مما يوفر سهولة الوصول للعملاء من جميع أنحاء القاهرة الكبرى. يتميز هذا الفرع بمساحة واسعة تصل إلى 3000 متر مربع ومجهز بأحدث المعدات التقنية لفحص المركبات.',
    team: 'يضم الفرع فريق عمل متخصص من المهندسين والفنيين ذوي الخبرة العالية في مجال فحص وصيانة المركبات.',
    image: rectangle
  },
  'نزلة السمان': {
    title: 'فرع نزلة السمان',
    description: 'فرع نزلة السمان يقع في قلب العاصمة القاهرة، ويقدم خدمات شاملة لفحص وصيانة المركبات. يتميز بموقع متميز وسهولة الوصول من جميع مناطق العاصمة.',
    team: 'فريق عمل محترف ومتخصص في جميع أنواع المركبات، من السيارات الصغيرة إلى الشاحنات الكبيرة.',
    image: rectangle
  }
}), []);

const [activeTab, setActiveTab] = useState('المقطم');

// Customer reviews data - optimized for performance with useMemo
const customerReviews = useMemo(() => [
  {
    id: 1,
    name: "ناز آل دباغ",
    rating: 5,
    review: "المكان الوحيد إذا كنت ترغب في شراء سيارة مستعملة يقومون بفحص كل شيء وجعل حياتك سهلة. أفضل مكان في الأردن",
    logo: "E" // Logo representation
  },
  {
    id: 2,
    name: "مصطفي الحسيني",
    rating: 5,
    review: "ما شاء الله تبارك الله، خدمة الفحص عندكم أكثر من رائعة. السيارة تم فحصها بشكل دقيق جداً وكل صغيرة وكبيرة تم شرحها لي بالتفصيل.",
    logo: "E"
  },
  {
    id: 3,
    name: "أحمد محمد",
    rating: 5,
    review: "خدمة ممتازة ومهنية عالية. التقرير كان مفصل جداً وساعدني أتخذ القرار الصحيح. أنصح الجميع بالتعامل معهم.",
    logo: "E"
  }
], []);

// Star rating component - memoized for performance
const StarRating = React.memo(({ rating }) => {
  const stars = useMemo(() => 
    [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className="w-4 h-4 fill-current text-yellow-400"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    )), [rating]
  );
  
  return <div className="flex justify-center gap-1">{stars}</div>;
});

// Logo component - memoized for performance
const LogoComponent = React.memo(({ logo }) => (
  <div className="flex justify-center mb-4">
    <div className="flex flex-col gap-1">
      <div className="w-8 h-1 bg-red-500 rounded-full"></div>
      <div className="w-8 h-1 bg-red-500 rounded-full"></div>
      <div className="w-8 h-1 bg-red-500 rounded-full"></div>
    </div>
  </div>
));

// Customer reviews state
const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
const [isVisible, setIsVisible] = useState(true);

// Auto-rotate reviews every second - optimized with useCallback
const rotateReview = useCallback(() => {
  setIsVisible(false);
  setTimeout(() => {
    setCurrentReviewIndex((prevIndex) => 
      (prevIndex + 1) % customerReviews.length
    );
    setIsVisible(true);
  }, 300); // Smooth transition
}, []);

useEffect(() => {
  const interval = setInterval(rotateReview, 4000); // Changed from 1000ms to 4000ms (4 seconds)
  return () => clearInterval(interval);
}, [rotateReview]);

const currentReview = customerReviews[currentReviewIndex];
const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  // Function to handle view all articles
  const handleViewAll = () => {
    navigate('/articles');
  };

  // Function to open image modal
  const openImageModal = useCallback((imageSrc, imageAlt) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt });
    setIsModalOpen(true);
  }, []);

  // Function to close image modal
  const closeImageModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
  }, []);

  return (
    <>

      {/* home */}
{/* سكشن Home */}
<section className="home flex flex-col md:flex-row justify-between items-start pt-4 md:pt-8 px-6 bg-gray-50 dark:bg-gray-900 relative">
  {/* الكلام والزر */}
  <div className="text-center max-w-xl z-10">
    <h1 className="text-3xl md:text-3xl font-extrabold dark:text-white leading-snug">
      <span className="text-red-600">أول</span> نظام فحص
      <span className="block mt-2">مركبات شامل عالمي</span>
    </h1>

    <button
      onClick={() => navigate('/appointment')}
      className="mt-8 px-12 py-4 rounded-full text-white font-semibold shadow-lg transition duration-300 transform 
                 bg-red-600 border border-black dark:border-white
                 hover:bg-red-700 hover:scale-105 hover:shadow-2xl text-lg"
    >
      احجز الآن
    </button>
  </div>

 <div className="absolute bottom-0 left-20 w-1/3 md:w-1/4">
  <img src="./sc2.png" alt="car" className="w-full h-auto" />
</div>
</section>


<div className="h-16 md:h-24"></div>

<section className="w-full py-16 bg-black dark:bg-gray-900">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-white mb-12">
      تواصل معنا
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      {/* الكارت الأول */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-row items-center text-right gap-4">
        <div className="bg-black dark:bg-gray-700 text-white w-16 h-16 flex items-center justify-center rounded-full">
          <FaCalendarAlt size={28} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">تريد فحص سيارتك؟</h3>
          <p className="text-gray-600 dark:text-gray-300">احجز الآن</p>
        </div>
      </div>

      {/* الكارت الثاني */}
      <a 
        href="https://wa.me/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-row items-center text-right gap-4 hover:shadow-xl transition duration-300"
      >
        <div className="bg-green-500 text-white w-16 h-16 flex items-center justify-center rounded-full">
          <FaWhatsapp size={28} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">راسلنا على واتساب</h3>
        </div>
      </a>

      {/* الكارت الثالث */}
      <a 
        href="tel:+96265802228" 
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-row items-center text-right gap-4 hover:shadow-xl transition duration-300"
      >
        <div className="bg-red-500 text-white w-16 h-16 flex items-center justify-center rounded-full">
          <FaPhoneAlt size={28} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">اتصل بنا</h3>
        </div>
      </a>

    </div>
  </div>
</section>


{/* كار سيرفيس */}
<section className="flex justify-center py-10 px-6 bg-gray-50 dark:bg-gray-900">
  <div className="max-w-4xl w-full flex flex-col items-center text-center">
    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
   
    </h3>
 


    {/* النص */}
   <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">
  كـــــار <span className="text-red-600">سيرفيس</span>
</h1>

<p className="leading-8 text-gray-700 dark:text-gray-300">
  كار سيرفيس هو الفحص الأول في مصر و الشرق الأوسط الذي يعتمد على أسس علمية وهندسية 
  في قياس كفاءة السيارة الداخلية والخارجية عن طريق فحص أكثر من 200 نقطة تشمل جميع أجزاء السيارة 
  من النمرة للنمرة بنظام العلامة المئوية (السكور) بأحدث وسائل الفحص من شركة بوش الألمانية. 
  يفحص نظام كار سيرفيس جميع مكونات السيارة من الشاصي والهيكل، الأنظمة الميكانيكية والكهربائية جميعها، 
  من النمرة للنمرة لجميع أنواع السيارات (البنزين، الهايبرد والكهربائية).
  <br /><br />
  لدينا في كار سيرفيس شراكات محلية وعالمية للحصول على معلومات وتاريخ السيارة، بالإضافة الى الربط مع 
  إدارة الترخيص للحصول على جميع المعلومات داخل مصر وارفاقها في تقرير كار سيرفيس.
  <br /><br />
  قطاع السيارات يتطور بشكل سريع، ودخول التكنولوجيا الحديثة في مجال صناعة السيارات يسبب عبء على المشتري 
  لاتخاذ قرار شراء سيارة مستعملة، وجود كار سيرفيس يساعد المشتري على اتخاذ هذا القرار وحماية استثماره.
</p>
  </div>
</section>

<section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
  <div className="max-w-7xl mx-auto text-center">
    {/* العنوان */}
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
      لماذا <span className="text-red-600"> كار سيرفيس؟</span>
    </h2>

    {/* الكروت */}
 <div className="grid md:grid-cols-4 gap-8">
      
{/* الكرت الأول */}
<div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
  {/* مكان للصورة */}
  <div className="mb-6 w-24 h-24 flex items-center justify-center">
    <img src="/car.png" alt="تقرير مفصل" className="w-full h-full object-contain" />
  </div>
  <p className="text-gray-700 dark:text-gray-300 font-medium">
    جود تقرير مفصل عن حالة السيارة مدعمة بصور وفيديوهات وعلامة مئوية نهائية تبين حالة السيارة العامة
  </p>
</div>

{/* الكرت الثاني */}
<div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
  {/* مكان للصورة */}
  <div className="mb-6 w-24 h-24 flex items-center justify-center">
    <img src="/sharch.png" alt="فحص السيارات الكهربائية" className="w-full h-full object-contain" />
  </div>
  <p className="text-gray-700 dark:text-gray-300 font-medium">
    متخصصين في فحص السيارات الكهربائية والهايبرد بوجود فريق من المهندسين والفنيين المدربين
  </p>
</div>

{/* الكرت الثالث */}
<div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
  {/* مكان للصورة */}
  <div className="mb-6 w-24 h-24 flex items-center justify-center">
    <img src="/cliack.png" alt="اجهزة الفحص" className="w-full h-full object-contain" />
  </div>
  <p className="text-gray-700 dark:text-gray-300 font-medium">
  وجود اجدد اجهزة الفحص من شركة بوش BOSCH العالمية وشركات عالمية اخرى لجميع انواع السيارات
  </p>
</div>

{/* الكرت الرابع */}
<div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
  {/* مكان للصورة */}
  <div className="mb-6 w-24 h-24 flex items-center justify-center">
    <img src="/prcone.png" alt="مركز الفحص" className="w-full h-full object-contain" />
  </div>
  <p className="text-gray-700 dark:text-gray-300 font-medium">
   اول مركز فحص بعتمد على اسس علمية وتقنية لفحص وتقييم المركبات لاكثر من 200 نقطة فحص
  </p>
</div>

</div>
  </div>
</section>






      {/* ارقــامــنــا */}
{/* ارقــامــنــا */}
<section className="my-4 py-20 relative bg-black">
  <img
    className="absolute top-0 end-0 hidden md:block"
    src={bg3}
    alt=""
  />

  {/* العنوان */}
<div className="w-fit mx-auto text-center -mt-16">
  {/* العنوان */}
  <h2 className="lg:text-4xl font-light">
    <span className="text-white">أرقام و </span>
    <span className="text-red-600">إحصائيات</span>
  </h2>

  {/* السنة مفصولة بمسافة */}
  <h2 className="mt-4 text-lg font-ligth text-white">
    2021-2025
  </h2>
</div>


  {/* الكروت */}
  <div className="w-4/5 mx-auto mt-10">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {useMemo(() => [
        { img: photo5, num: "+105,000", text: "سيارة تم فحصها" },
        { img: photo6, num: "+80", text: "معرض معتمد" },
        { img: photo1, num: "16", text: "جهة معتمدة" },
        { img: photo3, num: "+70", text: "موظف" },
        { img: phoyo7, num: "+14,000", text: "تلاعب تم كشفه" },
        { img: photo4, num: "4", text: "فروع" },
      ], []).map((item, index) => (
        <div
          key={index}
          className="bg-white flex flex-col items-center text-center border border-black shadow-md rounded-tl-md rounded-br-md py-4 text-red-600"
        >
          <img className="w-1/3 my-4" src={item.img} alt="" loading="lazy" decoding="async" />
          <h2 className="font-bold text-2xl">{item.num}</h2>
          <p className="my-3">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
</section>



 
 {/*الفروع  */}

       <section className='w-full mx-auto py-8 bg-white'>
         <section className='w-full mx-auto py-8 bg-white'>
        {/* العنوان الرئيسي */}
        <div className="text-center mb-8">
        <h2 className="lg:text-4xl font-light">
    <span className="text-black"> فروع كـــــار</span>
    <span className="text-red-600">سيرفيس</span>
  </h2>
        </div>

         {/* قائمة التبويبات */}
         <div className="flex justify-center mb-12">
           <div className="flex space-x-16 border-b border-gray-200">
             {Object.keys(branchesData).map((branchName) => (
               <button 
                 key={branchName}
                 onClick={() => setActiveTab(branchName)}
                 className={`pb-4 px-4 text-xl font-semibold transition-all duration-300 ${
                   activeTab === branchName 
                     ? 'text-red-600 border-b-3 border-red-600' 
                     : 'text-gray-600 border-b border-gray-300 hover:text-red-600 hover:border-red-600'
                 }`}
               >
                 {branchName}
               </button>
             ))}
           </div>
         </div>

        {/* المحتوى الرئيسي */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* العمود الأيسر - النص والأزرار */}
            <div className="space-y-8">
              {/* عنوان الفرع */}
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                {branchesData[activeTab].title}
              </h2>
              
              {/* وصف الفرع */}
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  {branchesData[activeTab].description}
                </p>
                
                <p className="text-lg">
                  {branchesData[activeTab].team}
                </p>
              </div>
              
              {/* الأزرار */}
              <div className="flex gap-4 pt-6">
                  <button
      onClick={() => navigate('/appointment')}
      className="px-12 py-4 rounded-full text-white font-semibold shadow-lg transition duration-300 transform 
                 bg-red-600 border border-black dark:border-white
                 hover:bg-red-700 hover:scale-105 hover:shadow-2xl text-lg"
    >
      احجز الآن
    </button>
               
              </div>
            </div>
            
            {/* العمود الأيمن - الصورة */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500">
                <img 
                  src={branchesData[activeTab].image} 
                  alt={`ورشة صيانة السيارات - ${branchesData[activeTab].title}`}
                  className="w-full h-auto object-cover transition-all duration-500"
                  loading="lazy"
                  decoding="async"
                />
                {/* لافتة الشعار */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-800">autoscore</span>
                    <span className="text-red-600 font-bold text-lg">e</span>
                  </div>
                </div>
                {/* عنوان الفرع على الصورة */}
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <h3 className="text-white font-semibold text-lg">
                    {branchesData[activeTab].title}
                  </h3>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>


       
        
      </section>
       
        <section className="py-12 bg-gray-100">
  {/* العنوان */}
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold">
      ماذا يغطي <span className="text-red-600">التقرير ؟</span>
    </h2>
    <p className="text-gray-600 mt-2">
      يغطي التقرير 11 مجموعة
    </p>
  </div>

  {/* الشبكة */}
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 w-4/5 mx-auto">
    {useMemo(() => [
      { img: f3, text: "تاريخ المركبه  " },
      { img: f4, text: "الهيكل الخارجي " },
      { img: f1, text: " الشاصي والهيكل " },
      { img: f2, text: " المحرك وناقل الحركه" },
      { img: f12, text: " نظام التعليق " },
      { img: f10, text: " المجموعه الكهربيه" },
      { img: f8, text: " نظام التكيف " },
      { img: f7, text: " المكابح والسلامه" },
      { img: f6, text: " سجلات المركبه" },
      { img: f5, text: "فحص الطريق  " },
      { img: f11, text: " تقارير المركبه" },
    ], []).map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center text-center"
      >
        <img src={item.img} alt="" className="w-16 h-16 object-contain" loading="lazy" decoding="async" />
        <p className="mt-3 font-semibold text-gray-800">{item.text}</p>
      </div>
    ))}
  </div>

  {/* زر تحت */}
  <div className="text-center mt-10">
    <button

          onClick={() => navigate('/Example')}

     className="bg-red-600 text-white px-6 py-2 rounded-md shadow hover:bg-red-700">
      مثال عن التقرير
    </button>
  </div>
</section>
  {/* آراء العملاء - تصميم كامل الصفحة */}

      <section className="w-full h-96 md:h-[500px] flex flex-col justify-center items-center relative bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="lg:text-4xl font-light">
    <span className="text-black">  آراء</span>
    <span className="text-red-600">العملاء</span>
  </h2>
          <Link 
            to="/CustomerReviews" 
            className="text-red-600 text-sm underline hover:text-red-700 transition-colors"
          >
            مشاهدة جميع الآراء
          </Link>
        </div>

        {/* Review Content - Full Page */}
        <div className="w-full max-w-6xl mx-auto px-8">
          <div 
            className={`
              text-center transition-all duration-500 ease-in-out
              ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}
            `}
          >
            {/* Logo */}
            <LogoComponent logo={currentReview.logo} />
            
            {/* Customer Name */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {currentReview.name}
            </h3>
            
            {/* Star Rating */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className="w-6 h-6 fill-current text-yellow-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            {/* Review Text */}
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
              "{currentReview.review}"
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-8">
            <button 
              className="bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  setCurrentReviewIndex((prevIndex) => 
                    prevIndex === 0 ? customerReviews.length - 1 : prevIndex - 1
                  );
                  setIsVisible(true);
                }, 300);
              }}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-3">
              {customerReviews.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentReviewIndex ? 'bg-red-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => {
                      setCurrentReviewIndex(index);
                      setIsVisible(true);
                    }, 300);
                  }}
                />
              ))}
            </div>

            <button 
              className="bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  setCurrentReviewIndex((prevIndex) => 
                    (prevIndex + 1) % customerReviews.length
                  );
                  setIsVisible(true);
                }, 300);
              }}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>


      {/* المقالات */}

 <section className="w-10/12 mx-auto my-2 py-2 md:py-10">
      <div>
        {/* Header Section with Logo Squares */}


        {/* Main Title */}
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-5xl text-red-600 mb-8">
            المقالات
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
            onClick={() => handleArticleClick('car-service-reports')}
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
            onClick={() => handleArticleClick('car-inspection-process')}
          >
            <div className="relative">
              <img 
                className='w-full h-48 object-cover cursor-pointer' 
                src={article1} 
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
                ازاي بيتم فحص السياره في مراكز خدمه كار سيرفيس
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


      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <FaTimes size={24} />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Home 