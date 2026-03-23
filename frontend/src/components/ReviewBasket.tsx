import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type {  RootState } from '../store/store';
import { fetchIncidents } from '../domain/API';
import type { IncidentData } from '../domain/Incident';
import useUserContext from './UserContext';
import { Link } from 'react-router-dom';

export const ReviewBasket: React.FC = () => {
  const { user } = useUserContext();
  const currentUsername = user?.UserResponse?.user?.username;
  
  // Lade das Array der markierten IDs aus dem Redux-Store
  const myReviewBasket = useSelector((state: RootState) => 
    currentUsername ? state.review.userBaskets[currentUsername] || [] : []
  );

  const [incidents, setIncidents] = useState<IncidentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allData = await fetchIncidents();
        
        const basketItems = allData.filter(inc => myReviewBasket.includes(String(inc._id)));
        setIncidents(basketItems);
      } catch (e) {
        console.error("Fehler beim Laden des Baskets", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [myReviewBasket]); 

  if (loading) return <div className="loading-state">Lade Basket...</div>;

  return (
    <div className="list-container">
      <h2>Mein "Needs Review" Basket</h2>
      
      {incidents.length === 0 ? (
        <p>Dein Basket ist aktuell leer.</p>
      ) : (
        <ul className="incident-list">
          {incidents.map(inc => (
            <li key={inc._id} className="list-item" style={{ borderLeft: '5px solid #f39c12' }}>
              <Link to={`/locations/${inc.incident_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="list-item-content">
                  <h3>{inc.title} <span style={{ color: '#f39c12', fontSize: '0.8em' }}>(Needs Review)</span></h3>
                  <p>{inc.street}, {inc.zip} {inc.city}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};