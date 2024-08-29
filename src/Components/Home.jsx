import React from 'react'
import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Footer } from './Footer';

const Home = () => {



    return (
        <>
            <section className='home-page'>
                {/* Pick your javascript banner */}
                <Box className='homeBanner'>
                    <Typography className='bodyText' variant="h2" sx={{ fontWeight: 'bold' }}>
                        PICK YOUR JAVASCRIPT
                    </Typography>
                </Box>

                {/* Product card list */}
                <ProductCard />

                {/* How it works banner */}
                <Box className='homeBanner'>
                    <Typography className='bodyText' variant="h2" sx={{ fontWeight: 'bold' }}>
                        HOW IT WORKS
                    </Typography>
                </Box>

                {/* How it works text */}
                <Box className='homeBanner' sx={{
                    width: '90%', height: '30rem', textAlign: 'center', border: '2px solid black', borderRadius: '5px', margin: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Typography className='bodyText' variant='p' sx={{ fontSize: '36px' }}>
                        Each tier is a monthly subscription service of curated items hand picked and shipped straight to your
                        door. Just create an account, log in, and get a new JavaScript every month!
                    </Typography>
                </Box>

            </section>
        </>
    )
}

export default Home
