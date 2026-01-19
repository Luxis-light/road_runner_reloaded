
import './styles/App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Lists } from './components/lists';
import { Login } from './components/Login';
import { AddIncident } from './components/AddIncident';
import { UserContextProvider } from "./components/UserContext";
import useUserContext from "./components/UserContext";
import { About, ErrorPage} from './components/Placeholder';
import { LocationDetail } from './components/LocationDetail';
import { MapComponent } from './components/Map'; // Importieren

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext();
  if (!user) {
    return <Login />;
  }
  return <>{children}</>; 
};

const AppContent = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Header headerNote={user?.UserResponse?.user?.username || ""} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/locations" replace /> : <Login />} />
          
          <Route path="/locations" element={
            <ProtectedRoute>
              <Lists />
            </ProtectedRoute>
          } />

          <Route path="/locations/add" element={
            <ProtectedRoute>
              <AddIncident 
                onCancel={() => navigate('/locations')} 
                onSuccess={() => navigate('/locations')} 
              />
            </ProtectedRoute>
          } />

          <Route path="/locations/:id" element={
            <ProtectedRoute>
              <LocationDetail />
            </ProtectedRoute>
          } />

          <Route path="/locations/map" element={
            <ProtectedRoute>
            <MapComponent />
          </ProtectedRoute>
          } />
          
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </main>

      <Footer footerNote="" />
    </div>
  );
};

function App() {
  return (
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  );
}

export default App;