import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { FaInfoCircle, FaChevronDown } from "react-icons/fa";
import { Disclosure } from "@headlessui/react";
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
 * Process notes data specifically for inspection points
 * Optimized for better performance and reduced data consumption
 */
const processNotesData = (data) => {
  if (!data) return null;

  // Handle API response structure
  const reportData = data.data || data;
  const report = Array.isArray(reportData) ? reportData[0] : reportData;


  // Try multiple ways to get points with notes
  let allPoints = [];
  
  // Method 1: Try to get points from services first
  if (report.services && report.services.length > 0) {
    report.services.forEach(service => {
      if (service.points && service.points.length > 0) {
        allPoints = allPoints.concat(service.points);
      }
    });
  }
  
  // Method 2: If no points from services, try inspection_points
  if (allPoints.length === 0 && report.inspection_points && Array.isArray(report.inspection_points)) {
    allPoints = report.inspection_points;
  }
  
  const allPointsWithNotes = [];
  
  allPoints.forEach((point) => {
    
    const evaluation = point.evaluation || {};
    

    // Check if point has notes (instead of images)
    const pointNotes = evaluation.notes || point.point_notes || "";
    const pointExplanation = point.explanation_ar || point.point?.explanation_ar || "";
    
    if (pointNotes || pointExplanation) {
      allPointsWithNotes.push({
        id: point.id,
        name_ar: point.name_ar || point.point?.name_ar || "نقطة غير محددة",
        name_en: point.name_en || point.point?.name_en || "",
        explanation_ar: pointExplanation,
        explanation_en: point.explanation_en || point.point?.explanation_en || "",
        score_achieved: parseFloat(evaluation.score_achieved || point.score_achieved || 0),
        max_score: parseFloat(evaluation.max_score || point.max_score || 0),
        point_condition: evaluation.point_condition || point.point_condition || "",
        point_passed: evaluation.passed ?? point.point_passed ?? false,
        point_notes: pointNotes,
        inspected_at: evaluation.inspected_at || "",
        service_name: point.service_name || "خدمة غير محددة",
        service_id: point.service_id || null
      });
    }
  });

  return {
    ...report,
    photoPoints: allPointsWithNotes,
    totalPoints: allPointsWithNotes.length
  };
};

/**
 * Optimized status icon logic - moved outside for better performance
 */
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


/**
 * Process points data for notes display
 * Optimized for better performance and memory efficiency
 */
const processPointsData = (points) => {
  if (!Array.isArray(points) || points.length === 0) return [];
  
  return points.map((point) => {
    try {
      return {
        label: point.name_ar || point.name_en || "نقطة غير محددة",
        Stats: getStatusIcon(point.point_condition, point.point_passed, point.score_achieved, point.max_score),
        info: point.explanation_ar || point.explanation_en || "",
        point_condition: point.point_condition,
        point_passed: ["true", true, 1, "1"].includes(point.point_passed),
        score_achieved: parseFloat(point.score_achieved) || 0,
        max_score: parseFloat(point.max_score) || 0,
        point_notes: point.point_notes || "",
        inspected_at: point.inspected_at || "",
        service_name: point.service_name || "",
        service_id: point.service_id,
        id: point.id,
      };
    } catch (err) {
      console.warn("Error processing point:", err, point);
      return {
        label: point.name_ar || point.name_en || "نقطة غير محددة",
        Stats: "❌",
        info: "",
        point_condition: "failed",
        point_passed: false,
        score_achieved: 0,
        max_score: 0,
        point_notes: "",
        service_name: point.service_name || "",
        service_id: point.service_id,
        id: point.id,
      };
    }
  });
};

/**
 * Group points by service for better organization
 */
const groupPointsByService = (points) => {
  const grouped = {};
  
  points.forEach(point => {
    const serviceName = point.service_name || "خدمة غير محددة";
    if (!grouped[serviceName]) {
      grouped[serviceName] = [];
    }
    grouped[serviceName].push(point);
  });
  
  return grouped;
};

function NotesData() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationData = location.state;

  // Optimized state management
  const [notesData, setNotesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedToken = localStorage.getItem("token");

  /**
   * Optimized fetch and process data from API with caching and memory management
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
      const cacheKey = `photos_${navigationData?.reportNum || 'default'}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          const processedData = processNotesData(parsedData);
          processNotesInspectionData(processedData);
          setIsLoading(false);
          return;
        } catch (parseError) {
          console.warn("Cache parse error, clearing cache:", parseError);
          sessionStorage.removeItem(cacheKey);
        }
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
            // Cache the response with size limit
            const responseString = JSON.stringify(response.data);
            if (responseString.length < 5 * 1024 * 1024) { // 5MB limit
              sessionStorage.setItem(cacheKey, responseString);
            }
            
            const processedData = processNotesData(response.data);
            processNotesInspectionData(processedData);
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
          
          const processedData = processNotesData(targetReport);
          processNotesInspectionData(processedData);
        } else if (navData?.data) {
          const processedData = processNotesData(navData);
          processNotesInspectionData(processedData);
        } else {
          const processedData = processNotesData(navData);
          processNotesInspectionData(processedData);
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
   * Process notes data from processed inspection data with memory optimization
   */
  const processNotesInspectionData = useCallback((processedData) => {
    if (!processedData) {
      setError("لا توجد بيانات متاحة");
      return;
    }

    const allPoints = processedData.photoPoints || [];
    
    // Early return if no points
    if (allPoints.length === 0) {
      setError("لا توجد ملاحظات متاحة");
      return;
    }
    
    // Process points data with memory optimization
    const processedPoints = processPointsData(allPoints);
    
    // Group points by service
    const groupedPoints = groupPointsByService(processedPoints);
    
    // Create optimized structure with minimal memory footprint
    const NotesData = {
      itemis: [
        {
          title: "ملاحظات الفحص",
          type: "details",
          carInformation: { image: hallbackImage },
          descriptionPoints1: [
            "يتم عرض جميع الملاحظات المكتوبة أثناء عملية الفحص",
            "الملاحظات مرتبة حسب الخدمات المختلفة",
            "كل ملاحظة مصحوبة بتفاصيل النقطة المفحوصة",
            "تشمل الملاحظات التفاصيل والتوضيحات المهمة"
          ],
          groupedPoints: groupedPoints,
          allPoints: processedPoints
        }
      ]
    };

    setNotesData(NotesData);
  }, []);

  // Process data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);



  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل ملاحظات الفحص...</p>
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
  if (!notesData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaInfoCircle className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">لا توجد ملاحظات متاحة</p>
        </div>
      </div>
    );
  }


  return (
    <div id="ملاحظات-الفحص" className="space-y-5 mt-6">
      <Disclosure>
        {({ open }) => (
          <>
                <Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
              <span>ملاحظات الفحص</span>
              <FaChevronDown
                                  className={`transform transition-transform ${open ? "rotate-180" : ""}`}
                                />
            </Disclosure.Button>
          <Disclosure.Panel className="px-4 py-2 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            
              <ul className="list-disc list-inside space-y-2">
                {notesData.itemis.map((item) => 
                  Object.entries(item.groupedPoints).map(([serviceName, points]) => 
                    points.map((point, pointIdx) => {
                      return point.point_notes ? (
                        <li key={`${serviceName}-${pointIdx}`} className="text-gray-700 dark:text-gray-200">
                          {point.point_notes}
                        </li>
                      ) : null;
                    })
                  )
                )}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default NotesData;
  