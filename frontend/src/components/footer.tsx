import "../styles/Footer.css";


export interface FooterNoteProps {
  footerNote: string
}

export function Footer ({footerNote}: FooterNoteProps) {
  return (
    <div className="footer"> 
      {(footerNote === "") ? <span>Made with ❤️ by Luca Dancas & Kacper Purtak    </span> : <span>{footerNote}</span>}
      < a href=""> About us</a>
      < a href=""> Legal Notice</a>
    </div>
  );
}