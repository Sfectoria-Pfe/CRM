import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpportunites } from "../../store/opportunite";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Chartss4() {
  const opportunites = useSelector((state) => state.opportunite?.opportunites.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOpportunites());
  }, [dispatch]);

  // Calculate the number of opportunities per day
  const opportunitesPerDay = {};
  opportunites.forEach((opportunite) => {
    const date = new Date(opportunite.createdAt); // Assuming 'createdAt' is the property that holds the opportunity creation date
    const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // Format: "YYYY-MM-DD"
    opportunitesPerDay[day] = (opportunitesPerDay[day] || 0) + 1;
  });

  // Convert opportunitesPerDay object to an array of objects
  const dataPoints = Object.entries(opportunitesPerDay).map(([day, count]) => ({
    x: new Date(day), // Convertir la chaîne de date en objet Date
    y: count,
  }));

  const options = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Nombre d'opportunités par jour",
    },
    axisX: {
      title: "Date",
      valueFormatString: "DD MMM YYYY",
    },
    axisY: {
      title: "Nombre d'opportunités",
      includeZero: false,
    },
    data: [
      {
        type: "area",
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default Chartss4;
