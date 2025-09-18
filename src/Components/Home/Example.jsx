import React, { useState,useEffect,useMemo} from "react";
import { useSearchParams } from "react-router-dom";
import { Disclosure, Label } from "@headlessui/react";
import GaugeChart from "react-gauge-chart";
import { FaCarSide, FaCogs,FaUser, FaSnowflake, FaShieldAlt, FaBook, FaRuler, FaPlug, FaExclamationTriangle, FaCamera,FaChevronDown,FaInfoCircle,FaCheckCircle,FaCarBattery,FaOilCan} from "react-icons/fa";
import image55 from '../../assets/image55.png'
import fallbackImage  from '../../assets/imagge2.png'
import rallbackImage from '../../assets/imagee22.png'
import hallbackImage from '../../assets/immage3.png'
import iallbackImage from '../../assets/img20.png'
import pallbackImage  from  '../../assets/img23.png'
import  FullScreenGallery from "../FullScreenGallery/FullScreenGallery";
import ScreenGallery from "../ScreenGallery/ScreenGallery";
import { info } from "autoprefixer";

const inspections = [
  { name: "الهيكل الخارجي", status: "success", icon: <FaCarSide /> },
  { name: "المحرك وناقل الحركة", status: "error", icon: <FaCogs /> },
  { name: "الشاصي والهيكل", status: "error", icon: <FaCogs /> },
  { name: "فحص الطريق", status: "error" },
  { name: "نظام التكييف", status: "success", icon: <FaSnowflake /> },
  { name: "السلامة Bosch فحص", status: "error", icon: <FaShieldAlt /> },
  { name: "التاريخ والسجلات", status: "neutral", icon: <FaBook /> },
  { name: "نظام التوجيه", status: "error" },
  { name: "المكابح والسلامة", status: "error", icon: <FaExclamationTriangle /> },
  { name: "صور الفحص", status: "neutral", icon: <FaCamera /> },
];


