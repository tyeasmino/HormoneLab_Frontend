import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Sidebar from '../components/common/Sidebar'
import HospitalAuthorityReports from '../components/hospital_authority/HospitalAuthorityReports'
import MarketingExecutiveReports from '../components/marketing_execute/MarketingExecutiveReports' 
import { HlicLabDashboard } from '../components/hlic_authority/HlicLabDashboard'
import ReportList from '../components/common/ReportList'


const Reports = () => {
    const { user } = useContext(AuthContext)

    return (
        <section className='my-10 md:my-20'>
            <Sidebar />

            <section className='max-w-5xl mx-auto'>
                {user?.username === 'hlic.histo' && <ReportList />}
                {user?.username === 'hlic.it' && <ReportList />}
                {user?.username === 'hlic.lab' && <ReportList />}
                {(user && user.ha) ? (<> <MarketingExecutiveReports /> </>) : (<></>)}
                {(user && user.me) ? (<> <MarketingExecutiveReports /> </>) : (<></>)}
            </section>
        </section>
    )
}

export default Reports