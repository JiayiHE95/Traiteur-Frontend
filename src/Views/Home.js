import React, { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import NavBar from "../components/NavBar";

const Home = () => {
 let imagePath = window.location.origin+"/product_picture/";
 const images=[imagePath+'001.jpg', imagePath+'002.jpg', imagePath+'003.jpg', imagePath+'004.jpg']
 const navigate=useNavigate()

 return(
  <div className="site-container">
   <NavBar/>
    <div className="home-presentation">
      <div className="presentation-title">Traiteur LIAN</div>
      <div>Bienvenue sur notre site de traiteur chinois, où vous pourrez découvrir une cuisine authentique et savoureuse, élaborée à partir de produits frais et de qualité... </div>
      <div className="clickable commander" onClick={()=>navigate("/products")}>Commander</div>
    </div>
   </div>
 )
}

export default Home