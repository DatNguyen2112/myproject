import React from 'react'
import "../Footer/Footer.css"


function Footer() {
    return (
        <div className='Footer'>
            <div className='Footer__container'>
                <div className='Footer__advice'>
                    <h3 className='Footer-title__advice'>Chăm sóc khách hàng</h3>
                    <ul>
                        <li className='Footer__item'>
                            Trung tâm trợ giúp
                        </li>
                        <li className='Footer__item'>
                            Furnie Blog
                        </li>
                        <li className='Footer__item'>
                            Furnie Mail
                        </li>
                        <li className='Footer__item'>
                            Hướng dẫn mua hàng
                        </li>
                        <li className='Footer__item'>
                            Hướng dẫn bán hàng
                        </li>
                        <li className='Footer__item'>
                            Thanh toán
                        </li>
                        <li className='Footer__item'>
                            Furnie Xu
                        </li>
                        <li className='Footer__item'>
                            Vận chuyển
                        </li>
                        <li className='Footer__item'>
                            Trả hàng & Hoàn Tiền
                        </li>
                        <li className='Footer__item'>
                            Chăm sóc khách hàng
                        </li>
                        <li className='Footer__item'>
                            Chính sách bảo hành
                        </li>
                    </ul>
                </div>
                <div className='Footer__about'>
                    <h3 className='Footer-title__advice'>About</h3>
                    <ul>
                        <li className='Footer__item'>
                            Trung tâm trợ giúp
                        </li>
                        <li className='Footer__item'>
                            Furnie Blog
                        </li>
                        <li className='Footer__item'>
                            Furnie Mail
                        </li>
                        <li className='Footer__item'>
                            Hướng dẫn mua hàng
                        </li>
                        <li className='Footer__item'>
                            Hướng dẫn bán hàng
                        </li>
                        <li className='Footer__item'>
                            Thanh toán
                        </li>
                        <li className='Footer__item'>
                            Furnie Xu
                        </li>
                        <li className='Footer__item'>
                            Vận chuyển
                        </li>
                        <li className='Footer__item'>
                            Trả hàng & Hoàn Tiền
                        </li>
                    </ul>
                </div>
                <div className='Footer__cash'>
                    <div className='Footer__money'>
                        <h3 className='Footer-title__advice'>Thanh toán</h3>
                        <div className='Footer__items'>
                            <img src="https://exacdn.acfc.com.vn/media/MTC-Icons/fb-social.svg" alt="" />
                            <img src="https://exacdn.acfc.com.vn/media/MTC-Icons/ig-social.svg" alt="" />
                            <img src="https://exacdn.acfc.com.vn/media/MTC-Icons/zalo-social.svg" alt="" />
                            <img src="https://exacdn.acfc.com.vn/media/MTC-Icons/youtube-social.svg" alt="" />
                        </div>
                    </div>
                    <div className='Footer__cashing'>
                        <h3 className='Footer-title__advice margin'>Chấp nhận thanh toán</h3>
                        <div className='Footer__items'>
                            <img src="https://exacdn.acfc.com.vn/media/wysiwyg/payments/visa.svg" alt="" />
                            <img src="https://exacdn.acfc.com.vn/media/wysiwyg/payments/mastercard.svg" alt="" />
                            <img src="https://exacdn.acfc.com.vn/media/wysiwyg/payments/jcb.svg" alt="" />
                            <img src="https://exacdn.acfc.com.vn/media/wysiwyg/payments/cod.svg" alt="" />
                            <img src="https://exacdn.acfc.com.vn/media/wysiwyg/payments/atm.svg" alt="" />
                        </div>
                    </div>
                    <div className='Footer__delivery'>
                        <h3 className='Footer-title__advice margin'>Đối tác vận chuyển</h3>
                        <div>
                          <img className='Deliveries' src="https://exacdn.acfc.com.vn/media/wysiwyg/Artboard.webp" alt="" />
                        </div>                        
                    </div>
                </div>
                <div className='Footer__follow'>
                    <h3 className='Footer-title__advice'>Theo dõi chúng tôi trên</h3>
                    <div className='Footer__insta'>
                      <i className="fa-brands fa-facebook"></i>
                      <div className='Facebook'>Facebook</div>
                    </div>
                    <div className='Footer__face'>
                      <i className="fa-brands fa-instagram"></i>
                      <div className='Instagram'>Instagram</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
