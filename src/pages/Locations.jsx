import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import Sidebar from '../components/common/Sidebar';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Loading from '../components/common/Loading';
import { PencilIcon } from 'lucide-react';

const Locations = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [executives, setExecutives] = useState([]);
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLocation, setNewLocation] = useState({ location_name: '', slug: '' });
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedExecutive, setSelectedExecutive] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');





  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [locationsRes, executivesRes, usersRes] = await Promise.all([
        axios.get("https://hormone-lab-backend.vercel.app/clients/all_locations/", {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.get("https://hormone-lab-backend.vercel.app/executives/all-executives/", {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.get("https://hormone-lab-backend.vercel.app/accounts/users/", {
          headers: { Authorization: `Token ${token}` },
        }),
      ]);

      setLocations(locationsRes.data || []);
      setExecutives(executivesRes.data || []);
      setUsers(usersRes.data || []);
    } catch (error) {
      toast.error("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddLocation = async (e) => {
    e.preventDefault();
    if (!newLocation.location_name || !newLocation.slug) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://hormone-lab-backend.vercel.app/clients/all_locations/",
        { ...newLocation, is_selected: false },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setLocations((prev) => [...prev, response.data]);
      setNewLocation({ location_name: '', slug: '' });
      toast.success("Location added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add location.");
    }
  };

  const locationDetails = locations.map((loc) => {
    const executive = executives.find((exec) => exec.location === loc.id);
    const userInfo = users.find((u) => u.user_id === executive?.user);

    return {
      id: loc.id,
      location_name: loc.location_name,
      slug: loc.slug,
      executive_name: userInfo
        ? `${userInfo.first_name} ${userInfo.last_name}`.trim() || userInfo.username
        : "Not selected yet",
      executive_id: executive?.id || null,
    };
  });




  const handleExecutiveClick = (execId, locationId, name, locationName) => {
    if (!locationId) return;
    setSelectedExecutive({ id: execId, locationId, name, locationName });
    setShowConfirm(true);
  };




  // Call backend to release executive from location
  const releaseExecutive = async () => {
    if (!selectedExecutive) return;

    try {
      // Step 1: Remove location from executive
      await axios.patch(
        `https://hormone-lab-backend.vercel.app/executives/all-executives/${selectedExecutive.id}/`,
        { location: null },
        { headers: { Authorization: `Token ${token}` } }
      );

      // Step 2: Mark location as unselected
      await axios.patch(
        `https://hormone-lab-backend.vercel.app/clients/all_locations/${selectedExecutive.locationId}/`,
        { is_selected: false },
        { headers: { Authorization: `Token ${token}` } }
      );

      toast.success(`Location released from ${selectedExecutive.name}`);
      setShowConfirm(false);
      setSelectedExecutive(null);
      fetchData(); // refresh data
    } catch (error) {
      toast.error("Failed to release location");
    }
  };


  const unassignedExecutives = executives.filter(exec => exec.location === null);



  const unassignedRows = executives
    .filter((exec) => exec.location === null)
    .map((exec) => {
      const userInfo = users.find((u) => u.user_id === exec.user);
      const name =
        userInfo?.first_name || userInfo?.last_name
          ? `${userInfo.first_name} ${userInfo.last_name}`.trim()
          : userInfo?.username || "Unknown";

      return {
        id: `unassigned-${exec.id}`,
        location_name: null,
        slug: null,
        executive_name: name,
        executive_id: exec.id,
      };
    });


  const allRows = [...locationDetails, ...unassignedRows];

  const filteredRows = allRows.filter((row) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      (row.location_name && row.location_name.toLowerCase().includes(searchValue)) ||
      (row.slug && row.slug.toLowerCase().includes(searchValue)) ||
      (row.executive_name && row.executive_name.toLowerCase().includes(searchValue))
    );
  });



  return (
    <section>
      <Sidebar />
      <section className='max-w-7xl mx-auto p-4 md:my-10'>
        <h3 className='text-2xl md:text-3xl font-bold py-5'>Locations</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Add Location Form */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-md self-start h-fit"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-lg md:text-xl font-semibold mb-4">Add New Location</h2>
            <form onSubmit={handleAddLocation} className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-sm md:text-base">Location Name</label>
                <input
                  type="text"
                  className="w-full bg-white px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-400 text-sm md:text-base"
                  placeholder="e.g., Gazipur"
                  value={newLocation.location_name}
                  onChange={(e) =>
                    setNewLocation({ ...newLocation, location_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm md:text-base">Slug / Lab Code</label>
                <input
                  type="text"
                  className="w-full bg-white px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-400 text-sm md:text-base"
                  placeholder="e.g., tg"
                  value={newLocation.slug}
                  onChange={(e) => setNewLocation({ ...newLocation, slug: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm md:text-base"
              >
                Add Location
              </button>
            </form>
          </motion.div>

          {/* Location Table */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg md:text-xl font-semibold mb-4">All Locations & Assigned Executives</h2>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by location, slug or executive..."
                className="w-full bg-transparent px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400 text-sm md:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm md:text-base">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 font-medium">Location Name</th>
                    <th className="p-2 font-medium">Lab Code</th>
                    <th className="p-2 font-medium">Marketing Executive</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="text-center py-6">
                        <Loading />
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((row) => (
                      <tr key={row.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          {row.location_name || <i className="text-red-500">Not set</i>}
                        </td>
                        <td className="p-2">
                          {row.slug || <i className="text-red-500">Not set</i>}
                        </td>
                        <td className="p-2 text-sm md:text-base flex items-center gap-2">
                          {row.executive_name !== "Not selected yet" ? (
                            <>
                              <span className="text-black">{row.executive_name}</span>
                              {row.location_name && (
                                <button
                                  onClick={() =>
                                    handleExecutiveClick(
                                      row.executive_id,
                                      row.id,
                                      row.executive_name,
                                      row.location_name
                                    )
                                  }
                                  className="text-gray-500 hover:text-blue-600"
                                  title="Release location"
                                >
                                  <PencilIcon className="w-4 h-4" />
                                </button>
                              )}
                            </>
                          ) : (
                            <span className="text-red-500">Not selected yet</span>
                          )}

                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>


        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-md w-11/12 max-w-md text-center">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Release Location</h2>
              <p className="text-sm md:text-base mb-6">
                Are you sure you want to release <strong>{selectedExecutive.name}</strong> from{" "}
                <strong>{selectedExecutive.locationName}</strong>?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg text-sm md:text-base"
                  onClick={() => {
                    setShowConfirm(false);
                    setSelectedExecutive(null);
                  }}
                >
                  No
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm md:text-base"
                  onClick={releaseExecutive}
                >
                  Yes, Release
                </button>
              </div>
            </div>
          </div>
        )}

      </section>
    </section>
  );
};

export default Locations;
