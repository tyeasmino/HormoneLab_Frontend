import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"; // Only one Tooltip import
import { Calendar } from "@/components/ui/calendar";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FaHospital, FaUsers, FaMapMarkedAlt, FaMoneyBillWave, FaFileInvoice } from "react-icons/fa";
import { PieChart, Pie, Cell } from "recharts"; // Removed Tooltip here

const HlicAuthorityDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const analyticsData = [
    { label: "Total Locations", value: 12, icon: <FaMapMarkedAlt /> },
    { label: "Total Marketing Executives", value: 8, icon: <FaUsers /> },
    { label: "Total Hospitals", value: 20, icon: <FaHospital /> },
    { label: "Total Due", value: "$5,000", icon: <FaMoneyBillWave /> },
    { label: "Total Reports", value: 120, icon: <FaFileInvoice /> },
    { label: "Due Reports", value: 15, icon: <FaFileInvoice /> },
  ];

  const chartData = [
    { month: "Jan", reports: 20 },
    { month: "Feb", reports: 30 },
    { month: "Mar", reports: 15 },
    { month: "Apr", reports: 40 },
    { month: "May", reports: 25 },
  ];

  const locationData = [
    { location: "Savar", executive: "Rafiq" },
    { location: "Savar2", executive: "Mostofa" },
    { location: "Gazipur", executive: "Akter" },
    { location: "Mirpur", executive: "Maidul" },
  ];

  const HospitalData = [
    { location: "Savar", hospital: "Savar United Hospital" },
    { location: "Savar", hospital: "Popular General Hospital" },
    { location: "Savar2", hospital: "Lab One Hospital" },
    { location: "Savar2", hospital: "Abul Hossain Hospital" },
    { location: "Gazipur", hospital: "SQR" },
    { location: "Gazipur", hospital: "STAMCH" },
    { location: "Gazipur", hospital: "Modern Sina Hospital" },
    { location: "Mirpur", hospital: "Life Care Hospital" },
  ];

  const locationPercentageData = [
    { name: "Savar", percentage: 7 },
    { name: "Gazipur", percentage: 3 },
    { name: "Gazipur2", percentage: 12 },
    { name: "Mirpur", percentage: 25 },
    { name: "Dhanmondi", percentage: 15 },
    { name: "Uttara", percentage: 20 },
    { name: "Bashundhara", percentage: 18 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#6a5acd', '#ff6347', '#32cd32'];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* <h1 className="text-2xl font-bold mb-4">HLIC Authority Dashboard</h1> */}

      {/* Analytics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {analyticsData.map((item, index) => (
          <Card key={index} className="bg-white p-4 shadow-md flex items-center gap-3">
            <div className="text-3xl text-blue-500">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-lg font-bold">{item.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts & Calendar Section */}
      <div className="grid grid-cols-8 gap-6">
        <Card className="col-span-4 bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Monthly Reports Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reports" fill="#3b82f6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="col-span-2 bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Calendar</h2>
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
        </Card>

        <Card className="col-span-2 bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Location Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={locationPercentageData}
                dataKey="percentage"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {locationPercentageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Location & Executive Table */}
        <Card className="bg-white shadow-md mt-6 p-4">
          <h2 className="text-lg font-semibold mb-4">Location & Marketing Executives</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Marketing Executive</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locationData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.executive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        {/* Location & Executive Table */}
        <Card className="bg-white shadow-md mt-6 p-4">
          <h2 className="text-lg font-semibold mb-4">Location and Hospitals</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Hospitals</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {HospitalData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.hospital}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default HlicAuthorityDashboard;
