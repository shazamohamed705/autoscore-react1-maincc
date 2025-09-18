import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown, FaInfoCircle, FaSpinner } from "react-icons/fa";
import FullScreenGallery from "../FullScreenGallery/FullScreenGallery";
import iallbackImage from '../../assets/kkcar.png';
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
 * Process braking and safety data specifically for braking system inspection points
 * Optimized for better performance and reduced data consumption
 */
const processBrakingData = (data) => {
  if (!data) return null;

  // Handle API response structure
  const reportData = data.data || data;
  const report = Array.isArray(reportData) ? reportData[0] : reportData;


  // Define the braking points names for filtering (based on the data you provided)
  const brakingPointNames = [
    "وجود جميع الاكياس الهوائية",
    "عمق الفرزة الامامي", 
    "عمق الفرزة الخلفي",
    "عمر الإطارات أقل من 4 سنوات",
    "تفقد براغي العجلات",
    "نظام مانع الانزلاق",
    "بريك \\ ديسك امامي يمين",
    "بريك \\ ديسك امامي يسار", 
    "بريك \\ ديسك خلفي يمين",
    "بريك \\ ديسك خلفي يسار",
    "حزام الأمان الأمامي اليمين",
    "حزام الأمان الأمامي اليسار",
    "حزام الأمان الخلفي اليمين",
    "حزام الأمان الخلفي اليسار"
  ];

  let allPoints = [];
  
  // Method 1: Extract from inspection_points (new API structure) - same as Exsection.jsx
  if (report.inspection_points && Array.isArray(report.inspection_points)) {
    
    const brakingPoints = report.inspection_points.filter(point => {
      const pointName = point.name_ar || point.point?.name_ar || "";
      const isBrakingPoint = brakingPointNames.includes(pointName);
      if (isBrakingPoint) {
      }
      return isBrakingPoint;
    });
    allPoints = brakingPoints;
  }
  
  // Method 2: Fallback to services structure (old API structure)
  if (allPoints.length === 0 && report.services?.length > 0) {
    // console.log("🔍 Trying services structure as fallback");
    
    let brakingService = null;
    
    // Find by ID 7 (braking service)
    brakingService = report.services.find(service => service.id === 7);
    // console.log("🔍 Looking for service ID 7:", brakingService);
    
    // Find by Arabic name keywords
    if (!brakingService) {
      brakingService = report.services.find(service => 
        service.name_ar?.includes("المكابح") || 
        service.name_ar?.includes("السلامة") ||
        service.name_ar?.includes("مكابح") ||
        service.name_ar?.includes("سلامة")
      );
      // console.log("🔍 Looking for service by Arabic name:", brakingService);
    }
    
    // Find by English name keywords
    if (!brakingService) {
      brakingService = report.services.find(service => 
        service.name_en?.toLowerCase().includes("braking") ||
        service.name_en?.toLowerCase().includes("safety") ||
        service.name_en?.toLowerCase().includes("brake")
      );
      // console.log("🔍 Looking for service by English name:", brakingService);
    }
    
    // Use first service if no specific braking service found
    if (!brakingService) {
      brakingService = report.services[0];
      // console.log("🔍 Using first available service:", brakingService);
    }
    
    // Extract points from found service
    if (brakingService?.points && Array.isArray(brakingService.points)) {
      allPoints = brakingService.points;
      // console.log("✅ Found points from service:", allPoints.length);
    }
  }
  
  // Method 3: Use report.points directly
  if (allPoints.length === 0 && report.points && Array.isArray(report.points)) {
    allPoints = report.points;
    // console.log("✅ Using report points directly:", allPoints.length);
  }

  // console.log("🟢 Total Braking Points:", allPoints.length);
  // console.log("🟢 Braking Points Names:", allPoints.map(p => p.name_ar || p.point?.name_ar));
  
  // Verify we have points from braking service
  if (allPoints.length === 0) {
    // console.error(`❌ No braking points found!`);
    // console.log("Available services:", report.services?.map(s => ({ id: s.id, name_ar: s.name_ar, points_count: s.points?.length || 0 })));
    // console.log("Report keys:", Object.keys(report));
  } else if (allPoints.length === 14) {
    // console.log("✅ Perfect! Found exactly 14 braking points");
  } else {
    // console.warn(`⚠️ Found ${allPoints.length} braking points (expected 14)`);
    // console.log("First few points:", allPoints.slice(0, 5).map(p => p.name_ar || p.point?.name_ar));
  }
  
  // If still no points, create sample data for testing
  if (allPoints.length === 0) {
    // console.log("⚠️ Creating sample braking points for testing");
    allPoints = [
      {
        id: 1,
        name_ar: "فحص المكابح الأمامية",
        name_en: "Front Brakes Inspection",
        explanation_ar: "فحص حالة المكابح الأمامية ومدى فعاليتها",
        explanation_en: "Check front brakes condition and effectiveness",
        evaluation: {
          score_achieved: 8,
          max_score: 10,
          point_condition: "good",
          passed: true,
          notes: "المكابح في حالة جيدة",
          images: []
        }
      },
      {
        id: 2,
        name_ar: "فحص المكابح الخلفية",
        name_en: "Rear Brakes Inspection", 
        explanation_ar: "فحص حالة المكابح الخلفية ومدى فعاليتها",
        explanation_en: "Check rear brakes condition and effectiveness",
        evaluation: {
          score_achieved: 7,
          max_score: 10,
          point_condition: "acceptable",
          passed: true,
          notes: "المكابح تحتاج صيانة قريباً",
          images: []
        }
      },
      {
        id: 3,
        name_ar: "فحص أحزمة الأمان",
        name_en: "Seatbelts Inspection",
        explanation_ar: "فحص حالة أحزمة الأمان ومدى فعاليتها",
        explanation_en: "Check seatbelts condition and effectiveness",
        evaluation: {
          score_achieved: 10,
          max_score: 10,
          point_condition: "excellent",
          passed: true,
          notes: "أحزمة الأمان في حالة ممتازة",
          images: []
        }
      }
    ];
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
        // console.log(`🖼️ Parsed JSON images for ${point.name_ar}:`, processedImages);
      } catch (e) {
        // If not JSON, treat as single image path
        processedImages = [rawImages];
        // console.log(`🖼️ Single image path for ${point.name_ar}:`, rawImages);
      }
    } else if (Array.isArray(rawImages)) {
      processedImages = rawImages;
      // console.log(`🖼️ Array images for ${point.name_ar}:`, rawImages);
    }

    // Debug image data
    // console.log(`🖼️ Processing point ${point.name_ar}:`, {
    //   point_images: point.point_images,
    //   evaluation_images: evaluation.images,
    //   point_images_final: processedImages
    // });

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

  // Create service info from the first braking point or use default
  const serviceInfo = allPoints.length > 0 ? {
    name_ar: "نظام المكابح والسلامة",
    name_en: "Braking & Safety",
    description_ar: "السلامة أولا , لذلك نحرص في أوتوسكور على فحص جميع أجزاء أنظمة السلامة العامة و البريكات و الأكياس الهوائية بشكل دقيق و التأكد من فعالية الأداء و مطابقتها لمعايير أوتوسكور العالمية",
    description_en: "When it comes to braking and safety, AutoScore makes sure that every single sensor and parts in the braking system and air-bag is functioning at the perfect condition and adhere to AutoScore standards.",
    brief_ar: "فحص نظام المكابح والسلامة",
    brief_en: "Braking and Safety Inspection"
  } : null;

  return {
    ...report,
    serviceInfo: serviceInfo,
    brakingPoints: processedPoints,
    totalPoints: processedPoints.length,
    passedPoints: processedPoints.filter((p) => p.point_passed).length,
    failedPoints: processedPoints.filter((p) => !p.point_passed).length,
  };
};

