import React, { useState } from 'react';
import '../assets/styles/components/View.css';

function View() {
  const [startDate, setStartDate] = useState(getTodayDate());
  const [endDate, setEndDate] = useState(getTodayDate()); // Set initial value to today's date

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${day}-${month}`;
  }
  function getJoinedDate(){
    return '2023-01-10'
  }

  const data = {
    spendingRecords: [
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاح',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاح',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاح',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاح',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاح',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاح',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاح',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاح',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95e503da9fc5a78fd8b0',
      },
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاح',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95e503da9fc5a78fd8b0',
      },
    ],
  };

  const total = data.spendingRecords.reduce((accumulator, record) => {
    return accumulator + record.price;
  }, 0);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="container">
      <div className="datePick H3">
        <div>
          <p>From:</p>
          <input
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
            type="date"
            value={endDate}
            min={getJoinedDate()}
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
