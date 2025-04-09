import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Download, Trash2 } from "lucide-react";
import Loading from "../common/Loading";
import { motion } from "framer-motion";
import { Dialog } from "../ui/dialog";
import toast from "react-hot-toast";





const HlicTodayReportList = () => {
  const token = localStorage.getItem("token");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);



  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://hormone-lab-backend.vercel.app/clients/reports/today/", {
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


  const handleDelete = async (reportId) => {
    try {
      await axios.delete(`https://hormone-lab-backend.vercel.app/clients/reports/${reportId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      toast.success("Report deleted successfully!");
      setReports((prev) => prev.filter((r) => r.id !== reportId));
    } catch (error) {
      console.error("Failed to delete report:", error);
      toast.error("Something went wrong while deleting.");
    }
  };





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

      <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-6">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="hidden md:table-cell px-2 md:px-4 py-2 text-sm md:text-base">Date</th>
              <th className="px-2 md:px-4 py-2 text-[12px] md:text-base flex gap-2 "><span className="hidden md:block">Report</span> Name</th>
              <th className="px-2 md:px-4 py-2 text-[12px] md:text-base">Location</th>
              <th className="px-2 md:px-4 py-2 text-[12px] md:text-base">Hospital</th>
              <th className="px-2 md:px-4 py-2 md:text-base text-center hidden md:block">Download</th>
              <th className="px-2 md:px-4 py-2 text-[12px] flex justify-center md:hidden"><Download className="w-4 h-4" /></th>
              <th className="px-2 md:px-4 py-2 text-[12px] md:text-base"><Trash2 className="w-4 h-4" /></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center px-4 py-4 text-gray-500">
                  <Loading />
                </td>
              </tr>
            ) : reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.id} className="border-t hover:bg-gray-50">
                  <td className="hidden md:table-cell px-2 md:px-4 py-2 text-sm md:text-base">
                    {formatDate(report.created_at)}
                  </td>

                  <td className="px-2 md:px-4 py-2 text-[12px] md:text-base">
                    <span className="block md:hidden">
                      {(report.report_name || "").slice(0, 10)}
                    </span>
                    <span className="hidden md:block">
                      {report.report_name || ""}
                    </span>
                  </td>

                  <td className="px-2 md:px-4 py-2 text-[12px] md:text-base">
                    <span className="block md:hidden">
                      {(report.location_name || "").slice(0, 10)}
                    </span>
                    <span className="hidden md:block">
                      {report.location_name || ""}
                    </span>
                  </td>

                  <td className="px-2 md:px-4 py-2 text-[12px] md:text-base">
                    <span className="block md:hidden">
                      {(report.hospital_name || "").slice(0, 10)}
                    </span>
                    <span className="hidden md:block">
                      {report.hospital_name || ""}
                    </span>
                  </td>


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
                  {/* <td className="px-2 md:px-4 py-2 text-center">
                    <a
                      href={`https://hormone-lab-backend.vercel.app/clients/download-report/${report.id}`} // Backend URL for downloading the report
                      target="_blank"
                      rel="noopener noreferrer"
                      download={report.report_name ? report.report_name : undefined} // Ensure it uses the correct file name
                      className="inline-flex items-center justify-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden md:inline md:ml-1">Download</span>
                    </a>
                  </td> */}


                  <td className="px-2 md:px-4 py-2 text-[12px] md:text-base">
                    <button
                      onClick={() => {
                        setSelectedReportId(report.id);
                        setShowConfirmModal(true);
                      }}
                      className="text-red-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
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




      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Delete Report?</h2>
            <p className="text-gray-600 text-sm mb-4">
              Are you sure you want to delete this report? This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-1.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleDelete(selectedReportId);
                  setShowConfirmModal(false);
                }}
                className="px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>



  );
};

export default HlicTodayReportList