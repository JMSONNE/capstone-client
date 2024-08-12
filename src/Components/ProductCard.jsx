import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Box, Button } from '@mui/material';
import { HEROKU_URL } from '../config';

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartContentTrue, setCartContentTrue] = useState(false)
    const [error, setError] = useState(null);
    const navigate = useNavigate();



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


    // Handle creating a new cart with selected item
    const handleCreateNewCart = async () => {
        try {
            const response = await fetch(`${HEROKU_URL}/api/user:id/cart`, {
                method: "POST",
                headers: { "content-type": "application/JSON" },
                body: JSON.stringify({
                    userId,
                    user,
                    cartItems
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }
            const data = await response.json();
            setCart(data);
            console.log(cart);
            navigate('/cart')

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
                            {/* <CardMedia
                            sx={{ height: 140 }}
                            image={product.image}
                            title="JavaScripts Coffee"
                        /> */}
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

