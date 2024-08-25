import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

export const Footer = () => {
    return (
        <footer>
            <Box className='footer' sx={{width: '100%', height: '10rem'
            }}>
                <Typography variant='p'>Hello World</Typography>
            </Box>
        </footer>
    );
};
