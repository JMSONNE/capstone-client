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

            {/* Pick your javascript banner */}
            <Box sx={{
                width: '100%', height: '10rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black',
                backgroundImage: 'url(https://assets.bonappetit.com/photos/5c366551f212512d0e6cefd0/16:9/w_2560%2Cc_limit/Basically-Coffee-0219-03.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'white', textShadow: '1px 1px 0px black' }}>
                    PICK YOUR JAVASCRIPT
                </Typography>
            </Box>

            {/* Product card list */}
            <ProductCard />

            {/* How it works banner */}
            <Box sx={{
                width: '100%', height: '10rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid black',
                backgroundImage: 'url(https://assets.bonappetit.com/photos/5c366551f212512d0e6cefd0/16:9/w_2560%2Cc_limit/Basically-Coffee-0219-03.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'white', textShadow: '1px 1px 0px black' }}>
                    HOW IT WORKS
                </Typography>
            </Box>

            {/* How it works text */}
            <Box sx={{
                width: '90%', height: '35rem', textAlign: 'center', border: '2px solid black', borderRadius: '5px'
            }}>
                <Typography variant='p'>
                    Each tier is a monthly subscription service of monthly curated items hand picked and shipped stright to your
                    door.
                </Typography>
            </Box>


        </>
    )
}

export default Home
