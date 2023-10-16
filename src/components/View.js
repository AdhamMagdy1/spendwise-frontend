import React, { useState, useEffect, useLayoutEffect } from 'react';
import '../assets/styles/components/View.css';
import { getSpendingInRange } from '../services/spendingApi';

function View() {
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
      setData(spendingData);
      setIsLoading(false); // Data has been loaded
    } catch (error) {
      setIsLoading(false); // Handle errors by setting isLoading to false
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
        <div className="total-price H3">
          <p>
            Total Price: $<span>{total}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default View;
