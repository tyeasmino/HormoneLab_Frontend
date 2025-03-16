import React, { useContext } from 'react'
import MarketingExecutiveDashboard from '../components/marketing_execute/MarketingExecutiveDashboard'
import HospitalAuthorityDashboard from '../components/hospital_authority/HospitalAuthorityDashboard'
import { AuthContext } from '../contexts/AuthContext'
import HlicAuthorityDashboard from '../components/hlic_authority/HlicAuthorityDashboard'
import Sidebar from '../components/common/Sidebar'

const Dashboard = () => {
  const { user } = useContext(AuthContext)

  return (
    <section className=''> {/* flex md:my-10 */}
      <Sidebar />

      <section className='max-w-screen-xl m-auto'>
        {(user && user.ha) ?
          (<> <HospitalAuthorityDashboard /> </>) : (<></>)}

        {(user && user.me) ?
          (<> <MarketingExecutiveDashboard /> </>) : (<></>)}

        {(user && !user.ha && !user.me) ?
          (<> <HlicAuthorityDashboard /> </>) : (<></>)}
      </section>
    </section>
  )
}

export default Dashboard