import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = newPerson =>{
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const updatePerson = (id, newPerson) =>{
    const request = axios.put(`${ baseUrl }/${ id }`, newPerson)
    return request.then(response => response.data)
}

const deleteEntry = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then( response =>{ return response.data } )
}

export default {getAll, create: createPerson, update: updatePerson, deleteEntry}