import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Grid, Button } from '@mui/material';

const Profile = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        setIsLoggedIn(!!token)

    }, []);





    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
        window.location.reload()
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>

                <Button variant='contained' color='success' onClick={handleLogout}>Logout</Button>

            </Box>
        </>
    );
};

export default Profile;
