import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';


export const Footer = () => {
    return (
        <footer>
            <Box sx={{
                width: '100%',
                height: '10rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}>
                <Typography variant='body1'>©Copyright 2024</Typography>
            </Box>
        </footer>
    );
};
