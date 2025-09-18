import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown, FaInfoCircle, FaSpinner } from "react-icons/fa";
import ScreenGallery from "../ScreenGallery/ScreenGallery";
import iallbackImage from '../../assets/img20.png';
import pallbackImage from '../../assets/img23.png';
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

// Service ID mapping for chassis data


/**
 * Process chassis data specifically for chassis inspection points
 * Optimized for better performance and reduced data consumption
 */
const processChassisData = (data) => {
  if (!data) return null;

  // Handle API response structure
  const reportData = data.data || data;
  const report = Array.isArray(reportData) ? reportData[0] : reportData;


  // Define the chassis points names for filtering
  const chassisPointNames = [
    "قياسات الشاصي الامامي اليمين", "قياسات الشاصي الامامي اليسار", 
    "قياسات الشاصي الخلفي اليمين", "قياسات الشاصي الخلفي اليسار",
    "الهيكل الامامي", "الهيكل الخلفي", "الهيكل السفلي", "الهيكل العلوي",
    "هيكل الجنب اليمين", "هيكل الجنب الشمال", "وجود الصدأ"
  ];

  // Find chassis service (ID 2) with better error handling
  const chassisService = report.services?.find(service => service.id === 2);
  
  
  // Try multiple ways to get chassis points
  let allPoints = [];
  
  if (chassisService?.points) {
    // Method 1: From chassis service (ID 2)
    allPoints = chassisService.points;
  } else if (report.services && report.services.length > 0) {
    // Method 2: Look for chassis service by name
    const chassisByName = report.services.find(service => 
      service.name_ar?.includes("الشاصي والهيكل") || 
      service.name_en?.toLowerCase().includes("chassis")
    );
    if (chassisByName?.points) {
      allPoints = chassisByName.points;
    }
  } else if (report.inspection_points && Array.isArray(report.inspection_points)) {
 
    const chassisPoints = report.inspection_points.filter(point => {
      const pointName = point.name_ar || point.point?.name_ar || "";
      const isChassisPoint = chassisPointNames.includes(pointName);
      if (isChassisPoint) {
      }
      return isChassisPoint;
    });
    allPoints = chassisPoints;
   
  } else if (report.points && Array.isArray(report.points)) {
    // Method 4: Use all points if no services structure
    allPoints = report.points;
  } else {
  }

  // Verify we have points from chassis service
  if (allPoints.length === 0) {
  
  } else if (allPoints.length === 11) {
  } else {
    
  }

  const processedPoints = allPoints.map((point) => {
    const evaluation = point.evaluation || {};
    
    // Get point name from multiple possible sources
    const pointName = point.name_ar || point.point?.name_ar || point.point_name_ar || "نقطة غير محددة";
    
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
      name_ar: pointName, // Use the pointName we extracted earlier
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
    serviceInfo: chassisService ? {
      name_ar: chassisService.name_ar,
      name_en: chassisService.name_en,
      description_ar: chassisService.description_ar,
      description_en: chassisService.description_en,
      brief_ar: chassisService.brief_ar,
      brief_en: chassisService.brief_en
    } : null,
    chassisPoints: processedPoints,
    totalPoints: processedPoints.length,
    passedPoints: processedPoints.filter((p) => p.point_passed).length,
    failedPoints: processedPoints.filter((p) => !p.point_passed).length,
  };
};


const mapChassisPoints = (points) => {
  if (!Array.isArray(points) || points.length === 0) {
    console.log("❌ No points to map or points is not an array");
    return [];
  }
  

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
        console.log(`🖼️ Processing images for ${p.name_ar}:`, p.point_images);
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
      console.warn("Error processing chassis point:", err, p);
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
 * Distribute chassis points across different filter categories
 * Optimized for better performance and accurate categorization
 */
const distributeChassisPoints = (points) => {
  if (!Array.isArray(points) || points.length === 0) {
    return {
      chassisAll: [],
      chassisMeasurements: [],
      frontLeftFrame: [],
      frontRightFrame: [],
      rearRightFrame: [],
      rearLeftFrame: [],
      frontFrame: [],
      inspectionPoints: [],
      dimensionsCheck: [],
      topFrame: []
    };
  }

  const distributed = {
    chassisAll: [...points], // All points go to chassisAll
    chassisMeasurements: [],
    frontLeftFrame: [],
    frontRightFrame: [],
    rearRightFrame: [],
    rearLeftFrame: [],
    frontFrame: [],
    inspectionPoints: [],
    dimensionsCheck: [],
    topFrame: []
  };


  
  // Verify we have exactly 11 points
  if (points.length === 11) {
  } else {
  }

  // Optimized distribution using single loop with precise filtering
  points.forEach((point) => {
    const nameAr = point.name_ar?.toLowerCase() || "";
    
    // قياسات الشاصي - جميع نقاط القياسات (جميع النقاط التي تحتوي على "قياسات الشاصي")
    if (nameAr.includes("قياسات الشاصي")) {
      distributed.chassisMeasurements.push(point);
    }
    
    // قياسات الشاصي الامامي اليسار
    if (nameAr.includes("قياسات الشاصي الامامي اليسار")) {
      distributed.frontLeftFrame.push(point);
    }
    
    // قياسات الشاصي الامامي اليمين
    if (nameAr.includes("قياسات الشاصي الامامي اليمين")) {
      distributed.frontRightFrame.push(point);
    }
    
    // قياسات الشاصي الخلفي اليمين
    if (nameAr.includes("قياسات الشاصي الخلفي اليمين")) {
      distributed.rearRightFrame.push(point);
    }
    
    // قياسات الشاصي الخلفي اليسار
    if (nameAr.includes("قياسات الشاصي الخلفي اليسار")) {
      distributed.rearLeftFrame.push(point);
    }
    
    // الهيكل الامامي
    if (nameAr.includes("الهيكل الامامي")) {
      distributed.frontFrame.push(point);
    }
    
    // الهيكل الخلفي
    if (nameAr.includes("الهيكل الخلفي")) {
      distributed.inspectionPoints.push(point);
    }
    
    // الهيكل السفلي
    if (nameAr.includes("الهيكل السفلي")) {
      distributed.dimensionsCheck.push(point);
    }
    
    // الهيكل العلوي
    if (nameAr.includes("الهيكل العلوي")) {
      distributed.topFrame.push(point);
    }
    
    // إضافة نقاط إضافية للفلاتر المناسبة
    // هيكل الجنب اليمين
    if (nameAr.includes("هيكل الجنب اليمين")) {
      distributed.frontRightFrame.push(point);
    }
    
    // هيكل الجنب الشمال (اليسار)
    if (nameAr.includes("هيكل الجنب الشمال")) {
      distributed.frontLeftFrame.push(point);
    }
    
    // وجود الصدأ
    if (nameAr.includes("وجود الصدأ")) {
      distributed.rearRightFrame.push(point);
    }
  });


  return distributed;
};

/**
 * Optimized Chassis component with improved performance and error handling
 * Maintains the same UI as chiess.jsx but with API data integration
 */
function ChassisOptimized() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationData = location.state;

  // Optimized state management
  const [openInfoIndex, setOpenInfoIndex] = useState(null);
  const [openGallery, setOpenGallery] = useState(null);
  const [Filterr, setFilterr] = useState("chassisAll");
  const [chassisData, setChassisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Optimized fetch and process data from API
   */
  const fetchData = useCallback(async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      window.location.href = "/login";
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Try to fetch from inspection reports API first
      if (!navigationData?.report && !navigationData?.searchResults) {
        try {
          const reportNumber = navigationData?.reportNum || "USR-2-VEH-2-1756969611";
          const response = await axios.get(
            `https://cd-root.com/syarahplus/backend/api/users/inspection/reports/${reportNumber}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          );
          
          if (response.data?.success && response.data?.data) {
            const processedData = processChassisData(response.data);
            processChassisDisplayData(processedData);
            setIsLoading(false);
            return;
          }
        } catch (apiError) {
          console.error("API Error:", apiError);
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
          
          const processedData = processChassisData(targetReport);
          processChassisDisplayData(processedData);
        } else if (navData?.data) {
          const processedData = processChassisData(navData);
          processChassisDisplayData(processedData);
        } else {
          const processedData = processChassisData(navData);
          processChassisDisplayData(processedData);
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
  }, [navigationData]);

  /**
   * Process chassis data from processed inspection data
   * Optimized with useMemo for better performance
   */
  const processChassisDisplayData = useCallback((processedData) => {
    if (!processedData) {
      setError("لا توجد بيانات متاحة");
      return;
    }
    

    const allPoints = processedData.chassisPoints || [];
    
    // Distribute points across different filters
    const distributedPoints = distributeChassisPoints(allPoints);
    
    const mappedControl = {
      chassisAll: mapChassisPoints(distributedPoints.chassisAll),
      chassisMeasurements: mapChassisPoints(distributedPoints.chassisMeasurements),
      frontLeftFrame: mapChassisPoints(distributedPoints.frontLeftFrame),
      frontRightFrame: mapChassisPoints(distributedPoints.frontRightFrame),
      rearRightFrame: mapChassisPoints(distributedPoints.rearRightFrame),
      rearLeftFrame: mapChassisPoints(distributedPoints.rearLeftFrame),
      frontFrame: mapChassisPoints(distributedPoints.frontFrame),
      inspectionPoints: mapChassisPoints(distributedPoints.inspectionPoints),
      dimensionsCheck: mapChassisPoints(distributedPoints.dimensionsCheck),
      topFrame: mapChassisPoints(distributedPoints.topFrame),
      carImagee: iallbackImage,
    };

    // Create the same structure as chiess.jsx
    const Chassisa = {
      itimis: [
        {
          title: "الشاصي والهيكل",
          type: "details",
          carInformation1: {
            images: [iallbackImage, pallbackImage]
          },
          descriptionPoints2: [
            "في أوتوسكور نقوم بتقييم و فحص الشاصي و الهيكل الداخلي للسيارة اعتمادا على القياسات و الأبعاد الأصلية و التأكد من عدم وجود نقاط لحام على المفاصل الرئيسية أو وجود أي انحراف او تأثير على أداء السيارة حسب نظام CCM العالمي",
            "يتم اجراء الفحص عن طريق :",
            "نظام قياس الانحرافات بالليزر",
            "الفحص النظري المختص",
            "يغطي هذا القسم النقاط التالية :",
            "الشاصيات الأربعة",
            "الهيكل الأمامي",
            "هيكل السقف",
            "الهيكل الخلفي",
            "الواجهة الأمامية",
            "الواجهة الخلفية",
            "جوانب السيارة",
            "ملاحظة هامة : يتم الفحص دون أي ذكر أو مقارنة مع مصطلحات الفحص التقليدية ( مثل جيد ، مضروب ، ضربة بنكيت ، قصعة ، دقة.. الخ)"
          ],
          Power: mappedControl,
        },
      ],
    };

    setChassisData(Chassisa);
  }, []);

  // Memoized filter data for better performance
  const currentFilterData = useMemo(() => {
    if (!chassisData?.itimis?.[0]?.Power) return [];
    return chassisData.itimis[0].Power[Filterr] || [];
  }, [chassisData, Filterr]);

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
    const pointKey = `${colIdx}-${i}`;
    const isInfoOpen = openInfoIndex === pointKey;
    
    // Debug image rendering
    if (hasImages) {
    } else {
    }
    
    return (
      <div key={pointKey} className="pb-3">
        {/* Main row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 relative">
            {hasInfo && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenInfoIndex(isInfoOpen ? null : pointKey);
                }}
                className="text-blue-600 hover:text-blue-800 dark:text-white text-base relative transition-colors"
                aria-label="معلومات إضافية"
              >
                <FaInfoCircle size={20} />
                {isInfoOpen && (
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
                e.target.src = iallbackImage;
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
          <p className="text-gray-600">جاري تحميل بيانات الشاصي...</p>
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
  if (!chassisData) {
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
    <div id="الشاصي-والهيكل">
      <div className="space-y-5 mt-6">
        {chassisData.itimis.map((item, idx) => (
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Car images */}
                    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow rounded-lg">
                      {chassisData.itimis[0].carInformation1.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`car ${i}`}
                          className="w-full h-auto max-h-64 object-contain mb-4"
                          loading="lazy"
                        />
                      ))}
                    </div>

                    {/* Description texts */}
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                        {item.descriptionPoints2.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Filter buttons */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    {[
                      { key: "chassisAll", label: "جميع نقاط الفحص" },
                      { key: "chassisMeasurements", label: "قياسات الشاصي" },
                      { key: "frontLeftFrame", label: "قياسات الشاصي الامامي الايسر  " },
                      { key: "frontRightFrame", label: "قياسات الشاصي الامامي الايمن  " },
                      { key: "rearRightFrame", label:" قياسات الشاصي الخلفي  الايمن  "},

                      { key: "rearLeftFrame", label: " الهيكل الخلفي الايسر " },
                      { key: "frontFrame", label: "االهيكل الامامي  " },
                      { key: "inspectionPoints", label: "الهيكل الخلفي " },
                      { key: "topFrame", label: " الهيكل العلوي " },
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

                  {/* Filter content - Optimized & responsive */}
                  {["chassisAll", "chassisMeasurements","frontLeftFrame","frontRightFrame","rearRightFrame","rearLeftFrame","frontFrame","inspectionPoints","topFrame"].includes(Filterr) && (
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                      {currentFilterData.map((row, i) => renderPoint(row, 0, i))}
                    </div>
                  )}

                  {/* FullScreenGallery modal */}
                  {openGallery && (
                    <ScreenGallery
                      images={openGallery.images}
                      startIndex={openGallery.start}
                      onClose={() => setOpenGallery(null)}
                    />
                  )}

                  {/* Notes section */}
                  <div className="p-2 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-base rounded">
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1 text-sm">
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
  );
}

export default ChassisOptimized;
 