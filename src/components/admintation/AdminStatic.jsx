import React from 'react'
import AdminPhoto from '../../images/admin.jpg'
import "../admintation/Admin.css"

function AdminStatic() {
    

    return (
        <div className='Admin'>
            <div>
                <div className='Slider'><img className='Slider__img' src={AdminPhoto} alt="" /></div>
                <div className='Slider'><img className='Slider__img' src={AdminPhoto} alt="" /></div>
                <div className='Slider'><img className='Slider__img' src={AdminPhoto} alt="" /></div>
                <div className='Slider'><img className='Slider__img' src={AdminPhoto} alt="" /></div>
            </div>
        </div>
    )
}

export default AdminStatic
