import { useState } from "react";

const Button = ({ name, handleClick }) => {
  return <button onClick={handleClick}>{name}</button>;
};

const Stat = ({ name, value }) => {
  return (
    <p>
      {name} {value}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button name="good" handleClick={handleGoodClick} />
      <Button name="neutral" handleClick={handleNeutralClick} />
      <Button name="bad" handleClick={handleBadClick} />
      <h2>statistics</h2>
      <Stat name="good" value={good} />
      <Stat name="neutral" value={neutral} />
      <Stat name="bad" value={bad} />
      <Stat name="total" value={total} />
      <Stat name="average" value={total ? average : 0} />
      <Stat name="positive" value={total ? `${positive} %` : "0 %"} />
    </>
  );
};

export default App;
