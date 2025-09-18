import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown, FaInfoCircle, FaSpinner } from "react-icons/fa";
import ScreenGallery from "../ScreenGallery/ScreenGallery";
import iallbackImage from '../../assets/img20.png'
import pallbackImage  from  '../../assets/img23.png'

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
 * Process road test data specifically for road test inspection points
 * Optimized for better performance and reduced data consumption
 */
const processRoadTestData = (data) => {
  if (!data) return null;

  // Handle API response structure
  const reportData = data.data || data;
  const report = Array.isArray(reportData) ? reportData[0] : reportData;


  // Define the road test points names for filtering (from the actual data provided)
  const roadTestPointNames = [
    "ميزان طارة الستيرنج", "مسير السيارة باستقامة على أرض منبسطة", 
    "شعور طبيعي للستيرنج أثناء العمل", "مجموعة نظام الستيرنج",
    "مجموعة نظام التعليق", "لا يوجد صوت غير طبيعي او اهتزازات من نظام التعليق",
    "لايوجد صوت غير طبيعي او اهتزازات اثناءالمسير", "أداء المحرك في درجة حرارة التشغيل",
    "أداء الجير العادي والكلاتش", "أداء الجير الاوتوماتيكي", "أداء الدفع الرباعي",
    "أداء نظام الهايبرد/الكهرباء", "لايوجد صوت عجلات أو طريق غير طبيعي",
    "أداء نظام البريك", "لايوجد اهتزازات او أصوات من البريك", "عمل مثبت السرعة"
  ];
  

  // Log first few inspection points to understand structure
  if (report.inspection_points && report.inspection_points.length > 0) {
   
    
    // Log all point names to help identify road test points
  }
  
  // Try multiple ways to get road test points
  let allPoints = [];
  
  if (report.services && report.services.length > 0) {
    // Method 1: From services structure
    const roadTestService = report.services.find(service => service.id === 11);
    
    if (roadTestService?.points) {
      allPoints = roadTestService.points;
    } else {
      // Look for road test service by name
      const roadTestByName = report.services.find(service => 
        service.name_ar?.includes("فحص الطريق") || 
        service.name_en?.toLowerCase().includes("road test")
      );
      if (roadTestByName?.points) {
        allPoints = roadTestByName.points;
      }
    }
  } else if (report.inspection_points && Array.isArray(report.inspection_points)) {
    // Method 2: Filter road test points from inspection_points array
   
    
    const roadTestPoints = report.inspection_points.filter(point => {
      const pointName = point.name_ar || point.point?.name_ar || "";
      
      // Exact match first
      const exactMatch = roadTestPointNames.includes(pointName);
      if (exactMatch) {
        return true;
      }
      
      // Keyword match for road test-related points
      const roadTestKeywords = [
        "ميزان طارة الستيرنج", "مسير السيارة باستقامة", "شعور طبيعي للستيرنج",
        "مجموعة نظام الستيرنج", "مجموعة نظام التعليق", "أداء المحرك",
        "أداء الجير", "أداء الدفع الرباعي", "أداء نظام الهايبرد",
        "أداء نظام البريك", "عمل مثبت السرعة"
      ];
      
      const keywordMatch = roadTestKeywords.some(keyword => 
        pointName.includes(keyword)
      );
      
      if (keywordMatch) {
        return true;
      }
      
      return false;
    });
    allPoints = roadTestPoints;
   
  } else if (report.points && Array.isArray(report.points)) {
    // Method 3: Use all points if no services structure
    allPoints = report.points;
  } else {
  }

  
  // Verify we have points from road test service
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
      name_ar: "فحص الطريق",
      name_en: "Road Test",
      description_ar: "يقوم فريق أوتوسكور المتخصص بقيادة المركبة على الطريق بشكل متخصص للتأكد من عمل المحرك و نظام الدفع ، الجير و الغيارات ، ناقل الحركة ، البريكات و السيطرة على السيارة أثناء المسير و الالتفاف. و بقوم الفريق أيضا بفحص الأعطال الشائعة بهذا الموديل و التأكد من الأعطال الفنية اللي تم اكتشفاها أثناء الفحص الارضي او على الرافعة.",
      description_en: "AutoScore professional team performs an advanced road-test to check the engine performance, wheel alignment, transmission shifts, transaxle, clutch, brakes, weird noises and car maneuvering. Also, the team inspects the car's known issues the and technical errors found by the inspection team",
      brief_ar: "يقوم فريق أوتوسكور المتخصص بقيادة المركبة على الطريق بشكل متخصص للتأكد من عمل المحرك و نظام الدفع ، الجير و الغيارات ، ناقل الحركة ، البريكات و السيطرة على السيارة أثناء المسير و الالتفاف.",
      brief_en: "AutoScore professional team performs an advanced road-test to check the engine performance, wheel alignment, transmission shifts, tra..."
    },
    roadTestPoints: processedPoints,
    totalPoints: processedPoints.length,
    passedPoints: processedPoints.filter((p) => p.point_passed).length,
    failedPoints: processedPoints.filter((p) => !p.point_passed).length,
  };
};

