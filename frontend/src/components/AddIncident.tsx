import React, { useState } from 'react';
import useUserContext from './UserContext';
import { createIncident } from '../domain/API';
import '../styles/AddIncident.css';

interface AddIncidentProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export const AddIncident: React.FC<AddIncidentProps> = ({ onCancel, onSuccess }) => {
  const { user } = useUserContext();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('bad');
  const [danger, setDanger] = useState('Warning');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Berlin');
  const [zip, setZip] = useState<number>(10115);
  const [file, setFile] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = user?.UserResponse?.token;
    if (!token) {
      setError("Fehler: Du bist nicht eingeloggt.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const latitude = 52.52 + (Math.random() - 0.5) * 0.02; 
      const longitude = 13.40 + (Math.random() - 0.5) * 0.02;

      await createIncident({
          title,
          description,
          category,
          danger,
          street,
          city,
          zip,
          latitude,
          longitude,
          country: "Germany",
          time_category: "permanent"
      }, file, token);

      alert("Vorfall erfolgreich gemeldet!");
      onSuccess();

    } catch (err) {
      console.error(err);
      setError("Fehler beim Senden. Bitte prüfe deine Eingaben.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-incident-form">
      <h2>Neuen Vorfall melden</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Titel des Vorfalls</label>
          <input 
            className="input" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
            placeholder="z.B. Schlagloch Riesig"
          />
        </div>

        <div className="form-row">
          <div className="form-group form-col">
            <label>Kategorie</label>
            <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="bad">Schlecht (Bad)</option>
              <option value="good">Gut (Good)</option>
              <option value="building_site">Baustelle</option>
            </select>
          </div>

          <div className="form-group form-col">
              <label>Gefahrenstufe</label>
              <select className="input" value={danger} onChange={e => setDanger(e.target.value)}>
                  <option value="All good!">Keine Gefahr</option>
                  <option value="Warning">Warnung</option>
                  <option value="High">Hoch</option>
                  <option value="Unknown">Unbekannt</option>
              </select>
          </div>
        </div>

        <div className="form-group">
          <label>Beschreibung</label>
          <textarea 
            className="input" 
            rows={3} 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            placeholder="Was genau ist passiert?"
          />
        </div>

        <div className="form-group">
            <label>Ort</label>
            <div className="form-row">
                <input 
                  className="input" 
                  style={{ flex: 3 }}
                  placeholder="Straße" 
                  value={street} 
                  onChange={e => setStreet(e.target.value)} 
                  required 
                />
                <input 
                  className="input" 
                  type="number" 
                  placeholder="PLZ" 
                  value={zip} 
                  onChange={e => setZip(Number(e.target.value))} 
                  style={{ flex: 1 }}
                />
            </div>
        </div>

        <div className="form-group">
          <label>Bild hochladen (optional)</label>
          <input 
            type="file" 
            className="input" 
            accept="image/*"
            onChange={e => setFile(e.target.files ? e.target.files[0] : null)} 
          />
        </div>

        <div className="button-row">
          <button 
            type="button" 
            className="button secondary" 
            onClick={onCancel}
          >
            Abbrechen
          </button>
          
          <button 
            type="submit" 
            className="button" 
            disabled={loading}
          >
            {loading ? 'Sende...' : 'Absenden'}
          </button>
        </div>

      </form>
    </div>
  );
};