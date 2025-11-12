// Dieser Typ beschreibt die Struktur eines Objekts im "images"-Array
export interface IncidentImage {
  _id: string;
  image: string;
}

// Dies ist der Haupt-Typ, der das gesamte Incident-Objekt beschreibt
// Wir exportieren es, damit andere Dateien (wie API.ts und Lists.tsx)
// diesen Typ importieren und verwenden können.
export interface IncidentData {
  _id: string;
  title: string;
  longitude: number;
  latitude: number;
  date: number; // Dies ist ein Unix-Timestamp (in Millisekunden)
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