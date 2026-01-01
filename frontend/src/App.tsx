// src/App.tsx
import './styles/App.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Lists } from './components/lists'; 
import { UserContextProvider } from "./components/UserContext"; 
import useUserContext from "./components/UserContext";
import { Login } from './components/Login'; // Importiere deine Login-Komponente

const MainContent = () => {
  const { user } = useUserContext();

  if (!user) {
    return <Login />;
  }

  // WICHTIG: Zugriffspfad an das API-Schema anpassen
  // Schema: { UserResponse: { user: { username: "..." } } }
  const username = user.UserResponse?.user?.username || "Benutzer";

  return (
    <>
      <div className="welcome-message" style={{ textAlign: 'center', margin: '1rem' }}>
        <h3>Willkommen, {username}!</h3>
      </div>
      <Lists />
    </>
  );
};

function App() {
  return (
    <div className="app-container"> 
      <Header headerNote="" />
      
      <main className="main-content">
        {/* 2. Der Provider umschließt jetzt den gesamten wechselbaren Bereich */}
        <UserContextProvider>
          <MainContent />
        </UserContextProvider>
      </main>
      
      <Footer footerNote="" />
    </div>
  );
}

export default App;