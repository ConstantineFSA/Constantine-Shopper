import "../styles/Cart.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAllProducts, selectProducts } from "../products/productsSlice";
import { selectCart, fetchCart, addToCart, removeFromCart, editCart} from "./cartSlice";
import { selectMe } from "../auth/authSlice";
import Payment from "./Payment";
import Modal from "./Modal";

const Cart = () => {    
    const [isOpen, setIsOpen] = useState(false);
    const [productRemoved, setProductRemoved] = useState(false)
    const [edited, setEdited] = useState(false)
    const { id } = useParams()
    const user = useSelector(selectMe)
    const products = useSelector(selectProducts)
    const cart = useSelector(selectCart)
    const { cartInfo, orderItems } = cart
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchCart(user.id))
        dispatch(fetchAllProducts())
    }, [dispatch, user])

    useEffect(() => {
        dispatch(fetchCart(user.id))
        setProductRemoved(false)
        setEdited(false)
    }, [edited, productRemoved])

    const handleEdit = (event, productId) => {
        const quantity = event.target.value
        const itemToEdit = {
            id,
            quantity,
            productId,
            orderId: cartInfo.id,
        }

        setEdited(true)
        dispatch(editCart(itemToEdit));
    };

    const handleRemoveProduct = (item) => {
        const { product } = item
        const orderToRemove = {
            id,
            product
        }
        setProductRemoved(true)
        dispatch(removeFromCart(orderToRemove))
    }
    
    const checkout = (order) => {
        const itemsToCheckout = []
        let i = 0
        for (let j = 0; j < products.length; j++) {
            if(i > order.length-1) break
            if(order[i].productId === products[j].id) {
                itemsToCheckout.push({
                    product: products[j], 
                    quantity: order[i].quantity
                })
                i++
                j=-1
                continue
            }
        }
        return itemsToCheckout
    }
    const itemsToCheckout = checkout(orderItems)

  return (
    <div>
      <h1 className="cart-header">{user.username}'s Cart</h1>
      <div className="cartBody">
        {itemsToCheckout.map((item) => {
          return (
            <div key={item.product.id} className="container">
              <div className="cartContainer">
                <img src={item.product.imgUrl} className="productImg" />
                <div className="cartInfo">
                  <a>
                    {`(${item.quantity})`} {item.product.name}
                  </a>
                  <p>{`Price: $${item.product.price}.00`}</p>
                </div>
              </div>
              <div className="ui">
              <input
                  type="number"
                  min='1'
                  value={item.quantity}
                  onChange={(event) => handleEdit(event, item.product.id)}
                />
                <button onClick={() => handleRemoveProduct(item)}>Remove Product</button>
              </div>
            </div>
          );
        })}
      </div>
        {!cartInfo.total ?  
        <h1 className="total-price">Your Cart is Empty!</h1> 
        :
        <>
        <h1 className="total-price">Total: ${cartInfo.total}</h1>
        <button onClick={() => setIsOpen(true)}>PROCEED TO CHECKOUT</button>
          {isOpen && <Modal setIsOpen={setIsOpen} />}
        </>
        }
    </div>
  );
};

export default Cart;
