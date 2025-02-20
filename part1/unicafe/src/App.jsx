import { useState } from 'react'

const DisplayHeading = ({ text }) => <div><h1>{text}</h1></div>

const StatisticLine = ({ name, stat, opt }) => (
  <tr>
    <td>{name}</td>
    <td>{stat} {opt && opt}</td>
  </tr>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const {good, neutral, bad, total, getAverage, getPercentagePositive} = props
  if (total === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  } else{
    
    return (
      <table>
        <tbody>
          <StatisticLine name="good" stat={good} />
          <StatisticLine name="neutral" stat={neutral} />
          <StatisticLine name="bad" stat={bad} />
          <StatisticLine name="all" stat={total} />
          <StatisticLine name="average" stat={getAverage()} />
          <StatisticLine name="positive" stat={getPercentagePositive()} opt="%" />
        </tbody>
      </table>
    )
  }

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total = good + neutral + bad;


  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const getAverage = () => {
    if (total === 0) return
    return (((good * 1) + (neutral * 0) + (bad * -1)) / total).toFixed(1)
  }

  const getPercentagePositive = () => {
    if (total === 0) return
    return (good / total * 100).toFixed(1)
  }

  return (
    <div>
      <DisplayHeading text="give feedback" />
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />

      <DisplayHeading text="statistics" />

      <Statistics good={good} neutral={neutral} bad={bad} 
      total={total} getAverage={getAverage} getPercentagePositive={getPercentagePositive}/>



    </div>
  )

}

export default App