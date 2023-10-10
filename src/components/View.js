import React, { useState } from 'react';
import '../assets/styles/components/View.css';

function View() {
  const joinDate = window.localStorage.getItem('joinDate');
  const [startDate, setStartDate] = useState(joinDate);
  const [endDate, setEndDate] = useState(getTodayDate()); // Set initial value to today's date

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${day}-${month}`;
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
            value={startDate}
            min={joinDate}
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
            min={startDate}
            max={getTodayDate()}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="view">
        <div className="records-list">
          {data.spendingRecords.map((record) => (
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
          ))}
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
