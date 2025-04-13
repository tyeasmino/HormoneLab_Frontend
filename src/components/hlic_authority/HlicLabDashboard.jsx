import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select"; // ✅ Fixed import
import { UploadCloud } from "lucide-react";
import HlicTodayReportList from "./HlicTodayReportList";
import { toast } from "react-hot-toast";

export const HlicLabDashboard = () => {
  const token = localStorage.getItem("token");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [reportFile, setReportFile] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const [reportData, setReportData] = useState({
    report_name: "",
    report_file: "",
    location: "",
    hospital: "",
  });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch(
          "https://hormone-lab-backend.vercel.app/clients/all_locations/"
        );
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

  const handleLocationChange = async (locationId) => {
    setSelectedLocation(locationId);
    setSelectedHospital(null);
    try {
      const res = await fetch(
        `https://hormone-lab-backend.vercel.app/hospitals/hospital_authorities/by_location/?location_id=${locationId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch hospitals.");
      const data = await res.json();
      setHospitals(data);
    } catch (err) {
      console.error(err.message);
      setError("Could not load hospitals. Please try again later.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("Only PDF files are allowed!");
      return;
    }
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File size must not exceed 2MB!");
      return;
    }
    setReportFile(file);
  };

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
        report_name: reportData.report_name,
        report_file: reportData.report_file,
      };

      if (selectedLocation) requestBody.location = selectedLocation;
      if (selectedHospital) requestBody.hospital = selectedHospital;

      const res = await fetch(
        "https://hormone-lab-backend.vercel.app/clients/reports/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!res.ok) {
        const errorResponse = await res.text();
        console.error("API Response Error:", errorResponse);
        throw new Error("Failed to send the report!");
      }

      toast.success("Report Sent Successfully!");

      setReportData({ report_name: "", report_file: "" });
      setSelectedLocation(null);
      setSelectedHospital(null);
      setUploadedFileName("");
    } catch (err) {
      console.error(err.message);
      setError(err.message || "Failed to send the report!");
    }
  };

  const openCloudinaryWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dxcwijywg",
        uploadPreset: "HormoneLab",
        resourceType: "raw",
        sources: ["local"],
        multiple: false,
        maxFiles: 1,
        folder: "uploads",
        clientAllowedFormats: ["pdf", "doc", "docx"],
        public_id: (result) =>
          result.info.original_filename
            .replace(/[^a-z0-9]/gi, "_")
            .toLowerCase(),
      },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          toast.error("File upload failed. Please try again.");
        } else if (result.event === "success") {
          const originalFilename = result.info.original_filename;
          const secureUrl = result.info.secure_url;
          const extensionMatch = secureUrl.match(/\.(\w+)$/);
          const fileExtension = extensionMatch ? extensionMatch[1] : "";
          const fullFileName = `${originalFilename}.${fileExtension}`;

          setUploadedFileName(fullFileName);
          setReportData((prev) => ({
            ...prev,
            report_file: result.info.secure_url,
          }));

          toast.success(`📄 ${fullFileName} uploaded successfully!`);
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
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          📄 Send Lab Report
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter report name"
            value={reportData.report_name}
            onChange={(e) =>
              setReportData((prev) => ({
                ...prev,
                report_name: e.target.value,
              }))
            }
            className="w-full border p-2 rounded-md"
          />

          <div className="md:flex gap-5">
            <div className="md:flex-1">
              <Select onValueChange={handleLocationChange}>
                <SelectTrigger className="w-full h-8 px-2 text-sm">
                  {selectedLocation
                    ? locations.find((loc) => loc.id.toString() === selectedLocation)?.location_name
                    : "Select Location"}
                </SelectTrigger>

                <SelectContent className="max-h-60 overflow-y-auto">
                  {[...locations]
                    .sort((a, b) => a.location_name.localeCompare(b.location_name))
                    .map((loc) => (
                      <SelectItem key={loc.id} value={loc.id.toString()}>
                        {loc.location_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

            </div>

            <div className="mt-4 md:mt-0 md:flex-1">
              <Select
                disabled={!selectedLocation}
                onValueChange={setSelectedHospital}
              >
                <SelectTrigger className="w-full h-8 px-2 text-sm">
                  {selectedHospital
                    ? hospitals.find((hos) => hos.id.toString() === selectedHospital)?.hospital_name
                    : "Select Hospital"}
                </SelectTrigger>

                <SelectContent className="max-h-60 overflow-y-auto">
                  {[...hospitals]
                    .sort((a, b) => a.hospital_name.localeCompare(b.hospital_name))
                    .map((hos) => (
                      <SelectItem key={hos.id} value={hos.id.toString()}>
                        {hos.hospital_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

            </div>
          </div>

          <label
            onClick={() => openCloudinaryWidget("raw")}
            className="flex items-center space-x-2 bg-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-300"
          >
            <UploadCloud className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-800">
              {uploadedFileName
                ? uploadedFileName
                : "Upload Report (PDF or Word)"}
            </span>
          </label>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
          >
            Send Report
          </Button>
        </form>
      </motion.div>

      <HlicTodayReportList />
    </div>
  );
};
