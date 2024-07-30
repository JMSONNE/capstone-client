import React from 'react'
import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';

const Home = () => {

    const [products, setProducts] = useState([]);

    // Fetches products from API then adds them to an object
    const getProducts = () => {

        getUniqueProducts = (products) => {
            const uniqueProducts = [];
            const productIds = new Set();

            for (const product of products) {
                if (!productIds.has(product.id)) {
                    uniqueProducts.push(product);
                    productIds.add(product.id)
                }
            }
        }
        return uniqueProducts
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://localhost:5000/api/products', {
                    method: "GET"
                }
                )
                const data = await response.json();
                const uniqueProducts = getProducts(data);
                setProducts(uniqueProducts);
            } catch (error) {
                console.error('Error fetching products', error)
            }
        };

        fetchProducts();
    }, []);


    return (
        <>

            <div>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>

        </>
    )
}

export default Home
