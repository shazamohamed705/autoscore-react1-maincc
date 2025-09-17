import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Disclosure, Label } from "@headlessui/react";
import { FaCarSide, FaCogs,FaUser, FaSnowflake, FaShieldAlt, FaBook, FaRuler, FaPlug, FaExclamationTriangle, FaCamera,FaChevronDown,FaInfoCircle,FaCheckCircle,FaCarBattery,FaOilCan} from "react-icons/fa";
import image55 from '../../assets/image55.png'
import fallbackImage  from '../../assets/imagge2.png'
import rallbackImage from '../../assets/imagee22.png'
import hallbackImage from '../../assets/immage3.png'
import iallbackImage from '../../assets/img20.png'
import pallbackImage  from  '../../assets/img23.png'
import  FullScreenGallery from "../FullScreenGallery/FullScreenGallery";
import ScreenGallery from "../ScreenGallery/ScreenGallery";
import ReportData from  "./ReportData";
import HistoryData from "./HistoryData";
import Exoskeleton from "./Exoskeleton";
import ChassisData from "./ChassisaData";
import MoveData from "./MovedData";
import PortiesComponent from "./PortiesComponent";
import Fixed from "./Fixed";
import ElectricalSystemsComponent from "./ElectricalSystemsComponent"
import SeftiyData from "./SeftiyData";
import AirConditioningComponent from "./AirConditioningComponent"
import PhotoComponent from "./PhotoComponent";
import NotesDat from "./NotesData"

export default function ReportResult() {
  const location = useLocation();
  const { reportNumber } = useParams();
  
  // Get report data from navigation state or fetch from API
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If data is passed from search, use it
    if (location.state?.report) {
      setReportData(location.state.report);
    } else if (reportNumber) {
      // Otherwise fetch report by report number
      fetchReportByNumber(reportNumber);
    }
  }, [location.state, reportNumber]);

  const fetchReportByNumber = async (reportNum) => {
    setLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login first");
        return;
      }

      const response = await fetch(
        `https://cd-root.com/syarahplus/backend/api/users/inspection/reports/${reportNum}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setReportData(data.data);
        } else {
          setError(data.message || "Report not found");
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch report data");
    } finally {
      setLoading(false);
    }
  };

  const [openInfoIndex, setOpenInfoIndex] = useState(null);
useEffect(() => {
  const handleClickOutside = () => {
    setOpenInfoIndex(null);
  };

  // نضيف Listener على كل النقرات
  document.addEventListener("click", handleClickOutside);

  // نظف الـ Listener لما الكمبوننت يتفكك
  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);

const [openGallery, setOpenGallery] = useState(false);






  // Show loading state
  if (loading) {
    return (
      <div className="min-h-[70vh] max-w-6xl mx-auto bg-white dark:bg-black p-6 rounded-xl shadow flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading report...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-[70vh] max-w-6xl mx-auto bg-white dark:bg-black p-6 rounded-xl shadow flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  // Show message if no report data
  if (!reportData) {
    return (
      <div className="min-h-[70vh] max-w-6xl mx-auto bg-white dark:bg-black p-6 rounded-xl shadow flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">📄</div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">No report data available</p>
        </div>
      </div>
    );
  }





  return (
    <div className="min-h-[70vh] max-w-6xl mx-auto bg-white dark:bg-black p-6 rounded-xl shadow">



  <div className="flex-grow">

  <ReportData reportData={reportData}/>


      {/*التاريخ والسجلات */}
   <HistoryData reportData={reportData}/>
      {/* الهيكل الخارجي */}
  <Exoskeleton reportData ={reportData} />
{/*الشاصي والهيكل */}
<ChassisData reportData={reportData}/>
{/* المحرك وناقل الحركه */}
<MoveData reportData ={reportData}/>
 <PortiesComponent reportData ={reportData}/>
<Fixed reportData ={reportData}/>
<ElectricalSystemsComponent reportData ={reportData}/>
   <AirConditioningComponent reportData ={reportData}/>
<SeftiyData reportData ={reportData}/>
<PhotoComponent reportData ={reportData}/>
<NotesDat reportData ={reportData}/>
 </div>

 
  

    </div>
    
  );
}
