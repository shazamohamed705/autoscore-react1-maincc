import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown, FaInfoCircle, FaSpinner } from "react-icons/fa";
import ScreenGallery from "../ScreenGallery/ScreenGallery";
import hallbackImage from "../../assets/immage3.png";
import axios from "axios";

// Optimized constants for better performance
const STATUS_ICONS = {
  excellent: "✅",
  very_good: "✅", 
  good: "⚠️",
  acceptable: "⚠️",
  poor: "❌",
  failed: "❌"
};

/**
 * Process exterior data specifically for exterior inspection points
 * Optimized for better performance and reduced data consumption
 */
const processExteriorData = (data) => {
  if (!data) return null;

  // Handle API response structure
  const reportData = data.data || data;
  const report = Array.isArray(reportData) ? reportData[0] : reportData;

  // Define the 23 exterior points names for filtering (removed duplicate)
  const exteriorPointNames = [
    "صدام امامي", "الصدام الخلفي", "جناح امامي يمين", "جناح خلفي يمين", 
    " جناح خلفي يسار", "جناح امامي يسار", "باب امامي يمين", "باب خلفي يمين", 
    "باب خلفي يسار", "باب امامي يسار", "غطاء المحرك", "السقف", 
    "باب الصندوق الخلفي", "الحالة الداخلية", "الزجاج الامامي", "الزجاج الخلفي", 
    "المرآة اليمين ", "المرآة اليسار", "شبر الزجاج", "شبر الأبواب", 
    "الأطار الأحتياطي", "مفتاح الربط", "جاك الاطارات وأدوات"
  ];

  // Find exterior service (ID 1) with better error handling
  const exteriorService = report.services?.find(service => service.id === 1);
  
 
  // Try multiple ways to get exterior points
  let allPoints = [];
  
  if (exteriorService?.points) {
    // Method 1: From exterior service (ID 1)
    allPoints = exteriorService.points;
  } else if (report.services && report.services.length > 0) {
    // Method 2: Look for exterior service by name
    const exteriorByName = report.services.find(service => 
      service.name_ar?.includes("الهيكل الخارجي") || 
      service.name_en?.toLowerCase().includes("exterior")
    );
    if (exteriorByName?.points) {
      allPoints = exteriorByName.points;
    }
  } else if (report.inspection_points && Array.isArray(report.inspection_points)) {
    // Method 3: Filter exterior points from inspection_points
  
    const exteriorPoints = report.inspection_points.filter(point => {
      const pointName = point.name_ar || point.point?.name_ar || "";
      const isExteriorPoint = exteriorPointNames.includes(pointName);
      if (isExteriorPoint) {
      }
      return isExteriorPoint;
    });
    allPoints = exteriorPoints;
    
  } else if (report.points && Array.isArray(report.points)) {
    // Method 4: Use all points if no services structure
    allPoints = report.points;
  } else {
  }

  
  // Verify we have points from exterior service
  if (allPoints.length === 0) {
   
  } else if (allPoints.length === 23) {
    
  } else {
   
  }

  const processedPoints = allPoints.map((point) => {
    const evaluation = point.evaluation || {};
    
    // Process images - handle both array and JSON string formats
    let processedImages = [];
    const rawImages = evaluation.images || point.point_images || point.images || [];
    
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
      id: point.id,
      name_ar: point.name_ar || point.point?.name_ar || "نقطة غير محددة",
      name_en: point.name_en || point.point?.name_en || "",
      explanation_ar: point.explanation_ar || point.point?.explanation_ar || "",
      explanation_en: point.explanation_en || point.point?.explanation_en || "",
      score_achieved: parseFloat(evaluation.score_achieved || point.score_achieved || 0),
      max_score: parseFloat(evaluation.max_score || point.max_score || 0),
      point_condition: evaluation.point_condition || point.point_condition || "",
      point_passed: evaluation.passed ?? point.point_passed ?? false,
      point_notes: evaluation.notes || point.point_notes || "",
      point_images: processedImages,
      inspected_at: evaluation.inspected_at || "",
      requires_immediate_attention: evaluation.requires_immediate_attention || null,
    };
  });

  return {
    ...report,
    serviceInfo: exteriorService ? {
      name_ar: exteriorService.name_ar,
      name_en: exteriorService.name_en,
      description_ar: exteriorService.description_ar,
      description_en: exteriorService.description_en,
      brief_ar: exteriorService.brief_ar,
      brief_en: exteriorService.brief_en
    } : null,
    exteriorPoints: processedPoints,
    totalPoints: processedPoints.length,
    passedPoints: processedPoints.filter((p) => p.point_passed).length,
    failedPoints: processedPoints.filter((p) => !p.point_passed).length,
  };
};

/**
 * Optimized point mapping function for exterior data
 * Maps points to display format with better performance and memory efficiency
 */
