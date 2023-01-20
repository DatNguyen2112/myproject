import React from 'react'
import AdminPhoto from '../../images/admin.jpg'
import "../admintation/Admin.css"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Admin() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        slickNext: false,
        slickPrev: false
    };

    return (
        <div className='Admin'>
            <div className='Slider'>
                <Slider {...settings}>
                    
                        <img className='Slider__img'
                            src={AdminPhoto}
                            alt=""/>
                    
                    
                        <img className='Slider__img'
                            src={AdminPhoto}
                            alt=""/>
                    

                </Slider>
            </div>

            <div className='Slider'>
                <Slider {...settings}>
                    
                        <img className='Slider__img'
                            src={AdminPhoto}
                            alt=""/>
                    
                    
                        <img className='Slider__img'
                            src={AdminPhoto}
                            alt=""/>
                    

                </Slider>
            </div>

            <div className='Slider'>
                <Slider {...settings}>
                    
                        <img className='Slider__img'
                            src={AdminPhoto}
                            alt=""/>
                    
                    
                        <img className='Slider__img'
                            src={AdminPhoto}
                            alt=""/>
                    

                </Slider>
            </div>

            <div className='Slider'>
                <Slider {...settings}>
                    
                        <img className='Slider__img'
                            src={AdminPhoto}
                            alt=""/>
                    
                    
                        <img className='Slider__img'
                            src={AdminPhoto}
                            alt=""/>
                    

                </Slider>
            </div>
        </div>
    )
}

export default Admin
