import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Download } from "lucide-react";
import Loading from './Loading';
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbHospital } from "react-icons/tb";
import { FiDownloadCloud } from "react-icons/fi";


const ReportList = () => {
    const token = localStorage.getItem('token');
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    "https://hormone-lab-backend.vercel.app/clients/reports/",
                    { headers: { Authorization: `Token ${token}` } }
                );
                const reportsData = res.data;

                const reportsWithDetails = await Promise.all(
                    reportsData.map(async (report) => {
                        const hospitalRes = await axios.get(
                            `https://hormone-lab-backend.vercel.app/hospitals/hospital_authorities/${report.hospital}/`
                        );
                        const hospitalData = hospitalRes.data;

                        const locationRes = await axios.get(
                            `https://hormone-lab-backend.vercel.app/clients/all_locations/${hospitalData.location}/`
                        );
                        const locationData = locationRes.data;

                        return {
                            ...report,
                            hospital_name: hospitalData.hospital_name,
                            location_name: locationData.location_name,
                        };
                    })
                );

                setReports(reportsWithDetails);
            } catch (error) {
                console.error("Error fetching reports:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };



    return (
        <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader>
                <TableRow className="bg-gray-100">
                    <TableHead> <span className='flex items-center gap-1'> <HiOutlineCalendarDateRange /> Date </span> </TableHead>
                    <TableHead> <span className='flex items-center gap-1'> <TbReportAnalytics /> Report Name </span> </TableHead> 
                    <TableHead> <span className='flex items-center gap-1'> <MdOutlineLocationOn /> Location </span> </TableHead> 
                    <TableHead> <span className='flex items-center gap-1'> <TbHospital /> Hospital </span> </TableHead>  
                    <TableHead> <span className='flex items-center gap-1'> <FiDownloadCloud /> Download </span> </TableHead>   
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
                        <TableRow key={report.id} className="border-b hover:bg-gray-50">
                            <TableCell>{formatDate(report.created_at)}</TableCell>
                            <TableCell>{report.report_name || "Untitled Report"}</TableCell>
                            <TableCell>{report.location_name || "Unknown Location"}</TableCell>
                            <TableCell>{report.hospital_name || "Unknown Hospital"}</TableCell>
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
                        </TableRow>
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
    )
}

export default ReportList