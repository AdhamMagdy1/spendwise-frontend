import React, { useState, useEffect, useLayoutEffect } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import '../assets/styles/components/View.css';
import excel from '../assets/images/Excel.svg';
import { getSpendingInRange } from '../services/spendingApi';

function View() {
  const joinDate = window.localStorage.getItem('joinDate');
  const storedStartDate = window.localStorage.getItem('startDate');
  const storedEndDate = window.localStorage.getItem('endDate');
  const nameUser = window.localStorage.getItem('name');

  const defaultStartDate = new Date(storedStartDate || joinDate);
  const defaultEndDate = new Date(storedEndDate || getTodayDate());

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [data, setData] = useState({ spendingRecords: [] });
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (startDate, endDate) => {
    try {
      const spendingData = await getSpendingInRange(
        startDate.toISOString(),
        endDate.toISOString()
      );
      setData(spendingData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const addSlideAnimation = () => {
    const tagsContainers = document.querySelectorAll('.tags');

    tagsContainers.forEach((tagsContainer) => {
      const tagElements = tagsContainer.querySelectorAll('.tags p');

      tagElements.forEach((tag) => {
        if (tag.textContent.length > 6) {
          tag.style.animation = 'slide 5s linear infinite';
        }
      });
    });
  };
  useEffect(() => {
    // Save the start and end dates to local storage whenever they change
    window.localStorage.setItem('startDate', startDate.toISOString());
    window.localStorage.setItem('endDate', endDate.toISOString());
  }, [startDate, endDate]);

  useEffect(() => {
    getData(startDate, endDate);
  }, [startDate, endDate]);
  useLayoutEffect(() => {
    addSlideAnimation();
  }, [data]);
  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  const total = data.spendingRecords.reduce((accumulator, record) => {
    return accumulator + record.price;
  }, 0);

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
  const downloadDataAsXLSX = () => {
    const dataForXLSX = data.spendingRecords.map((record) => ({
      Date: formatDate(record.date),
      Name: record.product,
      Price: record.price,
      'Primary Tag': record.primaryTag,
      'Secondary Tag': record.secondaryTag,
    }));
    // Add rows at the beginning of the XLSX data
    dataForXLSX.unshift(
      // Row with "SpendWise" + user name
      {
        '': `SpendWise ${nameUser}`,
      },
      // Row with the date range
      {
        '': `Date Range: ${formatDate(startDate)} to ${formatDate(endDate)}`,
      },
      // Row with the total price
      {
        '': `Total Price: $${total}`,
      }
    );

    const ws = XLSX.utils.json_to_sheet(dataForXLSX);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Spending Data');

    // Generate a base64-encoded XLSX data
    const base64data = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

    // Create a data URI from the base64-encoded data
    const dataURI = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64data}`;

    // Create a link element for downloading
    const a = document.createElement('a');
    a.href = dataURI;
    a.download = 'spending_data.xlsx';
    a.click();
  };

  return (
    <div className="contnet">
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
              const selectedDate = new Date(e.target.value);
              setStartDate(
                isValidDate(selectedDate) ? selectedDate : new Date()
              );
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
              const selectedDate = new Date(e.target.value);
              setEndDate(isValidDate(selectedDate) ? selectedDate : new Date());
            }}
          />
        </div>
      </div>

      <div className="view">
        {isLoading ? ( // Show a loading message while data is being fetched
          <p>Loading data...</p>
        ) : data.spendingRecords.length === 0 ? (
          <p>No spending records found.</p>
        ) : (
          <div className="records-list">
            {data.spendingRecords.map((record) => (
              <div className="record P" key={record._id}>
                <p>{formatDate(record.date)}</p>
                <p className="nameP">{record.product}</p>
                <p>${record.price}</p>
                <div className="tags">
                  <div className="t1">
                    <p>{record.primaryTag}</p>
                  </div>
                  <div className="t2">
                    <p>{record.secondaryTag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className='totalAndExcel'>
        <div className="total-price H3">
          <p>
            Total Price: $<span>{total}</span>
          </p>
        </div>
        <img
          src={excel}
          alt="download Excel"
          className="download-button"
          onClick={downloadDataAsXLSX}
        />
        </div>
     
      </div>
    </div>
  );
}

export default View;
