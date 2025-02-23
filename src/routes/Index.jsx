import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Home from '../pages/Home'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const Index = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default Index