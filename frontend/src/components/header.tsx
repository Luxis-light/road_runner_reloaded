import { Link } from 'react-router-dom'; 
import '../styles/Header.css'
import logo from '../assets/road_runner.svg'
import useUserContext from './UserContext';
import { Logout } from './Logout';

// --- Redux Imports ---
import { useSelector } from 'react-redux';
import { type RootState } from '../store/store';

export interface HaederNoteProps {
  headerNote: string
}

export function Header ({headerNote}: HaederNoteProps){
    const {user} = useUserContext();

    
    const currentUsername = user?.UserResponse?.user?.username;
    const myReviewBasket = useSelector((state: RootState) => 
      currentUsername ? state.review.userBaskets[currentUsername] || [] : []
    );
    const basketCount = myReviewBasket.length;


    const titleText = user ? `Willkommen ${user.UserResponse.user?.username} auf Road Runner` : "Road Runner";

    return (
    <header className="header">
        <Link to="/">
            <img src={logo} className="logo" alt="Road Runner Logo" />
        </Link>
        
        <h1 className="title">{titleText}</h1>
        
        <nav style={{ marginLeft: 'auto', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Link to="/locations" style={{ color: 'white', textDecoration: 'none' }}>Liste</Link>
            
            {user && (
                <>
                    <Link to="/locations/add" style={{ color: 'var(--fa-lime-green)', textDecoration: 'none', fontWeight:'bold' }}>+ Neu</Link>
                   
                    <Link to="/locations/basket" style={{ color: '#f39c12', textDecoration: 'none', fontWeight: 'bold' }}>
                        Review Basket {basketCount > 0 && `(${basketCount})`}
                    </Link>
                </>
            )}
            
            <Link to="/locations/map" style={{ color: 'white', textDecoration: 'none' }}>Karte</Link>
            <Link to="/about" style={{ color: '#ccc', textDecoration: 'none', fontSize:'0.9em' }}>About</Link>
            <Logout />
        </nav>

        {(headerNote !== "") && <span className="header-note" style={{marginLeft: '15px'}}>{headerNote}</span>}
    </header>
    )
}