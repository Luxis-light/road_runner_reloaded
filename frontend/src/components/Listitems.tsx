// src/components/Listitems.tsx

import React from 'react';
import type { IncidentData } from '../domain/Incident'; 


import '../styles/Listitems.css'; 

interface ListitemsProps {
  item: IncidentData;
}

export const Listitems: React.FC<ListitemsProps> = ({ item }) => {

  const formattedDate = new Date(item.date ?? Date.now()).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });


  return (
    <div className="card"> 
      
      <div className="header">
        <h3>{item.title}</h3>
        {/* Wir setzen hier zwei Klassen dynamisch zusammen */}
        <span className={`category ${item.category}`}>
          {item.category}
        </span>
      </div>

      <p className="description">{item.description}</p>
      
      <div className="details">
        <p><strong>Wo:</strong> {item.street}, {item.zip} {item.city}</p>
        <p><strong>Gefahr:</strong> {item.danger}</p>
        <p><strong>Gemeldet:</strong> {formattedDate} von <strong>{item.user}</strong></p>
      </div>

      {item.images && item.images.length > 0 && (
        <div className="images">
          <img 
            src={`http://141.45.191.149:7777/bikelin/api/image/${item.images[0].image}`} 
            alt={item.title} 
          />
        </div>
      )}
    </div>
  );
};