import { API_ENDPOINTS } from "../Shared/Constants";
import { ApiResponseMeal } from "../Shared/Models/Contracts/api-response";

export const fetchMealsByName = async (query: string): Promise<ApiResponseMeal> => {
  const response = await fetch(`${API_ENDPOINTS.SEARCH}${query}`);
  return response.json();
};

export const fetchMealById = async (id: number): Promise<ApiResponseMeal> => {
  const response = await fetch(`${API_ENDPOINTS.LOOKUP}${id}`);
  return response.json();
};

export const fetchCuisines = async (): Promise<ApiResponseMeal> => {
  const response = await fetch(`${API_ENDPOINTS.LIST_AREAS}`);
  return response.json();
};

export const fetchMealsByArea = async (query: string): Promise<ApiResponseMeal> => {
  const response = await fetch(`${API_ENDPOINTS.FILTER_BY_AREA}${query}`);
  return response.json();
};