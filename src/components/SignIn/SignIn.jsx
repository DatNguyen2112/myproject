import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../config/Config'
import Logo2 from '../../images/Logo2.jpg'
import "../SignIn/SignIn.css"
import firebase from 'firebase/compat/app'
function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [time, setTime] = useState('')
    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password, time).then(() => {
            setEmail('');
            setPassword('');
            setTime(firebase.firestore.FieldValue.serverTimestamp());
            setError('');
            props.history.push('/');
        }).catch(err => setError(err.message));
    }

    return (
        <>
            <div className="flex">
                <div className="Headers__containers noFlex">
                    <Link to="/">
                        <div className='Headers__logo'>
                            <img className='Headers__img'
                                src={Logo2}
                                alt="Logo"/>
                        </div>
                    </Link>

                    <div className="Header__signIn">Đăng nhập</div>
                </div>
            </div>
            <div className='SignIn'>
                <div className='SignIn__container'>
                    <div className='SignIn__form'>
                        <div className='SignIn__forms'>
                            <div className='SignIn__title'>Đăng nhập</div>
                            {
                            error && <span className='error-msg'>
                                {error}</span>
                        }
                            <form className='Form'
                                onSubmit={login}>
                                <input onChange={
                                        (e) => setEmail(e.target.value)
                                    }
                                    value={email}
                                    className='Email'
                                    placeholder='Email/Số điện thoại/Tên đăng nhập'
                                    type="text"/>
                                <input onChange={
                                        (e) => setPassword(e.target.value)
                                    }
                                    value={password}
                                    className='Password'
                                    placeholder='Mật khẩu'
                                    type="password"/>
                                <button className='Submit'>Đăng nhập</button>
                            </form>
                            <div className='SignIn__shortcut'>
                                Bạn mới biết đến Shoppe?
                                <span>
                                    <Link className='Link__shortcut' to="/signUp">Đăng ký</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn
