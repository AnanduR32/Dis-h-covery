import { useState } from "react";

interface SearchBarProps {
    cuisines: string[],
    onSelected: (cuisine:string) => void,
}

function SearchBar(input: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [selectedCuisine, setSelectedCuisines] = useState("All");
    const allCuisines = input.cuisines;

    const CuisineOnSelected = (value: string) => {
        setSelectedCuisines(value);
        input.onSelected(value);
      };

    return (
        <>
            <div className="flex items-center w-full bg-white shadow-md p-3 rounded-lg">
                {/* Dropdown on the Left */}
                <select className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                    value={selectedCuisine}
                    onChange={(e) => CuisineOnSelected(e.target.value)}>
                    {allCuisines.map((value) => (
                        <option key={value} value={value}>
                            {value}
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
                <button className="px-4 py-2 bg-blue-200 text-white rounded-r-md hover:bg-blue-300">
                    🔍
                </button>
            </div>
        </>
    )
}
export default SearchBar
