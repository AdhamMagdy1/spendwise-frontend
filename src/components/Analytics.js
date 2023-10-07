import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import { Line, Pie } from 'react-chartjs-2';
import ChartDeferred from 'chartjs-plugin-deferred';
import '../assets/styles/components/Analytics.css';

function Analytics() {
  Chart.register(ChartDeferred);
  Chart.defaults.font.family = 'Poppins';
  Chart.defaults.color = '#06555a';
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
        date: '2023-05-01T14:00:00.000Z',
        product: 'Appels and oranges and some groceries form the supermarket',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Coffe',
        _id: '951e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-02T14:00:00.000Z',
        product: 'تفاح',
        price: 20,
        primaryTag: 'Shopping',
        secondaryTag: 'Coffe',
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
        primaryTag: 'College',
        secondaryTag: 'Coffe',
        _id: '651e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-05T14:00:00.000Z',
        product: 'تفاح',
        price: 30,
        primaryTag: 'College',
        secondaryTag: 'Milk',
        _id: '551e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-06T14:00:00.000Z',
        product: 'تفاح',
        price: 20,
        primaryTag: 'College',
        secondaryTag: 'Vegetables',
        _id: '451e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-07T14:00:00.000Z',
        product: 'تفاح',
        price: 50,
        primaryTag: 'College',
        secondaryTag: 'Vegetables',
        _id: '351e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-08T14:00:00.000Z',
        product: 'تفاح',
        price: 100,
        primaryTag: 'Bils',
        secondaryTag: 'Vegetables',
        _id: '251e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-08T14:00:00.000Z',
        product: 'تفاح',
        price: 80,
        primaryTag: 'Bils',
        secondaryTag: 'Vegetables',
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
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            color: 'blue',
            family: 'Poppins',
            size: 14,
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
            size: 10,
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

  const primaryTagPrices = {};
  const secondaryTagPrices = {};

  data.spendingRecords.forEach((record) => {
    if (record.primaryTag) {
      primaryTagPrices[record.primaryTag] =
        (primaryTagPrices[record.primaryTag] || 0) + record.price;
    }

    if (record.secondaryTag) {
      secondaryTagPrices[record.secondaryTag] =
        (secondaryTagPrices[record.secondaryTag] || 0) + record.price;
    }
  });
  const primaryTagData = {
    labels: Object.keys(primaryTagPrices),
    datasets: [
      {
        data: Object.values(primaryTagPrices),
        backgroundColor: [
          '#EAE509',
          '#7DCE13',
          '#5BB318',
          '#2B7A0B',
          '#A8DF8E',
        ],
        borderColor: '#f1ffe9',
      },
    ],
  };

  const secondaryTagData = {
    labels: Object.keys(secondaryTagPrices),
    datasets: [
      {
        data: Object.values(secondaryTagPrices),
        backgroundColor: [
          '#EAE509',
          '#7DCE13',
          '#5BB318',
          '#2B7A0B',
          '#A8DF8E',
        ],
        borderColor: '#f1ffe9',
      },
    ],
  };

  const primaryPieChartOptions = {
    // maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Spendings by primary tags',
        color: '#06555a',
        position: 'top',
        align: 'center',
        font: {
          family: 'Poppins',
          size: 14,
          weight: 'bold',
        },
        padding: 8,
        fullSize: true,
      },
    },
  };
  const secondaryPieChartOptions = {
    // maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Spendings by secondary tags',
        color: '#06555a',
        position: 'top',
        align: 'center',
        font: {
          family: 'Poppins',
          size: 14,
          weight: 'bold',
        },
        padding: 8,
        fullSize: true,
      },
    },
  };
  return (
    <div className="All">
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
        <Pie data={primaryTagData} options={primaryPieChartOptions} />
      </div>
      <div className="chart-container">
        <Pie data={secondaryTagData} options={secondaryPieChartOptions} />
      </div>
    </div>
  );
}

export default Analytics;
