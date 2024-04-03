import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchStages, updateStage } from "../../../store/stage";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
// import "./Style1.css";
import {
  fetchOpportunites,
  sendOpportunite,
  updateOpportunite,
} from "../../../store/opportunite";
import { useDrag } from "react-dnd";
import axios from "axios";

const AddStageIcon = () => {
  const [stage, setStage] = useState({ id: "default_stage_id" });
  const [showAddStageForm, setShowAddStageForm] = useState(false);
  const dispatch = useDispatch();
  const stages = useSelector((state) => state.stage.stages.items);
  const opportunities = useSelector(
    (state) => state.opportunite.opportunites.items
  );

  useEffect(() => {
    dispatch(fetchStages());
    dispatch(fetchOpportunites());
  }, [dispatch]);
  useEffect(() => {
    console.log("Données d'opportunités initiales :", opportunities);
  }, [opportunities]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStage({ ...stage, [name]: value });
  };

  const handleAddStage = () => {
    // Ajoutez la logique pour ajouter un stage ici
  };

  const handleToggleForm = () => {
    setShowAddStageForm((prevState) => !prevState);
  };

  const handleDragStart = (opportunity, stageId) => {
    const draggedItem = { id: opportunity.id, stageId };
    console.log("Objet glissé :", draggedItem); // Ajoutez cette ligne pour imprimer l'objet
    return draggedItem;
  };

  const handleDrop = async (targetStageId, item) => {
    console.log("Données de l'opportunité lors du drop :", item);
    if (item.id === undefined) {
        console.error("L'ID de l'opportunité est undefined.");
        return;
    }

    // Convertir item.id en nombre
    const opportunityId = parseInt(item.id);

    console.log("Avant la recherche de l'opportunité");

    // Récupérez l'opportunité associée à l'ID transmis
    const updatedOpportunityIndex = opportunities.findIndex(opportunity => opportunity.id === opportunityId);
    console.log("Index de l'opportunité trouvée :", updatedOpportunityIndex);

    if (updatedOpportunityIndex === -1) {
        console.error("Impossible de trouver l'opportunité avec l'ID donné.");
        return;
    }
    console.log("Après la recherche de l'opportunité");

    // Convertir targetStageId en nombre si ce n'est pas déjà le cas
    const stageId = typeof targetStageId === 'number' ? targetStageId : parseInt(targetStageId);

    // Créez un nouvel objet d'opportunité avec la mise à jour de l'ID de l'étape
    const updatedOpportunity = {
        ...opportunities[updatedOpportunityIndex],
        stageId: stageId
    };

    try {
        // Mettez à jour l'opportunité sur le backend et dans le magasin Redux
        await dispatch(updateOpportunite({ id: updatedOpportunity.id, body: updatedOpportunity }));
        console.log("Opportunité déplacée avec succès vers le stage :", stageId);
    } catch (error) {
        console.error("Erreur lors du déplacement de l'opportunité :", error);
        toast.error("Erreur lors du déplacement de l'opportunité. Veuillez réessayer.");
    }
};

  const renderOpportunities = (stageId, stage) => {
    console.log("Stage ID:", stageId);

    // Utilisez une autre variable pour la boucle de map pour éviter les conflits de noms
    const stageOpportunities = opportunities.filter(
      (opp) => opp.stageId === stageId
    );

    // Boucle de map sur les opportunités filtrées
    return stageOpportunities.map((opportunity) => (
      <Opportunity
        key={opportunity.id}
        opportunity={opportunity}
        stageId={stageId}
        stage={stage}
      />
    ));
  };

  const Opportunity = ({ opportunity, stageId }) => {
    const [, drag] = useDrag(() => ({
      type: "OPPORTUNITY", // Type d'élément utilisé lors du drag
      item: { id: opportunity.id, stageId }, // Propriétés de l'élément
    }));

    return (
      <div ref={drag} className="opportunity" draggable>
        <h4>{opportunity.client}</h4>
        <p>{opportunity.id}</p>
        <p>Email: {opportunity.email}</p>
        <p>Téléphone: {opportunity.tel}</p>
        <p>Revenus Espérés: {opportunity.revenus_esperes}</p>
        <p>title : {opportunity.title}</p>
        <p> tel :{opportunity.tel} </p>
      </div>
    );
  };

  const [, drop] = useDrop(() => ({
    accept: "OPPORTUNITY", // Type d'élément accepté lors du drop

    drop: (item) => {
      console.log("ID de l'opportunité :", item.id);
      handleDrop(stage.id, item);
    }, // Fonction appelée lors du drop
  }));

  return (
    <div className="crm-board">
      <FontAwesomeIcon icon={faPlus} onClick={handleToggleForm} />
      {showAddStageForm && (
        <div className="form-container">
          <h2>Ajouter un stage</h2>
          <div className="form-input">
            <input
              className="form-control"
              placeholder="Nom"
              name="nom"
              value={stage.nom || ""}
              onChange={handleChange}
            />
          </div>
          <Button
            variant="warning"
            onClick={handleAddStage}
            className="form-button"
          >
            Ajouter le stage
          </Button>
          <ToastContainer />
        </div>
      )}
      <div className="stages-container" ref={drop}>
        {Array.isArray(stages) &&
          stages.map((stage) => (
            <div
              key={stage.id}
              className="stage"
              onDrop={(item) => handleDrop(stage.id, item)}
              onDragOver={(event) => event.preventDefault()}
              style={{
                display: "inline-block",
                verticalAlign: "top",
                margin: "10px",
              }}
            >
              <h3>{stage.nom}</h3>
              {renderOpportunities(stage.id, stage)}{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddStageIcon;
