import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../assets/styles/components/Today.css';
import deleteImg from '../assets/images/delete.svg';
import editImg from '../assets/images/edit.svg';
import { getSpendingInRange } from '../services/spendingApi';
import { createNewSpending } from '../services/spendingApi';
function Today() {
  const today = new Date();
  const isoDate = today.toISOString();
  console.log(isoDate);
  const [data, setData] = useState({ spendingRecords: [] }); // Initialize with an empty array

  const getData = async (startDate, endDate) => {
    try {
      const spendingData = await getSpendingInRange(startDate, endDate);
      // console.log(spendingData)
      setData(spendingData); // Set the data or initialize with an empty array
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData(isoDate, isoDate);
    console.log('data received');
  }, []);

  const addToSpending = async (date, values) => {
    await createNewSpending(date, values);
  };

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
      addToSpending(isoDate, formValues);
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
  const total = data.spendingRecords.reduce((acc, record) => {
    return acc + record.price;
  }, 0);
  return (
    <div className="container">
      <div className="view">
        <div className="records-list">
          {data.spendingRecords.length === 0 ? (
            <p>No spending records found.</p>
          ) : (
            data.spendingRecords.map((record) => (
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
      <button className="addItmeBtn H3" onClick={addItem}>
        Add Item
      </button>
    </div>
  );
}

export default Today;
