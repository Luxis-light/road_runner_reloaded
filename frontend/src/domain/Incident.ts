// src/domain/incident.ts


export interface IncidentTag {
  tag: string;
  _id?: string; 
}


export interface IncidentImage {
  image: string;
  _id?: string; // MongoDB fügt oft eine _id hinzu
}


export type DangerLevel = 'All good!' | 'Warning' | 'High' | 'Unknown';

export type TimeCategory = 'permanent' | 'semi-permanent' | 'temporary';


// 3. Das korrekte Haupt-Interface für die Daten
export interface IncidentData {
  // MongoDB fügt immer eine _id hinzu, die du als key brauchst
  _id: string; 
  
  title: string;
  description?: string; // '?' bedeutet optional (nicht 'required' im Schema)
  latitude: number;
  longitude: number;
  latitude: number;
  date: number; 
  category: string;
  description: string;
  street: string;
  zip: number;
  city: string;
  country: string;
  user: string;
  danger: string;
  time_category: string;
  tags: string[]; // Annahme: ist ein Array von Strings
  images: IncidentImage[]; // Verwendet den oben definierten Typ
  incident_id: number;
  __v: number; // Dies ist oft eine Versionsnummer von der Datenbank (z.B. Mongoose)
}