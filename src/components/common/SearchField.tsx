import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
    [inputValue, paramKey, searchParams, setSearchParams]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e as any);
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="검색"
        className="text-white"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button variant="secondary" type="submit" onClick={handleSearch}>
        검색
      </Button>
    </div>
  );
}
