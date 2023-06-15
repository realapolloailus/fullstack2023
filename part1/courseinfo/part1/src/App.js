const Header = (props) =>(
  <h1>{props.courseName}</h1>
)

const Part = (props) =>( 
  <>
    <h2>{props.part.name}</h2>
    <p>Number of exercises: <u><b>{props.part.exercises}</b></u></p>
  </>
)

const Content = (props) =>(
  <>
    <Part part={props.parts[0]}/>
    <Part part={props.parts[1]}/>
    <Part part={props.parts[2]}/>
  </>
)

const Total = (props)=>{
  let numExercises = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;
  return(
    <>
      <p>Total nunber of exercises: <u><b>{numExercises}</b></u></p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const partsOfCourse =[{
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }]
  
  console.log("All good, all successful.")
  return (
    <>
      <Header courseName={course} />
      <Content parts={partsOfCourse} />
      <Total parts={partsOfCourse} />
    </>
  )
  
}

export default App