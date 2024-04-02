// Board.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Style1.css';
import { fetchOpportunites, updateOpportunite } from '../../store/opportunite'; // Importez la fonction d'updateOpportunite
import OpportunityCard from './card'; // Importez la composante OpportunityCard

const Board = () => {
  const [newStageName, setNewStageName] = useState('');
  const [stages, setStages] = useState({
    1: { name: 'New', opportunities: [] },
    2: { name: 'Interested', opportunities: [] },
    3: { name: 'Won', opportunities: [] },
    4: { name: 'Lost', opportunities: [] }
  });

  const dispatch = useDispatch();
  const opportunities = useSelector(state => state.opportunite.opportunites.items);

  useEffect(() => {
    dispatch(fetchOpportunites());
  }, [dispatch]);

  useEffect(() => {
    const updatedStages = {
      1: { name: 'New', opportunities: [] },
      2: { name: 'Interested', opportunities: [] },
      3: { name: 'Won', opportunities: [] },
      4: { name: 'Lost', opportunities: [] }
    };
    opportunities.forEach(opportunity => {
      if (updatedStages[opportunity.stageId]) {
        updatedStages[opportunity.stageId].opportunities.push(opportunity);
      }
    });
    setStages(updatedStages);
  }, [opportunities]);
 // Ajout de refresh comme dépendance
  const handleStageNameChange = event => {
    setNewStageName(event.target.value);
  };

  const handleAddStage = () => {
  };
  
  const handleDragStart = (event, opportunity, stageId) => {
    event.dataTransfer.setData('opportunity', JSON.stringify({ opportunity, stageId }));
  };

  const handleDragOver = event => {
    event.preventDefault();
  };
  
  const handleDrop = async (event, targetStageId) => {
    event.preventDefault();
    const { opportunity, stageId: sourceStageId } = JSON.parse(event.dataTransfer.getData('opportunity'));
    if (targetStageId !== sourceStageId) {
      try {
        // Mettre à jour l'opportunité dans la base de données
        await dispatch(updateOpportunite({ id: opportunity.id, stageId: targetStageId }));
        console.log("Opportunité déplacée avec succès vers le stage :", targetStageId);
  
        // Mettre à jour l'état local
        setStages(prevStages => {
          const updatedStages = { ...prevStages };
          // Retirer l'opportunité du stage source
          const updatedSourceStage = updatedStages[sourceStageId].opportunities.filter(item => item.id !== opportunity.id);
          // Ajouter l'opportunité au stage cible
          const updatedTargetStage = [...updatedStages[targetStageId].opportunities, opportunity];
          // Mettre à jour les stages
          updatedStages[sourceStageId] = { ...updatedStages[sourceStageId], opportunities: updatedSourceStage };
          updatedStages[targetStageId] = { ...updatedStages[targetStageId], opportunities: updatedTargetStage };
          console.log("Stages mis à jour :", updatedStages); // Ajout du console.log pour vérifier l'état mis à jour
          return updatedStages;
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'opportunité :", error);
        // Gérer les erreurs ici
      }
    }
  };
  
  return (
    <div className="crm-board">
      <div className="stages-container">
        {/* Render existing stages */}
        {Object.keys(stages).map(stageId => (
          <div key={stageId} className="stage" onDragOver={event => handleDragOver(event)} onDrop={event => handleDrop(event, stageId)}>
            <h3>{stages[stageId].name}</h3>
            {stages[stageId].opportunities.map(opportunity => (
              <OpportunityCard 
                key={opportunity.id}
                opportunity={opportunity}
                onDragStart={event => handleDragStart(event, opportunity, stageId)}
              />
            ))}
          </div>
        ))}
        <div className="stage new-stage">
          <h3>New Stage</h3>
          <input
            type="text"
            value={newStageName}
            onChange={handleStageNameChange}
            placeholder="Enter stage name"
          />
          <button onClick={handleAddStage}>Add Stage</button>
        </div>
      </div>
      <Link to="/AddOpportunite" className="add-opportunity-button">
        Add Opportunity
      </Link>
    </div>
  );
};

export default Board;
