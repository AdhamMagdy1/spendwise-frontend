import React from 'react';
import '../assets/styles/components/View.css';

function View() {
  const data = {
    spendingRecords: [
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاببببببببببببسبلسيبلسبسس dd dsff adf dsfح',
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
        _id: '651e95e803da9fc5a78fd8b6',
      },
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاح',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95ec03da9fc5a78fd8be',
      },
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاح',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95ef03da9fc5a78fd8c8',
      },
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاح',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95f203da9fc5a78fd8d4',
      },
      {
        date: '2023-04-10T14:00:00.000Z',
        product: 'تفاح',
        price: 10,
        primaryTag: 'Shopping',
        secondaryTag: 'Milk',
        _id: '651e95f403da9fc5a78fd8e2',
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
      <div><p>From:</p><span>01/01/2023</span></div>
       <div><p>to:</p><span>01/01/2023</span></div>
      </div>
      <div className='view'>
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
