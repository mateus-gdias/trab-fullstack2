import { BiTrash } from "react-icons/bi"

const AppointmentInfo = ({ appointment, onDeleteAppointment }) => {

  const deleteAppointment = (id) => {
    fetch(`http://107.23.77.45:3000/apt/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODk3OTcyMTAsImV4cCI6MTY4OTg0MDQxMH0.6o8KZUaTaiIF51XLN5kMW4nWlKiDqpbBNjQlcKtMLpo'
      }
    })
      .then(() => {
        if(onDeleteAppointment) onDeleteAppointment(id);
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <li className="px-3 py-3 flex items-start" key={appointment.id}>
      <button onClick={() => deleteAppointment(appointment.id)} type="button"
        className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <BiTrash /></button>
      <div className="flex-grow">
        <div className="flex items-center">
          <span className="flex-none font-medium text-2xl text-blue-500">{appointment.petName}</span>
        </div>
        <div><b className="font-bold text-blue-500">Dono:</b> {appointment.ownerName}</div>
        <div className="leading-tight">{appointment.aptNotes}</div>
      </div>
    </li>
  );
}

export default AppointmentInfo;