const mapExteriorPoints = (points) => {
  if (!Array.isArray(points) || points.length === 0) return [];
  
  
  return points.map((p) => {
    try {
      // Optimized status icon logic
      const getStatusIcon = (condition, passed, scoreAchieved, maxScore) => {
        const isPassed = ["true", true, 1, "1"].includes(passed);
        if (isPassed) return "✅";
        
        const cond = (condition || "").toLowerCase();
        if (STATUS_ICONS[cond]) return STATUS_ICONS[cond];
        
        // Fallback to score-based logic
        const score = parseFloat(scoreAchieved) || 0;
        const max = parseFloat(maxScore) || 1;
        if (max === 0) return "❌";
        
        const percentage = (score / max) * 100;
        if (percentage >= 80) return "✅";
        if (percentage >= 50) return "⚠️";
        return "❌";
      };

      // Optimized image processing with better error handling
      let gallery = [];
      if (p.point_images && Array.isArray(p.point_images) && p.point_images.length > 0) {
        gallery = p.point_images.map((img) => {
          let imageSrc = typeof img === 'string' ? img : img.src || img.url || '';
          
          // Add base URL if image path is relative
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


const distributeExteriorPoints = (points) => {
  if (!Array.isArray(points) || points.length === 0) {
    return {
      specifics: [],
      continue: [],
      outline: [],
      onabort: [],
      allpoint: [],
      parent: [],
      review: [],
      sheet: [],
      tablet: []
    };
  }

  const distributed = {
    specifics: [...points], // All points go to specifics - this is the main filter
    continue: [],
    outline: [],
    onabort: [],
    allpoint: [],
    parent: [],
    review: [],
    sheet: [],
    tablet: []
  };

  
  
  // Verify we have exactly 23 points
  if (points.length !== 23) {
   
  } else {
   
  }

  // Optimized distribution using single loop
  points.forEach((point) => {
    const nameAr = point.name_ar?.toLowerCase() || "";
    
    // Categorize based on exact Arabic names for other filters
    // أجزاء الهيكل الخارجي والجسم
    if (nameAr === "صدام امامي" || nameAr === "الصدام الخلفي" || 
        nameAr === "جناح امامي يمين" || nameAr === "جناح خلفي يمين" || 
        nameAr === " جناح خلفي يسار" || nameAr === "جناح امامي يسار" ||
        nameAr === "باب امامي يمين" || nameAr === "باب خلفي يمين" || 
        nameAr === "باب خلفي يسار" || nameAr === "باب امامي يسار" ||
        nameAr === "غطاء المحرك" || nameAr === "السقف" || 
        nameAr === "باب الصندوق الخلفي") {
      distributed.continue.push(point);
    }
    
    // الزجاج الأمامي والخلفي
    if (nameAr === "الزجاج الامامي" || nameAr === "الزجاج الخلفي") {
      distributed.outline.push(point);
    }
    
    // المرايا الجانبية اليمين واليسار
    if (nameAr === "المرآة اليمين " || nameAr === "المرآة اليسار") {
      distributed.onabort.push(point);
    }
    
    // الشبر والمطاط
    if (nameAr === "شبر الزجاج" || nameAr === "شبر الأبواب") {
      distributed.allpoint.push(point);
    }
    
    // الإطار الاحتياطي
    if (nameAr === "الأطار الأحتياطي") {
      distributed.parent.push(point);
    }
    
    // الجك وعدة الإطارات
    if (nameAr === "جاك الاطارات وأدوات") {
      distributed.review.push(point);
    }
    
    // مفتاح ربط الإطارات
    if (nameAr === "مفتاح الربط") {
      distributed.sheet.push(point);
    }
    
    // الحالة الداخلية للمقصورة
    if (nameAr === "الحالة الداخلية") {
      distributed.tablet.push(point);
    }
  });

  

  return distributed;
};

function Exoskeleton() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationData = location.state;

  // Optimized state management
  const [Filter, setFilter] = useState("specifics");
  const [openInfoIndex, setOpenInfoIndex] = useState(null);
  const [openGallery, setOpenGallery] = useState(null);
  const [exoskeletonData, setExoskeletonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedToken = localStorage.getItem("token");

  /**
   * Optimized fetch and process data from API with caching
   */
  const fetchData = useCallback(async () => {
    if (!storedToken) {
      window.location.href = "/login";
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check cache first to reduce API calls
      const cacheKey = `exterior_${navigationData?.reportNum || 'default'}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const processedData = processExteriorData(parsedData);
        processExteriorInspectionData(processedData);
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
            
            const processedData = processExteriorData(response.data);
            processExteriorInspectionData(processedData);
            setIsLoading(false);
            return;
          }
        } catch (apiError) {
          console.error("API Error:", apiError);
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
          
          const processedData = processExteriorData(targetReport);
          processExteriorInspectionData(processedData);
        } else if (navData?.data) {
          const processedData = processExteriorData(navData);
          processExteriorInspectionData(processedData);
        } else {
          const processedData = processExteriorData(navData);
          processExteriorInspectionData(processedData);
        }
        
        setIsLoading(false);
        return;
      }

      setError("يرجى استخدام صفحة البحث للوصول إلى التقارير");
    } catch (err) {
      setError("حدث خطأ في جلب البيانات");
    } finally {
      setIsLoading(false);
    }
  }, [navigationData, storedToken]);

  /**
   * Process exterior data from processed inspection data with memory optimization
   */
  const processExteriorInspectionData = useCallback((processedData) => {
    if (!processedData) {
      setError("لا توجد بيانات متاحة");
      return;
    }
    

    const allPoints = processedData.exteriorPoints || [];
    
    // Use service description from API if available, otherwise use default
    const serviceDescription = processedData.serviceInfo?.description_ar || 
      "يقدّم أوتوسكور تقييم وفحص شامل ودقيق لهيكل السيارة الخارجي للتأكد من سلامته ومطابقته لمعايير كار سيرفيس";
    
    // Distribute points across different filters
    const distributedPoints = distributeExteriorPoints(allPoints);
    
    // Create mapped control without useMemo (since it's inside callback)
    const mappedControl = {
      specifics: mapExteriorPoints(distributedPoints.specifics),
      continue: mapExteriorPoints(distributedPoints.continue),
      outline: mapExteriorPoints(distributedPoints.outline),
      onabort: mapExteriorPoints(distributedPoints.onabort),
      allpoint: mapExteriorPoints(distributedPoints.allpoint),
      parent: mapExteriorPoints(distributedPoints.parent),
      review: mapExteriorPoints(distributedPoints.review),
      sheet: mapExteriorPoints(distributedPoints.sheet),
      tablet: mapExteriorPoints(distributedPoints.tablet),
      carImage: hallbackImage,
    };

    

    // Create optimized structure with API data
    const ExteriorData = {
      itemis: [
        {
          title: processedData.serviceInfo?.name_ar || "الهيكل الخارجي",
      type: "details",
      carInformation: { image: hallbackImage },
      descriptionPoints1: [
            serviceDescription,
            "يتم إجراء الفحص باستخدام عدة طرق، مثل:",
            "الفحص النظري المتخصص",
            "قياس سماكة الدهان والمعجون باستخدام الأجهزة الخاصة",
            "الذكاء الصناعي",
            "سجلات تاريخ السيارة والإصلاحات السابقة"
          ],
          control: mappedControl,
        },
      ],
    };

    
    setExoskeletonData(ExteriorData);
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
          <div className="flex items-center gap-3 relative">
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
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-base relative transition-colors"
                aria-label="معلومات إضافية"
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

          <div className="flex flex-col items-end">
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
            {hasScore && (
              <span className="text-xs text-gray-500">
                {row.score_achieved}/{row.max_score}
              </span>
            )}
          </div>
        </div>

        {/* Show point notes if available */}
        {hasNotes && (
          <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300">
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
              className="w-32 h-24 object-cover rounded-lg shadow cursor-pointer hover:opacity-80 transition-opacity"
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
          <p className="text-gray-600">جاري تحميل بيانات الهيكل الخارجي...</p>
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
  if (!exoskeletonData) {
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
    <div id="الهيكل-الخارجي">
      <div className="space-y-5 mt-6">
        {exoskeletonData.itemis.map((item, idx) => (
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
                  <div className="grid grid-cols-2 gap-6">
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
                      { key: "specifics", label: "جميع نقاط الفحص الخارجي" },
                      { key: "continue", label: "أجزاء الهيكل الخارجي والجسم" },
                      { key: "outline", label: "الزجاج الأمامي والخلفي" },
                      { key: "onabort", label: "المرايا الجانبية اليمين واليسار" },
                      { key: "allpoint", label: "الشبر والمطاط" },
                      { key: "parent", label: "الإطار الاحتياطي" },
                      { key: "review", label: "الجك وعدة الإطارات" },
                      { key: "sheet", label: "مفتاح ربط الإطارات" },
                      { key: "tablet", label: "الحالة الداخلية للمقصورة" },
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

                  {/* Filter content */}
                  {["specifics", "continue", "outline", "onabort", "allpoint", "parent", "review", "sheet", "tablet"].includes(Filter) && (
                    (() => {
                      const src = exoskeletonData.itemis[0]?.control[Filter] ?? [];
                      const mid = Math.ceil(src.length / 2);
                      const cols = [src.slice(0, mid), src.slice(mid)];

                      return (
                        <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-10">
                          {cols.map((col, colIdx) => (
                            <div key={colIdx} className="space-y-6">
                              {col.map((row, i) => renderPoint(row, colIdx, i))}
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
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1 text-sm">
                      الملاحظات:
                      <li>
                        لم يتم التأكد من قراءة العداد الحالية لعدم توفر مصادر موثوقة لدى أوتوسكور وقت الفحص
                      </li>
                      <li>
                        يتم عرض النتائج بناءً على البيانات المتاحة من API مع معالجة الأخطاء المحسنة
                      </li>
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
}

export default Exoskeleton;