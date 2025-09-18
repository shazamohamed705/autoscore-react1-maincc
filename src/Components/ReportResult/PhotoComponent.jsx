import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";

import { Disclosure, Label } from "@headlessui/react";
import { FaCarSide, FaCogs,FaUser, FaSnowflake, FaShieldAlt, FaBook, FaRuler, FaPlug, FaExclamationTriangle, FaCamera,FaChevronDown,FaInfoCircle,FaCheckCircle,FaCarBattery,FaOilCan} from "react-icons/fa";
import hallbackImage from "../../assets/immage3.png";
import ScreenGallery from "../ScreenGallery/ScreenGallery";

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
 * Process photo data specifically for photo inspection points
 * Optimized for better performance and reduced data consumption
 */
const processPhotoData = (data) => {
  if (!data) return null;

  // Handle API response structure
  const reportData = data.data || data;
  const report = Array.isArray(reportData) ? reportData[0] : reportData;


  // Try multiple ways to get points with images (same as Exsection)
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
  
  
  const allPointsWithPhotos = [];
  
  allPoints.forEach((point, index) => {
    if (index < 5) { // Log first 5 points for debugging
     
    }
    
    const evaluation = point.evaluation || {};
    
    // Process images - handle both array and JSON string formats (same as Exsection)
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

   

    if (processedImages.length > 0) {
      allPointsWithPhotos.push({
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
        service_name: point.service_name || " صور الفحص ",
        service_id: point.service_id || null
      });
    }
  });


  return {
    ...report,
    photoPoints: allPointsWithPhotos,
    totalPoints: allPointsWithPhotos.length
  };
};


const mapPhotoPoints = (points) => {
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
        service_name: p.service_name || "",
        service_id: p.service_id,
        id: p.id,
      };
    } catch (err) {
      console.warn("Error processing photo point:", err, p);
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
        service_name: p.service_name || "",
        service_id: p.service_id,
        id: p.id,
      };
    }
  });
};

/**
 * Group photo points by service for better organization
 */
const groupPhotoPointsByService = (points) => {
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

function PhotoComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationData = location.state;

  // Optimized state management
  const [openGallery, setOpenGallery] = useState(null);
  const [photosData, setPhotosData] = useState(null);
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
      const cacheKey = `photos_${navigationData?.reportNum || 'default'}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
    const processedData = processPhotoData(parsedData);
    processPhotosInspectionData(processedData);
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
            
        const processedData = processPhotoData(response.data);
        processPhotosInspectionData(processedData);
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
          
        const processedData = processPhotoData(targetReport);
        processPhotosInspectionData(processedData);
        } else if (navData?.data) {
          const processedData = processPhotoData(navData);
          processPhotosInspectionData(processedData);
        } else {
          const processedData = processPhotoData(navData);
          processPhotosInspectionData(processedData);
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

  const processPhotosInspectionData = useCallback((processedData) => {
    if (!processedData) {
      setError("لا توجد بيانات متاحة");
      return;
    }
    

    const allPoints = processedData.photoPoints || [];
   
    // Map points to display format
    const mappedPoints = mapPhotoPoints(allPoints);
    
    // Group points by service
    const groupedPoints = groupPhotoPointsByService(mappedPoints);
    
    // Create optimized structure with API data
    const PhotosData = {
      itemis: [
        {
          title: "صور الفحص",
          type: "details",
          carInformation: { image: hallbackImage },
          descriptionPoints1: [
            "يتم عرض جميع الصور الملتقطة أثناء عملية الفحص",
            "الصور مرتبة حسب الخدمات المختلفة",
            "يمكن عرض الصور في معرض كامل الشاشة",
            "كل صورة مصحوبة بتفاصيل النقطة المفحوصة"
          ],
          groupedPoints: groupedPoints,
          allPoints: mappedPoints
        },
      ],
    };

    setPhotosData(PhotosData);
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
          <p className="text-gray-600">جاري تحميل صور الفحص...</p>
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
  if (!photosData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaInfoCircle className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">لا توجد صور متاحة</p>
        </div>
      </div>
    );
  }

 
  return (
    <div id="صور-الفحص" >
       <div className="space-y-5 mt-6">
         <Disclosure>
           {({ open }) => (
             <>
              {/* زر الفتح والغلق */}
              <Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                 <span className="font-medium">{photosData.itemis[0].title}</span>
                 <FaChevronDown
                   className={`transform transition-transform ${
                     open ? "rotate-180" : ""
                   }`}
                 />
               </Disclosure.Button>

              {/* المحتوى */}
              <Disclosure.Panel className="px-3 py-2 md:px-4 md:py-3 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                 {/* عرض الصور حسب الخدمات */}
                 <div className="mt-6 space-y-8">
                   {Object.entries(photosData.itemis[0].groupedPoints).map(([serviceName, points]) => {
                   
                     return (
                       <div key={serviceName} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4 text-gray-800 dark:text-white">
                           {serviceName}
                         </h3>
                         
                         {/* عرض الصور في شبكة */}
                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                           {points.map((point, pointIdx) => {
                             return point.gallery && point.gallery.length > 0 ? (
                               point.gallery.map((image, imgIdx) => {
                                 return (
                                <div key={`${pointIdx}-${imgIdx}`} className="relative">
                                     <img
                                       src={image.src}
                                       alt={image.title || point.label}
                                      className="w-full h-36 sm:h-44 md:h-48 lg:h-56 object-cover rounded-lg shadow cursor-pointer hover:opacity-80 transition-opacity"
                                      onClick={() => {
                                         setOpenGallery({
                                          images: point.gallery,
                                               currentIndex: imgIdx
                                               });
                                              }}

                                       onError={(e) => {
                                         e.target.src = hallbackImage;
                                       }}
                                       onLoad={() => {
                                       }}
                                       loading="lazy"
                                     />
                                   </div>
                                 );
                               })
                             ) : null;
                           })}
                         </div>
                       </div>
                     );
                   })}
                 </div>
               </Disclosure.Panel>
             </>
           )}
         </Disclosure>
       </div>

       {openGallery && (
  <ScreenGallery
    images={openGallery.images}
    currentIndex={openGallery.currentIndex}
    onClose={() => setOpenGallery(null)}
  />
)}


    </div>
  );
}

export default PhotoComponent;
