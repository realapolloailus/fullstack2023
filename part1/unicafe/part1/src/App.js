import { useState } from 'react'

const Display = props => <h1>{props.value}</h1>

/*const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)*/

const Average = (props) =>{
  let average = (1*props.g + 0*props.n + (-1)*props.b)/props.size
  console.log('average rating:', average)
  return <p>average {average}</p>
}

const Positive = (props) =>{
  let pos = (props.numGood)/props.size
  return <p>positive {pos*100} %</p>
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
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <Display value = 'statistics'/>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good+bad+neutral}</p>
      <Average g={good} n={neutral} b={bad} size={bad+good+neutral}/>
      <Positive numGood={good} size={bad+good+neutral}/>
    </div>
  )
}

export default App