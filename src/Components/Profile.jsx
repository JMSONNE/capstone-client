import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

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
        navigate('/login');
        window.location.reload()
    };

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default Profile;
