import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Home from '../pages/Home'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import { AuthProvider } from '../contexts/AuthContext'
import LabServices from '../pages/LabServices'
import Profile from '../pages/Profile'
import Reports from '../pages/Reports'
import Hospitals from '../pages/Hospitals'
import Locations from '../pages/Locations'
import LabServiceManagement from '../pages/LabServiceManagement'
import ProtectedRoute from './ProtectedRoute'
import MarketingExecutiveManagement from '../pages/MarketingExecutiveManagement'
import HospitalAuthorityManagement from '../pages/HospitalAuthorityManagement'
import ReportsManagement from '../pages/ReportsManagement'

const Index = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} /> 
                    <Route path="/contact" element={<ContactUs />} /> 
                    <Route path="/login" element={<SignIn />} /> 
                    <Route path="/register" element={<SignUp />} /> 
                    <Route path="/services" element={<LabServices />} />


                    <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
                    <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } />
                    <Route path="/reports" element={ <ProtectedRoute> <Reports /> </ProtectedRoute> } />
                    <Route path="/myhospitals" element={ <ProtectedRoute> <Hospitals /> </ProtectedRoute> } /> 
                    {/* <Route path="/helping" element={<Helping />} /> */}
           



                    {/* Only For Admin */}
                    <Route path="/locations" element={ <ProtectedRoute> <Locations /> </ProtectedRoute> } />
                    <Route path="/labservices" element={ <ProtectedRoute> <LabServiceManagement /> </ProtectedRoute> } />  
                    <Route path="/employees" element={ <ProtectedRoute> <MarketingExecutiveManagement /> </ProtectedRoute> } />  
                    <Route path="/hospitals" element={ <ProtectedRoute> <HospitalAuthorityManagement /> </ProtectedRoute> } />  
                    <Route path="/upload_reports" element={ <ProtectedRoute> <ReportsManagement /> </ProtectedRoute> } />  

                    
                </Routes>
                <Footer />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Index