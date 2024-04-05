import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone,  } from '@fortawesome/free-solid-svg-icons';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const OpportunityCard = ({ opportunity, onDragStart, stageClient }) => {
  return (
    <div className="opportunity" draggable onDragStart={onDragStart}>
      <h4><strong>{opportunity.nom} {opportunity.prenom}</strong></h4>
      <p><FontAwesomeIcon icon={faEnvelope} /> Email: {opportunity.email}</p>
      <p><FontAwesomeIcon icon={faPhone} /> Téléphone: {opportunity.tel}</p>
      <p><LocationOnIcon /> Adresse: {opportunity.adresse}</p>
    </div>
  );
};

export default OpportunityCard;
