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
                <Box className='homeBanner' sx={{
                    width: '100%', height: '10rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black'
                }}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'white', textShadow: '1px 1px 0px black' }}>
                        PICK YOUR JAVASCRIPT
                    </Typography>
                </Box>

                {/* Product card list */}
                <ProductCard />

                {/* How it works banner */}
                <Box className='homeBanner' sx={{
                    width: '100%', height: '30rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black'}}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'white', textShadow: '1px 1px 0px black' }}>
                        HOW IT WORKS
                    </Typography>
                </Box>

                {/* How it works text */}
                <Box sx={{
                    width: '90%', height: '30rem', textAlign: 'center', border: '2px solid black', borderRadius: '5px', margin: '2rem', backgroundColor: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Typography variant='p' sx={{ fontSize: '36px', fontFamily: 'roboto' }}>
                        Each tier is a monthly subscription service of monthly curated items hand picked and shipped straight to your
                        door.
                    </Typography>
                </Box>

            </section>
        </>
    )
}

export default Home
