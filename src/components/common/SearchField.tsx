import { useSearchParams } from "react-router-dom";
import { useCallback, useState } from "react";

interface SearchFieldProps {
  paramKey: string;
}

export default function SearchField({ paramKey }: SearchFieldProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialValue = searchParams.get(paramKey) || "";
  const [inputValue, setInputValue] = useState(initialValue);

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      // Keep all current params
      const newParams = new URLSearchParams(searchParams);

      // Ensure game_status values persist
      const gameStatuses = searchParams.getAll("game_status");

      // Update or remove the search keyword param
      if (inputValue.trim()) {
        newParams.set(paramKey, inputValue);
      } else {
        newParams.delete(paramKey);
      }

      // Re-append game_status filters (since set/delete can sometimes reset them)
      newParams.delete("game_status");
      gameStatuses.forEach((status) => {
        newParams.append("game_status", status);
      });

      setSearchParams(newParams);
    },
    [inputValue, paramKey, searchParams, setSearchParams],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <input
        type="text"
        placeholder="검색"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 h-10 px-3 py-2 bg-black border border-gray-700 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      />
      <button
        type="submit"
        onClick={handleSearch}
        className="h-10 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        검색
      </button>
    </div>
  );
}
