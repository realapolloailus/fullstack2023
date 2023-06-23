import { useState } from 'react'

const Display = props => <h1>{props.value}</h1>

/*const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)*/

const Statistics = (props) =>{
  let average = (1*props.g + 0*props.n + (-1)*props.b)/props.size
  console.log('average rating:', average)
  let pos = (props.g)/props.size
  console.log('% of positive ratings:', pos)
  return(
    <div>
      <p>good {props.g}</p>
      <p>neutral {props.n}</p>
      <p>bad {props.b}</p>
      <p>all {props.g + props.b + props.n}</p>
      <p>average {average}</p>
      <p>positive {pos*100} %</p>
    </div>
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
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <Display value = 'statistics'/>
      <Statistics g={good} n={neutral} b={bad} size={good+neutral+bad}/>
    </div>
  )
}

export default App