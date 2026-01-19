import React, { useState } from 'react';
import useUserContext from './UserContext';

export const Logout = () => {
    const { user, logout } = useUserContext();
    const [isHover, setIsHover] = useState(false);

    if (!user) return null;

    const buttonStyle: React.CSSProperties = {
        background: 'transparent', 
        border: 'none',            
        padding: '0',                
        color: isHover ? '#ff7777' : '#ff4444',
        cursor: 'pointer',
        fontSize: '1rem',            
        fontWeight: 500,            
        fontFamily: 'inherit',  
        textDecoration: 'none',      
        display: 'flex',              
        alignItems: 'center',
        transition: 'color 0.2s ease' 
    };

    return (
        <button
            onClick={logout}
            style={buttonStyle}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            title="Abmelden"
        >
            Logout
        </button>
    );
};