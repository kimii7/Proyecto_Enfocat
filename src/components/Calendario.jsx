import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState({});

  useEffect(() => {
    // Cargar notas desde el almacenamiento local al cargar la página
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleNoteChange = (event) => {
    const { value } = event.target;
    setNotes((prevNotes) => ({
      ...prevNotes,
      [selectedDate.toISOString().split("T")[0]]: value,
    }));
  };

  useEffect(() => {
    // Guardar notas en el almacenamiento local cuando cambien
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <h1>My Calendar</h1>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <div>
        <h2>{selectedDate.toISOString().split("T")[0]}</h2>
        <textarea
          value={notes[selectedDate?.toISOString().split("T")[0]] || ""}
          onChange={handleNoteChange}
        ></textarea>
      </div>
    </div>
  );
};

export default MyCalendar;
