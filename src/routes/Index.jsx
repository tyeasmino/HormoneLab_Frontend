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
                    
                    
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/reports" element={<Reports />} />
                    {/* <Route path="/helping" element={<Helping />} /> */}
                    <Route path="/hospitals" element={<Hospitals />} />

                </Routes>
                <Footer />
        </AuthProvider>
            </BrowserRouter>
    )
}

export default Index