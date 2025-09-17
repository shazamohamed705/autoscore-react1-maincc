import React, { useState, useCallback, useMemo } from 'react';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

// Memoized FAQ component for better performance
const FAQItem = React.memo(({ item, index, isActive, onToggle }) => (
  <div className="mb-4">
    {/* Question Box */}
    <div
      className="flex items-center justify-between p-4 cursor-pointer transition-all duration-300 ease-in-out
        bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100"
      onClick={() => onToggle(index)}
    >
      {/* Question Text */}
      <h3 className="text-lg font-medium text-black text-right flex-1 ml-4">
        {item.question}
      </h3>

      {/* Red Plus/Minus Icon */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
          {isActive ? (
            <IoMdRemove className="text-white text-lg" />
          ) : (
            <IoMdAdd className="text-white text-lg" />
          )}
        </div>
      </div>
    </div>
  
    {/* Answer */}
    {isActive && (
      <div className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-700 text-right leading-relaxed">
          {item.answer}
        </p>
      </div>
    )}
  </div>
));

function Questions() {
  const [activeIndex, setActiveIndex] = useState(null);

  // Optimized FAQ data with proper answers
  const faqs = [
    { 
      question: 'ما هو فحص كار سيرفس وما المنظومات التي يتم فحصها ؟', 
      answer: 'فحص كار سيرفس هو فحص شامل للمركبة يشمل المحرك، الفرامل، الإطارات، الإضاءة، والأنظمة الكهربائية. يتم فحص أكثر من 50 نقطة في المركبة لضمان السلامة والأداء الأمثل.' 
    },
    { 
      question: 'كم تبلغ تكلفة الفحص في كار سيرفس؟', 
      answer: 'تختلف تكلفة الفحص حسب نوع المركبة والخدمات المطلوبة. يبدأ السعر من 800 جنيه مصري للمركبات الصغيرة وصولاً إلى 1500 جنيه مصري للمركبات الكبيرة والشاحنات.' 
    },
    { 
      question: 'ما هي المدة الزمنية التي يستغرقها الفحص؟', 
      answer: 'يستغرق الفحص الكامل ما بين 45-60 دقيقة للمركبات العادية، وقد يصل إلى 90 دقيقة للمركبات الكبيرة أو التي تحتاج فحص إضافي.' 
    },
    { 
      question: 'ما هي الأمور المسؤولة عن عدم نجاح المركبة ؟ حتى لو كانت النسبة المئوية أكثر من 50% ؟', 
      answer: 'قد تفشل المركبة في الفحص بسبب مشاكل في الفرامل، الإطارات، الإضاءة، أو الأنظمة الأمنية. حتى لو كانت النسبة الإجمالية أكثر من 50%، يجب أن تكون جميع الأنظمة الأساسية تعمل بشكل صحيح.' 
    },
    { 
      question: 'هل هناك فروع أخرى لكار سيرفس ؟', 
      answer: 'نعم، لدينا عدة فروع في مختلف أنحاء المملكة. يمكنك زيارة موقعنا الإلكتروني أو الاتصال بنا لمعرفة أقرب فرع لك.' 
    },
    { 
      question: 'هل فحص كار سيرفس معتمد من قبل الجهات الرسمية؟', 
      answer: 'نعم، جميع فحوصاتنا معتمدة من قبل وزارة النقل والمواصلات وهيئة المواصفات والمقاييس السعودية.' 
    },
    { 
      question: 'ماهي أوقات الدوام الرسمي في كار سيرفس؟', 
      answer: 'نعمل من السبت إلى الخميس من الساعة 8:00 صباحاً حتى 6:00 مساءً، والجمعة من الساعة 2:00 ظهراً حتى 6:00 مساءً.' 
    },
    { 
      question: 'هل من الضروري حجز موعد قبل القدوم ؟', 
      answer: 'ننصح بحجز موعد مسبق لتوفير الوقت وضمان الخدمة السريعة، لكن يمكنك القدوم بدون حجز وسنقوم بخدمتك في أقرب وقت متاح.' 
    },
    { 
      question: 'ما هي أنواع وموديلات المركبات التي يتم فحصها ؟', 
      answer: 'نفحص جميع أنواع المركبات: السيارات الصغيرة، السيارات الرياضية، الشاحنات، الحافلات، والدراجات النارية. نتعامل مع جميع الماركات والموديلات.' 
    },
    { 
      question: 'ما هو أساس احتساب النسبة المئوية والتقييم للمركبة؟', 
      answer: 'يتم احتساب النسبة بناءً على حالة المحرك (30%)، الفرامل (25%)، الإطارات (20%)، الإضاءة (15%)، والأنظمة الأمنية (10%). كل نظام له نقاط محددة تؤثر على التقييم النهائي.' 
    },
  ];

  // Optimized toggle function with useCallback for better performance
  const toggleFAQ = useCallback((index) => {
    setActiveIndex(activeIndex === index ? null : index);
  }, [activeIndex]);

  // Memoized FAQ list for better performance
  const faqList = useMemo(() => 
    faqs.map((item, index) => (
      <FAQItem
        key={index}
        item={item}
        index={index}
        isActive={activeIndex === index}
        onToggle={toggleFAQ}
      />
    )), [faqs, activeIndex, toggleFAQ]
  );

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            أكثر <span className="text-red-600">الأسئلة</span> الشائعة لدينا وإجاباتها
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            هل لديك <span className="text-red-600">أسئلة</span> ؟
          </p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            يرجى قراءة الأسئلة وإن لم تجد الإجابة التي تبحث عنها ، الرجاء التواصل معنا
          </p>
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          {faqList}
        </div>
      </section>
    </>
  );
}

export default Questions;
