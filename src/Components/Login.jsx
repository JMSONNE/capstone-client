import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialState, setInitialState] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInitialState({
            ...initialState,
            [name]: value
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: initialState.email,
                    password: initialState.password
                })
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const result = await response.json();
            console.log(result);

            if (result.accessToken) {
                setIsLoggedIn(true);
                setLoading(false);
                localStorage.setItem('token', result.accessToken);
                navigate('/');
            } else {
                throw new Error('Failed to login');
            }
        } catch (error) {
            setIsLoggedIn(false);
            localStorage.removeItem('token');
            setLoading(false);
            console.error(error);
        }
    };

    return (
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
                    <form onSubmit={handleLogin}>
                        <Stack spacing={2} direction="column">
                            <TextField
                                id="outlined-email"
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={initialState.email}
                                onChange={handleInputChange}
                            />
                            <TextField
                                id="outlined-password"
                                label="Password"
                                variant="outlined"
                                name="password"
                                type="password"
                                value={initialState.password}
                                onChange={handleInputChange}
                            />
                            <Button variant="contained" type='submit' disabled={loading}>Login</Button>
                        </Stack>
                    </form>
                </Grid>
            </Box>
        </Grid>
    );
};

export default Login;

