import React from 'react'
import { auth, db } from '../config/Config';
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
function InvidiualCartProducts({cartProduct, cartProductIncrease, cartProductDecrease}) {
   

    const handleCartProductIncrease=()=>{
        cartProductIncrease(cartProduct);
    }

    const handleCartProductDecrease=()=>{
        cartProductDecrease(cartProduct);
    }

    const handleCartProductDelete=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart ' + user.uid).doc(cartProduct.ID).delete().then(()=>{
                    console.log('successfully deleted');
                })
            }
        })
    }

    console.log(cartProduct)
  
  return (
    <div className='productCart'>
        <div className='product__image'>
            <img className='product__imgss' src={cartProduct.url} alt="" />
            <div className='product-text title'>{cartProduct.title}</div> 
        </div>
        
        <div className='product-text price'>{cartProduct.price.toLocaleString('de-DE')} đ</div>
         
        <div className='product-text quantity-box'>
            <div className='action-btns minus' onClick={handleCartProductDecrease} >
                <Icon icon={minus} size={20}/>
            </div>                
            <div>{cartProduct.qty}</div>               
            <div className='action-btns plus' onClick={handleCartProductIncrease}>
                <Icon icon={plus} size={20}/>
            </div>
        </div>
        
        <div className='product-text price'>{cartProduct.price.toLocaleString('de-DE')} đ</div>

        <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductDelete} >Xóa</div>    
    </div>
  )
}

export default InvidiualCartProducts
