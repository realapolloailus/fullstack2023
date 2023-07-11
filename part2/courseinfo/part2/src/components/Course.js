import React from 'react'

const TitleHeader = ({header}) => (
  <h2>{header}</h2>
)

const CourseContent = ({course}) => (
  <div>
      {course.map(({name, exercises, id}) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
  </div>
)

const Part = ({name, exercises}) => (
  <div>
    <li>{name} {exercises}</li>
    <p> </p>
  </div>
)

const TotalExercises = ({exercises}) => {
  const total = exercises.reduce((total_exercises, part) => total_exercises + part.exercises, 0)
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  )
}

const Course = ({course}) => (
  <div>
    <TitleHeader key={course.id} header={course.name} />
    <CourseContent course={course.parts} />
    <TotalExercises exercises={course.parts} />
  </div>
)

export default Course;