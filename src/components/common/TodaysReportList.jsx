import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Download } from "lucide-react";
import Loading from "./Loading";
import { motion } from "framer-motion"; 
import { AuthContext } from "../../contexts/AuthContext";

const TodaysReportList = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://hormone-lab-backend.vercel.app/clients/user-reports/today/", {
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
                  `https://hormone-lab-backend.vercel.app/hospitals/hospital_authorities/${report.hospital}/`, {
                    headers: { Authorization: `Token ${token}` },
                  }
                );
                hospitalName = hospitalRes.data.hospital_name;
              } catch (error) {
                console.error(`Error fetching hospital ${report.hospital}:`, error);
              }
            }

            if (report.location) {
              try {
                const locationRes = await axios.get(
                  `https://hormone-lab-backend.vercel.app/clients/all_locations/${report.location}/`, {
                    headers: { Authorization: `Token ${token}` },
                  }
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-5xl mx-auto mt-8"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4">📜 Today's Reports</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Date</TableHead>
              <TableHead>Report Name</TableHead> 
              {user.me && <TableHead>Hospital</TableHead>}
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
            ) : reports.length > 0 ? (
              reports.map((report) => (
                <motion.tr
                  key={report.id}
                  className="border-b hover:bg-gray-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell>{formatDate(report.created_at)}</TableCell>
                  <TableCell>{report.report_name || ""}</TableCell> 
                  {user.me && <TableCell>{report.hospital_name || ""}</TableCell> }
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

export default TodaysReportList;