const getStatusColor = (status) => {
  switch (status) {
    case "success":
      return "border-green-500";
    case "error":
      return "border-red-500";
    default:
      return "border-gray-400";
  }
};
export default function ReportResult() {
    const [score, setScore] = useState(30); // النسبة المئوية
  

const [showInfo, setShowInfo] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
const grades = [
    { label: "F", range: [0, 40], color: "bg-red-500" },
    { label: "D", range: [40, 50], color: "bg-purple-500" },
    { label: "C", range: [50, 60], color: "bg-orange-500" },
    { label: "B", range: [60, 70], color: "bg-gray-600" },
    { label: "B+", range: [70, 80], color: "bg-yellow-400" },
    { label: "A", range: [80, 90], color: "bg-green-500" },
    { label: "A+", range: [90, 100], color: "bg-blue-600" },
  ];

  // حساب اللون بناءً على الـ score
  const currentGrade = grades.find(
    (g) => score >= g.range[0] && score <= g.range[1]
  ); 

 const reportData = {
  sections: [
    {
      title: "بيانات الفحص",
      type: "details",
      carInfo: {
        image: "/car1.png",
        chassisNumber: "BYDSONGPLUS2023BYD",
        brand: "تويوتا",
      },
      inspection: {
        reportImage: "https://via.placeholder.com/300x150",
        status: "fail",
        result: "السيارة بحالة جيدة جداً",
        details: [],
         reasons: [
          "تايتل السيارة ❌",
          "المسافة المقطوعة ❌",
          "تاريخ الرعاية بالمركبة ❌",
        ],
       
      },
    },
   
   
  ],
};

 const historyData = {
  itemes: [
    {
      title: " التاريخ والسجلات ",
      type: "details",
      carInfoo: {
        image: fallbackImage,
      },
       descriptionPoints: [
        "نقوم في كار سيرفر بمراجعة وتجميع جميع سجلات وبيانات السيارة من عدة أماكن ابتداءً من الأردن مثل الوكالات وشركات التأمين والدول المصدرة للسيارات مثل الولايات المتحدة الأمريكية، دول الخليج، الصين، أوروبا وكوريا.",
        "يتم التواصل أيضًا بشكل إلكتروني مع شركات متخصصة في جمع بيانات وسجلات السيارة والربط معها لتحصل على تقرير أوتوسكور الشامل على الفحص التقني والهندسي وأيضًا على سجلات الحوادث والصيانة وعدد المالكين وصفة الاستخدام."
      ],
      check: {
        historyDataImage: "https://via.placeholder.com/300x150",
        details: [
    { label: "تايتل السيارة" , value: "❌ "},
    { label:"المسافة المقطوعة", value: "❌ " },
    { label: "تاريخ الرعاية بالمركبة", value: "❌" },
    {label:"تاريخ السيارة داخل الأردن"},
    { Label:"عدد الحوادث المحلية",value:"1"},
    { label: "نوع الاستخدام",  value: "إستخدام شخصي" },
    { label: "تغيير المحرك ", value: "المحرك لم يتغير" },
    { label: "", value: "مسجل", status: "✅" },
    { label: "تاريخ الرعاية بالمركبة", value: "2025-06-01", status: "❌" },
    {Label: "معلومات السيارة التقنية"},
    {label:"الهيكل",value:"suv"},
    {label:"تغيير المحرك",value:"المحرك لم يتغير"},
    {Label:"عدد المالكين", value:"1"},
    {label:"نوع التسجيل",value:"خصوصي"},
    {label:"تاريخ السيارة خارج الأردن"},
    {label:"الحوادث",value:"لا يوجد مشاكل"},
    {label:"الايرباج",value:"N/A"},
  ],
      registration: [
    { label: "تايتل السيارة" , value: "❌ "},
    { label:"المسافة المقطوعة", value: "❌ " },
    { label: "تاريخ الرعاية بالمركبة", value: "❌" },
    {label:"تاريخ السيارة داخل مصر"},
    { Label:"عدد الحوادث المحلية",value:"1"},
    { label: "نوع الاستخدام",  value: "إستخدام شخصي" },
    { label: "تغيير المحرك ", value: "المحرك لم يتغير" },
    { label: "", value: "مسجل", status: "✅" },
    { label: "تاريخ الرعاية بالمركبة", value: "2025-06-01", status: "❌" },
    {Label: "معلومات السيارة التقنية"},
    {label:"الهيكل",value:"suv"},
    {label:"تغيير المحرك",value:"المحرك لم يتغير"},
    {Label:"عدد المالكين", value:"1"},
    {label:"نوع التسجيل",value:"خصوصي"},
    {label:"تاريخ السيارة خارج الأردن"},
    {label:"الحوادث",value:"لا يوجد مشاكل"},
    {label:"الايرباج",value:"N/A"},
 
  ],
     maintenance: [ 
    { label: "تاريخ الرعاية بالمركبة", value: "❌" },
    {label:"تاريخ السيارة داخل مصر"},
    { Label:"عدد الحوادث المحلية",value:"1"},
    { label: "نوع الاستخدام",  value: "إستخدام شخصي" },
    { label: "تغيير المحرك ", value: "المحرك لم يتغير" },
    { label: "", value: "مسجل", status: "✅" },
    { label: "تاريخ الرعاية بالمركبة", value: "2025-06-01", status: "❌" },
    {label: "معلومات السيارة التقنية"},
    {label:"الهيكل",value:"suv"},
    {label:"تغيير المحرك",value:"المحرك لم يتغير"},
    {Label:"عدد المالكين", value:"1"},
    {label:"نوع التسجيل",value:"خصوصي"},
    {label:"تاريخ السيارة خارج الأردن"},
    {label:"الحوادث",value:"لا يوجد مشاكل"},
    {label:"الايرباج",value:"N/A"},
  ],
  mileage: [ 
    { label: "تاريخ الرعاية بالمركبة", value: "❌" }, 
    {label:"تاريخ السيارة داخل مصر"},
    { Label:"عدد الحوادث المحلية",value:"1"},
    { label: "نوع الاستخدام",  value: "إستخدام شخصي" },
    { label: "تغيير المحرك ", value: "المحرك لم يتغير" },
    { label: "", value: "مسجل", status: "✅" },
    { label: "تاريخ الرعاية بالمركبة", value: "2025-06-01", status: "❌" },
    {Label: "معلومات السيارة التقنية"},
    {label:"الهيكل",value:"suv"},
    {label:"تغيير المحرك",value:"المحرك لم يتغير"},
    {Label:"عدد المالكين", value:"1"},
    {label:"نوع التسجيل",value:"خصوصي"},
    {label:"تاريخ السيارة خارج الأردن"},
    {label:"الحوادث",value:"لا يوجد مشاكل"},
    {label:"الايرباج",value:"N/A"},
  ],
   carIamge:rallbackImage

   

      },
    },
   
  ],
};
  const [activeFilter, setActiveFilter] = useState("details"); // يبدأ مفتوح على "جميع نقاط الفحص"
    
  
 const exoskeleton = {
  itemis: [
    {
      title: " الهيكل الخارجي ",
      type: "details",
      carInformation: { image: hallbackImage },
      descriptionPoints1: [
        "يقدّم كارسيرفس تقييم وفحص شامل ودقيق لهيكل السيارة الخارجي للتأكد من سلامته و مطابقته لمعايير كار سيرفيس.",
        "يتم إجراء الفحص باستخدام عدة طرق، مثل.",
        "الفحص النظري المتخصص",
        "قياس سماكة الدهان والمعجون باستخدام الأجهزة الخاصة",
        "الذكاء الصناعي",
        "سجلات تاريخ السيارة والإصلاحات السابقة",
        "يغطي هذا القسم النقاط التالية:",
        "أجزاء السيارة الخارجية",
        "حالة المقصورة الداخلية",
        "الزجاج الأمامي والخلفي",
        "السقف",
        "الشبابيك",
        "الشبر"
      ],

      control: {
        specifics: [
          {
            label: "صدام امامي",
            Stats: "⚠️",
            info: "تمت ملاحظة خدوش بسيطة في الصدام الأمامي.",
            gallery: [
              {
                src: "/img4.png",
                diagram: "/iamg10.png",
                title: "صدام امامي",
                subtitle: "خدوش بسيطة",
              },
              {
                src: "/img6.png",
                diagram: "/iamg9.png",
                title: "صدام امامي",
                subtitle: "تفاصيل إضافية",
              },
              {
                 src: "/img1.png",
                diagram: "/iiamge8.png",
                title: "صدام امامي",
                subtitle: "زاوية مختلفة",
                
              },
            ],
          },
          { label: "جناح امامي يمين", Stats: "✔️", info: "الجناح الأمامي الأيمن بحالة جيدة بدون ملاحظات." },
          { label: "كشاف شمال", Stats: "⚠️", info: "الكشاف الشمال يحتاج تغيير." },
          { label: "باب خلفي يمين", Stats: "✔️" },
          { label: "باب خلفي شمال", Stats: "✔️" },
          { label: "الكبوت", Stats: "⚠️" },
          { label: "الشنطة", Stats: "✔️" },
          { label: "السقف", Stats: "✔️" },
          { label: "الزجاج الأمامي", Stats: "⚠️" },
          { label: "الزجاج الخلفي", Stats: "✔️" },
        ],

        carImage: hallbackImage,

        continue: [
          {
            label: "صدام امامي",
            Stats: "⚠️",
            info: "تمت ملاحظة خدوش بسيطة في الصدام الأمامي.",
            gallery: [
              {
                src: "/img4.png",
                diagram: "/iamg10.png",
                title: "صدام امامي",
                subtitle: "خدوش بسيطة",
              },
              {
                src: "/img6.png",
                diagram: "/iamg9.png",
                title: "صدام امامي",
                subtitle: "تفاصيل إضافية",
              },
              {
                src: "/img1.png",
                diagram: "/iiamge8.png",
                title: "صدام امامي",
                subtitle: "زاوية مختلفة",
              },
            ],
          }, // ← كان لازم القوس ده يتقفل قبل العناصر التالية
          { label: "جناح امامي يمين", Stats: "✔️", info: "الجناح الأمامي الأيمن بحالة جيدة بدون ملاحظات." },
          { label: "كشاف شمال", Stats: "⚠️", info: "الكشاف الشمال يحتاج تغيير." },
          { label: "باب خلفي يمين", Stats: "✔️",info: "الجناح الأمامي الأيمن بحالة جيدة بدون ملاحظات."  },
          { label: "باب خلفي شمال", Stats: "✔️" ,info: "الجناح الأمامي الأيمن بحالة جيدة بدون ملاحظات." },
          { label: "الكبوت", Stats: "⚠️" ,info: "الجناح الأمامي الأيمن بحالة جيدة بدون ملاحظات." },
          { label: "الشنطة", Stats: "✔️",info: "الجناح الأمامي الأيمن بحالة جيدة بدون ملاحظات."  },
          { label: "السقف", Stats: "✔️",info: "الجناح الأمامي الأيمن بحالة جيدة بدون ملاحظات."  },
          { label: "الزجاج الأمامي", Stats: "⚠️",info: "الجناح الأمامي الأيمن بحالة جيدة بدون ملاحظات."  },
          { label: "الزجاج الخلفي", Stats: "✔️",info: "الجناح الأمامي الأيمن بحالة جيدة بدون ملاحظات."  },
        ],

        outline: [
          { label: "الزجاج الامامي", Stats: "✔️", info: "وجود نقرات أو شعر بسيط في الزجاج ليس بالأمر المقلق، مالم يكن كسر كبير وواضح" },
          { label: " الزجاج الخلفي", Stats: "✔️", info: "وجود نقرات أو شعر بسيط في الزجاج ليس بالأمر المقلق، مالم يكن كسر كبير وواضح" },
          { label: ".نقرات الزجاج الامامي" },
        ],

        onabort: [
          { label: "المرآة اليمين", Stats: "✔️", info: "وجود نقرات أو شعر بسيط في الزجاج ليس بالأمر المقلق، مالم يكن كسر كبير وواضح" },
          { label: " المرآة اليسار", Stats: "✔️", info: "وجود نقرات أو شعر بسيط في الزجاج ليس بالأمر المقلق، مالم يكن كسر كبير وواضح" },
        ],

        allpoint: [
          { label: "شبر  الزجاج", Stats: "✔️", info: "وجود نقرات أو شعر بسيط في الزجاج ليس بالأمر المقلق، مالم يكن كسر كبير وواضح" },
          { label: " شبر الابواب   ", Stats: "✔️", info: "وجود نقرات أو شعر بسيط في الزجاج ليس بالأمر المقلق، مالم يكن كسر كبير وواضح" },
        ],

        parent: [{ label: " الأطار الأحتياطي ", Stats: "❌" }],

        review: [{ label: "جاك الاطارات وأدوات", Stats: "❌" }],

        sheet: [{ label: "مفتاح الربط", Stats: "❌" }],

        tablet: [
          {
            label: "الحالة الداخلية",
            Stats: "⚠️",
            info:
              "وجود بعض التشققات في الأجزاء الداخلية ليس بالأمر المقلق ، ما لم يكن كسر أو مزع مؤثر على شكل أو أداء الأجزاء الداخلية",
          },
        ],
      },
    },
  ],
};

  const [Filter, setFilter] = useState("specifics"); // يبدأ مفتوح على "جميع نقاط الفحص"
const [openInfoIndex, setOpenInfoIndex] = useState(null);
useEffect(() => {
  const handleClickOutside = () => {
    setOpenInfoIndex(null);
  };
  document.addEventListener("click", handleClickOutside);
  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);



const [openGallery, setOpenGallery] = useState(false);

const ElectricalSystems = {
  itimis: [
    {
      title: "المجموعه الكهربيه",
      type: "details",
   carImage: ["/EEE.png"], // أو مسارات من public زي "/img1.png"
  
     descriptionPoints2: [
      "كار سيرفيس يقوم بعمل فحص دقيق و متخصص للأنظمة و الأجزاء الكهربائية و يرجع الفضل الى الخبراء و المهندسين المختصين و الأجهزة و التقنيات المعتمدة من شركة بوش Bosch الالمانية .",
      "يغطي هذا القسم النقاط التالية :",
      "أنظمة الانارة الأمامية",
      "أنظمة الانارة الخلفية",
      "أنظمة المساعدة على الطريق",
      "البطارية و نظام الشحن",
      "الاكسسوارات و التجهزيات",
],


      Power: {
        allSystems: [
          {
            label: "الضوء الأمامي اليمين",
            Stats: "⚠️",
            info: "فحص حالة الضوء الأمامي الأيمن والتأكد من عمله بشكل صحيح",
          },
          {
            label: "الضوء الخلفي اليمين",
            Stats: "⚠️",
            info: "فحص حالة الضوء الخلفي الأيمن والتأكد من عمله بشكل صحيح",
          },
          {
            label: "بطارية التشغيل 12 فولت",
            Stats: "⚠️",
            info: "فحص حالة بطارية التشغيل 12 فولت والتأكد من كفاءتها",
          },
          {
            label: "الشاشة \\ الراديو الأصلي",
            Stats: "⚠️",
            info: "فحص حالة الشاشة والراديو الأصلي والتأكد من عملهما",
          },
          {
            label: "إختبار الزامور",
            Stats: "⚠️",
            info: "اختبار عمل الزامور والتأكد من صوته",
          },
          {
            label: "المساحة الخلفية",
            Stats: "⚠️",
            info: "فحص حالة المساحة الخلفية والتأكد من عملها",
          },
          {
            label: "إختبار عمل فتحة السقف",
            Stats: "⚠️",
            info: "اختبار عمل فتحة السقف والتأكد من فتحها وإغلاقها",
          },
          {
            label: "إختبار عمل الكراسي الكهربائية",
            Stats: "⚠️",
            info: "اختبار عمل الكراسي الكهربائية والتأكد من تحركها",
          },
          {
            label: "المرآة اليمين",
            Stats: "⚠️",
            info: "فحص حالة المرآة اليمين والتأكد من سلامتها",
          },
          {
            label: "اختبار عمل الديفروست الزجاج الخلفي",
            Stats: "⚠️",
            info: "اختبار عمل نظام الديفروست للزجاج الخلفي",
          },
          {
            label: "الضوء الأمامي اليسار",
            Stats: "⚠️",
            info: "فحص حالة الضوء الأمامي الأيسر والتأكد من عمله",
          },
          {
            label: "كسر بالكشاف الامامي اليسار",
            Stats: "⚠️",
            info: "تم اكتشاف كسر في الكشاف الأمامي الأيسر",
          },
          {
            label: "الضوء الخلفي اليسار",
            Stats: "⚠️",
            info: "فحص حالة الضوء الخلفي الأيسر والتأكد من عمله",
          },
          {
            label: "شحن بطارية التشغيل12 فولت",
            Stats: "⚠️",
            info: "فحص نظام شحن بطارية التشغيل 12 فولت",
          },
          {
            label: "السماعات",
            Stats: "⚠️",
            info: "فحص حالة السماعات والتأكد من عملها",
          },
          {
            label: "المساحات الأمامية",
            Stats: "⚠️",
            info: "فحص حالة المساحات الأمامية والتأكد من عملها",
          },
          {
            label: "اختبار الأنارة الداخلية",
            Stats: "⚠️",
            info: "اختبار الأنارة الداخلية للسيارة",
          },
          {
            label: "إختبار عمل النوافذ",
            Stats: "⚠️",
            info: "اختبار عمل النوافذ الكهربائية",
          },
          {
            label: "إختبار عمل ريموت فتح الأبواب",
            Stats: "⚠️",
            info: "اختبار عمل ريموت فتح الأبواب",
          },
          {
            label: "المرآة اليسار",
            Stats: "⚠️",
            info: "فحص حالة المرآة اليسار والتأكد من سلامتها",
          },
        ],



        carImage:"/MOVE.png" ,

        frontLights: [
          {
            label: "الضوء الأمامي اليمين",
            Stats: "⚠️",
            info: "فحص حالة الضوء الأمامي الأيمن والتأكد من عمله بشكل صحيح",
          }, 
        ],

        rearLights: [
          { label: "الضوء الخلفي اليمين", Stats: "⚠️", info: "فحص حالة الضوء الخلفي الأيمن والتأكد من عمله بشكل صحيح" },
        ],

        batterySystem: [
          { label: "بطارية التشغيل 12 فولت", Stats: "⚠️", info: "فحص حالة بطارية التشغيل 12 فولت والتأكد من كفاءتها" },
        ],

        audioSystem: [
          { label: "الشاشة \\ الراديو الأصلي", Stats: "⚠️", info: "فحص حالة الشاشة والراديو الأصلي والتأكد من عملهما" },
        ],

        hornSystem: [
          { label: "إختبار الزامور", Stats: "⚠️", info: "اختبار عمل الزامور والتأكد من صوته" },
        ],

        wiperSystem: [
          { label: "المساحة الخلفية", Stats: "⚠️", info: "فحص حالة المساحة الخلفية والتأكد من عملها" }
        ],

        sunroofSystem: [
          { label: "إختبار عمل فتحة السقف", Stats: "⚠️", info: "اختبار عمل فتحة السقف والتأكد من فتحها وإغلاقها" }
        ],

        seatSystem: [
          { label: "إختبار عمل الكراسي الكهربائية", Stats: "⚠️", info: "اختبار عمل الكراسي الكهربائية والتأكد من تحركها" }
        ],
      },
    },
  ],
};
  const [currentSystemView, updateSystemFilter] = useState("allSystems"); // يبدأ مفتوح على "جميع نقاط الفحص"


const Chassisa = {
  itimis: [
    {
      title: " المحرك وناقل الحركه ",
      type: "details",
   carInformation1: {
        images: ["/MOVE.png"] // أو مسارات من public زي "/img1.png"
      },
  
     descriptionPoints2: [
" كارسيرفيس متخصص بفحص السيارات الكهربائية و الهجينة الهايبرد التي تعمل على الطاقة الكهربائية و يرجع الفضل الى الخبراء و المهندسين المختصين و الأجهزة و التقنيات المعتمدة من شركة بوش Bosch الالمانية",
"يغطي هذا القسم النقاط التالية :",
"فحص جميع الأنظمة الكترونيا",
"فحص البطارية الرئيسية و كفاءتها و عمرها التشغيلي",
"المحرك الكهربائي و اجزاءه",
"المحول الكهربائي",
"أنظمة الشحن",
"أنظمة التبريد"
],


      Power: {
        specifics1: [
          {
            label: "   نظام الشحن",
            Stats: "⚠️",
            info: "التأكد من وجود شاحن المركبة الأصلي بحالة جيدة ويعمل بكفاءة ، وعدم وجود مشاكل على مدخل الشحن أو أخطاء على كمبيوتر نظام الشحن بالمركبة",
           
          },
          {
            label: " فحص نظام التبريرد  ",
            Stats: "⚠️",
            info: "يتم التأكد من حالة نظام التبريد وجميع أجزاءه وخلوه من الأعطال",
           
          },
          {
            label: "اختبار المحرك الكهربي ",
            Stats: "⚠️",
            info: "يتم التأكد من حالة المولد عن طريق فحص تهريبات الزيوت والأصوات غير الطبيعية وأداءه على الطريق",
           
          },
          {
            label: " البطارية الرئيسية",
            Stats: "⚠️",
            info: "يتم التأكد من حالة بطارية الكهرباء الرئيسية عن طريق فحص السعة التخزينية وخلو البطارية من أي أثر فك أو إصلاح أو ضرب",
           
          },
          {
            label: " فحص تهريب الزيوت ",
            Stats: "⚠️",
            info: "تسريب زيت المحرك لا يعطل السيارة مالم يكن مستوى الزيت أقل من الحد الادنى",
            
          },
          {
            label: "تسريب زيت المحرك لا يعطل السيارة مالم يكن مستوى الزيت أقل من الحد الادنى ",
            Stats: "⚠️",
            info: "الفحص لإكتشاف أي عطل إلكتروني بناقل الحركة",
           
          },
       
    
        ],



        carImagee:"/MOVE.png" ,

        continue1: [
          {
            label: " نظام الشحن",
            Stats: "⚠️",
            info: "تم اكتشاف انحراف طفيف في قياسات الشاصي الأمامي الأيمن.",
            
          }, 
        ],

        outline1: [
          { label: "   اختبار اعطال المحول باجهزة الفحص", Stats: "⚠️", info: "الفحص لإكتشاف أي عطل إلكتروني بالمحول وتوصيلاته" },

        ],

        onabort1: [
          { label:"فحص تهريب الزيوت", Stats: "⚠️", info:"تسريب زيت المحرك لا يعطل السيارة مالم يكن مستوى الزيت أقل من الحد الادنى"},
          
        ],

        allpoint1: [
          { label: "فحص نظام التبريد", Stats: "⚠️", info:"يتم التأكد من حالة نظام التبريد وجميع أجزاءه وخلوه من الأعطال" },

        ],

        parent: [
          { label: "اختبار اعطال الجير باجهزة الفحص", Stats: "⚠️", info: "الفحص لإكتشاف أي عطل إلكتروني بناقل الحرك"},

        ],

        review: [
          { label: "ختبار المحرك الكهربائي - المولد", Stats: "⚠️", info: "ختبار المحرك الكهربائي - المولد" },


,
        ],

        sheet: [

        ],

        tablet1: [
       
        ],
      },
    },
  ],
};
  const [Filterr, setFilterr] = useState("specifics1"); // يبدأ مفتوح على "جميع نقاط الفحص"

 const createMeasurementData = (label, status, info, measurements = null, gallery = null, additionalData = null) => ({
  label,
  Stats: status,
  info,
  ...(measurements && { measurements }),
  ...(gallery && { gallery }),
  ...(additionalData && additionalData)
});

// دالة لإنشاء بيانات الصدأ
const createRustData = (label, status, info, affectedAreas, severity, recommendation, gallery = null) => ({
  label,
  Stats: status,
  info,
  affectedAreas,
  severity,
  recommendation,
  ...(gallery && { gallery })
});

const Move = {
  itimis1: [
    {
      title: "الشاصي والهيكل",
      type: "details",
      carInformation1: {
        images: [iallbackImage, pallbackImage]
      },
      descriptionPoints3: [
        "في كارسيرفيس نقوم بتقييم وفحص الشاصي والهيكل الداخلي للسيارة اعتماداً على القياسات والأبعاد الأصلية والتأكد من عدم وجود نقاط لحام على المفاصل الرئيسية أو وجود أي انحراف أو تأثير على أداء السيارة حسب نظام CCM العالمي.",
        "يتم إجراء الفحص عن طريق:",
        "• نظام قياس الانحرافات بالليزر",
        "• الفحص النظري المختص",
        "يغطي هذا القسم النقاط التالية:",
        "• الشاصيات الأربعة",
        "• الهيكل الأمامي والخلفي",
        "• الهيكل السفلي والعلوي",
        "• هيكل الجانبين",
        "• فحص وجود الصدأ",
        "ملاحظة هامة: يتم الفحص دون أي ذكر أو مقارنة مع مصطلحات الفحص التقليدية"
      ],

      Power: {
        // قياسات الشاصي
        chassisMeasurements: [
          {
            label: "قياسات الشاصي الأمامي اليمين",
            Stats: "⚠️",
            info: "تم اكتشاف انحراف طفيف في قياسات الشاصي الأمامي الأيمن. القياس الفعلي: 1250mm مقابل القياس المطلوب: 1248mm (±2mm)",
            measurements: {
              actual: "1250mm",
              required: "1248mm",
              deviation: "+2mm",
              status: "within_tolerance"
            },
            gallery: [
              {
                src: "/img4.png",
                diagram: "/iamg10.png",
                title: "قياسات الشاصي الأمامي اليمين",
                subtitle: "انحراف طفيف",
              }
            ],
          },
          {
            label: "قياسات الشاصي الأمامي اليسار",
            Stats: "✔️",
            info: "قياسات الشاصي الأمامي الأيسر ضمن المعايير المطلوبة. القياس الفعلي: 1247mm مقابل القياس المطلوب: 1248mm",
            measurements: {
              actual: "1247mm",
              required: "1248mm",
              deviation: "-1mm",
              status: "within_tolerance"
            },
            
          },
          {
            label: "قياسات الشاصي الخلفي اليمين",
            Stats: "⚠️",
            info: "انحراف ملحوظ في قياسات الشاصي الخلفي الأيمن. القياس الفعلي: 1255mm مقابل القياس المطلوب: 1248mm",
            measurements: {
              actual: "1255mm",
              required: "1248mm",
              deviation: "+7mm",
              status: "exceeds_tolerance"
            },
           
          },
          {
            label: "قياسات الشاصي الخلفي اليسار",
            Stats: "✔️",
            info: "قياسات الشاصي الخلفي الأيسر مطابقة للمعايير. القياس الفعلي: 1248mm مقابل القياس المطلوب: 1248mm",
            measurements: {
              actual: "1248mm",
              required: "1248mm",
              deviation: "0mm",
              status: "perfect"
            }
          }
        ],

        // قياسات الهيكل
        frameMeasurements: [
          {
            label: "الهيكل الأمامي",
            Stats: "⚠️",
            info: "تم اكتشاف تشوه طفيف في الهيكل الأمامي. يوصى بفحص إضافي للتأكد من عدم وجود أضرار هيكلية",
          
          },
          {
            label: "الهيكل الخلفي",
            Stats: "✔️",
            info: "الهيكل الخلفي في حالة جيدة بدون أي تشوهات أو أضرار هيكلية"
          },
          {
            label: "الهيكل السفلي",
            Stats: "⚠️",
            info: "تم اكتشاف علامات تآكل في الهيكل السفلي. يوصى بفحص دوري للوقاية من التآكل المتقدم",
            
          },
          {
            label: "الهيكل العلوي",
            Stats: "✔️",
            info: "الهيكل العلوي في حالة ممتازة بدون أي تشوهات أو أضرار"
          },
          {
            label: "هيكل الجنب اليمين",
            Stats: "⚠️",
            info: "تم اكتشاف خدوش سطحية في هيكل الجانب الأيمن. لا تؤثر على السلامة الهيكلية",
           
          },
          {
            label: "هيكل الجنب اليسار",
            Stats: "✔️",
            info: "هيكل الجانب الأيسر في حالة جيدة بدون أي أضرار أو تشوهات"
          }
        ],

        // فحص الصدأ
        rustInspection: [
          {
            label: "وجود الصدأ",
            Stats: "⚠️",
            info: "تم اكتشاف صدأ سطحي في مناطق محددة. يوصى بمعالجة فورية لمنع انتشار الصدأ",
            affectedAreas: [
              "منطقة العجلة الأمامية اليمنى",
              "جزء من الهيكل السفلي"
            ],
            severity: "surface_rust",
            recommendation: "معالجة فورية مطلوبة",
           
          }
        ],

        // جميع نقاط الفحص
        specifics2: [
          {
            label: "قياسات الشاصي الأمامي اليمين",
            Stats: "⚠️",
            info: "تم اكتشاف انحراف طفيف في قياسات الشاصي الأمامي الأيمن",
          
          },
          {
            label: "قياسات الشاصي الأمامي اليسار",
            Stats: "✔️",
            info: "قياسات الشاصي الأمامي الأيسر ضمن المعايير المطلوبة",
            
          },
          {
            label: "قياسات الشاصي الخلفي اليمين",
            Stats: "⚠️",
            info: "انحراف ملحوظ في قياسات الشاصي الخلفي الأيمن",
            
          },
          {
            label: "قياسات الشاصي الخلفي اليسار",
            Stats: "✔️",
            info: "قياسات الشاصي الخلفي الأيسر مطابقة للمعايير"
          },
          {
            label: "الهيكل الأمامي",
            Stats: "⚠️",
            info: "تم اكتشاف تشوه طفيف في الهيكل الأمامي",
           
          },
          {
            label: "الهيكل الخلفي",
            Stats: "✔️",
            info: "الهيكل الخلفي في حالة جيدة"
          },
          {
            label: "الهيكل السفلي",
            Stats: "⚠️",
            info: "تم اكتشاف علامات تآكل في الهيكل السفلي",
            
          },
          {
            label: "الهيكل العلوي",
            Stats: "✔️",
            info: "الهيكل العلوي في حالة ممتازة"
          },
          {
            label: "هيكل الجنب اليمين",
            Stats: "⚠️",
            info: "تم اكتشاف خدوش سطحية في هيكل الجانب الأيمن",
           
          },
          {
            label: "هيكل الجنب اليسار",
            Stats: "✔️",
            info: "هيكل الجانب الأيسر في حالة جيدة"
          },
          {
            label: "وجود الصدأ",
            Stats: "⚠️",
            info: "تم اكتشاف صدأ سطحي في مناطق محددة",
            
          }
        ],

        // قياسات الشاصي الأمامي اليمين
        outline2: [
          {
            label: "قياسات الشاصي الأمامي اليمين",
            Stats: "⚠️",
            info: "تم اكتشاف انحراف طفيف في قياسات الشاصي الأمامي الأيمن. القياس الفعلي: 1250mm مقابل القياس المطلوب: 1248mm (±2mm)",
            measurements: {
              actual: "1250mm",
              required: "1248mm",
              deviation: "+2mm",
              status: "within_tolerance"
            },
           
          }
        ],

        // قياسات الشاصي الأمامي اليسار
        onabort2: [
          {
            label: "قياسات الشاصي الأمامي اليسار",
            Stats: "✔️",
            info: "قياسات الشاصي الأمامي الأيسر ضمن المعايير المطلوبة. القياس الفعلي: 1247mm مقابل القياس المطلوب: 1248mm",
            measurements: {
              actual: "1247mm",
              required: "1248mm",
              deviation: "-1mm",
              status: "within_tolerance"
            },
           
          }
        ],

        // قياسات الشاصي الخلفي اليمين
        allpoint2: [
          {
            label: "قياسات الشاصي الخلفي اليمين",
            Stats: "⚠️",
            info: "انحراف ملحوظ في قياسات الشاصي الخلفي الأيمن. القياس الفعلي: 1255mm مقابل القياس المطلوب: 1248mm",
            measurements: {
              actual: "1255mm",
              required: "1248mm",
              deviation: "+7mm",
              status: "exceeds_tolerance"
            },
           
          }
        ],

        // قياسات الشاصي الخلفي اليسار
        parent2: [
          {
            label: "قياسات الشاصي الخلفي اليسار",
            Stats: "✔️",
            info: "قياسات الشاصي الخلفي الأيسر مطابقة للمعايير. القياس الفعلي: 1248mm مقابل القياس المطلوب: 1248mm",
            measurements: {
              actual: "1248mm",
              required: "1248mm",
              deviation: "0mm",
              status: "perfect"
            }
          }
        ],

        // الهيكل الأمامي
        review2: [
          {
            label: "الهيكل الأمامي",
            Stats: "⚠️",
            info: "تم اكتشاف تشوه طفيف في الهيكل الأمامي. يوصى بفحص إضافي للتأكد من عدم وجود أضرار هيكلية",
           
          }
        ],

        // الهيكل الخلفي
        sheet2: [
          {
            label: "الهيكل الخلفي",
            Stats: "✔️",
            info: "الهيكل الخلفي في حالة جيدة بدون أي تشوهات أو أضرار هيكلية"
          }
        ],

        // الهيكل السفلي
        tablet2: [
          {
            label: "الهيكل السفلي",
            Stats: "⚠️",
            info: "تم اكتشاف علامات تآكل في الهيكل السفلي. يوصى بفحص دوري للوقاية من التآكل المتقدم",
            
          }
        ],

        // الهيكل العلوي
        continue2: [
          {
            label: "الهيكل العلوي",
            Stats: "✔️",
            info: "الهيكل العلوي في حالة ممتازة بدون أي تشوهات أو أضرار"
          }
        ],

        // هيكل الجنب اليمين
        chassisMeasurements: [
          {
            label: "هيكل الجنب اليمين",
            Stats: "⚠️",
            info: "تم اكتشاف خدوش سطحية في هيكل الجانب الأيمن. لا تؤثر على السلامة الهيكلية",
           
          }
        ],

        // هيكل الجنب اليسار
        frameMeasurements: [
          {
            label: "هيكل الجنب اليسار",
            Stats: "✔️",
            info: "هيكل الجانب الأيسر في حالة جيدة بدون أي أضرار أو تشوهات"
          }
        ],

        // وجود الصدأ
        rustInspection: [
          {
            label: "وجود الصدأ",
            Stats: "⚠️",
            info: "تم اكتشاف صدأ سطحي في مناطق محددة. يوصى بمعالجة فورية لمنع انتشار الصدأ",
            affectedAreas: [
              "منطقة العجلة الأمامية اليمنى",
              "جزء من الهيكل السفلي"
            ],
            severity: "surface_rust",
            recommendation: "معالجة فورية مطلوبة",
          
          }
        ],



        carImagee: hallbackImage,

        continue1: [
          {
            label: "صدام امامي",
            Stats: "⚠️",
            info: "تمت ملاحظة خدوش بسيطة في الصدام الأمامي.",
            
          }, // ← كان لازم القوس ده يتقفل قبل العناصر التالية
          
        ],

        outline2: [
        
        ],

        onabort2: [
        ],

        allpoint2: [
        ],

        parent: [],

        review: [],

        sheet: [],

        tablet4: [
        
        ],
      },
    },
  ],
};
  const [Filterr1, setFilterr1] = useState("specifics2"); // يبدأ مفتوح على "جميع نقاط الفحص"{/* المحرك وناقل الحركه */}


const SteeringSystemData = {
  steeringSystem: [
    {
      title: "نظام التوجيه",
      type: "details",
      carImages: {
        images: ["/SIS.png"]
      },
      descriptionPoints: [
"أهمية نظام التوجيه و التعليق في ثبات السيارة و الحفاظ على افضل توازن و اقل مسافة توقف , يقوم أوتوسكور بعمل الفحوصات الضرورية و الأساسية باستخدام أجهزة بوش ",
"يغطي هذا القسم النقاط التالية :",
"الصنوبرصات الأمامية",
"الصنوبرصات الأمامية",
"الصنوبرصات الخلفية",
"مجموعة الستيرنج و اجزاءها",
"الأكسات الأمامية و الخلفية",
"بيل العجلات",
"قواعد المحرك و الجير",
      ],


      inspectionResults: {
        allInspectionPoints: [
          {
            label: "الانحراف في الميزان الامامي",
            Stats: "⚠️",
            info: "إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب فى ميزان المركبة",
            
          },
          {label: "الانحراف في الميزان الخلفي"},
          {
            label: " فياسات الشاصي الامامي الايسر",
            Stats: "⚠️",
            info: "ذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب فى ميزان المركبة",
           
          },
               {label: "الصنوبرصات الامامية",Stats: "⚠️", info: "   إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب جوهرية فى نظام التعليق وإمتصاص الصدمات." },
          { label:"الدانجل الامامي", Stats: "⚠️", info: "إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب جوهرية فى نظام التعليق وإمتصاص الصدمات" },
          { label: "بيل العجلات الامامي", Stats: "✔️" ,info: "إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب جوهرية فى نظام التعليق وإمتصاص الصدمات" },
    {label: "  الاكسات الاماميه " ,Stats: "✔️" ,info: "إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب جوهرية فى نظام التعليق وإمتصاص الصدمات" },
          {
            label: " مجموعه التوجيه ",
            Stats: "⚠️",
            info: "إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب جوهرية فى نظام التعليق وإمتصاص الصدمات" ,
          
          },
             {label: "الانحراف ف الميزان الخلفي " ,Stats: "✔️" ,info: "إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب جوهرية فى نظام التعليق وإمتصاص الصدمات" },
          { label: "الصنوبرات الخلفيه" ,Stats: "✔️" ,info: "إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب جوهرية فى نظام التعليق وإمتصاص الصدمات"  },
   
{
            label: "الدنجل الخلفي ",
            Stats: "⚠️",
            info:"إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب جوهرية فى نظام التعليق وإمتصاص الصدمات"  ,
            
          },
          { label: " بيل العجلات الخلفي ", Stats: "⚠️",info: "إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب فى ميزان المركبة" },
          { label:  "عمود الاستنينج", Stats: "✔️" ,info: "إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب فى ميزان المركبة" },
        ],



        carMainImage: hallbackImage,

        frontAlignmentIssues: [
          { label: "الانحراف في الميزان الأمامي", Stats: "✔️", info: "إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب فى ميزان المركبة" },
        ],

        rearAlignmentIssues: [
          { label: "الانحراف في الميزان الخلفي", Stats: "✔️", info: "إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب فى ميزان المركبة" },
        ],

        frontSuspensionIssues: [
          { label: "الصنوبرات الأمامية", Stats: "✔️", info: "إذا تم إختبار السيارة على جهاز (Test lane) ولم يوضح أي عيوب فعلى الأغلب لا يوجد عيوب فى ميزان المركبة" },
        ],

        rearSuspensionIssues: [
          { label: "الصنوبرات الخلفية", Stats: "✔️", info: "وجود نقرات أو شعر بسيط في الزجاج ليس بالأمر المقلق، مالم يكن كسر كبير وواضح" },
        ],

        frontDangerIssues: [{ label: "الدنجل الأمامي", Stats: "❌" }],

        rearDangerIssues: [{ label: "الدنجل الخلفي", Stats: "❌" }],

        wheelBearingIssues: [{ label: "بيل العجلات الأمامي", Stats: "❌" }],

        internalConditionIssues: [
          {
            label: "الحالة الداخلية",
            Stats: "⚠️",
            info: "وجود بعض التشققات في الأجزاء الداخلية ليس بالأمر المقلق ، ما لم يكن كسر أو مزع مؤثر على شكل أو أداء الأجزاء الداخلية",
          },
        ],
      },
    },
  ],
};
  const [selectedInspectionCategory, setSelectedInspectionCategory] = useState("allInspectionPoints");
  
  // تحسين الأداء: حفظ قائمة الفلاتر في متغير ثابت
  const filterOptions = [
    { key: "allInspectionPoints", label: "جميع نقاط الفحص" },
    { key: "frontAlignmentIssues", label: " الميزان الأمامي" },
    { key: "rearAlignmentIssues", label: " الميزان الخلفي" },
    { key: "frontSuspensionIssues", label: " التعليق الأمامي" },
    { key: "rearSuspensionIssues", label: " التعليق الخلفي" },
    { key: "frontDangerIssues", label: " الدنجل الأمامي" },
    { key: "rearDangerIssues", label: " الدنجل الخلفي" },
    { key: "wheelBearingIssues", label: " بيل العجلات" },
    { key: "internalConditionIssues", label: "الحالة الداخلية" },
  ];
  
  // تحسين الأداء: حفظ قائمة مفاتيح الفلاتر
  const filterKeys = filterOptions.map(option => option.key);
  
  // تحسين الأداء: حفظ البيانات المحسوبة
  const currentInspectionData = useMemo(() => {
    return SteeringSystemData.steeringSystem[0]?.inspectionResults[selectedInspectionCategory] ?? [];
  }, [selectedInspectionCategory]);
  
  const splitColumns = useMemo(() => {
    const mid = Math.ceil(currentInspectionData.length / 2);
    return [currentInspectionData.slice(0, mid), currentInspectionData.slice(mid)];
  }, [currentInspectionData]);
  const Fixed = {
  itimis4: [
    {
      
      title: "فحص الطريق ",
      type: "details",
   carInformation1: {
        images: ["/FIX.png"] 
      },
  
     descriptionPoints5: [
".يقوم فريق كارسيرفيس المتخصص بقيادة المركبة على الطريق بشكل متخصص للتأكد من عمل المحرك و نظام الدفع ، الجير و الغيارات ، ناقل الحركة ، البريكات و السيطرة على السيارة أثناء المسير و الالتفاف."
,
"و بقوم الفريق أيضا بفحص الأعطال الشائعة بهذا الموديل و التأكد من الأعطال الفنية اللي تم اكتشفاها أثناء الفحص الارضي او على الرافعة."
],


      Power: {
        specifics4: [
          {
            label: " ميزان طاره الاستيرنج ",
            Stats: "⚠️",
            info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط",
           
          },
          {label: "شعور طبيعي للسترينج  اثناء العمل ", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط",  Stats: "⚠️"},
          {
            label: "شعور طبيعي للستيرنج أثناء العمل",
            Stats: "⚠️",
            info: "تمت ملاحظة خدوش بسيطة في الصدام الأمامي.",
           
          },
               {label: "مجموعة نظام التعليق",Stats: "⚠️", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط"},
          { label: "مسير السيارة باستقامة على أرض منبسطة", Stats: "⚠️", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط" },
          { label: "مجموعة نظام التعليق", Stats: "⚠️", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط"},
    {label: " لايوجد صوت غير طبيعي او اهتزازات اثناءالمسير",Stats: "⚠️", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط"},
          {
            label:"أداء الدفع الرباعي",
            Stats: "⚠️",
            info: "تمت ملاحظة خدوش بسيطة في الصدام الأمامي.",
           
          },
             {label:"لايوجد صوت عجلات أو طريق غير طبيعي",Stats: "⚠️", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط"},
          { label: "ايوجد اهتزازات او أصوات من البريك", Stats: "⚠️", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط"},
   
{
            label: "مسير السيارة باستقامة على أرض منبسطة ",
            Stats: "⚠️",
            info: "تمت ملاحظة خدوش بسيطة في الصدام الأمامي.",
           
          },
          { label: "مجموعة نظام الستيرنج",Stats: "⚠️", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط" },
          { label: " أداء الجير الاوتوماتيكي ",Stats: "⚠️", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط" },
          { label:"لا يوجد صوت غير طبيعي او اهتزازات من نظام التعليق", Stats: "⚠️", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط" },
          { label: "أداء المحرك في درجة حرارة التشغيل",Stats: "⚠️", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط"},
          { label:"أداء نظام الهايبرد/الكهرباء    ", Stats: "⚠️", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط" },
          { label: "أداء نظام البريك", Stats: "⚠️", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط" },
          { label: "عمل مثبت السرعة", Stats: "⚠️", info: "عجلة القيادة يمكن أن تكون غير متناسقه عند تغيير إطارات السيارة وتحتاج الى إعادة الضبط"},
        ],



        carImagee: hallbackImage,

        
        
      },
    },
  ],
};
  const [Filterr3, setFilterr3] = useState("specifics4"); 

  const CoolingSystem = {
    coolingItems: [
      {
        
        title: "  نظام التكيف ",
        type: "details",
     carInformation1: {
          images: ["/AIRC.png"] 
        },
    
       descriptionPoints00: [
    ";كار سيرفيس يقوم بعمل فحص دقيق و متخصص لأنظمة التكييف و تبريد المحرك و يرجع الفضل الى الخبراء و المهندسين المختصين و الأجهزة و التقنيات المعتمدة من شركة بوش Bosch الالمانية .",
    "يغطي هذا القسم النقاط التالية :",
    "نظام التكييف و الكمبرسر",
    "نظام التدفئة",
"تبريد المحرك و المراوح",
"تهريب السوائل",
  ],
  
  
        CoolingData: {
          coolingSpecifics: [
            {
              label: "فحص نظام تبريد المحرك",
              Stats: "⚠️",
              info: "تمت ملاحظة تسريب بسيط في نظام التبريد.",
              
            },
            {label: "فحص مراوح تبريد المحرك"},
            {
              label: "فحص التدفئة",
              Stats: "⚠️",
              info: "تمت ملاحظة مشكلة في نظام التدفئة.",
             
            },
                 {label: "فحص تهريب غاز نظام التكييف"},
            { label: "فحص تهريب سائل تبريد المحرك", Stats: "⚠️", info: "يوجد تسريب في سائل التبريد." },
            { label: "فحص مضخة المياه", Stats: "✔️" },
      {label: "فحص منظم الحرارة"},
            {
              label: "فحص الرادياتير",
              Stats: "⚠️",
              info: "تمت ملاحظة انسداد بسيط في الرادياتير.",
             
            },
               {label: "فحص أنابيب التبريد"},
            { label: "فحص خزان سائل التبريد", Stats: "⚠️" },
     
  {
              label: "فحص منظم الضغط",
              Stats: "⚠️",
              info: "تمت ملاحظة مشكلة في منظم الضغط.",
             
            },
            { label: "فحص مروحة التبريد الكهربائية", Stats: "⚠️" },
            { label: "فحص حساس الحرارة", Stats: "✔️" },
          ],
  
  
  
          carImagee: hallbackImage,
  
          heatingSystem: [
            {
              label: "فحص نظام التدفئة",
              Stats: "⚠️",
              info: "تمت ملاحظة مشكلة في نظام التدفئة.",
              
            },
            { label: "فحص سخان المقصورة", Stats: "✔️", info: "سخان المقصورة يعمل بشكل طبيعي." },
            { label: "فحص منظم حرارة التدفئة", Stats: "⚠️", info: "منظم حرارة التدفئة يحتاج فحص." },
            { label: "فحص أنابيب التدفئة", Stats: "✔️",info: "أنابيب التدفئة بحالة جيدة."  },
            { label: "فحص مضخة التدفئة", Stats: "✔️" ,info: "مضخة التدفئة تعمل بشكل طبيعي." },
            { label: "فحص صمام التدفئة", Stats: "⚠️" ,info: "صمام التدفئة يحتاج تنظيف." },
            { label: "فحص فلتر التدفئة", Stats: "✔️",info: "فلتر التدفئة نظيف."  },
            { label: "فحص مروحة التدفئة", Stats: "✔️",info: "مروحة التدفئة تعمل بشكل طبيعي."  },
            { label: "فحص منظم سرعة التدفئة", Stats: "⚠️",info: "منظم سرعة التدفئة يحتاج فحص."  },
            { label: "فحص حساس حرارة التدفئة", Stats: "✔️",info: "حساس حرارة التدفئة يعمل بشكل طبيعي."  },
          ],
  
          acSystem: [
            { label: "فحص تهريب غاز نظام التكييف", Stats: "✔️", info: "لا يوجد تسريب في غاز التكييف" },
            { label: "فحص ضغط غاز التكييف", Stats: "✔️", info: "ضغط غاز التكييف طبيعي" },
            { label: "فحص فلتر التكييف" },
          ],

          coolingFluid: [
            { label: "فحص تهريب سائل تبريد المحرك", Stats: "✔️", info: "لا يوجد تسريب في سائل التبريد" },
            { label: "فحص مستوى سائل التبريد", Stats: "✔️", info: "مستوى سائل التبريد طبيعي" },
          ],

          coolingPipes: [
            { label: "فحص أنابيب التبريد", Stats: "✔️", info: "أنابيب التبريد بحالة جيدة" },
            { label: "فحص وصلات التبريد", Stats: "✔️", info: "وصلات التبريد محكمة" },
          ],

          coolingFans: [{ label: "فحص مراوح التبريد", Stats: "❌" }],

          coolingAccessories: [{ label: "فحص ملحقات التبريد", Stats: "❌" }],

          coolingTools: [{ label: "فحص أدوات التبريد", Stats: "❌" }],

          coolingInternal: [
            {
              label: "فحص الحالة الداخلية لنظام التبريد",
              Stats: "⚠️",
              info:
                "وجود بعض المشاكل البسيطة في نظام التبريد ليس بالأمر المقلق ، ما لم يكن عطل مؤثر على أداء النظام",
            },
          ],
        },
      },
    ],
  };
  
    const [coolingFilter, setCoolingFilter] = useState("coolingSpecifics"); 




const seftiy = {
  itimis7: [
    {
      
      title: "  المكابح والسلامه",
      type: "details",
   carInformation1: {
        images: ["/SIFTY.png"] 
      },
  
     descriptionPoints8: [
"السلامة أولا , لذلك نحرص في أوتوسكور على فحص جميع أجزاء أنظمة السلامة العامة و البريكات و الأكياس الهوائية بشكل دقيق و التأكد من فعالية الأداء و مطابقتها لمعايير أوتوسكور العالمية",
"يغطي هذا القسم النقاط التالية :",
"الاكياس الهوائية",
"الإطارات",
"البريكات و اجزائها",
"احزمة الأمان",
"أنظمة منع الإنزلاق",
],


      Power: {
        specifics7: [
          {
            label: "وجود جميع الأكياس الهوائية",
            Stats: "⚠️",
            info: "تمت ملاحظة مشكلة في أحد الأكياس الهوائية.",
           
          },
          {label: "بريك / ديسك امامي يسار"},
          {
            label: "بريك / ديسك خلفي يسار",
            Stats: "⚠️",
            info: "تمت ملاحظة تآكل في ديسك المكابح الخلفي الأيسر.",
           
          },
               {label: "عمق الفرزة الخلفي"},
          { label: "تفقد براغي العجلات", Stats: "⚠️", info: "بعض براغي العجلات تحتاج فحص." },
          { label: "حزام الأمان الأمامي اليمين", Stats: "✔️" },
    {label: "حزام الأمان الخلفي اليمين"},
          {
            label: "بريك / ديسك امامي يمين",
            Stats: "⚠️",
            info: "تمت ملاحظة تآكل في ديسك المكابح الأمامي الأيمن.",
           
          },
             {label: "بريك / ديسك خلفي يمين"},
          { label: "عمق الفرزة الامامي", Stats: "⚠️" },
   
{
            label: "عمر الإطارات أقل من 4 سنوات",
            Stats: "⚠️",
            info: "بعض الإطارات تجاوزت عمر 4 سنوات.",
          
          },
          { label: "نظام مانع الانزلاق", Stats: "⚠️" },
          { label: "حزام الأمان الأمامي اليسار", Stats: "✔️" },
          { label: "حزام الأمان الخلفي اليسار", Stats: "✔️" },
        ],



        carImagee: hallbackImage,

        continue7: [
          {
            label: "فحص الأكياس الهوائية الأمامية",
            Stats: "⚠️",
            info: "تمت ملاحظة مشكلة في الأكياس الهوائية الأمامية.",
           
          }, 
          { label: "فحص الأكياس الهوائية الجانبية", Stats: "✔️", info: "الأكياس الهوائية الجانبية بحالة جيدة." },
          { label: "فحص الأكياس الهوائية الخلفية", Stats: "⚠️", info: "الأكياس الهوائية الخلفية تحتاج فحص." },
          { label: "فحص نظام المكابح الأمامي", Stats: "✔️",info: "نظام المكابح الأمامي يعمل بشكل طبيعي."  },
          { label: "فحص نظام المكابح الخلفي", Stats: "✔️" ,info: "نظام المكابح الخلفي يعمل بشكل طبيعي." },
          { label: "فحص أحزمة الأمان الأمامية", Stats: "⚠️" ,info: "أحزمة الأمان الأمامية تحتاج فحص." },
          { label: "فحص أحزمة الأمان الخلفية", Stats: "✔️",info: "أحزمة الأمان الخلفية بحالة جيدة."  },
          { label: "فحص نظام مانع الانزلاق", Stats: "✔️",info: "نظام مانع الانزلاق يعمل بشكل طبيعي."  },
          { label: "فحص الإطارات الأمامية", Stats: "⚠️",info: "الإطارات الأمامية تحتاج فحص."  },
          { label: "فحص الإطارات الخلفية", Stats: "✔️",info: "الإطارات الخلفية بحالة جيدة."  },
        ],

        outline7: [
          { label: "فحص ديسكات المكابح الأمامية", Stats: "✔️", info: "ديسكات المكابح الأمامية بحالة جيدة" },
          { label: "فحص ديسكات المكابح الخلفية", Stats: "✔️", info: "ديسكات المكابح الخلفية بحالة جيدة" },
          { label: "فحص عمق الفرزات" },
        ],

        onabort7: [
          { label: "فحص براغي العجلات الأمامية", Stats: "✔️", info: "براغي العجلات الأمامية محكمة" },
          { label: "فحص براغي العجلات الخلفية", Stats: "✔️", info: "براغي العجلات الخلفية محكمة" },
        ],

        allpoint7: [
          { label: "فحص أحزمة الأمان الأمامية", Stats: "✔️", info: "أحزمة الأمان الأمامية تعمل بشكل طبيعي" },
          { label: "فحص أحزمة الأمان الخلفية", Stats: "✔️", info: "أحزمة الأمان الخلفية تعمل بشكل طبيعي" },
        ],

        parent7: [{ label: "فحص عمر الإطارات", Stats: "❌" }],

        review7: [{ label: "فحص نظام مانع الانزلاق", Stats: "❌" }],

        sheet7: [{ label: "فحص الأكياس الهوائية", Stats: "❌" }],

        tablet7: [
          {
            label: "فحص الحالة العامة للسلامة",
            Stats: "⚠️",
            info:
              "وجود بعض المشاكل البسيطة في أنظمة السلامة ليس بالأمر المقلق ، ما لم يكن عطل مؤثر على أداء أنظمة السلامة",
          },
        ],
      },
    },
  ],
};
  const [Filterr6, setFilterr6] = useState("specifics7"); 





  return (
    <div className="min-h-[70vh] max-w-6xl mx-auto bg-white dark:bg-black p-6 rounded-xl shadow">



  <div className="flex-grow">

      <h1 className="text-black dark:text-white text-2xl font-bold mb-6">تقرير فحص السيارة</h1>

      <div className="space-y-4">
        {reportData.sections.map((section, idx) => (
          <Disclosure key={idx} defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className=" w-full flex justify-between items-center px-4 py-2
    bg-white dark:bg-gray-800
    rounded-md shadow
    hover:bg-gray-100 dark:hover:bg-gray-700
    text-gray-800 dark:text-gray-200
  ">
                  <span className="text-black dark:text-white font-medium">{section.title}</span>
                  <FaChevronDown
                    className={`transform transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-4 py-2  bg-white dark:bg-black rounded-b-md border border-t-0 border-gray-200">
                
                  {section.type === "details" ? (
                    <div className="space-y-6">
  {/* مربعات المعلومات */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-black border border-gray-100 dark:border-white shadow rounded-lg h-auto sm:h-60">

  {/* اسم الماركة */}
 

  {/* الموديل */}
  <span className="text-black dark:text-white text-lg font-semibold text-gray-700 mt-1">
    {section.carInfo.model || "Song Plus 605KM Flagship"}
  </span>

  
</div>

{/* البوكس العنوان */}
<div className="p-6 bg-white dark:bg-black border border-white dark:border-white shadow rounded text-center">
  {/* اسم العربية */}
  <h2 className="text-black dark:text-white text-xl font-semibold text-gray-900 mb-4">
    {section.carInfo.title || "BYD Song Plus 605KM Flagship 2023"}
  </h2>

  {/* السطر اللي فيه رقم التقرير يمين ورقم الشاسيه شمال */}
  <div className="flex justify-between mt-4  text-black dark:text-white text-base ">
    <div className="text-right">
      <span className="block text-sm text-gray-600 text-black dark:text-white">رقم التقرير</span>
      <h3 className=" text-black dark:text-white font-semibold text-gray-800">
        {section.carInfo.reportNumber || "RPT-2025-001"}
      </h3>
    </div>
    <div className="text-left">
      <h3 className="font-semibold text-gray-800 text-black dark:text-white ">
        {section.carInfo.chassisNumber || "BYDSONGPLUS2023BY"}
      </h3>
    </div>
  </div>
</div>

     {/* اسم الماركة */}

<div className="flex flex-col items-center p-6bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg h-60">
      <img
        src={section.carInfo.image}
        alt="Car"
        className="w-28 h-28 object-cover rounded mb-3"
      />
      <span className="text-black dark:text-white text-base font-semibold">صورة السيارة</span>
    </div>
</div>


                      <div className="grid grid-cols-3 gap-4">
                    <div className="p-6 flex flex-col items-start bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg">
  {/* زر المعلومات */}
  <button
    className="mb-4 w-10 h-10 flex items-center justify-center bg-white dark:bg-black border border-black dark:border-white  rounded-full border border-gray-300 shadow hover:bg-gray-100"
    onClick={() => setShowInfo(!showInfo)}
  >
    <FaInfoCircle className="text-blue-500 text-xl" />
  </button>

  {/* جدول المعلومات */}
  {showInfo && (
    <div className="mb-4 bg-white shadow-lg border rounded-lg p-4 w-full">
      <table className="table-auto border-collapse border border-gray-300 w-full text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 px-3 py-1">Grade</th>
            <th className="border border-gray-300 px-3 py-1">Range</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g) => (
            <tr key={g.label}>
              <td
                className={`border border-gray-300 px-3 py-1 font-bold ${g.color.replace(
                  "bg",
                  "text"
                )}`}
              >
                {g.label}
              </td>
              <td className="border border-gray-300 px-3 py-1">
                {g.range[0]}% - {g.range[1]}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* الجوج */}
  <GaugeChart
    id="gauge-chart"
    nrOfLevels={20}
    colors={["#ef4444", "#f97316", "#eab308", "#22c55e"]}
    arcWidth={0.3}
    percent={score / 100}
    textColor="#000000"
  />

  {/* القيمة */}
  <div className="text-2xl font-bold mt-2">
    <span
      className={currentGrade ? currentGrade.color.replace("bg", "text") : ""}
    >
      {score}%
    </span>
  </div>
</div>
                        {/* النتيجة مع الأيقونة */}
                       <div className="flex flex-col items-center justify-center p-2 bg-white shadow rounded  bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg">
  {section.inspection.status === "success" ? (
    <>
      <FaCheckCircle className="text-green-500 text-3xl" />
      <span className="font-bold text-green-600">ناجحة</span>
    </>
  ) : section.inspection.status === "fail" ? (
    <>
<div className="w-24 h-24 flex items-center justify-center rounded-full bg-white border-4 border-black text-red-600 font-seimbold text-7xl shadow-md">
  
        F
      </div>
      <span className="mt-2 text-red-600 font-semibold">غير ناجحة</span>
      <button
        onClick={() => setShowReasons(true)}
        className="mt-1 text-sm text-gray-600 underline"
      >
        عرض الأسباب
      </button>
    </>
  ) : section.inspection.status === "pass" ? (
    <div className="flex items-center space-x-2 text-green-600">
      <FaCheckCircle className="text-3xl" />
      <span>ناجحة</span>
    </div>
  ) : (
    <span>-</span>
  )}
</div>

<div className="relative flex flex-col items-center justify-center p-6 bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg">
  {/* الصورة */}
  <img
    src={image55}
    alt="car"
    className="w-20 h-20 rounded-full object-cover"
  />

  <span className="mt-3 text-lg font-bold">القيمة التسويقية</span>
</div>


                      </div>
      {/* تقرير الفحص */}
<div className="bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg p-6 space-y-6">

  {/* عنوان القسم */}
  <h2 className="text-xl font-bold text-gray-900 border-b pb-2 dark:text-white">
    معلومات التقرير
  </h2>

  {/* جدول معلومات التقرير */}
  <div className="grid grid-cols-2 gap-x-8  text-base dark:text-white">
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600 font-semibold dark:text-white">التاريخ</span>
      <span className="font-semibold dark:text-white">Dec 31, 2024</span>
    </div>
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600 font-semibold dark:text-white">رقم التقرير</span>
      <span className="font-semibold dark:text-white">10311224033</span>
    </div>
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600 font-semibold dark:text-white">نوع الفحص</span>
      <span className="font-semibold dark:text-white">الفحص الشامل</span>
    </div>
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600 font-semibold dark:text-white">فرع الفحص</span>
      <span className="font-semibold dark:text-white ">البيادر</span>
    </div>
  </div>

  {/* عنوان القسم */}
  <h2 className="text-xl font-bold text-gray-900 border-b pb-2 mt-6 dark:text-white">
    معلومات المركبة
  </h2>

  {/* جدول معلومات المركبة */}
  <div className="grid grid-cols-2 gap-x-8 text-base dark:text-white">
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600 font-semibold dark:text-white">النوع</span>
      <span className="font-semibold">BYD</span>
    </div>
    <div className="flex justify-between border-b py-2 dark:text-white">
      <span className="text-gray-600 font-semibold">الموديل</span>
      <span className="font-semibold dark:text-white">Song Plus</span>
    </div>
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600font-semibold dark:text-white">الفئة</span>
      <span className="font-semibold dark:text-white">605KM Flagship</span>
    </div>
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600 font-semibold dark:text-white">سنة الصنع</span>
      <span className="font-semibold dark:text-white">2023</span>
    </div>
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600 font-semibold dark:text-white">سعة المحرك</span>
      <span className="font-semibold dark:text-white">-</span>
    </div>
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600 font-semibold dark:text-white">العداد الحالي</span>
      <span className="font-semibold">5007 KM</span>
    </div>
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600 font-semibold dark:text-white">رقم اللوحة</span>
      <span className="font-semibold dark:text-white">FREEZONE</span>
    </div>
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600 font-semibold dark:text-white">لون السيارة</span>
      <span className="font-semibold dark:text-white">فيراني</span>
    </div>
   <div className="grid grid-cols-2 border-b py-2 col-span-2">
  {/* العنوان */}
  <span className="text-gray-600 font-semibold dark:text-white">نوع المحرك</span>

  {/* القيمة */}
  <span className="font-semibold text-gray-900 dark:text-white">Electric</span>
</div>


    
  </div>
</div>
{/* قسم الإضافات */}
<div className="bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg">
  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white ">الإضافات</h3>

  <div className="flex flex-wrap gap-2">
    {[
      "شحن لاسلكي",
      "كراسي مبردة",
      "كراسي مدفئة",
      "كراسي جلد",
      "شاشة أمامية",
      "عدادات ديجيتال",
      "الدخول بدون مفتاح (بصمة)",
      "تتبع المسار",
      "النقطة العمياء",
      "أضوية LED",
      "كاميرا خلفية",
      "كاميرا 360 درجة",
      "سقف بانوراما",
      "نظام صوتي",
      "تحكم ستيرنج",
      "مثبت سرعة",
      "حساسات أمامية",
      "حساسات خلفية",
      "بصمة تشغيل",
      "نظام الرادار",
      "تنبيه التصادم",
      "كراسي كهربائي",
    ].map((item, index) => {
      return (
        <div
          key={index}
          className="flex items-center border border-red-500 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-white"
        >
          <span className="text-gray-700 dark:text-white text-xs mr-1">✓</span>
          {item}
        </div>
      );
    })}
  </div>
</div>
{/* */}
   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  {inspections.map((item, idx) => (
    <div 
      key={idx} 
      onClick={() => {
        const sectionId = item.name.replace(/\s+/g, "-"); // يحول الاسم لـ id
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      className="flex items-center justify-between p-3 bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg"
    >
      {/* الأيقون + الاسم */}
      <div className="flex items-center gap-2 text-gray-800">
        <span className="text-xl text-blue-600   ">{item.icon || <FaCarSide />}</span>
        <span className="text-base font-medium dark:text-white ">{item.name}</span>
      </div>

      {/* المثلث الملون */}
      <span
        className={`w-0 h-0 border-l-[10px] border-y-[6px] border-y-transparent ${getStatusColor(item.status)}`}
      ></span>
    </div>
  ))}
</div>


                      {/* تفاصيل التقرير */}
                      <div className=" bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg divide-y">
                        {section.inspection.details.map((item, i) => (
                          <div key={i} className="p-2 flex justify-between">
                            <span className="font-medium">{item.label}</span>
                            <span>{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p>{section.content}</p>
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      
   
      </div>
      

      {/* نافذة الأسباب */}
      {showReasons && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-black p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-black dark:text-white text-base-xl font-bold mb-4 text-red-600">
              أسباب الفشل في الفحص
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {reportData.sections[0].inspection.reasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
            <button
              onClick={() => setShowReasons(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              إغلاق
            </button>
          </div>
        </div>
        
      )}


      {/*التاريخ والسجلات */}
<div id="التاريخ-والسجلات">
 <div className="space-y-4 mt-6">
        {historyData.itemes.map((itemes, idx) => (
          <Disclosure key={idx}>
            {({ open }) => (
              <>
                <Disclosure.Button className=" w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow

                   hover:bg-gray-100 dark:hover:bg-gray-700
            text-gray-800 dark:text-gray-200">

  
                  <span className="font-medium dark:text-whit">{itemes.title}</span>
                  <FaChevronDown
                    className={`transform transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </Disclosure.Button>
<Disclosure.Panel className="px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700" >

                  {/* لو القسم تفاصيل */}
                  {itemes.type === "details" ? (
                    <div className="space-y-10">
  {/* مربعات المعلومات */}
  <div className="grid grid-cols-2 gap-6">
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow rounded-lg" >

  {/* صورة السيارة */}
  <img
    src={itemes.carInfoo.image}
    alt="Car"
    className="w-100 h-100 object-contain mx-auto rounded-lg"
  />
</div>
{/* البوكس العنوان */}
<div className="p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow rounded text-center" >

  {/*النصوص*/}
  <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-2" >
    {itemes.descriptionPoints.map((point, index) => (
      <li key={index}>{point}</li>
    ))}
  </ul>   
</div>
</div>         
      

<div className="flex gap-2 mb-4">
  <button 
    onClick={() => setActiveFilter("details")}
    className={`px-4 py-2 rounded transition-colors duration-200 ${
      activeFilter === "details" 
        ? "bg-blue-500 text-white dark:bg-blue-600" 
        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }`}
  >
    جميع نقاط الفحص
  </button>

  <button 
    onClick={() => setActiveFilter("registration")}
    className={`px-4 py-2 rounded transition-colors duration-200 ${
      activeFilter === "registration" 
        ? "bg-blue-500 text-white dark:bg-blue-600" 
        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }`}
  >
    حالة التسجيل قبل الأستيراد
  </button>

  <button 
    onClick={() => setActiveFilter("maintenance")}
    className={`px-4 py-2 rounded transition-colors duration-200 ${
      activeFilter === "maintenance" 
        ? "bg-blue-500 text-white dark:bg-blue-600" 
        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }`}
  >
    تاريخ الرعاية بالمركبة
  </button>

  <button 
    onClick={() => setActiveFilter("mileage")}
    className={`px-4 py-2 rounded transition-colors duration-200 ${
      activeFilter === "mileage" 
        ? "bg-blue-500 text-white dark:bg-blue-600" 
        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }`}
  >
    المسافة المقطوعة
  </button>
</div>

{/* الجدول */}

{activeFilter === "details" && 
  <div className="grid grid-cols-2 gap-4">
    {(() => {
      let sections = [];
      let currentSection = { title: "", items: [] };

      historyData.itemes[0].check.details.forEach((row) => {
        const label = row.label || row.Label || "";
        const value = row.value || "";
        const status = row.status || "";

        if (!value && !status) {
          // عنصر عنوان جديد
          if (currentSection.items.length > 0) sections.push(currentSection);
          currentSection = { title: label, items: [] };
        } else {
          currentSection.items.push({ label, value, status });
        }
      });

      if (currentSection.items.length > 0) sections.push(currentSection);

      return sections.map((section, idx) => (
        <div key={idx} className="border p-2">
<div className="font-bold text-gray-700 dark:text-gray-200 mb-2">{section.title}</div>
          <div className="space-y-1">
            {section.items.map((row, i) => (
              <div key={i} className="flex justify-between border-b py-2 px-2 text-sm items-center">
                <span className="w-32">{row.label}</span>
                <span className="w-32">{row.value}</span>
                <span className={`w-10 font-semibold ${row.status === "✅" ? "text-green-500" : "text-red-500"}`}>
                  {row.status || ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      ));
    })()}
  </div>
}
{/*جدول حاله التسجيل  */}
{activeFilter === "registration" && (() => {
  const sections = [];
  let currentSection = { title: "", items: [] };

  historyData.itemes[0].check.registration.forEach((row) => {
    const label = row.label || row.Label || "";
    const value = row.value || "";
    const status = row.status || "";

    if (!value && !status) {
      // عنصر عنوان جديد
      if (currentSection.items.length > 0) sections.push(currentSection);
      currentSection = { title: label, items: [] };
    } else {
      currentSection.items.push({ label, value, status });
    }
  });

  if (currentSection.items.length > 0) sections.push(currentSection);

  return (
    <div className="grid grid-cols-2 gap-4">
      {sections.map((section, idx) => (
        <div key={idx} className="border p-2">
<div className="font-bold text-gray-700 dark:text-gray-200 mb-2">{section.title}</div>
          <div className="space-y-1">
            {section.items.map((row, i) => (
              <div key={i} className="flex justify-between border-b py-2 px-2 text-sm items-center">
                <span className="w-32">{row.label}</span>
                <span className="w-32">{row.value}</span>
                <span className={`w-10 font-semibold ${row.status === "✅" ? "text-green-500" : "text-red-500"}`}>
                  {row.status || ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
})()}
{/*جدول تارخ الرعايه */}
{activeFilter === "maintenance" && (() => {
  const sections = [];
  let currentSection = { title: "", items: [] };

  historyData.itemes[0].check.maintenance.forEach((row) => {
    const label = row.label || row.Label || "";
    const value = row.value || "";
    const status = row.status || "";

    if (!value && !status) {
      // عنصر عنوان جديد
      if (currentSection.items.length > 0) sections.push(currentSection);
      currentSection = { title: label, items: [] };
    } else {
      currentSection.items.push({ label, value, status });
    }
  });

  if (currentSection.items.length > 0) sections.push(currentSection);

  return (
    <div className="grid grid-cols-2 gap-4">
      {sections.map((section, idx) => (
        <div key={idx} className="border p-2">
<div className="font-bold text-gray-700 dark:text-gray-200 mb-2">{section.title}</div>
          <div className="space-y-1">
            {section.items.map((row, i) => (
              <div key={i} className="flex justify-between border-b py-2 px-2 text-sm items-center">
                <span className="w-32">{row.label}</span>
                <span className="w-32">{row.value}</span>
                <span className={`w-10 font-semibold ${row.status === "✅" ? "text-green-500" : "text-red-500"}`}>
                  {row.status || ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
})()}

{/*جدول المسافات*/}
{activeFilter === "mileage" && (() => {
  const sections = [];
  let currentSection = { title: "", items: [] };

  historyData.itemes[0].check.mileage.forEach((row) => {
    const label = row.label || row.Label || "";
    const value = row.value || "";
    const status = row.status || "";

    if (!value && !status) {
      // عنصر عنوان جديد
      if (currentSection.items.length > 0) sections.push(currentSection);
      currentSection = { title: label, items: [] };
    } else {
      currentSection.items.push({ label, value, status });
    }
  });

  if (currentSection.items.length > 0) sections.push(currentSection);

  return (
    <div className="grid grid-cols-2 gap-4">
      {sections.map((section, idx) => (
        <div key={idx} className="border p-2">
<div className="font-bold text-gray-700 dark:text-gray-200 mb-2">{section.title}</div>
          <div className="space-y-1">
            {section.items.map((row, i) => (
              <div key={i} className="flex justify-between border-b py-2 px-2 text-sm items-center">
                <span className="w-32">{row.label}</span>
                <span className="w-32">{row.value}</span>
                <span className={`w-10 font-semibold ${row.status === "✅" ? "text-green-500" : "text-red-500"}`}>
                  {row.status || ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
})()}

<div className=" mb-4">
  {/* العنوان */}
  <div className="text-center p-2 rounded  dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-lg mb-2">
    أماكن الضرر حسب تقرير الكروكا
  </div>

  {/* بوكس الصورة */}
  <div className="p-4 bg-white dark:bg-gray-700 shadow rounded-lg max-w-md mx-auto">
    <img
      src={itemes.check.carIamge} 
      alt="Car"
      className="w-full h-auto object-contain rounded-lg"
    />
  </div>
</div>

<div className="p-2 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-base rounded">
  {/* النصوص */}
  <ul className="list-disc list-inside text-gray-700  dark:text-gray-100 space-y-1 text-sm">
    الملاحظات:
    <li>لم يتم التأكد من قراءة العداد الحالية لعدم توفر مصادر موثوقة لدى اوتوسكور وقت الفحص</li>
  </ul>
</div>


                 </div>
                  ) : (
                    <p>{itemes.content}</p>
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      
   
      </div>
</div>
      {/* الهيكل الخارجي */}
      <div id="الهيكل-الخارجي">

    <div className="space-y-5 mt-6">
  {exoskeleton.itemis.map((item, idx) => (
    <Disclosure key={idx} >
      {({ open }) => (
        <>
<Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
            <span className="font-medium">{item.title}</span>
            <FaChevronDown
              className={`transform transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Disclosure.Button>

<Disclosure.Panel className="px-4 py-2 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* صورة السيارة */}
              <div className="flex flex-col items-center justify-center p-6 shadow rounded-lg">
                <img
                  src={item.carInformation.image}
                  alt="Car"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              {/* نصوص الوصف */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                  {item.descriptionPoints1.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* أزرار الفلاتر */}
         <div className="flex flex-wrap gap-3 mt-6">
  {[
    { key: "specifics", label: "جميع نقاط الفحص" },
    { key: "continue", label: "حالة البودي الخارجي" },
    { key: "outline", label: "الزجاج" },
    { key: "onabort", label: "المرايه الجانبية" },
    { key: "allpoint", label: "الشبر" },
    { key: "parent", label: "الاطار الاحتياطي" },
    { key: "review", label: "الجك والعده الأضافيه" },
    { key: "sheet", label: "مفتاح الاطارات" },
    { key: "tablet", label: "الحالة الداخلية1" },
  ].map((btn) => (
    <button
      key={btn.key}
      onClick={() => setFilter(btn.key)}
      className={`px-4 py-2 rounded transition-colors duration-200 ${
        Filter === btn.key
          ? "bg-blue-500 text-white dark:bg-blue-600"
          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
      }`}
    >
      {btn.label}
    </button>
  ))}
</div>


{["specifics","continue","outline","onabort","allpoint","parent","review","sheet","tablet"].includes(Filter) && (() => {
  const src = exoskeleton.itemis[0]?.control[Filter] ?? [];
  const mid = Math.ceil(src.length / 2);
  const cols = [src.slice(0, mid), src.slice(mid)];

  return (
    <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-10">
      {cols.map((col, colIdx) => (
        <div key={colIdx} className="space-y-6">
          {col.map((row, i) => {
            const stat = row.stats ?? row.Stats ?? "";

            return (
              <div key={`${colIdx}-${i}`} className="pb-3">
                {/* السطر الأساسي */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 relative">
                    {row.info && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenInfoIndex(openInfoIndex === `${colIdx}-${i}` ? null : `${colIdx}-${i}`);
                        }}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-base relative transition-colors"
                      >
                        <FaInfoCircle size={20} />
                        {openInfoIndex === `${colIdx}-${i}` && (
                          <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg w-64 z-10">
                            {row.info}
                          </div>
                        )}
                      </button>
                    )}
                    <span className="text-black dark:text-white text-base font-medium">{row.label}</span>
                  </div>

                  <span
                    className={`font-bold text-base ${
                      stat === "✅" || stat === "✔️"
                        ? "text-green-500"
                        : stat === "⚠️"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat}
                  </span>
                </div>

                {/* الصور المصغرة */}
                {row.gallery && row.gallery.length > 0 && (
                  <div className="mt-3">
                    <img
                      src={row.gallery[0].src}
                      alt={row.label}
                      className="w-32 h-24 object-cover rounded-lg shadow cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setOpenGallery({ images: row.gallery, start: 0 })}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
})()}



{openGallery && (
  <FullScreenGallery
    images={openGallery.images}
    startIndex={openGallery.start}
    onClose={() => setOpenGallery(null)}
  />
)}



<div className="p-2 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-base rounded">
  {/* النصوص */}
<ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1 text-sm" >
    الملاحظات:
    <li>لم يتم التأكد من قراءة العداد الحالية لعدم توفر مصادر موثوقة لدى كارسيرفس وقت الفحص</li>
  </ul>
</div>

          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  ))}
</div>
</div>

{/*الشاصي والهيكل */}
<div id="الشاصي-والهيكل">
  <div className="space-y-5 mt-6">
  {Chassisa.itimis.map((item, idx) => (
    <Disclosure key={idx}>
      {({ open }) => (
        <>
<Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
            <span className="font-medium">{item.title}</span>
            <FaChevronDown
              className={`transform transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Disclosure.Button>

<Disclosure.Panel className="px-4 py-2 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">

<div className="grid grid-cols-2 gap-6 items-stretch">
  {/* صورة السيارة */}
  <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow rounded-lg overflow-hidden flex">
    {Chassisa.itimis[0].carInformation1.images.map((img, i) => (
    <img
  key={i}
  src={img}
  alt={`car ${i}`}
  className="w-full h-full "
/>

    ))}
  </div>

  {/* نصوص الوصف */}
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col justify-center">
    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
      {item.descriptionPoints2.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
</div>


            {/* أزرار الفلاتر */}
           <div className="flex flex-wrap gap-3 mt-6">
  {[
    { key: "specifics1", label: "جميع نقاط الفحص" },
    { key: "continue1", label: "قياسات الشاصي الامامي اليمين1  " },
    { key: "outline1", label: "قياسات الشاصي الخلفي اليسار" },
    { key: "onabort1", label: " الهيكل الامامي1" },
    { key: "allpoint1", label: "الهيكل السفلي" },
    { key: "parent", label: "الاطار الاحتياطي" },

    { key: "sheet", label: " الهيكل العلوي1" },
    { key: "tablet1", label: " هيكل الجنب اليمين" },
  ].map((btn) => (
    <button
      key={btn.key}
      onClick={() => setFilterr(btn.key)}
      className={`px-4 py-2 rounded transition-colors duration-200 ${
        Filterr === btn.key
          ? "bg-blue-500 text-white dark:bg-blue-600"
          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
      }`}
    >
      {btn.label}
    </button>
  ))}
</div>


            {/* محتوى الفلاتر */}
{["specifics1", "continue1","outline1","onabort1","allpoint1","parent","review","sheet","tablet1"].includes(Filterr) && (
  (() => {
    const src = Chassisa.itimis[0]?.Power[Filterr] ?? [];
    const mid = Math.ceil(src.length / 2);
    const cols = [src.slice(0, mid), src.slice(mid)];

    return (
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-16 gap-y-6 md:gap-y-10">
        {cols.map((col, colIdx) => (
          <div key={colIdx} className="space-y-6">
            {col.map((row, i) => {
              const stat = row.stats ?? row.Stats ?? "";

              return (
                <div key={`${colIdx}-${i}`} className="pb-3">
                  {/* السطر الأساسي */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 relative">
                      {row.info && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenInfoIndex(
                              openInfoIndex === `${colIdx}-${i}` ? null : `${colIdx}-${i}`
                            );
                          }}
                          className="text-blue-600 hover:text-blue-800 dark:text-white text-base relative"
                        >
                          <FaInfoCircle size={20} />
                          {openInfoIndex === `${colIdx}-${i}` && (
                            <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg w-64 z-10">
                              {row.info}
                            </div>
                          )}
                        </button>
                      )}
                      <span className="text-black dark:text-white text-base font-medium">
                        {row.label}
                      </span>
                    </div>

                    <span
                      className={`font-bold text-base ${
                        stat === "✅" || stat === "✔️"
                          ? "text-green-500"
                          : stat === "⚠️"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {stat}
                    </span>
                  </div>

                  {/* thumbnails الصور */}
                 {row.gallery && row.gallery.length > 0 && (
  <div className="mt-3">
    <img
      src={row.gallery[0].src}

      alt={row.label}
      className="w-32 h-24 object-cover rounded-lg shadow cursor-pointer hover:opacity-80"
      onClick={() =>
        setOpenGallery({ images: row.gallery, start: 0 }) 
      }
    />
  </div>
)}

                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  })()
)}


{/* عرض FullScreenGallery لو متفتح */}
{openGallery && (
  <ScreenGallery
    images={openGallery.images}
    startIndex={openGallery.start}
    onClose={() => setOpenGallery(null)}
  />
)}



<div className="p-2 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-base rounded">
  {/* النصوص */}
<ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1 text-sm" >
    الملاحظات:
    <li>لم يتم التأكد من قراءة العداد الحالية لعدم توفر مصادر موثوقة لدى كارسيرفس وقت الفحص</li>
  </ul>
</div>

          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  ))}
</div>
</div>
<div id="المحرك-ناقل-الحركه" >

<div className="space-y-5 mt-6">
{Move.itimis1.map((item, idx) => (
  <Disclosure key={idx} >
    {({ open }) => (
      <>
<Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
          <span className="font-medium">{item.title}</span>
          <FaChevronDown
            className={`transform transition-transform ${open ? "rotate-180" : ""}`}
          />
        </Disclosure.Button>

<Disclosure.Panel className="px-4 py-2 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* صورة السيارة */}
            <div className="flex flex-col items-center justify-center p-6 shadow rounded-lg">
              {Move.itimis1[0].carInformation1.images.map((img, i) => (
<img key={i} src={img} alt={`car ${i}`} className="w-full h-auto object-contain" />
))}

            </div>

            {/* نصوص الوصف */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                {item.descriptionPoints3.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* أزرار الفلاتر */}
        <div className="flex flex-wrap gap-3 mt-6">
{[
  { key: "specifics2", label: "جميع نقاط الفحص" },


 
  { key: "parent2", label: "قياسات الشاصي الخلفي اليسار" },
  { key: "review2", label: "الهيكل الأمامي" },
  { key: "sheet2", label: "الهيكل الخلفي" },
  { key: "tablet2", label: "الهيكل السفلي" },
  { key: "continue2", label: "الهيكل العلوي" },
  { key: "chassisMeasurements", label: "هيكل الجنب اليمين" },
  { key: "frameMeasurements", label: "هيكل الجنب اليسار" },
  { key: "rustInspection", label: "وجود الصدأ" },

].map((btn) => (
  <button
    key={btn.key}
    onClick={() => setFilterr1(btn.key)}
    className={`px-4 py-2 rounded transition-colors duration-200 ${
      Filterr1 === btn.key
        ? "bg-blue-500 text-white dark:bg-blue-600"
        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`}
  >
    {btn.label}
  </button>
))}
</div>

          {/* محتوى الفلاتر */}
{["specifics2", "outline2", "onabort2", "allpoint2", "parent2", "review2", "sheet2", "tablet2", "continue2", "chassisMeasurements", "frameMeasurements", "rustInspection"].includes(Filterr1) && (
(() => {
  const src = Move.itimis1[0]?.Power[Filterr1] ?? [];
  const mid = Math.ceil(src.length / 2);
  const cols = [src.slice(0, mid), src.slice(mid)];

  return (
    <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-10">
      {cols.map((col, colIdx) => (
        <div key={colIdx} className="space-y-6">
          {col.map((row, i) => {
            const stat = row.stats ?? row.Stats ?? "";

            return (
              <div key={`${colIdx}-${i}`} className="pb-3">
                {/* السطر الأساسي */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 relative">
                    {row.info && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenInfoIndex(
                            openInfoIndex === `${colIdx}-${i}` ? null : `${colIdx}-${i}`
                          );
                        }}
                        className="text-blue-600 hover:text-blue-800 dark:text-white text-base relative"
                      >
                        <FaInfoCircle size={20} />
                        {openInfoIndex === `${colIdx}-${i}` && (
                          <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg w-64 z-10">
                            {row.info}
                          </div>
                        )}
                      </button>
                    )}
                    <span className="text-black dark:text-white text-base font-medium">
                      {row.label}
                    </span>
                  </div>

                  <span
                    className={`font-bold text-base ${
                      stat === "✅" || stat === "✔️"
                        ? "text-green-500"
                        : stat === "⚠️"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat}
                  </span>
                </div>

                {/* عرض القياسات التفصيلية */}
                {row.measurements && (
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">القياس الفعلي:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">
                          {row.measurements.actual}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">القياس المطلوب:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">
                          {row.measurements.required}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">الانحراف:</span>
                        <span className={`font-semibold mr-2 ${
                          row.measurements.status === 'perfect' ? 'text-green-500' :
                          row.measurements.status === 'within_tolerance' ? 'text-yellow-500' :
                          'text-red-500'
                        }`}>
                          {row.measurements.deviation}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">الحالة:</span>
                        <span className={`font-semibold mr-2 ${
                          row.measurements.status === 'perfect' ? 'text-green-500' :
                          row.measurements.status === 'within_tolerance' ? 'text-yellow-500' :
                          'text-red-500'
                        }`}>
                          {row.measurements.status === 'perfect' ? 'مطابق تماماً' :
                           row.measurements.status === 'within_tolerance' ? 'ضمن التسامح' :
                           'يتجاوز التسامح'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* عرض مناطق الصدأ المتأثرة */}
                {row.affectedAreas && (
                  <div className="mt-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-sm">
                      <span className="text-orange-700 dark:text-orange-300 font-semibold">المناطق المتأثرة:</span>
                      <ul className="list-disc list-inside mt-1 text-orange-600 dark:text-orange-400">
                        {row.affectedAreas.map((area, idx) => (
                          <li key={idx}>{area}</li>
                        ))}
                      </ul>
                      {row.severity && (
                        <div className="mt-2">
                          <span className="text-orange-700 dark:text-orange-300 font-semibold">شدة الصدأ:</span>
                          <span className="mr-2 text-orange-600 dark:text-orange-400">
                            {row.severity === 'surface_rust' ? 'صدأ سطحي' : row.severity}
                          </span>
                        </div>
                      )}
                      {row.recommendation && (
                        <div className="mt-2">
                          <span className="text-orange-700 dark:text-orange-300 font-semibold">التوصية:</span>
                          <span className="mr-2 text-orange-600 dark:text-orange-400">{row.recommendation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* thumbnails الصور */}
               {row.gallery && row.gallery.length > 0 && (
<div className="mt-3">
  <img
    src={row.gallery[0].src}

    alt={row.label}
    className="w-32 h-24 object-cover rounded-lg shadow cursor-pointer hover:opacity-80"
    onClick={() =>
      setOpenGallery({ images: row.gallery, start: 0 }) 
    }
  />
</div>
)}

              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
})()
)}

{openGallery && (
<FullScreenGallery
  images={openGallery.images}
  startIndex={openGallery.start}
  onClose={() => setOpenGallery(null)}
/>
)}


<div className="p-2 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-base rounded">
{/* النصوص */}
<ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1 text-sm" >
  الملاحظات:
  <li>لم يتم التأكد من قراءة العداد الحالية لعدم توفر مصادر موثوقة لدى كارسيرفس وقت الفحص</li>
</ul>
</div>

        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
))}
</div>
</div>
  <div id="نظام-التوجيه">
<div className="space-y-5 mt-6">
{SteeringSystemData.steeringSystem.map((item, idx) => (
  <Disclosure key={idx} >
    {({ open }) => (
      <>
<Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
          <span className="font-medium">{item.title}</span>
          <FaChevronDown
            className={`transform transition-transform ${open ? "rotate-180" : ""}`}
          />
        </Disclosure.Button>

<Disclosure.Panel className="px-4 py-2 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
          <div className="grid grid-cols-2 gap-6">
            {/* صورة السيارة */}
            <div className="flex flex-col items-center justify-center p-6 shadow rounded-lg">
              {SteeringSystemData.steeringSystem[0].carImages.images.map((img, i) => (
                <img key={i} src={img} alt={`car ${i}`} />
              ))}
            </div>

            {/* نصوص الوصف */}
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                {item.descriptionPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* أزرار الفلاتر */}
          <div className="flex flex-wrap gap-3 mt-6">
{filterOptions.map((btn) => (
  <button
    key={btn.key}
    onClick={() => setSelectedInspectionCategory(btn.key)}
    className={`px-4 py-2 rounded transition-colors duration-200 ${
      selectedInspectionCategory === btn.key
        ? "bg-blue-500 text-white dark:bg-blue-600"
        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`}
  >
    {btn.label}
  </button>
))}
</div>

          {/* محتوى الفلاتر */}
{filterKeys.includes(selectedInspectionCategory) && (
  <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-10">
    {splitColumns.map((col, colIdx) => (
        <div key={colIdx} className="space-y-6">
          {col.map((row, i) => {
            const stat = row.stats ?? row.Stats ?? "";

            return (
              <div key={`${colIdx}-${i}`} className="pb-3">
                {/* السطر الأساسي */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 relative">
                    {row.info && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenInfoIndex(
                            openInfoIndex === `${colIdx}-${i}` ? null : `${colIdx}-${i}`
                          );
                        }}
                        className="text-blue-600 hover:text-blue-800 dark:text-white text-base relative"
                      >
                        <FaInfoCircle size={20} />
                        {openInfoIndex === `${colIdx}-${i}` && (
                          <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg w-64 z-10">
                            {row.info}
                          </div>
                        )}
                      </button>
                    )}
                    <span className="text-black dark:text-white text-base font-medium">
                      {row.label}
                    </span>
                  </div>

                  <span
                    className={`font-bold text-base ${
                      stat === "✅" || stat === "✔️"
                        ? "text-green-500"
                        : stat === "⚠️"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat}
                  </span>
                </div>

                {/* thumbnails الصور */}
                {row.gallery && row.gallery.length > 0 && (
                  <div className="mt-3">
                    <img
                      src={row.gallery[0].src}
                      alt={row.label}
                      className="w-32 h-24 object-cover rounded-lg shadow cursor-pointer hover:opacity-80"
                      onClick={() =>
                        setOpenGallery({ images: row.gallery, start: 0 }) 
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
)}


{/* عرض FullScreenGallery لو متفتح */}
{openGallery && (
<ScreenGallery
  images={openGallery.images}
  startIndex={openGallery.start}
  onClose={() => setOpenGallery(null)}
/>
)}



<div className="p-2 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-base rounded">
{/* النصوص */}
<ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1 text-sm" >
  الملاحظات:
  <li>لم يتم التأكد من قراءة العداد الحالية لعدم توفر مصادر موثوقة لدى كارسيرفس وقت الفحص</li>
</ul>
</div>

        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
))}
</div>
</div>
    </div>

<div id="فحص-الطريق">
  <div className="space-y-5 mt-6">
  {Fixed.itimis4.map((item, idx) => (
    <Disclosure key={idx} >
      {({ open }) => (
        <>
<Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
            <span className="font-medium">{item.title}</span>
            <FaChevronDown
              className={`transform transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Disclosure.Button>

<Disclosure.Panel className="px-4 py-2 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
  {/* صورة السيارة */}
  <div className="shadow rounded-lg overflow-hidden">
    {Fixed.itimis4[0].carInformation1.images.map((img, i) => (
      <img
        key={i}
        src={img}
        alt={`car ${i}`}
        className="w-full h-auto object-contain object-center"
      />
    ))}
  </div>

  {/* نصوص الوصف */}
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
      {item.descriptionPoints5.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
</div>

            {/* أزرار الفلاتر */}
            <div className="flex flex-wrap gap-3 mt-6 ">
             
             {[
  { key: "specifics4", label: "جميع نقاط الفحص" },
 
].map((btn) => (
  <button
    key={btn.key}
    onClick={() => setFilterr3(btn.key)}
    className={`px-4 py-2 rounded ${
      Filterr3 === btn.key ? "bg-blue-300 text-black dark:text-white text-base font-medium" : "bg-gray-200"
    }`}
  >
    {btn.label}
  </button>
))}

            </div>

            {/* محتوى الفلاتر */}
{["specifics4"].includes(Filterr3) && (
  (() => {
    const src = Fixed.itimis4[0]?.Power[Filterr3] ?? [];
    const mid = Math.ceil(src.length / 2);
    const cols = [src.slice(0, mid), src.slice(mid)];

    return (
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-16 gap-y-6 md:gap-y-10">
        {cols.map((col, colIdx) => (
          <div key={colIdx} className="space-y-6">
            {col.map((row, i) => {
              const stat = row.stats ?? row.Stats ?? "";

              return (
                <div key={`${colIdx}-${i}`} className="pb-3">
                  {/* السطر الأساسي */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 relative">
                      {row.info && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenInfoIndex(
                              openInfoIndex === `${colIdx}-${i}` ? null : `${colIdx}-${i}`
                            );
                          }}
                          className="text-blue-600 hover:text-blue-800 dark:text-white text-base relative"
                        >
                          <FaInfoCircle size={20} />
                          {openInfoIndex === `${colIdx}-${i}` && (
                            <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg w-64 z-10">
                              {row.info}
                            </div>
                          )}
                        </button>
                      )}
                      <span className="text-black dark:text-white text-base font-medium">
                        {row.label}
                      </span>
                    </div>

                    <span
                      className={`font-bold text-base ${
                        stat === "✅" || stat === "✔️"
                          ? "text-green-500"
                          : stat === "⚠️"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {stat}
                    </span>
                  </div>

                  {/* thumbnails الصور */}
                  {row.gallery && row.gallery.length > 0 && (
                    <div className="mt-3">
                      <img
                        src={row.gallery[0].src}
                        alt={row.label}
                        className="w-32 h-24 object-cover rounded-lg shadow cursor-pointer hover:opacity-80"
                        onClick={() =>
                          setOpenGallery({ images: row.gallery, start: 0 }) 
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  })()
)}



{openGallery && (
  <ScreenGallery
    images={openGallery.images}
    startIndex={openGallery.start}
    onClose={() => setOpenGallery(null)}
  />
)}



<div className="p-2 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-base rounded">
  {/* النصوص */}
  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
    الملاحظات:
    <li>لم يتم التأكد من قراءة العداد الحالية لعدم توفر مصادر موثوقة لدى كارسيرفس وقت الفحص</li>
  </ul>
</div>

          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  ))}
</div>
</div>
  
  <div id="الأنظمة-الكهربائية-والإلكترونية">
  <div className="space-y-5 mt-6">
  {ElectricalSystems.itimis.map((item, idx) => (
    <Disclosure key={idx}>
      {({ open }) => (
        <>
<Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
            <span className="font-medium">{item.title}</span>
            <FaChevronDown
              className={`transform transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Disclosure.Button>

<Disclosure.Panel className="px-4 py-2 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">


            <div className="grid grid-cols-2 gap-6 items-stretch">
  {/* صورة السيارة */}
  <div className="shadow rounded-lg overflow-hidden">
    {ElectricalSystems.itimis[0].carImage.map((img, i) => (
      <img
        key={i}
        src={img}
        alt={`car ${i}`}
        className="w-full h-full object-cover object-center"
      />
    ))}
  </div>

  {/* نصوص الوصف */}
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
      {item.descriptionPoints2.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
</div>


            {/* أزرار الفلاتر */}
           <div className="flex flex-wrap gap-3 mt-6">
  {[
    { key: "allSystems", label: "جميع نقاط الفحص" },
    { key: "frontLights", label: "الضوء الأمامي اليمين" },
    { key: "rearLights", label: "الضوء الخلفي اليمين" },
    { key: "batterySystem", label: "بطارية التشغيل 12 فولت" },
    { key: "audioSystem", label: "الشاشة \\ الراديو الأصلي" },
    { key: "hornSystem", label: "إختبار الزامور" },
    { key: "wiperSystem", label: "المساحة الخلفية" },
    { key: "sunroofSystem", label: "إختبار عمل فتحة السقف" },
    { key: "seatSystem", label: "إختبار عمل الكراسي الكهربائية" },
  ].map((btn) => (
    <button
      key={btn.key}
      onClick={() => updateSystemFilter(btn.key)}
      className={`px-4 py-2 rounded transition-colors duration-200 ${
        currentSystemView === btn.key
          ? "bg-blue-500 text-white dark:bg-blue-600"
          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
      }`}
    >
      {btn.label}
    </button>
  ))}
</div>


            {/* محتوى الفلاتر */}
{["allSystems", "frontLights","rearLights","batterySystem","audioSystem","hornSystem","wiperSystem","sunroofSystem","seatSystem"].includes(currentSystemView) && (
  (() => {
    const src = ElectricalSystems.itimis[0]?.Power[currentSystemView] ?? [];
    const mid = Math.ceil(src.length / 2);
    const cols = [src.slice(0, mid), src.slice(mid)];

    return (
      <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-10">
        {cols.map((col, colIdx) => (
          <div key={colIdx} className="space-y-6">
            {col.map((row, i) => {
              const stat = row.stats ?? row.Stats ?? "";

              return (
                <div key={`${colIdx}-${i}`} className="pb-3">
                  {/* السطر الأساسي */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 relative">
                      {row.info && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenInfoIndex(
                              openInfoIndex === `${colIdx}-${i}` ? null : `${colIdx}-${i}`
                            );
                          }}
                          className="text-blue-600 hover:text-blue-800 dark:text-white text-base relative"
                        >
                          <FaInfoCircle size={20} />
                          {openInfoIndex === `${colIdx}-${i}` && (
                            <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg w-64 z-10">
                              {row.info}
                            </div>
                          )}
                        </button>
                      )}
                      <span className="text-black dark:text-white text-base font-medium">
                        {row.label}
                      </span>
                    </div>

                    <span
                      className={`font-bold text-base ${
                        stat === "✅" || stat === "✔️"
                          ? "text-green-500"
                          : stat === "⚠️"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {stat}
                    </span>
                  </div>

                  {/* thumbnails الصور */}
                 {row.gallery && row.gallery.length > 0 && (
  <div className="mt-3">
    <img
      src={row.gallery[0].src}

      alt={row.label}
      className="w-32 h-24 object-cover rounded-lg shadow cursor-pointer hover:opacity-80"
      onClick={() =>
        setOpenGallery({ images: row.gallery, start: 0 }) 
      }
    />
  </div>
)}

                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  })()
)}


{/* عرض FullScreenGallery لو متفتح */}
{openGallery && (
  <ScreenGallery
    images={openGallery.images}
    startIndex={openGallery.start}
    onClose={() => setOpenGallery(null)}
  />
)}



<div className="p-2 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-base rounded">
  {/* النصوص */}
<ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1 text-sm" >
    الملاحظات:
    <li>لم يتم التأكد من قراءة العداد الحالية لعدم توفر مصادر موثوقة لدى كارسيرفس وقت الفحص</li>
  </ul>
</div>

          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  ))}
</div>
</div>
<div id="نظام-التكيف">
  <div className="space-y-5 mt-6">
  {CoolingSystem.coolingItems.map((item, idx) => (
    <Disclosure key={idx} >
      {({ open }) => (
        <>
<Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
            <span className="font-medium">{item.title}</span>
            <FaChevronDown
              className={`transform transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Disclosure.Button>

<Disclosure.Panel className="px-4 py-2 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
           <div className="grid grid-cols-2 gap-6 items-stretch">
  {/* صورة السيارة */}
  <div className="shadow rounded-lg overflow-hidden">
    {CoolingSystem.coolingItems[0].carInformation1.images.map((img, i) => (
      <img
        key={i}
        src={img}
        alt={`car ${i}`}
        className="w-full h-full object-cover object-center"
      />
    ))}
  </div>

  {/* نصوص الوصف */}
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
      {item.descriptionPoints00.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
</div>

            {/* أزرار الفلاتر */}
            <div className="flex flex-wrap gap-3 mt-6 ">
             
             {[
  { key: "coolingSpecifics", label: "جميع نقاط الفحص" },
  { key: "heatingSystem", label: "نظام التدفئة" },
  { key: "acSystem", label: "نظام التكييف" },
  { key: "coolingFluid", label: "سائل التبريد" },
  { key: "coolingPipes", label: "أنابيب التبريد" },
  { key: "coolingFans", label: "مراوح التبريد" },
  { key: "coolingAccessories", label: "ملحقات التبريد" },
  { key: "coolingTools", label: "أدوات التبريد" },
  { key: "coolingInternal", label: "الحالة الداخلية" },
].map((btn) => (
  <button
    key={btn.key}
    onClick={() => setCoolingFilter(btn.key)}
    className={`px-4 py-2 rounded ${
      coolingFilter=== btn.key ? "bg-blue-300 text-black dark:text-white text-base font-medium" : "bg-gray-200"
    }`}
  >
    {btn.label}
  </button>
))}

            </div>

            {/* محتوى الفلاتر */}
{["coolingSpecifics", "heatingSystem","acSystem","coolingFluid","coolingPipes","coolingFans","coolingAccessories","coolingTools","coolingInternal"].includes(coolingFilter) && (
  (() => {
const src = CoolingSystem.coolingItems[0]?.CoolingData[coolingFilter] ?? [];
    const mid = Math.ceil(src.length / 2);
    const cols = [src.slice(0, mid), src.slice(mid)];

    return (
      <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-10">
        {cols.map((col, colIdx) => (
          <div key={colIdx} className="space-y-6">
            {col.map((row, i) => {
              const stat = row.stats ?? row.Stats ?? "";

              return (
                <div key={`${colIdx}-${i}`} className="pb-3">
                  {/* السطر الأساسي */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 relative">
                      {row.info && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenInfoIndex(
                              openInfoIndex === `${colIdx}-${i}` ? null : `${colIdx}-${i}`
                            );
                          }}
                          className="text-blue-600 hover:text-blue-800 dark:text-white text-base relative"
                        >
                          <FaInfoCircle size={20} />
                          {openInfoIndex === `${colIdx}-${i}` && (
                            <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg w-64 z-10">
                              {row.info}
                            </div>
                          )}
                        </button>
                      )}
                      <span className="text-black dark:text-white text-base font-medium">
                        {row.label}
                      </span>
                    </div>

                    <span
                      className={`font-bold text-base ${
                        stat === "✅" || stat === "✔️"
                          ? "text-green-500"
                          : stat === "⚠️"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {stat}
                    </span>
                  </div>

                  {/* thumbnails الصور */}
                  {row.gallery && row.gallery.length > 0 && (
                    <div className="mt-3">
                      <img
                        src={row.gallery[0].src}
                        alt={row.label}
                        className="w-32 h-24 object-cover rounded-lg shadow cursor-pointer hover:opacity-80"
                        onClick={() =>
                          setOpenGallery({ images: row.gallery, start: 0 }) 
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  })()
)}


{openGallery && (
  <ScreenGallery
    images={openGallery.images}
    startIndex={openGallery.start}
    onClose={() => setOpenGallery(null)}
  />
)}



<div className="p-2 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-base rounded">
  {/* النصوص */}
  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
    الملاحظات:
    <li>لم يتم التأكد من قراءة العداد الحالية لعدم توفر مصادر موثوقة لدى كارسيرفس وقت الفحص</li>
  </ul>
</div>

          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  ))}
</div>
</div>


  <div id="االمكابح-السلامه">
  <div className="space-y-5 mt-6">
  {seftiy.itimis7.map((item, idx) => (
    <Disclosure key={idx} >
      {({ open }) => (
        <>
<Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
            <span className="font-medium">{item.title}</span>
            <FaChevronDown
              className={`transform transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Disclosure.Button>

<Disclosure.Panel className="px-4 py-2 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="grid grid-cols-2 gap-6">
              {/* صورة السيارة */}
              <div className="flex flex-col items-center justify-center p-6 shadow rounded-lg">
                {seftiy.itimis7[0].carInformation1.images.map((img, i) => (
  <img key={i} src={img} alt={`car ${i}`} className="w-full h-auto object-contain" />
))}

              </div>

              {/* نصوص الوصف */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                  {item.descriptionPoints8.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* أزرار الفلاتر */}
            <div className="flex flex-wrap gap-3 mt-6 ">
             
             {[
  { key: "specifics7", label: "جميع نقاط الفحص" },
  { key: "continue7", label: "أنظمة السلامة" },
  { key: "outline7", label: "المكابح والديسكات" },
  { key: "onabort7", label: "براغي العجلات" },
  { key: "allpoint7", label: "أحزمة الأمان" },
  { key: "parent7", label: "عمر الإطارات" },
  { key: "review7", label: "مانع الانزلاق" },
  { key: "sheet7", label: "الأكياس الهوائية" },
  { key: "tablet7", label: "الحالة العامة" },
].map((btn) => (
  <button
    key={btn.key}
    onClick={() => setFilterr6(btn.key)}
    className={`px-4 py-2 rounded ${
      Filterr6 === btn.key ? "bg-blue-300 text-black dark:text-white text-base font-medium" : "bg-gray-200"
    }`}
  >
    {btn.label}
  </button>
))}

            </div>

            {/* محتوى الفلاتر */}
{["specifics7", "continue7","outline7","onabort7","allpoint7","parent7","review7","sheet7","tablet7"].includes(Filterr6) && (
  (() => {
    const src =seftiy.itimis7[0]?.Power[Filterr6] ?? [];
    const mid = Math.ceil(src.length / 2);
    const cols = [src.slice(0, mid), src.slice(mid)];

    return (
      <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-10">
        {cols.map((col, colIdx) => (
          <div key={colIdx} className="space-y-6">
            {col.map((row, i) => {
              const stat = row.stats ?? row.Stats ?? "";

              return (
                <div key={`${colIdx}-${i}`} className="pb-3">
                  {/* السطر الأساسي */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 relative">
                      {row.info && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenInfoIndex(
                              openInfoIndex === `${colIdx}-${i}` ? null : `${colIdx}-${i}`
                            );
                          }}
                          className="text-blue-600 hover:text-blue-800 dark:text-white text-base relative"
                        >
                          <FaInfoCircle size={20} />
                          {openInfoIndex === `${colIdx}-${i}` && (
                            <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg w-64 z-10">
                              {row.info}
                            </div>
                          )}
                        </button>
                      )}
                      <span className="text-black dark:text-white text-base font-medium">
                        {row.label}
                      </span>
                    </div>

                    <span
                      className={`font-bold text-base ${
                        stat === "✅" || stat === "✔️"
                          ? "text-green-500"
                          : stat === "⚠️"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {stat}
                    </span>
                  </div>

                  {/* thumbnails الصور */}
                  {row.gallery && row.gallery.length > 0 && (
                    <div className="mt-3">
                      <img
                        src={row.gallery[0].src}
                        alt={row.label}
                        className="w-32 h-24 object-cover rounded-lg shadow cursor-pointer hover:opacity-80"
                        onClick={() =>
                          setOpenGallery({ images: row.gallery, start: 0 }) 
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  })()
)}


{/* عرض FullScreenGallery لو متفتح */}
{openGallery && (
  <FullScreenGallery
    images={openGallery.images}
    startIndex={openGallery.start}
    onClose={() => setOpenGallery(null)}
  />
)}



<div className="p-2 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-base rounded">
  {/* النصوص */}
  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
    الملاحظات:
    <li>لم يتم التأكد من قراءة العداد الحالية لعدم توفر مصادر موثوقة لدى كارسيرفس وقت الفحص</li>
  </ul>
</div>

          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  ))}
</div>
</div>


    </div>
    
  );
}