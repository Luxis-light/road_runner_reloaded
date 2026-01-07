
import React, { useState } from 'react'; 
import type { IncidentData } from '../domain/Incident';
import { Counter } from './LikeButton';
import useUserContext from './UserContext';
import { deleteIncident } from '../domain/API'; 
import '../styles/Listitems.css'; 
import { useNavigate } from 'react-router-dom'; 

interface ListitemsProps {
  item: IncidentData;
  onDeleteSuccess?: (id: string) => void; 
}

export const Listitems: React.FC<ListitemsProps> = ({ item, onDeleteSuccess }) => {
  
  const navigate = useNavigate();
  
  const imageBaseUrl = "http://141.45.191.149:7777/bikelin/api/incident/image";
  const [count, setCount] = useState(0);
  const { user } = useUserContext();
  
  const hasImages = item.images && item.images.length > 0;
  
  const currentUsername = user?.UserResponse?.user?.username;
  const isOwner = currentUsername === item.user;
  

  const handleCardClick = () => {
    
    navigate(`/locations/${item.incident_id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); 

    if(!window.confirm("Wirklich löschen?")) return;
    
    try {
        const token = user?.UserResponse?.token;
        if(token) {
            await deleteIncident(String(item.incident_id), token); 
            alert("Gelöscht!");
            if (onDeleteSuccess) onDeleteSuccess(item._id);
        }
    } catch (e) {
        console.error(e);
        alert("Fehler beim Löschen (Vielleicht falscher User?)");
    }
  };

  return (
    <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}> 
      <div className="header">
        <h3>{item.title}</h3>
        
        <span className={`category ${item.category}`}>
          {item.category}
        </span>
      </div>
      
      {isOwner && (
          <button 
            onClick={handleDelete}
            style={{ float: 'right', background: 'red', color: 'white', border: 'none', padding: '5px', cursor: 'pointer', borderRadius: '4px' }}
          >
            Löschen 🗑️
          </button>
      )}

      <p className="description">{item.description}</p>
      
      <div className="details">
        <p><strong>Wo:</strong> {item.street}, {item.zip} {item.city}</p>
        <p><strong>Gefahr:</strong> {item.danger}</p>
        <p><strong>Gemeldet von:</strong> <strong>{item.user}</strong></p>
      </div>
      
      {hasImages ? (
        <div className="images">
          <img 
            src={`${imageBaseUrl}/${item.images[0].image}`} 
            alt={item.title} 
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div onClick={(e) => e.stopPropagation()}>
             <Counter count={count} countChangeFunc={setCount}/>
          </div>
        </div>
      ) : (
        <div className="images">Kein Bild vorhanden</div>
      )} 
    </div>
  );
};