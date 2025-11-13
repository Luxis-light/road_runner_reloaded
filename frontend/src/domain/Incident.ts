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
  street?: string;
  city?: string;
  zip?: number;
  country?: string;
  category?: string;
  rating?: number;
  severity?: string;
  timeframe?: string; // (Dein Schema sagt 'timeframe', nicht 'timeFrame')
  date?: number;
  
  // Es ist ein Array von OBJEKTEN, nicht nur strings
  tags: IncidentTag[]; 
  
  // Es ist ein Array von OBJEKTEN, nicht ein leeres Array
  images: IncidentImage[];
  
  // 'user' ist im Schema ein String (die User-ID)
  user: string; 
  
  
  danger: DangerLevel; // (oder 'string', wenn du die Enums nicht willst)
  time_category: TimeCategory; // (oder 'string')
}