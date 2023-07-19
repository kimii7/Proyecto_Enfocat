import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, setNote] = useState("");

  useEffect(() => {
    const storedNote = localStorage.getItem(getStorageKey());
    if (storedNote) {
      setNote(storedNote);
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const storedNote = localStorage.getItem(getStorageKey(date));
    if (storedNote) {
      setNote(storedNote);
    } else {
      setNote("");
    }
  };

  const handleNoteChange = (event) => {
    const { value } = event.target;
    setNote(value);
    localStorage.setItem(getStorageKey(), value);
  };

  const getStorageKey = (date) => {
    const selected = date || selectedDate;
    return `notes_${selected.toISOString().split("T")[0]}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="mb-4"
      />
      <div>
        <h2 className="text-lg font-bold mb-2">
          {selectedDate.toISOString().split("T")[0]}
        </h2>
        <textarea
          value={note}
          onChange={handleNoteChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
    </div>
  );
};

export default MyCalendar;


