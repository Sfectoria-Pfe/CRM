import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../Style1.css";
import {
  fetchOpportunite,
  fetchOpportunites,
} from "../../../store/opportunite";
import OpportunityCard from "../components/card";
import {
  fetchStage_client,
  updateStage_client,
} from "../../../store/stage_client";
import { FiPlus, FiMessageSquare } from "react-icons/fi"; // Importez FiMessageSquare pour l'icône du commentaire
import AddStageClient from "../../stage-client/AddStage-client";
import AddStage from "../../stage/AddStage";
import Chat from "../../Chats/chat";
import AlignItemsList from "../../Chats/ChatClient"; // Importez le composant AlignItemsList
import AddCommentForm from "../../Comments/Addcomment"; // Importez le composant AddCommentForm

const ViewOpportunity = () => {
  const { opportunityId } = useParams();
  const [newStageName, setNewStageName] = useState("");
  const [stages, setStages] = useState([]);
  const [showAddStageForm, setShowAddStageForm] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(null);
  const [selectedStageClientId, setSelectedStageClientId] = useState(null); // État pour suivre le stage client sélectionné pour ajouter un commentaire
  const [showCommentForm, setShowCommentForm] = useState(false); // État pour contrôler la visibilité du formulaire de commentaire
  const dispatch = useDispatch();
  const opportunity = useSelector((state) => state.opportunite.opportunite);
  const [showChat, setShowChat] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    dispatch(fetchOpportunite(opportunityId));
  }, [dispatch]);

  useEffect(() => {
    if (opportunity?.stage) setStages(opportunity.stage);
  }, [opportunity]);

  const handleStageNameChange = (event) => {
    setNewStageName(event.target.value);
  };

  const handleToggleAddStageForm = () => {
    setShowAddStageForm(!showAddStageForm);
  };

  const handleDragStart = (event, stageClient, stage, index) => {
    event.dataTransfer.setData(
      "stage",
      JSON.stringify({ stageClient, stage, index })
    );
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event, targetStageId, index) => {
    event.preventDefault();

    const { stage, stageClient } = JSON.parse(
      event.dataTransfer.getData("stage")
    );
    const { id } = stageClient;

    dispatch(updateStage_client({ id, stageId: targetStageId, opportunityId })).then((res) => {
      // if (!res.error) {
      //   let aux = [...stages];
      //   for (let i = 0; i < stages.length; i++) {
      //     if (stages[i].id === stage.id) {
      //       aux[i] = {
      //         ...aux[i],
      //         StageClient: aux[i].StageClient.filter((elem) => elem.id !== id),
      //       };
      //     }
      //     if (stages[i].id === targetStageId) {
      //       aux[i] = {
      //         ...aux[i],
      //         StageClient: [...aux[i].StageClient, stageClient],
      //       };
      //     }
      //   }
      //   setStages(aux);
      // }
    });
  };

  const handleToggleChat = () => {
    setShowChat(!showChat);
  };

  const handleToggleCommentForm = (stageClientId) => {
    setSelectedStageClientId(stageClientId);
    setShowCommentForm(true); // Afficher le formulaire de commentaire lorsqu'on clique sur l'icône de commentaire
  };

  const handleCloseCommentForm = () => {
    setShowCommentForm(false); // Masquer le formulaire de commentaire
  };

  return (
    <div>
<button onClick={handleToggleChat} style={{
        width:"70px",height:"50px",backgroundColor:"blue",padding:"10px",color:"white",borderRadius:"30px"
      }}>Chat</button>
<br/><br/>
      <div className="crm-board">
        <div className="stages-container">
          {stages?.map((stage, index) => (
            <div
              key={stage.id}
              className="stage"
              onDragOver={(event) => handleDragOver(event)}
              onDrop={(event) => handleDrop(event, stage.id, index)}
            >
              <h3>
                {stage.nom}
                <FiPlus onClick={() => setSelectedStageId(stage.id)} />
              </h3>
              {selectedStageId === stage.id && (
                <AddStageClient
                  stageId={stage.id}
                  opportunityId={opportunityId}
                  preFilledStageId={stage.id}
                />
              )}
              {stage?.StageClient?.filter(el => !el.archived).map((elem) => (
                <div key={elem.id} className="stage-client-container">
                  <OpportunityCard
                    opportunity={elem?.Client}
                    onDragStart={(event) =>
                      handleDragStart(event, elem, stage, index)
                    }
                  />
                  <FiMessageSquare onClick={() => handleToggleCommentForm(elem.id)} />
                  {/* Passer l'ID du stage client sélectionné au composant AddCommentForm */}
                  {selectedStageClientId === elem.id && showCommentForm && (
                    <div className="comment-form-popup">
                      <AddCommentForm stageClientId={elem.id} />
                      <button onClick={handleCloseCommentForm}>Fermer</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div className="stage new-stage">
            <FiPlus onClick={handleToggleAddStageForm} />
            {showAddStageForm && <AddStage opportuniteId={opportunityId} />}
          </div>
        </div>
      </div>

      {showChat && (
        <div className="d-flex">
          <AlignItemsList
            opportunityId={opportunityId}
            setSelectedClient={setSelectedClient}
          />
          <Chat selectedClient={selectedClient} opportunityId={opportunityId}/>
        </div>
      )}
    </div>
  );
};

export default ViewOpportunity;
