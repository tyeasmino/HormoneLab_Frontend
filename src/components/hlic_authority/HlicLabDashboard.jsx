import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { UploadCloud, FileText } from "lucide-react";

export const HlicLabDashboard = () => {
  const [locations, setLocations] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [reportFile, setReportFile] = useState(null);

  // Fetch locations on mount
  useEffect(() => {
    fetch("/api/locations/")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  // Fetch hospitals when location changes
  const handleLocationChange = async (locationId) => {
    setSelectedLocation(locationId);
    setSelectedHospital(""); // Reset hospital selection
    const res = await fetch(`/api/hospitals/by_location/?location_id=${locationId}`);
    const data = await res.json();
    setHospitals(data);
  };

  // Handle file upload change
  const handleFileChange = (e) => {
    setReportFile(e.target.files[0]);
  };

  // Submit report
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLocation || !selectedHospital || !reportFile) return alert("All fields are required!");

    const formData = new FormData();
    formData.append("location", selectedLocation);
    formData.append("hospital", selectedHospital);
    formData.append("report_file", reportFile);

    const res = await fetch("/api/reports/", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Report Sent Successfully!");
      setReportFile(null);
      fetchReports(); // Refresh reports list
    } else {
      alert("Failed to send report!");
    }
  };

  // Fetch reports (dummy example, adjust API as needed)
  const fetchReports = async () => {
    const res = await fetch("/api/reports/");
    const data = await res.json();
    setReports(data);
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
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Location Selection */}
          {/* <Select onValueChange={handleLocationChange}>
            <SelectItem value="">Select Location</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc.id} value={loc.id}>
                {loc.location_name}
              </SelectItem>
            ))}
          </Select> */}

          {/* Hospital Selection */}
          {/* <Select disabled={!selectedLocation} onValueChange={setSelectedHospital}>
            <SelectItem value="">Select Hospital</SelectItem>
            {hospitals.map((hos) => (
              <SelectItem key={hos.id} value={hos.id}>
                {hos.hospital_name}
              </SelectItem>
            ))}
          </Select> */}

          {/* File Upload */}
          <label className="flex items-center space-x-2 bg-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-300">
            <UploadCloud className="w-5 h-5 text-gray-600" />
            <span>{reportFile ? reportFile.name : "Upload Report (PDF)"}</span>
            <Input type="file" className="hidden" onChange={handleFileChange} />
          </label>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg">
            Send Report
          </Button>
        </form>
      </motion.div>

      {/* Report List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-4xl mx-auto mt-8"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📜 Sent Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.length > 0 ? (
            reports.map((report) => (
              <Card key={report.id} className="shadow-md rounded-xl p-4 flex items-center space-x-4">
                <FileText className="w-6 h-6 text-blue-500" />
                <CardContent>
                  <h3 className="font-medium text-gray-800">{report.report_name}</h3>
                  <p className="text-sm text-gray-500">{report.created_at}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No reports found.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
