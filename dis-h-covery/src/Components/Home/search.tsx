import { useState } from "react";
import { SearchBarProps } from "../../Shared/Models/Contracts/search-bar-props";

function SearchBar(input: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [selectedCuisine, setSelectedCuisines] = useState("All");
    const allCuisines = input.cuisines;

    const CuisineOnSelected = (value: string) => {
        setSelectedCuisines(value);
        input.onSelected(value);
    };

    const OnValueUpdate = (value: string) => {
        setQuery(value);
        input.onValueUpdated(value);
    }

    return (
        <>
            <div className="flex items-center w-full bg-blue-200 shadow-md p-3 rounded-lg">
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
                    className="flex-1 px-4 py-2 border-t border-b border-r border-gray-300 focus:outline-none"
                    value={query}
                    onChange={(e) => OnValueUpdate(e.target.value)}
                />
            </div>
        </>
    )
}
export default SearchBar
