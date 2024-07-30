import { Token } from '@mui/icons-material';
import React from 'react'
import { useNavigate } from 'react-router';

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        console.log(Token)

        navigate('/login')
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}

export default Profile
