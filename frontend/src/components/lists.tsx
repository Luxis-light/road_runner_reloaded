import React, { useState, useEffect } from 'react';


import { Listitems } from './Listitems'; 

import type { IncidentData } from '../domain/Incident';
import { fetchIncidents } from '../domain/API';


import '../styles/lists.css'; 

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


  
  if (isLoading) {
 
    return <div className="loading-state">Lade Incidents...</div>;
  }

  if (error) {
  
    return <div className="error-state">Fehler: {error.message}</div>;
  }


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