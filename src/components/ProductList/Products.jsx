import React from 'react'
import { IndividualProduct } from './InvidualProduct'
import { Link } from 'react-router-dom';


export const Products = ({products,addToCart}) => {

    console.log(products);
    
    return products.map((individualProduct)=>(
        <Link to={`/products/${individualProduct.ID}`}>
            <IndividualProduct key = {individualProduct.ID} individualProduct={individualProduct}
                addToCart={addToCart}
            />
        </Link>
    ))
}