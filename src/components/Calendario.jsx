import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, setNote] = useState('');
  const [graphImage, setGraphImage] = useState(null);

  useEffect(() => {
    const storedNote = localStorage.getItem(getNoteStorageKey());
    if (storedNote) {
      setNote(storedNote);
    }

    const storedGraphImage = localStorage.getItem(getImageStorageKey());
    if (storedGraphImage) {
      setGraphImage(storedGraphImage);
    }
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const storedNote = localStorage.getItem(getNoteStorageKey(date));
    if (storedNote) {
      setNote(storedNote);
    } else {
      setNote('');
    }

    const storedGraphImage = localStorage.getItem(getImageStorageKey(date));
    if (storedGraphImage) {
      setGraphImage(storedGraphImage);
    } else {
      setGraphImage(null);
    }
  };

  const handleNoteChange = (event) => {
    const { value } = event.target;
    setNote(value);
    localStorage.setItem(getNoteStorageKey(), value);
  };

  const getImageStorageKey = (date) => {
    const selected = date || selectedDate;
    return `graphImage_${selected.toISOString().split('T')[0]}`;
  };

  const getNoteStorageKey = (date) => {
    const selected = date || selectedDate;
    return `notes_${selected.toISOString().split('T')[0]}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="mb-4 w-full border border-gray-300 rounded-md bg-sky-300 h-[50vh]"
      />
      <div>
        <h2 className="text-lg font-bold mb-2">
          {selectedDate.toISOString().split('T')[0]}
        </h2>
        <textarea
          value={note}
          onChange={handleNoteChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
      <div className="mt-4" id="graphContainer">
        <h2 className="text-lg font-bold mb-2">
          {selectedDate.toISOString().split('T')[0]}
        </h2>
        {graphImage && (
          <div>
            <img src={graphImage} alt="Graph" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;



