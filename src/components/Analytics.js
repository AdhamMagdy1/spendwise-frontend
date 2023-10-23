import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line, Pie, Bar } from 'react-chartjs-2';
import ChartDeferred from 'chartjs-plugin-deferred';
import '../assets/styles/components/Analytics.css';
import { getSpendingInRange } from '../services/spendingApi';

function Analytics() {
  Chart.register(ChartDeferred);
  Chart.defaults.font.family = 'Poppins';
  Chart.defaults.color = '#06555a';
  const joinDate = window.localStorage.getItem('joinDate');

  // Retrieve start and end dates from local storage, or set defaults
  const storedStartDate = window.localStorage.getItem('startDate');
  const storedEndDate = window.localStorage.getItem('endDate');
  const defaultStartDate = new Date(storedStartDate || joinDate);
  const defaultEndDate = new Date(storedEndDate || getTodayDate());

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [data, setData] = useState({ spendingRecords: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [tagType, setTagType] = useState('secondary');
  const getData = async (startDate, endDate) => {
    try {
      const spendingData = await getSpendingInRange(
        startDate.toISOString(),
        endDate.toISOString()
      );
      setData(spendingData);
      setIsLoading(false); // Data has been loaded
    } catch (error) {
      setIsLoading(false); // Handle errors by setting isLoading to false
    }
  };

  useEffect(() => {
    getData(startDate, endDate);
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
    const formattedDate = formatDate(record.date);
    if (dateToPriceMap[formattedDate]) {
      dateToPriceMap[formattedDate] += record.price;
    } else {
      dateToPriceMap[formattedDate] = record.price;
    }
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

  const pieTagData = {
    labels:
      tagType === 'primary'
        ? Object.keys(primaryTagPrices)
        : Object.keys(secondaryTagPrices),
    datasets: [
      {
        data:
          tagType === 'primary'
            ? Object.values(primaryTagPrices)
            : Object.values(secondaryTagPrices),
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
  const PieChartOptions = {
    // maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Spendings by ${tagType} tags`,
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

  const uniqueTagsAndTotalPriceByTag = [];
  // Loop through the array of objects.
  data.spendingRecords.forEach((object) => {
    // Get the tag based on the tag type.
    const tag = tagType === 'primary' ? object.primaryTag : object.secondaryTag;

    // Get the other tag.
    const otherTag =
      tagType === 'primary' ? object.secondaryTag : object.primaryTag;

    // Get the price.
    const price = object.price;

    // If the tag does not exist in the new object, create a new object for it.
    if (!uniqueTagsAndTotalPriceByTag.hasOwnProperty(tag)) {
      uniqueTagsAndTotalPriceByTag[tag] = {};
    }

    // If the other tag does not exist in the object for the tag, create a new property for it.
    if (!uniqueTagsAndTotalPriceByTag[tag].hasOwnProperty(otherTag)) {
      uniqueTagsAndTotalPriceByTag[tag][otherTag] = 0;
    }

    // Add the price to the total price for the other tag.
    uniqueTagsAndTotalPriceByTag[tag][otherTag] += price;
  });

  function generateChartData(inputData) {
    // Extract labels (main categories) from the input data
    const labels = Object.keys(inputData);
    const subLabels = new Set();

    // Create an array to store the data for each sub-label
    const subLabelData = {};

    // Loop through the input data to collect sub-labels and their data
    for (const label of labels) {
      const subCategories = Object.keys(inputData[label]);
      for (const subCategory of subCategories) {
        subLabels.add(subCategory);
        if (!subLabelData[subCategory]) {
          subLabelData[subCategory] = Array(labels.length).fill(0);
        }
        subLabelData[subCategory][labels.indexOf(label)] =
          inputData[label][subCategory];
      }
    }

    // Generate random colors for the datasets
    const backgroundColors = Array.from({ length: subLabels.size }, () =>
      getRandomColor()
    );

    // Create the datasets
    const datasets = Array.from(subLabels).map((subLabel, index) => {
      return {
        label: subLabel,
        data: subLabelData[subLabel],
        backgroundColor: backgroundColors[index],
      };
    });

    return {
      labels: labels,
      datasets: datasets,
    };
  }

  function getRandomColor() {
    const colors = [
      '#00FFFF',
      '#7FFFD4',
      '#454B1B',
      '#088F8F',
      '#AAFF00',
      '#5F9EA0',
      '#097969',
      '#AFE1AF',
      '#DFFF00',
      '#E4D00A',
      '#00FFFF',
      '#023020',
      '#7DF9FF',
      '#50C878',
      '#5F8575',
      '#4F7942',
      '#228B22',
      '#7CFC00',
      '#008000',
      '#355E3B',
      '#00A36C',
      '#2AAA8A',
      '#4CBB17',
      '#90EE90',
      '#32CD32',
      '#478778',
      '#0BDA51',
      '#98FB98',
      '#8A9A5B',
      '#0FFF50',
      '#ECFFDC',
      '#808000',
      '#C1E1C1',
      '#C9CC3F',
      '#B4C424',
      '#93C572',
      '#96DED1',
      '#8A9A5B',
      '#2E8B57',
      '#9FE2BF',
      '#009E60',
      '#00FF7F',
      '#008080',
      '#40E0D0',
      '#C4B454',
      '#40B5AD',
      '#40826D',
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const thedata = generateChartData(uniqueTagsAndTotalPriceByTag);
  console.log(thedata);
  const barchartData = {
    labels: thedata.labels,
    datasets: thedata.datasets,
  };

  const barchartOptions = {
    type: 'bar',
    plugins: {
      title: {
        display: false,
        text: 'Stacked Bar Chart',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // Function to toggle the tag type
  const toggleTagType = () => {
    setTagType(tagType === 'primary' ? 'secondary' : 'primary');
  };
  useEffect(() => {
    // Save the start and end dates to local storage whenever they change
    window.localStorage.setItem('startDate', startDate.toISOString());
    window.localStorage.setItem('endDate', endDate.toISOString());
  }, [startDate, endDate]);
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
              <Pie data={pieTagData} options={PieChartOptions} />
            </div>
            <div className="chart-container">
              <Bar data={barchartData} options={barchartOptions} />
            </div>
          </>
        )}
        <button className="switch H3" onClick={toggleTagType}>
          Switch Tags
        </button>
      </div>
    </div>
  );
}

export default Analytics;
