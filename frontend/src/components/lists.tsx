import React, { useState, useEffect } from 'react';

// Importiere die Kind-Komponente (Annahme, sie heißt 'Listitems' und liegt auch in 'components')
import { Listitems } from './Listitems'; // Pfad ggf. anpassen, z.B. './Listitems'


import type { IncidentData } from '../domain/Incident';
// Importiere die API-Funktion (Pfad anpassen!)
import { fetchIncidents } from '../domain/API';

export const Lists: React.FC = () => {
  
  // States bleiben gleich
  const [incidents, setIncidents] = useState<IncidentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // useEffect bleibt, aber der Inhalt wird einfacher
  useEffect(() => {
    
    // Wir definieren eine Funktion, die 'async' sein kann
    const loadData = async () => {
      try {
        // ***** DAS IST DIE ÄNDERUNG *****
        // Rufe die saubere Funktion aus deiner API.ts auf
        const data = await fetchIncidents();
        // **********************************
        
        setIncidents(data);
        
      } catch (e) {
        // Fängt den Fehler, den fetchIncidents geworfen hat
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    // Führe die Ladefunktion aus
    loadData();

  }, []); // [] = Nur einmal beim Laden ausführen

  // --- Render-Logik (bleibt exakt gleich) ---

  if (isLoading) {
    return <div>Lade Incidents...</div>;
  }

  if (error) {
    return <div>Fehler: {error.message}</div>;
  }

  return (
    <div className="list-container">
      <h2>Gemeldete Vorfälle</h2>
      {incidents.map(item => (
        <Listitems 
          key={item._id} // _id ist ein perfekter Key
          item={item}     // Übergib das ganze Objekt an die Kind-Komponente
        />
      ))}
    </div>
  );
};