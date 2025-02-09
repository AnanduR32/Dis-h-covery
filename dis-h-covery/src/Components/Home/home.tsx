import { useEffect, useState } from "react";
import { fetchCuisines, fetchMealsByArea, fetchMealsByName } from "../../Services/meal-db-endpoint.service";
import SearchBar from "./search"
import Card from "./card";

class mealData {
  id: number;
  name: string;
  imgUrl: string;
  constructor(id: number, name: string, imgUrl: string) {
    this.id = id;
    this.name = name;
    this.imgUrl = imgUrl;
  }
}

function Home() {
  const [cuisines, setCuisines] = useState<string[]>(["All"]);
  const [meals, setMeals] = useState<mealData[] | null>(null);
  var loading = true;

  const handleCuisineSelection = (value: string) => {
    loadMeals(value);
  }

  const loadMeals = async (value: string) => {
    const response = await fetchMealsByArea(value);
    var fetchedMeals: mealData[] = [];
    response.meals.forEach((meal: any) => {
      var data = new mealData(meal.idMeal, meal.strMeal, meal.strMealThumb);
      fetchedMeals = [...fetchedMeals, data]
    });

    setMeals(fetchedMeals)
  }

  useEffect(() => {
    const loadCuisines = async () => {
      const response = await fetchCuisines();
      const fetchedCuisines = response.meals.map((meal: { strArea: any; }) => meal.strArea);
      setCuisines(["All", ...fetchedCuisines]);
    };

    const loadAllMeals = async () => {
      const response = await fetchMealsByName('a');
      var fetchedMeals: mealData[] = [];
      response.meals.forEach((meal: any) => {
        var data = new mealData(meal.idMeal, meal.strMeal, meal.strMealThumb);
        fetchedMeals = [...fetchedMeals, data]
      });

      setMeals(fetchedMeals)
    }

    loadCuisines();
    loadAllMeals();
  }, []);


  return (
    <>
      <div className="w-1/2 mx-auto">
        <SearchBar cuisines={cuisines} onSelected={handleCuisineSelection} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {meals !== null && meals.length > 0 ? (
          meals.map((meal) => (
            <Card key={meal.id} name={meal.name} img={meal.imgUrl} id={meal.id} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">Loading...</div>
        )}
      </div>
    </>
  )
}

export default Home
