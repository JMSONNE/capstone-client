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
                justifyContent: 'center',  // Center horizontally
                alignItems: 'flex-end',     // Align at the bottom
                paddingBottom: '1rem'       // Optional padding for spacing
            }}>
                <Typography variant='body1'>Copyright 2024</Typography>
            </Box>
        </footer>
    );
};
