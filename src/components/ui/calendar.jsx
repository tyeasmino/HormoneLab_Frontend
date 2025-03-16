// src/components/ui/calendar.jsx
import React from 'react';

const Calendar = ({ mode, selected, onSelect }) => {
  return (
    <div className="border p-4">
      <h3 className="text-lg font-semibold">Calendar Mode: {mode}</h3>
      <p>Selected Date: {selected.toDateString()}</p>
      <button onClick={() => onSelect(new Date())}>Select Current Date</button>
    </div>
  );
};

export { Calendar };
