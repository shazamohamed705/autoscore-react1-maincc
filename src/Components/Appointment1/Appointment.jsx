import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, FaPhoneAlt, FaCar, FaCalendarAlt, 
  FaFileUpload, FaMapMarkerAlt, FaClipboardList 
} from "react-icons/fa";

const Appointment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [carImages, setCarImages] = useState([null, null, null]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [locationType, setLocationType] = useState("center");
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState("");
  
  // Vehicle selection data
  const [manufacturers, setManufacturers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [versions, setVersions] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [transmissionTypes, setTransmissionTypes] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  
  // Selected values
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedTransmissionType, setSelectedTransmissionType] = useState("");
  const [selectedBodyType, setSelectedBodyType] = useState("");
  
  // Additional vehicle details
  const [vinNumber, setVinNumber] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleCategory, setVehicleCategory] = useState("");
  const [engineCapacity, setEngineCapacity] = useState("");
  const [productionYear, setProductionYear] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");
  const [interiorColor, setInteriorColor] = useState("");
  const [drivetrain, setDrivetrain] = useState("");

  useEffect(() => {
    // Redirect to login if not authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoadingData(true);
        setDataError("");

        // Fetch all initial data in parallel
        const [
          servicesResponse,
          manufacturersResponse,
          fuelTypesResponse,
          transmissionTypesResponse,
          bodyTypesResponse
        ] = await Promise.all([
          axios.get("https://cd-root.com/syarahplus/backend/api/users/inspection/services"),
          axios.get("https://cd-root.com/syarahplus/backend/api/users/manufacturers"),
          axios.get("https://cd-root.com/syarahplus/backend/api/users/fuel-types"),
          axios.get("https://cd-root.com/syarahplus/backend/api/users/transmission-types"),
          axios.get("https://cd-root.com/syarahplus/backend/api/users/body-types")
        ]);

        if (servicesResponse.data?.success) {
          setServices(servicesResponse.data.data || []);
        }

        if (manufacturersResponse.data?.success) {
          setManufacturers(manufacturersResponse.data.data || []);
        }

        if (fuelTypesResponse.data?.success) {
          setFuelTypes(fuelTypesResponse.data.data || []);
        }

        if (transmissionTypesResponse.data?.success) {
          setTransmissionTypes(transmissionTypesResponse.data.data || []);
        }

        if (bodyTypesResponse.data?.success) {
          setBodyTypes(bodyTypesResponse.data.data || []);
        }

      } catch (error) {
        console.error("Error fetching initial data:", error);
        
        // Use mock data if API fails
        const mockServices = [
          { id: 1, name_ar: "فحص شامل", name_en: "Comprehensive Inspection", description_ar: "فحص شامل للمركبة" },
          { id: 2, name_ar: "فحص السلامة", name_en: "Safety Inspection", description_ar: "فحص أنظمة السلامة" },
          { id: 3, name_ar: "فحص الفني", name_en: "Technical Inspection", description_ar: "فحص فني متخصص" }
        ];
        
        const mockManufacturers = [
          { id: 1, name_ar: "تويوتا", name_en: "Toyota", mfr_code: "TOY" },
          { id: 2, name_ar: "هونداي", name_en: "Hyundai", mfr_code: "HYU" },
          { id: 3, name_ar: "نيسان", name_en: "Nissan", mfr_code: "NIS" },
          { id: 4, name_ar: "هوندا", name_en: "Honda", mfr_code: "HON" },
          { id: 5, name_ar: "فورد", name_en: "Ford", mfr_code: "FOR" }
        ];
        
        setServices(mockServices);
        setManufacturers(mockManufacturers);
        setDataError("تم تحميل البيانات المحلية. قد تكون بعض البيانات غير محدثة.");
      } finally {
        setLoadingData(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch brands when manufacturer is selected
  useEffect(() => {
    const fetchBrands = async () => {
      if (!selectedManufacturer) {
        setBrands([]);
        setVersions([]);
        setSelectedBrand("");
        setSelectedVersion("");
        return;
      }

      try {
        const response = await axios.get(
          `https://cd-root.com/syarahplus/backend/api/users/brands?manufacturer_id=${selectedManufacturer}`
        );
        
        if (response.data?.success) {
          setBrands(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrands([]);
      }
    };

    fetchBrands();
  }, [selectedManufacturer]);

  // Fetch versions when brand is selected
  useEffect(() => {
    const fetchVersions = async () => {
      if (!selectedBrand) {
        setVersions([]);
        setSelectedVersion("");
        return;
      }

      try {
        const response = await axios.get(
          `https://cd-root.com/syarahplus/backend/api/users/brand-versions?brand_id=${selectedBrand}`
        );
        
        if (response.data?.success) {
          setVersions(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching versions:", error);
        setVersions([]);
      }
    };

    fetchVersions();
  }, [selectedBrand]);

  const handleImageChange = (index, file) => {
    const newImages = [...carImages];
    // Revoke old preview URL to avoid memory leaks
    if (newImages[index]) URL.revokeObjectURL(newImages[index]);
    newImages[index] = file ? URL.createObjectURL(file) : null;
    setCarImages(newImages);
  };

  useEffect(() => () => {
    // Cleanup all preview URLs on unmount
    carImages.forEach((url) => url && URL.revokeObjectURL(url));
  }, [carImages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitError("");
    setSubmitSuccess("");
    setSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData();

      // Validate required fields
      if (!form.service_id.value || !selectedManufacturer || !selectedBrand || !selectedVersion || !selectedFuelType || !form.mileage.value || 
          !vinNumber || !vehicleCategory || !engineCapacity || !productionYear || !exteriorColor || !interiorColor || 
          !selectedTransmissionType || !drivetrain) {
        setSubmitError("يرجى ملء جميع الحقول المطلوبة");
        setSubmitting(false);
        return;
      }

      // Required API params - convert to integers as expected by backend
      formData.append("service_id", parseInt(form.service_id.value.trim()));
      formData.append("location_type", form.location_type.value);
      
      // Vehicle selection data
      formData.append("manufacturer_id", parseInt(selectedManufacturer));
      formData.append("brand_id", parseInt(selectedBrand));
      formData.append("version_id", parseInt(selectedVersion));
      formData.append("fuel_type_id", parseInt(selectedFuelType));
      formData.append("mileage", parseInt(form.mileage.value.trim()));
      
      // Additional vehicle details
      formData.append("vin_number", vinNumber);
      formData.append("license_plate", licensePlate || "");
      formData.append("vehicle_category", vehicleCategory);
      formData.append("engine_capacity", parseInt(engineCapacity));
      formData.append("production_year", parseInt(productionYear));
      formData.append("exterior_color", exteriorColor);
      formData.append("interior_color", interiorColor);
      formData.append("transmission_type", selectedTransmissionType);
      formData.append("drivetrain", drivetrain);
      
      // Address is required only when location_type is 'home'
      if (form.location_type.value === "home") {
        if (!form.address.value.trim()) {
          setSubmitError("العنوان مطلوب عند اختيار الفحص في المنزل");
          setSubmitting(false);
          return;
        }
        formData.append("address", form.address.value.trim());
      }
      
      // Customer notes is optional
      if (form.customer_notes && form.customer_notes.value.trim()) {
        formData.append("customer_notes", form.customer_notes.value.trim());
      }

      // Debug: Log form data
      console.log("Form data being sent:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        "https://cd-root.com/syarahplus/backend/api/users/inspection/request",
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            "Accept": "application/json"
          },
        }
      );

      // Handle successful response
      if (response.data && response.data.success) {
        const data = response.data.data;
        setSubmitSuccess(
          `تم إرسال طلب الحجز بنجاح! رقم التقرير: ${data.report_number || 'غير محدد'}`
        );
        
        // Reset form
        form.reset();
        setCarImages([null, null, null]);
        setSelectedFeatures([]);
        setLocationType("center");
        
        // Reset vehicle selection
        setSelectedManufacturer("");
        setSelectedBrand("");
        setSelectedVersion("");
        setSelectedFuelType("");
        setSelectedTransmissionType("");
        setSelectedBodyType("");
        
        // Reset additional vehicle details
        setVinNumber("");
        setLicensePlate("");
        setVehicleCategory("");
        setEngineCapacity("");
        setProductionYear("");
        setExteriorColor("");
        setInteriorColor("");
        setDrivetrain("");
        
        // Show additional info if available
        if (data.inspection_points || data.estimated_duration) {
          setTimeout(() => {
            let additionalInfo = [];
            if (data.inspection_points) additionalInfo.push(`عدد نقاط الفحص: ${data.inspection_points}`);
            if (data.estimated_duration) additionalInfo.push(`المدة المتوقعة: ${data.estimated_duration}`);
            
            if (additionalInfo.length > 0) {
              setSubmitSuccess(prev => prev + ` (${additionalInfo.join(' - ')})`);
            }
          }, 2000);
        }
      } else {
        setSubmitError("فشل إرسال الطلب - استجابة غير صحيحة من الخادم");
      }
    } catch (err) {
      console.error("Appointment submission error:", err);
      console.error("Error details:", {
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status
      });
      
      // Handle validation errors
      if (err.response?.status === 422 && err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        setSubmitError(`خطأ في البيانات: ${errorMessages.join(", ")}`);
      }
      // Handle other API errors
      else if (err.response?.data?.message) {
        setSubmitError(err.response.data.message);
      }
      // Handle network errors
      else if (err.code === 'NETWORK_ERROR' || !err.response) {
        setSubmitError("خطأ في الاتصال بالخادم. تأكد من اتصالك بالإنترنت");
      }
      // Handle CORS errors
      else if (err.message?.includes('CORS') || err.message?.includes('blocked')) {
        setSubmitError("خطأ في CORS - تأكد من إعدادات الخادم");
      }
      // Generic error
      else {
        setSubmitError(`فشل إرسال الطلب: ${err.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  // Ensure native select opens downward without janky motion
  const scrollSelectIntoView = (event) => {
    try {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const neededSpace = 260; // approx menu height to open downward

      // Add temporary bottom padding only if element is near bottom
      if (viewportH - rect.bottom < neededSpace) {
        document.body.style.paddingBottom = '320px';
        const desiredTopPx = 80; // keep select near top area
        const delta = rect.top - desiredTopPx;
        if (delta !== 0) {
          window.scrollBy({ top: delta, behavior: 'auto' });
        }
      }
    } catch (_) {}
  };

  const clearSelectExtraSpace = () => {
    try {
      document.body.style.paddingBottom = '';
    } catch (_) {}
  };

  const carFeaturesData = {
    General: ["Standard ستاندرد","Bought from dealership وارد الشركة","Single Motor محرك واحد","Dual Motor محرك مزدوج","Standard Plus ستاندرد بلس","Mid Range متوسط المدى","Long Range بعيد المدى"],
    Interior: ["Heated steering wheel تدفئة ستيرنج","Head-up display عرض المعلومات","Front massage seats مقاعد مساج","Front seat ventilation كراسي مبردة","Front heated seats كراسي مدفئة"],
    Security: ["All wheel drive دفع الرباعي","High-beam assistant تشغيل الضوء العالي","Night view assist رؤية ليلية","Tire pressure monitoring حساسات ضغط الإطارات"]
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6 transition-colors duration-500 overflow-visible">
      <div className="max-w-6xl mx-auto overflow-visible">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
          احجز موعد الفحص
        </h1>
        
        {/* معلومات مساعدة */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold text-lg">معلومات مهمة</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>اختر المركبة وخدمة الفحص من القوائم المنسدلة</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>العنوان مطلوب فقط عند اختيار "فحص في المنزل"</span>
              </li>
            </ul>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>سيتم إنشاء رقم تقرير فريد بعد إرسال الطلب</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>تأكد من صحة البيانات قبل الإرسال</span>
              </li>
            </ul>
          </div>
        </div>

        {/* رسالة خطأ تحميل البيانات */}
        {dataError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <div className="text-red-600 dark:text-red-400 text-xl mr-3">⚠</div>
              <div className="text-red-800 dark:text-red-200 font-medium">{dataError}</div>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-red-600 dark:text-red-400 text-sm underline hover:text-red-800 dark:hover:text-red-300"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {loadingData ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">جاري تحميل البيانات...</p>
              <p className="text-sm text-gray-500 mt-2">يرجى الانتظار...</p>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-500 overflow-visible">

          {/* نوع الفحص */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              نوع الفحص <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative overflow-visible hover:border-red-300 dark:hover:border-red-600 transition-colors z-20">
              <FaPhoneAlt className="text-red-500 mr-3 flex-shrink-0" />
              <select 
                name="service_id" 
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white text-sm appearance-none cursor-pointer text-center" 
                dir="rtl"
                style={{ textAlignLast: 'center' }}
                required 
                disabled={loadingData}
                onFocus={scrollSelectIntoView}
                onMouseDown={scrollSelectIntoView}
                onBlur={clearSelectExtraSpace}
              >
                <option value="" disabled>
                  {loadingData ? "جاري تحميل الخدمات..." : "اختر نوع الفحص"}
                </option>
                {services.map((service) => (
                  <option key={service.id} value={service.id} className="text-gray-800 dark:text-gray-200">
                    {service.name_ar || service.name_en} 
                    {service.inspection_points_count ? ` (${service.inspection_points_count} نقطة)` : ''}
                    {service.estimated_duration ? ` - ${service.estimated_duration}` : ''}
                  </option>
                ))}
              </select>
              <span className="absolute left-3 pointer-events-none text-gray-500 dark:text-gray-300 text-xs">▼</span>
            </div>
          </div>

          {/* النوع (المصنع) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              النوع <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative overflow-visible hover:border-red-300 dark:hover:border-red-600 transition-colors z-20">
              <FaUser className="text-red-500 mr-3 flex-shrink-0" />
              <select 
                value={selectedManufacturer}
                onChange={(e) => {
                  setSelectedManufacturer(e.target.value);
                  setSelectedBrand("");
                  setSelectedVersion("");
                }}
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white text-sm appearance-none cursor-pointer text-center" 
                dir="rtl"
                style={{ textAlignLast: 'center' }}
                required 
                disabled={loadingData}
                onFocus={scrollSelectIntoView}
                onMouseDown={scrollSelectIntoView}
                onBlur={clearSelectExtraSpace}
              >
                <option value="" disabled>
                  {loadingData ? "جاري تحميل المصنعين..." : "اختر النوع"}
                </option>
                {manufacturers.map((manufacturer) => (
                  <option key={manufacturer.id} value={manufacturer.id} className="text-gray-800 dark:text-gray-200">
                    {manufacturer.name_ar || manufacturer.name_en}
                  </option>
                ))}
              </select>
              <span className="absolute left-3 pointer-events-none text-gray-500 dark:text-gray-300 text-xs">▼</span>
            </div>
          </div>

          {/* نوع المحرك */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              نوع المحرك <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative overflow-visible hover:border-red-300 dark:hover:border-red-600 transition-colors z-20">
              <FaCar className="text-red-500 mr-3 flex-shrink-0" />
              <select 
                value={selectedFuelType}
                onChange={(e) => setSelectedFuelType(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white text-sm appearance-none cursor-pointer text-center" 
                dir="rtl"
                style={{ textAlignLast: 'center' }}
                required 
                disabled={loadingData}
                onFocus={scrollSelectIntoView}
                onMouseDown={scrollSelectIntoView}
                onBlur={clearSelectExtraSpace}
              >
                <option value="" disabled>
                  {loadingData ? "جاري تحميل أنواع المحرك..." : "اختر نوع المحرك"}
                </option>
                {fuelTypes.map((fuelType) => (
                  <option key={fuelType.id} value={fuelType.id} className="text-gray-800 dark:text-gray-200">
                    {fuelType.name_ar || fuelType.name_en}
                  </option>
                ))}
              </select>
              <span className="absolute left-3 pointer-events-none text-gray-500 dark:text-gray-300 text-xs">▼</span>
            </div>
          </div>

          {/* الموديل */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              الموديل <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative overflow-visible hover:border-red-300 dark:hover:border-red-600 transition-colors z-20">
              <FaUser className="text-red-500 mr-3 flex-shrink-0" />
              <select 
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setSelectedVersion("");
                }}
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white text-sm appearance-none cursor-pointer text-center" 
                dir="rtl"
                style={{ textAlignLast: 'center' }}
                required 
                disabled={!selectedManufacturer || loadingData}
                onFocus={scrollSelectIntoView}
                onMouseDown={scrollSelectIntoView}
                onBlur={clearSelectExtraSpace}
              >
                <option value="" disabled>
                  {!selectedManufacturer ? "اختر النوع أولاً" : "اختر الموديل"}
                </option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id} className="text-gray-800 dark:text-gray-200">
                    {brand.model_name}
                  </option>
                ))}
              </select>
              <span className="absolute left-3 pointer-events-none text-gray-500 dark:text-gray-300 text-xs">▼</span>
            </div>
          </div>

          {/* المسافة المقطوعة */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              المسافة المقطوعة <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative hover:border-red-300 dark:hover:border-red-600 transition-colors">
              <FaCar className="text-red-500 mr-3 flex-shrink-0" />
              <input 
                name="mileage" 
                type="number" 
                placeholder="أدخل المسافة المقطوعة بالكيلومتر" 
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 text-sm" 
                required 
                min="0"
              />
            </div>
          </div>

          {/* سنة الإنتاج */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              سنة الإنتاج <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative overflow-visible hover:border-red-300 dark:hover:border-red-600 transition-colors z-20">
              <FaUser className="text-red-500 mr-3 flex-shrink-0" />
              <select 
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white text-sm appearance-none cursor-pointer text-center" 
                dir="rtl"
                style={{ textAlignLast: 'center' }}
                required 
                disabled={!selectedBrand || loadingData}
                onFocus={scrollSelectIntoView}
                onMouseDown={scrollSelectIntoView}
                onBlur={clearSelectExtraSpace}
              >
                <option value="" disabled>
                  {!selectedBrand ? "اختر الموديل أولاً" : "اختر سنة الإنتاج"}
                </option>
                {versions.map((version) => (
                  <option key={version.id} value={version.id} className="text-gray-800 dark:text-gray-200">
                    {version.year_of_manufacture} {version.release_name ? `- ${version.release_name}` : ''}
                  </option>
                ))}
              </select>
              <span className="absolute left-3 pointer-events-none text-gray-500 dark:text-gray-300 text-xs">▼</span>
            </div>
          </div>

          {/* رقم الهيكل (VIN) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              رقم الهيكل (VIN) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative hover:border-red-300 dark:hover:border-red-600 transition-colors">
              <FaUser className="text-red-500 mr-3 flex-shrink-0" />
              <input 
                name="vin_number" 
                type="text" 
                value={vinNumber}
                onChange={(e) => setVinNumber(e.target.value)}
                placeholder="أدخل رقم الهيكل (17 رقم)" 
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 text-sm" 
                required 
                maxLength="17"
              />
            </div>
          </div>

          {/* رقم اللوحة */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              رقم اللوحة
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative hover:border-red-300 dark:hover:border-red-600 transition-colors">
              <FaUser className="text-red-500 mr-3 flex-shrink-0" />
              <input 
                name="license_plate" 
                type="text" 
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                placeholder="أدخل رقم اللوحة" 
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 text-sm" 
              />
            </div>
          </div>

          {/* فئة المركبة */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              فئة المركبة <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative overflow-visible hover:border-red-300 dark:hover:border-red-600 transition-colors z-20">
              <FaCar className="text-red-500 mr-3 flex-shrink-0" />
              <select 
                value={vehicleCategory}
                onChange={(e) => setVehicleCategory(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white text-sm appearance-none cursor-pointer text-center" 
                dir="rtl"
                style={{ textAlignLast: 'center' }}
                required 
                onFocus={scrollSelectIntoView}
                onMouseDown={scrollSelectIntoView}
                onBlur={clearSelectExtraSpace}
              >
                <option value="" disabled>اختر فئة المركبة</option>
                <option value="سيارة">سيارة</option>
                <option value="شاحنة">شاحنة</option>
                <option value="دراجة نارية">دراجة نارية</option>
                <option value="حافلة">حافلة</option>
                <option value="جرار">جرار</option>
              </select>
              <span className="absolute left-3 pointer-events-none text-gray-500 dark:text-gray-300 text-xs">▼</span>
            </div>
          </div>

          {/* سعة المحرك */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              سعة المحرك (سم³) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative hover:border-red-300 dark:hover:border-red-600 transition-colors">
              <FaUser className="text-red-500 mr-3 flex-shrink-0" />
              <input 
                name="engine_capacity" 
                type="number" 
                value={engineCapacity}
                onChange={(e) => setEngineCapacity(e.target.value)}
                placeholder="أدخل سعة المحرك" 
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 text-sm" 
                required 
                min="0"
              />
            </div>
          </div>

          {/* سنة الإنتاج */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              سنة الإنتاج <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative hover:border-red-300 dark:hover:border-red-600 transition-colors">
              <FaUser className="text-red-500 mr-3 flex-shrink-0" />
              <input 
                name="production_year" 
                type="number" 
                value={productionYear}
                onChange={(e) => setProductionYear(e.target.value)}
                placeholder="أدخل سنة الإنتاج" 
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 text-sm" 
                required 
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          {/* اللون الخارجي */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              اللون الخارجي <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative hover:border-red-300 dark:hover:border-red-600 transition-colors">
              <FaUser className="text-red-500 mr-3 flex-shrink-0" />
              <input 
                name="exterior_color" 
                type="text" 
                value={exteriorColor}
                onChange={(e) => setExteriorColor(e.target.value)}
                placeholder="أدخل اللون الخارجي" 
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 text-sm" 
                required 
              />
            </div>
          </div>

          {/* اللون الداخلي */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              اللون الداخلي <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative hover:border-red-300 dark:hover:border-red-600 transition-colors">
              <FaUser className="text-red-500 mr-3 flex-shrink-0" />
              <input 
                name="interior_color" 
                type="text" 
                value={interiorColor}
                onChange={(e) => setInteriorColor(e.target.value)}
                placeholder="أدخل اللون الداخلي" 
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 text-sm" 
                required 
              />
            </div>
          </div>

          {/* نوع ناقل الحركة */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              نوع ناقل الحركة <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative overflow-visible hover:border-red-300 dark:hover:border-red-600 transition-colors z-20">
              <FaCar className="text-red-500 mr-3 flex-shrink-0" />
              <select 
                value={selectedTransmissionType}
                onChange={(e) => setSelectedTransmissionType(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white text-sm appearance-none cursor-pointer text-center" 
                dir="rtl"
                style={{ textAlignLast: 'center' }}
                required 
                disabled={loadingData}
                onFocus={scrollSelectIntoView}
                onMouseDown={scrollSelectIntoView}
                onBlur={clearSelectExtraSpace}
              >
                <option value="" disabled>
                  {loadingData ? "جاري تحميل أنواع ناقل الحركة..." : "اختر نوع ناقل الحركة"}
                </option>
                {transmissionTypes.map((transmissionType) => (
                  <option key={transmissionType.id} value={transmissionType.id} className="text-gray-800 dark:text-gray-200">
                    {transmissionType.name_ar || transmissionType.name_en}
                  </option>
                ))}
              </select>
              <span className="absolute left-3 pointer-events-none text-gray-500 dark:text-gray-300 text-xs">▼</span>
            </div>
          </div>

          {/* نوع الدفع */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              نوع الدفع <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative overflow-visible hover:border-red-300 dark:hover:border-red-600 transition-colors z-20">
              <FaCar className="text-red-500 mr-3 flex-shrink-0" />
              <select 
                value={drivetrain}
                onChange={(e) => setDrivetrain(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white text-sm appearance-none cursor-pointer text-center" 
                dir="rtl"
                style={{ textAlignLast: 'center' }}
                required 
                onFocus={scrollSelectIntoView}
                onMouseDown={scrollSelectIntoView}
                onBlur={clearSelectExtraSpace}
              >
                <option value="" disabled>اختر نوع الدفع</option>
                <option value="دفع أمامي">دفع أمامي</option>
                <option value="دفع خلفي">دفع خلفي</option>
                <option value="دفع رباعي">دفع رباعي</option>
                <option value="دفع كامل">دفع كامل</option>
              </select>
              <span className="absolute left-3 pointer-events-none text-gray-500 dark:text-gray-300 text-xs">▼</span>
            </div>
          </div>

          {/* نوع موقع الفحص (location_type) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              نوع موقع الفحص <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative overflow-visible hover:border-red-300 dark:hover;border-red-600 transition-colors z-20">
              <FaCar className="text-red-500 mr-3 flex-shrink-0" />
              <select name="location_type" value={locationType} onChange={(e) => setLocationType(e.target.value)} className="w-full focus:outline-none text-gray-800 dark:text-gray-200 appearance-none cursor-pointer text-sm"
              required onFocus={scrollSelectIntoView} onMouseDown={scrollSelectIntoView} onBlur={clearSelectExtraSpace}>
              <option value="center">مركز الفحص</option>
              <option value="home">فحص في المنزل</option>
              <option value="roadside">فحص على الطريق</option>
            </select>
            <span className="absolute right-3 pointer-events-none text-gray-500 dark:text-gray-300 text-xs">▼</span>
            </div>
          </div>

          {/* العنوان - مطلوب فقط إذا كان location_type = home */}
          {locationType === "home" && (
            <div className="space-y-2 col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                العنوان <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative hover:border-red-300 dark:hover:border-red-600 transition-colors">
                <FaCalendarAlt className="text-red-500 mr-3 flex-shrink-0" />
                <input 
                  name="address" 
                  type="text" 
                  placeholder="أدخل العنوان الكامل للفحص في المنزل" 
                  className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 text-sm" 
                  required={locationType === "home"} 
                />
              </div>
            </div>
          )}

          {/* ملاحظات العميل (اختياري) */}
          <div className="space-y-2 col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              ملاحظات إضافية
            </label>
            <div className="border rounded-xl p-3 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:border-red-300 dark:hover:border-red-600 transition-colors">
              <textarea 
                name="customer_notes" 
                placeholder="أدخل أي ملاحظات أو متطلبات خاصة للفحص..." 
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 text-sm min-h-[100px] resize-none" 
                rows="4"
              />
            </div>
          </div>

          {/* نوع المحرك */}
          
          <div className="flex items-center border rounded-xl px-3 py-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 mt-3 relative overflow-visible z-20">
            <FaCar className="text-red-500 mr-3" />
            <select name="engine_type" className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 text-sm rounded-xl px-2 py-1 appearance-none cursor-pointer dark:bg-gray-900"
              required defaultValue="" onFocus={scrollSelectIntoView} onMouseDown={scrollSelectIntoView} onBlur={clearSelectExtraSpace}>
              <option value="" disabled className="text-gray-500 dark:text-gray-400">اختر نوع المحرك</option>
              <option value="بنزين" className="text-gray-800 dark:text-gray-200">بنزين</option>
              <option value="ديزل" className="text-gray-800 dark:text-gray-200">ديزل</option>
              <option value="هايبرد" className="text-gray-800 dark:text-gray-200">هايبرد</option>
              <option value="كهربائي" className="text-gray-800 dark:text-gray-200">كهربائي</option>
            </select>
            <span className="absolute left-3 pointer-events-none text-gray-500 dark:text-gray-300 text-xs">▼</span>
          </div>

          {/* المسافة المقطوعة */}
          <div className="flex items-center border rounded-xl px-3 py-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 mt-3">
            <FaCar className="text-red-500 mr-3" />
            <input name="mileage_km" type="number" placeholder="المسافة المقطوعة (كم)" className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 text-sm rounded-xl px-2 py-1" required />
          </div>

          {/* الفرع */}
          <div className="flex items-center border rounded-xl px-3 py-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 col-span-2 relative overflow-visible z-20">
  <FaMapMarkerAlt className="text-red-500 mr-3" />
  <select
    className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 text-sm rounded-xl pl-6 py-1 appearance-none cursor-pointer dark:bg-gray-900"
    required
    defaultValue=""
    name="branch" onFocus={scrollSelectIntoView} onMouseDown={scrollSelectIntoView} onBlur={clearSelectExtraSpace}
  >
    <option value="" disabled className="text-gray-500 dark:text-gray-400">اختر الفرع</option>
    <option value="التجمع" className="text-gray-800 dark:text-gray-200">التجمع</option>
    <option value="زايد" className="text-gray-800 dark:text-gray-200">زايد</option>
    <option value="مصر الجديده" className="text-gray-800 dark:text-gray-200">مصر الجديده</option>
  </select>
  <span className="absolute left-3 pointer-events-none text-gray-500 dark:text-gray-300 text-xs">▼</span>
</div>


          {/* زر إضافة المركبة */}
          <div className="col-span-2 flex justify-start mt-4">
            <button type="button" onClick={() => setModalOpen(true)} className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
              إضافة المركبة +
            </button>
          </div>

          {/* رفع صور السيارة */}
          <div className="col-span-2 grid grid-cols-3 gap-4 mt-4">
            {carImages.map((img, index) => {
              const labels = [
                "الصورة الأمامية لرخصة المركبة",
                "الصورة الخلفية لرخصة المركبة",
                "الصورة الأمامية لهوية المشتري"
              ];
              return (
                <label key={index} className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl h-44 cursor-pointer hover:border-red-500 transition-colors dark:bg-gray-800">
                  {img ? <img src={img} alt={`car ${index}`} className="h-32 w-full object-cover rounded-2xl" /> :
                    <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-300 text-sm h-32 w-full">
                      <FaFileUpload size={30} className="mb-2" /> اضغط لإضافة صورة
                    </div>
                  }
                  <input name={index === 0 ? "license_front" : index === 1 ? "license_back" : "buyer_id_front"} type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(index, e.target.files[0])} />
                  <span className="mt-2 text-gray-700 dark:text-gray-200 text-xs text-center">{labels[index]}</span>
                </label>
              );
            })}
          </div>

          {/* زر الإرسال */}
          <div className="col-span-2 flex justify-center mt-8">
            <button 
              type="submit" 
              disabled={submitting || loadingData} 
              className={`px-16 py-4 rounded-full text-white font-semibold shadow-lg transition-all duration-300 transform flex items-center space-x-3 ${
                submitting || loadingData 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-105 hover:shadow-2xl active:scale-95"
              }`}
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>جارٍ الإرسال...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>تأكيد الحجز</span>
                </>
              )}
            </button>
          </div>
        </form>

          {submitSuccess && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center">
                <div className="text-green-600 dark:text-green-400 text-xl mr-3">✓</div>
                <div className="text-green-800 dark:text-green-200 font-medium">{submitSuccess}</div>
              </div>
            </div>
          )}
          {submitError && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center">
                <div className="text-red-600 dark:text-red-400 text-xl mr-3">⚠</div>
                <div className="text-red-800 dark:text-red-200 font-medium">{submitError}</div>
              </div>
            </div>
          )}
          </>
        )}
      </div>

      {/* Modal للشيت */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-lg relative">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Car Features</h2>
            {Object.keys(carFeaturesData).map(category => (
              <div key={category} className="mb-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
  <FaCar className="text-red-500" /> {category}
</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {carFeaturesData[category].map(feature => (
                    <label key={feature} className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                      <input type="checkbox" checked={selectedFeatures.includes(feature)} onChange={() => toggleFeature(feature)} className="accent-red-600" />
                      {feature}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 transition">× إغلاق</button>
              <button onClick={() => { setModalOpen(false); console.log(selectedFeatures); }} className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition">حفظ</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Appointment;

