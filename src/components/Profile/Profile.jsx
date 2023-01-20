import React, {useState, useEffect} from 'react'
import Header from '../Header/Header'
import {auth, db} from '../config/Config';
import {useParams} from 'react-router-dom';
import "../Profile/Profile.css"

const Profile = ({user}) => { // getting current user uid
    const {ProfieID} = useParams()
    console.log(ProfieID)

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

    const [data, setData] = useState([])


    useEffect(() => {
        const fetchProduct = db.collection('Products').limit(100).onSnapshot((snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return({
                    ID: doc.id,
                    ...doc.data()
                })
            })
            setData(data)
        })
        return fetchProduct
    }, [])

    // console.log(data)
    const fetchUser = data.filter((item) => {
        return item.poster === user
    })

    console.log(fetchUser)

    function GetUserUid() {
        const [uids, setUids] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUids(user.uid);
                }
            })
        }, [])
        return uids;
    }

    const uids = GetUserUid();
    console.log(uids)

    const [time, setTime] = useState('')
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('signup').doc(user.uid).get().then(snapshot => {
                    setTime(new Date(snapshot.data().time.toDate()).toLocaleDateString() + " " + new Date(snapshot.data().time.toDate()).toLocaleTimeString())
                })
            } else {
                setTime(null)
            }
        })
    }, [ProfieID])


    console.log(user, time)

    const options = ['Tin đã đăng', 'Sản phẩm đang vận chuyển',  'Sản phẩm đã bán']
    const [tab, setTab] = useState(options[0])

    const truncate = (str, n) => {
        return str ?. length > n ? str.substr(0, n - 1) + "..." : str;
    }

    
    return (
        <div>
            <Header user={user}
                totalProducts={totalProducts}/>

            <div className='Profile__title'>
                <h2>Thông tin cá nhân</h2>
            </div>

            <div className='center'>
                <div className='Profile__info'>
                    <div className='Profile__avatar'>
                        <div className='avatar'>
                            <i className="fa-solid fa-user-tie"></i>
                        </div>
                        <div className='user'>
                            <h2>{user}</h2>
                        </div>
                        <div className='Payment'>
                            <div className='Payment__text'>Số dư: 0đ</div>
                            <button className='Payment__action'>Nạp tiền</button>
                        </div>
                    </div>
                    <div className='Profile_infomation'>
                        <div className='Profile__success'>Sản phẩm đã đăng bán thành công</div>
                        <div className='Profile__rate'>
                            Đã đánh giá:
                            {" "}
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <div className='Profile__percentResponse'>
                            Tỉ lệ phản hồi chat : Chưa cập nhật
                        </div>
                        <div className='Profile__dateChange'>Ngày tham gia: {
                            time || 'Chưa cập nhật'
                        }</div>
                    </div>
                </div>

            </div>

            <div className='Profile__option'>
                {options.map((option, index) => {
                    return (
                        <div><button  style={
                            option === tab ? {
                                backgroundColor: '#495579',
                                color: '#fff'
                            } : {}
                        }
                        onClick={
                            () => setTab(option)
                        } className='Profile__btn' key={index}>{option}</button></div>
                    )
                })}
            </div>
            
            <div className='center'>
                <div className='Profile__product'>
                    <>
                    {tab === 'Tin đã đăng' ? fetchUser.map((users) => {
                        return (
                            <div 
                            key={users.ID}
                            className='product'>
                            <div className='product-img'>
                                <img className='product__imgs width240'
                                    src={
                                        users.url
                                    }
                                    alt="product-img"/>
                                <span className='product__state'>Đang mở bán</span>
                                <div>
                                    <i className="fa-regular fa-heart"></i>
                                </div>
                                <div className='product__time'>{new Date(users.time.toDate()).toLocaleDateString() + " " + new Date(users.time.toDate()).toLocaleTimeString()}</div>
                            </div>
                            <div className='product__content'>
                                <div className='product__title'>
                                    {
                                    truncate(users.title, 10)
                                }
                                <span className='product__states'>Còn hàng</span>
                                </div>
                                <div className='product__cate'>{users.categorys}</div>
                                <div className='products__info'>
                                    <div className='product__price'>Giá sản phẩm : <span>{
                                        users.price
                                    }đ</span>
                                        </div>                    
                                </div>
                            </div>
                        </div>
                        
                        )
                    }) : ''}
                    {
                        Object.keys(fetchUser).length === 0 && (
                            <div>Chưa đăng sản phẩm nào</div>
                        )
    
                    } 
                    </>
                    
                    <></>
                    {tab === 'Sản phẩm đang vận chuyển' ? fetchUser.map((users) => {
                        return (
                            <div 
                            className='product'>
                            <div className='product-img'>
                                <img className='product__imgs width240'
                                    src={
                                        users.url
                                    }
                                    alt="product-img"/>
                                <span className='product__state'>Đang mở bán</span>
                                <div>
                                    <i class="fa-regular fa-heart"></i>
                                </div>
                                <div className='product__time'>{new Date(users.time.toDate()).toLocaleDateString() + " " + new Date(users.time.toDate()).toLocaleTimeString()}</div>
                            </div>
                            <div className='product__content'>
                                <div className='product__title'>
                                    {
                                    truncate(users.title, 10)
                                }
                                <span className='product__states'>Còn hàng</span>
                                </div>
                                <div className='product__cate'>{users.categorys}</div>
                                <div className='products__info'>
                                    <div className='product__price'>Giá sản phẩm : <span>{
                                        users.price
                                    }đ</span>
                                        </div>                    
                                </div>
                            </div>
                        </div>
                        
                        )
                    }) : ''}
                    
                    <></>
                    {tab === 'Sản phẩm đã bán' ? fetchUser.map((users) => {
                        return (
                            <div 
                            className='product'>
                            <div className='product-img'>
                                <img className='product__imgs width240'
                                    src={
                                        users.url
                                    }
                                    alt="product-img"/>
                                <span className='product__state'>Đang mở bán</span>
                                <div>
                                    <i class="fa-regular fa-heart"></i>
                                </div>
                                <div className='product__time'>{new Date(users.time.toDate()).toLocaleDateString() + " " + new Date(users.time.toDate()).toLocaleTimeString()}</div>
                            </div>
                            <div className='product__content'>
                                <div className='product__title'>
                                    {
                                    truncate(users.title, 10)
                                }
                                <span className='product__states'>Còn hàng</span>
                                </div>
                                <div className='product__cate'>{users.categorys}</div>
                                <div className='products__info'>
                                    <div className='product__price'>Giá sản phẩm : <span>{
                                        users.price
                                    }đ</span>
                                        </div>                    
                                </div>
                            </div>
                        </div>
                        
                        )
                    }) : ''}
                    
                </div>
            </div>    
        </div>
    )
}

export default Profile
