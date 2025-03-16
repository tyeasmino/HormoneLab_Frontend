import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Sidebar from '../components/common/Sidebar'
import HospitalAuthorityDashboard from '../components/hospital_authority/HospitalAuthorityDashboard'
import MarketingExecutiveDashboard from '../components/marketing_execute/MarketingExecutiveDashboard'
import HlicAuthorityDashboard from '../components/hlic_authority/HlicAuthorityDashboard'

const Hospitals = () => {
    const { user } = useContext(AuthContext)

    return (
        <section className='flex md:my-40'>
            <Sidebar />

            <section className='max-w-screen-xl m-auto'>
                {(user && user.ha) ?
                    (<> <HospitalAuthorityDashboard /> </>) : (<></>)}

                {(user && user.me) ?
                    (<> 
                        <section>
                            Welcome to your hospitals
                        </section>
                    </>) : (<></>)}

                {(user && !user.ha && !user.me) ?
                    (<> <HlicAuthorityDashboard /> </>) : (<></>)}
            </section>
        </section>
    )
}

export default Hospitals