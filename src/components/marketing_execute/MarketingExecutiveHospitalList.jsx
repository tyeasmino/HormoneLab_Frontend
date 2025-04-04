import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const MarketingExecutiveHospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          "https://hormone-lab-backend.vercel.app/hospitals/hospital_authorities/under_me/",
          { headers: { Authorization: `Token ${token}` } }
        );
        setHospitals(res.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  if (loading) {
    return <div className="text-center py-6">Loading hospitals...</div>;
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-6 text-left">Hospital</th>
            <th className="py-3 px-6 text-left">Authority</th>
            <th className="py-3 px-6 text-left">Contact</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <motion.tr
              key={hospital.id}
              className="border-b hover:bg-gray-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <td className="py-4 px-6 flex items-center">
                <img
                  src={hospital.image}
                  alt={hospital.hospital_name}
                  className="w-10 h-10 object-cover rounded-full mr-4"
                />
                <span className="font-medium">{hospital.hospital_name}</span>
              </td>
              <td className="py-4 px-6">
                {hospital.user.first_name} {hospital.user.last_name}
              </td>
              <td className="py-4 px-6">{hospital.phone}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketingExecutiveHospitalList;
