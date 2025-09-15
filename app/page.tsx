"use strict";
"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

export default function Home(){

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    setEvents([
      { title: "予約済み", start: "2025-09-15T10:00:00", end: "2025-09-15T10:15:00" },
      { title: "予約可能", start: "2025-09-15T11:00:00", end: "2025-09-15T12:00:00" }
    ])
  })

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        events={events}
        dateClick={(info) => {
          alert(`この時間を予約しますか？ ${info.dateStr}`)
        }}
      />
    </>
  );
}