import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Box, Button } from '@mui/material';
import { HEROKU_URL } from '../config';
import Grid from '@mui/material/Grid';
import { jwtDecode } from "jwt-decode";
import GradientCircularProgress from '../assets/GradientCircularProgress';

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartContentTrue, setCartContentTrue] = useState(false)
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(0);
    const [user, setUser] = useState();
    const navigate = useNavigate();

    // checks if the user is logged in and sets state
    useEffect(() => {
        const token = localStorage.getItem('token');

        setIsLoggedIn(!!token)

    }, []);

    // Decodes token from local storage and sets the user id
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token == null) {
            setUserId(null)
        } else {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id);
            setUser(decodedToken.user);
        }

    }, [])

    // Fetches products from database
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`${HEROKU_URL}/api/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                console.log('Fetched products:', data);  // Debugging: Check fetched data
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

    const handleAddToCart = async (productId) => {
        try {
            if (isLoggedIn) {
                const response = await fetch(`${HEROKU_URL}/api/cartcreate`, {  // Use the correct backend route
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        userId: userId,         // Pass the logged-in user's ID
                        productId: productId,   // Pass the selected product ID
                        quantity: 1,            // Default quantity of 1 (you can adjust this)
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to add product to cart');
                }

                const data = await response.json();
                console.log('Successfully added product to cart:', data);
                navigate('/cart');
            } else {
                navigate('/login');
                alert('You need to have an active account to purchase any JavaScript subscriptions!');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };



    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <GradientCircularProgress />
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
                <Grid className='productGrid' container spacing={8}>
                    {products.map((product) => (
                        <Grid item className='product' xs={12} sm={12} md={4} lg={4} sx={{ textAlign: 'center' }}>
                            <Card className='productCard' key={product.id} sx={{
                                margin: 2,
                                padding: 2,
                                maxWidth: '15rem',
                                maxHeight: '35rem',
                                minHeight: '20rem',
                                border: '1px solid black',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
                                }
                            }}>
                                <CardContent>
                                    {/* <CardMedia
                            sx={{ height: 140 }}
                            image={product.image}
                            title="JavaScripts Coffee"
                        /> */}
                                    <Typography variant="h4" component="h4"
                                        sx={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold', padding: '10px', fontSize: '1.7rem' }}>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                                        {product.description}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        ${product.price}/Month
                                    </Typography>
                                    <Button variant="contained" color='success' onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default ProductCard;

