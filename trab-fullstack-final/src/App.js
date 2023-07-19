import { useState, useEffect, useCallback } from 'react'
import { BiCalendar } from "react-icons/bi"
import AddAppointment from "./components/AddAppointment"
import AppointmentInfo from "./components/AppointmentInfo"

function App() {

  let [appointmentList, setAppointmentList] = useState([]);
  let [query] = useState("");
  let [sortBy] = useState("petName");
  let [orderBy] = useState("asc");

  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a, b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order : 1 * order
    )
  })

  const fetchData = useCallback(() => {
    fetch('http://107.23.77.45:3000/apt', {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODk3OTcyMTAsImV4cCI6MTY4OTg0MDQxMH0.6o8KZUaTaiIF51XLN5kMW4nWlKiDqpbBNjQlcKtMLpo'
      }
    })
      .then(response => response.json())
      .then(data => {
        setAppointmentList(data)
        console.log(data)
      });
  }, [])

  useEffect(() => {
    console.log('Fetching data...');  
    fetchData()
  }, [fetchData]);


  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" />Cachorros</h1>
      <AddAppointment
        onSendAppointment={myAppointment => setAppointmentList([...appointmentList, myAppointment])}
        lastId={appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
      />

      <ul className="divide-y divide-gray-200">
        {filteredAppointments
          .map(appointment => (
            <AppointmentInfo key={appointment.id}
              appointment={appointment}
              onDeleteAppointment={
                appointmentId =>
                  setAppointmentList(appointmentList.filter(appointment =>
                    appointment.id !== appointmentId))
              }
            />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
