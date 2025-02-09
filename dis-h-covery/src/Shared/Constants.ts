export const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Endpoints
export const API_ENDPOINTS = {
  SEARCH: `${API_BASE_URL}/search.php?s=`,  // Search meals by name
  LOOKUP: `${API_BASE_URL}/lookup.php?i=`,  // Get meal details by ID
  RANDOM: `${API_BASE_URL}/random.php`,    // Get a random meal
  CATEGORY: `${API_BASE_URL}/categories.php`,  // Get all meal categories
  FILTER_BY_CATEGORY: `${API_BASE_URL}/filter.php?c=`, // Get meals by category
  FILTER_BY_AREA: `${API_BASE_URL}/filter.php?a=`, // Get meals by area
  LIST_AREAS: `${API_BASE_URL}/list.php?a=list`, // Get list of all areas (cuisines)
};