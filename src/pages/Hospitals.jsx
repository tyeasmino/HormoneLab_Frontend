import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../components/common/Sidebar';
import HospitalAuthorityDashboard from '../components/hospital_authority/HospitalAuthorityDashboard';
import MarketingExecutiveDashboard from '../components/marketing_execute/MarketingExecutiveDashboard';
import HlicAuthorityDashboard from '../components/hlic_authority/HlicAuthorityDashboard';
import MarketingExecutiveHospitalList from '../components/marketing_execute/MarketingExecutiveHospitalList';
import { motion } from "framer-motion";

const Hospitals = () => {
    const { user } = useContext(AuthContext);

    return (
        <section className='flex md:my-20'>
            <Sidebar />

            <section className='max-w-screen-xl m-auto'>
                {(user && user.ha) ?
                    (<> <HospitalAuthorityDashboard /> </>) : (<></>)}

                {(user && user.me) ?
                    (<> 
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="p-6 bg-blue-50 rounded-lg shadow-lg my-6"
                        >
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">
                                Your Curated Hospital Network
                            </h2>
                            <p className="text-blue-600 mb-4">
                                Explore the hospitals in your region with all the essential details.
                            </p>
                            <MarketingExecutiveHospitalList />
                        </motion.section>
                    </>) : (<></>)}

                {(user && !user.ha && !user.me) ?
                    (<> <HlicAuthorityDashboard /> </>) : (<></>)}
            </section>
        </section>
    );
};

export default Hospitals;
