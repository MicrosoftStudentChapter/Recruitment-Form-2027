// Backend API configuration and utilities
// Change this URL to point to your actual backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://your-backend-url.com/api";

/**
 * Submit the recruitment form data to the backend.
 * @param {Object} formData - The complete form data object.
 * @returns {Promise<Object>} - The response from the backend.
 */
export async function submitApplication(formData) {
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Submission failed" }));
    throw new Error(error.message || `Server error: ${response.status}`);
  }

  return response.json();
}
