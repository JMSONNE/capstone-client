import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { HEROKU_URL } from './config';

const Register = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [initialState, setInitialState] = useState({
        email: '',
        password: '',
        username: '',
        name: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInitialState({
            ...initialState,
            [name]: value
        });
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${REACT_APP_HEROKU_URL}/api/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: initialState.email,
                    password: initialState.password,
                    username: initialState.username,
                    name: initialState.name
                })
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            const result = await response.json();
            console.log(result);

            setLoading(false);
            navigate('/login'); // Navigate to login page after successful registration
        } catch (error) {
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
                height={500}
            >
                <Grid item xs={8}>
                    <form onSubmit={handleRegister}>
                        <Stack spacing={2} direction="column">
                            <TextField
                                id="outlined-email"
                                label="Email"
                                variant="outlined"
                                name="email"
                                type="email"
                                value={initialState.email}
                                onChange={handleInputChange}
                                required
                            />
                            <TextField
                                id="outlined-username"
                                label="Username"
                                variant="outlined"
                                name="username"
                                value={initialState.username}
                                onChange={handleInputChange}
                                required
                            />
                            <TextField
                                id="outlined-name"
                                label="Name"
                                variant="outlined"
                                name="name"
                                value={initialState.name}
                                onChange={handleInputChange}
                                required
                            />
                            <TextField
                                id="outlined-password"
                                label="Password"
                                variant="outlined"
                                name="password"
                                type="password"
                                value={initialState.password}
                                onChange={handleInputChange}
                                required
                            />
                            <Button variant="contained" type='submit' disabled={loading}>
                                {loading ? 'Registering...' : 'Register'}
                            </Button>
                        </Stack>
                    </form>
                </Grid>
            </Box>
        </Grid>
    );
};

export default Register;
