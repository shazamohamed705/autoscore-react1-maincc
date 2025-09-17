import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { 
  FaChevronDown, 
  FaInfoCircle, 
  FaSpinner
} from "react-icons/fa";
import axios from "axios";

// Import images
import hallbackImage from '../../assets/jjcar.png';


// Import components
import ScreenGallery from "../ScreenGallery/ScreenGallery";

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
 * Process air conditioning data specifically for AC inspection points
 * Optimized for better performance and reduced data consumption
 */
const processAirConditioningData = (data) => {
  if (!data) return null;

  // Handle API response structure
  const reportData = data.data || data;
  const report = Array.isArray(reportData) ? reportData[0] : reportData;


  // Define the AC points names for filtering
  const acPointNames = [
    "فحص تهريب سائل تبريد المحرك",
    "التبريد", 
    "التدفئة",
    "التحويلات",
    "فحص تهريب غاز نظام التكييف",
    "فحص نظام تبريد المحرك",
    "فحص مراوح تبريد المحرك"
  ];

  // Find air conditioning service (ID 6) with better error handling
  const acService = report.services?.find(service => service.id === 6);
  

  // Try multiple ways to get AC points
  let allPoints = [];
  
  if (acService?.points) {
    // Method 1: From AC service (ID 6)
    allPoints = acService.points;

  } else if (report.services && report.services.length > 0) {
    // Method 2: Look for AC service by name
    const acByName = report.services.find(service => 
      service.name_ar?.includes("التكييف") || 
      service.name_en?.toLowerCase().includes("cooling") ||
      service.name_en?.toLowerCase().includes("conditioning")
    );
    if (acByName?.points) {
      allPoints = acByName.points;
    }
  } else if (report.inspection_points && Array.isArray(report.inspection_points)) {
    // Method 3: Filter AC points from inspection_points
  
    const acPoints = report.inspection_points.filter(point => {
      const pointName = point.name_ar || point.point?.name_ar || "";
      const isACPoint = acPointNames.includes(pointName);
      if (isACPoint) {
      }
      return isACPoint;
    });
    allPoints = acPoints;
  } else if (report.points && Array.isArray(report.points)) {
    // Method 4: Use all points if no services structure
    allPoints = report.points;
  } else {
  }

  // Verify we have points from AC service
  if (allPoints.length === 0) {
   
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
    serviceInfo: acService ? {
      name_ar: acService.name_ar,
      name_en: acService.name_en,
      description_ar: acService.description_ar,
      description_en: acService.description_en,
      brief_ar: acService.brief_ar,
      brief_en: acService.brief_en
    } : {
      name_ar: "حالة نظام التكييف",
      name_en: "AC & Engine Cooling",
      description_ar: "أوتوسكور يقوم بعمل فحص دقيق و متخصص لأنظمة التكييف و تبريد المحرك و يرجع الفضل الى الخبراء و المهندسين المختصين و الأجهزة و التقنيات المعتمدة من شركة بوش Bosch الالمانية",
      description_en: "AutoScore performs detailed inspection and assessment for the Air condition and engine cooling components , thanks to the experts and BOSCH diagnostic tools"
    },
    acPoints: processedPoints,
    totalPoints: processedPoints.length,
    passedPoints: processedPoints.filter((p) => p.point_passed).length,
    failedPoints: processedPoints.filter((p) => !p.point_passed).length,
  };
};

/**
 * Optimized point mapping function for AC data
 * Maps points to display format with better performance and memory efficiency
 */
