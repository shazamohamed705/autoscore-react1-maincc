import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import GaugeChart from "react-gauge-chart";
import { Disclosure } from "@headlessui/react";
import { 
  FaCarSide, FaCogs, FaShieldAlt, FaCamera, FaChevronDown, 
  FaInfoCircle, FaCheckCircle, FaTimes, FaImages, FaExpand
} from "react-icons/fa";
import image55 from "../../assets/image55.png"
import ScreenGallery from "../ScreenGallery/ScreenGallery";
// Constants moved outside component to prevent recreation
const GRADES = [
  { label: "F", range: [0, 40], color: "bg-red-500", textColor: "text-red-500" },
  { label: "D", range: [40, 50], color: "bg-purple-500", textColor: "text-purple-500" },
  { label: "C", range: [50, 60], color: "bg-orange-500", textColor: "text-orange-500" },
  { label: "B", range: [60, 70], color: "bg-gray-600", textColor: "text-gray-600" },
  { label: "B+", range: [70, 80], color: "bg-yellow-400", textColor: "text-yellow-400" },
  { label: "A", range: [80, 90], color: "bg-green-500", textColor: "text-green-500" },
  { label: "A+", range: [90, 100], color: "bg-blue-600", textColor: "text-blue-600" },
];

const INSPECTION_SECTIONS = [
  { name: "الهيكل الخارجي", key: "الهيكل الخارجي", icon: FaCarSide },
  { name: "المحرك وناقل الحركة", key: "المحرك وناقل الحركة", icon: FaCogs },
  { name: "الشاصي والهيكل", key: "الشاصي والهيكل", icon: FaCogs },
  { name: "نظام التعليق والتوجيه", key: "نظام التعليق والتوجيه", icon: FaCarSide },
  { name: "النظام الكهربائي", key: "النظام الكهربائي", icon: FaShieldAlt },
];

const FEATURES = [
  "شحن لاسلكي", "كراسي مبردة", "كراسي مدفئة", "كراسي جلد",
  "شاشة أمامية", "عدادات ديجيتال", "الدخول بدون مفتاح (بصمة)",
  "تتبع المسار", "النقطة العمياء", "أضوية LED", "كاميرا خلفية",
  "كاميرا 360 درجة", "سقف بانوراما", "نظام صوتي", "تحكم ستيرنج",
  "مثبت سرعة", "حساسات أمامية", "حساسات خلفية", "بصمة تشغيل",
  "نظام الرادار", "تنبيه التصادم", "كراسي كهربائي",
];


// Manufacturer name translation map for better display
const MANUFACTURER_TRANSLATIONS = {
  'Kia': 'كيا',
  'Hyundai': 'هيونداي',
  'Toyota': 'تويوتا',
  'Honda': 'هوندا',
  'Nissan': 'نيسان',
  'Mazda': 'مازدا',
  'Suzuki': 'سوزوكي',
  'Mitsubishi': 'ميتسوبيشي',
  'Subaru': 'سوبارو',
  'Lexus': 'لكزس',
  'Infiniti': 'إنفينيتي',
  'Acura': 'أكورا',
  'Genesis': 'جينيسيس',
  'BMW': 'بي إم دبليو',
  'Mercedes-Benz': 'مرسيدس بنز',
  'Audi': 'أودي',
  'Volkswagen': 'فولكس واجن',
  'Porsche': 'بورش',
  'Jaguar': 'جاكوار',
  'Land Rover': 'لاند روفر',
  'Range Rover': 'رينج روفر',
  'Mini': 'ميني',
  'Smart': 'سمارت',
  'Ford': 'فورد',
  'Chevrolet': 'شيفروليه',
  'Cadillac': 'كاديلاك',
  'Lincoln': 'لينكولن',
  'Buick': 'بويك',
  'GMC': 'جي إم سي',
  'Chrysler': 'كرايسلر',
  'Dodge': 'دودج',
  'Jeep': 'جيب',
  'RAM': 'رام',
  'Fiat': 'فيات',
  'Alfa Romeo': 'ألفا روميو',
  'Maserati': 'مازيراتي',
  'Ferrari': 'فيراري',
  'Lamborghini': 'لامبورغيني',
  'Bentley': 'بنتلي',
  'Rolls-Royce': 'رولز رويس',
  'Aston Martin': 'أستون مارتن',
  'McLaren': 'ماكلارين',
  'Tesla': 'تسلا',
  'Lotus': 'لوتس',
  'Bugatti': 'بوجاتي',
  'Pagani': 'باغاني',
  'Koenigsegg': 'كويجسيج'
};

// Function to translate manufacturer names
const translateManufacturerName = (manufacturerName) => {
  if (!manufacturerName || typeof manufacturerName !== 'string') return '';
  
  const trimmedName = manufacturerName.trim();
  const translation = MANUFACTURER_TRANSLATIONS[trimmedName];
  return translation || trimmedName;
};

// Function to get manufacturer name from ID (fallback method)
const getManufacturerNameFromId = (manufacturerId) => {
  if (!manufacturerId) return '';
  
  // This is a fallback mapping - in real implementation, this should come from API
  const idMap = {
    1: 'كيا',
    2: 'هيونداي', 
    3: 'تويوتا',
    4: 'هوندا',
    5: 'نيسان',
    6: 'مازدا',
    7: 'سوزوكي',
    8: 'ميتسوبيشي',
    9: 'سوبارو',
    10: 'لكزس',
    11: 'إنفينيتي',
    12: 'أكورا',
    13: 'جينيسيس',
    14: 'بي إم دبليو',
    15: 'مرسيدس بنز',
    16: 'أودي',
    17: 'فولكس واجن',
    18: 'بورش',
    19: 'جاكوار',
    20: 'لاند روفر'
  };
  
  return idMap[manufacturerId] || '';
};

// Optimized data processing functions for new API structure with memoization
// This function processes DYNAMIC inspection data from API - NOT static data
// Each report will have different inspection points, scores, and vehicle information
const processInspectionDataCache = new Map();

// Optimized function to extract inspection images from new API structure
const extractInspectionImages = (reportData, navigationData) => {
  // Priority 1: Check for images in the new API structure (data.inspection_images)
  const inspectionImages = reportData?.data?.inspection_images || reportData?.inspection_images || [];

  // Priority 2: Check navigation data for images - NEW STRUCTURE
  const navigationImages = navigationData?.report?.inspection_images || 
                          navigationData?.searchResults?.[0]?.inspection_images ||
                          navigationData?.searchResults?.[0]?.data?.inspection_images || [];

  // Priority 3: Check for images in the root of the data object
  const rootImages = reportData?.inspection_images || [];

  // Priority 4: Check for images in the original data structure from the user's example
  // The user provided data shows images are in data.inspection_images directly
  const originalDataImages = navigationData?.data?.inspection_images || [];
  
  // Priority 5: Check for images in searchResults (based on logs)
  const searchResultImages = navigationData?.searchResults?.[0]?.inspection_images || [];

  // Combine all sources with priority order
  const allImages = inspectionImages.length > 0 ? inspectionImages : 
                   originalDataImages.length > 0 ? originalDataImages :
                   searchResultImages.length > 0 ? searchResultImages :
                   navigationImages.length > 0 ? navigationImages : 
                   rootImages;

  // Development logging for debugging
  if (process.env.NODE_ENV === 'development') {
 
    if (allImages.length > 0) {
    }
  }

  return allImages;
};

