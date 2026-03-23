import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUserContext from './UserContext';
import { fetchIncidentById, updateIncident } from '../domain/API';
import type { IncidentData } from '../domain/Incident';
import '../styles/AddIncident.css'; 

export const EditLocation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUserContext();

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // WICHTIG: Wir speichern das komplette Original-Objekt, um es später zu überschreiben
  const [originalIncident, setOriginalIncident] = useState<IncidentData | null>(null);

  // Formular States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('bad');
  const [danger, setDanger] = useState('Warning');
  const [street, setStreet] = useState('');
  const [zip, setZip] = useState<string>('');

  // Validierungs States
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

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        const incident = await fetchIncidentById(id);
        
        if (user?.UserResponse?.user?.username !== incident.user) {
          setError("Keine Berechtigung, diesen Eintrag zu bearbeiten.");
          setLoadingInitial(false);
          return;
        }

        // Gesamtes Objekt speichern
        setOriginalIncident(incident);

        // Formular befüllen
        setTitle(incident.title);
        setDescription(incident.description || '');
        setCategory(incident.category);
        setDanger(incident.danger);
        setStreet(incident.street);
        setZip(String(incident.zip));
        
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Fehler beim Laden der Location-Daten.");
      } finally {
        setLoadingInitial(false);
      }
    };
    loadData();
  }, [id, user]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setTitleError(!validateHasLetter(val) ? 'Feld muss mindestens einen Buchstaben enthalten.' : '');
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setStreet(val);
    setStreetError(!validateHasLetter(val) ? 'Feld muss mindestens einen Buchstaben enthalten.' : '');
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setZip(val);
    setZipError(!validateBerlinZip(val) ? 'Bitte eine gültige Berliner PLZ (10115-14199) eingeben.' : '');
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
    
    if (!isFormValid || !originalIncident) return;

    const token = user?.UserResponse?.token;
    if (!token) {
      setError("Authentifizierungsfehler.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Wir kopieren das Original-Objekt und überschreiben nur die Formularfelder
      const updatedIncident: IncidentData = {
        ...originalIncident,
        title,
        description,
        category,
        danger,
        street,
        zip: parseInt(zip, 10)
      };

      // Den neuen Payload mit Formulardaten an die API schicken
      await updateIncident(updatedIncident, token);
      
      // Zurück zur Detailansicht
      navigate(`/locations/${id}`);

    } catch (err) {
      console.error("Update Error:", err);
      setError("Fehler beim Speichern der Änderungen.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingInitial) return <div className="loading-state">Lade Daten...</div>;
  if (error && !title) return <div className="error-state">{error}</div>;

  return (
    <div className="add-incident-form" style={{ marginTop: '2rem' }}>
      <h2>Location bearbeiten</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titel des Vorfalls *</label>
          <input 
            className={`input ${titleError ? 'input-error' : ''}`} 
            value={title} 
            onChange={handleTitleChange} 
            required 
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
          />
        </div>

        <div className="form-group">
            <label>Ort *</label>
            <div className="form-row">
                <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
                  <input 
                    className={`input ${streetError ? 'input-error' : ''}`} 
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
                    value={zip} 
                    onChange={handleZipChange}
                    required
                  />
                  {zipError && <span style={{ color: 'red', fontSize: '0.85em' }}>{zipError}</span>}
                </div>
            </div>
        </div>

        <div className="button-row">
          <button 
            type="button" 
            className="button secondary" 
            onClick={() => navigate(`/locations/${id}`)}
          >
            Abbrechen
          </button>
          
          <button 
            type="submit" 
            className="button" 
            disabled={saving || !isFormValid}
          >
            {saving ? 'Speichere...' : 'Änderungen speichern'}
          </button>
        </div>
      </form>
    </div>
  );
};