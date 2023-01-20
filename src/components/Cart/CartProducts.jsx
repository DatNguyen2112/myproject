import React from 'react'
import InvidiualCartProducts from './InvidiualCartProducts'

export const CartProducts = ({cartProducts}) => {
    return cartProducts.map((cartProduct) => {
        return <InvidiualCartProducts key={cartProduct.ID} cartProduct={cartProduct} />
    })
}