const mapACPoints = (points) => {
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
            imageSrc = `https://cd-root.com/syarahplus/storage/app/public/${imageSrc}`;
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
      console.warn("Error processing AC point:", err, p);
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

/**
 * Distribute AC points across different filter categories
 * Optimized for better performance and accurate categorization
 */
const distributeACPoints = (points) => {
  if (!Array.isArray(points) || points.length === 0) {
    return {
      specifics: [],
      cooling: [],
      heating: [],
      directions: [],
      leakTest: [],
      engineCooling: [],
      radiatorFan: []
    };
  }

  const distributed = {
    specifics: [...points], // All points go to specifics - this is the main filter
    cooling: [],
    heating: [],
    directions: [],
    leakTest: [],
    engineCooling: [],
    radiatorFan: []
  };

  // Optimized distribution using single loop
  points.forEach((point) => {
    const nameAr = point.name_ar?.toLowerCase() || "";
    const nameEn = point.name_en?.toLowerCase() || "";
    
    // Categorize based on point names
    if (nameAr.includes("التبريد") || nameEn.includes("cooling")) {
      distributed.cooling.push(point);
    }
    
    if (nameAr.includes("التدفئة") || nameEn.includes("heating")) {
      distributed.heating.push(point);
    }
    
    if (nameAr.includes("التحويلات") || nameEn.includes("directions")) {
      distributed.directions.push(point);
    }
    
    if (nameAr.includes("تهريب") || nameEn.includes("leak")) {
      distributed.leakTest.push(point);
    }
    
    if (nameAr.includes("تبريد المحرك") || nameEn.includes("engine cooling")) {
      distributed.engineCooling.push(point);
    }
    
    if (nameAr.includes("مراوح") || nameEn.includes("fan")) {
      distributed.radiatorFan.push(point);
    }
  });


  return distributed;
};


// Main component for air conditioning system inspection
const AirConditioningComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationData = location.state;

  // Optimized state management
  const [activeFilter, setActiveFilter] = useState("specifics");
  const [openInfoIndex, setOpenInfoIndex] = useState(null);
  const [openGallery, setOpenGallery] = useState(null);
  const [acData, setAcData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedToken = localStorage.getItem("token");

  // Memoized filter buttons configuration for better performance
  const filterButtons = useMemo(() => [
    { key: "specifics", label: "جميع نقاط فحص التكييف" },
    { key: "cooling", label: "نظام التبريد" },
    { key: "heating", label: "نظام التدفئة" },
    { key: "directions", label: "التحويلات" },
    { key: "leakTest", label: "فحص التسريبات" },
    { key: "engineCooling", label: "تبريد المحرك" },
    { key: "radiatorFan", label: "مراوح التبريد" },
  ], []);

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
      const cacheKey = `ac_${navigationData?.reportNum || 'default'}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const processedData = processAirConditioningData(parsedData);
        processACInspectionData(processedData);
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
            
            const processedData = processAirConditioningData(response.data);
            processACInspectionData(processedData);
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
          
          const processedData = processAirConditioningData(targetReport);
          processACInspectionData(processedData);
        } else if (navData?.data) {
          const processedData = processAirConditioningData(navData);
          processACInspectionData(processedData);
        } else {
          const processedData = processAirConditioningData(navData);
          processACInspectionData(processedData);
        }
        
        setIsLoading(false);
        return;
      }

      setError("يرجى استخدام صفحة البحث للوصول إلى التقارير");
    } catch (err) {
      console.error("خطأ في جلب البيانات:", err);
      setError("حدث خطأ في جلب البيانات");
    } finally {
      setIsLoading(false);
    }
  }, [navigationData, storedToken]);

  /**
   * Process AC data from processed inspection data with memory optimization
   */
  const processACInspectionData = useCallback((processedData) => {
    if (!processedData) {
      setError("لا توجد بيانات متاحة");
      return;
    }
    

    const allPoints = processedData.acPoints || [];
    
    // Use service description from API if available, otherwise use default
    const serviceDescription = processedData.serviceInfo?.description_ar || 
      "أوتوسكور يقوم بعمل فحص دقيق و متخصص لأنظمة التكييف و تبريد المحرك و يرجع الفضل الى الخبراء و المهندسين المختصين و الأجهزة و التقنيات المعتمدة من شركة بوش Bosch الالمانية";
    
    const distributedPoints = distributeACPoints(allPoints);
   
    
    // Create mapped control without useMemo (since it's inside callback)
    const mappedControl = {
      specifics: mapACPoints(distributedPoints.specifics),
      cooling: mapACPoints(distributedPoints.cooling),
      heating: mapACPoints(distributedPoints.heating),
      directions: mapACPoints(distributedPoints.directions),
      leakTest: mapACPoints(distributedPoints.leakTest),
      engineCooling: mapACPoints(distributedPoints.engineCooling),
      radiatorFan: mapACPoints(distributedPoints.radiatorFan),
      carImage: hallbackImage,
    };
    
 

  

    // Create optimized structure with API data
    const ACData = {
      itemis: [
        {
          title: processedData.serviceInfo?.name_ar || "حالة نظام التكييف",
          type: "details",
          carInformation: { image: hallbackImage },
          descriptionPoints: [
            serviceDescription,
            "يغطي هذا القسم النقاط التالية :",
            "نظام التكييف و الكمبرسر",
            "نظام التدفئة",
            "تبريد المحرك و المراوح",
            "تهريب السوائل"
          ],
          control: mappedControl,
        },
      ],
    };
    
 

   
   
    setAcData(ACData);
    
  }, []);

  // Process data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle click outside to close info tooltips
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenInfoIndex(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Memoized event handlers for better performance
  const handleInfoClick = useCallback((e, colIdx, i) => {
    e.stopPropagation();
    setOpenInfoIndex(prev => prev === `${colIdx}-${i}` ? null : `${colIdx}-${i}`);
  }, []);

  const handleGalleryClick = useCallback((gallery, startIndex) => {
    setOpenGallery({ images: gallery, start: startIndex });
  }, []);

  const handleFilterChange = useCallback((filterKey) => {
    setActiveFilter(filterKey);
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
          <p className="text-gray-600">جاري تحميل بيانات نظام التكييف...</p>
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
  if (!acData) {
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
    <div id="نظام-التكيف">
      <div className="space-y-5 mt-6">
        {acData.itemis.map((item, idx) => (
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
                        {item.descriptionPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* أزرار الفلاتر */}
                  <div className="flex flex-wrap gap-3 mt-6">
                  {filterButtons.map((btn) => (
                    <button
                      key={btn.key}
                        onClick={() => handleFilterChange(btn.key)}
                        className={`px-4 py-2 rounded transition-colors duration-200 ${
                          activeFilter === btn.key
                            ? "bg-blue-500 text-white dark:bg-blue-600"
                            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                  {/* Filter content */}
                  {["specifics", "cooling", "heating", "directions", "leakTest", "engineCooling", "radiatorFan"].includes(activeFilter) && (
                  (() => {
                      const src = acData.itemis[0]?.control[activeFilter] ?? [];
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
};

export default AirConditioningComponent;