import React, { useState, useEffect } from 'react';

// Importiere die Kind-Komponente
import { Listitems } from './Listitems'; 
// Importiere die Typen
import type { IncidentData } from '../domain/Incident';
import { fetchIncidents } from '../domain/API';

// === SCHRITT 1: Importiere die neue SCSS-Datei ===
import '../styles/lists.css'; // Pfad ggf. anpassen!

export const Lists: React.FC = () => {
  
  const [incidents, setIncidents] = useState<IncidentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchIncidents();
        setIncidents(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // === SCHRITT 2: Füge die neuen Klassen hinzu ===
  
  if (isLoading) {
    // Verwende die .loading-state Klasse
    return <div className="loading-state">Lade Incidents...</div>;
  }

  if (error) {
    // Verwende die .error-state Klasse
    return <div className="error-state">Fehler: {error.message}</div>;
  }

  // (Dieser Teil bleibt gleich)
  return (
    <div className="list-container">
      <h2>Gemeldete Vorfälle</h2>
      {incidents.map(item => (
        <Listitems 
          key={item._id}
          item={item}
        />
      ))}
    </div>
  );
};