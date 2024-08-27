import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography, CircularProgress, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Make sure jwtDecode is imported
import { HEROKU_URL } from '../config';

const Cart = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cart, setCart] = useState(null);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // Check if the user is logged in by verifying the presence of a token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // Decode token from local storage and set the user id
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" align="center">
                {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
                Your Cart
            </Typography>
            <Grid container spacing={2}>
                {cart.cartItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card sx={{ padding: 2 }}>
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
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Total: ${(item.product.price * item.quantity).toFixed(2)}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ marginTop: 2 }}
                                    onClick={() => console.log(`Remove item ${item.id} from cart`)}
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
