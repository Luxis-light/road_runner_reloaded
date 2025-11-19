// src/App.tsx

import './styles/App.css'; // WICHTIG: Importiere die App.css
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Lists } from './components/lists'; 

// import { Login } from './components/Login';

function App() {
  return (
    // 1. Dieser Container steuert das gesamte Seitenlayout
    <div className="app-container"> 
      
      <Header headerNote="" />
      
      {/* 2. Ein <main>-Tag für deinen Inhalt. 
             Dieses Element wird "wachsen". */}
      <main className="main-content">
        
        {}
        <Lists/>
        {/* <Login /> */}
        
      </main>
      
      <Footer footerNote="" />
    
    </div>
  );
}

export default App;