// src/components/LocationDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchIncidentById, deleteIncident } from '../domain/API';
import type { IncidentData } from '../domain/Incident';
import useUserContext from './UserContext';

// Importiere die existierenden UND die neuen Styles
import '../styles/Listitems.css'; 
import '../styles/LocationDetail.css';

export const LocationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const { user } = useUserContext();

  const [incident, setIncident] = useState<IncidentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const imageBaseUrl = "http://141.45.191.149:7777/bikelin/api/incident/image";

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        const data = await fetchIncidentById(id);
        setIncident(data);
      } catch (err) {
        setError("Incident konnte nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleDelete = async () => {
    if (!incident || !user?.UserResponse?.token) return;
    
    if (window.confirm("Willst du diesen Eintrag wirklich unwiderruflich löschen?")) {
      try {
        await deleteIncident(String(incident.incident_id), user.UserResponse.token);
        alert("Gelöscht!");
        navigate('/locations'); 
      } catch (e) {
        alert("Fehler beim Löschen!");
      }
    }
  };

  if (loading) return <div className="loading-state">Lade Details...</div>;
  if (error || !incident) return <div className="error-state">{error || "Nicht gefunden"}</div>;

  const isOwner = user?.UserResponse?.user?.username === incident.user;

  return (
    <div className="list-container detail-container">
      
      <div className="nav-back-wrapper">
        <Link to="/locations" className="button secondary back-link">
          Zurück zur Liste
        </Link>
      </div>

      <div className="card detail-card">
        <div className="header">
          <h2>{incident.title}</h2>
          <span className={`category ${incident.category}`}>{incident.category}</span>
        </div>

        {incident.images && incident.images.length > 0 && (
          <div className="images">
            <img 
              src={`${imageBaseUrl}/${incident.images[0].image}`} 
              alt={incident.title} 
              className="detail-image"
            />
          </div>
        )}

        <div className="detail-content">
          <p><strong>Beschreibung:</strong> {incident.description}</p>
          
          <hr className="detail-separator" />
          
          <div className="detail-grid">
            <p><strong>Adresse:</strong> {incident.street}, {incident.zip} {incident.city}</p>
            <p><strong>Gemeldet von:</strong> {incident.user}</p>
            <p><strong>Gefahr:</strong> {incident.danger}</p>
            <p><strong>Datum:</strong> {new Date(incident.date).toLocaleDateString()}</p>
            <p><strong>GPS:</strong> {incident.latitude.toFixed(4)}, {incident.longitude.toFixed(4)}</p>
          </div>
        </div>

        {isOwner && (
          <div className="action-buttons">
            <button 
              className="button button-delete button-auto" 
              onClick={handleDelete}
            >
              Löschen
            </button>
            
            <button className="button button-auto" disabled>
              Bearbeiten (Bald verfügbar)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};