/**
 * Optimized point mapping function for braking data
 * Maps points to display format with better performance and memory efficiency
 */
const mapBrakingPoints = (points) => {
  if (!Array.isArray(points) || points.length === 0) return [];
  
  // console.log("Mapping braking points:", points.map(p => p.name_ar));
  
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
        // console.log(`🖼️ Processing images for ${p.name_ar}:`, p.point_images);
        gallery = p.point_images.map((img) => {
          let imageSrc = typeof img === 'string' ? img : img.src || img.url || '';
          
          // Add base URL if image path is relative
          if (imageSrc && !imageSrc.startsWith('http')) {
            imageSrc = `https://cd-root.com/syarahplus/backend/storage/app/public/${imageSrc}`;
          }
          
          // console.log(`🖼️ Image source:`, imageSrc);
          return {
            src: imageSrc,
            title: p.name_ar || "صورة الفحص",
            subtitle: p.explanation_ar || "",
          };
        }).filter(img => img.src); // Filter out empty images
        // console.log(`🖼️ Final gallery for ${p.name_ar}:`, gallery);
      } else {
        // console.log(`🖼️ No images found for ${p.name_ar}`);
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
      // console.warn("Error processing braking point:", err, p);
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
 * Distribute braking points across different filter categories
 * Optimized for better performance and accurate categorization
 */
const distributeBrakingPoints = (points) => {
  if (!Array.isArray(points) || points.length === 0) {
    // console.log("⚠️ No points to distribute");
    return {
      specifics: [],
      airbags: [],
      tires: [],
      brakes: [],
      seatbelts: [],
      traction: []
    };
  }

  const distributed = {
    specifics: [...points], // All points go to specifics - this is the main filter
    airbags: [],
    tires: [],
    brakes: [],
    seatbelts: [],
    traction: []
  };

  // Ensure all points are in specifics (main filter)
  // console.log(`📋 All ${points.length} points added to specifics filter`);

  // Log all points for debugging
  // console.log("🔄 Distributing braking points:", points.map(p => p.name_ar));

  // Optimized distribution using exact name matching
  points.forEach((point) => {
    const nameAr = point.name_ar || "";
    const nameEn = point.name_en || "";
    
    // console.log(`🔍 Analyzing point: ${nameAr} (${nameEn})`);
    
    // Categorize based on exact Arabic and English names
    // الأكياس الهوائية - SRS Component
    if (nameAr === "وجود جميع الاكياس الهوائية" || 
        nameEn === "SRS Component") {
      distributed.airbags.push(point);
      // console.log(`✅ Added to airbags: ${nameAr}`);
    }
    
    // الإطارات - Tires
    else if (nameAr === "عمق الفرزة الامامي" || 
             nameAr === "عمق الفرزة الخلفي" ||
             nameAr === "عمر الإطارات أقل من 4 سنوات" ||
             nameAr === "تفقد براغي العجلات" ||
             nameEn === "Front Tread Depth" ||
             nameEn === "Rear Tread Depth" ||
             nameEn === "Age less than 4 years" ||
             nameEn === "Wheel nuts") {
      distributed.tires.push(point);
      // console.log(`✅ Added to tires: ${nameAr}`);
    }
    
    // المكابح - Brakes
    else if (nameAr === "بريك \\ ديسك امامي يمين" ||
             nameAr === "بريك \\ ديسك امامي يسار" ||
             nameAr === "بريك \\ ديسك خلفي يمين" ||
             nameAr === "بريك \\ ديسك خلفي يسار" ||
             nameEn === "Front Right" ||
             nameEn === "Front Left" ||
             nameEn === "Rear Right" ||
             nameEn === "Rear Left") {
      distributed.brakes.push(point);
      // console.log(`✅ Added to brakes: ${nameAr}`);
    }
    
    // أحزمة الأمان - Seat Belts
    else if (nameAr === "حزام الأمان الأمامي اليمين" ||
             nameAr === "حزام الأمان الأمامي اليسار" ||
             nameAr === "حزام الأمان الخلفي اليمين" ||
             nameAr === "حزام الأمان الخلفي اليسار" ||
             nameEn === "Front Right Seat Belt" ||
             nameEn === "Front Left Seat Belt" ||
             nameEn === "Rear Right Seat Belt" ||
             nameEn === "Rear Left Seat Belt") {
      distributed.seatbelts.push(point);
      // console.log(`✅ Added to seatbelts: ${nameAr}`);
    }
    
    // أنظمة منع الانزلاق - ABS and Traction
    else if (nameAr === "نظام مانع الانزلاق" ||
             nameEn === "ABS and Skid Systems") {
      distributed.traction.push(point);
      // console.log(`✅ Added to traction: ${nameAr}`);
    }
    
    // If no exact match, try keyword matching as fallback
    else {
      const nameArLower = nameAr.toLowerCase();
      const nameEnLower = nameEn.toLowerCase();
      
      if (nameArLower.includes("اكياس") || nameArLower.includes("هوائية") || nameEnLower.includes("srs")) {
        distributed.airbags.push(point);
        // console.log(`✅ Added to airbags (fallback): ${nameAr}`);
      } else if (nameArLower.includes("فرزة") || nameArLower.includes("اطار") || nameArLower.includes("براغي") || nameEnLower.includes("tread") || nameEnLower.includes("nuts")) {
        distributed.tires.push(point);
        // console.log(`✅ Added to tires (fallback): ${nameAr}`);
      } else if (nameArLower.includes("بريك") || nameArLower.includes("ديسك") || nameEnLower.includes("brake")) {
        distributed.brakes.push(point);
        // console.log(`✅ Added to brakes (fallback): ${nameAr}`);
      } else if (nameArLower.includes("حزام") || nameEnLower.includes("seat")) {
        distributed.seatbelts.push(point);
        // console.log(`✅ Added to seatbelts (fallback): ${nameAr}`);
      } else if (nameArLower.includes("انزلاق") || nameEnLower.includes("abs")) {
        distributed.traction.push(point);
        // console.log(`✅ Added to traction (fallback): ${nameAr}`);
      } else {
        // console.log(`⚠️ No category found for: ${nameAr}`);
      }
    }
  });

  // Log any points that weren't categorized
  const uncategorizedPoints = points.filter(point => {
    const nameAr = point.name_ar || "";
    const nameEn = point.name_en || "";
    
    return !distributed.airbags.includes(point) &&
           !distributed.tires.includes(point) &&
           !distributed.brakes.includes(point) &&
           !distributed.seatbelts.includes(point) &&
           !distributed.traction.includes(point);
  });
  
  if (uncategorizedPoints.length > 0) {
    // console.log("⚠️ Uncategorized points:", uncategorizedPoints.map(p => p.name_ar));
    // Add uncategorized points to the most appropriate category or specifics
    distributed.specifics.push(...uncategorizedPoints);
  }

  // Log distribution results for debugging
  // console.log("📊 Braking distribution results:", {
  //   specifics: distributed.specifics.length,
  //   airbags: distributed.airbags.length,
  //   tires: distributed.tires.length,
  //   brakes: distributed.brakes.length,
  //   seatbelts: distributed.seatbelts.length,
  //   traction: distributed.traction.length
  // });

  // Log detailed breakdown of each category
  // console.log("📋 Airbags points:", distributed.airbags.map(p => p.name_ar));
  // console.log("📋 Tires points:", distributed.tires.map(p => p.name_ar));
  // console.log("📋 Brakes points:", distributed.brakes.map(p => p.name_ar));
  // console.log("📋 Seatbelts points:", distributed.seatbelts.map(p => p.name_ar));
  // console.log("📋 Traction points:", distributed.traction.map(p => p.name_ar));

  return distributed;
};

// Component definition
const Sefity = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationData = location.state;

  // Optimized state management
  const [Filterr6, setFilterr6] = useState("specifics");
  const [openInfoIndex, setOpenInfoIndex] = useState(null);
  const [openGallery, setOpenGallery] = useState(null);
  const [brakingData, setBrakingData] = useState(null);
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
      const cacheKey = `braking_${navigationData?.reportNum || 'default'}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const processedData = processBrakingData(parsedData);
        processBrakingInspectionData(processedData);
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
            
            const processedData = processBrakingData(response.data);
            processBrakingInspectionData(processedData);
            setIsLoading(false);
            return;
          }
        } catch (apiError) {
          // console.error("API Error:", apiError);
          // Try fallback data if API fails
        }
      }

      // Check if we have navigation data
      if (navigationData?.report || navigationData?.searchResults) {
        const navData = navigationData.searchResults || navigationData.report;
        // console.log("Navigation data:", navData);

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
          
          // console.log("Target report for braking:", targetReport);
          const processedData = processBrakingData(targetReport);
          processBrakingInspectionData(processedData);
        } else if (navData?.data) {
          // console.log("Using navData.data for braking:", navData.data);
          const processedData = processBrakingData(navData);
          processBrakingInspectionData(processedData);
        } else {
          // console.log("Using navData directly for braking:", navData);
          const processedData = processBrakingData(navData);
          processBrakingInspectionData(processedData);
        }
        
        setIsLoading(false);
        return;
      }

      setError("يرجى استخدام صفحة البحث للوصول إلى التقارير");
    } catch (err) {
      // console.error("خطأ في جلب البيانات:", err);
      setError("حدث خطأ في جلب البيانات");
    } finally {
      setIsLoading(false);
    }
  }, [navigationData, storedToken]);

  /**
   * Process braking data from processed inspection data with memory optimization
   */
  const processBrakingInspectionData = useCallback((processedData) => {
    if (!processedData) {
      setError("لا توجد بيانات متاحة");
      return;
    }
    
    // console.log("🔄 Processing braking data:", processedData);

    const allPoints = processedData.brakingPoints || [];
    // console.log("📋 All braking points:", allPoints);
    // console.log("📋 All braking points names:", allPoints.map(p => p.name_ar));
    
    // Ensure we have points to work with
    if (allPoints.length === 0) {
      // console.log("⚠️ No points found, creating fallback data");
      setError("لا توجد نقاط فحص متاحة - يرجى التحقق من البيانات");
      return;
    }
    
    // Use service description from API if available, otherwise use default
    const serviceDescription = processedData.serviceInfo?.description_ar || 
      "في كارسيرفيس نقوم بتقييم و فحص نظام المكابح والسلامة للسيارة اعتمادا على المعايير العالمية و التأكد من سلامة جميع مكونات النظام و فعاليتها في الحفاظ على سلامة الركاب حسب نظام CCM العالمي.";
    
    // Distribute points across different filters
    const distributedPoints = distributeBrakingPoints(allPoints);
    // console.log("📊 Distributed points:", distributedPoints);
    
    // Create mapped control without useMemo (since it's inside callback)
    const mappedControl = {
      specifics: mapBrakingPoints(distributedPoints.specifics),
      airbags: mapBrakingPoints(distributedPoints.airbags),
      tires: mapBrakingPoints(distributedPoints.tires),
      brakes: mapBrakingPoints(distributedPoints.brakes),
      seatbelts: mapBrakingPoints(distributedPoints.seatbelts),
      traction: mapBrakingPoints(distributedPoints.traction),
      carImage: iallbackImage,
    };

    // Log final mapped control results
    // console.log("✅ Final mapped control:", {
    //   specifics: mappedControl.specifics.length,
    //   airbags: mappedControl.airbags.length,
    //   tires: mappedControl.tires.length,
    //   brakes: mappedControl.brakes.length,
    //   seatbelts: mappedControl.seatbelts.length,
    //   traction: mappedControl.traction.length
    // });

    // Verify we have data to display
    const totalMappedPoints = Object.values(mappedControl).reduce((total, category) => {
      return total + (Array.isArray(category) ? category.length : 0);
    }, 0);
    
    // console.log("📊 Total mapped points:", totalMappedPoints);
    
    if (totalMappedPoints === 0) {
      // console.log("❌ No mapped points found, this will cause display issues");
    }

    // Create optimized structure with API data
    const BrakingData = {
      itimis7: [
        {
          title: processedData.serviceInfo?.name_ar || "المكابح والسلامه",
          type: "details",
          carInformation1: { images: [iallbackImage, ] },
          descriptionPoints8: [
            serviceDescription,
            "يتم اجراء الفحص عن طريق :",
            "نظام قياس الانحرافات بالليزر",
            "الفحص النظري المختص",
            "يغطي هذا القسم النقاط التالية :",
            "الأكياس الهوائية",
            "الإطارات",
            "المكابح وأجزائها",
            "أحزمة الأمان",
            "أنظمة منع الانزلاق",
            "ملاحظة هامة : يتم الفحص دون أي ذكر أو مقارنة مع مصطلحات الفحص التقليدية"
          ],
          Power: mappedControl,
        },
      ],
    };

    // Verify all points are properly distributed
    // console.log("🔍 Final verification of point distribution:");
    // console.log("📊 Total points in specifics:", mappedControl.specifics.length);
    // console.log("📊 Total points in airbags:", mappedControl.airbags.length);
    // console.log("📊 Total points in tires:", mappedControl.tires.length);
    // console.log("📊 Total points in brakes:", mappedControl.brakes.length);
    // console.log("📊 Total points in seatbelts:", mappedControl.seatbelts.length);
    // console.log("📊 Total points in traction:", mappedControl.traction.length);

    // console.log("Final braking data:", BrakingData);
    // console.log("Final specifics points count:", BrakingData.itimis7[0].Power.specifics.length);
    // console.log("Final specifics points names:", BrakingData.itimis7[0].Power.specifics.map(p => p.label));
    setBrakingData(BrakingData);
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

  // Memoized filter buttons configuration for braking system
  const filterButtons = useMemo(() => [
    { key: "specifics", label: "جميع نقاط الفحص" },
    { key: "airbags", label: "الأكياس الهوائية" },
    { key: "tires", label: "الإطارات" },
    { key: "brakes", label: "المكابح وأجزائها" },
    { key: "seatbelts", label: "أحزمة الأمان" },
    { key: "traction", label: "أنظمة منع الانزلاق" },
  ], []);

  // Memoized current filter data for better performance
  const currentFilterData = useMemo(() => {
    if (!brakingData?.itimis7?.[0]?.Power) {
      // console.log("⚠️ No braking data available for filter");
      return [];
    }
    
    const filterData = brakingData.itimis7[0].Power[Filterr6] || [];
    // console.log(`🔍 Filter ${Filterr6} has ${filterData.length} points:`, filterData.map(p => p.label));
    
    return filterData;
  }, [brakingData, Filterr6]);

  // Optimized event handlers
  const handleFilterChange = useCallback((key) => {
    setFilterr6(key);
  }, []);

  const handleInfoClick = useCallback((e, colIdx, i) => {
    e.stopPropagation();
    const newIndex = openInfoIndex === `${colIdx}-${i}` ? null : `${colIdx}-${i}`;
    setOpenInfoIndex(newIndex);
  }, [openInfoIndex]);

  const handleGalleryOpen = useCallback((gallery, start = 0) => {
    setOpenGallery({ images: gallery, start });
  }, []);

  const handleGalleryClose = useCallback(() => {
    setOpenGallery(null);
  }, []);

  // Memoized render function for individual points with better performance
  const renderPoint = useCallback((row, colIdx, i) => {
    if (!row) {
      // console.log("⚠️ Empty row data provided to renderPoint");
      return null;
    }
    
    const stat = row.Stats || "❌";
    const galleryImages = row.gallery || [];
    const hasInfo = Boolean(row.info && row.info.trim());
    const hasNotes = Boolean(row.point_notes && row.point_notes.trim());
    const hasScore = row.score_achieved !== undefined && row.max_score !== undefined;
    const hasImages = galleryImages.length > 0;
    
    // console.log(`🎯 Rendering point: ${row.label}`, {
    //   stat,
    //   hasInfo,
    //   hasNotes,
    //   hasScore,
    //   hasImages,
    //   score: `${row.score_achieved}/${row.max_score}`
    // });
    
    return (
      <div key={`${colIdx}-${i}`} className="pb-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
        {/* Main row */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div className="flex items-center gap-3 relative">
            {hasInfo && (
              <button
                onClick={(e) => handleInfoClick(e, colIdx, i)}
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
              {row.label || "نقطة فحص غير محددة"}
            </span>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <span
              className={`font-bold text-lg ${
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
              onClick={() => handleGalleryOpen(galleryImages, 0)}
              onError={(e) => {
                // console.log(`🖼️ Image failed to load for ${row.label}:`, galleryImages[0].src);
                e.target.src = iallbackImage;
              }}
              onLoad={() => {
                // console.log(`🖼️ Image loaded successfully for ${row.label}:`, galleryImages[0].src);
              }}
              loading="lazy"
            />
          </div>
        )}
      </div>
    );
  }, [openInfoIndex, handleInfoClick, handleGalleryOpen]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل بيانات نظام المكابح والسلامة...</p>
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
  if (!brakingData) {
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
    <div id="المكابح-السلامه">
      <div className="space-y-4 mt-6">
        {brakingData.itimis7.map((item, idx) => (
          <Disclosure key={idx}>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <span className="font-medium">{item.title}</span>
                  <FaChevronDown
                    className={`transform transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-b-md border border-t-0 border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* صورة السيارة */}
                    <div className="flex flex-col items-center justify-center p-6 shadow rounded-lg h-full">
                      {item.carInformation1.images.map((img, i) => (
                        <img key={i} src={img} alt={`car ${i}`} className="w-full h-auto md:h-full max-h-64 sm:max-h-80 md:max-h-[800px] object-contain rounded-lg hover:scale-105 shadow-2xl" />
                      ))}
                    </div>

                    {/* نصوص الوصف */}
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                        {item.descriptionPoints8.map((point, index) => (
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
                          Filterr6 === btn.key
                            ? "bg-blue-500 text-white dark:bg-blue-600"
                            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  {/* Filter content */}
                  {["specifics", "airbags", "tires", "brakes", "seatbelts", "traction"].includes(Filterr6) && (
                    (() => {
                      const src = currentFilterData;
                      
                      if (src.length === 0) {
                        return (
                          <div className="mt-10 text-center py-8">
                            <div className="text-gray-500 dark:text-gray-400">
                              <FaInfoCircle className="mx-auto mb-4 text-4xl" />
                              <p className="text-lg">لا توجد نقاط فحص متاحة في هذا القسم</p>
                              <p className="text-sm mt-2">يرجى التحقق من البيانات أو تجربة فلتر آخر</p>
                              <div className="mt-4 text-xs text-gray-400">
                                <p>فلتر الحالي: {Filterr6}</p>
                                <p>البيانات المتاحة: {brakingData?.itimis7?.[0]?.Power ? 'نعم' : 'لا'}</p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      
                      const mid = Math.ceil(src.length / 2);
                      const cols = [src.slice(0, mid), src.slice(mid)];

                      return (
                        <div className="mt-10">
                          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            عرض {src.length} نقطة فحص في قسم "{filterButtons.find(btn => btn.key === Filterr6)?.label}"
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16">
                            {cols.map((col, colIdx) => (
                              <div key={colIdx} className="space-y-6">
                                {col.map((row, i) => renderPoint(row, colIdx, i))}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()
                  )}

                  {openGallery && (
                    <FullScreenGallery
                      images={openGallery.images}
                      startIndex={openGallery.start}
                      onClose={handleGalleryClose}
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

// Export the component with memo for performance optimization
export default memo(Sefity);