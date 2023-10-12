import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../assets/styles/components/Today.css';
import deleteImg from '../assets/images/delete.svg';
import editImg from '../assets/images/edit.svg';
import { getSpendingInRange } from '../services/spendingApi';
import { createNewSpending } from '../services/spendingApi';
import { deleteSpending } from '../services/spendingApi';
import { editSpending } from '../services/spendingApi';

function Today() {
  const today = new Date();
  const isoDate = today.toISOString();
  console.log(isoDate);
  const [data, setData] = useState({ spendingRecords: [] });
  const [isLoading, setIsLoading] = useState(true); // New loading state

  const getData = async (startDate, endDate) => {
    try {
      const spendingData = await getSpendingInRange(startDate, endDate);
      // console.log(spendingData);
      setData(spendingData);
      setIsLoading(false); // Data has been loaded
    } catch (error) {
      // console.error(error);
      setIsLoading(false); // Handle errors by setting isLoading to false
    }
  };

  useEffect(() => {
    getData(isoDate, isoDate);
    console.log(data);
    console.log('data received');
  }, []);

  const editAspeinding = async (id, date, values) => {
    await editSpending(id, date, values);
  };

  const addToSpending = async (date, values) => {
    await createNewSpending(date, values);
  };

  const addItem = async () => {
    let formValues;
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

        if (!formValues.every((value) => value)) {
          Swal.showValidationMessage(
            'Please fill in all of the required fields.'
          );
          return false;
        }

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
        deleteSpending(id);
      }
    });
  };

  const editItem = async (id, name, price, tag1, tag2) => {
    let formValues;
    const { value } = await Swal.fire({
      title: 'edit Item',
      html:
        `<input autocomplete="off" required type="text" id="swal-input1" class="swal2-input" placeholder="NAME" value="${name}">` +
        `<input autocomplete="off" required type="number" id="swal-input2" class="swal2-input" placeholder="PRIcE" value="${name}">` +
        `<input autocomplete="off" required type="text" id="swal-input3" class="swal2-input" placeholder="PRIMARY TAG" value="${name}">` +
        `<input autocomplete="off" required type="text" id="swal-input4" class="swal2-input" placeholder="SECONDARY TAG" value="${name}">`,
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

        if (!formValues.every((value) => value)) {
          Swal.showValidationMessage(
            'Please fill in all of the required fields.'
          );
          return false;
        }

        return formValues;
      },
    });

    if (value) {
      editAspeinding(id, isoDate, formValues);
    }
  };

  const total = data.spendingRecords.reduce((acc, record) => {
    return acc + record.price;
  }, 0);

  return (
    <div className="container">
      <div className="view">
        {isLoading ? (
          <p>loading...</p>
        ) : data.spendingRecords.length === 0 ? (
          <p>No spending records found.</p>
        ) : (
          <div className="records-list">
            {data.spendingRecords.map((record) => (
              <div className="record P" key={record._id}>
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
                        record._id,
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
        )}
        <div className="total-price H3">
          <p>
            Total Price: $<span>{total}</span>
          </p>
        </div>
      </div>
      <button className="addItemBtn H3" onClick={addItem}>
        Add Item
      </button>
    </div>
  );
}

export default Today;
