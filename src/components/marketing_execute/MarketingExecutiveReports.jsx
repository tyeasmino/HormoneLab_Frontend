import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Download } from "lucide-react";
import Loading from "../common/Loading";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../contexts/AuthContext";

const MarketingExecutiveReports = () => {
  const { user } = useContext(AuthContext)

  const token = localStorage.getItem("token");
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(new Date());

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://hormone-lab-backend.vercel.app/clients/user-reports/", {
          headers: { Authorization: `Token ${token}` },
        });

        // Fetch hospital details
        const reportsWithDetails = await Promise.all(
          res.data.map(async (report) => {
            let hospitalName = "";

            if (report.hospital) {
              try {
                const hospitalRes = await axios.get(
                  `https://hormone-lab-backend.vercel.app/hospitals/hospital_authorities/${report.hospital}/`, {
                  headers: { Authorization: `Token ${token}` },
                }
                );
                hospitalName = hospitalRes.data.hospital_name || "";
              } catch (error) {
                console.error(`Error fetching hospital ${report.hospital}:`, error);
              }
            }

            return { ...report, hospital_name: hospitalName };
          })
        );

        setReports(reportsWithDetails);
        setFilteredReports(reportsWithDetails);
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
      className="max-w-5xl mx-auto md:mt-8"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4">📑 Your Reports</h2>

      {/* Date & Month Picker */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-4">
        {/* Month Picker */}
        <DatePicker
          selected={selectedMonth}
          onChange={handleMonthChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          maxDate={new Date()}
          className="w-full md:w-auto p-2 border bg-transparent rounded-md"
        />

        {/* Day Picker - Limited to selected month */}
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd MMMM yyyy"
          minDate={minDate}
          maxDate={maxDate}
          className="w-full md:w-auto p-2 border bg-transparent rounded-md"
          placeholderText="Select a specific date"
        />
      </div>

      {/* <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Date</TableHead>
              <TableHead>Report Name</TableHead>
              {user.me &&  <TableHead>Hospital</TableHead>}
              
              <TableHead>Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan="4" className="text-center text-gray-500">
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
                  <TableCell>{report.report_name || "No Name"}</TableCell>
                  {user.me && <TableCell>{report.hospital_name}</TableCell>}
                  
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
                <TableCell colSpan="4" className="text-center text-gray-500">
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div> */}




      <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-6">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 md:px-4 py-2 text-[12px] md:text-base">Date</th>
              <th className="px-2 md:px-4 py-2 text-[12px] md:text-base gap-2 ">Report Name</th>

              {user.me && <th className="px-2 md:px-4 py-2 text-[12px] md:text-base">Hospital</th>}
              <th className="px-2 md:px-4 py-2 md:text-base text-center hidden md:block">Download</th>
              <th className="px-2 md:px-4 py-2 text-[12px] flex justify-center md:hidden"><Download className="w-4 h-4" /></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center px-4 py-4 text-gray-500">
                  <Loading />
                </td>
              </tr>
            ) : filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report.id} className="border-t hover:bg-gray-50">

                  {user.ha &&
                    <td className="px-2 md:px-4 py-2 text-sm md:text-base">
                      {formatDate(report.created_at)}
                    </td>
                  }

                  {user.me &&
                    <td className="px-2 md:px-4 py-2 text-[12px] md:text-base">
                      <span className="block md:hidden">
                        {formatDate(report.created_at).slice(0, 6)}
                      </span>
                      <span className="hidden md:block">
                        {formatDate(report.created_at)}
                      </span>
                    </td>
                  }


                  <td className="px-2 md:px-4 py-2 text-[12px] md:text-base">
                    <span className="block md:hidden">
                      {(report.report_name || "").slice(0, 10)}
                    </span>
                    <span className="hidden md:block">
                      {report.report_name || ""}
                    </span>
                  </td>


                  {user.me &&
                    <td className="px-2 md:px-4 py-2 text-[12px] md:text-base">
                      <span className="block md:hidden">
                        {(report.hospital_name || "").slice(0, 10)}
                      </span>
                      <span className="hidden md:block">
                        {report.hospital_name || ""}
                      </span>
                    </td>}


                  <td className="px-2 md:px-4 py-2 text-center">
                    <a
                      href={report.report_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden md:inline md:ml-1">Download</span>
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-2 md:px-4 py-4 text-gray-500">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MarketingExecutiveReports;
