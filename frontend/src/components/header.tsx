// src/components/header.tsx
import { Link } from 'react-router-dom'; // Import Link
import '../styles/Header.css'
import logo from '../assets/road_runner.svg'
import { Logout } from './Logout';

export interface HaederNoteProps {
  headerNote: string
}

export function Header ({headerNote}: HaederNoteProps){
    return (
    <header className="header">
        <Link to="/">
            <img src={logo} className="logo" alt="Road Runner Logo" />
        </Link>
        
        <h1 className="title">Road Runner</h1>
        
        <nav style={{ marginLeft: 'auto', display: 'flex', gap: '15px', alignItems: 'center' }}>
           
            <Link to="/locations" style={{ color: 'white', textDecoration: 'none' }}>Liste</Link>
            <Link to="/locations/add" style={{ color: 'var(--fa-lime-green)', textDecoration: 'none', fontWeight:'bold' }}>+ Neu</Link>
            <Link to="/locations/map" style={{ color: 'white', textDecoration: 'none' }}>Karte</Link>
            <Link to="/about" style={{ color: '#ccc', textDecoration: 'none', fontSize:'0.9em' }}>About</Link>
            <Logout />
        </nav>

        {(headerNote !== "") && <span className="header-note" style={{marginLeft: '15px'}}>{headerNote}</span>}
    </header>
    )
}