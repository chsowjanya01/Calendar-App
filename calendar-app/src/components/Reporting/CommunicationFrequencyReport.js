import React, { useEffect, useRef, useState } from 'react';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController } from 'chart.js';
import './ReportingAnalytics.css';

// Register all the necessary components including the controller
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController);

const CommunicationFrequencyReport = () => {
  const chartRef = useRef(null);
  const [communicationData, setCommunicationData] = useState({});
  const [communicationMethods, setCommunicationMethods] = useState([]);

  useEffect(() => {
    const storedCommunications = localStorage.getItem('communications');
    if (storedCommunications) {
      const communications = JSON.parse(storedCommunications);

      const methodFrequency = {};
      const methods = new Set();

      // Count the communication types dynamically
      Object.values(communications).forEach((companyComms) => {
        companyComms.forEach((comm) => {
          methods.add(comm.type);
          methodFrequency[comm.type] = (methodFrequency[comm.type] || 0) + 1;
        });
      });

      setCommunicationData(methodFrequency);
      setCommunicationMethods(Array.from(methods));  // Dynamically get communication methods
    }
  }, []);

  useEffect(() => {
    if (chartRef.current && communicationMethods.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy existing chart instance before creating a new one
      if (Chart.getChart(ctx)) {
        Chart.getChart(ctx).destroy();
      }

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: communicationMethods,  // Dynamically populated labels
          datasets: [
            {
              label: 'Frequency',
              data: communicationMethods.map((method) => communicationData[method] || 0),
              backgroundColor: ['#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#e74c3c'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Communication Frequency',
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [communicationData, communicationMethods]);

  return (
    <div className="chart-container">
      <h2>Communication Frequency Report</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CommunicationFrequencyReport;
