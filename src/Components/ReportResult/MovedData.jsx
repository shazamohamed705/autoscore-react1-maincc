import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Disclosure, Label } from "@headlessui/react";
import {

   FaChevronDown, FaInfoCircle,
  FaCheckCircle, FaCarBattery, FaOilCan, FaSpinner
} from "react-icons/fa";


import iallbackImage from '../../assets/iicar.png'

import ScreenGallery from "../ScreenGallery/ScreenGallery";
import axios from "axios";

function MoveData() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationData = location.state;

  // State management
  const [openInfoIndex, setOpenInfoIndex] = useState(null);
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("powerTrainAll");
  const [moveData, setMoveData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Process power train data from API
  const processPowerTrainData = useCallback((data) => {
    if (!data) return null;

    const reportData = data.data || data;
    const report = Array.isArray(reportData) ? reportData[0] : reportData;


    // Get points from the API response - updated to handle the new structure
    const allPoints = report.points || report.powerTrain?.points || report.inspection_points || report.inspection_reports_points || [];


    const processedPoints = allPoints.map((point) => {
      const evaluation = point.evaluation || {};
      return {
        id: point.id,
        name_ar: point.name_ar || point.point?.name_ar || "نقطة غير محددة",
        name_en: point.name_en || point.point?.name_en || "",
        explanation_ar: point.explanation_ar || point.point?.explanation_ar || "",
        explanation_en: point.explanation_en || point.point?.explanation_en || "",
        score_achieved: parseFloat(point.score_achieved || evaluation.score_achieved || 0),
        max_score: parseFloat(point.max_score || evaluation.max_score || 0),
        point_condition: point.point_condition || evaluation.point_condition || "",
        point_passed: point.point_passed ?? evaluation.passed ?? false,
        point_notes: point.point_notes || evaluation.notes || "",
        point_images: point.point_images || evaluation.images || [],
        evaluation: evaluation,
      };
    });

    return {
      ...report,
      powerTrainPoints: processedPoints,
      totalPoints: processedPoints.length,
      passedPoints: processedPoints.filter((p) => p.point_passed).length,
      failedPoints: processedPoints.filter((p) => !p.point_passed).length,
    };
  }, []);

  // Map points to display format
  const mapPowerTrainPoints = useCallback((points) => {
    if (!Array.isArray(points) || points.length === 0) return [];
    
    return points.map((p) => {
      const getStatusIcon = (condition, passed, scoreAchieved, maxScore) => {
        const isPassed = ["true", true, 1, "1"].includes(passed);
        if (isPassed) return "✅";
        
        const cond = (condition || "").toLowerCase();
        if (cond === "excellent" || cond === "very_good") return "✅";
        if (cond === "good" || cond === "acceptable") return "⚠️";
        if (cond === "poor" || cond === "failed") return "❌";
        
        // Fallback to score-based logic
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
        gallery = p.point_images.map((img) => ({
          src: typeof img === 'string' ? img : img.src || img.url || '',
        
          title: p.name_ar || "صورة الفحص",
          subtitle: p.explanation_ar || "",
        })).filter(img => img.src && img.src.trim() !== '');
      }
      
      // Also check evaluation.images if point_images is empty
      if (gallery.length === 0 && p.evaluation && p.evaluation.images && Array.isArray(p.evaluation.images) && p.evaluation.images.length > 0) {
        gallery = p.evaluation.images.map((img) => ({
          src: typeof img === 'string' ? img : img.src || img.url || '',
          title: p.name_ar || "صورة الفحص",
          subtitle: p.explanation_ar || "",
        })).filter(img => img.src && img.src.trim() !== '');
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
      };
    });
  }, []);

  // Distribute points across different filters
  const distributePowerTrainPoints = useCallback((points) => {
    if (!Array.isArray(points) || points.length === 0) {
      return {
        powerTrainAll: [],
        batterySystem: [],
        enginePerformance: [],
        transmissionSystem: [],
        hybridSystem: [],
        fluidLeaks: [],
        troubleCodes: [],
        diagnosticTests: [],
        coolingSystem: []
      };
    }

    const distributed = {
      powerTrainAll: [], 
      batterySystem: [],
      enginePerformance: [],
      transmissionSystem: [],
      hybridSystem: [],
      fluidLeaks: [],
      troubleCodes: [],
      diagnosticTests: [],
      coolingSystem: []
    };

    // Optimized distribution using single loop
    points.forEach((point) => {
      const nameAr = point.name_ar?.toLowerCase() || "";
      const nameEn = point.name_en?.toLowerCase() || "";
      
      // Add to powerTrainAll only if it's Power-Train related
      const isPowerTrainRelated = 
        nameAr.includes("البطارية الرئيسية") || nameAr.includes("كفاءة و اداء المحرك") || nameAr.includes("اختبار غيارات  و أداء الجير") || 
        nameAr.includes("نظام الهايبرد") || nameAr.includes("فحص تهريب الزيوت") ||
        nameAr.includes("اختبار اعطال المحرك باجهزة الفحص") || nameAr.includes("اختبار اعطال الجير باجهزة الفحص");
      
      if (isPowerTrainRelated) {
        distributed.powerTrainAll.push(point);
      }
      
      // Categorize based on exact names from data
      if (nameAr.includes("البطارية الرئيسية")) {
        distributed.batterySystem.push(point);
      }
      
      if (nameAr.includes("كفاءة و اداء المحرك")) {
        distributed.enginePerformance.push(point);
      }
      
      if (nameAr.includes("اختبار غيارات  و أداء الجير")) {
        distributed.transmissionSystem.push(point);
      }
      
      if (nameAr.includes("نظام الهايبرد")) {
        distributed.hybridSystem.push(point);
      }
      
      if (nameAr.includes("فحص تهريب الزيوت")) {
        distributed.fluidLeaks.push(point);
      }
      
      if (nameAr.includes("اختبار اعطال المحرك باجهزة الفحص")) {
        distributed.troubleCodes.push(point);
      }
      
      if (nameAr.includes("اختبار اعطال الجير باجهزة الفحص")) {
        distributed.diagnosticTests.push(point);
      }
    });

    return distributed;
  }, []);

  // Fetch data from API
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
            const processedData = processPowerTrainData(response.data);
            processMoveData(processedData);
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
          
          const processedData = processPowerTrainData(targetReport);
          processMoveData(processedData);
        } else if (navData?.data) {
          const processedData = processPowerTrainData(navData);
          processMoveData(processedData);
        } else {
          const processedData = processPowerTrainData(navData);
          processMoveData(processedData);
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
  }, [navigationData, processPowerTrainData]);

  // Process move data
  const processMoveData = useCallback((processedData) => {
    if (!processedData) {
      setError("لا توجد بيانات متاحة");
      return;
    }
    

    const allPoints = processedData.powerTrainPoints || [];
    const distributedPoints = distributePowerTrainPoints(allPoints);
    
    const mappedControl = {
      powerTrainAll: mapPowerTrainPoints(distributedPoints.powerTrainAll),
      batterySystem: mapPowerTrainPoints(distributedPoints.batterySystem),
      enginePerformance: mapPowerTrainPoints(distributedPoints.enginePerformance),
      transmissionSystem: mapPowerTrainPoints(distributedPoints.transmissionSystem),
      hybridSystem: mapPowerTrainPoints(distributedPoints.hybridSystem),
      fluidLeaks: mapPowerTrainPoints(distributedPoints.fluidLeaks),
      troubleCodes: mapPowerTrainPoints(distributedPoints.troubleCodes),
      diagnosticTests: mapPowerTrainPoints(distributedPoints.diagnosticTests),
      coolingSystem: mapPowerTrainPoints(distributedPoints.coolingSystem),
      carImagee: iallbackImage,
    };

    // Use the description from the API data if available
    const descriptionFromAPI = processedData.description_ar || processedData.brief_ar || "";
    const descriptionPoints = descriptionFromAPI ? 
      descriptionFromAPI.split('\n').filter(line => line.trim()) : [
        "أوتوسكور متخصص بفحص السيارات الكهربائية و الهجينة الهايبرد التي تعمل على الطاقة الكهربائية و يرجع الفضل الى الخبراء و المهندسين المختصين و الأجهزة و التقنيات المعتمدة من شركة بوش Bosch الالمانية",
        "يغطي هذا القسم النقاط التالية :",
        "فحص جميع الأنظمة الكترونيا",
        "فحص البطارية الرئيسية و كفاءتها و عمرها التشغيلي",
        "المحرك الكهربائي و اجزاءه",
        "المحول الكهربائي",
        "أنظمة الشحن",
        "أنظمة التبريد",
        "ملاحظة هامة : يتم الفحص دون أي ذكر أو مقارنة مع مصطلحات الفحص التقليدية ( مثل جيد ، مضروب ، ضربة بنكيت ، قصعة ، دقة.. الخ )"
      ];

    const Move = {
      itimis1: [
        {
          title: processedData.name_ar || "المحرك وناقل الحركة",
          type: "details",
          carInformation1: {
            images: [iallbackImage]
          },
          descriptionPoints3: descriptionPoints,
          Power: mappedControl,
        },
      ],
    };

    setMoveData(Move);
  }, [distributePowerTrainPoints, mapPowerTrainPoints]);

  // Process data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = () => setOpenInfoIndex(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل بيانات المحرك وناقل الحركة...</p>
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
  if (!moveData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaInfoCircle className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">لا توجد بيانات متاحة</p>
        </div>
      </div>
    );
  }

  const Move = moveData;

  return (
    <div id="المحرك-ناقل-الحركه">
      <div className="space-y-5 mt-6">
        {Move.itimis1.map((item, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <span>{item.title}</span>
                  <FaChevronDown
                    className={`transform transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 py-2 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* صورة السيارة */}
                    <div className="flex flex-col items-center justify-center p-4 md:p-6 shadow rounded-lg">
                      {item.carInformation1.images.map((img, i) => (
                        <img key={i} src={img} alt={`car ${i}`} className="w-full h-auto max-h-72 md:max-h-none object-contain" />
                      ))}
                    </div>

                    {/* نصوص الوصف */}
                    <div className="p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">
                        {item.descriptionPoints3.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex flex-wrap gap-2 md:gap-3 mt-6">
                      {[
                        { key: "powerTrainAll", label: "جميع نقاط الفحص" },
                        { key: "batterySystem", label: "البطارية الرئيسية" },
                        { key: "enginePerformance", label: "كفاءة و اداء المحرك" },
                        { key: "transmissionSystem", label: "اختبار غيارات  و أداء الجير" },
                        { key: "hybridSystem", label: "نظام الهايبرد" },
                        { key: "fluidLeaks", label: "فحص تهريب الزيوت" },
                       
                      ].map((btn) => (
                        <button
                          key={btn.key}
                           onClick={() => setSelectedCategory(btn.key)}
                           className={`px-3 py-1.5 md:px-4 md:py-2 rounded text-sm md:text-base transition-colors duration-200 ${
                             selectedCategory === btn.key
                              ? "bg-blue-500 text-white dark:bg-blue-600"
                              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                          }`}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>

                    {/* Filter Content */}
                     {["powerTrainAll", "batterySystem", "enginePerformance", "transmissionSystem", "hybridSystem", "fluidLeaks", "troubleCodes", "diagnosticTests"].includes(selectedCategory) && (
                      (() => {
                        const currentData = item.Power[selectedCategory] || [];
                        const cols = [
                          currentData.slice(0, Math.ceil(currentData.length / 2)),
                          currentData.slice(Math.ceil(currentData.length / 2))
                        ];

                        return (
                          <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-16 gap-y-6 md:gap-y-10">
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
                                          <span className="text-black dark:text-white text-sm md:text-base font-medium">
                                            {row.label}
                                          </span>
                                        </div>

                                        <span
                                          className={`font-bold text-sm md:text-base ${
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

                                      {/* Show point notes if available */}
                                      {row.point_notes && (
                                        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300">
                                          <strong>ملاحظات:</strong> {row.point_notes}
                                        </div>
                                      )}

                                      {/* thumbnails الصور */}
                                      {row.gallery && row.gallery.length > 0 && (
                                        <div className="mt-3">
                                          <img
                                            src={row.gallery[0].src}
                                            alt={row.label}
                                            className="w-24 h-20 md:w-32 md:h-24 object-cover rounded-lg shadow cursor-pointer hover:opacity-80"
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
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>

      {/* عرض ScreenGallery لو متفتح */}
      {openGallery && (
        <ScreenGallery
          images={openGallery.images}
          startIndex={openGallery.start}
          onClose={() => setOpenGallery(null)}
        />
      )}
    </div>
  );
}

export default MoveData; 