import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import article1 from "../../assets/article1.png";
import article2 from "../../assets/article2.png";
import article3 from "../../assets/article3.png";
import CARA from "../../assets/CARA.png";
import CARB from "../../assets/CARB.png";
import CARC from "../../assets/CARC.png";
import CARF from "../../assets/CARF.png";
import CARD from "../../assets/CARD.png";
import CARS from "../../assets/CARS.png";
import CARK from "../../assets/CARK.png";
import CARL from "../../assets/CARL.png";
import CARP from "../../assets/CARP.png"
function Articles() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  // مقالاتك
  const articles = [
    { title: "لماذا يجب ان تختار كار سيرفيس؟", text: "ليك عزيزي القارئ لمحة سريعة ...", image: article3, link: "/why-car" },
    { title: "شاهد تقارير كار سيرفيس !!", text: "كـــــارسيرفيس يكشف المستور ...", image: article2, link: "/car-reporets" },
    { title: "اشترِ بثقة.. بلا خداع", text: "وفي ظل الظروف الإقتصادية ...", image: article1, link: "/car-process" },
    { title: "عداد السيارة", text: "يعد عداد المسافة المقطوعة ...", image: CARA, link: "/Articles1" },
    { title: "الطريقة العلمية لفحص البودي", text: "شهدت صناعة السيارات ...", image: CARB, link: "/Articles2" },
    { title: "الأكياس الهوائية (Airbags)", text: "عند شراء سيارة مستعملة ...", image: CARC, link: "/Articles3" },
    { title: " فحص السيارة قبل شرائها", text: "إن قرار شراء سيارة هو بمثابة استثمار عملي سيوفر لك بشكل أساسي عملية تنقّل سهلة وميسّرة...", image: CARF, link: "/Articles4" },
    { title: "المحرك", text: "يعد محرك المركبة أحد أهم أجزاء المركبة الرئيسية، وهو القلب النابض الذي يمدها بالحركة ، والتي", image: CARD, link: "/Articles5" },
    { title: "Title Washing", text: "يعد التلاعب بتايتل المركبة أمر شائع في الولايات المتحدة ولكن غير قانوني", image: CARS, link: "/Articles6" },
    { title: "Tires", text: "ما هو العمر الافتراضي لإطارات المركبة؟  وكيف يمكن جعل عمر الإطارات  يدوم لفترة أطول؟", image: CARP, link: "/Articles7" },
    { title: "نظام التعليق والكبح", text: "عند قيادة المركبة، تعتبر سلامة السائق والركاب أهمية قصوى ، حيث أن مختلف مكونات السيارة", image: CARL, link: "/Articles8" },
    { title: "ناقل الحركة (الجير)", text:"عند شراء سيارة مستعملة ، ينبغي التأكد من أنها في أفضل حالة ممكنة قبل القيام بإتمام عملية", image: CARK, link: "/Articles9" },
  ];

  const itemsPerPage = 6; // 6 مقالات في الصفحة
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleArticles = articles.slice(start, end);

  return (
    <section className="w-11/12 mx-auto my-10 py-10 relative">
      {/* أزرار التحكم */}
    <button
  onClick={prevPage}
  className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 z-10"
>
  <GoArrowLeft size={20} />
</button>

      <button
  onClick={nextPage}
  className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 z-10"
>
  <GoArrowRight size={20} />
</button>

      {/* شبكة 3 × 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleArticles.map((article, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => navigate(article.link)}
          >
            <img
              className="w-full h-32 object-cover"
              src={article.image}
              alt={article.title}
            />
            <div className="p-4">
              <h3 className="font-bold text-md mb-2 text-black hover:text-red-600 transition-colors duration-200">
                {article.title}
              </h3>
              <p className="text-gray-700 text-xs leading-relaxed line-clamp-3">
                {article.text}
              </p>
              <button className="text-red-600 font-medium text-xs hover:underline mt-2">
                اقرأ المزيد ←
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* مؤشرات الصفحات */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-3 h-3 rounded-full ${
              i === currentPage ? "bg-red-600" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default Articles;
