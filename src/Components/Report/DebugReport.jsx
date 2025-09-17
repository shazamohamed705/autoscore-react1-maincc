import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBug, FaSearch, FaDatabase, FaUser, FaCar, FaFileAlt, FaArrowLeft } from "react-icons/fa";

function DebugReport() {
  const navigate = useNavigate();
  const [vinNumber, setVinNumber] = useState("");
  const [reportNumber, setReportNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [debugData, setDebugData] = useState(null);
  const [error, setError] = useState("");

  const handleDebug = async () => {
    if (!vinNumber && !reportNumber) {
      setError("Please enter either VIN number or report number");
      return;
    }

    setError("");
    setLoading(true);
    setDebugData(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      const params = new URLSearchParams();
      if (vinNumber.trim()) params.append('vin_number', vinNumber.trim());
      if (reportNumber.trim()) params.append('report_number', reportNumber.trim());

      const url = `https://cd-root.com/syarahplus/backend/api/users/inspection/reports/debug?${params.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Debug Response:", data);

        if (data.success) {
          setDebugData(data.data);
        } else {
          setError(data.message || "Debug failed");
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error("Debug error:", err);
      setError("Failed to fetch debug data from server");
    } finally {
      setLoading(false);
    }
  };

  const handleTestSearch = async () => {
    if (!vinNumber && !reportNumber) {
      setError("Please enter either VIN number or report number");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      const params = new URLSearchParams();
      if (vinNumber.trim()) params.append('vin_number', vinNumber.trim());
      if (reportNumber.trim()) params.append('report_number', reportNumber.trim());

      const url = `https://cd-root.com/syarahplus/backend/api/users/inspection/reports/search?${params.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Search Test Response:", data);

      if (data.success) {
        setError(`✅ Search successful! Found ${data.data.length} report(s)`);
      } else {
        setError(`❌ Search failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Search test error:", err);
      setError("Failed to test search");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-gray-900 via-black to-gray-800">
      {/* Back Button */}
      <div className="w-full max-w-4xl mb-4">
        <button
          onClick={() => navigate("/report")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition duration-300"
        >
          <FaArrowLeft />
          Back to Report Search
        </button>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <FaBug className="text-4xl text-yellow-500" />
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center tracking-wide">
          Debug <span className="text-yellow-500">Report</span> Search
        </h2>
      </div>

      <div className="w-full max-w-4xl bg-gray-900/50 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
        {/* Sample Data Buttons */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Sample Data from Image:</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setVinNumber("12345678123456789");
                setReportNumber("RPT202509050047906");
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 text-sm"
            >
              Load Sample Data
            </button>
            <button
              onClick={() => {
                setVinNumber("");
                setReportNumber("");
                setDebugData(null);
                setError("");
              }}
              className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition duration-300 text-sm"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* VIN Number */}
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-400 text-xl">
              <FaCar />
            </span>
            <input
              type="text"
              placeholder="VIN Number"
              value={vinNumber}
              onChange={(e) => setVinNumber(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-blue-900 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-inner"
            />
          </div>

          {/* Report Number */}
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-400 text-xl">
              <FaFileAlt />
            </span>
            <input
              type="text"
              placeholder="Report Number"
              value={reportNumber}
              onChange={(e) => setReportNumber(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-blue-900 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-inner"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button
            onClick={handleDebug}
            disabled={loading}
            className="flex-1 px-6 py-3 rounded-xl bg-yellow-600 text-white font-bold shadow-lg hover:bg-yellow-700 transform hover:scale-105 transition duration-300 hover:shadow-2xl text-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FaDatabase />
            {loading ? "Debugging..." : "Debug Database"}
          </button>

          <button
            onClick={handleTestSearch}
            disabled={loading}
            className="flex-1 px-6 py-3 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 transform hover:scale-105 transition duration-300 hover:shadow-2xl text-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FaSearch />
            {loading ? "Testing..." : "Test Search"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-900/50 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        {/* Debug Results */}
        {debugData && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaBug className="text-yellow-500" />
              Debug Results
            </h3>

            {/* User Info */}
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FaUser className="text-blue-500" />
                User Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">User ID:</span>
                  <p className="text-white font-mono">{debugData.user_info?.id}</p>
                </div>
                <div>
                  <span className="text-gray-400">Email:</span>
                  <p className="text-white font-mono">{debugData.user_info?.email}</p>
                </div>
                <div>
                  <span className="text-gray-400">Phone:</span>
                  <p className="text-white font-mono">{debugData.user_info?.phone}</p>
                </div>
              </div>
            </div>

            {/* Search Parameters */}
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FaSearch className="text-green-500" />
                Search Parameters
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">VIN Number:</span>
                  <p className="text-white font-mono">{debugData.search_params?.vin_number || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-gray-400">Report Number:</span>
                  <p className="text-white font-mono">{debugData.search_params?.report_number || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Database Checks */}
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FaDatabase className="text-purple-500" />
                Database Checks
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                {Object.entries(debugData.database_checks || {}).map(([key, value]) => (
                  <div key={key} className="bg-gray-700/50 p-3 rounded-lg">
                    <span className="text-gray-400 block mb-1">
                      {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                    </span>
                    <p className={`font-mono text-lg ${
                      value > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <h4 className="text-lg font-semibold text-white mb-3">Analysis</h4>
              <div className="space-y-2 text-sm">
                {debugData.database_checks?.total_reports === 0 && (
                  <p className="text-red-400">❌ No reports found in database</p>
                )}
                {debugData.database_checks?.reports_by_user_id === 0 && (
                  <p className="text-yellow-400">⚠️ No reports found for this user ID</p>
                )}
                {debugData.database_checks?.vehicle_contacts_by_email === 0 && debugData.database_checks?.vehicle_contacts_by_phone === 0 && (
                  <p className="text-yellow-400">⚠️ No vehicle contacts found for this user</p>
                )}
                {debugData.database_checks?.reports_by_vin === 0 && debugData.search_params?.vin_number && (
                  <p className="text-yellow-400">⚠️ No reports found for this VIN number</p>
                )}
                {debugData.database_checks?.reports_by_report_number === 0 && debugData.search_params?.report_number && (
                  <p className="text-yellow-400">⚠️ No reports found for this report number</p>
                )}
                {debugData.database_checks?.vehicles_by_vin === 0 && debugData.search_params?.vin_number && (
                  <p className="text-yellow-400">⚠️ No vehicles found for this VIN number</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DebugReport;
