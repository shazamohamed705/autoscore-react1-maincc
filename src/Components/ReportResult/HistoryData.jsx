import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown, FaSpinner, FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import fallbackImage  from '../../assets/imagge2.png'
import rallbackImage from '../../assets/imagee22.png'

// Fallback image constant


/**
 * Process history data specifically for history inspection points
 * Optimized for better performance and reduced data consumption
 */
const processHistoryData = (data) => {
  if (!data) return null;

  // Handle API response structure
  const reportData = data.data || data;
  const report = Array.isArray(reportData) ? reportData[0] : reportData;


  // Find history service (ID 8) and general overview service (ID 9)
  const historyService = report.services?.find(service => service.id === 8);
  const generalOverviewService = report.services?.find(service => service.id === 9);
  
  // Log the services found
 
  // Try multiple ways to get history points
  let allPoints = [];
  
  if (historyService?.points) {
    // Method 1: From history service (ID 8)
    allPoints = historyService.points;
  } else if (generalOverviewService?.points) {
    // Method 2: From general overview service (ID 9)
    allPoints = generalOverviewService.points;
  } else if (report.services && report.services.length > 0) {
    // Method 3: Look for history service by name
    const historyByName = report.services.find(service => 
      service.name_ar?.includes("التاريخ") || 
      service.name_en?.toLowerCase().includes("history") ||
      service.name_ar?.includes("الحالة العامة")
    );
    if (historyByName?.points) {
      allPoints = historyByName.points;
    }
  } else if (report.inspection_points && Array.isArray(report.inspection_points)) {
    // Method 4: Filter specific history points from inspection_points
    
    // Define history-related point names to filter
    const historyPointNames = [
      "رهن المركبة", "عدد الحوادث المحلية", "نوع الاستخدام", "انتهاء الترخيص",
      "الحجوزات", "تغيير المحرك", "تصنيف المركبة", "الايرباج", 
      "آخر قراءة عداد كارسيير", "الحوادث", "إصلاحات كهربائية",
      "قيمه سوق السيارات بالدينار الأردني", "القيمة القصوى لسوق السيارات بالدينار الأردني",
      "بلد الصنع", "تكاليف نقل الملكية", "المحرك", "نظام البريكات",
      "الفئة", "عدد المالكين", "تغيير الاستخدام", "الملكية الأردنية",
      "عدد المقاعد", "نوع التسجيل", "إرتفاع السيارة", "وزن السيارة",
      "سعة تنك البنزين", "معدل إستهلاك البنزين", "تغيير نوع التسجيل",
      "العمل بالتطبيقات", "تايتل السيارة", "المسافة المقطوعة", "تاريخ الرعاية بالمركبة"
    ];
    
    // Filter points that match history-related names
    allPoints = report.inspection_points.filter(point => {
      const pointName = point.name_ar || point.point?.name_ar || "";
      return historyPointNames.includes(pointName);
    });
    
  } else if (report.points && Array.isArray(report.points)) {
    // Method 5: Use all points if no services structure
    allPoints = report.points;
  } else {
  }

  const processedPoints = allPoints.map((point) => {
    const evaluation = point.evaluation || {};
    
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
      inspected_at: evaluation.inspected_at || point.inspected_at || "",
      requires_immediate_attention: evaluation.requires_immediate_attention || point.requires_immediate_attention || null,
    };
  });

  // Determine which service to use for service info
  const activeService = historyService || generalOverviewService;
  
  return {
    ...report,
    serviceInfo: activeService ? {
      name_ar: activeService.name_ar,
      name_en: activeService.name_en,
      description_ar: activeService.description_ar,
      brief_ar: activeService.brief_ar,
    } : {
      name_ar: "التاريخ والسجلات",
      name_en: "History and Records",
      brief_ar: "فحص شامل لتاريخ السيارة وسجلاتها",
      brief_en: "Comprehensive vehicle history and records inspection"
    },
    historyPoints: processedPoints,
    totalPoints: processedPoints.length,
    passedPoints: processedPoints.filter((p) => p.point_passed).length,
    failedPoints: processedPoints.filter((p) => !p.point_passed).length,
  };
};

// No fallback data - using only real API data

