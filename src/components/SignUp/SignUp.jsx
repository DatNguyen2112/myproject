import React, {useState} from 'react'
import {auth, db} from '../config/Config'
import '../SignUp/SignUp.css'
import Logo2 from '../../images/Logo2.jpg'
import {Link} from 'react-router-dom'
import firebase from 'firebase/compat/app'
function SignUp(props) {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signup = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            db.collection('signup').doc(cred.user.uid).set({Name: name, Email: email, Password: password, time: firebase.firestore.FieldValue.serverTimestamp()}).then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                
                props.history.push('/signIn');
            }).catch(err => setError(err.message));
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

                    <div className="Header__signIn">Đăng Ký</div>
                </div>
            </div>
            <div className='SignIn'>
                <div className='SignIn__container'>
                    <div className='SignIn__form'>
                        <div className='SignIn__forms'>
                            <div className='SignIn__title'>Đăng ký</div>
                            {
                            error && <span className='error-msg'>
                                {error}</span>
                        }
                            <form className='Form'
                                onSubmit={signup}>
                                <input value={name}
                                    onChange={
                                        (e) => setName(e.target.value)
                                    }
                                    className='User'
                                    placeholder='Tên đăng nhập'
                                    type="text"/>
                                <input value={email}
                                    onChange={
                                        (e) => setEmail(e.target.value)
                                    }
                                    className='Email'
                                    placeholder='Email/Số điện thoại/Tên đăng nhập'
                                    type="text"/>
                                <input value={password}
                                    onChange={
                                        (e) => setPassword(e.target.value)
                                    }
                                    className='Password'
                                    placeholder='Mật khẩu'
                                    type="password"/>
                                <button type='submit' className='Submit'>Đăng Ký</button>
                            </form>
                            <div className='SignIn__shortcut'>
                                Đã có tài khoản?
                                <span>
                                    <Link className='Link__shortcut' to="/signIn">Đăng nhập</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
