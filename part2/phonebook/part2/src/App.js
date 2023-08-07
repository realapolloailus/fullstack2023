import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const [notif, setNotif] = useState(null)
  
  useEffect(() => {
    console.log('effect:');
    axios
      .get('/api/persons')
      .then((response) => {
        console.log('response in useEffect:',response.data);
        console.log('promise fulfilled!');
        setPersons(response.data); 
      });
  }, [])
  

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject ={
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    const findDuplicateName = persons.find(person => person.name===newName)
    const findDuplicateNumber = persons.find(person => person.number===newNumber)

    if(findDuplicateName && findDuplicateNumber ){
      setNotif({
        text: `The name ${newName} has already been added to the phonebook with this number.`,
        type: 'error'
      })
      setTimeout(() => {setNotif(null)}, 5000)
      console.log('found a duplicate name: ', newName);
    } 

    else if(findDuplicateName && !findDuplicateNumber){

        const confirmUpdate = window.confirm(`Are you sure you want to update ${newName}'s number to be ${newNumber}?`)
        if(confirmUpdate){
          const personUpdate = {...findDuplicateName, number:newNumber}
          personService
            .update(findDuplicateName.id, personUpdate)
            .then( returnedPerson => {
              setPersons( persons.map( 
                p => p.id !== findDuplicateName.id
                  ? p
                  : returnedPerson         
                 ) )
                setNotif({
                  text: `Updated ${findDuplicateName.name}'s number.`,
                  type: 'notification'
                })
                setTimeout(() => setNotif(null), 5000) 
            })
            .catch(error => setPersons(
              persons
                  .filter(person => person.name !== findDuplicateName.name)))
              setNotif({
                  text: `${findDuplicateName.name} has already been deleted from the phonebook.`,
                  type: 'error'
                })
              setTimeout(() => {setNotif(null)}, 5000)
        }

      }

    else if(!findDuplicateName && findDuplicateNumber){
      setNotif({
        text: `The number ${newNumber} has already been added to the phonebook under a different name.`,
        type: 'error'
      })
      setTimeout(() => {setNotif(null)}, 5000)
      console.log('found a duplicate number', newNumber);
    }

    else{

        personService
          .create(personObject)
          .then(returnedPerson =>{
            setPersons(persons.concat(returnedPerson))

          })
            .catch(error => {
              setNotif({
                text: error.response.data.error,
                type: 'error'
              })
              setTimeout(() => {setNotif(null)}, 5000)
            })
        setNotif({
          text: `${personObject.name} had been added.`,
          type: 'notification'
        })
        setTimeout(() => {setNotif(null)}, 5000)
    }
    setNewName('')
    setNewNumber('')
    console.log('contents of persons:', persons);
  }

  const deletePerson = (id) =>{
    const person = persons.find( p => p.id === id)
    const confirm = window.confirm(`Are you sure you want to delete ${person.name} from the phonebook?`)

    if (confirm){
      personService
        .deleteEntry(id)
        .then( returnedPerson => {
          persons.map( p => p.id !== id 
            ? person
            : returnedPerson)
        })
      setPersons( persons.filter(p => p.id!==id) )
      setNotif({
        text: `Deleted ${person.name} from the phonebook.`,
        type: 'notification'
      })
      setTimeout(()=> {setNotif(null)}, 5000)
      
    }
  }

  return (
    <div>
    <h2>Phonebook</h2>

    <Notification notif = {notif}/>

    <Filter setFilter={setFilter} />

    <h3>Add a new</h3>

    <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

    <h3>Numbers</h3>

    <Persons  filter={filter} persons={persons} deletePerson={deletePerson}/>
  </div>
  )
}

export default App