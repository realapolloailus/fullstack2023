import React from 'react'
import Person from './Person'

const Persons = ({filter, persons, deletePerson}) =>{
    const personsAfterFilter = (
        filter === '' 
            ? persons 
            : persons.filter((person) => 
                person.name.toLowerCase().includes(filter.toLowerCase()))
    )

    return(
        <div>
            {personsAfterFilter.map( person => <Person key={person.id} person={person} deletePerson={deletePerson} /> )}
        </div>
    )
}

export default Persons