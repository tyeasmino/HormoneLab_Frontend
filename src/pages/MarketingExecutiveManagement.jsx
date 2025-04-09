import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/common/Sidebar';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Trash2Icon } from 'lucide-react';
import Loading from '../components/common/Loading';

const MarketingExecutiveManagement = () => {
  const token = localStorage.getItem("token");
  const [executives, setExecutives] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null); // holds { userId, execId, name }

  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    setLoading(true);
    try {
      const [execRes, userRes] = await Promise.all([
        axios.get("https://hormone-lab-backend.vercel.app/executives/all-executives/", {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.get("https://hormone-lab-backend.vercel.app/accounts/users/", {
          headers: { Authorization: `Token ${token}` },
        }),
      ]);
      setExecutives(execRes.data);
      setUsers(userRes.data);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const getExecDetails = (exec) => {
    const user = users.find((u) => u.user_id === exec.user);
    const fullName = user?.first_name || user?.last_name
      ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim()
      : user?.username || "Unknown";
    return { fullName, username: user?.username || "N/A", userId: user?.user_id };
  };

  const deleteExecutive = async () => {
    if (!confirmDelete) return;
  
    const { userId, name } = confirmDelete;
  
    try {
      await axios.delete(
        `http://127.0.0.1:8000/accounts/users/${userId}/delete/`,
        { headers: { Authorization: `Token ${token}` } }
      );
  
      toast.success(`${name} deleted successfully`);
      setConfirmDelete(null);
      fetchExecutives();
    } catch (err) {
      console.error("Deletion error:", err.response || err);
      toast.error("Failed to delete");
    }
  };
  

  return (
    <section>
      <Sidebar />
      <section className='max-w-6xl mx-auto p-4 md:my-10'>
        <h3 className='text-2xl md:text-3xl font-bold py-5'>Marketing Executives</h3>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {loading ? (
            <Loading />
          ) : (
            <table className="w-full text-left border-collapse text-sm md:text-base">
              <thead>
                <tr className="border-b">
                  <th className="p-2 font-medium">Name</th>
                  <th className="p-2 font-medium">Username</th>
                  <th className="p-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {executives.map((exec) => {
                  const { fullName, username, userId } = getExecDetails(exec);
                  return (
                    <tr key={exec.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{fullName}</td>
                      <td className="p-2">{username}</td>
                      <td className="p-2">
                        <button
                          onClick={() =>
                            setConfirmDelete({
                              userId,
                              execId: exec.id,
                              name: fullName,
                            })
                          }
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete Executive"
                        >
                          <Trash2Icon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </motion.div>

        {confirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md w-11/12 max-w-md text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg md:text-xl font-semibold mb-4">Confirm Delete</h2>
              <p className="text-sm md:text-base mb-6">
                Are you sure you want to delete <strong>{confirmDelete.name}</strong>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg text-sm md:text-base"
                  onClick={() => setConfirmDelete(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm md:text-base"
                  onClick={deleteExecutive}
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </section>
    </section>
  );
};

export default MarketingExecutiveManagement;
