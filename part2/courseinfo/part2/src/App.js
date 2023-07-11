import React from 'react'
import Course from './components/Course'

const Header = ({header}) => (
  <h1>{header}</h1>
)

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  console.log('made it this far into app...');
  if(courses.length > 0){
    return(
      <div>
        <Header header='Web development curriculum' />
        {courses.map((course) => (
          <Course key = {course.id} course={course} />
        ))}
      </div>
      )
    }

  console.log('No courses found, will return empty curriculum.');
  return(
  <div>
    <Header header = 'Web development curriculum' />
    <p>No course curriculum found.</p>
  </div>
  )
}

export default App;