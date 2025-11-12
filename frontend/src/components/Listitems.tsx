// src/components/Listitems.tsx

import React from 'react';
// Importiere den Datentyp, den wir anzeigen wollen
import { type IncidentData } from '../domain/Incident'; 

// Importiere die Stile (wir erstellen sie in Schritt 2)
import styles from './Listitems.module.scss'; 

// 1. Definiere die "Props" (Eigenschaften), die diese Komponente empfängt.
//    Unsere Lists.tsx übergibt ein 'item'
interface ListitemsProps {
  item: IncidentData;
}

// 2. Erstelle die Komponente
export const Listitems: React.FC<ListitemsProps> = ({ item }) => {

  // Kleine Hilfsfunktion, um den Timestamp lesbar zu machen
  const formattedDate = new Date(item.date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    // Wir verwenden die 'card'-Klasse aus unserem SCSS-Modul
    <div className={styles.card}>
      
      {/* Titel-Bereich */}
      <div className={styles.header}>
        <h3>{item.title}</h3>
        <span className={`${styles.category} ${styles[item.category]}`}>
          {item.category} {/* z.B. "good" oder "bad" */}
        </span>
      </div>

      {/* Detail-Bereich */}
      <p className={styles.description}>{item.description}</p>
      
      <div className={styles.details}>
        <p><strong>Wo:</strong> {item.street}, {item.zip} {item.city}</p>
        <p><strong>Gefahr:</strong> {item.danger}</p>
        <p><strong>Gemeldet:</strong> {formattedDate} von <strong>{item.user}</strong></p>
      </div>

      {/* Bilder-Bereich (falls vorhanden) */}
      {item.images && item.images.length > 0 && (
        <div className={styles.images}>
          {/* Wir nehmen hier nur das erste Bild als Vorschau */}
          <img 
            src={`http://141.45.191.149:7777/bikelin/api/image/${item.images[0].image}`} // Annahme: So ist die Bild-URL
            alt={item.title} 
          />
        </div>
      )}
    </div>
  );
};