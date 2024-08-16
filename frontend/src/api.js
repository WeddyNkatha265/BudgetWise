const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Function to fetch data from the server (GET request)
export async function fetchData(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

// Function to post data to the server (POST request)
export async function postData(endpoint, data) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add data');
    }

    return response.json();
  } catch (error) {
    console.error('Error in postData:', error); // Log error for debugging
    throw error; // Rethrow error to be handled in the calling code
  }
}
// Function to update data on the server (PUT request)
export async function updateData(endpoint, id, data) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: 'PUT', // Or use PATCH if the API supports partial updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    return response.json();
  } catch (error) {
    console.error('Error in updateData:', error);
    throw error;
  }
}



// Function to delete data from the server (DELETE request)
export async function deleteData(endpoint, id) {
  await fetch(`${API_URL}/${endpoint}/${id}`, {
    method: 'DELETE',
  });
}
