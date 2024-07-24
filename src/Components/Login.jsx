import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


const Login = () => {
    return (
        <>
            <Grid container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Box component="section" sx={{ p: 3, border: '1px solid grey', mt: 3, borderRadius: 6 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={500}
                    height={500}>

                    <Grid item xs={8}>
                        <Stack spacing={2} direction="column">
                            <TextField id="outlined-basic" label="Username" variant="outlined" />
                            <TextField id="outlined-basic" label="Password" variant="outlined" />
                            <Button variant="contained">Login</Button>
                        </Stack>
                    </Grid>
                </Box>
            </Grid >
        </>
    )
}

export default Login