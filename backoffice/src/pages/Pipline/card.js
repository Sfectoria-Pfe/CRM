// OpportunityCard.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';

const OpportunityCard = ({ opportunity, onDragStart }) => {
  return (
    <div className="opportunity" draggable onDragStart={onDragStart}>
      <h4>{opportunity.client}</h4>
      <p><FontAwesomeIcon icon={faEnvelope} /> {opportunity.email}</p>
      <p><FontAwesomeIcon icon={faPhone} /> {opportunity.tel}</p>
      <p><FontAwesomeIcon icon={faMoneyBillAlt} /> {opportunity.revenus_esperes}</p>
      {/* Ajoutez d'autres attributs ici si nécessaire */}
    </div>
  );
};

export default OpportunityCard;
