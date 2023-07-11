import { useState } from 'react'

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
      window.alert(`The name ${newNumber} has already been added to the phonebook.`)
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

  

  const handleNameChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)  
  }
  
  const handleNumberChange = (event) => {    
    console.log(event.target.value)    
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) =>{
    console.log('searching for: ', event.target.value)
    setFilter(event.target.value)
  }
  const personsAfterFilter = (filter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={handleFilter}/>
      <h2>add a new</h2>
      <form  onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> 
      <h2>Numbers</h2>
      <div>
          <p>{personsAfterFilter.map(person => person.name + ' ' + person.number + ';   ')}</p>
        
      </div>
    </div>
  )
}

export default App