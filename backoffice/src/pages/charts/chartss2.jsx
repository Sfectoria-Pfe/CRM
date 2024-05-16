import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts1 extends Component {
  constructor(props) {
    super(props);
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }

  toggleDataSeries(e) {
    const { dataSeries } = e;
    if (typeof dataSeries.visible === "undefined" || dataSeries.visible) {
      dataSeries.visible = false;
    } else {
      dataSeries.visible = true;
    }
    this.chart.render();
  }

  getMonthlyWinData(stageClient, winStatus) {
    const filteredData = stageClient.filter((data) => data.win === winStatus);
    const monthlyWins = {};
    filteredData.forEach((data) => {
      const month = new Date(data.createdAt).toLocaleString('en', { month: 'short' });
      if (monthlyWins[month]) {
        monthlyWins[month]++;
      } else {
        monthlyWins[month] = 1;
      }
    });
    const dataPoints = Object.entries(monthlyWins).map(([label, y]) => ({ label, y }));
    return dataPoints;
  }

  render() {
    const { totalClients, stageClient } = this.props;
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Analyse de clients gagnés ",
        fontFamily: "verdana"
      },
      axisY: {
        title: `Nombre de  clients au total`,
        minimum: 0, // Set the minimum value for Y-axis to 0
        maximum: totalClients.length , // Adjust the maximum value based on totalClients
        interval: Math.ceil((totalClients + 5) / 5), // Calculate interval dynamically
        includeZero: true,
        prefix: "",
        suffix: "",
        labelFormatter: function (e) {
          return e.value.toLocaleString()}}, // Format the Y-axis labels to show real number of clients
      toolTip: {
        shared: true,
        reversed: true
      },
      legend: {
        verticalAlign: "center",
        horizontalAlign: "right",
        reversed: true,
        cursor: "pointer",
        itemclick: this.toggleDataSeries
      },
      data: [
        {
          type: "stackedColumn",
          name: "gagnés",
          showInLegend: true,
          yValueFormatString: "#,###k",
          dataPoints: this.getMonthlyWinData(this.props.stageClient, true)
        },
        {
          type: "stackedColumn",
          name: "perdus",
          showInLegend: true,
          yValueFormatString: "#,###k",
          dataPoints: this.getMonthlyWinData(this.props.stageClient, false)
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart options={options} onRef={ref => this.chart = ref} />
      </div>
    );
  }
}

export default Charts1;