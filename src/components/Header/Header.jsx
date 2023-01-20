import React, {useEffect, useState} from 'react'
import Logo2 from '../../images/Logo2.jpg'
import "../Header/Header.css"
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {auth} from '../config/Config'
import {db} from '../config/Config'


function Header({user, totalProducts}) {
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [datas, setDatas] = useState([])
    const [show, setShow] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        setData(data.filter(item => item.content.toLowerCase().includes(search.toLowerCase()) || item.title.toLowerCase().includes(search.toLowerCase()) || item.categorys.toLowerCase().includes(search.toLowerCase())))


    }

    const handleShow = () => {
        setShow(!show)
    }


    const history = useHistory();

    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/signIn');
        })
    }

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
    }, [search])

    useEffect(() => {
        const fetchNotification = db.collection('Products').limit(100).onSnapshot((snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return({
                    ID: doc.id,
                    ...doc.data()
                })
            })
            setDatas(data)
        })
        return fetchNotification
    }, [search])

    const fetchNoti = datas.filter((notification) => {
        return notification.poster === user
    })

    const fetchNotiSlice = fetchNoti.slice(0, 3)

    console.log(fetchNoti.slice(0, 3))

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


    return (
        <div className='Headers'>
            <div className='Info'>
                <div className='Headers__infomations'>
                    <Link to="/" className='Headers__item1'>Kênh người bán</Link>
                    {"|"}
                    <Link to="/" className='Headers__item2'>Trở thành người bán Furni</Link>
                    {"|"}
                    <Link to="/" className='Headers__item3'>Tải ứng dụng</Link>
                    {"|"}
                    <div className='Headers__group'>
                        <div className='Headers__item4'>Kết nối</div>
                        <a className='Logos' href="">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a className='Logos' href="">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>

                <div className='Headers_nofi'>
                    <div onClick={handleShow}
                        className='Headers__item1'>
                        <i className="fa-solid fa-bell"></i>
                        Thông báo
                        <div className='totalNofi'>
                            {
                            fetchNotiSlice.length
                        }</div>
                    </div>


                    {
                    show && <div className='Headers_nofi__popup'>
                        {
                        Object.keys(fetchNoti).length === 0 ? (
                            <div className='Headers_nofi__loading'>Chưa có thông báo nào</div>
                        ) : fetchNotiSlice.map((noti) => {
                            return (
                                <div className='no_links'>
                                    <Link className='no_link'
                                        to={
                                            `/products/${
                                                noti.ID
                                            }`
                                    }>
                                        <div key={
                                                noti.ID
                                            }
                                            className='Header_noti__detail'>
                                            <div className='Header__contents'>
                                                <div className='Header__user'>
                                                    <span>{
                                                        noti.poster
                                                    }</span>
                                                    {"  "}
                                                    đã đăng 1 sản phẩm liên quan tới sản phẩm bạn đang tìm kiếm gần đây
                                                </div>

                                                <div>
                                                    <img className='Header__user__img'
                                                        src={
                                                            noti.url
                                                        }
                                                        alt=""/>
                                                </div>
                                            </div>
                                            <div className='Header__noti_date'>
                                                {
                                                new Date(noti.time.toDate()).toLocaleDateString() + " " + new Date(noti.time.toDate()).toLocaleTimeString()
                                            }</div>
                                        </div>
                                    </Link>
                                </div>
                            )

                        })
                    }
                        <div style={Object.keys(fetchNoti).length === 0 ? {
                            opacity: 0
                        } : {opacity: 1}}>
                            <div style={
                                {
                                    float: 'right',
                                    padding: 10
                                }
                            }>Xem tất cả</div>
                        </div>
                    </div>
                }

                    <div className='Headers__item2'>
                        <i className="fa-solid fa-headset"></i>
                        Hỗ trợ
                    </div>
                </div>
            </div>


            <div className='Headers__containers'>
                <Link to="/">
                    <div className='Headers__logo'>
                        <img className='Headers__img'
                            src={Logo2}
                            alt="Logo"/>
                    </div>
                </Link>

                <div className='Headers__search'>
                    <form className='Headers__forms'
                        onSubmit={handleSubmit}>
                        <input value={search}
                            onChange={
                                e => setSearch(e.target.value)
                            }
                            className='Headers__input'
                            placeholder='Tìm với giá tốt trên Furnie'
                            type="text"/>
                        <button type='submit' className='Headers-btn__search'>
                            <i className='fa fa-search'></i>
                        </button>
                    </form>

                    {
                    search && (
                        <div className='Searchs'>
                            <div className='searchKeyword'>Tìm kiếm theo từ khóa '{search}'</div>

                            {
                            Object.keys(data).length === 0 ? (
                                <div className='searchItemNo'>Không tìm thấy từ khóa {search}</div>
                            ) : (
                                <div>{
                                    data.map((item) => {
                                        return (
                                            <div onClick={
                                                    (e) => {
                                                        e.preventDefault()
                                                        history.push(`/products/${
                                                            item.ID
                                                        }`)
                                                        setSearch('')
                                                    }
                                                }
                                                className='searchItem'
                                                key={
                                                    item.ID
                                            }>
                                                <div className='searchItemImg'>
                                                    <img className='product__imgsss'
                                                        src={
                                                            item.url
                                                        }
                                                        alt=""/>
                                                </div>
                                                <div>{
                                                    item.title
                                                }</div>
                                                <div>{
                                                    item.price
                                                }
                                                    đ</div>
                                            </div>
                                        )
                                    })
                                }</div>
                            )
                        } </div>
                    )
                } </div>


                <Link to="/addProducts">
                    <div className='Headers-product__add'>
                        <i className="fa-solid fa-plus"></i>
                        <div className='Headers-text__add'>Đăng tin</div>
                    </div>
                </Link>

                {
                !user && <div className='Headers__auth'>
                    <Link className='Headers__signUp'>Đăng ký</Link>
                    {"|"}
                    <Link className='Headers__signIn'>Đăng nhập</Link>
                    {"|"}
                    <Link to='/Cart'>
                        <div className='Headers__cart'>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                    </Link>
                </div>
            }

                {
                user && <div className='Headers__auth'>
                    <Link className='Headers__signUp'
                        onClick={handleLogout}>Đăng xuất</Link>
                    {"|"}
                    <Link to={
                            `/Profile/${uids}`
                        }
                        className='Headers__signIn'>
                        {user}</Link>
                    {"|"}
                    <Link to='/Cart'>
                        <div className='Headers__cart'>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <div className='total'>
                                <span>{totalProducts}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            } </div>


        </div>
    )
}

export default Header
