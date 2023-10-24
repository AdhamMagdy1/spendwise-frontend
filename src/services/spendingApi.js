import Swal from 'sweetalert2';
// Define the API endpoint URL
const baseUrl = process.env.REACT_APP_API_URL;

// Function to get spendings
export const getSpendingInRange = async (startDate, EndDate) => {
  const endpoint = `/spending/spending/range?startDate=${startDate}&endDate=${EndDate}`;
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'GET', // Change the method to GET
    headers: {
      Authorization: `${token}`, // Add the authorization header with the token
    },
  });
  const responseData = await response.json();
  if (response.ok) {
    return responseData;
  } else {
    // Status code is not OK
    const errorMessage = responseData.message; // Use response.statusText for error message

    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};

// Function to create a new speinign record
export const createNewSpending = async (formValues) => {
  const endpoint = '/spending/spending';
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');

  // User data to be sent in the request body
  const userData = {
    date: formValues[4],
    product: formValues[0],
    price: formValues[1],
    primaryTag: formValues[2].trim(),
    secondaryTag: formValues[3].trim(),
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`, // Add the authorization header with the token
    },
    body: JSON.stringify(userData),
  });
  const responseData = await response.json();
  if (response.ok) {
    // Status code is OK (e.g., 200)
    Swal.fire({
      title: 'Added successfully!',
      icon: 'success',
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = './dashboard';
      }
    });
  } else {
    // Status code is not OK
    const errorMessage = responseData.message || responseData.errors[0].msg;

    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};

// Function to create a new speinign record
export const deleteSpending = async (id) => {
  const endpoint = `/spending/spending/${id}`;
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `${token}`, // Add the authorization header with the token
    },
  });
  const responseData = await response.json();
  if (response.ok) {
    // Status code is OK (e.g., 200)
    Swal.fire({
      title: 'Deleted successfully!',
      icon: 'success',
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = './dashboard';
      }
    });
  } else {
    // Status code is not OK
    const errorMessage = responseData.message || responseData.errors[0].msg;

    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};

// Function to create a new speinign record
export const editSpending = async (id, date, formValues) => {
  const endpoint = `/spending/spending/${id}`;
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');

  // User data to be sent in the request body
  const userData = {
    date: date,
    product: formValues[0],
    price: formValues[1],
    primaryTag: formValues[2].trim(),
    secondaryTag: formValues[3].trim(),
  };
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`, // Add the authorization header with the token
    },
    body: JSON.stringify(userData),
  });
  const responseData = await response.json();
  if (response.ok) {
    // Status code is OK (e.g., 200)
    Swal.fire({
      title: 'Edited successfully!',
      icon: 'success',
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = './dashboard';
      }
    });
  } else {
    // Status code is not OK
    const errorMessage = responseData.message || responseData.errors[0].msg;

    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};
