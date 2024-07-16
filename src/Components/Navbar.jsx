import React from 'react'
import { useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    // set up navigation
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
                        <img src="" alt="Javascripts Coffee Logo" className='logo' />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
