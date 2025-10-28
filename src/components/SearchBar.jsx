import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex items-center gap-3"
    >
      <input
        type="text"
        placeholder="Enter an ingredient (e.g., chicken)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border border-gray-300 rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-medium transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
