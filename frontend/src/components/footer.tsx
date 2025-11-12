import "../styles/Footer.scss";


export interface FooterNoteProps {
  footerNote: string
}

export function Footer ({footerNote}: FooterNoteProps) {
  return (
    <div className="footer"> 
      {(footerNote === "") ? <span>Made with ❤️ by Luca Dancas & Kacper Purtak</span> : <span>{footerNote}</span>}
    </div>
  );
}