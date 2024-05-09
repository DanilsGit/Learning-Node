import { useEffect, useState } from "react"
import axios from 'axios';
import { User } from "./User";


export default function App() {
  const [notas, setNotas] = useState([])
  const [nuevaNota, setNuevaNota] = useState({})

  const apiURL = 'http://localhost:3001/api/notes'

  // useEffect(() => {
  //   axios.get(apiURL)
  //     .then(res => {
  //       setNotas(res.data)
  //     })
  // }, [])

  const handleInputChange = (e) => {
    setNuevaNota({
      content: e.target.value
    })
  }

  const handleClickSave = (e) => {
    e.preventDefault()
    axios.post(apiURL, nuevaNota)
      .then(res => {
        console.log(res.data)
      })
  }

  return (
    <div>

      {/* <section>
        <h1>Notas</h1>
        <form>
          <textarea onChange={handleInputChange} placeholder="Contenido"></textarea>
          <button onClick={handleClickSave}>Guardar</button>
        </form>
        <ul>
          {notas.map(nota => <li key={nota.id}>{nota.content}</li>)}
        </ul>
      </section> */}

      <section>
        <User />
      </section>

    </div>
  )
}