import Swal from 'sweetalert2';
// Define the API endpoint URL
const baseUrl = process.env.REACT_APP_API_URL;

// Function to register a new user
export const registerUser = async (name, email, password) => {
  const endpoint = '/user/signup';
  const url = baseUrl + endpoint;

  // User data to be sent in the request body
  const userData = {
    name: name,
    email: email,
    password: password,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const responseData = await response.json();
  console.log(responseData);
  if (response.ok) {
    // Status code is OK (e.g., 200)
    Swal.fire({
      title: 'Signedup successfully',
      icon: 'success',
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = './login';
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

// Function to login  user
export const loginUser = async (email, password) => {
  const endpoint = '/user/login';
  const url = baseUrl + endpoint;

  // User data to be sent in the request body
  const userData = {
    email: email,
    password: password,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const responseData = await response.json();
  console.log(responseData);
  if (response.ok) {
    window.localStorage.setItem('token', responseData.token);
    window.location.href = './dashboard';
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

// Function to get  userbudget
export const getBudget = async () => {
  const endpoint = '/user/budget/current';
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'GET', // Change the method to GET
    headers: {
      Authorization: `${token}`, // Add the authorization header with the token
    },
  });

  if (response.ok) {
    const responseData = await response.json();
    console.log(responseData);
    return responseData.currentBudget;
  } else {
    console.log(registerUser.json());
    // Status code is not OK
    const errorMessage = response.statusText; // Use response.statusText for error message

    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};

export const setBudget = async (budget) => {
  const endpoint = '/user/budget';
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');

  // User data to be sent in the request body
  const userData = {
    currentBudget: Number(budget),
  };
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(userData),
  });
  const responseData = await response.json();
  console.log(responseData);
  if (response.ok) {
    return responseData.currentBudget;
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
export const logOut = () => {
  window.localStorage.clear();
};

export const getJoinDate = async () => {
  const endpoint = '/user/joinDate';
  const url = baseUrl + endpoint;
  const token = window.localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'GET', // Change the method to GET
    headers: {
      Authorization: `${token}`, // Add the authorization header with the token
    },
  });

  if (response.ok) {
    const responseData = await response.json();
    console.log(responseData);
    return responseData.joinDate;
  } else {
    console.log(response.json());
    // Status code is not OK
    const errorMessage = response.statusText; // Use response.statusText for error message

    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: errorMessage,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    });
  }
};