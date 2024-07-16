import React from 'react'
import { useEffect } from 'react'
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

    // set up navigation for logo
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    }
    const handleLogoCartClick = () => {
        navigate('/cart');
    }
    const handleLogoProfileClick = () => {
        navigate('/');
    }

    return (
        <>
            <AppBar position='static' color='success'>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item xs={10}>
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
                                <Typography variant='h6' className='companyNameBar' mt={3} noWrap="false" sx={{ color: 'white' }}>
                                    JavaScripts Coffee Co.
                                </Typography>
                            </IconButton>
                        </Toolbar>
                    </Grid>
                    <Grid item xs={2} alignItems="center">
                        <Toolbar sx={{ justifyContent: "space-evenly" }}>
                            <IconButton
                                size='medium'
                                edge='start'
                                onClick={handleLogoProfileClick}
                            >
                                <Avatar src="/broken-image.jpg" />
                            </IconButton>
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
