import './App.css';
import {Switch, BrowserRouter as Router, Route, useParams} from 'react-router-dom'
import Home from './components/Home/Home';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Footer from './components/Footer/Footer';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Cart from './components/Cart/Cart';
import AddProducts from './components/addProducts/addProducts';
import {auth, db} from './components/config/Config'
import {useEffect, useState} from 'react';
import Search from './components/Search/Search';
import Profile from './components/Profile/Profile';

function App() {
    const [names, setNames] = useState(null)
    

    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('signup').doc(user.uid).get().then(snapshot => {
                    setNames(snapshot.data().Name)
                })
            } else {
                setNames(null)
            }
        })
    }, [names])

    
    return (
        <div className="App">
            <Router>                
                <Switch>
                    <Route exact path='/'
                        component={() => <Home user={names} />}/>
                    <Route exact path='/products/:productID'
                        component={() => <ProductDetail user={names} />}/>
                    <Route exact path='/signIn'
                        component={SignIn}/>
                    <Route exact path='/signUp'
                        component={SignUp}/>
                    <Route exact path='/Cart'
                        component={() => <Cart user={names} />}/>
                    <Route exact path='/addProducts'
                        component={() => <AddProducts user={names} />}/>
                    <Route exact path='/Profile/:ProfileID'
                        component={() => <Profile user={names} />}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
