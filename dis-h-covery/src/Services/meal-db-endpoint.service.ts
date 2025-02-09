import { API_ENDPOINTS } from "../Shared/Constants";

export const fetchMealsBySearch = async (query: string) => {
  const response = await fetch(`${API_ENDPOINTS.SEARCH}${query}`);
  return response.json();
};

export const fetchMealById = async (id: string) => {
  const response = await fetch(`${API_ENDPOINTS.LOOKUP}${id}`);
  return response.json();
};

export const fetchCuisines = async () => {
  const response = await fetch(`${API_ENDPOINTS.LIST_AREAS}`);
  return response.json();
};

