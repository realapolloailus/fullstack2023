import React from 'react'
import Person from './Person'

const Persons = ({filter, persons}) =>{
    const personsAfterFilter = (filter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return(
        <>
            {personsAfterFilter.map( person => <Person person={person} /> )}
        </>
    )
}

export default Persons