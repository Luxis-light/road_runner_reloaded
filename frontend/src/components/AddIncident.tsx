import React, { useState, useEffect } from 'react';
import useUserContext from './UserContext';
import { createIncident, geocodeAddress } from '../domain/API';
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
  
  
  const [zip, setZip] = useState<string>('10115'); 
  const [file, setFile] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const [titleError, setTitleError] = useState<string>('');
  const [streetError, setStreetError] = useState<string>('');
  const [zipError, setZipError] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  
  const hasLetterRegex = /[a-zA-ZäöüÄÖÜß]/;
  
  const validateHasLetter = (value: string): boolean => {
    return hasLetterRegex.test(value);
  };

  const validateBerlinZip = (value: string): boolean => {
    
    if (!/^\d{5}$/.test(value)) return false;
    const zipNum = parseInt(value, 10);
    return zipNum >= 10115 && zipNum <= 14199;
  };

 
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!validateHasLetter(val)) {
      setTitleError('Das Feld muss mindestens einen Buchstaben enthalten.');
    } else {
      setTitleError('');
    }
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setStreet(val);
    if (!validateHasLetter(val)) {
      setStreetError('Das Feld muss mindestens einen Buchstaben enthalten.');
    } else {
      setStreetError('');
    }
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setZip(val);
    if (!validateBerlinZip(val)) {
      setZipError('Bitte eine gültige Berliner PLZ (10115-14199) eingeben.');
    } else {
      setZipError('');
    }
  };

  
  useEffect(() => {
    const isValid = 
      title.length > 0 && titleError === '' &&
      street.length > 0 && streetError === '' &&
      zip.length === 5 && zipError === '';
    
    setIsFormValid(isValid);
  }, [title, titleError, street, streetError, zip, zipError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    const token = user?.UserResponse?.token;
    if (!token) {
      setError("Fehler: Du bist nicht eingeloggt.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // --- NEU: Dynamische Koordinatenauflösung ---
      const coords = await geocodeAddress(street, zip, city);
      
      // Fallback-Koordinaten (Zentrum Berlin), falls die API die Adresse nicht exakt findet
      const finalLatitude = coords ? coords.latitude : 52.5200;
      const finalLongitude = coords ? coords.longitude : 13.4050;

      await createIncident({
          title,
          description,
          category,
          danger,
          street,
          city,
          zip: parseInt(zip, 10), 
          latitude: finalLatitude,
          longitude: finalLongitude,
          country: "Germany",
          time_category: "permanent"
      }, file, token);

      alert(coords ? "Vorfall erfolgreich gemeldet!" : "Gemeldet, aber Adresse auf Karte nicht exakt gefunden (Standard-Koordinaten verwendet).");
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
          <label>Titel des Vorfalls *</label>
          <input 
            className={`input ${titleError ? 'input-error' : ''}`} 
            value={title} 
            onChange={handleTitleChange} 
            required 
            placeholder="z.B. Schlagloch Riesig"
          />
          {titleError && <span style={{ color: 'red', fontSize: '0.85em' }}>{titleError}</span>}
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
            <label>Ort *</label>
            <div className="form-row">
                <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
                  <input 
                    className={`input ${streetError ? 'input-error' : ''}`} 
                    placeholder="Straße" 
                    value={street} 
                    onChange={handleStreetChange} 
                    required 
                  />
                  {streetError && <span style={{ color: 'red', fontSize: '0.85em' }}>{streetError}</span>}
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                  <input 
                    className={`input ${zipError ? 'input-error' : ''}`} 
                    type="text" 
                    placeholder="PLZ" 
                    value={zip} 
                    onChange={handleZipChange}
                    required
                  />
                  {zipError && <span style={{ color: 'red', fontSize: '0.85em' }}>{zipError}</span>}
                </div>
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
            disabled={loading || !isFormValid}
          >
            {loading ? 'Sende...' : 'Absenden'}
          </button>
        </div>

      </form>
    </div>
  );
};