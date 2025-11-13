import '../styles/Header.css'
import logo from '../assets/road_runner.svg'

export interface HaederNoteProps {
  headerNote: string
}

export function Header ({headerNote}: HaederNoteProps){
    return (<header className="header">
        <img src={logo} className="logo" alt="Road Runner Logo" />
        <h1 className="title">Road Runner</h1>
        {(headerNote !== "") && <span className="header-note">{headerNote}</span>}
    </header>)
    
}