const processInspectionData = (data) => {
  if (!data) return null;
  
  // Use cache to avoid reprocessing same data
  const cacheKey = JSON.stringify(data);
  if (processInspectionDataCache.has(cacheKey)) {
    return processInspectionDataCache.get(cacheKey);
  }
  
  // Handle the new API structure - data is directly in the root
  let reportData = data;
  let points = [];
  
  // Debug: Check all possible locations for inspection_images
  if (process.env.NODE_ENV === 'development') {
   
  }
  
 
  if (data.inspection_images && Array.isArray(data.inspection_images) && data.inspection_images.length > 0) {
    reportData.inspection_images = data.inspection_images;
    if (process.env.NODE_ENV === 'development') {
     
    }
  } else if (data.data && data.data.inspection_images && Array.isArray(data.data.inspection_images) && data.data.inspection_images.length > 0) {
    reportData.inspection_images = data.data.inspection_images;
    if (process.env.NODE_ENV === 'development') {
      ;
    }
  } else {
    // If no images found, set empty array to avoid undefined
    reportData.inspection_images = [];
    if (process.env.NODE_ENV === 'development') {
    }
  }
  
  // Handle vehicle data from the new API structure
  if (data.data && data.data.vehicle) {
    reportData.vehicle = data.data.vehicle;
    if (process.env.NODE_ENV === 'development') {
    }
  }
  
  // Handle vehicle contact data from the new API structure
  if (data.data && data.data.vehicle_contact) {
    reportData.vehicle_contact = data.data.vehicle_contact;
    if (process.env.NODE_ENV === 'development') {
    }
  }
  
  // Extract points from different possible locations with improved handling
  if (reportData.inspection_reports_points) {
    points = reportData.inspection_reports_points;
  } else if (reportData.services && Array.isArray(reportData.services)) {
    // Extract points from services structure (new API format)
    reportData.services.forEach(service => {
      if (service.points && Array.isArray(service.points)) {
        // Add service information to each point for better organization
        service.points.forEach(point => {
          points.push({
            ...point,
            service_id: service.id,
            service_name_ar: service.name_ar,
            service_name_en: service.name_en
          });
        });
      }
    });
  }
  
  // Optimized service scores calculation with better performance
  const serviceScores = {};
  
  // Process points by service for better organization with memoization
  const processedPoints = new Map(); // Cache for processed points
  
  points.forEach(point => {
    // Get service ID from point or service context
    const serviceId = point.service_id || point.point?.services_id || point.services_id || point.id;
    
    // Initialize service data if not exists
    if (!serviceScores[serviceId]) {
      serviceScores[serviceId] = { 
        total: 0, 
        max: 0, 
        passed: 0, 
        count: 0,
        points: [],
        service_name_ar: point.service_name_ar || '',
        service_name_en: point.service_name_en || ''
      };
    }
    
    // Use cached processed point if available
    const pointKey = `${point.id}_${serviceId}`;
    let processedPoint;
    
    if (processedPoints.has(pointKey)) {
      processedPoint = processedPoints.get(pointKey);
    } else {
      // Extract evaluation data with improved fallbacks
      const evaluation = point.evaluation || {};
      const scoreAchieved = Number(evaluation.score_achieved || point.score_achieved || 0);
      const maxScore = Number(evaluation.max_score || point.max_score || 0);
      const passed = evaluation.passed !== undefined ? evaluation.passed : point.point_passed;
      const notes = evaluation.notes || point.point_notes || point.point_condition;
      const requiresAttention = evaluation.requires_immediate_attention || point.requires_immediate_attention;
      
      processedPoint = {
        id: point.id,
        name_ar: point.name_ar || point.point?.name_ar,
        name_en: point.name_en || point.point?.name_en,
        explanation_ar: point.explanation_ar,
        explanation_en: point.explanation_en,
        score_achieved: scoreAchieved,
        max_score: maxScore,
        point_condition: notes,
        point_passed: passed,
        point_notes: notes,
        inspected_at: evaluation.inspected_at,
        requires_immediate_attention: requiresAttention,
        // Images from evaluation if available
        point_images: evaluation.images || point.point_images || []
      };
      
      processedPoints.set(pointKey, processedPoint);
    }
    
    // Update service statistics
    serviceScores[serviceId].total += processedPoint.score_achieved;
    serviceScores[serviceId].max += processedPoint.max_score;
    serviceScores[serviceId].count += 1;
    if (processedPoint.point_passed) serviceScores[serviceId].passed += 1;
    
    // Store optimized point details
    serviceScores[serviceId].points.push(processedPoint);
  });
  
  // Optimized overall statistics calculation
  const totalScore = points.reduce((sum, point) => {
    const evaluation = point.evaluation || {};
    const score = Number(evaluation.score_achieved || point.score_achieved) || 0;
    return sum + score;
  }, 0);
  
  const maxPossibleScore = points.reduce((sum, point) => {
    const evaluation = point.evaluation || {};
    const maxScore = Number(evaluation.max_score || point.max_score) || 0;
    return sum + maxScore;
  }, 0);
  
  const overallPercentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

  const result = {
    ...reportData,
    serviceScores,
    totalPoints: points.length,
    passedPoints: points.filter(p => p.evaluation?.passed || p.point_passed).length,
    failedPoints: points.filter(p => !(p.evaluation?.passed || p.point_passed)).length,
    totalScore,
    maxPossibleScore,
    calculatedPercentage: overallPercentage,
    
    total_score: reportData.total_score || data.total_score || totalScore,
    max_possible_score: reportData.max_possible_score || data.max_possible_score || maxPossibleScore,
    percentage_score: reportData.percentage_score || reportData.percentage || data.percentage || overallPercentage,
    grade: reportData.grade || data.grade,
    // Ensure inspection_images is properly processed with priority handling
    inspection_images: reportData.inspection_images || data.inspection_images || [],
    // Ensure vehicle data is properly processed
    vehicle: reportData.vehicle || data.data?.vehicle,
    vehicle_contact: reportData.vehicle_contact || data.data?.vehicle_contact
  };
  
  // Cache the result with size limit to prevent memory issues
  if (processInspectionDataCache.size > 50) {
    const firstKey = processInspectionDataCache.keys().next().value;
    processInspectionDataCache.delete(firstKey);
  }
  processInspectionDataCache.set(cacheKey, result);
  return result;
};

// Utility functions - optimized
const getStatusColor = (status) => {
  const colorMap = {
    success: "border-green-500",
    warning: "border-yellow-500", 
    error: "border-red-500",
    pending: "border-gray-400",
    neutral: "border-gray-300"
  };
  return colorMap[status] || colorMap.neutral;
};

const formatDate = (dateString) => {
  if (!dateString) return new Date().toLocaleDateString('ar-SA');
  return new Date(dateString).toLocaleDateString('ar-SA');
};

