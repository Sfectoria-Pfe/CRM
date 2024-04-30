import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../Style1.css";
import {
  fetchOpportunite,
  fetchOpportunites,
} from "../../../store/opportunite"; 
import OpportunityCard from "../components/card"; 
import { fetchStage_client, updateStage_client } from "../../../store/stage_client";
import { FiPlus } from "react-icons/fi"; 
import AddStageClient from "../../stage-client/AddStage-client";
import AddStage from "../../stage/AddStage";
import Chat from "../../Chats/chat";
import AlignItemsList from "../../Chats/ChatClient"; // Importez le composant AlignItemsList

const ViewOpportunity = () => {
  const { opportunityId } = useParams();
  const [newStageName, setNewStageName] = useState("");
  const [stages, setStages] = useState([]);
  const [showAddStageForm, setShowAddStageForm] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(null);
  const dispatch = useDispatch();
  const opportunity = useSelector((state) => state.opportunite.opportunite);
  const [showChat, setShowChat] = useState(false);

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
    
    dispatch(updateStage_client({ id, stageId: targetStageId })).then((res) => {
      if (!res.error) {
        let aux = [...stages];
        for (let i = 0; i < stages.length; i++) {
          if (stages[i].id === stage.id) {
            aux[i] = {
              ...aux[i],
              StageClient: aux[i].StageClient.filter((elem) => elem.id !== id),
            };
          }
          if (stages[i].id === targetStageId) {
            aux[i] = {
              ...aux[i],
              StageClient: [...aux[i].StageClient, stageClient],
            };
          }
        }
        setStages(aux);
      }
    });
  };

  const handleToggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div>
      <button onClick={handleToggleChat}>Chat</button>

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
                  preFilledStageId={stage.id}
                />
              )}
              {stage?.StageClient?.map((elem) => (
                <OpportunityCard
                  key={elem.id}
                  opportunity={elem?.Client}
                  onDragStart={(event) =>
                    handleDragStart(event, elem, stage, index)
                  }
                />
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
        <div className="chat-and-client-list">
          <Chat />
          <AlignItemsList />
        </div>
      )}
    </div>
  );
};

export default ViewOpportunity;
