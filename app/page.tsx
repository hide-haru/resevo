"use strict";
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"


export default function Home(){

  const [events, setEvents] = useState<any[]>([]);
  const router = useRouter();

  const fetchReserve = async () => {
    try{
      const response = await fetch("http://localhost:3000/api/reservation/receive",{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const result = await response.json();

      //FullCalendarように変換
      const fullcalendarEvents = result.map((item: any) => ({
        title: item.Title,
        start: new Date (item.ResStartTime).toISOString().slice(0,19),
        end: new Date (item.ResEndTime).toISOString().slice(0,19)
      }));
      setEvents(fullcalendarEvents);
      console.log("結果：", fullcalendarEvents);
    }catch(err){
      console.log("通信エラー", err);
    }
  }



  useEffect(() => {
    fetchReserve();
  },[])

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        locale="ja"
        initialView="timeGridWeek"
        selectable={true}
        // headerToolbar={false}
        buttonText={{
          today:'本日'
        }}
        events={events}
        dateClick={(info) => {
          router.push(`/Reservation/details`);
        }}
      />
    </>
  );
}