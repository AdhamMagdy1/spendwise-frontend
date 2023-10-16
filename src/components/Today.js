import React, { useEffect, useState, useLayoutEffect } from 'react';
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
  const [data, setData] = useState({ spendingRecords: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isAddItemLoading, setIsAddItemLoading] = useState(false);
  const [isEditItemLoading, setIsEditItemLoading] = useState(false);
  const [isDeleteItemLoading, setIsDeleteItemLoading] = useState(false);

  const getData = async (startDate, endDate) => {
    try {
      const spendingData = await getSpendingInRange(startDate, endDate);
      setData(spendingData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(isoDate, isoDate);
  }, []);

  useLayoutEffect(() => {
    addSlideAnimation();
  }, [data]);

  const editAspending = async (id, date, values) => {
    setIsEditItemLoading(true);

    try {
      await editSpending(id, date, values);
    } finally {
      setIsEditItemLoading(false);
    }
  };

  const addToSpending = async (values) => {
    setIsAddItemLoading(true);

    try {
      await createNewSpending(values);
    } finally {
      setIsAddItemLoading(false);
    }
  };

  const addItem = async () => {
    if (isAddItemLoading) {
      return;
    }

    let formValues;
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    const joinDate = window.localStorage.getItem('joinDate');

    const { value } = await Swal.fire({
      title: 'Add Item',
      html:
        '<input autocomplete="off" required type="text" id="swal-input1" class="swal2-input" placeholder="Name">' +
        '<input autocomplete="off" required type="number" id="swal-input2" class="swal2-input" placeholder="Price">' +
        '<input autocomplete="off" required type="text" id="swal-input3" class="swal2-input" placeholder="Primary tag">' +
        '<input autocomplete="off" required type="text" id="swal-input4" class="swal2-input" placeholder="Secondary tag">' +
        '<input type="date" id="swal-input5" class="swal2-input" value="' +
        todayFormatted +
        '" min="' +
        joinDate +
        '" max="' +
        todayFormatted +
        '">',
      focusConfirm: true,
      focusCancel: false,
      confirmButtonColor: '#8bf349',
      showCancelButton: true,
      inputAutoFocus: false,
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

        const selectedDate = document.getElementById('swal-input5').value;
        const dateObject = new Date(selectedDate);

        if (!formValues.every((value) => value)) {
          Swal.showValidationMessage(
            'Please fill in all of the required fields.'
          );
          return false;
        }

        if (!selectedDate || isNaN(dateObject)) {
          formValues.push(todayFormatted);
        } else {
          formValues.push(selectedDate);
        }

        return formValues;
      },
    });

    if (value) {
      addToSpending(formValues);
    }
  };

  const deleteItem = async (id) => {
    if (isDeleteItemLoading) {
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDeleteItemLoading(true);

        try {
          await deleteSpending(id);
        } finally {
          setIsDeleteItemLoading(false);
        }
      }
    });
  };

  const editItem = async (id, name, price, tag1, tag2) => {
    if (isEditItemLoading) {
      return;
    }

    let formValues;
    const { value } = await Swal.fire({
      title: 'edit Item',
      html:
        `<input autocomplete="off" required type="text" id="swal-input1" class="swal2-input" placeholder="NAME" value="${name}">` +
        `<input autocomplete="off" required type="number" id="swal-input2" class="swal2-input" placeholder="PRICE" value="${price}">` +
        `<input autocomplete="off" required type="text" id="swal-input3" class="swal2-input" placeholder="PRIMARY TAG" value="${tag1}">` +
        `<input autocomplete="off" required type="text" id="swal-input4" class="swal2-input" placeholder="SECONDARY TAG" value="${tag2}">`,
      focusConfirm: true,
      focusCancel: false,
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
      editAspending(id, isoDate, formValues);
    }
  };

  const total = data.spendingRecords.reduce((acc, record) => {
    return acc + record.price;
  }, 0);

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
                <div className="actions">
                  <button
                    onClick={() => deleteItem(record._id)}
                    disabled={isDeleteItemLoading}
                  >
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
                    disabled={isEditItemLoading}
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
      <button
        className="addItemBtn H3"
        onClick={addItem}
        disabled={isAddItemLoading}
      >
        {isAddItemLoading ? 'Loading...' : 'Add Item'}
      </button>
    </div>
  );
}

export default Today;
