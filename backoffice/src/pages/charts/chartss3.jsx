import React, { useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../store/services";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Charts2() {
  const services = useSelector((state) => state.service?.services.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Calculate the number of services per day
  const servicesPerDay = {};
  services.forEach((service) => {
    const date = new Date(service.createdAt); // Assuming 'createdAt' is the property that holds the service creation date
    const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // Format: "YYYY-MM-DD"
    servicesPerDay[day] = (servicesPerDay[day] || 0) + 1;
  });

  // Convert servicesPerDay object to an array of objects
  const dataPoints = Object.entries(servicesPerDay).map(([day, count]) => ({
    label: day,
    y: count,
  }));

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Nombre des services par jours",
    },
    axisY: {
      title: "Nombre des Services",
      includeZero: false,
    },
    data: [
      {
        type: "column",
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

export default Charts2;