// Function to convert API data to display format - only for real API data
const convertApiDataToDisplayFormat = (apiPoints) => {
  if (!apiPoints || apiPoints.length === 0) {
    return [];
  }
  
  return apiPoints.map(point => ({
    label: point.name_ar,
    value: point.evaluation?.notes || "",
    status: point.evaluation?.passed ? "✅" : "❌",
    score_achieved: point.evaluation?.score_achieved || "0.00",
    max_score: point.evaluation?.max_score || "0.00",
    inspected_at: point.evaluation?.inspected_at || "",
    requires_immediate_attention: point.evaluation?.requires_immediate_attention || null
  }));
};

// Create data sections based on API data
const createDataSectionsFromApi = (apiPoints) => {
  if (!apiPoints || apiPoints.length === 0) {
    // Return empty sections if no API points
    return { 
      details: [], 
      registration: [], 
      maintenance: [], 
      mileage: [] 
    };
  }
  
  // Helper function to get status based on score
  const getStatusFromScore = (scoreAchieved, maxScore, passed) => {
    if (passed) return "✅";
    if (maxScore === 0) return "❌";
    
    const percentage = (parseFloat(scoreAchieved) / parseFloat(maxScore)) * 100;
    if (percentage >= 80) return "✅";
    if (percentage >= 50) return "⚠️";
    return "❌";
  };

  // Helper function to get value based on score
  const getValueFromScore = (scoreAchieved, maxScore, notes) => {
    if (notes) return notes;
    if (maxScore === 0) return "غير متوفر";
    
    const percentage = (parseFloat(scoreAchieved) / parseFloat(maxScore)) * 100;
    if (percentage >= 80) return "ممتاز";
    if (percentage >= 50) return "جيد";
    if (percentage > 0) return "ضعيف";
    return "فشل";
  };

  // Create dynamic sections based on actual API data
  const details = [
    { label: "تايتل السيارة", value: getValueFromScore("0.00", "0.00", ""), status: getStatusFromScore("0.00", "0.00", false) },
    { label: "المسافة المقطوعة", value: getValueFromScore("0.00", "0.00", ""), status: getStatusFromScore("0.00", "0.00", false) },
    { label: "تاريخ الرعاية بالمركبة", value: getValueFromScore("0.00", "0.00", ""), status: getStatusFromScore("0.00", "0.00", false) },
    { label: "تاريخ السيارة داخل الأردن" },
    ...apiPoints.slice(0, 8).map(point => ({
      label: point.label,
      value: point.value
    })),
    { Label: "معلومات السيارة التقنية" },
    ...apiPoints.slice(8, 16).map(point => ({
      label: point.label,
      value: point.value
    })),
    { label: "تاريخ السيارة خارج الأردن" },
    ...apiPoints.slice(16).map(point => ({
      label: point.label,
      value: point.value
    }))
  ];

  const registration = [
    { label: "تايتل السيارة", value: getValueFromScore("0.00", "0.00", ""), status: getStatusFromScore("0.00", "0.00", false) },
    { label: "المسافة المقطوعة", value: getValueFromScore("0.00", "0.00", ""), status: getStatusFromScore("0.00", "0.00", false) },
    { label: "تاريخ الرعاية بالمركبة", value: getValueFromScore("0.00", "0.00", ""), status: getStatusFromScore("0.00", "0.00", false) },
    { label: "تاريخ السيارة داخل مصر" },
    ...apiPoints.slice(0, 8).map(point => ({
      label: point.label,
      value: point.value
    })),
    { Label: "معلومات السيارة التقنية" },
    ...apiPoints.slice(8, 16).map(point => ({
      label: point.label,
      value: point.value
    })),
    { label: "تاريخ السيارة خارج الأردن" },
    ...apiPoints.slice(16).map(point => ({
      label: point.label,
      value: point.value
    }))
  ];

  const maintenance = [
    { label: "تاريخ الرعاية بالمركبة", value: getValueFromScore("0.00", "0.00", ""), status: getStatusFromScore("0.00", "0.00", false) },
    { label: "تاريخ السيارة داخل مصر" },
    ...apiPoints.slice(2, 10).map(point => ({
      label: point.label,
      value: point.value
    })),
    { label: "معلومات السيارة التقنية" },
    ...apiPoints.slice(10, 18).map(point => ({
      label: point.label,
      value: point.value
    })),
    { label: "تاريخ السيارة خارج الأردن" },
    ...apiPoints.slice(18).map(point => ({
      label: point.label,
      value: point.value
    }))
  ];

  const mileage = [
    { label: "تاريخ الرعاية بالمركبة", value: getValueFromScore("0.00", "0.00", ""), status: getStatusFromScore("0.00", "0.00", false) },
    { label: "تاريخ السيارة داخل مصر" },
    ...apiPoints.slice(2, 10).map(point => ({
      label: point.label,
      value: point.value
    })),
    { label: "معلومات السيارة التقنية" },
    ...apiPoints.slice(10, 18).map(point => ({
      label: point.label,
      value: point.value
    })),
    { label: "تاريخ السيارة خارج الأردن" },
    ...apiPoints.slice(18).map(point => ({
      label: point.label,
      value: point.value
    }))
  ];

  return { details, registration, maintenance, mileage };
};

