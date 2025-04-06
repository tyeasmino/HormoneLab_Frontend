import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Sidebar from '../components/common/Sidebar';

import { Pencil, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import EditLabServiceModal from '../components/EditLabServiceModal';




const LabServicesPage = () => {
    const [labTests, setLabTests] = useState([]);
    const [filteredTests, setFilteredTests] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 12;


    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [editForm, setEditForm] = useState({
        test_name: '',
        test_category: '',
        test_description: '',
        test_sample: '',
        test_reporting: '',
        patient_rate: '',
    });




    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://hormone-lab-backend.vercel.app/executives/lab-services/');
                setLabTests(res.data);
                setFilteredTests(res.data);
            } catch (err) {
                toast.error("Failed to fetch lab services");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const searchLower = search.toLowerCase();
        const filtered = labTests.filter(test =>
            Object.values(test).some(val =>
                typeof val === 'string' && val.toLowerCase().includes(searchLower)
            )
        );
        setFilteredTests(filtered);
        setCurrentPage(1);
    }, [search, labTests]);

    const totalPages = Math.ceil(filteredTests.length / itemsPerPage);
    const paginatedTests = filteredTests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <section>
            <Sidebar />

            <div className="px-4 sm:px-8 py-6 max-w-screen-xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl sm:text-2xl font-semibold">All Lab Services</h2>
                    <Input
                        placeholder="Search by name, category, sample, reporting..."
                        className="max-w-sm"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                {filteredTests.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">No results found.</div>
                ) : (
                    <>
                        <motion.div
                            layout
                            className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {paginatedTests.map(test => (
                                <motion.div
                                    layout
                                    key={test.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200">
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="text-lg font-bold text-primary">{test.test_name}</h3>
                                             

                                                <EditLabServiceModal test={test} onUpdate={(updatedTest) => {
                                                    setLabTests(prev =>
                                                        prev.map(t => (t.id === updatedTest.id ? updatedTest : t))
                                                    );
                                                    setFilteredTests(prev =>
                                                        prev.map(t => (t.id === updatedTest.id ? updatedTest : t))
                                                    );
                                                }} />

                                            </div>
 


                                            <p className="text-sm text-muted-foreground mb-1 font-medium">{test.test_category}</p>
                                            <p className="text-sm text-gray-600 mb-2 line-clamp-3" title={test.test_description}>
                                                {test.test_description}
                                            </p>
                                            <div className="text-sm space-y-1 text-gray-700">
                                                <p><span className="font-medium">Sample:</span> {test.test_sample}</p>
                                                <p><span className="font-medium">Reporting:</span> {test.test_reporting}</p>
                                                <p><span className="font-medium">Patient Rate:</span> ৳{test.patient_rate}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="flex justify-center items-center gap-4 mt-8">
                            <Button
                                variant="outline"
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </Button>
                            <p className="text-sm text-gray-600">
                                Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredTests.length)} of {filteredTests.length}
                            </p>
                            <Button
                                variant="outline"
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </>
                )}
            </div>
 

        </section>
    );
};

export default LabServicesPage;
