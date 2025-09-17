import React from 'react';

// Customer reviews data matching the image exactly
const allCustomerReviews = [
  {
    id: 1,
    name: "ناز آل دباغ",
    rating: 5,
    review: "المكان الوحيد إذا كنت ترغب في شراء سيارة مستعملة يقومون بفحص كل شيء وجعل حياتك سهلة. أفضل مكان في مصر."
  },
  {
    id: 2,
    name: "عمر العمرو",
    rating: 5,
    review: "المكان الوحيد والصحيح لفحص السيارات المستعملة. دقيق جداً ومتخصص في فحص كل شيء في السيارة."
  },
  {
    id: 3,
    name: "رامي عيسوه",
    rating: 5,
    review: "خدمة طال انتظارها ومطلوبة بشدة في سوق السيارات المستعملة المصري. مهني ودقيق ومركز على العميل."
  },
  {
    id: 4,
    name: "أحمد غوانمة",
    rating: 5,
    review: "طاقم مذهل ومهني للغاية. المكان نفسه رائع ومنظم. يمكنك ضبط سيارتك بسهولة ومراقبتها أثناء الاختبار. كانت تجربة رائعة، ومن المؤكد أن فحص سيارتك يستحق ذلك. جدير بالثقة."
  },
  {
    id: 5,
    name: "احمد محمد ",
    rating: 4,
    review: "المكان الذي يمكنك فيه فحص أي سيارة قبل الشراء. الفحص يشمل تاريخ السيارة بالإضافة إلى الفحص الفني."
  },
  {
    id: 6,
    name: "خالد قطاوي",
    rating: 5,
    review: "فحص السيارة الذي أجراه كار سيرفيس عندما اشتريت سيارتي من  المعادي  كان شاملاً ومفصلاً ومهنياً. يعطونك كل التفاصيل الصغيرة عن السيارة."
  },
  {
    id: 7,
    name: "عابد ابو حميد",
    rating: 5,
    review: "كانت تجربة رائعة، وأدق فحص في مصر. يوضح جميع أعطال السيارة، وأشكر السيد نارت على تعاونه ومساعدته. كل التقدير والاحترام."
  },
  {
    id: 8,
    name: "منذر ابوسعد",
    rating: 4,
    review: "الفنيون مهنيون ويقدمون لك وصفاً دقيقاً للمركبة التي تنوي شراءها، حتى أنهم يظهرون لك أشياء في سيارتك لن تلاحظها أبداً، مثل شق صغير في الزجاج الأمامي."
  },
  {
    id: 9,
    name: "مصطفي الحسيني ",
    rating: 5,
    review: "أعتقد أن هذه هي أفضل طريقة لضمان أن السيارة التي تشتريها تم فحصها بالكامل، وكمية الأشياء التي يفحصونها لا تصدق. كما يقدمون لك تقرير Carseer لتاريخ السيارة. أنصح بشدة بهذا المكان، والطاقم كان ممتازاً."
  },
  {
    id: 10,
    name: "ميرا حمدان",
    rating: 5,
    review: "الذهاب إلى كار سيرفز كان أفضل قرار اتخذته على الإطلاق فيما يتعلق بفحص سيارتي. كانوا مهنيين جداً وودودين، ونارت تحديداً كان ماهراً وذكياً ومفيداً."
  },
  {
    id: 11,
    name: "هيفا بيل",
    rating: 4,
    review: "الطاقم كان ودوداً جداً وقام بعمل جيد في فحص السيارة وتقديم تقرير مفصل عنها."
  },
  {
    id: 12,
    name: "سعيد صلاح",
    rating: 4,
    review: "أفضل طاقم مهني في مجال التركيب والخبرة. الورشة نظيفة ومرتبة، ووقت الانتظار مريح جداً. أنصح به بشدة."
  }
];

// Star rating component with filled and empty stars
const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'fill-current text-yellow-400' : 'stroke-current text-yellow-400 fill-none'}`}
        viewBox="0 0 20 20"
        strokeWidth="1"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Review card component matching the image design
const ReviewCard = ({ review }) => (
  <div className="bg-white p-6">
    <div className="flex items-start gap-3 mb-3">
      {/* Red icon - three curved horizontal lines */}
      <div className="flex-shrink-0 mt-1">
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
          <path d="M2 2C4 2 6 4 18 4" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M2 7C4 7 6 9 18 9" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M2 12C4 12 6 14 18 14" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
          <StarRating rating={review.rating} />
        </div>
        <p className="text-gray-700 leading-relaxed">"{review.review}"</p>
      </div>
    </div>
  </div>
);

// Main component
const CustomerReviews = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-red-600 mb-8">آراء العملاء</h1>
      </div>

      {/* Reviews Grid - 4 rows × 3 columns */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCustomerReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
