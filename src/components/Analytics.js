import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import '../assets/styles/components/Analytics.css';

function Analytics() {
  Chart.defaults.font.family = 'Poppins';
  const [startDate, setStartDate] = useState(getTodayDate());
  const [endDate, setEndDate] = useState(getTodayDate()); // Set initial value to today's date
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${day}-${month}`;
  }
  function getJoinedDate() {
    return '2023-01-10';
  }
  const data = {
    spendingRecords: [
      {
        date: '2023-04-01T14:00:00.000Z',
        product: 'Appels and oranges and some groceries form the supermarket',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '951e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-02T14:00:00.000Z',
        product: 'تفاح',
        price: 20,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '851e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-03T14:00:00.000Z',
        product: 'تفاح',
        price: 30,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '751e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-04T14:00:00.000Z',
        product: 'تفاح',
        price: 40,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-05T14:00:00.000Z',
        product: 'تفاح',
        price: 30,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '551e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-06T14:00:00.000Z',
        product: 'تفاح',
        price: 20,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '451e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-07T14:00:00.000Z',
        product: 'تفاح',
        price: 50,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '351e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-08T14:00:00.000Z',
        product: 'تفاح',
        price: 100,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '251e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-08T14:00:00.000Z',
        product: 'تفاح',
        price: 80,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '151e95e503da9fc5a78fd8b0',
      },
    ],
  };

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const dateToPriceMap = {};

  data.spendingRecords.forEach((record) => {
    dateToPriceMap[formatDate(record.date)] = record.price;
  });

  const labels = Object.keys(dateToPriceMap).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const dataForChart = labels.map((date) => dateToPriceMap[date]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Spending Over Days',
        backgroundColor: '#8bf349',
        borderColor: '#8bf349',
        data: dataForChart,
        lineTension: 0.4,
      },
    ],
  };

  // Customize Chart.js options
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            family: 'Poppins',
            size: 16,
            weight: 'bold',
          },
        },
      },
    },

    fill: {
      target: 'origin',
      above: '#d6ffbc', // Area will be red above the origin
      below: 'rgb(0, 0, 255)', // And blue below the origin
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Poppins',
            size: 14,
            weight: 'normal',
          },
        },
        grid: {
          display: false, // Hide grid lines for X-axis
        },
      },
      y: {
        ticks: {
          font: {
            family: 'Poppins',
            size: 14,
            weight: 'normal',
          },
        },
        beginAtZero: true, // Start Y-axis at 0
        max: 100, // Set max Y-axis value to 100
        grid: {
          display: false, // Hide grid lines for Y-axis
        },
      },
    },
  };

  return (
    <div className="container">
      <div className="datePick H3">
        <div>
          <p>From:</p>
          <input
            className="H3"
            type="date"
            value={startDate}
            min={getJoinedDate()}
            max={getTodayDate()}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <p>To:</p>
          <input
            className="H3"
            type="date"
            value={endDate}
            min={getJoinedDate()}
            max={getTodayDate()}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Analytics;
