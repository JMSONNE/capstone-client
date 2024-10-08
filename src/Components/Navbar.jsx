import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom'
import '../index.css';
import { Margin } from '@mui/icons-material';
import { Icon } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

const Navbar = () => {

    // handles logic for login state
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Check if the user is logged in by verifying the presence of a token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // set up navigation for logo
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    }
    const handleLogoCartClick = () => {
        navigate('/cart');
    }
    const handleLogoProfileClick = () => {
        if (isLoggedIn) {
            navigate('/profile');
        } else {
            navigate('/login');
        }

    }
    const handleLogoRegisterClick = () => {
        navigate('/register')
    }



    return (
        <>
            <AppBar position='sticky' className='navbar'>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Toolbar>
                            <IconButton
                                size='large'
                                edge='start'
                                disableRipple='true'
                                onClick={handleLogoClick}
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="Javascripts Coffee Logo" className='logo' />
                            </IconButton>
                            <IconButton disableRipple='true' onClick={handleLogoClick}>
                                <Typography variant='h6' className='companyNameBar' mt={3} noWrap='true' sx={{ color: 'white' }}>
                                    JavaScripts Coffee Co.
                                </Typography>
                            </IconButton>
                        </Toolbar>
                    </Grid>
                    <Grid item xs={0} sm={0} md={6} lg={6}>
                        <Toolbar sx={{ justifyContent: 'end', alignContent: 'end' }}>
                            <IconButton
                                size='medium'
                                edge='start'
                                disableRipple='true'
                                onClick={handleLogoProfileClick}
                            >
                                {isLoggedIn ? <Avatar src="/broken-image.jpg" /> : <Typography variant='h5'
                                    sx={{ color: 'white', fontWeight: 'strong', size: '40%' }}>
                                    LOGIN</Typography>}

                            </IconButton>
                            {isLoggedIn ? null : <IconButton
                                size='medium'
                                edge='start'
                                disableRipple='true'
                                onClick={handleLogoRegisterClick}
                            >
                                <Typography variant='h5'
                                    sx={{ color: 'white', fontWeight: 'strong', size: '40%' }}>
                                    REGISTER</Typography>

                            </IconButton>}
                            <IconButton
                                size='medium'
                                edge='end'
                                onClick={handleLogoCartClick}
                            >
                                <ShoppingCartIcon sx={{ color: 'white' }} fontSize='large' />
                            </IconButton>

                        </Toolbar>
                    </Grid>
                </Grid>
            </AppBar >
        </>
    )
}

export default Navbar
