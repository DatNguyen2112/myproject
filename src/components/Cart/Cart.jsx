import React, {useState, useEffect} from 'react'
import '../Cart/Cart.css'
import Header from '../Header/Header'
import {db, auth} from '../config/Config'
import {CartProducts} from './CartProducts'
function Cart({user}) { // getting current user uid

    function GetUserUid() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                }
            })
        }, [])
        return uid;
    }

    const uid = GetUserUid();

    // state of totalProducts
    const [totalProducts, setTotalProducts] = useState(0);
    // getting cart products
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('Cart ' + user.uid).onSnapshot(snapshot => {
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })
    }, [])

    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('Cart ' + user.uid).onSnapshot(snapshot => {
                    const newCartProduct = snapshot.docs.map((doc) => {
                        return({
                            ID: doc.id,
                            ...doc.data()
                        })
                    })
                    setCartProducts(newCartProduct)
                })
            } else {
                console.log('Faild')
            }
        })
    }, [])

   cartProducts.map((cartProduct) => {
    console.log(cartProduct.ID)
   })


    return (
        <>
            <Header user={user}
                totalProducts={totalProducts}/>

            <div className='cartContainer'>
                <h1 className='cartTitle'>Giỏ hàng</h1>
                <div className='cartBox'>
                    <div className='cardBox__title'>
                        <div className='cardBox__products'>Sản phẩm</div>
                        <div className='cardBox__detail'>
                            <div className='cardBox__prices'>Đơn giá</div>
                            <div className='cardBox__quantity'>Số lượng</div>
                            <div className='cardBox__price'>Số tiền</div>
                            <div className='cardBox__action'>Thao tác</div>
                        </div>
                    </div>
                </div>

                <div className='cartBox'>
                    {cartProducts.length > 0 && <CartProducts cartProducts={cartProducts}/>} {
                    cartProducts.length < 1 && (
                        <div className='container-fluid'>Không có sản phẩm nào</div>
                    )
                } </div>
            </div>


        </>
    )
}

export default Cart
