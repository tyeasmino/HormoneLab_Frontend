import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Sidebar from '../components/common/Sidebar'
import HospitalAuthorityProfile from '../components/hospital_authority/HospitalAuthorityProfile'
import MarketingExecutiveProfile from '../components/marketing_execute/MarketingExecutiveProfile'

const Profile = () => {
    const {user} = useContext(AuthContext)

  return (
    <section className='flex p-5'>
        <Sidebar />

        <section className='max-w-screen-xl m-auto md:my-20'>
          {(user && user.ha) ? (<> <HospitalAuthorityProfile /> </>): (<></>)}
          {(user && user.me) ? (<> <MarketingExecutiveProfile /> </>): (<></>)}
        </section>
    </section>
  )
}

export default Profile