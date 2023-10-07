import React from 'react';
import Swal from 'sweetalert2';
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
  const addItem = async () => {
    let formValues; // Declare a new variable to store the computed form values
    const { value } = await Swal.fire({
      title: 'Add Item',
      html:
        '<input autocomplete="off" required type="text" id="swal-input1" class="swal2-input" placeholder="Name">' +
        '<input autocomplete="off" required type="number" id="swal-input2" class="swal2-input" placeholder="Price">' +
        '<input autocomplete="off" required type="text" id="swal-input3" class="swal2-input" placeholder="Primary tag">' +
        '<input autocomplete="off" required type="text" id="swal-input4" class="swal2-input" placeholder="Secondary tag">',
      focusConfirm: false,
      confirmButtonColor: '#8bf349',
      showCancelButton: true,
      color: '#06555a',
      inputAttributes: {
        required: 'true',
      },
      preConfirm: () => {
        formValues = [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value,
          document.getElementById('swal-input4').value,
        ];

        // Check if all of the required inputs have a value
        if (!formValues.every((value) => value)) {
          // If not, show an error message and prevent the confirm button from being enabled
          Swal.showValidationMessage(
            'Please fill in all of the required fields.'
          );
          return false;
        }

        // Otherwise, return the form values
        return formValues;
      },
    });

    if (value) {
      Swal.fire({
        title: 'Added successfully!',
        icon: 'success',
        confirmButtonColor: '#8bf349',
        color: '#06555a',
      });
    }
  };

  const deleteItem = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted successfully!',
          icon: 'success',
          confirmButtonColor: '#8bf349',
          color: '#06555a',
        });
      }
    });
  };
  const editItem = async (name, price, tag1, tag2) => {
    let formValues; // Declare a new variable to store the computed form values
    const { value } = await Swal.fire({
      title: 'edit Itme',
      html:
        `<input autocomplete="off" required type="text" id="swal-input1" class="swal2-input" placeholder="${name}">` +
        `<input autocomplete="off"  required type="number"  id="swal-input2" class="swal2-input" placeholder="${price}">` +
        `<input autocomplete="off" required type="text"  id="swal-input3" class="swal2-input" placeholder="${tag1}">` +
        `<input autocomplete="off"  required type="text"  id="swal-input4" class="swal2-input" placeholder="${tag2}">`,
      focusConfirm: false,
      confirmButtonColor: '#8bf349',
      showCancelButton: true,
      color: '#06555a',
      inputAttributes: {
        required: 'true',
      },
      preConfirm: () => {
        formValues = [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value,
          document.getElementById('swal-input4').value,
        ];
        // Check if all of the required inputs have a value
        if (!formValues.every((value) => value)) {
          // If not, show an error message and prevent the confirm button from being enabled
          Swal.showValidationMessage(
            'Please fill in all of the required fields.'
          );
          return false;
        }

        // Otherwise, return the form values
        return formValues;
      },
    });

    if (value) {
      Swal.fire({
        title: 'Eddited successfully!',
        icon: 'success',
        confirmButtonColor: '#8bf349',
        color: '#06555a',
      });
    }
  };
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
                <button onClick={() => deleteItem(record._id)}>
                  <img src={deleteImg} alt="delete" />
                </button>
                <button
                  onClick={() =>
                    editItem(
                      record.product,
                      record.price,
                      record.primaryTag,
                      record.secondaryTag
                    )
                  }
                >
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
      <button className="addItmeBtn H3" onClick={addItem}>
        Add Item
      </button>
    </div>
  );
}

export default Today;
