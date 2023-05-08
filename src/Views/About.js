import React, { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import NavBar from "../components/NavBar";

const About = () => {
 let imagePath = window.location.origin+"/product_picture/";
 const images=[imagePath+'001.jpg', imagePath+'002.jpg', imagePath+'011.jpg', imagePath+'004.jpg', imagePath+'005.jpg', imagePath+'007.jpg']
 const navigate=useNavigate()

 const [slideIndex, setSlideIndex] = useState(1);

 function plusSlides(n) {
   setSlideIndex(slideIndex + n);
 }

 function currentSlide(n) {
   setSlideIndex(n);
 }

 
  const slides = images.map((image, index) => (
    <div className={slideIndex === index + 1 ? "mySlides fade show" : "mySlides fade"} key={index}>
      <img src={image} alt={`Image ${index + 1}`} />
    </div>
  ));
 useEffect(() => {
  const interval = setInterval(() => {
    if(slideIndex===slides.length){
     setSlideIndex(1)
    }else{
     setSlideIndex(slideIndex => slideIndex + 1);
    }
  }, 2000);

  return () => clearInterval(interval);
}, [slideIndex]);

 const dots = images.map((_, index) => (
   <span className={slideIndex === index + 1 ? "dot active" : "dot"} key={index} onClick={() => currentSlide(index + 1)}></span>
 ))

 return(
  <div className="site-container">
   <NavBar/>
   <div className="site-content">
   <div className="presentation">
     <div>Bienvenue sur notre site dédié au traiteur chinois !</div>
     <div>Nous sommes une équipe de passionnés de cuisine chinoise et nous avons pour mission de vous offrir des plats authentiques et savoureux qui sauront satisfaire toutes vos papilles.
     </div>
     <div>Nous utilisons des ingrédients frais et de qualité pour préparer nos plats, en nous inspirant des recettes traditionnelles de la cuisine chinoise tout en y apportant notre touche personnelle.
     </div>
     <div>Que ce soit pour un repas en famille, une soirée entre amis ou un événement professionnel, notre service traiteur chinois saura répondre à toutes vos attentes.
     </div>
     <div> N'hésitez pas à parcourir notre menu et à passer votre commande en ligne pour une expérience culinaire unique !
     </div>
    </div>
    <div className="slideshow-container">
     <div className="slideshow">
        <div className="prev" onClick={() => slideIndex!==1? plusSlides(-1):setSlideIndex(slides.length)}>&#10094;</div>
        {slides}
        <div className="next" onClick={() => slideIndex===slides.length? setSlideIndex(1):plusSlides(1)}>&#10095;</div>
     </div>
     <div className="dot-container">{dots}</div>
    </div>
    
   </div>
  </div>
 )
}

export default About