import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { TbCurrencyTaka } from "react-icons/tb";

const LabServices = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const [labServices, setLabServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredTest, setHoveredTest] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const testsPerPage = 10;

    // useEffect(() => {
    //     const fetchLabServices = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `https://hormone-lab-backend.vercel.app/executives/lab-services/`,
    //                 {
    //                     headers: token ? { Authorization: `Token ${token}` } : {},
    //                 }
    //             );

    //             if (response.status === 200 && Array.isArray(response.data)) {
    //                 setLabServices(response.data);
    //             } else {
    //                 setLabServices([]);
    //             }
    //         } catch (err) {
    //             setError("Failed to fetch lab services");
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchLabServices();
    // }, [token]);

    useEffect(() => {
        const fetchLabServices = async () => {
            setIsLoading(true);
            setError(null);

            try {
                if (!user || !token) {
                    // If user is not logged in, fetch general lab services
                    const response = await axios.get(
                        `https://hormone-lab-backend.vercel.app/executives/lab-services/`
                    );

                    console.log("using lab-services");
                    if (response.status === 200 && Array.isArray(response.data)) {
                        setLabServices(response.data);
                    } else {
                        setLabServices([]);
                    }
                    return;
                }


                if (user.me) {
                    // User is a Marketing Executive, fetch location-based rates
                    const locationRateResponse = await axios.get(
                        `https://hormone-lab-backend.vercel.app/executives/location-rate/`,
                        {
                            headers: { Authorization: `Token ${token}` },
                        }
                    );

                    console.log("using location-rate");

                    if (locationRateResponse.status === 200 && Array.isArray(locationRateResponse.data)) {
                        setLabServices(locationRateResponse.data);
                    } else {
                        setLabServices([]);
                    }
                } else {
                    // User is NOT a Marketing Executive, fetch general lab services
                    const response = await axios.get(
                        `https://hormone-lab-backend.vercel.app/executives/lab-services/`
                    );

                    if (response.status === 200 && Array.isArray(response.data)) {
                        setLabServices(response.data);
                    } else {
                        setLabServices([]);
                    }
                }
            } catch (err) {
                setError("Failed to fetch lab services");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLabServices();
    }, [token, user]);


    // Search logic (apply filtering first)
    const filteredTests = labServices.filter(
        (service) =>
            service.test_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.test_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.test_description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic (apply pagination AFTER filtering)
    const totalPages = Math.ceil(filteredTests.length / testsPerPage);
    const indexOfLastTest = currentPage * testsPerPage;
    const indexOfFirstTest = indexOfLastTest - testsPerPage;
    const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);

    // Reset to page 1 whenever the searchQuery changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    return (
        <section className="max-w-6xl mx-auto py-12 px-4">
            {/* Title and Search Bar */}
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <h2 className="md:text-3xl font-bold text-center w-full md:w-auto">
                    💉 Lab Test Rate Chart
                </h2>

                {/* Search Bar */}
                <div className="w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search by Test Name, Category, Description..."
                        className="w-full bg-transparent px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Loading, Error, or Table Data */}
            {isLoading ? (
                <p className="text-center text-gray-600 text-lg">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500 text-lg">{error}</p>
            ) : currentTests.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No test is found</p>
            ) : (
                <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
                    <table className="w-full text-left border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                                <th className="px-4 py-2 md:text-lg font-semibold hidden md:table-cell">Test Category</th>
                                <th className="px-4 py-2 text-sm md:text-lg font-semibold">Test Name</th>
                                <th className="px-4 py-2 text-sm md:text-lg font-semibold">Rate</th>

                                {/* Conditionally add Location Rate column, but keep it inside the same row */}
                                {user && user.me && (
                                    <th className="px-4 py-2 text-sm md:text-lg font-semibold">Location Rate</th>
                                )}

                                <th className="px-4 py-2 md:text-lg font-semibold hidden md:table-cell">Sample</th>
                                <th className="px-4 py-2 md:text-lg font-semibold hidden md:table-cell">Reporting</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentTests.map((service, index) => (
                                <tr
                                    key={service.id}
                                    className={`transition-all duration-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-gray-200`}
                                >
                                    
                                    <td className="px-4 py-2 md:text-base text-gray-700 border-b  hidden md:table-cell">{service.test_category}</td>
                                    <td
                                        className="px-4 py-2 text-sm  md:text-base md:text-md text-gray-900 font-medium border-b relative cursor-pointer"
                                        onMouseEnter={(e) => {
                                            setHoveredTest(service);
                                            setMousePosition({ x: e.clientX, y: e.clientY });
                                        }}
                                        onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
                                        onMouseLeave={() => setHoveredTest(null)}
                                    >
                                        {service.test_name}
                                    </td>
                                    <td className="px-4 py-2 text-sm md:text-base text-green-700 font-semibold border-b">
                                        {service.patient_rate}
                                    </td>
                                    {(user && user.me) &&
                                        <td className="px-4 py-2 text-sm md:text-base  text-green-700 font-semibold border-b">
                                            {service.rate}
                                        </td>
                                    }
                                    <td className="px-4 py-2 text-gray-700 border-b  hidden md:table-cell">{service.test_sample}</td>
                                    <td className="px-4 py-2 text-gray-700 border-b  hidden md:table-cell">{service.test_reporting}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {filteredTests.length > testsPerPage && (
                <div className="mt-6 flex justify-center items-center space-x-2 flex-wrap">
                    <button
                        className={`px-3 py-1 md:px-4 md:py-2 border rounded-lg text-sm md:text-base ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
                            }`}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {/* Pagination Numbers */}
                    <div className="flex flex-wrap gap-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={`px-3 py-1 md:px-4 md:py-2 border rounded-lg text-sm md:text-base ${currentPage === i + 1
                                    ? "bg-gray-900 text-white"
                                    : "hover:bg-gray-200"
                                    }`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        className={`px-3 py-1 md:px-4 md:py-2 border rounded-lg text-sm md:text-base ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
                            }`}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}


            {/* Hover Modal */}
            <AnimatePresence>
                {hoveredTest && (
                    <motion.div
                        className="fixed bg-white p-4 shadow-lg rounded-xl border border-gray-300 w-72"
                        style={{ top: `${mousePosition.y + 10}px`, left: `${mousePosition.x}px` }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h3 className="text-lg font-semibold text-gray-900">{hoveredTest.test_name}</h3>
                        <p className="text-sm text-gray-600">{hoveredTest.test_description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>

    );
};

export default LabServices;
