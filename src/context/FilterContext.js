import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 10000 },
    checkInDate: null,
    checkOutDate: null,
    numberOfGuests: 1,
    roomType: "", // e.g., "single", "double", "suite"
    searchTerm: "",
  });

  const updateFilter = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const updateMultipleFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 10000 },
      checkInDate: null,
      checkOutDate: null,
      numberOfGuests: 1,
      roomType: "",
      searchTerm: "",
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        updateFilter,
        updateMultipleFilters,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
};
