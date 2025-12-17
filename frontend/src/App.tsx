// src/App.tsx
import './styles/App.css'; // WICHTIG: Importiere die App.css
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Lists } from './components/lists'; 
import useUserContext, { UserContext, UserContextProvider } from "./components/UserContext";
import { useContext } from 'react';

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
        <UserContextProvider>
          <Page />
        </UserContextProvider>
        
      </main>
      
      <Footer footerNote="" />
    
    </div>
    
  );
}

const Page = () => {
  // access the context value
  const user = useUserContext();

  if (user?.login?.username) {
    return <p>You are logged in as {user?.login.username}</p>;
  } else {
    return <p>You are not logged in</p>;
  }
};


export default App;