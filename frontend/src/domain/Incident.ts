// src/domain/incident.ts


export interface IncidentTag {
  tag: string;
  _id?: string; 
}


export interface IncidentImage {
  image: string;
  _id?: string; 
}


export type DangerLevel = 'All good!' | 'Warning' | 'High' | 'Unknown';

export type TimeCategory = 'permanent' | 'semi-permanent' | 'temporary';



export interface IncidentData {
  _id: string; 
  
  title: string;
  description?: string; 
  latitude: number;
  longitude: number;
  date: number; 
  category: string;
  street: string;
  zip: number;
  city: string;
  country: string;
  user: string;
  danger: string;
  time_category: string;
  tags: string[]; 
  images: IncidentImage[]; 
  incident_id: number;
  __v: number; 
}