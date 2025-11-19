// src/components/Listitems.tsx

import React from 'react';
import type { IncidentData } from '../domain/Incident'; 


import '../styles/Listitems.css'; 

interface ListitemsProps {
  item: IncidentData;
}

export const Listitems: React.FC<ListitemsProps> = ({ item }) => {
  // ... date formatting logic

  // Wir bauen die Basis-URL für Bilder
  // Laut API-Doku: http://141.45.191.149:7777/bikelin/api/incident/image/
  const imageBaseUrl = "http://141.45.191.149:7777/bikelin/api/incident/image";

  return (
    <div className="card"> 
      {/* KORREKTUR DES BILD-PFADES */}
      {item.images && item.images.length > 0 && (
        <div className="images">
          <img 
            // Hier fehlte das '/incident' im Pfad
            src={`${imageBaseUrl}/${item.images[0].image}`} 
            alt={item.title} 
            // Optional: Error Handling für Bilder hinzufügen
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};