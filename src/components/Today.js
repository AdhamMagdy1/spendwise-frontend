import React from 'react';
import '../assets/styles/components/Today.css';
import deleteImg from '../assets/images/delete.svg';
import editImg from '../assets/images/edit.svg';
function Today() {
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

  return (
    <div className="container">
      <div className="view">
        <div className="records-list">
          {data.spendingRecords.map((record) => (
            <div className="record P" key={record._id}>
              {/* Render record details */}
              <p>{record.product}</p>
              <p>${record.price}</p>
              <div className="tags">
                <p className="t1">{record.primaryTag}</p>
                <p className="t2">{record.secondaryTag}</p>
              </div>
              <div className="actions">
                {' '}
                <button>
                  <img src={deleteImg} alt="delete" />
                </button>
                <button>
                  <img src={editImg} alt="edit" />
                </button>
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
      <button className="addItmeBtn H3">Add Item</button>
    </div>
  );
}

export default Today;
