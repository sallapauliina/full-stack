import { useState } from "react";

const Statisticline = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ Good, Neutral, Bad }) => {
  const total = Good + Neutral + Bad;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statisticline text="Good" value={Good} />
          <Statisticline text="Neutral" value={Neutral} />
          <Statisticline text="Bad" value={Bad} />
          <Statisticline text="All" value={total} />
          <Statisticline
            text="Average"
            value={((Good - Bad) / total).toFixed(1)}
          />
          <Statisticline
            text="Positive"
            value={((Good / total) * 100).toFixed(1) + " %"}
          />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [Good, setGood] = useState(0);
  const [Neutral, setNeutral] = useState(0);
  const [Bad, setBad] = useState(0);

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(Good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(Neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(Bad + 1)} text="Bad" />
      <Statistics Good={Good} Neutral={Neutral} Bad={Bad} />
    </>
  );
};

export default App;
