import React, { useState, useEffect } from 'react';
import '../assets/styles/components/View.css';
import { getSpendingInRange } from '../services/spendingApi';
function View() {
  const joinDate = window.localStorage.getItem('joinDate');
  const [startDate, setStartDate] = useState(new Date(joinDate));
  const [endDate, setEndDate] = useState(new Date(getTodayDate())); // Set initial value to today's date
  const [data, setData] = useState({ spendingRecords: [] }); // Initialize with an empty array

  const getData = async (startDate, endDate) => {
    try {
      const spendingData = await getSpendingInRange(
        startDate.toISOString(),
        endDate.toISOString()
      );
      console.log(startDate.toISOString(), endDate.toISOString());
      // console.log(spendingData)
      setData(spendingData); // Set the data or initialize with an empty array
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData(startDate, endDate);
    console.log('data received');
  }, [startDate, endDate]);
  function getTodayDate() {
    const today = new Date();
    // const year = today.getFullYear();
    // const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-indexed
    // const day = String(today.getDate()).padStart(2, '0');
    return today.toISOString().split('T')[0];
  }

  const total = data.spendingRecords.reduce((accumulator, record) => {
    return accumulator + record.price;
  }, 0);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="contnet">
      <div className="datePick H3">
        <div>
          <p>From:</p>
          <input
            className="H3"
            type="date"
            value={startDate.toISOString().split('T')[0]} // Format startDate as 'YYYY-MM-DD'
            min={joinDate}
            max={getTodayDate()}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </div>
        <div>
          <p>To:</p>
          <input
            className="H3"
            type="date"
            value={endDate.toISOString().split('T')[0]} // Format endDate as 'YYYY-MM-DD'
            min={startDate.toISOString().split('T')[0]}
            max={getTodayDate()}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        </div>
      </div>
      <div className="view">
        <div className="records-list">
          {data.spendingRecords.length === 0 ? (
            <p>No spending records found.</p>
          ) : (
            data.spendingRecords.map((record) => (
              <div className="record P" key={record._id}>
                {/* Render record details */}
                <p>{formatDate(record.date)}</p>
                <p>{record.product}</p>
                <p>${record.price}</p>
                <div className="tags">
                  <p className="t1">{record.primaryTag}</p>
                  <p className="t2">{record.secondaryTag}</p>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Render the total price */}
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
