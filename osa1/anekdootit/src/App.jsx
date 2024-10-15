import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const votesArray = Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(votesArray);

  const handleVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  };

  const handleAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleMostVotes = () => {
    const maxVotes = Math.max(...votes);
    const index = votes.indexOf(maxVotes);
    return anecdotes[index];
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={handleAnecdote}>Next anecdote</button>
      <button onClick={handleVote}>Vote</button>
      <p>Has {votes[selected]} votes</p>
      <h1>Anecdote with most votes</h1>
      <p>{handleMostVotes()}</p>
    </>
  );
};

export default App;
