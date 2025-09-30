import React from 'react'
import HeroSection from "../Componets/HeroSection"
import Banner from '../Componets/Banner'
import BestSeller from '../Componets/BestSeller'
import OurServices from '../Componets/OurServices'
import Ingredients from '../Componets/Ingredients'

const Home = () => {

    return (
    <div>
        <HeroSection/>
        <Banner/>
        <BestSeller/>
        <OurServices/>
        <Ingredients/>
    </div>
  )
}

export default Home