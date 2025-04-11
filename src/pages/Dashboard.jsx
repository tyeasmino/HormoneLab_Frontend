import React, { useContext } from 'react'
import MarketingExecutiveDashboard from '../components/marketing_execute/MarketingExecutiveDashboard'
import HospitalAuthorityDashboard from '../components/hospital_authority/HospitalAuthorityDashboard'
import { AuthContext } from '../contexts/AuthContext'
import HlicAuthorityDashboard from '../components/hlic_authority/HlicAuthorityDashboard'
import Sidebar from '../components/common/Sidebar'
import { HlicLabDashboard } from '../components/hlic_authority/HlicLabDashboard'

const Dashboard = () => {
  const { user } = useContext(AuthContext)

  return (
    <section className=''> {/* flex md:my-10 */}
      <Sidebar />

      <section className='max-w-screen-xl m-auto'> 
        {/* Render HlicAuthorityDashboard if user is a superuser */}
        {user?.username === 'hlic.it' && <HlicAuthorityDashboard />}

        {/* Render HlicLabDashboard if the username is 'hlic.histo' */}
        {(user?.username === 'hlic.histo' ) && <HlicLabDashboard />}
        {(user?.username === 'hlic.lab' ) && <HlicLabDashboard />}

        {/* Render HospitalAuthorityDashboard if user is hospital authority */}
        {user?.ha && <HospitalAuthorityDashboard />}

        {/* Render MarketingExecutiveDashboard if user is marketing executive */}
        {user?.me && <MarketingExecutiveDashboard />}
      </section>
    </section>
  )
}

export default Dashboard