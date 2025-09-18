import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown, FaInfoCircle, FaSpinner } from "react-icons/fa";

import ScreenGallery from "../ScreenGallery/ScreenGallery";
import hallbackImage from '../../assets/hhcar.png';

import axios from "axios";


const STATUS_ICONS = {
  excellent: "✅",
  very_good: "✅", 
  good: "⚠️",
  acceptable: "⚠️",
  poor: "❌",
  failed: "❌"
};


const processSuspensionData = (data) => {
  if (!data) return null;

 
  const reportData = data.data || data;
  const report = Array.isArray(reportData) ? reportData[0] : reportData;


  const suspensionPointNames = [
    "الصنوبرصات الامامية", "الصنوبرصات الخلفية", "مجموعة التوجيه", 
    "قواعد المحرك و الجير", "الدنجل الامامي", "الدنجل الخلفي",
    "الاكسات الأمامية / الخلفية", "الانحراف في الميزان الامامي", 
    "الانحراف في الميزان الخلفي", "بيل العجلات الامامية", 
    "بيل العجلات  الخلفية", "عمود الستيرنج"
  ];
  

  if (report.inspection_points && report.inspection_points.length > 0) {
   
    
  }
  

  let allPoints = [];
  
  if (report.services && report.services.length > 0) {
 
    const suspensionService = report.services.find(service => service.id === 4);
   
    
    if (suspensionService?.points) {
      allPoints = suspensionService.points;
      
    } else {
    
      const suspensionByName = report.services.find(service => 
        service.name_ar?.includes("نظام التعليق") || 
        service.name_en?.toLowerCase().includes("suspension")
      );
      if (suspensionByName?.points) {
        allPoints = suspensionByName.points;
        
      }
    }
  } else if (report.inspection_points && Array.isArray(report.inspection_points)) {
    // Method 2: Filter suspension points from inspection_points array (like Exsection.jsx)
 
    const suspensionPoints = report.inspection_points.filter(point => {
      const pointName = point.name_ar || point.point?.name_ar || "";
      
      // Exact match first
      const exactMatch = suspensionPointNames.includes(pointName);
      if (exactMatch) {

        return true;
      }
      
      // Keyword match for suspension-related points (from actual data)
      const suspensionKeywords = [
        "الصنوبرصات الامامية", "الصنوبرصات الخلفية", "مجموعة التوجيه", 
        "قواعد المحرك و الجير", "الدنجل الامامي", "الدنجل الخلفي",
        "الاكسات الأمامية / الخلفية", "الانحراف في الميزان الامامي", 
        "الانحراف في الميزان الخلفي", "بيل العجلات الامامية", 
        "بيل العجلات  الخلفية", "عمود الستيرنج"
      ];
      
      const keywordMatch = suspensionKeywords.some(keyword => 
        pointName === keyword
      );
      
      if (keywordMatch) {
      
        return true;
      }
      
      return false;
    });
    allPoints = suspensionPoints;
    
  } else if (report.points && Array.isArray(report.points)) {
    // Method 3: Use all points if no services structure
    allPoints = report.points;
   
  } else {
  
  }

  // Verify we have points from suspension service
  if (allPoints.length === 0) {
  
  }

  const processedPoints = allPoints.map((point) => {
    // Handle different data structures
    const pointData = point.point || point;
    const evaluation = pointData.evaluation || point.evaluation || {};
    
    // Process images - handle both array and JSON string formats
    let processedImages = [];
    const rawImages = evaluation.images || pointData.point_images || point.point_images || pointData.images || point.images || [];
    
    if (typeof rawImages === 'string') {
      try {
        // Try to parse JSON string
        processedImages = JSON.parse(rawImages);
   
      } catch (e) {
        // If not JSON, treat as single image path
        processedImages = [rawImages];
      
      }
    } else if (Array.isArray(rawImages)) {
      processedImages = rawImages;
   
    }

    return {
      id: pointData.id || point.id,
      name_ar: pointData.name_ar || point.name_ar || "نقطة غير محددة",
      name_en: pointData.name_en || point.name_en || "",
      explanation_ar: pointData.explanation_ar || point.explanation_ar || "",
      explanation_en: pointData.explanation_en || point.explanation_en || "",
      score_achieved: parseFloat(evaluation.score_achieved || pointData.score_achieved || point.score_achieved || 0),
      max_score: parseFloat(evaluation.max_score || pointData.max_score || point.max_score || 0),
      point_condition: evaluation.point_condition || pointData.point_condition || point.point_condition || "",
      point_passed: evaluation.passed ?? pointData.point_passed ?? point.point_passed ?? false,
      point_notes: evaluation.notes || pointData.point_notes || point.point_notes || "",
      point_images: processedImages,
      inspected_at: evaluation.inspected_at || pointData.inspected_at || point.inspected_at || "",
      requires_immediate_attention: evaluation.requires_immediate_attention || pointData.requires_immediate_attention || point.requires_immediate_attention || null,
    };
  });

  return {
    ...report,
    serviceInfo: {
      name_ar: "نظام التعليق",
      name_en: "Suspension System",
      description_ar: "أهمية نظام التوجيه و التعليق في ثبات السيارة و الحفاظ على افضل توازن و اقل مسافة توقف، يقوم أوتوسكور بعمل الفحوصات الضرورية و الأساسية باستخدام أجهزة بوش BOSCH الألمانية المتخصصة",
      description_en: "Steering and Suspension systems are essential for every car, therefore AutoScore performs the most important checks and inspections to assure the stability of the car and shortest braking distance using BOSCH inspection station.",
      brief_ar: "أهمية نظام التوجيه و التعليق في ثبات السيارة و الحفاظ على افضل توازن و اقل مسافة توقف",
      brief_en: "Steering and Suspension systems are essential for every car"
    },
    suspensionPoints: processedPoints,
    totalPoints: processedPoints.length,
    passedPoints: processedPoints.filter((p) => p.point_passed).length,
    failedPoints: processedPoints.filter((p) => !p.point_passed).length,
  };
};

