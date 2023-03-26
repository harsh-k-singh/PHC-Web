import React from 'react'
import { Link } from 'react-router-dom'
import "../../../CSSFiles/newcss.css";
//  import "../../../images";
import Phc1 from "../../../images/phc1.jpg"
import Phc2 from "../../../images/phc2.jpg"
import Phc3 from "../../../images/phc3.jpg"
import amb from "../../../images/amb1.jpg"
import team from "../../../images/medic.avif"
import mj from "../../../images/sir_manoj_singh.jpg"

import { useState, useEffect } from 'react';

function About() {
    // const [currentSlide, setCurrentSlide] = useState(0);
    // const [slideInterval, setSlideInterval] = useState(null);
    // const [images, setImages] = useState([]);
  
    // useEffect(() => {
    //   const imagesList = document.querySelectorAll('.slider-image');
    //   setImages(imagesList);
  
    //   const prevButton = document.querySelector('.slider-control.prev');
    //   const nextButton = document.querySelector('.slider-control.next');
  
    //   function showSlide(n) {
    //     images[currentSlide].classList.remove('active');
    //     const newSlide = (n + images.length) % images.length;
    //     setCurrentSlide(newSlide);
    //     images[newSlide].classList.add('active');
    //   }
  
    //   prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
    //   nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
  
    //   const interval = setInterval(() => {
    //     showSlide(currentSlide + 1);
    //   }, 3000);
  
    //   setSlideInterval(interval);
  
    //   function resetInterval() {
    //     clearInterval(slideInterval);
    //     const newInterval = setInterval(() => {
    //       showSlide(currentSlide + 1);
    //     }, 3000);
    //     setSlideInterval(newInterval);
    //   }
  
    //   document.addEventListener('visibilitychange', () => {
    //     if (document.hidden) {
    //       clearInterval(slideInterval);
    //     } else {
    //       resetInterval();
    //     }
    //   });
  
    //   window.addEventListener('scroll', function() {
    //     var elem = document.querySelector('.animate-in');
    //     var pos = elem.getBoundingClientRect().top;
    //     var windowHeight = window.innerHeight;
    //     if (pos < windowHeight) {
    //       elem.classList.add('animate-in-visible');
    //     }
    //   });
  
    //   return () => {
    //     clearInterval(slideInterval);
    //   };
    // }, [currentSlide, slideInterval, images]);

// let currentSlide = 0;
// const images = document.querySelectorAll('.slider-image');
// const prevButton = document.querySelector('.slider-control.prev');
// const nextButton = document.querySelector('.slider-control.next');

// function showSlide(n) {
//   images[currentSlide].classNameList.remove('active');
//   currentSlide = (n + images.length) % images.length;
//   images[currentSlide].classNameList.add('active');
// }

// prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
// nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

// let slideInterval = setInterval(() => {
//   showSlide(currentSlide + 1);
// }, 5000);

// function resetInterval() {
//   clearInterval(slideInterval);
//   slideInterval = setInterval(() => {
//     showSlide(currentSlide + 1);
//   }, 5000);
// }

// document.addEventListener('visibilitychange', () => {
//   if (document.hidden) {
//     clearInterval(slideInterval);
//   } else {
//     resetInterval();
//   }
// });

// window.addEventListener('scroll', function() {
// var elem = document.querySelector('.animate-in');
// var pos = elem.getBoundingClientRect().top;
// var windowHeight = window.innerHeight;
// if (pos < windowHeight) {
// elem.classNameList.add('animate-in-visible');
// }
// });

return (
    <div>
    <>
    <script>
        
    </script>
    <div>
        {/* <div id="intro">
            <div className="slider-container slider">
                <img src={Phc1} alt="Image 1" className="slider-image active" />
                <img src={Phc2} alt="Image 2" className="slider-image" />
                <img src={Phc3} alt="Image 3" className="slider-image" />
                <div className="slider-control prev">&#10094;</div>
                <div className="slider-control next">&#10095;</div>

            </div>
            </div> */}

<div id="carouselExampleControls" class="carousel slide " data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={Phc1} class="d-block" alt="..." style={{height:"500px",width:"100%"}}/>
    </div>
    <div class="carousel-item">
      <img src={Phc2} class="d-block" alt="..." style={{height:"500px",width:"100%"}}/>
    </div>
    <div class="carousel-item">
      <img src={Phc3} class="d-block" alt="..." style={{height:"500px",width:"100%"}}/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<div class="intro">
            <div className="container001">
                <div className="text1">
                <h2><b>We Welcome you to IIIT Jabalpur Healthcare Centre</b></h2>
                <p>At Indian Institute of Information Technology Jabalpur Healthcare Center, we are dedicated to providing comprehensive
                    and compassionate healthcare services to our students, staff, and faculty. Our team of experienced healthcare providers
                    is committed to promoting health and wellness on campus, and we strive to create an inclusive and accessible healthcare
                    environment for all.</p>
            </div>
            </div>

        </div>
        <div className="animate-in">

        <div className="container001">
        <div className="text px-3">
            <h2><b>The Ambulance Service</b></h2>
            <p>Our college healthcare center ambulance service is dedicated to providing timely and reliable
            emergency medical transportation to students, staff, and faculty on campus.
            Our ambulance service operates 24/7 to ensure that help is always just a phone call away, and
            our response times are among the fastest in the region.
            At our college healthcare center ambulance service, we prioritize patient safety and comfort,
            and we work closely with local hospitals and emergency services to provide seamless care for our patients.
            Whether you need transportation to a nearby hospital or urgent care facility, or simply require medical
            attention on campus, our ambulance service is here to help. Contact us today to learn more about our
            services or to request assistance in an emergency.</p>
            </div>
            <div className="image">
            <img src={amb} alt="Image Description"/>
            </div>
            </div>


<div className="animate-in">
<div className="container001">
<div className="image px-5">
<img src={team} alt="Image Description"/>
</div>
<div className="text">
<h2><b>The Medical Service</b></h2>
<p>The campus medical team at IIIT Jabalpur Healthcare Center is a group of highly skilled
                        and compassionate healthcare professionals who are dedicated to providing exceptional care to students,
                        staff, and faculty.
                        Our medical team includes board-certified physicians, nurse practitioners, nurses, and medical assistants,
                        who work collaboratively to deliver comprehensive primary care and preventive health services to our patients.
                        At IIIT JAbalpur Healthcare Center, our campus medical team is committed to delivering patient-centered care
                        that is tailored to your individual needs and preferences.</p>
</div>
</div>
</div>


        <><div className="animate-in">
            <div className="container001">
                <div className><img src={mj} alt="" title="" /></div>
                <div className="text1">
                <h2 className="mt-3"><b>Dr. Manoj Singh Parihar (faculty Incharge)</b><br /></h2>
                <p>
                    Phone: 0761-2794467<br />

                    Doctors available for consultation: <br />
                    1. Dr. G S Sandhu (MD) Medical Specialist ,<br />
                    2. Dr. Arvind Nath Gupta (MD) Paed. </p>
                 </div>

            </div>
        </div>
        </>

</div></div></>
</div>


)


//     return (
//         <div>
//         <>
//         <script>
            
//         </script>
//         <div>
//             <div id="intro">
//                 <div className="slider-container slider">
//                     <img src={Phc1} alt="Image 1" className="slider-image active" />
//                     <img src={Phc2} alt="Image 2" className="slider-image" />
//                     <img src={Phc3} alt="Image 3" className="slider-image" />
//                     <div className="slider-control prev">&#10094;</div>
//                     <div className="slider-control next">&#10095;</div>

//                 </div>
//                 <div className="container001">
//                     <div className="text1">
//                     <h2><b>We Welcome you to IIIT Jabalpur Healthcare Centre</b></h2>
//                     <p>At Indian Institute of Information Technology Jabalpur Healthcare Center, we are dedicated to providing comprehensive
//                         and compassionate healthcare services to our students, staff, and faculty. Our team of experienced healthcare providers
//                         is committed to promoting health and wellness on campus, and we strive to create an inclusive and accessible healthcare
//                         environment for all.</p>
//                 </div>
//                 </div>

//             </div>
//             <div className="animate-in">

//             <div className="container001">
//             <div className="text px-3">
//                 <h2><b>The Ambulance Service</b></h2>
//                 <p>Our college healthcare center ambulance service is dedicated to providing timely and reliable
//                 emergency medical transportation to students, staff, and faculty on campus.
//                 Our ambulance service operates 24/7 to ensure that help is always just a phone call away, and
//                 our response times are among the fastest in the region.
//                 At our college healthcare center ambulance service, we prioritize patient safety and comfort,
//                 and we work closely with local hospitals and emergency services to provide seamless care for our patients.
//                 Whether you need transportation to a nearby hospital or urgent care facility, or simply require medical
//                 attention on campus, our ambulance service is here to help. Contact us today to learn more about our
//                 services or to request assistance in an emergency.</p>
//                 </div>
//                 <div className="image">
//                 <img src={amb} alt="Image Description"/>
//                 </div>
//                 </div>


// <div className="animate-in">
// <div className="container001">
//   <div className="image px-5">
//     <img src={team} alt="Image Description"/>
//   </div>
//   <div className="text">
//     <h2><b>The Medical Service</b></h2>
//     <p>The campus medical team at IIIT Jabalpur Healthcare Center is a group of highly skilled
//                             and compassionate healthcare professionals who are dedicated to providing exceptional care to students,
//                             staff, and faculty.
//                             Our medical team includes board-certified physicians, nurse practitioners, nurses, and medical assistants,
//                             who work collaboratively to deliver comprehensive primary care and preventive health services to our patients.
//                             At IIIT JAbalpur Healthcare Center, our campus medical team is committed to delivering patient-centered care
//                             that is tailored to your individual needs and preferences.</p>
//   </div>
// </div>
// </div>


//             <><div className="animate-in">
//                 <div className="container001">
//                     <div className><img src={mj} alt="" title="" /></div>
//                     <div className="text1">
//                     <h2 className="mt-3"><b>Dr. Manoj Singh Parihar (faculty Incharge)</b><br /></h2>
//                     <p>
//                         Phone: 0761-2794467<br />

//                         Doctors available for consultation: <br />
//                         1. Dr. G S Sandhu (MD) Medical Specialist ,<br />
//                         2. Dr. Arvind Nath Gupta (MD) Paed. </p>
//                      </div>

//                 </div>
//             </div>
//             </>

//  </div></div></>
//  </div>
    
  
//     )
}

export default About;
