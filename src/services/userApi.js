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
  if (response.ok) {
    // Status code is OK (e.g., 200)
    Swal.fire({
      title: 'Signedup successfully',
      icon: 'success',
      confirmButtonColor: '#8bf349',
      color: '#06555a',
    }).then((isConfirmed) => {
      window.location.href = './login';
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

// Function to login user and get join date
export const loginUser = async (email, password) => {
  const loginEndpoint = '/user/login';
  const joinDateEndpoint = '/user/joinDate';
  const url = (endpoint) => baseUrl + endpoint;
  // User data to be sent in the request body for login
  const userData = {
    email: email,
    password: password,
  };

  // Login request
  const loginResponse = await fetch(url(loginEndpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const loginData = await loginResponse.json();

  if (loginResponse.ok) {
    window.localStorage.setItem('token', loginData.token);
    const token = window.localStorage.getItem('token');
    window.localStorage.setItem('name', loginData.name);

    // Fetch join date request
    const joinDateResponse = await fetch(url(joinDateEndpoint), {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
      },
    });
    const joinDateData = await joinDateResponse.json();
    if (joinDateResponse.ok) {
      const joinDate = joinDateData.joinDate.split('T')[0];
      // Save the join date to local storage
      window.localStorage.setItem('joinDate', joinDate);

      // Redirect to dashboard
      window.location.href = './dashboard';
    } else {
      // Handle join date request error
      const errorMessage = joinDateData.message;
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorMessage,
        confirmButtonColor: '#8bf349',
        color: '#06555a',
      });
    }
  } else {
    // Handle login request error
    const errorMessage = loginData.message || loginData.errors[0].msg;
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
  const responseData = await response.json();
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
    }).then((isConfirmed) => {
      logOut();
      // Redirect to dashboard
      window.location.href = './dashboard';
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
export const isAuthenticated = () => {
  if (window.localStorage.getItem('token') !== null) {
    return true;
  } else {
    return false;
  }
};