/**
 * Optimized point mapping function for road test data
 * Maps points to display format with better performance and memory efficiency
 */
const mapRoadTestPoints = (points) => {
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
      console.warn("Error processing road test point:", err, p);
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


const distributeRoadTestPoints = (points) => {
  if (!Array.isArray(points) || points.length === 0) {
    return {
      allPoints: [],
      steeringSystem: [],
      suspensionSystem: [],
      enginePerformance: [],
      transmissionSystem: [],
      brakeSystem: [],
      otherSystems: []
    };
  }

  const distributed = {
    allPoints: [...points], // All points go to allPoints - this is the main filter
    steeringSystem: [],
    suspensionSystem: [],
    enginePerformance: [],
    transmissionSystem: [],
    brakeSystem: [],
    otherSystems: []
  };

  // Log all points for debugging
  
  // Optimized distribution using single loop
  points.forEach((point) => {
    const nameAr = point.name_ar?.toLowerCase() || "";
    
    // Categorize based on exact Arabic names for other filters
    // نظام الستيرنج
    if (nameAr.includes("ميزان طارة الستيرنج") || nameAr.includes("شعور طبيعي للستيرنج") || 
        nameAr.includes("مجموعة نظام الستيرنج") || nameAr.includes("مسير السيارة باستقامة")) {
      distributed.steeringSystem.push(point);
    }
    
    // نظام التعليق
    if (nameAr.includes("مجموعة نظام التعليق") || nameAr.includes("اهتزازات من نظام التعليق") ||
        nameAr.includes("اهتزازات اثناءالمسير")) {
      distributed.suspensionSystem.push(point);
    }
    
    // أداء المحرك
    if (nameAr.includes("أداء المحرك في درجة حرارة التشغيل")) {
      distributed.enginePerformance.push(point);
    }
    
    // نظام الجير
    if (nameAr.includes("أداء الجير العادي والكلاتش") || nameAr.includes("أداء الجير الاوتوماتيكي") ||
        nameAr.includes("أداء الدفع الرباعي") || nameAr.includes("أداء نظام الهايبرد")) {
      distributed.transmissionSystem.push(point);
    }
    
    // نظام البريك
    if (nameAr.includes("أداء نظام البريك") || nameAr.includes("اهتزازات او أصوات من البريك")) {
      distributed.brakeSystem.push(point);
    }
    
    // أنظمة أخرى
    if (nameAr.includes("صوت عجلات أو طريق غير طبيعي") || nameAr.includes("عمل مثبت السرعة")) {
      distributed.otherSystems.push(point);
    }
  });

  

  return distributed;
};


const RoadTestComponent = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationData = location.state;

  // Optimized state management
  const [openInfoIndex, setOpenInfoIndex] = useState(null);
  const [openGallery, setOpenGallery] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("allPoints");
  const [roadTestData, setRoadTestData] = useState(null);
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
      const cacheKey = `road_test_${navigationData?.reportNum || 'default'}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const processedData = processRoadTestData(parsedData);
        processRoadTestDisplayData(processedData);
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
            
            const processedData = processRoadTestData(response.data);
            processRoadTestDisplayData(processedData);
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
          
          const processedData = processRoadTestData(targetReport);
          processRoadTestDisplayData(processedData);
        } else if (navData?.data) {
          const processedData = processRoadTestData(navData);
          processRoadTestDisplayData(processedData);
        } else {
          const processedData = processRoadTestData(navData);
          processRoadTestDisplayData(processedData);
        }
        
        setIsLoading(false);
        return;
      }

      // Fallback to default data if no navigation data available
      const defaultData = {
        serviceInfo: {
          name_ar: "فحص الطريق",
          name_en: "Road Test",
          description_ar: "يقوم فريق أوتوسكور المتخصص بقيادة المركبة على الطريق بشكل متخصص للتأكد من عمل المحرك و نظام الدفع ، الجير و الغيارات ، ناقل الحركة ، البريكات و السيطرة على السيارة أثناء المسير و الالتفاف."
        },
        roadTestPoints: []
      };
      processRoadTestDisplayData(defaultData);
      setError("يرجى استخدام صفحة البحث للوصول إلى التقارير");
    } catch (err) {
      console.error("خطأ في جلب البيانات:", err);
      setError("حدث خطأ في جلب البيانات");
    } finally {
      setIsLoading(false);
    }
  }, [navigationData, storedToken]);

  /**
   * Process road test data from processed inspection data with memory optimization
   */
  const processRoadTestDisplayData = useCallback((processedData) => {
    if (!processedData) {
      setError("لا توجد بيانات متاحة");
      return;
    }
    

    const allPoints = processedData.roadTestPoints || [];
   
    const serviceDescription = processedData.serviceInfo?.description_ar || 
      "في أوتوسكور نقوم بتقييم و فحص الشاصي و الهيكل الداخلي للسيارة اعتمادا على القياسات و الأبعاد الأصلية و التأكد من عدم وجود نقاط لحام على المفاصل الرئيسية أو وجود أي انحراف او تأثير على أداء السيارة حسب نظام CCM العالمي.";
    
    // Distribute points across different filters
    const distributedPoints = distributeRoadTestPoints(allPoints);
    
    // Create mapped control without useMemo (since it's inside callback)
    const mappedControl = {
      allPoints: mapRoadTestPoints(distributedPoints.allPoints),
      steeringSystem: mapRoadTestPoints(distributedPoints.steeringSystem),
      suspensionSystem: mapRoadTestPoints(distributedPoints.suspensionSystem),
      enginePerformance: mapRoadTestPoints(distributedPoints.enginePerformance),
      transmissionSystem: mapRoadTestPoints(distributedPoints.transmissionSystem),
      brakeSystem: mapRoadTestPoints(distributedPoints.brakeSystem),
      otherSystems: mapRoadTestPoints(distributedPoints.otherSystems),
      carImage: iallbackImage,
    };

    

    // Create optimized structure with API data
    const RoadTestData = {
      roadTestItems: [
        {
          title: processedData.serviceInfo?.name_ar || "فحص الطريق",
          type: "details",
          carInformation1: { images: ["/FIX.png"] },
          descriptionPoints: [
            serviceDescription,
           "..يقوم فريق أوتوسكور المتخصص بقيادة المركبة على الطريق بشكل متخصص للتأكد من عمل المحرك و نظام الدفع ، الجير و الغيارات ، ناقل الحركة ، البريكات و السيطرة على السيارة أثناء المسير و الالتفاف.",
           "و بقوم الفريق أيضا بفحص الأعطال الشائعة بهذا الموديل و التأكد من الأعطال الفنية اللي تم اكتشفاها أثناء الفحص الارضي او على الرافعة."
          ],
          inspectionData: mappedControl,
        },
      ],
    };

    
    setRoadTestData(RoadTestData);
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
          <div className="flex items-center gap-2 sm:gap-3 relative">
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
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm sm:text-base relative transition-colors"
                aria-label="معلومات إضافية"
              >
                <FaInfoCircle size={16} className="sm:w-5 sm:h-5" />
                {openInfoIndex === `${colIdx}-${i}` && (
                  <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs rounded-lg px-2 sm:px-3 py-2 shadow-lg w-48 sm:w-64 z-10">
                    {row.info}
                  </div>
                )}
              </button>
            )}
            <span className="text-black dark:text-white text-sm sm:text-base font-medium">
              {row.label}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span
              className={`font-bold text-sm sm:text-base ${
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
          <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs sm:text-sm text-gray-700 dark:text-gray-300">
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
              className="w-24 h-18 sm:w-32 sm:h-24 md:w-36 md:h-28 object-cover rounded-lg shadow cursor-pointer hover:opacity-80 transition-opacity"
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
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <FaSpinner className="animate-spin text-3xl sm:text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 text-sm sm:text-base">جاري تحميل بيانات فحص الطريق...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <FaInfoCircle className="text-3xl sm:text-4xl text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>
          <button
            onClick={() => navigate("/report-search")}
            className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            العودة لصفحة البحث
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!roadTestData) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <FaInfoCircle className="text-3xl sm:text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-sm sm:text-base">لا توجد بيانات متاحة</p>
        </div>
      </div>
    );
  }

  return (
    <div id="فحص-الطريق">
      <div className="space-y-4 sm:space-y-5 mt-4 sm:mt-6">
        {roadTestData.roadTestItems.map((item, idx) => (
          <Disclosure key={idx} >
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex justify-between items-center px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <span className="font-medium text-sm sm:text-base">{item.title}</span>
                  <FaChevronDown
                    className={`transform transition-transform ${open ? "rotate-180" : ""} w-4 h-4 sm:w-5 sm:h-5`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-3 sm:px-4 py-2 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
  {/* صورة السيارة */}
  <div className="shadow rounded-lg overflow-hidden">
    {item.carInformation1.images.map((img, i) => (
      <img
        key={i}
        src={img}
        alt={`car ${i}`}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-full object-cover object-center"
      />
    ))}
  </div>

  {/* نصوص الوصف */}
  <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-xs sm:text-sm leading-relaxed">
      {item.descriptionPoints.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
</div>
                  {/* أزرار الفلاتر */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
                    {[
                      { key: "allPoints", label: "جميع نقاط الفحص" },
                      { key: "steeringSystem", label: "نظام الستيرنج" },
                      { key: "suspensionSystem", label: "نظام التعليق" },
                      { key: "enginePerformance", label: "أداء المحرك" },
                      { key: "transmissionSystem", label: "نظام الجير" },
                      { key: "brakeSystem", label: "نظام البريك" },
                      { key: "otherSystems", label: "أنظمة أخرى" },
                    ].map((btn) => (
                      <button
                        key={btn.key}
                        onClick={() => setCurrentFilter(btn.key)}
                        className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-colors duration-200 ${
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
                  {["allPoints", "steeringSystem", "suspensionSystem", "enginePerformance", "transmissionSystem", "brakeSystem", "otherSystems"].includes(currentFilter) && (
                    (() => {
                      const src = roadTestData.roadTestItems[0]?.inspectionData[currentFilter] ?? [];
                      const mid = Math.ceil(src.length / 2);
                      const cols = [src.slice(0, mid), src.slice(mid)];

                      return (
                        <div className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-x-4 sm:gap-x-8 lg:gap-x-16 gap-y-6 sm:gap-y-8 lg:gap-y-10">
                          {cols.map((col, colIdx) => (
                            <div key={colIdx} className="space-y-4 sm:space-y-6">
                              {col.map((row, i) => renderPoint(row, colIdx, i))}
                            </div>
                          ))}
                        </div>
                      );
                    })()
                  )}

                  {/* عرض ScreenGallery إذا كان مفتوح */}
                  {openGallery && (
                    <ScreenGallery
                      images={openGallery.images}
                      startIndex={openGallery.start}
                      onClose={() => setOpenGallery(null)}
                    />
                  )}

                  <div className="p-2 sm:p-3 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-sm sm:text-base rounded">
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1 text-xs sm:text-sm">
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
});

// تصدير الكومبوننت
export default RoadTestComponent;