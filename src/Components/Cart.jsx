import React from 'react'
import  {jwtDecode}  from 'jwt-decode'

const Cart = () => {

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    return (
        <div>Cart</div>
    )
}

export default Cart
