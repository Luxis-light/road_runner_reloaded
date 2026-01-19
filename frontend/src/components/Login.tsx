import React, { useState } from 'react';
import useUserContext from './UserContext';
import '../styles/Login.css'; // Dein CSS importieren

export const Login = () => {
  const { login } = useUserContext(); // Zugriff auf die Login-Funktion im Context
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Aufruf der Logik aus UserContext -> domain/Login.ts
      await login(username, password);
    } catch (err) {
      setError('Login fehlgeschlagen. Bitte prüfen Sie Ihre Daten.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Benutzername"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Lade...' : 'Anmelden'}
        </button>
      </form>
    </div>
  );
};