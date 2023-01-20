import React, {useState, useEffect} from 'react'
import Header from '../Header/Header';
import { auth, db} from '../config/Config';
import '../Search/Search.css'
import { useLocation } from 'react-router-dom';

const Search = ({user}) => {
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

    const [data, setData] = useState()

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    let query = useQuery()
    let search = query.get("name")
    console.log('Search: ', search)

    const searchData = () => {
       
    }
    
    console.log(data)

    useEffect(() => {
        searchData()
    }, [search])

    
    return (
        <>
            <Header user={user}
                totalProducts={totalProducts}/>
            <div>
              {data.title}
            </div>
        </>
    )
}

export default Search
