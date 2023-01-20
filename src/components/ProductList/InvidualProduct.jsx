import React from 'react'

export const IndividualProduct = ({individualProduct, addToCart}) => {
    console.log(individualProduct);
    const handleAddToCart = (e) => {
        e.preventDefault()
        addToCart(individualProduct);
    }

    const truncate = (str, n) => {
        return str ?. length > n ? str.substr(0, n - 1) + "..." : str;
    }

    // console.log(individualProduct.ID)

    const times = new Date(individualProduct.time.toDate()).toLocaleDateString() + " " + new Date(individualProduct.time.toDate()).toLocaleTimeString()
    // console.log(times)

    

    return (
        <div id={
                individualProduct.ID
            }
            className='product'>
            <div className='product-img'>
                <img className='product__imgs'
                    src={
                        individualProduct.url
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
                    truncate(individualProduct.title, 20)
                }
                <span className='product__states'>Còn hàng</span>
                </div>
                <div className='product__cate'>{individualProduct.categorys}</div>
                <div className='products__info'>
                    <div className='product__price'>Giá sản phẩm : <span>{
                       individualProduct.price.toLocaleString('de-DE')
                    }đ</span>
                    </div>                    
                </div>
            </div>
        </div>
    )
}
