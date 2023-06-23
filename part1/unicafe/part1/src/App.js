import { useState } from 'react'

const Display = props => <h1>{props.value}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button> 
)

const StatisticLine = (props)=>{
  let res = ''
  let text = props.text
  if(text==='good'){
    res = <p>good {props.value}</p>
  }
  else if(text==='neutral'){
    res = <p>neutral {props.value}</p>
  }
  else if(text==='bad'){
    res = <p>bad {props.value}</p>
  }
  else if(text==='all'){
    res = <p>all {props.value}</p>
  }
  else if(text==='average'){
    res = <p>average {props.value}</p>
  }
  else if(text==='positive'){
    res = <p>positive {props.value} %</p>
  }
  return(
    <div>{res}</div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const handleGood = () =>{
    const updatedGood = good+1
    setGood(updatedGood)
    console.log('rating: good. times entered:', updatedGood)
  }
  const handleNeutral = () =>{
    const updatedNeutral = neutral+1
    setNeutral(updatedNeutral)
    console.log('rating: neutral. times entered:', updatedNeutral)
  }
  const handleBad = () =>{
    const updatedBad = bad+1
    setBad(updatedBad)
    console.log('rating: bad. times entered:', updatedBad)
  }

  

  return (
    <div>
      <Display value = 'give feedback'/>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>

      <Display value = 'statistics'/>

      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={good+bad+neutral}/>
      <StatisticLine text='average' value={ (1*good + bad*-1)/(good+bad+neutral) }/>
      <StatisticLine text='positive' value={ good/(good+bad+neutral) }/>

    </div>
  )
}

export default App