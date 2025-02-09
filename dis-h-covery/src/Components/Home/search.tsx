import { useState, useEffect  } from "react";
import { fetchCuisines } from "../../Services/meal-db-endpoint.service";

function SearchBar() {
    const [query, setQuery] = useState("");
    const [selectedCuisine, setSelectedCuisines] = useState("All");
    const [categories, setCategories] = useState<string[]>(["All"]);


    useEffect(() => {
        const loadCuisines = async () => {
            const response = await fetchCuisines();
            const fetchedCuisines = response.meals.map((meal: { strArea: any; }) => meal.strArea);
            console.log(fetchedCuisines)
            setCategories(["All", ...fetchedCuisines]);
            };
        
            loadCuisines();
      }, []);

    return (
        <>
            <div className="flex items-center w-full bg-white shadow-md p-3 rounded-lg">
                {/* Dropdown on the Left */}
                <select className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisines(e.target.value)}>
                    {categories.map((cuisine) => (
                        <option key={cuisine} value={cuisine}>
                            {cuisine}
                        </option>
                    ))}
                </select>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search meals..."
                    className="flex-1 px-4 py-2 border-t border-b border-gray-300 focus:outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {/* Search Button */}
                <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                    🔍
                </button>
            </div>
        </>
    )
}
export default SearchBar
