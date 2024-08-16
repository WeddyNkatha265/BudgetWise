const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Function to fetch data from the server (GET request)
export async function fetchData(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch data'); // Handle error if request fails
  }

  return response.json(); // Return parsed JSON data
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
      throw new Error('Failed to add data'); // Handle error if request fails
    }

    return response.json(); // Return parsed JSON data
  } catch (error) {
    console.error('Error in postData:', error); // Log error for debugging
    throw error; // Rethrow error to be handled in the calling code
  }
}

// Function to update data on the server (PUT request)
export async function updateData(endpoint, id, data) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: 'PUT', // Use PUT method to update data
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update data'); // Handle error if request fails
    }

    return response.json(); // Return parsed JSON data
  } catch (error) {
    console.error('Error in updateData:', error); // Log error for debugging
    throw error; // Rethrow error to be handled in the calling code
  }
}

// Function to delete data from the server (DELETE request)
export async function deleteData(endpoint, id) {
  await fetch(`${API_URL}/${endpoint}/${id}`, {
    method: 'DELETE', // Use DELETE method to remove data
  });
}

