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

const Navbar = () => {

    // set up navigation for logo
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    }

    return (
        <>
            <AppBar position='static' color='success'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        disableRipple='true'
                        onClick={handleLogoClick}
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="Javascripts Coffee Logo" className='logo' />
                    </IconButton>
                    <Typography variant='h6' className='companyNameBar' mt={3}>
                        JavaScripts Coffee Co.
                    </Typography>
                </Toolbar>
            </AppBar >
        </>
    )
}

export default Navbar
