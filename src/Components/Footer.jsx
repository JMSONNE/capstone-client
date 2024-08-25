import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

export const Footer = () => {
    return (
        <footer>
            <Box sx={{width: '100%', height: '10rem',
                backgroundColor: 'darkgray',
                border: '1px solid black'
            }}>
                <Typography variant='h5'>Hello World</Typography>
            </Box>
        </footer>
    );
};
