const Header = (props) => <h2>{props.course}</h2>


const Content = (props) => {
  const { parts } = props
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}
  

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)


const Total = (props) => <strong>total of {props.total}  exercises</strong>


const Course = (props) => {
  const { course } = props
  const { name, parts } = course

  const total = parts.reduce((sum, current) => sum + current.exercises, 0)
  
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total total={total} />
    </div>
  )
}

export default Course