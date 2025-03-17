import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FaHospital, FaUsers, FaMapMarkedAlt, FaMoneyBillWave, FaFileInvoice } from "react-icons/fa";
import { PieChart, Pie, Cell } from "recharts";
import { GiDrippingTube } from "react-icons/gi";
import axios from "axios";

const HlicAuthorityDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hospitalAuthorities, setHospitalAuthorities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [executives, setExecutives] = useState([]);
  const [users, setUsers] = useState([]);

  const [marketingExecutives, setMarketingExecutives] = useState(0);
  const [hospitalAuthority, setHospitalAuthority] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [totalDue, setTotalDue] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationsRes, executivesRes, usersRes, labServicesRes, hospitalsRes] = await Promise.all([
          axios.get("https://hormone-lab-backend.vercel.app/clients/all_locations/"),
          axios.get("https://hormone-lab-backend.vercel.app/executives/all-executives/"),
          axios.get("https://hormone-lab-backend.vercel.app/accounts/users/"),
          axios.get("https://hormone-lab-backend.vercel.app/executives/lab-services/"),
          axios.get("https://hormone-lab-backend.vercel.app/hospitals/hospital_authorities/"),
        ]);
  
        setLocations(locationsRes.data || []);
        setExecutives(executivesRes.data || []);
        setUsers(usersRes.data || []);
        setHospitalAuthorities(hospitalsRes.data || []);
  
        setServicesCount(labServicesRes.data ? labServicesRes.data.length : 0);
  
        // Debugging
        console.log("Users Data:", usersRes.data);
        console.log("Hospital Authorities:", hospitalsRes.data);
  
        // Count Marketing Executives
        const executivesCount = usersRes.data ? usersRes.data.filter((user) => user.me !== null).length : 0;
        setMarketingExecutives(executivesCount);
  
        // Count Hospital Authorities
        const hospitalCount = usersRes.data ? usersRes.data.filter((user) => user.ha !== null).length : 0;
        setHospitalAuthority(hospitalCount);
  
        // Calculate Total Due
        const total = executivesRes.data ? executivesRes.data.reduce((sum, executive) => sum + (executive.due || 0), 0) : 0;
        setTotalDue(total);
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  // Dynamically generate location & marketing executives table data
  const locationData = executives.map((executive) => {
    const user = users.find((u) => u.user_id === executive.user);
    const location = locations.find((loc) => loc.id === executive.location);

    return {
      location: location ? location.location_name : "Unknown",
      executive: user ? `${user.first_name} ${user.last_name}`.trim() || user.username : "Unknown",
    };
  });


  const formattedHospitalData = hospitalAuthorities.map((hospital) => {
    const location = locations.find((loc) => loc.id === hospital.location);
    const user = users.find((u) => u.user_id === hospital.user);

    return {
      hospitalName: hospital.hospital_name,
      locationName: location ? location.location_name : "Unknown",
      userName: user ? `${user.first_name} ${user.last_name}`.trim() || user.username : "Unknown",
    };
  });



  const analyticsData = [
    { label: "Total Locations", value: loading ? "Loading..." : locations.length, icon: <FaMapMarkedAlt /> },
    { label: "Total Marketing Executives", value: loading ? "Loading..." : marketingExecutives, icon: <FaUsers /> },
    { label: "Total Hospitals", value: loading ? "Loading..." : hospitalAuthority, icon: <FaHospital /> },
    { label: "Total Services", value: loading ? "Loading..." : servicesCount, icon: <GiDrippingTube /> },
    { label: "Total Due", value: loading ? "Loading..." : `${totalDue.toLocaleString()}`, icon: <FaMoneyBillWave /> },
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
          <h2 className="text-lg font-semibold mb-4">Hospital Authorities</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Hospital Name</TableHead>
                  <TableHead>Hospital Authority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formattedHospitalData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.locationName}</TableCell>
                    <TableCell>{row.hospitalName}</TableCell>
                    <TableCell>{row.userName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
};

export default HlicAuthorityDashboard;
