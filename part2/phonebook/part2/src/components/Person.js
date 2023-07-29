import React from 'react'

const Person = ({person, deletePerson}) =>

    <ul className='person'>
        {person.name} {person.number}
        <button onClick = { () => deletePerson(person.id) }>Delete</button>
    </ul>



export default Person