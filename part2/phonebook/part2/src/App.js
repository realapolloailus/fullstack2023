import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject ={
      name: newName,
      number: newNumber
    }
    const findDuplicateName = persons.find(person => person.name===newName)
    const findDuplicateNumber = persons.find(person => person.number===newNumber)
    if(findDuplicateName){
      window.alert(`The name ${newName} has already been added to the phonebook.`)
      console.log('found a duplicate name: ', newName);
    }
    else if(findDuplicateNumber){
      window.alert(`The number ${newNumber} has already been added to the phonebook.`)
      console.log('found a duplicate number', newNumber);
    }
    else{
      const copy = [...persons]
      setPersons(copy.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log('contents of persons:', copy);
    }
    
  }

  return (
    <div>
    <h2>Phonebook</h2>

    <Filter setFilter={setFilter} />

    <h3>Add a new</h3>

    <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

    <h3>Numbers</h3>

    <Persons  filter={filter} persons={persons}/>
  </div>
  )
}

export default App