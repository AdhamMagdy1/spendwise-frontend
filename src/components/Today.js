import React from 'react';
import '../assets/styles/components/Today.css';
import deleteImg from '../assets/images/delete.svg';
import editImg from '../assets/images/edit.svg';
function Today() {
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
