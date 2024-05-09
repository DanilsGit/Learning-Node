import axios from "axios"
import { useEffect, useState } from "react"

export function User() {
    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState({})

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState({})

    const [updateUser, setUpdateUser] = useState({})

    useEffect(() => {
        axios.get('http://localhost:3001/api/users')
            .then(res => {
                setUsers(res.data)
            })
    }, [])

    const handleInputChangeName = (e) => {
        setNewUser({
            name: e.target.value
        })
    }

    const handleInputChangeEmail = (e) => {
        setNewUser({
            email: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/api/users', newUser)
            .then(res => {
                console.log(res.data)
                setUsers([...users, res.data])
            })
    }

    return (
        <div>
            <h1>Users</h1>
            <form onSubmit={handleSubmit}>
                <h2>Agregar usuario</h2>
                <input required onChange={handleInputChangeName} type="text" placeholder="Nombre" />
                <input required onChange={handleInputChangeEmail} type="email" placeholder="Email" />
                <button>Guardar</button>
            </form>
            <h2>Lista de usuarios</h2>
            <ul>
                {users.map(user => <li key={user.id}>
                    {user.id} - {user.name} - {user.email}
                </li>)}
            </ul>
            <h2>Buscar Usuario</h2>
            <form>
                <input onChange={
                    (e)=>{
                        e.preventDefault();
                        setSearch(e.target.value)
                    }
                } type="number" placeholder="Buscar por ID" />
                <button onClick={
                    (e)=>{
                        e.preventDefault();
                        axios.get(`http://localhost:3001/api/users/${search}`)
                            .then(res => {
                                console.log(res.data)
                                setSearchResult(res.data)
                            })
                    }
                }>Buscar</button>
            </form>
            <h2>Resultado de la búsqueda</h2>
            <ul>
                <li>
                    {
                        searchResult.id
                        ? `${searchResult.id} - ${searchResult.name} - ${searchResult.email}`
                        : 'No se encontró el usuario'
                    }
                </li>
            </ul>
            <h2>Eliminar usuario</h2>
            <form>
                <input onChange={
                    (e)=>{
                        e.preventDefault();
                        setSearch(e.target.value)
                    }
                } type="number" placeholder="ID del usuario a eliminar" />
                <button onClick={
                    (e)=>{
                        e.preventDefault();
                        axios.delete(`http://localhost:3001/api/users/${search}`)
                            .then(res => {
                                console.log(res.data)
                                const newUser = users.filter((user)=>(user.id != search))   
                                console.log(newUser)
                                setUsers(newUser)
                            })
                    }
                }>Eliminar</button>
            </form>
            <h2>Actualizar usuario</h2>
            <form>
                <input onChange={
                    (e)=>{
                        e.preventDefault();
                        setSearch(e.target.value)
                    }
                } type="number" placeholder="ID del usuario a actualizar" />
                <input onChange={
                    (e)=>{
                        e.preventDefault();
                        setUpdateUser({...updateUser, name: e.target.value})
                    }
                } type="text" placeholder="Nuevo nombre" />
                <input onChange={
                    (e)=>{
                        e.preventDefault();
                        setUpdateUser({...updateUser, email: e.target.value})
                    }
                } type="email" placeholder="Nuevo email" />
                <button onClick={
                    (e)=>{
                        e.preventDefault();
                        axios.put(`http://localhost:3001/api/users/${search}`, updateUser)
                            .then(res => {
                                console.log(res.data)
                                const newUser = users.map((user)=>{
                                    if(user.id == search){
                                        return {
                                            id: user.id,
                                            name: updateUser.name,
                                            email: updateUser.email
                                        }
                                    }
                                    return user
                                })   
                                setUsers(newUser)
                            })
                    }
                }>Actualizar</button>
            </form>
        </div>
    )
}