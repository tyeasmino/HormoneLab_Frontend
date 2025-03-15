import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Sidebar from '../components/common/Sidebar'
import HospitalAuthorityReports from '../components/hospital_authority/HospitalAuthorityReports'
import MarketingExecutiveReports from '../components/marketing_execute/MarketingExecutiveReports'
 

const Reports = () => {
    const {user} = useContext(AuthContext)

    return (
        <section className='flex md:my-40'>
            <Sidebar />

            <section className='max-w-screen-xl m-auto'>
                {(user && user.ha) ? (<> <HospitalAuthorityReports /> </>) : (<></>)}
                {(user && user.me) ? (<> <MarketingExecutiveReports /> </>) : (<></>)}
            </section>

        </section>
    )
}

export default Reports