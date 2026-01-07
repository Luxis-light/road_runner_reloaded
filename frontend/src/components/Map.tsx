// src/components/Map.tsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { fetchIncidents } from '../domain/API';
import type { IncidentData } from '../domain/Incident';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

export const MapComponent: React.FC = () => {
  const [incidents, setIncidents] = useState<IncidentData[]>([]);
  const navigate = useNavigate();

  const defaultPosition: [number, number] = [52.5200, 13.4050];

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchIncidents();
        setIncidents(data);
      } catch (e) {
        console.error("Fehler beim Laden der Kartendaten:", e);
      }
    };
    loadData();
  }, []);

  return (
    <div className="list-container" style={{ height: '80vh', padding: 0, overflow: 'hidden' }}>
      <h2 style={{ textAlign: 'center', padding: '10px 0', margin: 0 }}>Karte aller Vorfälle</h2>
      
      <MapContainer 
        center={defaultPosition} 
        zoom={12} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
      >
        {/* OpenStreetMap Tiles laden */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker für jeden Incident setzen */}
        {incidents.map((incident) => (
          <Marker 
            key={incident._id} 
            position={[incident.latitude, incident.longitude]}
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <strong>{incident.title}</strong><br />
                {incident.street}<br />
                <span style={{ color: incident.danger === 'High' ? 'red' : 'green' }}>
                    {incident.danger}
                </span>
                <br />
                <button 
                    style={{ marginTop: '5px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
                    onClick={() => navigate(`/locations/${incident.incident_id}`)}
                >
                    Details ansehen
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};