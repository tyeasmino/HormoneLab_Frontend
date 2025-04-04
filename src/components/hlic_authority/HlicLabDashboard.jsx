import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { UploadCloud, FileText } from "lucide-react";
import { SelectContent } from "@radix-ui/react-select"; 
import HlicTodayReportList from "./HlicTodayReportList";

export const HlicLabDashboard = () => {
  const token = localStorage.getItem('token');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [reportFile, setReportFile] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);



  const [reportData, setReportData] = useState({
    report_name: "",
    report_file: "",
    location: "",
    hospital: "",
  });

  // Fetch locations on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("https://hormone-lab-backend.vercel.app/clients/all_locations/");
        if (!res.ok) throw new Error("Failed to fetch locations.");
        const data = await res.json();
        setLocations(data);
      } catch (err) {
        console.error(err.message);
        setError("Could not load locations. Please try again later.");
      }
    };

    fetchLocations();
  }, []);

  // Fetch hospitals when location changes
  const handleLocationChange = async (locationId) => {
    setSelectedLocation(locationId);
    setSelectedHospital(null); // Reset hospital selection
    try {
      const res = await fetch(`https://hormone-lab-backend.vercel.app/hospitals/hospital_authorities/by_location/?location_id=${locationId}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
    
      if (!res.ok) throw new Error("Failed to fetch hospitals.");
      const data = await res.json();
      setHospitals(data);
    } catch (err) {
      console.error(err.message);
      setError("Could not load hospitals. Please try again later.");
    }
  };

  // Handle file upload change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("Only PDF files are allowed!");
      return;
    }
    if (file && file.size > 2 * 1024 * 1024) { // Limit size to 2MB
      alert("File size must not exceed 2MB!");
      return;
    }
    setReportFile(file);
  };

  // Submit report
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!reportData.report_file) {
      setError("Please upload a report file.");
      return;
    }

    if (!selectedLocation && !selectedHospital) {
      setError("Please select at least a location or a hospital.");
      return;
    }

    if (!reportData.report_name.trim()) {
      setError("Please enter a report name.");
      return;
    }

    try {
      const requestBody = {
        report_name: reportData.report_name, // Send report name
        report_file: reportData.report_file,
      };

      if (selectedLocation) requestBody.location = selectedLocation;
      if (selectedHospital) requestBody.hospital = selectedHospital;

      console.log("Request Body:", requestBody);
      const res = await fetch("https://hormone-lab-backend.vercel.app/clients/reports/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const errorResponse = await res.text();
        console.error("API Response Error:", errorResponse);
        throw new Error("Failed to send the report!");
      }

      alert("Report Sent Successfully!");
      setReportData({ report_name: "", report_file: "" }); // Reset name & file
      setSelectedLocation(null);
      setSelectedHospital(null);
    } catch (err) {
      console.error(err.message);
      setError(err.message || "Failed to send the report!");
    }
  };





  const openCloudinaryWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dxcwijywg',
        uploadPreset: 'HormoneLab',
        resourceType: 'raw', // 'raw' allows PDF uploads
        sources: ['local'],
        multiple: false,
        maxFiles: 1,
        folder: 'uploads',
        clientAllowedFormats: ['pdf'],
      },
      (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          alert('File upload failed. Please try again.');
        } else if (result.event === 'success') {
          console.log('Uploaded PDF:', result.info.secure_url);
          setReportData((prev) => ({
            ...prev,
            report_file: result.info.secure_url, // Save Cloudinary URL
          }));
        }
      }
    );
    widget.open();
  };





  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📄 Send Lab Report</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Report Name Input */}
          <Input
            type="text"
            placeholder="Enter report name"
            value={reportData.report_name}
            onChange={(e) => setReportData((prev) => ({ ...prev, report_name: e.target.value }))}
            className="w-full border p-2 rounded-md"
          />



          <div className="flex gap-5">
            {/* Location Selection */}
            <div className="flex-1 relative">
              <Select onValueChange={handleLocationChange}>
                <SelectTrigger className="w-full">
                  {selectedLocation
                    ? locations.find((loc) => loc.id.toString() === selectedLocation)?.location_name
                    : "Select Location"}
                </SelectTrigger>

                <SelectContent
                  className="absolute bg-white w-[250px] z-10"
                  style={{ top: "100%" }} // Ensures dropdown starts right below the trigger
                >
                  {locations?.map((loc) => (
                    <SelectItem
                      key={loc.id}
                      value={loc.id.toString()}
                      className="bg-white hover:bg-gray-100 text-gray-900"
                    >
                      {loc.location_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Hospital Selection */}
            <div className="flex-1 relative">
              <Select disabled={!selectedLocation} onValueChange={setSelectedHospital}>
                <SelectTrigger className="w-full">
                  {selectedHospital
                    ? hospitals.find((hos) => hos.id.toString() === selectedHospital)?.hospital_name
                    : "Select Hospital"}
                </SelectTrigger>

                <SelectContent
                  className="absolute bg-white w-[250px] z-10"
                  style={{ top: "100%" }} // Ensures dropdown starts right below the trigger
                >
                  {hospitals?.map((hos) => (
                    <SelectItem
                      key={hos.id}
                      value={hos.id.toString()}
                      className="bg-white hover:bg-gray-100 text-gray-900"
                    >
                      {hos.hospital_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>


          {/* File Upload */}
          <label onClick={() => openCloudinaryWidget('raw')} className="flex items-center space-x-2 bg-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-300">
            <UploadCloud className="w-5 h-5 text-gray-600" />
            <span >{reportFile ? reportFile.name : "Upload Report (PDF)"}</span>
            {/* <Input type="file" className="hidden" onChange={handleFileChange} /> */}
          </label>


          {/* <div className="mb-4">
            <button
              type="button"
              className="flex items-center space-x-2 bg-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-300"
              onClick={() => openCloudinaryWidget('raw')} // Trigger Cloudinary widget for PDF upload
            >
              <UploadCloud className="w-5 h-5 text-gray-600" /> Upload Report File (PDF)
            </button>
            {reportData.report_file && (
              <a
                href={reportData.report_file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 block"
              >
                View Uploaded PDF
              </a>
            )}
          </div> */}


          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg">
            Send Report
          </Button>
        </form>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-5xl mx-auto mt-8"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📜 Sent Reports</h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <ReportList />
          </div>
          </motion.div> */}
          {/* <ReportList /> */}

          <HlicTodayReportList />
    </div>
  );
};
