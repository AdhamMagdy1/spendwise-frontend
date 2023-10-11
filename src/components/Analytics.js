import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line, Pie } from 'react-chartjs-2';
import ChartDeferred from 'chartjs-plugin-deferred';
import '../assets/styles/components/Analytics.css';
import { getSpendingInRange } from '../services/spendingApi';

function Analytics() {
  Chart.register(ChartDeferred);
  Chart.defaults.font.family = 'Poppins';
  Chart.defaults.color = '#06555a';
  const joinDate = window.localStorage.getItem('joinDate');
  const [startDate, setStartDate] = useState(new Date(joinDate));
  const [endDate, setEndDate] = useState(new Date(getTodayDate()));
  const [data, setData] = useState({ spendingRecords: [] });
  const [isLoading, setIsLoading] = useState(true); // New loading state

  const getData = async (startDate, endDate) => {
    try {
      const spendingData = await getSpendingInRange(
        startDate.toISOString(),
        endDate.toISOString()
      );
      console.log(startDate.toISOString(), endDate.toISOString());
      setData(spendingData);
      setIsLoading(false); // Data has been loaded
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Handle errors by setting isLoading to false
    }
  };

  useEffect(() => {
    getData(startDate, endDate);
    console.log('data received');
  }, [startDate, endDate]);

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
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
        // max: 100, // Set max Y-axis value to 100
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
  function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }
  return (
    <div className="All">
      <div className="datePick H3">
        <div>
          <p>From:</p>
          <input
            className="H3"
            type="date"
            value={startDate.toISOString().split('T')[0]}
            min={joinDate}
            max={getTodayDate()}
            onChange={(e) => {
              const selctedDate = new Date(e.target.value);
              setStartDate(isValidDate(selctedDate) ? selctedDate : new Date());
            }}
          />
        </div>
        <div>
          <p>To:</p>
          <input
            className="H3"
            type="date"
            value={endDate.toISOString().split('T')[0]}
            min={startDate.toISOString().split('T')[0]}
            max={getTodayDate()}
            onChange={(e) => {
              const selctedDate = new Date(e.target.value);
              setEndDate(isValidDate(selctedDate) ? selctedDate : new Date());
            }}
          />
        </div>
      </div>
      <div className="charts">
        {isLoading ? ( // Show a loading message while data is being fetched
          <p>Loading data...</p>
        ) : data.spendingRecords.length === 0 ? (
          <p>No spending records found.</p>
        ) : (
          <>
            <div className="chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>
            <div className="chart-container">
              <Pie data={primaryTagData} options={primaryPieChartOptions} />
            </div>
            <div className="chart-container">
              <Pie data={secondaryTagData} options={secondaryPieChartOptions} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Analytics;
