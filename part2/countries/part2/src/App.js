import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Display from './components/Display'

const App = () =>{
  const [filter, setFilter] = useState('')

  const handleClick = (event) =>{
    setFilter(event.target.id)
  }

  return(
    <div>
      <div>
        find countries: <input onChange={ ( {target} ) => setFilter(target.value) } />
      </div>
      <Display filter={filter} handleClick={ (event) => handleClick(event) } />
    </div>
  )
}

export default App;
