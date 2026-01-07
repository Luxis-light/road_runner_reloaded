// src/components/Placeholder.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const About = () => (
    <div style={{ padding: '20px', color: 'white' }}>
        <h2>Impressum / About</h2>
        <p>Erstellt vom Road Runner Team.</p>
    </div>
);

export const ErrorPage = () => (
    <div className="error-state">
        <h2>404 - Seite nicht gefunden</h2>
        <Link to="/" style={{ color: 'white' }}>Zurück zur Startseite</Link>
    </div>
);

export const LocationDetail = () => {
    const { id } = useParams();
    return (
        <div style={{ padding: '20px', color: 'white' }}>
            <h2>Detailansicht für ID: {id}</h2>
            <p>Hier kommen später alle Details hin.</p>
            <Link to="/locations" style={{ color: '#90ee90' }}>← Zurück zur Liste</Link>
        </div>
    );
};