import { useEffect, useRef, useState } from "react";
import { fetchCuisines, fetchMealsByArea, fetchMealsByName } from "../../Services/meal-db-endpoint.service";
import Card from "./card";
import SearchBar from "./search";
import { ApiResponseMeal } from "../../Shared/Models/Contracts/api-response";

function Home() {
  const defaultQuery: string = "";
  const defaultArea: string = "All"

  const [cuisines, setCuisines] = useState<string[]>([defaultArea]);
  const [data, setMeals] = useState<ApiResponseMeal | null>();

  const previousQueryRef = useRef(defaultQuery);
  const currentQueryRef = useRef(defaultQuery);
  const previousAreaRef = useRef(defaultArea);
  const currentAreaRef = useRef(defaultArea);

  const queryChanged = (): number => {
    if (currentQueryRef.current !== previousQueryRef.current && currentQueryRef.current !== defaultQuery) {
      return 1;
    }
    else if (currentQueryRef.current === previousQueryRef.current && currentQueryRef.current !== defaultQuery) {
      return 0;
    }
    return -1;
  }

  const areaChanged = (): number => {
    if (currentAreaRef.current !== previousAreaRef.current && currentAreaRef.current !== defaultArea) {
      return 1;
    }
    else if (currentAreaRef.current === previousAreaRef.current && currentAreaRef.current !== defaultArea) {
      return 0;
    }
    return -1;
  }

  const handleCuisineSelection = async (value: string) => {
    previousAreaRef.current = currentAreaRef.current;
    currentAreaRef.current = value
    filterMeals();
  }

  const handleValueUpdated = async (value: string) => {
    previousQueryRef.current = currentQueryRef.current;
    currentQueryRef.current = value;
    filterMeals();
  }

  const filterMeals = async () => {
    var previousMealsListed = data;
    var newMealsList: any;
    if ((queryChanged() === 1 && areaChanged() === 1)) {
      const areaMeals = await fetchMealsByArea(currentAreaRef.current);
      const filtered = areaMeals.meals.filter(a => a.strMeal.includes(currentQueryRef.current));
      areaMeals.meals = filtered;
      newMealsList = areaMeals;
    }
    else if (queryChanged() === 1 && areaChanged() === 0) {
      const queriedMeals = await fetchMealsByName(currentQueryRef.current);
      const filtered = queriedMeals.meals.filter(a => previousMealsListed!.meals.some(b => b.idMeal === a.idMeal));
      queriedMeals.meals = filtered;
      newMealsList = queriedMeals;
    }
    else if (queryChanged() === 0 && areaChanged() === 1) {
      const areaMeals = await fetchMealsByArea(currentAreaRef.current);
      const filtered = areaMeals.meals.filter(a => previousMealsListed!.meals.some(b => b.strMeal === a.strMeal))
      areaMeals.meals = filtered;
      newMealsList = areaMeals;
    }
    else if (queryChanged() === 1 && areaChanged() === -1) {
      newMealsList = await fetchMealsByName(currentQueryRef.current);
    }
    else if (queryChanged() === -1 && areaChanged() === 1) {
      newMealsList = await fetchMealsByArea(currentAreaRef.current);
    }
    else if (queryChanged() === 0 && areaChanged() === 0) {
      newMealsList = previousMealsListed;
    }
    else {
      newMealsList = await fetchMealsByName('a');
    }

    if (newMealsList.meals !== null){
      setMeals(newMealsList);
    }
    else{
      setMeals(null)
    }
  }

  useEffect(() => {
    const loadCuisines = async () => {
      const response = await fetchCuisines();
      setCuisines(["All", ...response.meals.map(x => x.strArea)]);
    };

    const loadAllMeals = async () => {
      const response = await fetchMealsByName('a');
      setMeals(response)
    }

    loadCuisines();
    loadAllMeals();
  }, []);


  return (
    <>
      <div className="w-1/2 mx-auto">
        <SearchBar cuisines={cuisines} onSelected={handleCuisineSelection} onValueUpdated={handleValueUpdated} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-6">
        {data != null ? (
          data.meals.map((meal) => (
            <Card key={meal.idMeal} name={meal.strMeal} img={meal.strMealThumb} id={meal.idMeal} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">Loading...</div>
        )}
      </div>
    </>
  )
}

export default Home
