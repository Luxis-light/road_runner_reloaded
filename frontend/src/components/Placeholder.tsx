// src/components/Placeholder.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Placeholder.css';
import logo from '../assets/road_runner.svg';

export const About = () => (
    <div className="about-container">
        <img src={logo} alt="Road Runner Logo" className="about-logo-large" />
        <h2 className="about-title">
            Impressum / About
        </h2>
        <p className="about-text">
            Willkommen bei deiner modernen Plattform für Straßenmeldungen.
            Einfach, schnell und transparent.
        </p>
        <div className="about-card-grid">
            <div className="about-info-pill">Development: Luca Dancas</div>
            <div className="about-info-pill">Development: Kacper Purtak</div>
        </div>
        <p className="about-footer">
            Vielen Dank für die Nutzung unserer App!
        </p>
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