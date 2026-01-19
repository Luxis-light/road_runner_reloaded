import "../styles/Footer.css";
import {Link} from 'react-router-dom';


export interface FooterNoteProps {
  footerNote: string
}

export function Footer ({footerNote}: FooterNoteProps) {
  return (
    <div className="footer"> 
      {(footerNote === "") ? <span>Made with ❤️ by Luca Dancas & Kacper Purtak    </span> : <span>{footerNote}</span>}
      <div className="footer-links">
          <Link to="/about" style={{ marginLeft: '15px'}}>About us</Link>
          <Link to="/about" style={{ marginLeft: '15px'}}>Legal Notice</Link>
      </div>
    </div>
  );
}