import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {db} from '../config/Config'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from '../config/Config'
import '../ProductDetail/ProductDetail.css'
import Header from '../Header/Header'
import MapPhoto from '../../images/map.jpg'


function ProductDetail({user, props}) {
    const {productID} = useParams()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [phone, setPhone] = useState('')
    const [content, setContent] = useState('')
    const [time, setTime] = useState('')
    const [image, setImage] = useState()
    const [cate, setCate] = useState('')
    const [posters, setPosters] = useState('')
    const [product, setProduct] = useState()
    const [quantity, setQuantity] = useState('')
    const [address, setAddress] = useState('')
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')

    // console.log(productID)


    useEffect(() => {
        const fetchDetailProduct = db.collection("Products").doc(productID).get().then((snapshot) => {
            if (snapshot) {
                setImage(snapshot.data().url)
                setTitle(snapshot.data().title)
                setCate(snapshot.data().categorys)
                setContent(snapshot.data().content)
                setPrice(snapshot.data().price)
                setPhone(snapshot.data().number)
                setTime(new Date(snapshot.data().time.toDate()).toLocaleDateString() + " " + new Date(snapshot.data().time.toDate()).toLocaleTimeString())
                setPosters(snapshot.data().poster)
                setQuantity(snapshot.data().quantity)
                setAddress(snapshot.data().address)
                setColor(snapshot.data().color)
                setSize(snapshot.data().color)
            }
        })
        return fetchDetailProduct
    }, [productID])

    useEffect(() => {
        const fetchProduct = db.collection("Products").doc(productID).get().then((snapshot) => {
            if (snapshot) {
                setProduct(snapshot.data())
            }
        })
        return fetchProduct
    }, [productID])


    // getting current user uid
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

    // globl variable
    let Product;

    // add to cart
    const addToCart = (product, ID) => {
        if (uid !== null) {
            console.log(product);
            console.log(ID)
            Product = product;
            Product['ID'] = productID
            Product['qty'] = 1;
            Product['TotalProductPrice'] = Product.qty * Product.price;
            db.collection('Cart ' + uid).doc(productID).set(Product).then(() => {

                toast.success(productID ? 'B???n ???? th??m v??o gi??? h??ng th??nh c??ng' : 'S???n ph???m ???? c?? trong gi??? h??ng')

            }).catch((err) => {
                toast.error('L???i h??? th???ng', err)
            })

        } else {
            props.history.push('/login');
        }

    }

    console.log(product)

    const handleAdd = () => {
        addToCart(product)

    }


    // db.collection('signup').doc(productID).get().then((snapshot) => {
    //     if(snapshot) {
    //       console.log(snapshot.data())
    //     }
    // })


    // db.collection("Products").doc(productID).get().then((snapshot) => {
    // if(snapshot) {
    //     console.log(new Date(snapshot.data().time.toDate()).toUTCString())
    // }
    // }

    return (
        <>
            <ToastContainer/>
            <Header user={user}
                totalProducts={totalProducts}
                productID={productID}/>

            <div className='ProductDetail'>
                <div className='ProductDetail__content'>
                    <div className='ProductDetail__pic'>
                        <img style={
                                {
                                    width: 700,
                                    height: 400,
                                    
                                }
                            }
                            src={image}
                            alt=""/>

                        <div className='Product__info'>
                            <div className='Product__title'>
                                <span style={{fontWeight: 'bold'}}>T??n s???n ph???m :</span>
                                <h3>{title}</h3>
                            </div>

                            <div className='Product__present'>
                                <span style={{fontWeight: 'bold'}}>M?? t???</span> :
                                <p>{content}</p>
                            </div>

                            <div className='Product__price'>
                                <span style={{fontWeight: 'bold'}}>Gi?? :</span>
                                <h3>{
                                    price.toLocaleString('de-DE')
                                }
                                    ??</h3>
                            </div>

                            <div className='Product__rateSave'>
                                <div className='Product__rate'>
                                    <span style={{fontWeight: 'bold'}}>????nh gi??: </span> {"  "}
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>

                                <div>
                                    <button onClick={handleAdd} className='Product__save'>
                                        L??u tin
                                        <i class="fa-light fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='ProductDetail__detail'>
                        <h2 className='ProductTitle'>Th??ng tin s???n ph???m</h2>
                        <div className='ProductQuantity'>
                            <span style={{fontWeight: 'bold'}}>S??? l?????ng :</span> {quantity ||  'Ch??a c???p nh???t'}
                        </div>
                        <div className='ProductColor'>
                            <span style={{fontWeight: 'bold'}}>M??u s???c :</span> {color ||  'Ch??a c???p nh???t'}
                        </div>
                        <div className='ProductSize'>
                            <span style={{fontWeight: 'bold'}}>K??ch th?????c</span> : {size ||  'Ch??a c???p nh???t'}
                        </div>
                        <div className='ProductState'>
                            <span style={{fontWeight: 'bold'}}>????? m???i :</span> 80%
                        </div>
                        <div className='ProductState'>
                            <span style={{fontWeight: 'bold'}}>L???i s???n ph???m :</span> Ch??a c?? l???i
                        </div>

                        <h2 className='ProductTitle'>Ng?????i b??n</h2>
                        <div className='Product__user'>
                            <div className='avatar'>
                                <i className="fa-solid fa-user-tie"></i>
                            </div>

                            <div className='ProductUser'>
                                <div className='ProductUser__name'><span style={{fontWeight: 'bold'}}>T??n :</span> {posters}</div>
                                <div className='ProductUser__address'><span style={{fontWeight: 'bold'}}>?????a ch???:</span> {address ||  'Ch??a c???p nh???t'}</div>
                                <div className='ProductUser__phone'><span style={{fontWeight: 'bold'}}>S??? ??i???n tho???i:</span> <span>{phone || 'Kh??ng c??'}</span></div>
                                <div className='ProductUser__map'><span style={{fontWeight: 'bold'}}>Ch??? ???????ng:</span> <img style={{width: 200, height: 200}} src={MapPhoto} alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail
