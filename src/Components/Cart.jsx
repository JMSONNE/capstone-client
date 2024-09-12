import React, { useEffect, useState } from 'react';
import { Stack, Grid, Card, CardContent, Typography, CircularProgress, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement
import { HEROKU_URL } from '../config';

const Cart = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cart, setCart] = useState(null);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Check if the user is logged in by verifying the presence of a token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id);
            setUser(decodedToken.user);
        }
    }, []);

    // Fetch cart data
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`${HEROKU_URL}/api/user/${userId}/cart`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart');
                }
                const data = await response.json();
                setCart(data);
            } catch (error) {
                console.error('Error fetching cart:', error);
                setError(error.message);
            }
        };

        if (userId) {
            fetchCart();
        }
    }, [userId]);

    if (!cart) {
        return (
            <Box className='cartBox' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography>No items in cart.</Typography>
            </Box>
        );
    }

    // Function to remove items (cart)
    const handleDeleteItem = async (itemId) => {
        try {
            const response = await fetch(`${HEROKU_URL}/api/user/${userId}/cart/${itemId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            setCart(data);
            navigate('/');
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    if (error) {
        return (
            <Typography variant="h6" color="error" align="center">
                {error}
            </Typography>
        );
    }

    return (
        <Box className='cartItemBox'>
            <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
                Your Cart
            </Typography>
            <Grid container spacing={2} className='cartGrid'>
                {cart.cartItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card sx={{ padding: 2, backgroundColor: 'lightgray' }}>
                            <CardContent>
                                <Typography variant="h6">
                                    {item.product.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {item.product.description}
                                </Typography>
                                <Typography variant="body1">
                                    Quantity: {item.quantity}
                                </Typography>
                                <Typography variant="body1">
                                    Price: ${item.product.price}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginTop: 2 }}
                                    onClick={() => handleDeleteItem(item.id)}
                                >
                                    Remove
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => console.log('Proceed to checkout')}
                >
                    Checkout
                </Button>
            </Box>
        </Box>
    );
};

export default Cart;