const mapSuspensionPoints = (points) => {
  if (!Array.isArray(points) || points.length === 0) return [];
  
  
  return points.map((p) => {
    try {
      // Optimized status icon logic
      const getStatusIcon = (condition, passed, scoreAchieved, maxScore) => {
        const isPassed = ["true", true, 1, "1"].includes(passed);
        if (isPassed) return "✅";
        
        const cond = (condition || "").toLowerCase();
        if (STATUS_ICONS[cond]) return STATUS_ICONS[cond];
        
        const score = parseFloat(scoreAchieved) || 0;
        const max = parseFloat(maxScore) || 1;
        if (max === 0) return "❌";
        
        const percentage = (score / max) * 100;
        if (percentage >= 80) return "✅";
        if (percentage >= 50) return "⚠️";
        return "❌";
      };

      let gallery = [];
      if (p.point_images && Array.isArray(p.point_images) && p.point_images.length > 0) {
        gallery = p.point_images.map((img) => {
          let imageSrc = typeof img === 'string' ? img : img.src || img.url || '';
          
          if (imageSrc && !imageSrc.startsWith('http')) {
            imageSrc = `https://cd-root.com/syarahplus/backend/storage/app/public/${imageSrc}`;
          }
          
          return {
            src: imageSrc,
            title: p.name_ar || "صورة الفحص",
            subtitle: p.explanation_ar || "",
          };
        }).filter(img => img.src); // Filter out empty images
      } else {
      }

      return {
        label: p.name_ar || p.name_en || "نقطة غير محددة",
        Stats: getStatusIcon(p.point_condition, p.point_passed, p.score_achieved, p.max_score),
        info: p.explanation_ar || p.explanation_en || "",
        gallery: gallery,
        point_condition: p.point_condition,
        point_passed: ["true", true, 1, "1"].includes(p.point_passed),
        score_achieved: parseFloat(p.score_achieved) || 0,
        max_score: parseFloat(p.max_score) || 0,
        point_notes: p.point_notes || "",
        inspected_at: p.inspected_at || "",
        requires_immediate_attention: p.requires_immediate_attention || null,
        id: p.id,
      };
    } catch (err) {
      console.warn("Error processing suspension point:", err, p);
      return {
        label: p.name_ar || p.name_en || "نقطة غير محددة",
        Stats: "❌",
        info: "",
        gallery: [],
        point_condition: "failed",
        point_passed: false,
        score_achieved: 0,
        max_score: 0,
        point_notes: "",
      };
    }
  });
};


