import React from 'react'
import "../Home/Home.css"
export const IndividualFilteredProduct = ({individualFilteredProduct, addToCart}) => {

    

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    console.log(individualFilteredProduct)

    const times = new Date(individualFilteredProduct.time.toDate()).toLocaleDateString() + " " + new Date(individualFilteredProduct.time.toDate()).toLocaleTimeString()
    const prices = (individualFilteredProduct.price.toLocaleString('de-DE'))
    console.log(prices)
    return (
        <div id={
            individualFilteredProduct.ID
        }
        className='product'>
        <div className='product-img'>
            <img className='product__imgs'
                src={
                    individualFilteredProduct.url
                }
                alt="product-img"/>
            <span className='product__state'>Đang mở bán</span>
            <div>
                <i class="fa-regular fa-heart"></i>
            </div>
            <div className='product__time'>{times}</div>
        </div>
        <div className='product__content'>
            <div className='product__title'>
                {
                truncate(individualFilteredProduct.title, 10)
            }
            <span className='product__states'>Còn hàng</span>
            </div>
            <div className='product__cate'>{individualFilteredProduct.categorys}</div>
            <div className='products__info'>
                <div className='product__price'>Giá sản phẩm : <span>{
                    prices
                }đ</span>
                </div>                    
            </div>
        </div>
    </div>
    )
}