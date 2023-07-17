import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const events = [
    { title: "Event 1", date: "2022-01-01" },
    { title: "Event 2", date: "2022-01-05" },
    { title: "Event 3", date: "2022-01-10" },
  ];

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setModalIsOpen(true);
  };

  const handleNoteChange = (event) => {
    const { value } = event.target;
    setNotes((prevNotes) => ({
      ...prevNotes,
      [selectedDate.toISOString()]: value,
    }));
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>My Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose}>
        <h2>{selectedDate && selectedDate.toISOString().split("T")[0]}</h2>
        <textarea
          value={notes[selectedDate?.toISOString()] || ""}
          onChange={handleNoteChange}
        ></textarea>
        <button onClick={handleModalClose}>Close</button>
      </Modal>
    </div>
  );
};

export default Calendar;
