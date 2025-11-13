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

/*
// Beispiel: So könntest du auch eine Funktion für *ein* Item hinzufügen
export const fetchIncidentById = async (id: string): Promise<IncidentData> => {
  const response = await fetch(`${API_URL}/incident/${id}`);
  
  if (!response.ok) {
    throw new Error(`HTTP-Fehler beim Abrufen von Incident ${id}! Status: ${response.status}`);
  }
  
  const data = await response.json() as IncidentData;
  return data;
};
*/