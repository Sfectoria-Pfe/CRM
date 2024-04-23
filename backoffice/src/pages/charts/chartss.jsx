import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import Charts1 from './chartss2';
import Charts2 from './chartss3';
import Chartss4 from './charts4';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends Component {
  render() {
    const options = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Charts"
      },
      data: [{
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: true,
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 18, label: "Direct" },
          { y: 49, label: "Organic Search" },
          { y: 9, label: "Paid Search" },
          { y: 5, label: "Referral" },
          { y: 19, label: "Social" }
        ]
      }]
    };

    return (
      <div>
        <div style={{ display: 'flex', marginBottom: '40px' }}> {/* Ajout de marges en bas pour séparer les rangées de graphiques */}
          <div style={{ width: '50%', padding: '10px' }}>
            <CanvasJSChart options={options} />
          </div>
          <div style={{ width: '60%', padding: '10px' }}>
            <Charts1 />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%', padding: '10px' }}>
            <Charts2 />
          </div>
          <div style={{ width: '50%', padding: '10px' }}>
            <Chartss4 />
          </div>
        </div>
      </div>
    );
  }
}

export default Charts;
