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
      // KEIN Content-Type Header setzen! Das macht der Browser bei FormData automatisch.
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
