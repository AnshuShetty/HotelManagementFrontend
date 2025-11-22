import React, { useState } from 'react';
import '../roomFilter/roomFilter.css';

const RoomFilter = ({ onFilter }) => {
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [availability, setAvailability] = useState('');

  const handleFilter = () => {
    onFilter({
      type,
      minPrice: minPrice ? parseFloat(minPrice) : 0,
      maxPrice: maxPrice ? parseFloat(maxPrice) : Infinity,
      availability
    });
  };

  return (
    <div className="room-filter">
      <h3>Filter Rooms</h3>
      <div className="filter-group">
        <label>Room Type:</label>
        <input 
          type="text" 
          value={type} 
          onChange={(e) => setType(e.target.value)} 
          placeholder="e.g., Deluxe" 
        />
      </div>
      <div className="filter-group">
        <label>Min Price:</label>
        <input 
          type="number" 
          value={minPrice} 
          onChange={(e) => setMinPrice(e.target.value)} 
          placeholder="0" 
        />
      </div>
      <div className="filter-group">
        <label>Max Price:</label>
        <input 
          type="number" 
          value={maxPrice} 
          onChange={(e) => setMaxPrice(e.target.value)} 
          placeholder="Infinity" 
        />
      </div>
      <div className="filter-group">
        <label>Availability:</label>
        <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
          <option value="">Any</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default RoomFilter;
