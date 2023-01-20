import React, {useEffect, useState} from 'react'
import Header from '../Header/Header'
import {useHistory} from 'react-router-dom'
import {auth, db} from '../config/Config';
import {Link} from 'react-router-dom';
import Banner1 from '../../images/banner1.png'
import Banner2 from '../../images/Banner2.jpg'
import Banner3 from '../../images/banner3.png'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Home/Home.css"
import "../ProductList/ProductList.css"
import "../FilterProducts/FilterProducts.css"
import {Products} from '../ProductList/Products'
import {IndividualFilteredProduct} from '../ProductList/InvidiualFilterProduct'
import Admin from '../admintation/Admin';
import AdminStatic from '../admintation/AdminStatic';
function Home({user}) {
    const history = useHistory();

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

    const [DataIndex] = useState([
        {
            id: 'Bàn ghế',
            description: 'Bàn ghế',
            imageUrl: "https://static.chotot.com/storage/c2cCategories/14070.svg"
        },

        {
            id: 'Tủ, kệ gia đình',
            description: 'Tủ, kệ gia đình',
            imageUrl: "https://static.chotot.com/storage/c2cCategories/14080.svg"
        },
        {
            id: 'Giường, chăn ga, gối nệm',
            description: 'Giường, chăn ga, gối nệm',
            imageUrl: "https://static.chotot.com/storage/c2cCategories/14030.svg"
        },

        {
            id: 'Bếp, lò, đồ điện nhà bếp',
            description: 'Bếp, lò, đồ điện nhà bếp',
            imageUrl: "https://static.chotot.com/storage/c2cCategories/14010.svg"
        }, {
            id: 'Dụng cụ nhà bếp',
            description: 'Dụng cụ nhà bếp',
            imageUrl: "https://static.chotot.com/storage/c2cCategories/14020.svg"
        }, {
            id: 'Quạt',
            description: 'Quạt',
            imageUrl: "https://static.chotot.com/storage/c2cCategories/14050.svg"
        }, {
            id: 'Cây cảnh, đồ trang trí',
            description: 'Cây cảnh, đồ trang trí',
            imageUrl: "https://static.chotot.com/storage/c2cCategories/14090.svg"
        }, {
            id: 'Thiết bị vệ sinh, nhà tắm',
            description: 'Thiết bị vệ sinh, nhà tắm',
            imageUrl: "https://static.chotot.com/storage/c2cCategories/14040.svg"
        }, {
            id: 'Nội thất, đồ gia dụng',
            description: 'Nội thất, đồ gia dụng',
            imageUrl: "https://static.chotot.com/storage/c2cCategories/14110.svg"
        },
    ])

    const dataSlice = DataIndex.slice(0, 5)


    // state of products
    const [products, setProducts] = useState([]);

    // getting products function
    const getProducts = async () => {
        const products = await db.collection('Products').get();
        const productsArray = [];
        for (var snap of products.docs) {
            var data = snap.data();
            console.log(data)
            console.log(data.ID)
            data.ID = snap.id;
            productsArray.push({
                ... data
            })
            if (productsArray.length === products.docs.length) {
                setProducts(productsArray);
            }
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    // active class state
    const [active, setActive] = useState('');

    // category state
    const [categorys, setCategorys] = useState('');

    // handle change ... it will set category and active states
    const handleChange = (individualSpan) => {
        setActive(individualSpan.id);
        setCategorys(individualSpan.description);
        filterFunction(individualSpan.description);
    }

    console.log(active)
    console.log(categorys)


    // filtered products state
    const [filteredProducts, setFilteredProducts] = useState([]);

    console.log(filteredProducts)

    // filter function
    const filterFunction = (text) => {
        if (products.length > 1) {
            const filter = products.filter((product) => product.categorys === text);
            setFilteredProducts(filter);
        } else {
            console.log('no products to filter')
        }
    }

    // return to all products
    const returntoAllProducts = () => {
        setActive('');
        setCategorys('');
        setFilteredProducts([]);
    }


    useEffect(() => { // forcing user to signup
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/signIn');
            }
        })
    })

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


    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div>
            <Header user={user}
                totalProducts={totalProducts}/>
            <div className='Support'>
                <Link to="/Cart" className='fa__icons'>
                    <i className="fa-solid fa-cart-shopping"></i>
                </Link>
            </div>
            <div className='Background'>
                <div style={
                        show ? {
                            transform: "translateX(0)"
                        } : {
                            transform: "translateX(-100%)"
                        }
                    }
                    className='ProductList'>
                    <div className='ProductList__container'>
                        <h3 className='ProductList__title'>
                            Khám phá danh mục
                        </h3>

                        <div className='Product__index'>
                            {
                            DataIndex.map((individualSpan, index) => {
                                return (
                                    <span key={index}
                                        id={
                                            individualSpan.id
                                        }
                                        onClick={
                                            () => handleChange(individualSpan)
                                        }
                                        className='Product__item'>
                                        <div className='Product__img'>
                                            <img className='Product_icons'
                                                src={
                                                    individualSpan.imageUrl
                                                }
                                                alt=""/>
                                        </div>

                                        <div className={
                                            individualSpan.id === active ? active : 'deactive'
                                        }>
                                            {
                                            individualSpan.description
                                        }</div>
                                    </span>
                                )
                            })
                        } </div>


                    </div>
                </div>

                <div className='Sliders'>
                    <div className='Sliders__containers'>
                        <Slider {...settings}>
                            <div className='Slider__item'>
                                <img className='Slider__img'
                                    src={Banner1}
                                    alt=""/>
                            </div>
                            <div className='Slider__item'>
                                <img className='Slider__img'
                                    src={Banner2}
                                    alt=""/>
                            </div>
                            <div className='Slider__item'>
                                <img className='Slider__img'
                                    src={Banner3}
                                    alt=""/>
                            </div>
                        </Slider>
                    </div>

                    <div>
                        <div>
                            <div className='Products__index'>
                                <div className='categorys__btn'>
                                    <button onClick={handleShow}
                                        className='categorys__btns'>
                                        <div className='categorys__icon'>
                                            <i className="fa-solid fa-bars"></i>
                                        </div>
                                    </button>
                                    <div className='categorys__text'>Danh mục sản phẩm</div>
                                </div>


                                {
                                dataSlice.map((individualSpan, index) => {
                                    return (
                                        <span key={index}
                                            id={
                                                individualSpan.id
                                            }
                                            onClick={
                                                () => handleChange(individualSpan)
                                            }
                                            className='Product__item no_flex'>

                                            <div className='Product__img'>
                                                <button className='Product__btns'>
                                                    <img className='Product_icons'
                                                        src={
                                                            individualSpan.imageUrl
                                                        }
                                                        alt=""/>
                                                </button>
                                            </div>

                                            <div className={
                                                individualSpan.id === active ? active : 'deactive'
                                            }>
                                                {
                                                individualSpan.description
                                            }</div>
                                        </span>
                                    )
                                })
                            } </div>

                            <div className='Content'>
                                <Admin/>

                                <div className='FilterProducts'>
                                    {
                                    filteredProducts.length > 0 && (
                                        <div className='myFilterProducts margin80'>
                                            <div className='line'></div>
                                            <div className='myFilterProducts__title'>
                                                <h2 className='solid'>
                                                    {categorys}</h2>
                                            </div>
                                            <span className='myFiltureProducts__all'
                                                onClick={returntoAllProducts}>Click để xem tin mới đăng</span>
                                            <div style={
                                                {
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }
                                            }>
                                                <div className='myFilterProducts__box'>

                                                    {
                                                    filteredProducts.map(individualFilteredProduct => {
                                                        return (
                                                            <Link to={
                                                                `/products/${
                                                                    individualFilteredProduct.ID
                                                                }`
                                                            }>
                                                                <IndividualFilteredProduct key={
                                                                        individualFilteredProduct.ID
                                                                    }
                                                                    individualFilteredProduct={individualFilteredProduct}/>
                                                            </Link>
                                                        )
                                                        // console.log(individualFilteredProduct.ID)
                                                    })
                                                } </div>
                                            </div>
                                        </div>
                                    )
                                }

                                    {
                                    filteredProducts.length < 1 && (
                                        <> {
                                            products.length > 0 && (
                                                <>
                                                    <div className='myFilterProducts'>
                                                        <div className='line'></div>
                                                        <div className='myFilterProducts__title'>
                                                            <h2 className='solid'>Sản phẩm nổi bật</h2>
                                                        </div>
                                                        <div style={
                                                            {
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }
                                                        }>
                                                            <div className='myFilterProducts__box'>
                                                                <Products products={products}
                                                                    user={user}/>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='myFilterProducts'>
                                                        <div className='line'></div>
                                                        <div className='myFilterProducts__title'>
                                                            <h2 className='solid'>Sản phẩm mới nhất</h2>
                                                        </div>
                                                        <div style={
                                                            {
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }
                                                        }>
                                                            <div className='myFilterProducts__box'>
                                                                <Products products={products}
                                                                    user={user}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }

                                            {
                                            products.length < 1 && (
                                                <div className='myFilterProducts please-wait'>Loading ...</div>
                                            )
                                        } </>
                                    )
                                } </div>

                                <AdminStatic/>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Home
