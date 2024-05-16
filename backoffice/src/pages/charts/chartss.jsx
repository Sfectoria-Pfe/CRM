import React, { Component, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTools,
  faUser,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import CanvasJSReact from "@canvasjs/react-charts";
import Charts1 from "./chartss2";
import Charts2 from "./chartss3";
import Chartss4 from "./charts4";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../store/services";
import { fetchClients } from "../../store/client";
import { fetchOpportunites } from "../../store/opportunite";
import { fetchCategories } from "../../store/categorieClient";
import { fetchStage_clients } from "../../store/stage_client";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Charts() {
  const services = useSelector((state) => state.service?.services.items);
  const clients = useSelector((state) => state.client?.clients.items);
  const  stageClient = useSelector((state) => state.stage_client?.stage_clients.items);
  const opportunites = useSelector(
    (state) => state.opportunite?.opportunites.items
  );
  console.log(clients, "clients");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchClients());
    dispatch(fetchOpportunites());
    dispatch(fetchStage_clients());
  }, []);
const fideleClient = clients.filter((elem)=>elem?.categorie?.nom ==="Fidele")
const nouveauClient = clients.filter((elem)=>elem?.categorie?.nom ==="Nouveau")
const perduClient = clients.filter((elem)=>elem?.categorie?.nom ==="Perdu")
console.log(perduClient.length ,"perduClient "); 
console.log(nouveauClient.length ,"nouveauClient "); 
console.log(nouveauClient.length ,"nouveauClient "); 
console.log(stageClient ,"stageClient"); 


  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "analyse de client",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: true,
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: fideleClient.length, label: "Fidèle" },
          { y: nouveauClient.length, label: "Nouveau" },
          { y: perduClient.length, label: "Client perdu" },
     
        ],
      },
    ],
  };

  return (
    <div>
      <div className="d-flex justify-content-around gap-3">
        <div
          className="custom-bg shadow text-center col p-5 rounded"
          style={{
            background: "linear-gradient(to bottom right, #007bff, #ffffff)",
            boxShadow: "0 0 20px rgba(0, 0, 255, 0.5)",
          }}
        >
          <FontAwesomeIcon icon={faTools} size="2x" />
          <h4>Services</h4>
          <h2>{services.length}</h2>
        </div>

        <div
          className="custom-bg-success shadow text-center col p-5 rounded"
          style={{
            background: "linear-gradient(to bottom right, #28a745, #ffffff)",
            boxShadow: "0 0 20px rgba(40, 167, 69, 0.5)",
          }}
        >
          <FontAwesomeIcon icon={faUser} size="2x" />
          <h4>Clients</h4>
          <h2>{clients.length}</h2>
        </div>

        <div
          className="custom-bg-danger shadow text-center col p-5 rounded"
          style={{
            background: "linear-gradient(to bottom right, #dc3545, #ffffff)",
            boxShadow: "0 0 20px rgba(220, 53, 69, 0.5)",
          }}
        >
          <FontAwesomeIcon icon={faBriefcase} size="2x" />
          <h4>Opportunités</h4>
          <h2>{opportunites.length}</h2>
        </div>
      </div>

      <div style={{ display: "flex", marginBottom: "40px" }}>
        <div style={{ width: "50%", padding: "10px" }}>
          <CanvasJSChart options={options} />
        </div>
        <div style={{ width: "60%", padding: "10px" }}>
          <Charts1 stageClient={stageClient} totalClients={clients}/>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", padding: "10px" }}>
          <Charts2  />
        </div>
        <div style={{ width: "50%", padding: "10px" }}>
          <Chartss4 />
        </div>
      </div>
    </div>
  );
}

export default Charts;