// Fallback data sections - returns empty sections when no API data
const createDataSections = () => {
  return { 
    details: [], 
    registration: [], 
    maintenance: [], 
    mileage: [] 
  };
};

// This will be replaced by dynamic data from API

// Component for rendering data sections
const DataSection = ({ data, title }) => {
  const sections = useMemo(() => {
    const result = [];
  let currentSection = { title: "", items: [] };

    data.forEach((row) => {
    const label = row.label || row.Label || "";
    const value = row.value || "";
    const status = row.status || "";
      const score_achieved = row.score_achieved || "0.00";
      const max_score = row.max_score || "0.00";
      const inspected_at = row.inspected_at || "";
      const requires_immediate_attention = row.requires_immediate_attention || null;

    if (!value && !status) {
        // New title element
        if (currentSection.items.length > 0) result.push(currentSection);
      currentSection = { title: label, items: [] };
    } else {
        currentSection.items.push({ 
          label, 
          value, 
          status, 
          score_achieved, 
          max_score, 
          inspected_at, 
          requires_immediate_attention 
        });
      }
    });

    if (currentSection.items.length > 0) result.push(currentSection);
    return result;
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sections.map((section, idx) => (
        <div key={idx} className="border p-2">
          <div className="font-bold text-gray-700 dark:text-gray-200 mb-2">
            {section.title}
          </div>
          <div className="space-y-1">
            {section.items.map((row, i) => (
              <div key={i} className="border-b py-2 px-2 text-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1 gap-1 sm:gap-0">
                  <span className="w-full sm:w-40 font-medium">{row.label}</span>
                  <span className="w-full sm:flex-1 text-gray-600 break-words">{row.value}</span>
                <span className={`w-full sm:w-10 text-right sm:text-left font-semibold ${row.status === "✅" ? "text-green-500" : "text-red-500"}`}>
                  {row.status || ""}
                </span>
                </div>
                {/* Display score if available */}
                {(row.score_achieved !== "0.00" || row.max_score !== "0.00") && (
                  <div className="text-xs text-gray-500 mb-1">
                    النقاط: {row.score_achieved}/{row.max_score}
                  </div>
                )}
                {/* Display inspection date if available */}
                {row.inspected_at && (
                  <div className="text-xs text-gray-500 mb-1">
                    تاريخ الفحص: {new Date(row.inspected_at).toLocaleDateString('ar-SA')}
                  </div>
                )}
                {/* Display immediate attention warning if needed */}
                {row.requires_immediate_attention && (
                  <div className="text-xs text-red-600 font-semibold">
                    ⚠️ يتطلب انتباه فوري
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Filter buttons component
const FilterButtons = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { key: "details", label: "جميع نقاط الفحص" },
    { key: "registration", label: "حالة التسجيل قبل الأستيراد" },
    { key: "maintenance", label: "تاريخ الرعاية بالمركبة" },
    { key: "mileage", label: "المسافة المقطوعة" }
  ];

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setActiveFilter(key)}
          className={`px-4 py-2 rounded transition-colors duration-200 w-full sm:w-auto ${
            activeFilter === key
              ? "bg-blue-500 text-white dark:bg-blue-600"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

// Main component
const HistoryComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationData = location.state;

  // Optimized state management
  const [activeFilter, setActiveFilter] = useState("details");
  const [historyData, setHistoryData] = useState(null);
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
      const cacheKey = `history_${navigationData?.reportNum || 'default'}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const processedData = processHistoryData(parsedData);
        processHistoryInspectionData(processedData);
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
            
            const processedData = processHistoryData(response.data);
            processHistoryInspectionData(processedData);
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
          
          const processedData = processHistoryData(targetReport);
          processHistoryInspectionData(processedData);
        } else if (navData?.data) {
          const processedData = processHistoryData(navData);
          processHistoryInspectionData(processedData);
    } else {
          const processedData = processHistoryData(navData);
          processHistoryInspectionData(processedData);
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
   * Process history data from processed inspection data with memory optimization
   */
  const processHistoryInspectionData = useCallback((processedData) => {
    if (!processedData) {
      setError("لا توجد بيانات متاحة");
      return;
    }
    

    const allPoints = processedData.historyPoints || [];
  
    // Use service description from API if available, otherwise use default
    const serviceDescription = processedData.serviceInfo?.description_ar || 
      "نقوم في كار سيرفر بمراجعة وتجميع جميع سجلات وبيانات السيارة من عدة أماكن ابتداءً من الأردن مثل الوكالات وشركات التأمين والدول المصدرة للسيارات مثل الولايات المتحدة الأمريكية، دول الخليج، الصين، أوروبا وكوريا. يتم التواصل أيضًا بشكل إلكتروني مع شركات متخصصة في جمع بيانات وسجلات السيارة والربط معها لتحصل على تقرير أوتوسكور الشامل على الفحص التقني والهندسي وأيضًا على سجلات الحوادث والصيانة وعدد المالكين وصفة الاستخدام.";
    
    // Convert API data to display format
    const convertedPoints = allPoints.map(point => ({
      label: point.name_ar,
      value: point.point_notes || "",
      status: point.point_passed ? "✅" : "❌",
      score_achieved: point.score_achieved?.toString() || "0.00",
      max_score: point.max_score?.toString() || "0.00",
      inspected_at: point.inspected_at || "",
      requires_immediate_attention: point.requires_immediate_attention || null
    }));

    // Create data sections based on API data
    const dataSections = createDataSectionsFromApi(convertedPoints);

    // Create optimized structure with API data
    const HistoryData = {
      itemes: [
        {
          title: processedData.serviceInfo?.name_ar || "التاريخ والسجلات",
          type: "details",
          carInfoo: {
            image: fallbackImage,
          },
          descriptionPoints: [serviceDescription],
          check: {
            historyDataImage: "https://via.placeholder.com/300x150",
            ...dataSections,
            carIamge: rallbackImage 
          }
        }
      ]
    };

    setHistoryData(HistoryData);
  }, []);

  // Process data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderActiveContent = () => {
    if (!historyData) return null;
    const currentData = historyData.itemes[0].check[activeFilter];
    return <DataSection data={currentData} title={activeFilter} />;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل بيانات التاريخ والسجلات...</p>
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
  if (!historyData) {
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
    <div id="التاريخ-والسجلات">
      <div className="space-y-4 mt-6">
        {historyData.itemes.map((item, idx) => (
          <Disclosure key={idx}>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <span className="font-medium dark:text-white">{item.title}</span>
                  <FaChevronDown
                    className={`transform transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </Disclosure.Button>
                
                <Disclosure.Panel className="px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700">
                  {item.type === "details" ? (
                    <div className="space-y-10">
                      {/* Information boxes */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Car image */}
                        <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow rounded-lg">
                          <img
                            src={item.carInfoo.image}
                            alt="Car"
                            className="w-100 h-100 object-contain mx-auto rounded-lg"
                          />
                        </div>
                        
                        {/* Description box */}
                        <div className="p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow rounded text-center">
                          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-2">
                            {item.descriptionPoints.map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>
                        </div>
  </div>

                      {/* Filter buttons */}
                      <FilterButtons 
                        activeFilter={activeFilter} 
                        setActiveFilter={setActiveFilter} 
                      />

                      {/* Data table */}
                      {renderActiveContent()}

                      {/* Damage report section */}
                      <div className="mb-4">
                        <div className="text-center p-2 rounded dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-lg mb-2">
                          أماكن الضرر حسب تقرير الكروكا
                        </div>
  <div className="p-4 bg-white dark:bg-gray-700 shadow rounded-lg max-w-md mx-auto">
    <img
                            src={item.check.carIamge}
      alt="Car"
      className="w-full h-auto object-contain rounded-lg"
    />
  </div>
</div>

                      {/* Notes section */}
<div className="p-2 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold text-base rounded">
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-100 space-y-1 text-sm">
    الملاحظات:
    <li>لم يتم التأكد من قراءة العداد الحالية لعدم توفر مصادر موثوقة لدى اوتوسكور وقت الفحص</li>
  </ul>
</div>
                 </div>
                  ) : (
                    <p>{item.content}</p>
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
</div>
  );
};

export default HistoryComponent;