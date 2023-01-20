import React, {useState, useEffect} from 'react'
import {auth,storage, db} from '../config/Config'
import "../addProducts/addProducts.css"
import CurrencyInput from 'react-currency-input-field';
import firebase from 'firebase/compat/app'
import Header from '../Header/Header'
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


function AddProducts({user}) {
    const options = ['Đăng ký giao dịch', 'Đăng ký trực tiếp']
    const [active, setActive] = useState(options[0])
    const [title, setTitle] = useState('')
    const [number, setNumber] = useState('')
    const [content, setContent] = useState('')
    const [price, setPrice] = useState('');
    const [categorys, setCategorys] = useState('')
    const [image, setImage] = useState([])
    const [imageError, setImageError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [uploadError, setUploadError] = useState('')
    const [poster, setPoster] = useState('')
    const [quantity, setQuantity] = useState('')
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [address, setAddress] = useState('')
    
    const history = useHistory();
    // getting current user uid
    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUid();

    // state of totalProducts
   const [totalProducts, setTotalProducts]=useState(0);
   // getting cart products   
   useEffect(()=>{        
       auth.onAuthStateChanged(user=>{
           if(user){
               db.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                   const qty = snapshot.docs.length;
                   setTotalProducts(qty);
               })
           }
       })       
   },[])
    

    

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

    const validateValue = (value) => {
        const price = value === undefined ? 'undefined' : value;
        setPrice(price);


    };

    const handleProductImage = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setImage(selectedFile);
                setImageError('');
            } else {
                setImage(null);
                setImageError('Lựa chọn ảnh hợp lệ')
            }
        } else {
            console.log('please select your file');
        }
    }

    const handleAddProducts = (e) => {
        e.preventDefault()
        const uploadTask = storage.ref(`product-images/${
            image.name
        }`).put(image);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress);
        }, error => setUploadError(error.message), () => {
            storage.ref('product-images').child(image.name).getDownloadURL().then(url => {
                db.collection('Products').add({
                    title,
                    content,
                    categorys,
                    price: Number(price),
                    number,
                    url,
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                    poster: user,
                    quantity: Number(quantity),
                    size,
                    color,
                    address
                }).then(() => {
                    setSuccessMsg('Đăng tin thành công');
                    setTitle('');
                    setContent('');
                    setCategorys('');
                    setPrice('');
                    setNumber('');
                    setPoster('')
                    document.getElementById('file').value = '';
                    setImageError('');
                    setUploadError('');
                    setQuantity('');
                    setAddress('');
                    setColor('');
                    setSize('');
                    setTimeout(() => {
                        setSuccessMsg('');
                    }, 1000)
                    
                    toast.success(`${user} vừa đăng một tin mới`)
                }).catch(error => setUploadError(error.message));
            })
        })

        
    }

    console.log(price)


    const handleAddProductsNoPhone = (e) => {
        e.preventDefault()
        const uploadTask = storage.ref(`product-images/${
            image.name
        }`).put(image);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress);
        }, error => setUploadError(error.message), () => {
            storage.ref('product-images').child(image.name).getDownloadURL().then(url => {
                db.collection('Products').add({
                    title,
                    content,
                    categorys,
                    price: Number(price),
                    url,
                    quantity: Number(quantity),
                    size,
                    color,
                    address,
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                    poster: user
                }).then(() => {
                    setSuccessMsg('Đăng tin thành công');
                    setTitle('');
                    setContent('');
                    setCategorys('');
                    setPrice('');
                    setPoster('');
                    setQuantity('');
                    setAddress('');
                    setColor('');
                    setSize('');
                    document.getElementById('file').value = '';
                    setImageError('');
                    setUploadError('');
                    setTimeout(() => {
                        setSuccessMsg('');
                    }, 1000)
                    toast.success(`${user} vừa đăng một tin mới`)
                }).catch(error => setUploadError(error.message));
            })
        })

        
    }

    

    return (
        <>
            <ToastContainer />
            <Header user={user} totalProducts={totalProducts}/>

            <div className='addProducts__form'>
                <h1 className='addProducts-title__form'>Đăng tin</h1>
                <div className='addProducts__forms'>
                    <div className='addProducts__tabs'>
                        {
                        options.map((option, index) => {
                            return (
                                <button className='button__option'
                                    style={
                                        option === active ? {
                                            backgroundColor: '#495579',
                                            color: '#fff'
                                        } : {}
                                    }
                                    onClick={
                                        () => setActive(option)
                                    }
                                    key={index}>
                                    {option} </button>
                            )
                        })
                    }</div>

                    {
                    active === "Đăng ký giao dịch" ? (
                        <> {
                            successMsg && <>
                                <div className='success-msg'>
                                    {successMsg}</div>
                                <br></br>
                            </>
                        }
                            <form className='formGroup'
                                onSubmit={handleAddProducts}
                                >
                                <div className='flexs'>
                                    <label>Người đăng</label>
                                    <input value={user}
                                        onChange={
                                            (e) => setPoster(e.target.value)
                                        }
                                        type="text"

                                        className='form_control'/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Tên sản phẩm</label>
                                    <input value={title}
                                        onChange={
                                            (e) => setTitle(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Nội dung</label>
                                    <input value={content}
                                        onChange={
                                            (e) => setContent(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Số điện thoại</label>
                                    <input value={number}
                                        onChange={
                                            (e) => setNumber(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Giá</label>
                                    <CurrencyInput allowDecimals={false}
                                        onValueChange={validateValue}
                                        className="form_control"/>
                                </div>
                                <br/>

                                <div className='flexs'>
                                    <label>Số lượng</label>
                                    <input value={quantity}
                                        onChange={
                                            (e) => setQuantity(e.target.value)
                                        }
                                        type="number"
                                        className='form_control'/>
                                </div>


                                <br/>

                                <div className='flexs'>
                                    <label>Màu sắc</label>
                                    <input value={color}
                                        onChange={
                                            (e) => setColor(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>


                                <br/>

                                <div className='flexs'>
                                    <label>Kích thước</label>
                                    <input value={size}
                                        onChange={
                                            (e) => setSize(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>


                                <br/>

                                <div className='flexs'>
                                    <label>Địa chỉ</label>
                                    <input value={address}
                                        onChange={
                                            (e) => setAddress(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>
                                <br />
                                <div className='flexs'>
                                    <label>Danh mục sản phẩm</label>
                                    <select value={categorys}
                                        onChange={
                                            (e) => setCategorys(e.target.value)
                                        }
                                        className='form_control'>
                                        <option value="">Lựa chọn danh mục</option>
                                        <option>Bàn ghế</option>
                                        <option>Tủ, kệ gia đình</option>
                                        <option>Giường, chăn ga, gối nệm</option>
                                        <option>Bếp, lò, đồ điện nhà bếp</option>
                                        <option>Dụng cụ nhà bếp</option>
                                        <option>Quạt</option>
                                        <option>Cây cảnh, đồ trang trí</option>
                                        <option>Thiết bị vệ sinh, nhà tắm</option>
                                        <option>Nội thất, đồ gia dụng</option>
                                    </select>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Đăng ảnh</label>
                                    <input onChange={handleProductImage}
                                        accept="true"
                                        type="file"
                                        id='file'
                                        className='form_control'
                                        multiple/>
                                </div>

                            

                                {
                                imageError && <>
                                    <br/>
                                    <div className='error-msg'>
                                        {imageError}</div>
                                </>
                            }
                                <br/>
                                <div style={
                                    {
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }
                                }>
                                    <button type='submit' className='btn btn_success'>
                                        Đăng tin
                                    </button>
                                </div>
                            </form>
                            {
                            uploadError && <>
                                <br></br>
                                <div className='error-msg'>
                                    {uploadError}</div>
                            </>
                        } </>
                    ) : ""
                }

                    {
                    active === "Đăng ký trực tiếp" ? (
                        <> {
                            successMsg && <>
                                <div className='success-msg'>
                                    {successMsg}</div>
                                <br></br>
                            </>
                        }
                            <form className='formGroup'
                                onSubmit={handleAddProductsNoPhone}>
                                <div className='flexs'>
                                    <label>Người đăng</label>
                                    <input value={user}
                                        onChange={
                                            (e) => setPoster(e.target.value)
                                        }
                                        type="text"

                                        className='form_control'/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Tên sản phẩm</label>
                                    <input value={title}
                                        onChange={
                                            (e) => setTitle(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Nội dung</label>
                                    <input value={content}
                                        onChange={
                                            (e) => setContent(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>


                                <br/>

                                <div className='flexs'>
                                    <label>Số lượng</label>
                                    <input value={quantity}
                                        onChange={
                                            (e) => setQuantity(e.target.value)
                                        }
                                        type="number"
                                        className='form_control'/>
                                </div>


                                <br/>

                                <div className='flexs'>
                                    <label>Màu sắc</label>
                                    <input value={color}
                                        onChange={
                                            (e) => setColor(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>


                                <br/>

                                <div className='flexs'>
                                    <label>Kích thước</label>
                                    <input value={size}
                                        onChange={
                                            (e) => setSize(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>


                                <br/>

                                <div className='flexs'>
                                    <label>Địa chỉ</label>
                                    <input value={address}
                                        onChange={
                                            (e) => setAddress(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>


                                <br/>
                                <div className='flexs'>
                                    <label>Giá</label>
                                    <CurrencyInput allowDecimals={false}
                                        onValueChange={validateValue}
                                        className="form_control"/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Danh mục sản phẩm</label>
                                    <select value={categorys}
                                        onChange={
                                            (e) => setCategorys(e.target.value)
                                        }
                                        className='form_control'>
                                        <option value="">Lựa chọn danh mục</option>
                                        <option>Bàn ghế</option>
                                        <option>Tủ, kệ gia đình</option>
                                        <option>Giường, chăn ga, gối nệm</option>
                                        <option>Bếp, lò, đồ điện nhà bếp</option>
                                        <option>Dụng cụ nhà bếp</option>
                                        <option>Quạt</option>
                                        <option>Cây cảnh, đồ trang trí</option>
                                        <option>Thiết bị vệ sinh, nhà tắm</option>
                                        <option>Nội thất, đồ gia dụng</option>
                                    </select>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Đăng ảnh</label>
                                    <input onChange={handleProductImage}
                                        type="file"
                                        id='file'
                                        className='form_control'/>
                                </div>
                                
                                
                                {
                                imageError && <>
                                    <br/>
                                    <div className='error-msg'>
                                        {imageError}</div>
                                </>
                            }
                                <br/>
                                <div style={
                                    {
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }
                                }>
                                    <button type='submit' className='btn btn_success'>
                                        Đăng tin
                                    </button>
                                </div>
                            </form>
                            {
                            uploadError && <>
                                <br></br>
                                <div className='error-msg'>
                                    {uploadError}</div>
                            </>
                        } </>
                    ) : ""
                } </div>
            </div>
        </>

    )
}

export default AddProducts
