// Importiere den Datentyp aus deiner incident.ts-Datei
import { type IncidentData } from './Incident';

// Definiere die Basis-URL deiner API
const API_URL = 'http://141.45.191.149:7777/bikelin/api';

/**
 * Holt die Liste aller Incidents vom Server.
 * @returns Ein Promise, das zu einem Array von IncidentData-Objekten auflöst.
 * @throws Wirft einen Fehler, wenn die Server-Antwort nicht 'ok' ist.
 */
export const fetchIncidents = async (): Promise<IncidentData[]> => {
  
  // Sende die Anfrage an den Endpunkt
  const response = await fetch(`${API_URL}/incidents`);

  // Fehlerbehandlung: Wenn Status nicht 200-299 ist (z.B. 404, 500)
  if (!response.ok) {
    // Dieser Error wird vom 'catch'-Block in der Komponente gefangen
    throw new Error(`HTTP-Fehler beim Abrufen der Incidents! Status: ${response.status}`);
  }

  // Wandle die Antwort in JSON um und gib sie als korrekten Typ zurück
  const data = await response.json() as IncidentData[];
  return data;
};

export const deleteIncident = async (incidentId: string, token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/incident/${incidentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Löschen fehlgeschlagen: ${response.status}`);
  }
};





export const createIncident = async (
  incidentData: Omit<IncidentData, '_id' | 'incident_id' | '__v' | 'user' | 'images' | 'tags' | 'date'>,
  imageFile: File | null,
  token: string
): Promise<IncidentData> => {
  
  const formData = new FormData();
  
  // Incident-Daten als JSON-String verpacken
  const incidentPayload = {
    ...incidentData,
    date: Date.now(),
    tags: [],
    files: [{}], 
  };
  formData.append("incident", JSON.stringify(incidentPayload));

  // Bild anhängen
  if (imageFile) {
    formData.append("file", imageFile);
  }

  const response = await fetch(`${API_URL}/incident/upload`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload fehlgeschlagen: ${response.status}`);
  }

  return response.json();
};

export const fetchIncidentById = async (id: string): Promise<IncidentData> => {
  const response = await fetch(`${API_URL}/incident/${id}`);

  if (!response.ok) {
    throw new Error(`Fehler beim Laden des Incidents: ${response.status}`);
  }

  return response.json();
};


export const updateIncident = async (
  updateData: IncidentData, 
  token: string
): Promise<void> => { 

  const formData = new FormData();
 
  formData.append("incident", JSON.stringify(updateData));

  
  const response = await fetch(`${API_URL}/incident/update`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Fehler beim Aktualisieren des Incidents: ${response.status}`);
  }
  
 
};

export const geocodeAddress = async (street: string, zip: string | number, city: string): Promise<{ latitude: number, longitude: number } | null> => {
  try {
    // URL-konforme Aufbereitung des Suchstrings
    const query = encodeURIComponent(`${street}, ${zip} ${city}, Germany`);
    
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`, {
      headers: {
        // Nominatim verlangt einen User-Agent zur Identifizierung der App
        'User-Agent': 'RoadRunnerApp/1.0' 
      }
    });
    
    if (!response.ok) {
      console.error("Nominatim API Antwort nicht ok:", response.status);
      return null;
    }
    
    const data = await response.json();
    
    // Wenn ein Ergebnis gefunden wurde, Rückgabe der Koordinaten
    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      };
    }
    
    return null; // Keine Ergebnisse gefunden
  } catch (error) {
    console.error("Geocoding API Fehler:", error);
    return null;
  }
};