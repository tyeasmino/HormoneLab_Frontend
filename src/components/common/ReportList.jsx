import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Download } from "lucide-react";
import Loading from "./Loading";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReportList = () => {
  const token = localStorage.getItem("token");
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(new Date()); // Default max is today

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://hormone-lab-backend.vercel.app/clients/reports/", {
          headers: { Authorization: `Token ${token}` },
        });

        // Fetch reports with hospital and location details
        const reportsWithDetails = await Promise.all(
          res.data.map(async (report) => {
            let hospitalName = "";
            let locationName = "";

            if (report.hospital) {
              try {
                const hospitalRes = await axios.get(
                  `https://hormone-lab-backend.vercel.app/hospitals/hospital_authorities/${report.hospital}/`
                );
                hospitalName = hospitalRes.data.hospital_name;
              } catch (error) {
                console.error(`Error fetching hospital ${report.hospital}:`, error);
              }
            }

            if (report.location) {
              try {
                const locationRes = await axios.get(
                  `https://hormone-lab-backend.vercel.app/clients/all_locations/${report.location}/`
                );
                locationName = locationRes.data.location_name;
              } catch (error) {
                console.error(`Error fetching location ${report.location}:`, error);
              }
            }

            return { ...report, hospital_name: hospitalName, location_name: locationName };
          })
        );

        setReports(reportsWithDetails);
        setFilteredReports(reportsWithDetails); // Initialize filteredReports with all reports
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [token]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle month change
  const handleMonthChange = (date) => {
    setSelectedMonth(date);
    setSelectedDate(null); // Reset selected date when month changes

    const today = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // If selected month is current month, limit max date to today
    if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
      lastDay = today;
    }

    setMinDate(firstDay);
    setMaxDate(lastDay);
  };

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filter reports based on selected month and date
  useEffect(() => {
    const today = new Date();
    const selectedYear = selectedMonth.getFullYear();
    const selectedMonthNum = selectedMonth.getMonth() + 1;

    const filtered = reports.filter((report) => {
      const reportDate = new Date(report.created_at);
      const reportYear = reportDate.getFullYear();
      const reportMonth = reportDate.getMonth() + 1;
      const reportDay = reportDate.getDate();

      if (reportYear === selectedYear && reportMonth === selectedMonthNum) {
        if (selectedDate) {
          return reportDay === selectedDate.getDate();
        }
        return reportDay <= today.getDate() || reportMonth < today.getMonth() + 1;
      }
      return false;
    });

    setFilteredReports(filtered);
  }, [selectedMonth, selectedDate, reports]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-5xl mx-auto mt-8"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4">📜 Sent Reports</h2>

      {/* Date & Month Picker */}
      <div className="flex items-center gap-4 mb-4">
        {/* Month Picker */}
        <DatePicker
          selected={selectedMonth}
          onChange={handleMonthChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          maxDate={new Date()}
          className="p-2 border bg-transparent rounded-md"
        />

        {/* Day Picker - Limited to selected month */}
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd MMMM yyyy"
          minDate={minDate}
          maxDate={maxDate}
          className="p-2 border bg-transparent rounded-md"
          placeholderText="Select a specific date"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Date</TableHead>
              <TableHead>Report Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center text-gray-500">
                  <Loading />
                </TableCell>
              </TableRow>
            ) : filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <motion.tr
                  key={report.id}
                  className="border-b hover:bg-gray-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell>{formatDate(report.created_at)}</TableCell>
                  <TableCell>{report.report_name || ""}</TableCell>
                  <TableCell>{report.location_name || ""}</TableCell>
                  <TableCell>{report.hospital_name || ""}</TableCell>
                  <TableCell className="text-center">
                    <a
                      href={report.report_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </a>
                  </TableCell>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center text-gray-500">
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default ReportList;