const distributeSuspensionPoints = (points) => {
  if (!Array.isArray(points) || points.length === 0) {
    return {
      chassisMeasurements: [],
      externalBodyCondition: [],
      glassCondition: [],
      sideMirrors: [],
      gapsInspection: [],
      spareTire: [],
      jackAndTools: [],
      tireWrench: [],
      interiorCondition: []
    };
  }

  const distributed = {
    chassisMeasurements: [...points],
    externalBodyCondition: [],
    glassCondition: [],
    sideMirrors: [],
    gapsInspection: [],
    spareTire: [],
    jackAndTools: [],
    tireWrench: [],
    interiorCondition: []
  };


  points.forEach((point) => {
    const nameAr = point.name_ar?.toLowerCase() || "";
    
 
    if (nameAr === "الصنوبرصات الامامية" || nameAr === "الصنوبرصات الخلفية") {
      distributed.externalBodyCondition.push(point);
    }
   
    if (nameAr === "مجموعة التوجيه") {
      distributed.glassCondition.push(point);
    }
    
 
    if (nameAr === "قواعد المحرك و الجير") {
      distributed.sideMirrors.push(point);
    }
  
    if (nameAr === "الدنجل الامامي" || nameAr === "الدنجل الخلفي") {
      distributed.gapsInspection.push(point);
    }
    
    if (nameAr === "الاكسات الأمامية / الخلفية") {
      distributed.spareTire.push(point);
    }
    if (nameAr === "الانحراف في الميزان الامامي" || nameAr === "الانحراف في الميزان الخلفي") {
      distributed.jackAndTools.push(point);
    }
    if (nameAr === "بيل العجلات الامامية" || nameAr === "بيل العجلات  الخلفية") {
      distributed.tireWrench.push(point);
    }
    if (nameAr === "عمود الستيرنج") {
      distributed.interiorCondition.push(point);
    }
  });
  return distributed;
};


const PortiesComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationData = location.state;

 
  const [openInfoIndex, setOpenInfoIndex] = useState(null);
  const [openGallery, setOpenGallery] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("chassisMeasurements");
  const [suspensionData, setSuspensionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedToken = localStorage.getItem("token");

 
  const fetchData = useCallback(async () => {
    if (!storedToken) {
      window.location.href = "/login";
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
     
      const cacheKey = `suspension_${navigationData?.reportNum || 'default'}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const processedData = processSuspensionData(parsedData);
        processSuspensionInspectionData(processedData);
        setIsLoading(false);
        return;
      }

      // Try to fetch from inspection reports API
      if (!navigationData?.report && !navigationData?.searchResults) {
        try {
          const reportNumber = navigationData?.reportNum || "USR-3-VEH-2-1757316992";
          
          const response = await axios.get(
            `https://cd-root.com/syarahplus/backend/api/users/inspection/reports/${reportNumber}`,
            { 
              headers: { Authorization: `Bearer ${storedToken}` },
              timeout: 10000 // 10 second timeout
            }
          );
          
          if (response.data?.success && response.data?.data) {
            // Cache the response
            sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
            
            const processedData = processSuspensionData(response.data);
            processSuspensionInspectionData(processedData);
            setIsLoading(false);
            return;
          }
        } catch (apiError) {
          // Try fallback data if API fails
        }
      }

      // Check if we have navigation data
      if (navigationData?.report || navigationData?.searchResults) {
        const navData = navigationData.searchResults || navigationData.report;

        if (Array.isArray(navData) && navData.length > 0) {
          let targetReport = navData[0];
          
          if (navigationData.reportNum) {
            const foundReport = navData.find(report => 
              report.report_number === navigationData.reportNum
            );
            if (foundReport) {
              targetReport = foundReport;
            }
          }
          
          const processedData = processSuspensionData(targetReport);
          processSuspensionInspectionData(processedData);
        } else if (navData?.data) {
          const processedData = processSuspensionData(navData);
          processSuspensionInspectionData(processedData);
        } else {
          const processedData = processSuspensionData(navData);
          processSuspensionInspectionData(processedData);
        }
        
        setIsLoading(false);
        return;
      }

     
      const defaultData = {
        serviceInfo: {
          name_ar: "نظام التعليق",
          description_ar: "أهمية نظام التوجيه و التعليق في ثبات السيارة و الحفاظ على افضل توازن و اقل مسافة توقف، يقوم أوتوسكور بعمل الفحوصات الضرورية و الأساسية باستخدام أجهزة بوش BOSCH الألمانية المتخصصة"
        },
        suspensionPoints: []
      };
      processSuspensionInspectionData(defaultData);
      setError("يرجى استخدام صفحة البحث للوصول إلى التقارير");
    } catch (err) {
      console.error("خطأ في جلب البيانات:", err);
      setError("حدث خطأ في جلب البيانات");
    } finally {
      setIsLoading(false);
    }
  }, [navigationData, storedToken]);

  /**
   * Process suspension data from processed inspection data with memory optimization
   */
  const processSuspensionInspectionData = useCallback((processedData) => {
    if (!processedData) {
      setError("لا توجد بيانات متاحة");
      return;
    }
    

    const allPoints = processedData.suspensionPoints || [];
    
    const serviceDescription = processedData.serviceInfo?.description_ar || 
      "في كارسيرفيس نقوم بتقييم و فحص الشاصي و الهيكل الداخلي للسيارة اعتمادا على القياسات و الأبعاد الأصلية و التأكد من عدم وجود نقاط لحام على المفاصل الرئيسية أو وجود أي انحراف او تأثير على أداء السيارة حسب نظام CCM العالمي.";
    
    const distributedPoints = distributeSuspensionPoints(allPoints);
    
    const mappedControl = {
      chassisMeasurements: mapSuspensionPoints(distributedPoints.chassisMeasurements),
      externalBodyCondition: mapSuspensionPoints(distributedPoints.externalBodyCondition),
      glassCondition: mapSuspensionPoints(distributedPoints.glassCondition),
      sideMirrors: mapSuspensionPoints(distributedPoints.sideMirrors),
      gapsInspection: mapSuspensionPoints(distributedPoints.gapsInspection),
      spareTire: mapSuspensionPoints(distributedPoints.spareTire),
      jackAndTools: mapSuspensionPoints(distributedPoints.jackAndTools),
      tireWrench: mapSuspensionPoints(distributedPoints.tireWrench),
      interiorCondition: mapSuspensionPoints(distributedPoints.interiorCondition),
      carImage: hallbackImage,
    };

    // Log final mapped control results
    

    // Create optimized structure with API data
    const SuspensionData = {
      steeringSystemItems: [
        {
          title: processedData.serviceInfo?.name_ar || "نظام التعليق",
          type: "details",
          carInformation1: { images: [hallbackImage] },
          descriptionPoints4: [
            serviceDescription,
            "يتم اجراء الفحص عن طريق :",
            "نظام قياس الانحرافات بالليزر",
            "الفحص النظري المختص",
            "يغطي هذا القسم النقاط التالية :",
            "الصنوبرصات الأمامية",
            "الصنوبرصات الخلفية",
            "مجموعة الستيرنج و اجزاءها",
            "الأكسات الأمامية و الخلفية",
            "بيل العجلات",
            "قواعد المحرك و الجير",
            "ملاحظة هامة : يتم الفحص دون أي ذكر أو مقارنة مع مصطلحات الفحص التقليدية ( مثل جيد ، مضروب ، ضربة بنكيت ، قصعة ، دقة.. الخ )"
          ],
          inspectionData: mappedControl,
        },
      ],
    };

   
    setSuspensionData(SuspensionData);
  }, []);

  // Process data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Optimized click outside handler
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenInfoIndex(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Memoized render function for individual points with better performance
  const renderPoint = useCallback((row, colIdx, i) => {
    const stat = row.Stats || "";
    const galleryImages = row.gallery || [];
    const hasInfo = Boolean(row.info);
    const hasNotes = Boolean(row.point_notes);
    const hasScore = row.score_achieved !== undefined && row.max_score !== undefined;
    const hasImages = galleryImages.length > 0;
    
    // Debug image rendering
    if (hasImages) {
    } else {
    }
    
    return (
      <div key={`${colIdx}-${i}`} className="pb-3">
        {/* Main row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 lg:gap-3 relative">
            {hasInfo && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenInfoIndex(
                    openInfoIndex === `${colIdx}-${i}`
                      ? null
                      : `${colIdx}-${i}`
                  );
                }}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm lg:text-base relative transition-colors"
                aria-label="معلومات إضافية"
              >
                <FaInfoCircle size={16} className="lg:hidden" />
                <FaInfoCircle size={20} className="hidden lg:block" />
                {openInfoIndex === `${colIdx}-${i}` && (
                  <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs rounded-lg px-2 lg:px-3 py-1 lg:py-2 shadow-lg w-48 lg:w-64 z-10">
                    {row.info}
                  </div>
                )}
              </button>
            )}
            <span className="text-black dark:text-white text-sm lg:text-base font-medium">
              {row.label}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span
              className={`font-bold text-sm lg:text-base ${
                stat === "✅" || stat === "✔️"
                  ? "text-green-500"
                  : stat === "⚠️"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {stat}
            </span>
            {hasScore && (
              <span className="text-xs text-gray-500">
                {row.score_achieved}/{row.max_score}
              </span>
            )}
          </div>
        </div>

        {/* Show point notes if available */}
        {hasNotes && (
          <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs lg:text-sm text-gray-700 dark:text-gray-300">
            <strong>ملاحظات:</strong> {row.point_notes}
          </div>
        )}

        {/* Show inspection date if available */}
        {row.inspected_at && (
          <div className="mt-1 text-xs text-gray-500">
            <strong>تاريخ الفحص:</strong> {new Date(row.inspected_at).toLocaleDateString('ar-SA')}
          </div>
        )}

        {/* Show immediate attention warning if needed */}
        {row.requires_immediate_attention && (
          <div className="mt-1 text-xs text-red-600 font-semibold">
            ⚠️ يتطلب انتباه فوري
          </div>
        )}

        {/* Thumbnail images */}
        {hasImages && (
          <div className="mt-3">
            <img
              src={galleryImages[0].src}
              alt={row.label}
              className="w-24 h-18 lg:w-32 lg:h-24 object-cover rounded-lg shadow cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                setOpenGallery({ images: galleryImages, start: 0 });
              }}
              onError={(e) => {
                e.target.src = hallbackImage;
              }}
              onLoad={() => {
              }}
              loading="lazy"
            />
          </div>
        )}
      </div>
    );
  }, [openInfoIndex]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل بيانات نظام التعليق...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaInfoCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/report-search")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            العودة لصفحة البحث
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!suspensionData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaInfoCircle className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">لا توجد بيانات متاحة</p>
        </div>
      </div>
    );
  }

  return (
    <div id="steering-system">
      <div className="space-y-5 mt-6">
        {suspensionData.steeringSystemItems.map((item, idx) => (
          <Disclosure key={idx} >
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <span className="font-medium">{item.title}</span>
                  <FaChevronDown
                    className={`transform transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-3 py-2 lg:px-4 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {/* صورة السيارة */}
                    <div className="flex flex-col items-center justify-center p-4 lg:p-6 shadow rounded-lg">
                      {item.carInformation1.images.map((img, i) => (
                        <img key={i} src={img} alt={`car ${i}`} className="w-full h-full object-contain rounded-lg" />
                      ))}
                    </div>

                    {/* نصوص الوصف */}
                    <div className="p-3 lg:p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-xs sm:text-sm leading-relaxed">
                        {item.descriptionPoints4.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* أزرار الفلاتر */}
                  <div className="flex flex-wrap gap-2 lg:gap-3 mt-4 lg:mt-6">
                    {[
                      { key: "chassisMeasurements", label: "جميع نقاط الفحص" },
                      { key: "externalBodyCondition", label: "الصنوبرصات الأمامية والخلفية" },
                      { key: "glassCondition", label: "مجموعة التوجيه" },
                      { key: "sideMirrors", label: "قواعد المحرك والجير" },
                      { key: "gapsInspection", label: "الدنجل الأمامي والخلفي" },
                      { key: "spareTire", label: "الأكسات الأمامية والخلفية" },
                      { key: "jackAndTools", label: "الانحراف في الميزان" },
                      { key: "tireWrench", label: "بيل العجلات الأمامية والخلفية" },
                      { key: "interiorCondition", label: "عمود الستيرنج" },
                    ].map((btn) => (
                      <button
                        key={btn.key}
                        onClick={() => setCurrentFilter(btn.key)}
                        className={`px-2 py-1 lg:px-4 lg:py-2 rounded transition-colors duration-200 text-xs lg:text-sm ${
                          currentFilter === btn.key
                            ? "bg-blue-500 text-white dark:bg-blue-600"
                            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  {/* محتوى الفلاتر */}
                  {["chassisMeasurements", "externalBodyCondition","glassCondition","sideMirrors","gapsInspection","spareTire","jackAndTools","tireWrench","interiorCondition"].includes(currentFilter) && (
                    (() => {
                      const src = suspensionData.steeringSystemItems[0]?.inspectionData[currentFilter] ?? [];
                      const mid = Math.ceil(src.length / 2);
                      const cols = [src.slice(0, mid), src.slice(mid)];

                      return (
                        <div className="mt-6 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-6 lg:gap-y-10">
                          {cols.map((col, colIdx) => (
                            <div key={colIdx} className="space-y-4 lg:space-y-6">
                              {col.map((row, i) => renderPoint(row, colIdx, i))}
                            </div>
                          ))}
                        </div>
                      );
                    })()
                  )}

                  {/* عرض FullScreenGallery إذا كان مفتوح */}
                  {openGallery && (
                    <ScreenGallery
                      images={openGallery.images}
                      startIndex={openGallery.start}
                      onClose={() => setOpenGallery(null)}
                    />
                  )}

                  <div className="p-2 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-sm lg:text-base rounded">
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1 text-xs lg:text-sm">
                      الملاحظات:
                      <li>لم يتم التأكد من قراءة العداد الحالية لعدم توفر مصادر موثوقة لدى كارسيرفس وقت الفحص</li>
                      <li>يتم عرض النتائج بناءً على البيانات المتاحة من API مع معالجة الأخطاء المحسنة</li>
                    </ul>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default PortiesComponent;