// Optimized image URL builder with caching and error handling
const imageCache = new Map();
const buildImageSrc = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') return '';
  
  // Check cache first for better performance
  if (imageCache.has(imagePath)) {
    return imageCache.get(imagePath);
  }
  
  // Handle different URL formats more efficiently
  let fullUrl;
  if (imagePath.startsWith('http')) {
    fullUrl = imagePath;
  } else if (imagePath.startsWith('/')) {
    fullUrl = `https://cd-root.com${imagePath}`;
  } else {
    fullUrl = `https://cd-root.com/syarahplus/backend/storage/app/public/${imagePath}`;
  }
    
  // Cache the result with size limit to prevent memory issues
  if (imageCache.size > 100) {
    const firstKey = imageCache.keys().next().value;
    imageCache.delete(firstKey);
  }
  imageCache.set(imagePath, fullUrl);
  return fullUrl;
};


const processImages = (images) => {
  if (!images || !Array.isArray(images)) return [];
  
  return images
    .filter(img => img && typeof img === 'string' && img.trim().length > 0)
    .map((img, index) => ({
      src: buildImageSrc(img), // Dynamic image URL from API
      loading: 'lazy',
      alt: `صورة الفحص ${index + 1}`,
      onError: (e) => {
        e.target.src = '/car1.png'; // Fallback image only on error
        e.target.onerror = null; // Prevent infinite loop
        console.warn(`Failed to load image: ${img}`);
      }
    }));
};

// Removed multi-source image extraction to rely strictly on `inspection_images` from API

const getInspectionStatus = (status, percentage) => {
  if (status === "pending") return "pending";
  if (percentage >= 60) return "success";
  if (percentage >= 40) return "warning";
  return "error";
};

// Memoized components for better performance
const StatusDisplay = React.memo(({ status, score }) => {
  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center">
        <FaCheckCircle className="text-green-500 text-2xl sm:text-3xl mb-2" />
        <span className="font-bold text-green-600 text-sm sm:text-base">ناجحة</span>
        <span className="text-xs sm:text-sm text-gray-500 mt-1">ممتازة</span>
      </div>
    );
  }
  
  if (status === "warning") {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-yellow-100 border-4 border-yellow-500 text-yellow-600 font-bold text-3xl sm:text-4xl shadow-md">
          C
        </div>
        <span className="mt-2 text-yellow-600 font-semibold text-sm sm:text-base">تحتاج صيانة</span>
        <span className="text-xs sm:text-sm text-gray-500 mt-1">متوسطة</span>
      </div>
    );
  }
  
  if (status === "error") {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-red-100 border-4 border-red-500 text-red-600 font-bold text-3xl sm:text-4xl shadow-md">
          F
        </div>
        <span className="mt-2 text-red-600 font-semibold text-sm sm:text-base">غير ناجحة</span>
        <span className="text-xs sm:text-sm text-gray-500 mt-1">ضعيفة</span>
      </div>
    );
  }
  
  if (status === "pending") {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gray-100 border-4 border-gray-400 text-gray-600 font-bold text-3xl sm:text-4xl shadow-md">
          ?
        </div>
        <span className="mt-2 text-gray-600 font-semibold text-sm sm:text-base">في الانتظار</span>
        <span className="text-xs sm:text-sm text-gray-500 mt-1">لم يتم الفحص بعد</span>
      </div>
    );
  }
  
  return <span className="text-gray-500 text-sm sm:text-base">-</span>;
});

