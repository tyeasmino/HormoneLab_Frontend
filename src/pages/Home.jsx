import React from 'react'
import HeroSection from '../components/HeroSection'
import About from '../components/About'
import Departments from '../components/Departments'
import HomeBlood from '../components/HomeBlood'
import Disease_Dengue_Fever from '../components/Disease_Dengue_Fever'
import ClimateDisease from '../components/ClimateDisease'
import Research from '../components/Research'
import BlockQuate from '../components/BlockQuate'

const Home = () => {
  return (
    <section className=''>
        <HeroSection />
        <About />
        <Departments />
        <HomeBlood />
        <Disease_Dengue_Fever />
        <ClimateDisease />
        <Research />
        <BlockQuate />
    </section>
  )
}

export default Home