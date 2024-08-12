import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Box, Button } from '@mui/material';
import { HEROKU_URL } from '../config';
import jwtDecode from 'jwt-decode';

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
        try {
            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken);  // Debugging: Check the structure of the token
            if (decodedToken && decodedToken.userId) {
                userIdFromToken = decodedToken.userId;
            } else {
                console.error('User ID not found in token');
            }
        } catch (e) {
            console.error('Failed to decode token:', e);
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
                console.log('Fetched products:', data);  // Debugging: Check the structure of the API response

                if (data && Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error('Unexpected data format:', data);
                }
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
                    userId: userIdFromToken,
                    user: "someUserName", // Replace with actual user data
                    cartItems: [] // Replace with actual cart items
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
