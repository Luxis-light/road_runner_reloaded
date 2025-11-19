// src/components/Listitems.tsx

import React from 'react';
import type { IncidentData } from '../domain/Incident';
import '../styles/Listitems.css';

interface ListitemsProps {
  item: IncidentData;
}

export const Listitems: React.FC<ListitemsProps> = ({ item }) => {
  
  // Basis-URL definieren
  const imageBaseUrl = "http://141.45.191.149:7777/bikelin/api/incident/image";
  
  // Die Bedingung: Wahr, wenn Bilder existieren UND das Array nicht leer ist
  const hasImages = item.images && item.images.length > 0;

  return (
    <div className="card"> 
      
      <div className="header">
        <h3>{item.title}</h3>
        <span className={`category ${item.category}`}>
          {item.category}
        </span>
      </div>

      <p className="description">{item.description}</p>
      
      <div className="details">
        <p><strong>Wo:</strong> {item.street}, {item.zip} {item.city}</p>
        <p><strong>Gefahr:</strong> {item.danger}</p>
        <p><strong>Gemeldet von:</strong> <strong>{item.user}</strong></p>
      </div>
      
      {hasImages ? (
        <div className="images">
          <img 
            src={`${imageBaseUrl}/${item.images[0].image}`} 
            alt={item.title} 
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ) : (
        <div className="images">
           Kein Bild vorhanden
        </div>
      )} 
    </div>
  );
};