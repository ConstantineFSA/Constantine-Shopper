import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchAllProducts, selectProducts } from '../products/productsSlice'
import { selectCart, fetchCart } from './cartSlice'

const Cart = () => {    
    const cart = useSelector(selectCart)
    console.log(cart)
    const { id } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCart(id))
    }, [])

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.orderData && (
                <>
                    <p>Order Items: {cart.orderData.orderItems}</p>
                    <p>Total: ${cart.orderData.total.toFixed(2)}</p>
                </>
            )}
        </div>
    )
}

export default Cart