const CarInfoGrid = React.memo(({ carInfo, onGalleryOpen, reportData, inspectionPoints, navigationData, handleGalleryOpen }) => {

  if (process.env.NODE_ENV === 'development') {
  }
  const inspectionImages = extractInspectionImages(reportData, navigationData);
  
  const allImages = inspectionImages;

  if (process.env.NODE_ENV === 'development') {

  // Debug إضافي لفهم هيكل البيانات
  if (navigationData?.searchResults?.[0]) {
    if (navigationData.searchResults[0].data) {
    }
    
   
    if (navigationData.searchResults[0].inspection_points) {
     
      const pointsWithImages = navigationData.searchResults[0].inspection_points.filter(point => 
        point.evaluation?.images && point.evaluation.images.length > 0
      );
      if (pointsWithImages.length > 0) {
       
      }
    }
    
  }
  
  if (navigationData?.report) {
    if (navigationData.report.inspection_points) {
      const pointsWithImages = navigationData.report.inspection_points.filter(point => 
        point.evaluation?.images && point.evaluation.images.length > 0
      );
      if (pointsWithImages.length > 0) {
        
      }
    }
  }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Vehicle Info Card */}
      <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white dark:bg-black border border-gray-100 dark:border-white shadow rounded-lg min-h-[200px] sm:min-h-[240px]">
        <div className="text-center">
          <span className="text-black dark:text-white text-lg sm:text-xl font-bold text-gray-800 mb-2 block">
            {carInfo.displayVehicleName || carInfo.brand}
          </span>
          {carInfo.year && carInfo.year !== "-" && (
            <span className="text-black dark:text-white text-base sm:text-lg font-semibold text-gray-600 block">
              {carInfo.year}
            </span>
          )}
          {carInfo.category && carInfo.category !== "-" && carInfo.category !== carInfo.displayVehicleName && (
            <span className="text-black dark:text-white text-sm font-medium text-gray-500 mt-1 block">
              {carInfo.category}
            </span>
          )}
        </div>
      </div>

      {/* Report Info Card */}
      <div className="p-4 sm:p-6 bg-white dark:bg-black border border-white dark:border-white shadow rounded text-center">
        <h2 className="text-black dark:text-white text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          {carInfo.title}
        </h2>
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-4 text-black dark:text-white text-sm sm:text-base">
          <div className="text-center sm:text-right">
            <span className="block text-xs sm:text-sm text-gray-600 text-black dark:text-white">رقم التقرير</span>
            <h3 className="text-black dark:text-white font-semibold text-gray-800 text-sm sm:text-base break-all">
              {carInfo.reportNumber}
            </h3>
          </div>
          <div className="text-center sm:text-left">
            <span className="block text-xs sm:text-sm text-gray-600 text-black dark:text-white">رقم الشاسيه</span>
            <h3 className="font-semibold text-gray-800 text-black dark:text-white text-sm sm:text-base break-all">
              {carInfo.chassisNumber}
            </h3>
          </div>
        </div>
      </div>

      {/* Image Card */}
      <div className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg min-h-[200px] sm:min-h-[240px] sm:col-span-2 lg:col-span-1">
        {allImages.length > 0 ? (
          <div className="relative w-full h-full">
            {/* عرض الصورة الأولى فقط */}
            <img
              src={buildImageSrc(allImages[0])}
              alt="صورة الفحص الرئيسية"
              className="w-full h-full object-cover rounded shadow cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleGalleryOpen(allImages, 0)}
              onError={(e) => {
                e.target.src = '/car1.png';
                e.target.onerror = null;
              }}
            />
            
            {/* تأثير hover للصورة */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded cursor-pointer" 
                 onClick={() => handleGalleryOpen(allImages, 0)}>
            </div>
            
            {/* مؤشر التحميل - يظهر فقط أثناء التحميل */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded opacity-0 transition-opacity duration-300" 
                 id="loading-indicator">
              <div className="text-gray-500 text-sm">جاري تحميل الصورة...</div>
            </div>
            
            {/* مؤشر عدد الصور */}
            {allImages.length > 1 && (
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs sm:text-sm">
                {allImages.length} صور
              </div>
            )}
            
            {/* زر فتح الجالري */}
            {allImages.length > 1 && (
              <button
                onClick={() => handleGalleryOpen(allImages, 0)}
                className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-1.5 sm:p-2 rounded-full shadow-lg transition-colors"
                title="عرض جميع الصور"
              >
                <FaExpand className="text-xs sm:text-sm" />
              </button>
            )}
            
            {/* نص توضيحي */}
            {allImages.length > 1 && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-1.5 sm:px-2 py-1 rounded text-xs hidden sm:block">
                اضغط لعرض جميع الصور
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FaImages className="text-4xl text-gray-400 mb-2" />
            <p className="text-gray-500">لا توجد صور فحص في هذا التقرير</p>
            <p className="text-xs text-gray-400 mt-1">سيتم عرض الصور هنا عند توفرها</p>
          </div>
        )}
      </div>
    </div>
  );
});

const GaugeSection = React.memo(({ score, currentGrade, showInfo, setShowInfo }) => (
  <div className="p-4 sm:p-6 flex flex-col items-start bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg w-full">
    <button
      className="mb-3 sm:mb-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white dark:bg-black border border-black dark:border-white rounded-full shadow hover:bg-gray-100"
      onClick={() => setShowInfo(!showInfo)}
    >
      <FaInfoCircle className="text-blue-500 text-sm sm:text-xl" />
    </button>

    {showInfo && (
      <div className="mb-3 sm:mb-4 bg-white shadow-lg border rounded-lg p-3 sm:p-4 w-full overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-center text-xs sm:text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 sm:px-3 py-1">Grade</th>
              <th className="border border-gray-300 px-2 sm:px-3 py-1">Range</th>
            </tr>
          </thead>
          <tbody>
            {GRADES.map((g) => (
              <tr key={g.label}>
                <td className={`border border-gray-300 px-2 sm:px-3 py-1 font-bold ${g.textColor}`}>
                  {g.label}
                </td>
                <td className="border border-gray-300 px-2 sm:px-3 py-1">
                  {g.range[0]}% - {g.range[1]}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    <div className="w-full flex justify-center">
      <div className="w-full max-w-[200px] sm:max-w-[250px]">
        <GaugeChart
          id="gauge-chart"
          nrOfLevels={20}
          colors={["#ef4444", "#f97316", "#eab308", "#22c55e"]}
          arcWidth={0.3}
          percent={score / 100}
          textColor="#000000"
        />
      </div>
    </div>

    <div className="text-xl sm:text-2xl font-bold mt-2 text-center w-full">
      <span className={currentGrade?.textColor || ""}>
        {score}%
      </span>
    </div>
  </div>
));

function ReportData() {
  const location = useLocation();
  const [reportData, setReportData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [rawApiData, setRawApiData] = useState(null); // Store raw JSON for debugging/viewing
  const [score, setScore] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openGallery, setOpenGallery] = useState(null);

  // Get data from navigation state
  const navigationData = location.state;
  
  // Debug navigation data in development only
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && navigationData) {
      
      if (navigationData.report?.inspection_images) {
      }
      if (navigationData.searchResults?.[0]?.inspection_images) {
      }
      if (navigationData.searchResults?.[0]?.data?.inspection_images) {
      }
      
      // Check all possible paths
      if (navigationData.searchResults?.[0]) {
        if (navigationData.searchResults[0].data) {
        }
      }
    }
  }, [navigationData]);

  // Direct tracking of inspection_images from all sources
  useEffect(() => {
   
  }, [reportData, navigationData]);

  // Debug data when reportData changes (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && reportData) {
  
      // Check for images in inspection points
      if (reportData.inspection_reports_points) {
        const pointsWithImages = reportData.inspection_reports_points.filter(p => 
          p.point_images && Array.isArray(p.point_images) && p.point_images.length > 0
        );
      }
      
      // Check for images in services
      if (reportData.services && Array.isArray(reportData.services)) {
        let totalPointsWithImages = 0;
        reportData.services.forEach((service) => {
          if (service.points && Array.isArray(service.points)) {
            const pointsWithImages = service.points.filter(p => 
              (p.point_images && Array.isArray(p.point_images) && p.point_images.length > 0) ||
              (p.evaluation?.images && Array.isArray(p.evaluation.images) && p.evaluation.images.length > 0)
            );
            totalPointsWithImages += pointsWithImages.length;
          }
        });
      }
    }
  }, [reportData]);

  // Memoized computed values - optimized calculations
  const currentGrade = useMemo(() => {
    if (reportData?.grade) {
      const apiGrade = GRADES.find(g => g.label === reportData.grade);
      if (apiGrade) return apiGrade;
    }
    
    return GRADES.find(g => score >= g.range[0] && score <= g.range[1]);
  }, [score, reportData?.grade]);

  const inspectionPoints = useMemo(() => {
    // Try to get points from multiple sources with improved handling
    let points = [];
    
    // Method 1: From inspection_reports_points (old structure)
    if (reportData?.inspection_reports_points && Array.isArray(reportData.inspection_reports_points)) {
      points = reportData.inspection_reports_points;
    }
    // Method 2: From data.inspection_reports_points (nested structure)
    else if (reportData?.data?.inspection_reports_points && Array.isArray(reportData.data.inspection_reports_points)) {
      points = reportData.data.inspection_reports_points;
    }
    // Method 3: From inspection_points (current structure)
    else if (reportData?.inspection_points && Array.isArray(reportData.inspection_points)) {
      points = reportData.inspection_points;
    }
    // Method 4: From data.inspection_points (nested structure)
    else if (reportData?.data?.inspection_points && Array.isArray(reportData.data.inspection_points)) {
      points = reportData.data.inspection_points;
    }
    // Method 5: From services (new API structure) - Primary method for new data
    else if (reportData?.services && Array.isArray(reportData.services)) {
      reportData.services.forEach(service => {
        if (service.points && Array.isArray(service.points)) {
          // Add service context to each point for better organization
          service.points.forEach(point => {
            points.push({
              ...point,
              service_id: service.id,
              service_name_ar: service.name_ar,
              service_name_en: service.name_en,
              service_description_ar: service.description_ar,
              service_description_en: service.description_en
            });
          });
        }
      });
    }
    // Method 6: Fallback options
    else if (reportData?.points && Array.isArray(reportData.points)) {
      points = reportData.points;
    }
    
    // Debug in development only
    if (process.env.NODE_ENV === 'development') {
      console.log("📋 Final inspectionPoints count:", points.length);
      if (points.length > 0) {
      }
    }
    return points;
  }, [reportData?.inspection_reports_points, reportData?.data?.inspection_reports_points, reportData?.inspection_points, reportData?.data?.inspection_points, reportData?.services, reportData?.points]);

  const { passedPoints, totalPoints } = useMemo(() => {
    const passed = inspectionPoints.filter(p => p.evaluation?.passed || p.point_passed).length;
    const total = inspectionPoints.length;
    return { passedPoints: passed, totalPoints: total };
  }, [inspectionPoints]);

  // Optimized inspection status calculation using processed data
  const getInspectionStatusForSection = useCallback((sectionKey) => {
    if (!reportData?.serviceScores) return "neutral";
    
    // Find service ID by matching section key with service data
    const serviceId = Object.keys(reportData.serviceScores).find(id => {
      const serviceData = reportData.serviceScores[id];
      if (!serviceData.points || serviceData.points.length === 0) return false;
      
      // Check service name first
      if (serviceData.service_name_ar === sectionKey || serviceData.service_name_en === sectionKey) {
        return true;
      }
      
      // Then check individual points
      return serviceData.points.some(point => 
        point.name_ar === sectionKey || 
        point.name_en === sectionKey ||
        (point.name_ar && point.name_ar.includes(sectionKey)) ||
        (point.name_en && point.name_en.includes(sectionKey))
      );
    });
    
    if (!serviceId || !reportData.serviceScores[serviceId]) return "neutral";
    
    const serviceData = reportData.serviceScores[serviceId];
    const percentage = serviceData.max > 0 ? (serviceData.total / serviceData.max) * 100 : 0;
    
    // Optimized status calculation with early returns
    if (percentage >= 85) return "success";
    if (percentage >= 70) return "warning";
    if (percentage >= 50) return "error";
    return "error";
  }, [reportData?.serviceScores]);

  // Memoized inspections array
  const inspections = useMemo(() => {
    
    const sections = INSPECTION_SECTIONS.map(section => ({
      ...section,
      status: getInspectionStatusForSection(section.key),
      icon: <section.icon />
    }));
    
    // Check if we have inspection images or point images
    const hasInspectionImages = Array.isArray(reportData?.inspection_images) && reportData.inspection_images.length > 0;
    
    const photoSection = { 
      name: "صور الفحص", 
      status: hasInspectionImages ? "success" : "neutral", 
      icon: <FaCamera /> 
    };
    
    return [...sections, photoSection];
  }, [getInspectionStatusForSection, reportData?.inspection_images?.length, inspectionPoints.length]);

  // Optimized car info calculation with better data mapping and performance
  // This function extracts DYNAMIC vehicle information from API data - NOT static values
  // Each report will show different vehicle information based on the actual data from the API
  const carInfo = useMemo(() => {
    if (!reportData) return { bodyType: "-" };

    // Extract vehicle data dynamically from API response
    // Priority: vehicleData > reportData.vehicle > reportData.data.vehicle
    const vehicle = vehicleData || reportData.vehicle || reportData.data?.vehicle || {};
    const contact = reportData.vehicle_contact || reportData.data?.vehicle_contact || {};
    
    // Debug vehicle data in development
    if (process.env.NODE_ENV === 'development') {
    
    }
    
    // Extract vehicle information with fallbacks and improved manufacturer name handling
    // Priority: Use manufacturer name from API data, then fallback to ID mapping, then translation
    let manufacturer = "";
    
    // Method 1: Try to get manufacturer name directly from API data
    const rawManufacturer = vehicle.manufacturer?.name_en || vehicle.manufacturer?.name_ar || vehicle.name_en || vehicle.brand || vehicle.make || "";
    if (rawManufacturer) {
      manufacturer = translateManufacturerName(rawManufacturer);
    }
    
    // Method 2: If no manufacturer name found, try to get it from manufacturer_id
    if (!manufacturer && vehicle.manufacturer_id) {
      // Try to get manufacturer name from ID mapping
      manufacturer = getManufacturerNameFromId(vehicle.manufacturer_id);
      
      // If still no manufacturer found, try API manufacturer name
      if (!manufacturer) {
        const manufacturerFromId = vehicle.manufacturer?.name_en || vehicle.manufacturer?.name_ar;
        if (manufacturerFromId) {
          manufacturer = translateManufacturerName(manufacturerFromId);
        }
      }
    }
    
    // Method 3: Final fallback
    if (!manufacturer) {
      manufacturer = vehicle.vehicle_category || "سيارة";
    }
    const model = vehicle.model || vehicle.model_name || "";
    const year = vehicle.production_year || "";
    const category = vehicle.vehicle_category || "";
    
    // Create a comprehensive vehicle name combining all available information
    const vehicleNameParts = [manufacturer, model, year].filter(Boolean);
    const vehicleName = vehicleNameParts.length > 0 ? vehicleNameParts.join(" ") : category || "سيارة";
    
    // Create a better display name for the vehicle card
    const displayVehicleName = manufacturer && model ? 
      `${manufacturer} ${model}` : 
      manufacturer || model || category || "سيارة";
    
    // Format mileage with proper number formatting and Arabic locale
    const formatMileage = (km) => {
      if (!km) return "-";
      const num = Number(km);
      return isNaN(num) ? "-" : `${num.toLocaleString('ar-SA')} كم`;
    };
    
    // Format engine capacity with proper number formatting and Arabic locale
    const formatEngineCapacity = (cc) => {
      if (!cc) return "-";
      const num = Number(cc);
      return isNaN(num) ? "-" : `${num.toLocaleString('ar-SA')} سي سي`;
    };
    
    // Extract DYNAMIC images from inspection services/points
    // This function gets images from inspection points within services AND direct inspection_points
    const extractImagesFromServices = () => {
      const allImages = [];
      
      // Method 1: Extract from services (if available)
      if (reportData?.services && Array.isArray(reportData.services)) {
        reportData.services.forEach(service => {
          if (service.points && Array.isArray(service.points)) {
            service.points.forEach(point => {
              // Check for images in different possible locations - prioritize evaluation.images
              const pointImages = point.evaluation?.images || point.point_images || point.images || [];
              if (Array.isArray(pointImages)) {
                pointImages.forEach(img => {
                  if (img && typeof img === 'string' && img.trim().length > 0) {
                    allImages.push(img); // Collect DYNAMIC images from API
                  }
                });
              }
            });
          }
        });
      }
      
      // Method 2: Extract from direct inspection_points (new data structure)
      if (reportData?.inspection_points && Array.isArray(reportData.inspection_points)) {
        reportData.inspection_points.forEach(point => {
          // Check for images in different possible locations - prioritize evaluation.images
          const pointImages = point.evaluation?.images || point.point_images || point.images || [];
          if (Array.isArray(pointImages)) {
            pointImages.forEach(img => {
              if (img && typeof img === 'string' && img.trim().length > 0) {
                allImages.push(img); // Collect DYNAMIC images from inspection_points
              }
            });
          }
        });
      }
      
      return processImages(allImages); // Process DYNAMIC images
    };

    // Use the new extractInspectionImages function to get images from all possible locations
    const extractedImages = extractInspectionImages(reportData, navigationData);
    let aggregatedInspectionImages = extractedImages.filter(img => typeof img === 'string' && img.trim().length > 0);
    
    if (process.env.NODE_ENV === 'development') {
    }
    
    // If no inspection images found at report level, try to extract from individual points
    if (aggregatedInspectionImages.length === 0) {
      const serviceImages = extractImagesFromServices();
      if (serviceImages && serviceImages.length > 0) {
        // Convert processed images back to source URLs for consistency
        aggregatedInspectionImages = serviceImages.map(img => img.src || img);
        if (process.env.NODE_ENV === 'development') {
        }
      }
    }
    
    // Final debug log
    if (process.env.NODE_ENV === 'development') {
      if (aggregatedInspectionImages.length > 0) {
        
      }
    }
    
    // Debug DYNAMIC image sources (can be removed in production)
    if (process.env.NODE_ENV === 'development') {
   
      
      // Debug inspection_points structure
      if (reportData?.inspection_points && reportData.inspection_points.length > 0) {
        const pointsWithImages = reportData.inspection_points.filter(p => 
          p.point_images || p.evaluation?.images || p.images
        );
       
      }
    }
    
    // Return DYNAMIC vehicle information extracted from API data
    // Each report will show different vehicle details based on actual inspection data
    return {
      image: vehicle.image || vehicle.photo || "/car1.png",
      // Keep raw image paths for gallery processing - will be converted to full URLs when needed
      inspectionImages: aggregatedInspectionImages,
      chassisNumber: vehicle.vin_number || vehicle.chassis_number || reportData.vehicle_id || "-",
      brand: manufacturer || "-", 
      model: model || category || "-", 
      displayVehicleName: displayVehicleName, // Dynamic vehicle name display
      title: vehicle.title || vehicle.name || vehicle.description || vehicleName,
      reportNumber: reportData.report_number || navigationData?.reportNum || reportData.id || "-",
      licensePlate: vehicle.license_plate_number || "-",
      category: category || "-",
      year: year || "-", // Dynamic year from API data
      mileage: formatMileage(vehicle.mileage_km), // Dynamic mileage from API data
      color: vehicle.exterior_color || "-", // Dynamic color from API data
      engineType: formatEngineCapacity(vehicle.engine_capacity_cc), // Dynamic engine from API data
      fuelType: vehicle.fuel_type || "-", // Dynamic fuel type from API data
      transmission: vehicle.transmission_type || "-", // Dynamic transmission from API data
      drivetrain: vehicle.drivetrain || "-", // Dynamic drivetrain from API data
      bodyType: vehicle.body_type || "-", // Dynamic body type from API data
      ownerName: contact.owner_name || "-", // Dynamic owner info from API data
      ownerPhone: contact.owner_phone_number || "-",
      applicantEmail: contact.applicant_email || "-",
      // Add debug information for development
      debugInfo: process.env.NODE_ENV === 'development' ? {
        inspectionImagesCount: aggregatedInspectionImages.length,
        inspectionImagesSource: aggregatedInspectionImages.length > 0 ? 'found' : 'not_found',
        reportDataKeys: Object.keys(reportData || {}),
        vehicleKeys: Object.keys(vehicle || {}),
        contactKeys: Object.keys(contact || {})
      } : undefined
    };
  }, [reportData?.id, reportData?.inspection_images, reportData?.services, vehicleData?.id, navigationData?.reportNum]);

  // Optimized inspection info
  const inspectionInfo = useMemo(() => {
    const status = getInspectionStatus(reportData?.status, score);
    const result = score >= 60 ? "السيارة بحالة جيدة" : "السيارة تحتاج صيانة";
    
    return { status, result };
  }, [reportData?.status, score]);

  // Optimized failure reasons calculation
  const failureReasons = useMemo(() => {
    if (!reportData) return [];
    
    const reasons = reportData.failure_reasons || reportData.data?.failure_reasons || [];
    
    if ((!reasons || reasons.length === 0) && inspectionPoints.length > 0) {
      const failedPoints = inspectionPoints.filter(point => !(point.evaluation?.passed || point.point_passed));
      
      return failedPoints.map(point => ({
        reason: point.point_notes || point.evaluation?.notes || `فشل في ${point.name_ar || point.name_en || 'نقطة الفحص'}`,
        point: point.name_ar || point.name_en || `نقطة ${point.id}`,
        score: `${point.evaluation?.score_achieved || point.score_achieved || 0}/${point.evaluation?.max_score || point.max_score || 10}`,
        section: point.service_name_ar || point.service_name_en || "غير محدد",
        serviceId: point.service_id || point.point?.services_id,
        explanation: point.explanation_ar || point.explanation_en
      }));
    }
    
    return reasons || [];
  }, [reportData?.failure_reasons, reportData?.data?.failure_reasons, inspectionPoints]);

  // Gallery handlers - optimized with useCallback
  const handleGalleryOpen = useCallback((images, startIndex = 0) => {
    // Convert string array to object array for ScreenGallery compatibility
    const processedImages = Array.isArray(images) ? images.map((img, index) => ({
      src: buildImageSrc(typeof img === 'string' ? img : img.src || img),
      title: `صورة الفحص ${index + 1}`,
      subtitle: `صورة ${index + 1} من ${images.length}`
    })) : [];
    
   
    
    setOpenGallery({ images: processedImages, start: startIndex });
  }, []);

  const handleGalleryClose = useCallback(() => {
    setOpenGallery(null);
  }, []);

  // Optimized API call with caching and better error handling
  // This function fetches dynamic data based on report number - NOT static data
  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        window.location.href = "/login";
        return;
      }

      setLoading(true);
      setError(null);

      // Check cache first to avoid duplicate API calls
      // Cache key includes report number to ensure data is specific to each report
      const cacheKey = `report_${navigationData?.reportNum || 'default'}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setRawApiData(parsedData); // keep full raw data
          if (process.env.NODE_ENV === 'development') {
           
          }
          const processedData = processInspectionData(parsedData);
          setReportData(processedData);
          setScore(processedData.percentage_score || processedData.calculatedPercentage || 0);
          if (parsedData.data?.vehicle) {
            setVehicleData(parsedData.data.vehicle);
          }
          setLoading(false);
          return;
        } catch (parseError) {
          console.warn("Cache parse error, clearing cache:", parseError);
          sessionStorage.removeItem(cacheKey);
        }
      }

      // Try to fetch from inspection reports API first
      if (!navigationData?.report && !navigationData?.searchResults) {
        try {
          // Use dynamic report number from navigation - each report has different data
          const reportNumber = navigationData?.reportNum || "USR-2-VEH-2-1756969611";
          console.log(`🔍 Fetching DYNAMIC data for report: ${reportNumber}`);
          const response = await axios.get(
            `https://cd-root.com/syarahplus/backend/api/users/inspection/reports/${reportNumber}`,
            { 
              headers: { Authorization: `Bearer ${storedToken}` },
              timeout: 10000 // 10 second timeout
            }
          );
          
         

          setRawApiData(response.data); // keep full raw data


          
          if (response.data?.success && response.data?.data) {
            // Cache the response
            sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
            
            const processedData = processInspectionData(response.data);
            setReportData(processedData);
            
            // Use the calculated percentage from API or calculated value
            const percentage = response.data.percentage || 
                              processedData.percentage_score || 
                              processedData.calculatedPercentage || 0;
            setScore(percentage);
            
            // Set vehicle data if available
            if (response.data.data?.vehicle) {
              setVehicleData(response.data.data.vehicle);
            }
            
            setLoading(false);
            return;
          }
        } catch (apiError) {
          if (process.env.NODE_ENV === 'development') {
            console.error("API Error:", apiError);
          }
          // API failed, continue to navigation data
        }
      }

      // Helper: hydrate inspection_images if missing by fetching detailed report
      const hydrateImagesIfMissing = async (currentProcessedData) => {
        try {
          if (!currentProcessedData?.inspection_images || currentProcessedData.inspection_images.length === 0) {
            const rn = currentProcessedData?.report_number || navigationData?.reportNum;
            if (!rn) return currentProcessedData;
            const resp = await axios.get(
              `https://cd-root.com/syarahplus/backend/api/users/inspection/reports/${rn}`,
              { headers: { Authorization: `Bearer ${storedToken}` }, timeout: 10000 }
            );
            const detailed = resp?.data;
            if (detailed?.success && (detailed?.data?.inspection_images || detailed?.inspection_images)) {
              const detailedProcessed = processInspectionData(detailed);
              // Merge images only to minimize changes
              const merged = {
                ...currentProcessedData,
                inspection_images: detailedProcessed.inspection_images || []
              };
              return merged;
            }
          }
        } catch (e) {
          if (process.env.NODE_ENV === 'development') console.warn('hydrateImagesIfMissing error:', e);
        }
        return currentProcessedData;
      };

      // Handle the new API structure directly (Reports list)
      if (
        navigationData?.message === "Reports list" &&
        navigationData?.data
      ) {
        setRawApiData(navigationData); // keep full raw data from navigation
        if (process.env.NODE_ENV === 'development') {
          
        }
        let processedData = processInspectionData(navigationData);
        processedData = await hydrateImagesIfMissing(processedData);
        setReportData(processedData);
        const percentage = navigationData.percentage ||
                          processedData.percentage_score ||
                          processedData.calculatedPercentage || 0;
        setScore(percentage);
        if (navigationData.data?.vehicle) {
          setVehicleData(navigationData.data.vehicle);
        }
        setLoading(false);
        return;
      }

      // Handle the new API structure from searchResults (based on logs)
      if (
        navigationData?.searchResults &&
        Array.isArray(navigationData.searchResults) &&
        navigationData.searchResults.length > 0
      ) {
        const searchResult = navigationData.searchResults[0];
        setRawApiData(searchResult); // keep full raw data from search results
        if (process.env.NODE_ENV === 'development') {
          
        }
        let processedData = processInspectionData(searchResult);
        processedData = await hydrateImagesIfMissing(processedData);
        setReportData(processedData);
        const percentage = searchResult.percentage ||
                          processedData.percentage_score ||
                          processedData.calculatedPercentage || 0;
        setScore(percentage);
        if (searchResult.vehicle) {
          setVehicleData(searchResult.vehicle);
        }
        setLoading(false);
        return;
      }

      // Check if we have navigation data (from Report.jsx)
      if (navigationData?.report || navigationData?.searchResults) {
        // Priority 1: Use navigationData.report if available (contains inspection_images)
        if (navigationData.report) {
          if (process.env.NODE_ENV === 'development') {
           
          }
          
          setRawApiData(navigationData.report);
          const processedData = processInspectionData(navigationData.report);
          setReportData(processedData);
          
          const percentage = navigationData.report.percentage || 
                            navigationData.report.percentage_score || 
                            navigationData.report.total_score || 0;
          setScore(percentage);
          
          if (navigationData.report.vehicle) {
            setVehicleData(navigationData.report.vehicle);
          }
        }
        // Priority 2: Use searchResults if report is not available
        else if (navigationData.searchResults) {
          const navData = navigationData.searchResults;
          
          if (process.env.NODE_ENV === 'development') {
            
          }
          
          if (Array.isArray(navData) && navData.length > 0) {
            let targetReport = navData[0];
            
            // Check if the data is nested in .data property
            if (targetReport.data) {
              targetReport = targetReport.data;
              setRawApiData(navData[0]); // keep the full structure
              if (process.env.NODE_ENV === 'development') {
              }
            } else {
              setRawApiData(targetReport); // keep raw nav data
              if (process.env.NODE_ENV === 'development') {
              }
            }
            
            if (process.env.NODE_ENV === 'development') {
             
            }
            
            if (navigationData.reportNum) {
              const foundReport = navData.find(report => 
                (report.data?.report_number || report.report_number) === navigationData.reportNum
              );
              if (foundReport) {
                targetReport = foundReport.data || foundReport;
              }
            }
            
            const processedData = processInspectionData(targetReport);
            setReportData(processedData);
            
            const percentage = targetReport.percentage || 
                              targetReport.percentage_score || 
                              targetReport.total_score || 0;
            setScore(percentage);
            
            if (targetReport.vehicle) {
              setVehicleData(targetReport.vehicle);
            }
          } else if (navData?.data) {
            // Handle the new API response structure
            setRawApiData(navData);
            const processedData = processInspectionData(navData);
            setReportData(processedData);
            
            const percentage = navData.percentage || navData.percentage_score || 0;
            setScore(percentage);
            
            if (navData.data?.vehicle) {
              setVehicleData(navData.data.vehicle);
            }
          } else {
            setRawApiData(navData);
            const processedData = processInspectionData(navData);
            setReportData(processedData);
            
            const percentage = navData.percentage || 
                              navData.percentage_score || 
                              navData.total_score || 0;
            setScore(percentage);
            
            if (navData.vehicle) {
              setVehicleData(navData.vehicle);
            }
          }
        }
        
        setLoading(false);
        return;
      }

      // Handle generic success wrapper with data.data array
      if (
        navigationData?.success === true &&
        Array.isArray(navigationData?.data?.data) &&
        navigationData.data.data.length > 0
      ) {
        setRawApiData(navigationData); // keep full raw data
        if (process.env.NODE_ENV === 'development') {
          
        }
        let processedData = processInspectionData(navigationData);
        processedData = await hydrateImagesIfMissing(processedData);
        setReportData(processedData);
        const percentage = navigationData.percentage ||
                          processedData.percentage_score ||
                          processedData.calculatedPercentage || 0;
        setScore(percentage);
        if (navigationData.data?.data?.[0]?.vehicle) {
          setVehicleData(navigationData.data.data[0].vehicle);
        }
        setLoading(false);
        return;
      }

      setError("يرجى استخدام صفحة البحث للوصول إلى التقارير");
      setLoading(false);
    };

    fetchData();
  }, [navigationData?.id, navigationData?.reportNum]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">جاري تحميل بيانات الفحص...</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">يرجى الانتظار...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px] px-4">
        <div className="text-center max-w-md w-full">
          <div className="text-red-500 text-4xl sm:text-6xl mb-4">⚠️</div>
          <p className="text-red-600 dark:text-red-400 text-base sm:text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!reportData) {
    return (
      <div className="flex items-center justify-center min-h-[300px] px-4">
        <div className="text-center">
          <div className="text-gray-400 text-4xl sm:text-6xl mb-4">📋</div>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-2">لا توجد بيانات فحص متاحة</p>
          <p className="text-xs sm:text-sm text-gray-500">يرجى التحقق من الاتصال بالخادم</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow px-4 sm:px-6 lg:px-8">
      <h1 className="text-black dark:text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">تقرير فحص السيارة</h1>
      
      <div className="space-y-4 sm:space-y-6">
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full flex justify-between items-center px-4 py-3 sm:py-4 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                <span className="text-black dark:text-white font-medium text-sm sm:text-base">بيانات الفحص</span>
                <FaChevronDown className={`transform transition-transform ${open ? "rotate-180" : ""} text-sm sm:text-base`} />
              </Disclosure.Button>

              <Disclosure.Panel className="px-2 sm:px-4 py-2 bg-white dark:bg-black rounded-b-md border border-t-0 border-gray-200">
                <div className="space-y-4 sm:space-y-6">
                  {/* Car Info Grid */}
                  <CarInfoGrid 
                    carInfo={carInfo} 
                    onGalleryOpen={handleGalleryOpen} 
                    reportData={reportData}
                    inspectionPoints={inspectionPoints}
                    navigationData={navigationData}
                    handleGalleryOpen={handleGalleryOpen}
                  />

                  {/* Status Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Gauge Chart */}
                    <div className="sm:col-span-2 lg:col-span-1">
                      <GaugeSection 
                        score={score} 
                        currentGrade={currentGrade} 
                        showInfo={showInfo} 
                        setShowInfo={setShowInfo} 
                      />
                    </div>

                    {/* Status Display */}
                    <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg min-h-[200px]">
                      <StatusDisplay status={inspectionInfo.status} score={score} />
                      {inspectionInfo.status === "error" && (
                        <button
                          onClick={() => setShowReasons(true)}
                          className="mt-4 px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          عرض الأسباب
                        </button>
                      )}
                    </div>

                    {/* Market Value */}
                    <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg min-h-[200px]">
                      <img
                        src={image55}
                        alt="car"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = "/img1.png";
                        }}
                      />
                      <span className="mt-3 text-base sm:text-lg font-bold text-center">القيمة التسويقية</span>
                    </div>
                  </div>

                  {/* Report Information */}
                  <div className="bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg p-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2 dark:text-white">
                      معلومات التقرير
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 text-sm sm:text-base dark:text-white">
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">التاريخ</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{formatDate(reportData.created_at)}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">رقم التقرير</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right break-all">{carInfo.reportNumber}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">نوع الفحص</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">
                          {reportData.status === 'pending' ? 'في الانتظار' : 'مكتمل'}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">النسبة المئوية</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{score.toFixed(1)}%</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">الدرجة</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{reportData?.grade || currentGrade?.label || '-'}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">النتيجة الإجمالية</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">
                          {reportData?.total_score ? `${reportData.total_score.toFixed(1)}/${reportData.max_possible_score}` : '-'}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2 mt-6 dark:text-white">
                      معلومات المركبة
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 text-sm sm:text-base dark:text-white">
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">النوع</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.bodyType}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2 dark:text-white">
                        <span className="text-gray-600 font-semibold mb-1 sm:mb-0">الموديل</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.model}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">الفئة</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.category}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">سنة الصنع</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.year}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">سعة المحرك</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.engineType}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">العداد الحالي</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.mileage}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">رقم اللوحة</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.licensePlate}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">لون السيارة</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.color}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">نوع المحرك</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.fuelType}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">ناقل الحركة</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.transmission}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">نوع الدفع</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.drivetrain}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                        <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">نوع الهيكل</span>
                        <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.bodyType}</span>
                      </div>
                    </div>

                    {/* Owner Information Section */}
                    {(carInfo.ownerName !== "-" || carInfo.ownerPhone !== "-" || carInfo.applicantEmail !== "-") && (
                      <>
                        <h2 className="text-xl font-bold text-gray-900 border-b pb-2 mt-6 dark:text-white">
                          معلومات المالك
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 text-sm sm:text-base dark:text-white">
                          <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                            <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">اسم المالك</span>
                            <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.ownerName}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2">
                            <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">رقم الهاتف</span>
                            <span className="font-semibold dark:text-white text-left sm:text-right">{carInfo.ownerPhone}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between border-b py-2 sm:col-span-2">
                            <span className="text-gray-600 font-semibold dark:text-white mb-1 sm:mb-0">البريد الإلكتروني</span>
                            <span className="font-semibold dark:text-white text-left sm:text-right break-all">{carInfo.applicantEmail}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Features Section */}
                  <div className="bg-white dark:bg-black border border-white dark:border-white shadow rounded-lg p-4 sm:p-6">
                    <h3 className="text-sm sm:text-base font-bold mb-3 text-gray-900 dark:text-white">الإضافات</h3>
                    <div className="flex flex-wrap gap-2">
                      {FEATURES.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center border border-red-500 rounded-full px-2 py-1 text-xs font-medium text-gray-700 dark:text-white"
                        >
                          <span className="text-gray-700 dark:text-white text-xs mr-1">✓</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                 
               
                
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      {/* Failure Reasons Modal */}
      {showReasons && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-black p-4 sm:p-6 rounded shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-black dark:text-white text-lg sm:text-xl font-bold text-red-600">
                {reportData?.failure_reasons === null ? 
                  "أسباب الفشل من النقاط الفاشلة" : 
                  "أسباب الفشل في الفحص"
                }
              </h2>
              <button
                onClick={() => setShowReasons(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
              >
                <FaTimes className="text-lg sm:text-xl" />
              </button>
            </div>
            
            <ul className="list-disc list-inside space-y-2 text-black dark:text-white">
              {failureReasons.length > 0 ? (
                failureReasons.map((item, i) => (
                  <li key={i} className="mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                    {typeof item === 'string' ? (
                      <span>{item}</span>
                    ) : (
                      <div>
                        <div className="font-semibold text-red-600 mb-1">{item.point}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.reason}</div>
                        {item.explanation && (
                          <div className="text-xs text-blue-600 dark:text-blue-400 mb-1 p-2 bg-blue-50 dark:bg-blue-900 rounded">
                            <strong>التفسير:</strong> {item.explanation}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1 sm:gap-2 text-xs text-gray-500">
                          {item.score && (
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">النتيجة: {item.score}</span>
                          )}
                          {item.section && (
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">القسم: {item.section}</span>
                          )}
                          {item.serviceId && (
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">ID: {item.serviceId}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  {reportData?.failure_reasons === null ? 
                    'لا توجد أسباب فشل محددة من API (failure_reasons: null)' : 
                    "لا توجد أسباب محددة للفشل"
                  }
                </li>
              )}
            </ul>
            <button
              onClick={() => setShowReasons(false)}
              className="mt-4 w-full px-4 py-2 sm:py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm sm:text-base"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Full Screen Gallery */}
      {openGallery && (
        <ScreenGallery
          images={openGallery.images}
          startIndex={openGallery.start}
          onClose={handleGalleryClose}
        />
      )}
    </div>
  );
}

export default ReportData;