import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Box, Button } from '@mui/material';
import { HEROKU_URL } from '../config';
import jwt from 'jsonwebtoken';

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Decode the token and get the user ID
    const token = localStorage.getItem('token');
    let userIdFromToken;

    if (token) {
        const decodedToken = jwt.decode(token);
        if (decodedToken && decodedToken.userId) {
            userIdFromToken = decodedToken.userId;
        } else {
            console.error('Invalid token or user ID not found in token');
        }
    } else {
        console.error('No token found');
    }

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`${HEROKU_URL}/api/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    // Handle creating a new cart with selected item
    const handleCreateNewCart = async () => {
        if (!userIdFromToken) {
            console.error('Cannot add to cart without a valid user ID');
            return;
        }

        try {
            const response = await fetch(`${HEROKU_URL}/api/${userIdFromToken}/cart`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    userId: userIdFromToken, // Ensure this is the correct ID
                    user: "someUserName", // Replace with actual user data or remove if unnecessary
                    cartItems: [] // Replace with actual cart items or remove if unnecessary
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }
            const data = await response.json();
            setCart(data);
            navigate('/cart');

        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    if (products.length === 0) {
        return <Typography variant="h6">No products found</Typography>;
    }

    return (
        <>
            <div>
                {products.map((product) => (
                    <Card key={product.id} sx={{ margin: 2, maxWidth: 375, maxHeight: 400 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                            <Typography variant="body3" color="text.secondary">
                                ${product.price}
                            </Typography>
                            <Button variant="contained" color='success' onClick={handleCreateNewCart}>Add to Cart</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default ProductCard;
