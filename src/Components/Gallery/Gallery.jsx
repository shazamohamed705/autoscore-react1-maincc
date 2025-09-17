import React from 'react'
import Slider from "react-slick";
import vector from '../../assets/Vector 196 (Stroke).png'
import img1 from '../../assets/imgslider1.png'
import img2 from '../../assets/imgslider2.png'
import img3 from '../../assets/imgslider3.png'
import img4 from '../../assets/imgslider4.png'
import img5 from '../../assets/imgslider5.png'
import img6 from '../../assets/imgslider6.png'

function Gallery() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,

        }
      }
    ]
  };
  return (
    <>
      <section>
        <div className="w-4/5 mx-auto py-14">
          <div className="title text-center relative mb-16">
            <h3 className="text-3xl my-5">معرض صور </h3>
            <h2 className='text-5xl font-extrabold'>كار سيرفس</h2>
            <img className='absolute right-1/2 translate-x-1/2  ' src={vector} alt="" />
          </div>

          <div className="slider-container">
            <Slider {...settings}>
              {/* First Slide */}
              <div className="grid grid-col-2   ">
                <div className='flex items-center justify-center m-5'>
                  <img className='min-h-56 rounded-2xl' src={img1} alt="" />
                </div>
                <div className='flex items-center justify-center m-5'>
                  <img className='min-h-56 rounded-2xl' src={img4} alt="" />
                </div>
              </div>
              {/* Second Slide */}
              <div className="grid grid-col-2   ">
                <div className='flex items-center justify-center m-5 '>
                  <img className='min-h-56 rounded-2xl' src={img2} alt="" />
                </div>
                <div className='flex items-center justify-center m-5'>
                  <img className='min-h-56 rounded-2xl' src={img5} alt="" />
                </div>
              </div>
              {/* Third Slide */}
              <div className="grid grid-col-2   ">
                <div className='flex items-center justify-center m-5'>
                  <img className='min-h-56 rounded-2xl' src={img3} alt="" />
                </div>
                <div className='flex items-center justify-center m-5'>
                  <img className='min-h-56 rounded-2xl' src={img6} alt="" />
                </div>
              </div>

            </Slider>
          </div>
        </div>

      </section>
    </>
  )
}

export default Gallery