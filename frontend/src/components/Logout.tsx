import React, { useState } from 'react';
import useUserContext from './UserContext';

export const Logout = () => {
    const { user, logout } = useUserContext();
    const [isHover, setIsHover] = useState(false);

    if (!user) return null;

    const buttonStyle: React.CSSProperties = {
        background: isHover ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '12px',
        color: 'white',
        padding: '4px 12px',
        cursor: 'pointer',
        fontSize: '0.9em',
        transition: 'all 0.2s ease',
        marginLeft: '5px',
        backdropFilter: 'blur(4px)'
    };

    return (
        <button
            onClick={logout}
            style={buttonStyle}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            title="Abmelden"
        >
            Logout ↪
        </button>
    );
};