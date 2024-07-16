const API_URL = 'http://localhost:3131'; // Replace with your actual API base URL

const request = async (endpoint, method = 'GET', data = null) => {
  const url = `${API_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export const get = (endpoint) => request(endpoint);
export const post = (endpoint, data) => request(endpoint, 'POST', data);
export const put = (endpoint, data) => request(endpoint, 'PUT', data);
export const del = (endpoint) => request(endpoint, 'DELETE');
